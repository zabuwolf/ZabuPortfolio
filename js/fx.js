/*
 * Tiếng guitar cho cảnh "Đánh đàn" — mô phỏng cây acoustic rải ngón.
 * Chơi theo TAB (dây + ngăn + vị trí móc kép) cấu hình trong data.js, lặp lại liên tục.
 *  - Nốt được để ngân như rải ngón thật; gảy lại một dây sẽ chặn tiếng cũ của dây đó.
 *  - Sang ô nhịp mới, dây nào đổi ngăn bấm thì bị chặn tiếng (tay trái đổi thế bấm).
 *  - Lệch nhẹ thời điểm & lực gảy để nghe "người" hơn.
 * Tổng hợp bằng Web Audio (Karplus-Strong). Trình duyệt chỉ cho phát tiếng sau lần chạm/bấm/gõ phím đầu tiên.
 */
window.Ballad = (() => {
  // Dây buông, chỉnh dây chuẩn: e(1) B(2) G(3) D(4) A(5) E(6)
  const STRINGS = { e: 1, B: 2, G: 3, D: 4, A: 5, E: 6 };
  const OPEN = { 6: 82.41, 5: 110.0, 4: 146.83, 3: 196.0, 2: 246.94, 1: 329.63 };
  const freqOf = (string, fret) => OPEN[string] * 2 ** (fret / 12);
  const SUB = 16; // mỗi ô nhịp 4/4 chia 16 móc kép
  const PREF = 'zabu-guitar-sound';

  let sixteenth = 60 / 78 / 4;
  let grid = []; // grid[i] = [{ string, fret, bass }] tại móc kép thứ i

  // 'A:5' -> { string: 5, fret: 5 }
  const parseNote = (n) => {
    const [s, f] = String(n).split(':');
    return { string: STRINGS[s], fret: +f };
  };

  // tab: mảng ô nhịp, mỗi ô là mảng [vị trí móc kép 0..15, 'dây:ngăn', ...]
  function build(tab) {
    grid = [];
    tab.forEach((bar, b) => {
      for (let i = 0; i < SUB; i++) grid[b * SUB + i] = [];
      for (const [pos, ...notes] of bar) {
        const parsed = notes.map(parseNote).filter((n) => n.string && n.fret >= 0);
        const low = Math.max(...parsed.map((n) => n.string));
        grid[b * SUB + pos] = parsed.map((n) => ({ ...n, bass: n.string === low && parsed.length > 1 }));
      }
    });
  }

  // Mặc định: intro "Mùa Đông" (2 ô nhịp D7M -> A7Msus2, lặp lại)
  build([
    [[0, 'A:5', 'B:2'], [2, 'D:4'], [3, 'G:2'], [5, 'B:2'], [7, 'D:4'], [8, 'e:2'], [12, 'B:2']],
    [[0, 'A:0', 'B:0'], [2, 'D:2'], [3, 'G:1'], [5, 'B:0'], [7, 'D:2'], [8, 'e:0']],
  ]);

  let ctx = null;
  let master = null;
  let muted = false;
  try {
    muted = localStorage.getItem(PREF) === 'off';
  } catch {
    /* private mode */
  }
  let playing = false;
  let step = 0;
  let next = 0;
  let timer = null;
  const ringing = {}; // dây -> { gain, fret }
  const listeners = [];
  const emitState = () => listeners.forEach((fn) => fn(state()));

  const unlocked = () => !!ctx && ctx.state === 'running';
  const state = () => (muted ? 'off' : unlocked() ? 'on' : 'locked');

  function onUnlocked() {
    emitState();
    if (playing) restart();
  }

  function unlock() {
    try {
      const fresh = !ctx;
      if (fresh) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        // lọc nhẹ + nén để tiếng đàn tròn, không gắt
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -18;
        comp.ratio.value = 3;
        master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(comp).connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume().then(onUnlocked);
      else if (fresh) onUnlocked();
    } catch {
      /* không hỗ trợ Web Audio */
    }
  }
  // Thao tác đầu tiên của người dùng mở khoá âm thanh
  ['pointerdown', 'keydown', 'touchend'].forEach((ev) => addEventListener(ev, unlock, { passive: true }));

  // Chặn tiếng một dây (như ngón tay đặt lên dây)
  function damp(string, when) {
    const r = ringing[string];
    if (!r) return;
    r.gain.gain.cancelScheduledValues(when);
    r.gain.gain.setTargetAtTime(0.0001, when, 0.03);
    delete ringing[string];
  }

  function pluck(string, fret, when, vol) {
    damp(string, when);
    const freq = freqOf(string, fret);
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * 3.5);
    const period = Math.max(2, Math.round(sr / freq));
    const buf = ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    // xung gảy: tiếng ồn đã làm mềm (đầu ngón tay, không dùng pick)
    let prev = 0;
    for (let i = 0; i < period; i++) {
      prev = prev * 0.5 + (Math.random() * 2 - 1) * 0.5;
      d[i] = prev;
    }
    const decay = string >= 5 ? 0.998 : string >= 3 ? 0.9965 : 0.995; // dây trầm ngân lâu hơn
    for (let i = period; i < len; i++) d[i] = decay * 0.5 * (d[i - period] + (i - period - 1 >= 0 ? d[i - period - 1] : 0));
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2200;
    const body = ctx.createBiquadFilter(); // cộng hưởng thùng đàn
    body.type = 'peaking';
    body.frequency.value = 180;
    body.Q.value = 1.2;
    body.gain.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0008, when + 3.4);
    src.connect(lp).connect(body).connect(g).connect(master);
    src.start(when);
    src.stop(when + 3.5);
    ringing[string] = { gain: g, fret };
  }

  // Đầu ô nhịp mới: dây nào sắp được bấm ngăn khác thì chặn tiếng (tay trái đổi thế bấm)
  function barChange(barStart, when) {
    const upcoming = {};
    for (let i = 0; i < SUB; i++) {
      for (const n of grid[(barStart + i) % grid.length] || []) if (!(n.string in upcoming)) upcoming[n.string] = n.fret;
    }
    for (const s of Object.keys(ringing)) {
      if (s in upcoming && upcoming[s] !== ringing[s].fret) damp(+s, when);
    }
  }

  function schedule() {
    while (next < ctx.currentTime + 0.3) {
      const idx = step % grid.length;
      if (idx % SUB === 0) barChange(idx, next);
      const notes = grid[idx] || [];
      notes.forEach((n, k) => {
        // hai nốt cùng lúc: bass trước một chút như ngón cái
        const humanize = (Math.random() - 0.5) * 0.012 + k * 0.012;
        const vol = (n.bass ? 0.3 : 0.17) * (0.88 + Math.random() * 0.24);
        pluck(n.string, n.fret, next + Math.max(0, humanize), vol);
      });
      step++;
      next += sixteenth;
    }
  }

  function restart() {
    clearInterval(timer);
    timer = null;
    if (!playing || muted || !unlocked() || !grid.length) return;
    next = ctx.currentTime + 0.06;
    step = Math.ceil(step / SUB) * SUB; // vào lại đúng đầu ô nhịp
    schedule();
    timer = setInterval(schedule, 40);
  }

  function silence() {
    if (!ctx) return;
    Object.keys(ringing).forEach((s) => damp(+s, ctx.currentTime));
  }

  return {
    // { bpm, tab } — xem build()
    configure({ bpm, tab } = {}) {
      if (bpm) sixteenth = 60 / bpm / 4;
      if (tab?.length) build(tab);
      step = 0;
      if (playing) restart();
    },
    start() {
      if (playing) return;
      playing = true;
      step = 0;
      restart();
    },
    stop() {
      playing = false;
      clearInterval(timer);
      timer = null;
      silence();
    },
    toggle() {
      unlock();
      if (state() === 'locked') muted = false;
      else muted = !muted;
      try {
        localStorage.setItem(PREF, muted ? 'off' : 'on');
      } catch {
        /* private mode */
      }
      if (muted) silence();
      restart();
      emitState();
    },
    get state() {
      return state();
    },
    // In lại tab đã dựng theo từng dây (để kiểm tra)
    debugTab() {
      const names = { 1: 'e', 2: 'B', 3: 'G', 4: 'D', 5: 'A', 6: 'E' };
      return [1, 2, 3, 4, 5, 6].map((s) =>
        `${names[s]}|` + grid.map((slot, i) => {
          const n = slot.find((x) => x.string === s);
          return (n ? String(n.fret) : '-') + ((i + 1) % SUB === 0 ? '|' : '');
        }).join('')
      );
    },
    onState: (fn) => listeners.push(fn),
  };
})();
