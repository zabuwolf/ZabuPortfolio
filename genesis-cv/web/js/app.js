/*
 * Giao diện và các luồng thao tác của bản concept Genesis Escape:
 * phòng chơi, lịch trống, bảng giá, đặt phòng (cọc qua ví / QR giả lập), tài khoản, ví, review, liên hệ.
 * Dữ liệu ở data.js, "máy chủ" giả lập ở store.js, hình vẽ ở art.js, hiệu ứng ở fx.js.
 */
(() => {
  const G = window.GEN;
  const S = window.Store;
  const A = window.Art;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = S.fmt;
  // Mọi chuỗi do người dùng nhập đều đi qua esc() trước khi đưa vào innerHTML
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const DOW = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dm = (date) => {
    const d = S.parse(date);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  };
  const dow = (date) => DOW[S.parse(date).getDay()];
  const dayName = (date) => (date === S.today() ? 'Hôm nay' : date === S.addDays(1) ? 'Ngày mai' : dow(date));
  const slotRange = (room, i) => {
    const end = parseInt(G.slots[i], 10) * 60 + room.duration;
    return `${G.slots[i]} – ${pad(Math.floor(end / 60))}:${pad(end % 60)}`;
  };
  const meter = (v) =>
    `<span class="meter" role="img" aria-label="${v.toFixed(1)} trên 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${v >= i ? 'on' : v >= i - 0.5 ? 'half' : ''}"></i>`).join('')}</span><b>${v.toFixed(1)}</b>`;
  const scan = () => window.FX?.scan();

  const ui = { city: 'hn', tag: '', sch: { facility: 'hc', date: S.today(), diff: '', horror: '', part: '' }, calc: { roomId: 'gone', players: 4, weekend: false, night: false } };

  /* ================= Toast ================= */
  function toast(message, type = '') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    $('#toasts').append(el);
    requestAnimationFrame(() => el.classList.add('in'));
    setTimeout(() => {
      el.classList.remove('in');
      setTimeout(() => el.remove(), 400);
    }, 4200);
  }

  /* ================= Modal (xếp chồng được: đặt phòng -> đăng nhập -> ...) ================= */
  const stack = [];
  function openModal(body, { cls = '', label = '', onClose, refresh } = {}) {
    const el = document.createElement('div');
    el.className = `modal ${cls}`;
    el.innerHTML = `<div class="modal-bg" data-close></div>
      <div class="modal-box" role="dialog" aria-modal="true" aria-label="${esc(label)}" tabindex="-1">
        <button class="modal-x" type="button" data-close aria-label="Đóng">×</button>
        <div class="modal-body">${body}</div>
      </div>`;
    document.body.append(el);
    stack.push({ el, onClose, refresh, prev: document.activeElement });
    html.classList.add('modal-open');
    requestAnimationFrame(() => el.classList.add('is-open'));
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeModal();
    });
    $('.modal-box', el).focus({ preventScroll: true });
    return el;
  }
  function closeModal() {
    const m = stack.pop();
    if (!m) return;
    m.el.classList.remove('is-open');
    m.onClose?.();
    setTimeout(() => m.el.remove(), 320);
    if (!stack.length) html.classList.remove('modal-open');
    m.prev?.focus?.({ preventScroll: true });
  }
  document.addEventListener('keydown', (e) => {
    const top = stack[stack.length - 1];
    if (!top) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    } else if (e.key === 'Tab') {
      // giữ tiêu điểm bàn phím trong hộp thoại đang mở
      const items = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', top.el).filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !top.el.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ================= Mã QR giả lập có đếm ngược ================= */
  function mountQr(box, { amount, memo, onPaid, onBack }) {
    let timer = null;
    const start = () => {
      const until = Date.now() + G.rules.qrSeconds * 1000;
      box.innerHTML = `<div class="qrbox">
        <div class="qr-wrap">${A.qr(`${memo}|${amount}|${until}`)}<span class="qr-scan"></span></div>
        <div class="qr-info">
          <p class="kicker">Chuyển khoản giả lập</p>
          <p class="qr-amount">${fmt(amount)}</p>
          <dl><div><dt>Nội dung</dt><dd>${esc(memo)}</dd></div><div><dt>Mã hết hạn sau</dt><dd class="qr-time">--:--</dd></div></dl>
          <div class="qr-bar"><span></span></div>
          <p class="fine">Mã QR này là giả, không quét được và không phát sinh giao dịch nào. Bấm nút bên dưới để giả lập việc bạn đã chuyển khoản.</p>
          <div class="qr-actions">
            <button class="btn btn-red" type="button" data-qr="paid">Tôi đã chuyển khoản (giả lập)</button>
            <button class="btn btn-line" type="button" data-qr="back">Quay lại</button>
          </div>
        </div>
      </div>`;
      const tick = () => {
        const left = Math.max(0, until - Date.now());
        const s = Math.ceil(left / 1000);
        $('.qr-time', box).textContent = `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
        $('.qr-bar span', box).style.transform = `scaleX(${left / (G.rules.qrSeconds * 1000)})`;
        if (!left) {
          clearInterval(timer);
          $('.qrbox', box).classList.add('expired');
          const paid = $('[data-qr="paid"]', box);
          paid.textContent = 'Mã đã hết hạn · Tạo mã mới';
          paid.dataset.qr = 'renew';
        }
      };
      clearInterval(timer);
      timer = setInterval(tick, 250);
      tick();
    };
    const onClick = (e) => {
      const b = e.target.closest('[data-qr]');
      if (!b) return;
      if (b.dataset.qr === 'paid') {
        clearInterval(timer);
        onPaid();
      } else if (b.dataset.qr === 'renew') start();
      else onBack();
    };
    box.addEventListener('click', onClick);
    start();
    return () => {
      clearInterval(timer);
      box.removeEventListener('click', onClick);
    };
  }

  /* ================= Hero: tìm suất nhanh ================= */
  function renderQuick() {
    const fac = $('#q-facility');
    const room = $('#q-room');
    fac.innerHTML = G.facilities.map((f) => `<option value="${f.id}">${esc(f.name)} · ${G.cities[f.city]}</option>`).join('');
    const fill = () => {
      room.innerHTML = `<option value="">Phòng nào cũng được</option>${G.rooms.filter((r) => r.facility === fac.value).map((r) => `<option value="${r.id}">${esc(r.name)} – ${esc(r.vn)}</option>`).join('')}`;
    };
    fac.addEventListener('change', fill);
    fill();
    const date = $('#q-date');
    date.min = S.today();
    date.max = S.addDays(13);
    date.value = S.today();
    $('#q-players').innerHTML = [4, 5, 6, 7, 8].map((n) => `<option value="${n}">${n} người</option>`).join('');
    $('#quick').addEventListener('submit', (e) => {
      e.preventDefault();
      const d = date.value && date.value >= S.today() && date.value <= S.addDays(13) ? date.value : S.today();
      openBooking({ facility: fac.value, roomId: room.value, date: d, players: Number($('#q-players').value) });
    });
  }

  function renderMarquee() {
    const words = [...G.genres, 'Nhập vai', 'Giải mã kỳ án', 'Người thật đóng', 'Hall of Fame'];
    const row = words.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join('');
    $('#marquee').innerHTML = `<div>${row}</div><div>${row}</div>`;
  }

  /* ================= Phòng chơi ================= */
  const cityRooms = () => G.rooms.filter((r) => G.facility(r.facility).city === ui.city);
  function roomCard(r, i) {
    const f = G.facility(r.facility);
    return `<article class="room-card rv" data-room="${r.id}" tabindex="0" style="--i:${i % 4}">
      <div class="room-tilt">
        <div class="room-poster">${A.poster(r)}</div>
        <span class="room-no">${pad(i + 1)}</span>
        ${r.isNew ? '<span class="badge">Mới ra</span>' : ''}
        <div class="room-info">
          <p class="room-fac">${esc(f.name)} · ${r.duration} phút</p>
          <h3>${esc(r.name)}<small>${esc(r.vn)}</small></h3>
          <div class="room-more">
            <p class="room-teaser">${esc(r.teaser)}</p>
            <dl class="room-meters"><div><dt>Độ khó</dt><dd>${meter(r.difficulty)}</dd></div><div><dt>Kinh dị</dt><dd>${meter(r.horror)}</dd></div></dl>
            <div class="room-actions">
              <button class="btn btn-line btn-sm" type="button" data-detail="${r.id}">Chi tiết</button>
              <button class="btn btn-red btn-sm" type="button" data-book-room="${r.id}">Đặt phòng</button>
            </div>
          </div>
        </div>
        <span class="room-glare"></span>
      </div>
    </article>`;
  }
  function renderRooms() {
    $('#city-tabs').innerHTML = Object.entries(G.cities)
      .map(([id, name]) => `<button type="button" role="tab" aria-selected="${ui.city === id}" class="${ui.city === id ? 'on' : ''}" data-city="${id}">${name}<small>${G.rooms.filter((r) => G.facility(r.facility).city === id).length}</small></button>`)
      .join('');
    const list = cityRooms();
    const tags = [...new Set(list.flatMap((r) => r.tags))];
    if (ui.tag && !tags.includes(ui.tag)) ui.tag = '';
    $('#tag-chips').innerHTML = ['', ...tags].map((t) => `<button type="button" class="chip ${ui.tag === t ? 'on' : ''}" data-tag="${esc(t)}">${t ? esc(t) : 'Tất cả'}</button>`).join('');
    const shown = list.filter((r) => !ui.tag || r.tags.includes(ui.tag));
    $('#room-grid').innerHTML = shown.map(roomCard).join('');
    scan();
  }

  function openRoom(id) {
    const r = G.room(id);
    if (!r) return;
    const f = G.facility(r.facility);
    const next = [];
    for (let d = 0; d < 3 && next.length < 6; d++) {
      const date = S.addDays(d);
      G.slots.forEach((_, i) => {
        if (next.length < 6 && S.canStart(r.id, date, i)) next.push({ date, i });
      });
    }
    openModal(
      `<div class="rm">
        <div class="rm-poster">${A.poster(r)}</div>
        <div class="rm-body">
          <p class="kicker">${esc(f.name)} · ${G.cities[f.city]}</p>
          <h3 class="rm-title">${esc(r.name)}<small>${esc(r.vn)}</small></h3>
          <p class="rm-teaser">“${esc(r.teaser)}”</p>
          <p>${esc(r.story)}</p>
          <dl class="rm-specs">
            <div><dt>Độ khó</dt><dd>${meter(r.difficulty)}</dd></div>
            <div><dt>Độ kinh dị</dt><dd>${meter(r.horror)}</dd></div>
            <div><dt>Thời lượng</dt><dd><b>${r.duration} phút</b></dd></div>
            <div><dt>Đội chơi</dt><dd><b>${G.rules.minPlayers} – ${G.rules.maxPlayers} người</b></dd></div>
          </dl>
          <div class="room-tags">${r.tags.map((t) => `<span>${esc(t)}</span>`).join('')}${(r.flows || []).map((t) => `<span class="alt">${esc(t)}</span>`).join('')}</div>
          <p class="rm-addr">${esc(f.address)}</p>
          <div class="rm-next">
            <h4>Suất trống gần nhất</h4>
            <div class="rm-slots">${next.length ? next.map((n) => `<button type="button" class="slot" data-quick-slot="${r.id}|${n.date}|${n.i}">${G.slots[n.i]}<small>${dayName(n.date)} ${dm(n.date)}</small></button>`).join('') : '<p class="hint">Ba ngày tới đã kín. Xem thêm ở mục Lịch trống.</p>'}</div>
          </div>
          <button class="btn btn-red btn-lg" type="button" data-book-room="${r.id}">Đặt phòng này <span aria-hidden="true">→</span></button>
          <p class="fine">Nội dung mô tả và thông số của phòng là minh hoạ trong bản concept.</p>
        </div>
      </div>`,
      { cls: 'modal-wide', label: `Phòng ${r.name}` }
    );
  }

  /* ================= Lịch trống ================= */
  const daysHTML = (active) =>
    Array.from({ length: 14 }, (_, i) => S.addDays(i))
      .map((d) => `<button type="button" class="day ${d === active ? 'on' : ''} ${S.isWeekend(d) ? 'we' : ''}" data-date="${d}"><small>${dayName(d)}</small><b>${dm(d)}</b></button>`)
      .join('');
  function renderSchedule() {
    const s = ui.sch;
    $('#sch-facility').innerHTML = G.facilities.map((f) => `<button type="button" role="tab" aria-selected="${s.facility === f.id}" class="${s.facility === f.id ? 'on' : ''}" data-fac="${f.id}">${esc(f.name)}<small>${G.cities[f.city]}</small></button>`).join('');
    $('#sch-days').innerHTML = daysHTML(s.date);
    const cols = G.slots.map((t, i) => ({ t, i })).filter((c) => !s.part || G.dayPart(c.i) === s.part);
    const rows = G.rooms.filter((r) => r.facility === s.facility && (!s.diff || r.difficulty === Number(s.diff)) && (!s.horror || r.horror === Number(s.horror)));
    if (!rows.length) {
      $('#sch-table').innerHTML = '<p class="hint pad">Không có phòng nào khớp bộ lọc ở cơ sở này. Thử nới độ khó hoặc độ kinh dị.</p>';
      return;
    }
    $('#sch-table').innerHTML = `<table>
      <thead><tr><th scope="col">Phòng</th>${cols.map((c) => `<th scope="col">${c.t}</th>`).join('')}</tr></thead>
      <tbody>${rows
        .map((r) => {
          const cells = cols
            .map((c) => {
              const state = S.slotState(r.id, s.date, c.i);
              const ok = S.canStart(r.id, s.date, c.i);
              const cls = state === 'mine' ? 'mine' : ok ? 'free' : state === 'past' ? 'past' : 'busy';
              const text = { mine: 'Vé của bạn', free: 'Đặt', past: '—', busy: 'Kín' }[cls];
              return `<td><button type="button" class="cell ${cls}" ${ok ? `data-quick-slot="${r.id}|${s.date}|${c.i}"` : 'disabled'} aria-label="${esc(r.name)} lúc ${c.t}: ${text}">${text}</button></td>`;
            })
            .join('');
          return `<tr><th scope="row"><button type="button" class="row-room" data-detail="${r.id}"><b>${esc(r.name)}</b><small>${esc(r.vn)} · ${r.duration}′</small></button></th>${cells}</tr>`;
        })
        .join('')}</tbody></table>`;
  }

  /* ================= Bảng giá ================= */
  function calcHTML() {
    const c = ui.calc;
    const r = G.room(c.roomId);
    const tier = G.pricing.tiers.find((t) => t.test(c.players));
    const per = (c.weekend ? tier.weekend : tier.weekday) + G.pricing.durationFee[r.duration] + (c.night ? G.pricing.nightFee : 0);
    return `<div class="calc">
      <h4>Tính thử cho đội của bạn</h4>
      <div class="calc-row">
        <label class="sel"><span>Phòng</span><select data-calc="roomId">${G.rooms.filter((x) => !x.base).map((x) => `<option value="${x.id}" ${x.id === c.roomId ? 'selected' : ''}>${esc(x.name)} · ${x.duration}′</option>`).join('')}</select></label>
        <div class="stepper"><button type="button" data-calc-step="-1" aria-label="Bớt người">−</button><b>${c.players} người</b><button type="button" data-calc-step="1" aria-label="Thêm người">+</button></div>
        <button type="button" class="chip ${c.weekend ? 'on' : ''}" data-calc-toggle="weekend">Cuối tuần</button>
        <button type="button" class="chip ${c.night ? 'on' : ''}" data-calc-toggle="night">Suất tối</button>
      </div>
      <p class="calc-out"><span>${fmt(per)} / người</span><b>${fmt(per * c.players)}</b><small>cả đội, chưa gồm extra</small></p>
    </div>`;
  }
  function renderPricing() {
    const p = G.pricing;
    $('#price-table').innerHTML = `<h3>Giá vé mỗi người <small>phòng 60 phút</small></h3>
      <table class="ptable">
        <thead><tr><th scope="col">Quy mô đội</th><th scope="col">Thứ 2 – Thứ 6</th><th scope="col">Thứ 7, CN, lễ</th></tr></thead>
        <tbody>${p.tiers.map((t) => `<tr><th scope="row">${t.label}</th><td>${fmt(t.weekday)}</td><td>${fmt(t.weekend)}</td></tr>`).join('')}</tbody>
      </table>
      <ul class="pnotes">
        <li>Phòng 90 phút: +${fmt(p.durationFee[90])} / người. Phòng 120 phút: +${fmt(p.durationFee[120])} / người.</li>
        <li>Suất bắt đầu từ 17:00: +${fmt(p.nightFee)} / người.</li>
        <li>Đặt cọc ${fmt(G.rules.deposit)} mỗi đội để giữ chỗ, phần còn lại thanh toán tại quầy.</li>
      </ul>
      <div id="calc">${calcHTML()}</div>`;
    $('#extras-card').innerHTML = `<h3>Tuỳ chọn thêm</h3>
      <ul class="xlist">${G.extras.map((e) => `<li><div><b>${esc(e.name)}</b><p>${esc(e.desc)}</p></div><span>+${fmt(e.price)}<small>/ ${e.per}</small></span></li>`).join('')}
      ${G.scareLevels.map((l) => `<li><div><b>Mức doạ: ${esc(l.name)}</b><p>${esc(l.desc)}</p></div><span>Miễn phí</span></li>`).join('')}</ul>`;
    $('#voucher-card').innerHTML = `<h3>Voucher đang chạy</h3>
      <ul class="vlist">${G.vouchers.map((v) => `<li><button type="button" class="vcode" data-copy="${v.code}" title="Sao chép mã">${v.code}</button><p>${esc(v.label)}</p></li>`).join('')}</ul>`;
    renderWalletBand();
  }
  function renderWalletBand() {
    const u = S.current();
    $('#wallet-band').innerHTML = `<div>
        <p class="kicker">Ví Genesis</p>
        <h3>${u ? `Số dư của bạn: <em>${fmt(u.wallet)}</em>` : 'Nạp trước, cọc phòng trong một chạm.'}</h3>
        <p class="muted">${G.topups.filter((t) => t.bonus).map((t) => `Nạp ${fmt(t.amount)} tặng ${fmt(t.bonus)}`).join(' · ')}. Hoặc nạp số tiền bất kỳ là bội số của 100.000đ.</p>
      </div>
      <button class="btn btn-red magnetic" type="button" data-topup>Nạp ví</button>`;
    scan();
  }

  /* ================= Các khối nội dung tĩnh ================= */
  function renderStatic() {
    $('#steps').innerHTML = G.steps.map((s, i) => `<article class="step"><span class="step-no">${pad(i + 1)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('') + `<article class="step step-cta"><h3>Đủ can đảm chưa?</h3><p>Chọn phòng, chọn suất, giữ chỗ trong hai phút.</p><button class="btn btn-red magnetic" type="button" data-book>Đặt phòng ngay</button></article>`;
    $('#stat-grid').innerHTML = G.stats.map((s) => `<div class="stat rv"><b data-count="${s.value}">${s.value.toLocaleString('vi-VN')}</b><span>${esc(s.label)}</span></div>`).join('');
    $('#seg-grid').innerHTML = G.segments
      .map((s, i) => `<article class="card seg rv" style="--i:${i}"><span class="seg-no">${pad(i + 1)}</span><h3>${esc(s.title)}</h3><p class="muted">${esc(s.text)}</p><button class="btn btn-line btn-sm" type="button" data-seg="${i}">${esc(s.cta)} →</button></article>`)
      .join('');
    const h = G.hiring;
    $('#hire-duties').innerHTML = h.duties.map((d) => `<li>${esc(d)}</li>`).join('');
    $('#hire-values').innerHTML = `<span>5 giá trị cốt lõi</span>${h.values.map((v) => `<b>${esc(v)}</b>`).join('')}`;
    $('#hire-shifts').innerHTML = h.shifts.map((s) => `<li><b>${s.name}</b><span>${s.time}</span>${s.note ? `<em>${s.note}</em>` : ''}</li>`).join('');
    $('#hire-perks').innerHTML = h.perks.map((p) => `<li>${esc(p)}</li>`).join('');
    $('#fac-grid').innerHTML =
      G.facilities
        .map((f, i) => {
          const count = G.rooms.filter((r) => r.facility === f.id).length;
          return `<article class="card fac rv" style="--i:${i}">
            <span class="fac-door" aria-hidden="true"><i></i></span>
            <p class="kicker">Cơ sở ${i + 1} · ${G.cities[f.city]}</p>
            <h3>${esc(f.name)}</h3>
            <p class="muted">${esc(f.address)}</p>
            <p class="fac-links"><a href="tel:${f.phone}">${f.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</a><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Genesis Escape ${f.address}`)}" target="_blank" rel="noopener">Chỉ đường ↗</a></p>
            <button class="btn btn-line btn-sm" type="button" data-fac-rooms="${f.id}">${count} phòng tại đây →</button>
          </article>`;
        })
        .join('') + `<article class="card fac fac-mail rv" style="--i:3"><p class="kicker">Email</p><h3><a href="mailto:${G.email}">${G.email}</a></h3><p class="muted">Hợp tác, sự kiện, báo chí. Đặt phòng nhanh nhất qua mục Lịch trống hoặc Fanpage.</p></article>`;
  }

  /* ================= Review ================= */
  function renderReviews() {
    $('#rev-track').innerHTML = S.reviews()
      .map((r) => {
        const room = G.room(r.room);
        return `<article class="rev"><div class="stars" role="img" aria-label="${r.stars} trên 5 sao">${'★'.repeat(r.stars)}<span>${'★'.repeat(5 - r.stars)}</span></div>
          <p class="rev-text">${esc(r.text)}</p>
          <footer><b>${esc(r.name)}</b><span>${room ? `Phòng ${esc(room.name)}` : ''}</span><em>${r.sample ? 'Review mẫu' : 'Vừa gửi'}</em></footer></article>`;
      })
      .join('');
  }
  function openReviewForm() {
    const u = S.current();
    const el = openModal(
      `<form class="form" novalidate>
        <p class="kicker">Lời khai nhân chứng</p><h3>Viết review</h3>
        <label class="f"><span>Tên bạn / tên đội</span><input name="name" maxlength="40" value="${esc(u?.name || '')}" required /></label>
        <label class="f"><span>Phòng đã chơi</span><select name="roomId">${G.rooms.filter((r) => !r.base).map((r) => `<option value="${r.id}">${esc(r.name)} – ${esc(r.vn)}</option>`).join('')}</select></label>
        <fieldset class="f rate"><legend>Chấm điểm</legend>${[5, 4, 3, 2, 1].map((n) => `<input type="radio" name="stars" id="st${n}" value="${n}" ${n === 5 ? 'checked' : ''}/><label for="st${n}" aria-label="${n} sao">★</label>`).join('')}</fieldset>
        <label class="f"><span>Cảm nhận</span><textarea name="text" rows="4" maxlength="400" required placeholder="Kể lại lượt chơi của đội bạn…"></textarea></label>
        <p class="f-status" role="status"></p>
        <button class="btn btn-red" type="submit">Gửi review</button>
        <p class="fine">Review chỉ lưu trên trình duyệt này (bản demo).</p>
      </form>`,
      { cls: 'modal-sm', label: 'Viết review' }
    );
    $('form', el).addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        S.addReview(Object.fromEntries(new FormData(e.target)));
        closeModal();
        toast('Cảm ơn lời khai của bạn!', 'ok');
        $('#rev-track').scrollTo({ left: 0, behavior: 'smooth' });
      } catch (err) {
        $('.f-status', el).textContent = err.message;
      }
    });
  }

  /* ================= Tài khoản: đăng nhập / đăng ký / quên mật khẩu ================= */
  const ACCT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function renderAcctBtn() {
    const u = S.current();
    const btn = $('#acct-btn');
    const guestTickets = !u && S.myBookings().length;
    btn.classList.toggle('in', !!u);
    btn.innerHTML = u ? `<i>${esc(u.name.trim().charAt(0).toUpperCase())}</i><span>${esc(u.name.split(' ').pop())}</span><b>${fmt(u.wallet)}</b>` : `${ACCT_ICON}<span>Đăng nhập</span>${guestTickets ? '<em></em>' : ''}`;
    btn.setAttribute('aria-label', u ? `Tài khoản của ${u.name}` : 'Đăng nhập');
  }
  function openAuth(mode = 'login', then) {
    let otp = null;
    let resetPhone = '';
    const el = openModal('<div class="auth"></div>', { cls: 'modal-sm', label: 'Tài khoản Genesis' });
    const root = $('.auth', el);
    const guestTickets = S.myBookings().length;
    const draw = (error = '') => {
      const views = {
        login: `<p class="kicker">Tài khoản</p><h3>Đăng nhập</h3>
          <form class="form" data-form="login" novalidate>
            <label class="f"><span>Số điện thoại</span><input name="phone" inputmode="tel" autocomplete="tel" required /></label>
            <label class="f"><span>Mật khẩu</span><input name="password" type="password" autocomplete="current-password" required /></label>
            <p class="f-status" role="alert">${esc(error)}</p>
            <button class="btn btn-red" type="submit">Đăng nhập</button>
          </form>
          <button class="btn btn-line btn-google" type="button" data-google><b>G</b> Đăng nhập với Google (demo)</button>
          <p class="auth-links"><button type="button" class="link" data-mode="forgot">Quên mật khẩu?</button><button type="button" class="link" data-mode="register">Tạo tài khoản mới</button></p>
          ${guestTickets ? `<p class="auth-links"><button type="button" class="link" data-guest>Xem ${guestTickets} vé đã đặt trên máy này</button></p>` : ''}`,
        register: `<p class="kicker">Tài khoản</p><h3>Đăng ký</h3>
          <form class="form" data-form="register" novalidate>
            <label class="f"><span>Họ tên</span><input name="name" autocomplete="name" required /></label>
            <label class="f"><span>Số điện thoại</span><input name="phone" inputmode="tel" autocomplete="tel" required /></label>
            <label class="f"><span>Email (không bắt buộc)</span><input name="email" type="email" autocomplete="email" /></label>
            <label class="f"><span>Mật khẩu (từ 6 ký tự)</span><input name="password" type="password" autocomplete="new-password" required /></label>
            <p class="f-status" role="alert">${esc(error)}</p>
            <button class="btn btn-red" type="submit">Tạo tài khoản</button>
          </form>
          <p class="auth-links"><button type="button" class="link" data-mode="login">Đã có tài khoản? Đăng nhập</button></p>`,
        forgot: otp
          ? `<p class="kicker">Quên mật khẩu</p><h3>Đặt mật khẩu mới</h3>
            <p class="otp">Mã OTP gửi tới ${esc(resetPhone)} <small>(bản demo không gửi SMS, mã của bạn là)</small><b>${otp}</b></p>
            <form class="form" data-form="reset" novalidate>
              <label class="f"><span>Mã OTP</span><input name="otp" inputmode="numeric" autocomplete="one-time-code" required /></label>
              <label class="f"><span>Mật khẩu mới</span><input name="password" type="password" autocomplete="new-password" required /></label>
              <p class="f-status" role="alert">${esc(error)}</p>
              <button class="btn btn-red" type="submit">Đổi mật khẩu</button>
            </form>`
          : `<p class="kicker">Quên mật khẩu</p><h3>Lấy lại mật khẩu</h3>
            <form class="form" data-form="forgot" novalidate>
              <label class="f"><span>Số điện thoại đã đăng ký</span><input name="phone" inputmode="tel" autocomplete="tel" required /></label>
              <p class="f-status" role="alert">${esc(error)}</p>
              <button class="btn btn-red" type="submit">Gửi mã OTP</button>
            </form>
            <p class="auth-links"><button type="button" class="link" data-mode="login">Quay lại đăng nhập</button></p>`,
      };
      root.innerHTML = `${views[mode]}<p class="fine">Tài khoản demo chỉ lưu trên trình duyệt này. Đừng dùng mật khẩu thật của bạn.</p>`;
      $('input', root)?.focus({ preventScroll: true });
    };
    const done = (message) => {
      closeModal();
      toast(message, 'ok');
      then?.();
    };
    root.addEventListener('click', (e) => {
      const m = e.target.closest('[data-mode]');
      if (m) {
        mode = m.dataset.mode;
        otp = null;
        draw();
      } else if (e.target.closest('[data-google]')) {
        S.loginDemo();
        done('Đã đăng nhập bằng tài khoản Google (demo).');
      } else if (e.target.closest('[data-guest]')) {
        closeModal();
        openAccount('bookings');
      }
    });
    root.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      try {
        const kind = e.target.dataset.form;
        if (kind === 'login') {
          await S.login(f.phone, f.password);
          done(`Chào ${S.current().name}, mừng bạn quay lại.`);
        } else if (kind === 'register') {
          await S.register(f);
          done('Tạo tài khoản thành công.');
        } else if (kind === 'forgot') {
          if (!S.hasAccount(f.phone)) throw new Error('Không tìm thấy tài khoản với số điện thoại này.');
          resetPhone = f.phone;
          otp = String(Math.floor(100000 + Math.random() * 900000));
          draw();
        } else if (kind === 'reset') {
          if (String(f.otp).trim() !== otp) throw new Error('Mã OTP chưa đúng.');
          await S.resetPassword(resetPhone, f.password);
          otp = null;
          mode = 'login';
          draw();
          toast('Đã đổi mật khẩu. Hãy đăng nhập lại.', 'ok');
        }
      } catch (err) {
        draw(err.message);
      }
    });
    draw();
  }

  /* ================= Vé ================= */
  function ticketHTML(b, actions = '') {
    const r = G.room(b.roomId);
    const f = G.facility(r.facility);
    const st = S.bookingStatus(b);
    const extra = b.extras.map((id) => G.extras.find((x) => x.id === id)?.name).filter(Boolean);
    return `<article class="ticket st-${st.key}">
      <div class="ticket-main">
        <p class="ticket-id">${esc(b.id)}</p>
        <h4>${esc(r.name)}<small>${esc(r.vn)}</small></h4>
        <ul>
          <li><b>${dayName(b.date)}, ${dm(b.date)}</b> · ${slotRange(r, b.slot)}</li>
          <li>${esc(f.name)} · ${esc(f.address)}</li>
          <li>${b.players} người${b.flow ? ` · ${esc(b.flow)}` : ''}${b.scare === 'soft' ? ' · Giảm doạ' : ''}${extra.length ? ` · ${extra.map(esc).join(', ')}` : ''}</li>
          <li>Người đặt: ${esc(b.contact.name)} · ${esc(b.contact.phone)}</li>
        </ul>
      </div>
      <div class="ticket-side">
        <span class="status">${st.label}</span>
        <p>Đã cọc <b>${fmt(b.quote.deposit)}</b></p>
        <p>Trả tại quầy <b>${fmt(b.quote.remain)}</b></p>
        ${actions}
      </div>
    </article>`;
  }

  /* ================= Tài khoản: vé / ví / hồ sơ / mật khẩu ================= */
  function openAccount(tab = 'bookings') {
    let confirmId = null;
    const el = openModal('<div class="acct"></div>', { cls: 'modal-wide', label: 'Tài khoản', refresh: () => draw(), onClose: () => clearInterval(timer) });
    const root = $('.acct', el);
    const tabs = [['bookings', 'Vé của tôi'], ['wallet', 'Ví'], ['profile', 'Hồ sơ'], ['password', 'Mật khẩu']];
    const body = (u) => {
      if (tab === 'bookings') {
        const list = S.myBookings();
        if (!list.length) return `<div class="empty"><p>Chưa có vé nào. Vụ án đầu tiên đang chờ bạn.</p><button class="btn btn-red" type="button" data-a="book">Đặt phòng</button></div>`;
        return `<div class="tickets">${list
          .map((b) => {
            const st = S.bookingStatus(b).key;
            const act = st === 'pending' || st === 'confirmed'
              ? `<button type="button" class="btn btn-line btn-sm ${confirmId === b.id ? 'danger' : ''}" data-a="cancel" data-id="${b.id}">${confirmId === b.id ? 'Bấm lần nữa để huỷ' : 'Huỷ vé'}</button>`
              : `<button type="button" class="btn btn-line btn-sm" data-a="rebook" data-id="${b.roomId}">Đặt lại phòng này</button>`;
            return ticketHTML(b, act);
          })
          .join('')}</div><p class="fine">Huỷ trước giờ chơi 24 tiếng được hoàn cọc về ví (cần đăng nhập). Bản demo tự chuyển vé sang “Đã xác nhận” sau khoảng 40 giây; thực tế Genesis xác nhận trong 24 – 48 giờ.</p>`;
      }
      if (!u) return `<div class="empty"><p>Đăng nhập để dùng ví, lưu hồ sơ và đổi mật khẩu.</p><button class="btn btn-red" type="button" data-a="login">Đăng nhập</button></div>`;
      if (tab === 'wallet') {
        const label = { topup: 'Nạp ví', bonus: 'Thưởng', pay: 'Thanh toán', refund: 'Hoàn cọc' };
        return `<div class="wallet">
          <div class="wallet-card"><p class="kicker">Số dư ví Genesis</p><p class="wallet-amt">${fmt(u.wallet)}</p><button class="btn btn-red" type="button" data-a="topup">Nạp thêm</button></div>
          <div class="tx"><h4>Lịch sử giao dịch</h4>${u.tx.length ? `<ul>${u.tx.map((t) => `<li><span><b>${label[t.type] || ''}</b><small>${esc(t.note)} · ${new Date(t.at).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</small></span><em class="${t.amount < 0 ? 'neg' : 'pos'}">${t.amount < 0 ? '−' : '+'}${fmt(Math.abs(t.amount))}</em></li>`).join('')}</ul>` : '<p class="hint">Chưa có giao dịch nào.</p>'}</div>
        </div>`;
      }
      if (tab === 'profile')
        return `<form class="form" data-form="profile" novalidate>
          <div class="f-row"><label class="f"><span>Họ tên</span><input name="name" value="${esc(u.name)}" autocomplete="name" required /></label><label class="f"><span>Số điện thoại</span><input value="${esc(u.phone)}" disabled /></label></div>
          <div class="f-row"><label class="f"><span>Email</span><input name="email" type="email" value="${esc(u.email || '')}" autocomplete="email" /></label><label class="f"><span>Ngày sinh</span><input name="dob" type="date" value="${esc(u.dob || '')}" max="${S.today()}" /></label></div>
          <div class="f-row"><label class="f"><span>Giới tính</span><select name="gender">${['', 'Nam', 'Nữ', 'Khác'].map((g) => `<option value="${g}" ${u.gender === g ? 'selected' : ''}>${g || 'Không tiết lộ'}</option>`).join('')}</select></label><label class="f"><span>Trường học / nơi làm việc</span><input name="org" value="${esc(u.org || '')}" autocomplete="organization" /></label></div>
          <p class="f-status" role="status"></p>
          <button class="btn btn-red" type="submit">Lưu hồ sơ</button>
        </form>`;
      return u.demo
        ? '<p class="hint">Tài khoản Google (demo) không dùng mật khẩu.</p>'
        : `<form class="form narrow" data-form="password" novalidate>
          <label class="f"><span>Mật khẩu hiện tại</span><input name="old" type="password" autocomplete="current-password" required /></label>
          <label class="f"><span>Mật khẩu mới (từ 6 ký tự)</span><input name="pw" type="password" autocomplete="new-password" required /></label>
          <p class="f-status" role="status"></p>
          <button class="btn btn-red" type="submit">Đổi mật khẩu</button>
        </form>`;
    };
    function draw() {
      const u = S.current();
      const keep = $('.acct-body', root)?.scrollTop || 0;
      root.innerHTML = `<header class="acct-head">
          <span class="acct-ava">${u ? esc(u.name.trim().charAt(0).toUpperCase()) : '?'}</span>
          <div><h3>${u ? esc(u.name) : 'Khách'}</h3><p class="muted">${u ? `${esc(u.phone)}${u.email ? ` · ${esc(u.email)}` : ''}` : 'Vé đặt khi chưa đăng nhập chỉ lưu trong phiên này.'}</p></div>
          ${u ? '<button class="btn btn-line btn-sm" type="button" data-a="logout">Đăng xuất</button>' : '<button class="btn btn-red btn-sm" type="button" data-a="login">Đăng nhập</button>'}
        </header>
        <div class="tabs acct-tabs" role="tablist">${tabs.map(([id, name]) => `<button type="button" role="tab" aria-selected="${tab === id}" class="${tab === id ? 'on' : ''}" data-tab="${id}">${name}</button>`).join('')}</div>
        <div class="acct-body">${body(u)}</div>`;
      $('.acct-body', root).scrollTop = keep;
    }
    // vé "Chờ xác nhận" tự chuyển trạng thái trong bản demo -> vẽ lại định kỳ khi đang xem tab vé
    const timer = setInterval(() => {
      if (tab === 'bookings' && !confirmId && stack[stack.length - 1]?.el === el) draw();
    }, 5000);
    root.addEventListener('click', (e) => {
      const t = e.target.closest('[data-tab]');
      if (t) {
        tab = t.dataset.tab;
        confirmId = null;
        return draw();
      }
      const a = e.target.closest('[data-a]');
      if (!a) return;
      const act = a.dataset.a;
      if (act === 'logout') {
        S.logout();
        closeModal();
        toast('Đã đăng xuất.');
      } else if (act === 'login') openAuth('login');
      else if (act === 'topup') openTopup();
      else if (act === 'book') {
        closeModal();
        openBooking();
      } else if (act === 'rebook') {
        closeModal();
        openBooking({ roomId: a.dataset.id });
      } else if (act === 'cancel') {
        if (confirmId !== a.dataset.id) {
          confirmId = a.dataset.id;
          return draw();
        }
        confirmId = null;
        try {
          const res = S.cancelBooking(a.dataset.id);
          toast(res.refunded ? `Đã huỷ vé. Hoàn ${fmt(res.refunded)} về ví.` : res.late ? 'Đã huỷ vé. Huỷ sát giờ nên không hoàn cọc.' : 'Đã huỷ vé. Đăng nhập khi đặt để được hoàn cọc về ví.', res.refunded ? 'ok' : '');
        } catch (err) {
          toast(err.message, 'err');
        }
      }
    });
    root.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      const status = $('.f-status', e.target);
      try {
        if (e.target.dataset.form === 'profile') {
          S.updateProfile(f);
          toast('Đã lưu hồ sơ.', 'ok');
        } else {
          await S.changePassword(f.old, f.pw);
          e.target.reset();
          toast('Đã đổi mật khẩu.', 'ok');
        }
      } catch (err) {
        status.textContent = err.message;
      }
    });
    draw();
  }

  /* ================= Nạp ví ================= */
  function openTopup() {
    if (!S.current()) return openAuth('login', openTopup);
    let amount = 1000000;
    let stage = 'pick';
    let stopQr = null;
    const el = openModal('<div class="topup"></div>', { cls: 'modal-sm', label: 'Nạp ví Genesis', onClose: () => stopQr?.() });
    const root = $('.topup', el);
    const bonusOf = (n) => [...G.topups].reverse().find((p) => n >= p.amount && p.bonus)?.bonus || 0;
    const draw = (error = '') => {
      stopQr?.();
      stopQr = null;
      if (stage === 'qr') {
        root.innerHTML = '<p class="kicker">Nạp ví</p><h3>Quét mã để nạp</h3><div class="qr-host"></div>';
        stopQr = mountQr($('.qr-host', root), {
          amount,
          memo: `NAP ${S.current().phone}`,
          onBack: () => {
            stage = 'pick';
            draw();
          },
          onPaid: () => {
            try {
              const bonus = S.topup(amount);
              closeModal();
              toast(`Đã nạp ${fmt(amount)}${bonus ? `, tặng thêm ${fmt(bonus)}` : ''} vào ví.`, 'ok');
            } catch (err) {
              stage = 'pick';
              draw(err.message);
            }
          },
        });
        return;
      }
      const bonus = bonusOf(amount);
      root.innerHTML = `<p class="kicker">Ví Genesis</p><h3>Nạp tiền</h3>
        <div class="packs">${G.topups.map((p) => `<button type="button" class="pack ${amount === p.amount ? 'on' : ''}" data-amount="${p.amount}"><b>${fmt(p.amount)}</b><small>${p.bonus ? `Tặng ${fmt(p.bonus)}` : 'Gói cơ bản'}</small></button>`).join('')}</div>
        <label class="f"><span>Hoặc nhập số tiền (bội số của 100.000đ)</span><input id="topup-custom" type="number" min="100000" step="100000" max="20000000" value="${amount}" inputmode="numeric" /></label>
        <p class="topup-sum">Nhận vào ví <b>${fmt(amount + bonus)}</b>${bonus ? `<small>gồm ${fmt(bonus)} tiền thưởng</small>` : ''}</p>
        <p class="f-status" role="alert">${esc(error)}</p>
        <button class="btn btn-red" type="button" data-go>Tạo mã QR</button>`;
    };
    root.addEventListener('click', (e) => {
      const p = e.target.closest('[data-amount]');
      if (p) {
        amount = Number(p.dataset.amount);
        return draw();
      }
      if (e.target.closest('[data-go]')) {
        amount = Math.round(Number($('#topup-custom', root).value));
        if (!amount || amount < 100000 || amount % 100000) return draw('Số tiền nạp là bội số của 100.000đ.');
        if (amount > 20000000) return draw('Bản demo giới hạn 20.000.000đ mỗi lần nạp.');
        stage = 'qr';
        draw();
      }
    });
    root.addEventListener('change', (e) => {
      if (e.target.id === 'topup-custom') {
        amount = Math.round(Number(e.target.value)) || 0;
        draw();
      }
    });
    draw();
  }

  /* ================= Đặt phòng ================= */
  function openBooking(pre = {}) {
    const u0 = S.current();
    const preRoom = pre.roomId ? G.room(pre.roomId) : null;
    const st = {
      step: 1,
      facility: preRoom?.facility || pre.facility || ui.sch.facility,
      roomId: preRoom?.id || '',
      date: pre.date && pre.date >= S.today() ? pre.date : S.today(),
      slot: pre.slot ?? null,
      players: pre.players || 4,
      flow: preRoom?.flows?.[0] || '',
      extras: [],
      scare: 'normal',
      voucher: '',
      vinput: '',
      note: '',
      contact: { name: u0?.name || '', phone: u0?.phone || '', email: u0?.email || '' },
      method: u0 && u0.wallet >= G.rules.deposit ? 'wallet' : 'qr',
      error: '',
      done: null,
    };
    if (st.roomId && st.slot != null && !S.canStart(st.roomId, st.date, st.slot)) st.slot = null;
    let stopQr = null;
    const el = openModal('<div class="bk"></div>', {
      cls: 'modal-bk',
      label: 'Đặt phòng',
      onClose: () => stopQr?.(),
      refresh: () => {
        if (typeof st.step === 'number') draw();
      },
    });
    const root = $('.bk', el);
    const room = () => G.room(st.roomId);
    const quote = () => (room() && st.slot != null ? S.quote(st) : null);
    const vcheck = () => (st.voucher && room() && st.slot != null ? S.checkVoucher(st.voucher, st) : null);

    const head = () => {
      const at = st.step === 'qr' ? 3 : st.step === 'done' ? 4 : st.step;
      return `<header class="bk-head"><p class="kicker">Đặt phòng</p><ol class="bk-steps">${['Chọn suất', 'Tuỳ chọn', 'Đặt cọc'].map((t, i) => `<li class="${at === i + 1 ? 'on' : at > i + 1 ? 'done' : ''}"><b>${at > i + 1 ? '✓' : i + 1}</b><span>${t}</span></li>`).join('')}</ol></header>`;
    };

    const step1 = () => {
      const r = room();
      return `<div class="bk-block"><h4>Cơ sở</h4><div class="opt-row">${G.facilities.map((f) => `<button type="button" class="opt ${st.facility === f.id ? 'on' : ''}" data-act="facility" data-val="${f.id}"><b>${esc(f.name)}</b><small>${G.cities[f.city]}</small></button>`).join('')}</div></div>
        <div class="bk-block"><h4>Phòng</h4><div class="bk-rooms">${G.rooms
          .filter((x) => x.facility === st.facility)
          .map((x) => `<button type="button" class="bk-room ${st.roomId === x.id ? 'on' : ''}" data-act="room" data-val="${x.id}"><span class="bk-thumb">${A.poster(x)}</span><span class="bk-room-text"><b>${esc(x.name)}</b><small>${esc(x.vn)} · ${x.duration}′</small><small class="free">${S.freeCount(x.id, st.date)} suất trống</small></span></button>`)
          .join('')}</div></div>
        <div class="bk-block"><h4>Ngày</h4><div class="days">${daysHTML(st.date).replaceAll('data-date=', 'data-act="date" data-val=')}</div></div>
        <div class="bk-block"><h4>Suất chơi ${r ? `<small>mỗi lượt ${r.duration} phút</small>` : ''}</h4>${
          r
            ? `<div class="slots">${G.slots
                .map((t, i) => {
                  const ok = S.canStart(r.id, st.date, i);
                  const mine = S.slotState(r.id, st.date, i) === 'mine';
                  return `<button type="button" class="slot ${st.slot === i ? 'on' : ''} ${mine ? 'mine' : ''}" data-act="slot" data-val="${i}" ${ok ? '' : 'disabled'}>${t}<small>${mine ? 'Vé của bạn' : ok ? G.dayPart(i) : 'Kín'}</small></button>`;
                })
                .join('')}</div>`
            : '<p class="hint">Chọn phòng để xem các suất còn trống.</p>'
        }</div>
        <div class="bk-block bk-inline">
          <div><h4>Số người</h4><div class="stepper"><button type="button" data-act="players" data-val="-1" ${st.players <= G.rules.minPlayers ? 'disabled' : ''} aria-label="Bớt người">−</button><b>${st.players} người</b><button type="button" data-act="players" data-val="1" ${st.players >= G.rules.maxPlayers ? 'disabled' : ''} aria-label="Thêm người">+</button></div></div>
          ${r?.flows ? `<div><h4>Flow</h4><div class="opt-row">${r.flows.map((f) => `<button type="button" class="opt sm ${st.flow === f ? 'on' : ''}" data-act="flow" data-val="${esc(f)}"><b>${esc(f)}</b></button>`).join('')}</div></div>` : ''}
        </div>`;
    };

    const step2 = () => {
      const res = vcheck();
      return `<div class="bk-block"><h4>Extra</h4><div class="opt-col">${G.extras.map((e) => `<button type="button" class="opt wide ${st.extras.includes(e.id) ? 'on' : ''}" data-act="extra" data-val="${e.id}" aria-pressed="${st.extras.includes(e.id)}"><span><b>${esc(e.name)}</b><small>${esc(e.desc)}</small></span><em>+${fmt(e.price)} / ${e.per}</em></button>`).join('')}</div></div>
        <div class="bk-block"><h4>Mức độ doạ</h4><div class="opt-row">${G.scareLevels.map((l) => `<button type="button" class="opt ${st.scare === l.id ? 'on' : ''}" data-act="scare" data-val="${l.id}"><b>${esc(l.name)}</b><small>${esc(l.desc)}</small></button>`).join('')}</div></div>
        <div class="bk-block"><h4>Voucher</h4>
          <div class="voucher-row"><input data-field="vinput" value="${esc(st.vinput)}" placeholder="Nhập mã" autocapitalize="characters" aria-label="Mã voucher" /><button type="button" class="btn btn-line btn-sm" data-act="voucher-apply">Áp dụng</button></div>
          ${res ? (res.voucher ? `<p class="v-ok">Đã áp dụng ${res.voucher.code}: ${esc(res.voucher.label)}. <button type="button" class="link" data-act="voucher-clear">Bỏ mã</button></p>` : `<p class="v-err">${esc(res.error)}</p>`) : ''}
          <p class="hint">Mã demo: ${G.vouchers.map((v) => `<button type="button" class="link" data-act="voucher-pick" data-val="${v.code}">${v.code}</button>`).join(' · ')}</p>
        </div>
        <div class="bk-block"><h4>Ghi chú cho Game Master</h4><textarea data-field="note" rows="2" maxlength="300" placeholder="Đội có người sợ tối, sinh nhật bạn A, cần hỗ trợ đặc biệt…">${esc(st.note)}</textarea></div>`;
    };

    const step3 = () => {
      const u = S.current();
      const q = quote();
      return `<div class="bk-block"><h4>Người đặt</h4>
          <div class="f-row"><label class="f"><span>Họ tên</span><input data-field="name" value="${esc(st.contact.name)}" autocomplete="name" /></label><label class="f"><span>Số điện thoại</span><input data-field="phone" value="${esc(st.contact.phone)}" inputmode="tel" autocomplete="tel" /></label></div>
          <label class="f"><span>Email nhận xác nhận (không bắt buộc)</span><input data-field="email" type="email" value="${esc(st.contact.email)}" autocomplete="email" /></label>
        </div>
        <div class="bk-block"><h4>Đặt cọc ${fmt(q.deposit)} bằng</h4><div class="opt-col">
          <button type="button" class="opt wide ${st.method === 'qr' ? 'on' : ''}" data-act="method" data-val="qr"><span><b>Chuyển khoản QR</b><small>Mã có hiệu lực ${G.rules.qrSeconds} giây (giả lập)</small></span></button>
          ${
            u
              ? `<button type="button" class="opt wide ${st.method === 'wallet' ? 'on' : ''}" data-act="method" data-val="wallet" ${u.wallet < q.deposit ? 'disabled' : ''}><span><b>Ví Genesis</b><small>Số dư ${fmt(u.wallet)}${u.wallet < q.deposit ? ' · chưa đủ' : ''}</small></span></button>${u.wallet < q.deposit ? '<p class="hint"><button type="button" class="link" data-act="topup">Nạp ví ngay</button> để cọc trong một chạm.</p>' : ''}`
              : '<p class="hint"><button type="button" class="link" data-act="login">Đăng nhập</button> để cọc bằng ví và lưu vé vào tài khoản.</p>'
          }
        </div></div>
        <p class="fine">Tiền cọc dùng để giữ chỗ, phần còn lại thanh toán tại quầy. Genesis xác nhận lịch trong 24 – 48 giờ. Đây là bản demo: không có khoản tiền thật nào được chuyển.</p>`;
    };

    const done = () => `<div class="bk-done">
        <div class="stamp">ĐÃ GIỮ CHỖ</div>
        <h3>Hồ sơ vụ án đã mở.</h3>
        <p class="muted">Mã vé <b>${esc(st.done.id)}</b>. Có mặt trước giờ chơi 15 phút để nghe phổ biến luật.</p>
        ${ticketHTML(st.done)}
        <div class="bk-done-actions"><button class="btn btn-red" type="button" data-act="tickets">Xem vé của tôi</button><button class="btn btn-line" type="button" data-act="close">Đóng</button></div>
      </div>`;

    const summary = () => {
      const r = room();
      const q = quote();
      const f = G.facility(st.facility);
      const row = (k, v) => `<li><span>${k}</span><b>${v}</b></li>`;
      return `<aside class="bk-sum">
        <div class="bk-sum-poster">${r ? A.poster(r) : '<div class="ph">?</div>'}</div>
        <h4>${r ? `${esc(r.name)}<small>${esc(r.vn)}</small>` : 'Chưa chọn phòng'}</h4>
        <ul class="sum-list">
          ${row('Cơ sở', esc(f.name))}
          ${row('Ngày', `${dayName(st.date)}, ${dm(st.date)}`)}
          ${row('Suất', r && st.slot != null ? slotRange(r, st.slot) : '—')}
          ${row('Đội', `${st.players} người`)}
          ${st.flow ? row('Flow', esc(st.flow)) : ''}
          ${st.scare === 'soft' ? row('Mức doạ', 'Giảm doạ') : ''}
        </ul>
        ${
          q
            ? `<ul class="sum-lines">${q.lines.map((l) => `<li><span>${esc(l.label)}</span><b>${l.amount < 0 ? '−' : ''}${fmt(Math.abs(l.amount))}</b></li>`).join('')}</ul>
              <p class="sum-total"><span>Tổng</span><b>${fmt(q.total)}</b></p>
              <p class="sum-dep"><span>Cọc bây giờ</span><b>${fmt(q.deposit)}</b></p>
              <p class="sum-rem"><span>Trả tại quầy</span><b>${fmt(q.remain)}</b></p>`
            : '<p class="hint">Chọn phòng và suất để xem giá.</p>'
        }
      </aside>`;
    };

    let shownStep = null;
    function draw() {
      // Giữ nguyên vị trí cuộn khi chỉ đổi lựa chọn; sang bước khác thì về đầu
      const box = $('.modal-box', el);
      const same = shownStep === st.step;
      const keep = same ? $('.bk-main', root)?.scrollTop || 0 : 0;
      const keepBox = same ? box.scrollTop : 0;
      shownStep = st.step;
      requestAnimationFrame(() => (box.scrollTop = keepBox));
      stopQr?.();
      stopQr = null;
      if (st.step === 'done') {
        root.innerHTML = `${head()}<div class="bk-main single">${done()}</div>`;
        return;
      }
      if (st.step === 'qr') {
        root.innerHTML = `${head()}<div class="bk-grid"><div class="bk-main"><div class="qr-host"></div></div>${summary()}</div>`;
        stopQr = mountQr($('.qr-host', root), {
          amount: quote().deposit,
          memo: `GEN ${st.contact.phone.replace(/\D/g, '')}`,
          onBack: () => {
            st.step = 3;
            draw();
          },
          onPaid: finish,
        });
        return;
      }
      const q = quote();
      if (!q && st.step > 1) shownStep = st.step = 1; // suất đã chọn không còn hợp lệ: quay về bước chọn suất
      const nextLabel = st.step === 3 ? `Đặt cọc ${q ? fmt(q.deposit) : ''}` : 'Tiếp tục';
      root.innerHTML = `${head()}<div class="bk-grid">
        <div class="bk-main">${[step1, step2, step3][st.step - 1]()}</div>
        ${summary()}
      </div>
      <footer class="bk-nav">
        ${st.step > 1 ? '<button class="btn btn-line" type="button" data-act="back">← Quay lại</button>' : '<span></span>'}
        <p class="bk-error" role="alert">${esc(st.error)}</p>
        <button class="btn btn-red" type="button" data-act="${st.step === 3 ? 'pay' : 'next'}">${nextLabel} <span aria-hidden="true">→</span></button>
      </footer>`;
      $('.bk-main', root).scrollTop = keep;
    }

    function finish() {
      try {
        st.done = S.createBooking(st);
        st.step = 'done';
      } catch (err) {
        st.error = err.message;
        st.step = 3;
      }
      draw();
    }

    root.addEventListener('input', (e) => {
      const f = e.target.dataset.field;
      if (!f) return;
      if (f === 'note' || f === 'vinput') st[f] = e.target.value;
      else st.contact[f] = e.target.value;
    });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.dataset.field === 'vinput') {
        e.preventDefault();
        st.voucher = st.vinput.trim().toUpperCase();
        draw();
      }
    });
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b || b.disabled) return;
      const v = b.dataset.val;
      st.error = '';
      switch (b.dataset.act) {
        case 'facility':
          st.facility = v;
          if (room()?.facility !== v) Object.assign(st, { roomId: '', slot: null, flow: '' });
          break;
        case 'room':
          st.roomId = v;
          st.flow = room().flows?.[0] || '';
          break;
        case 'date':
          st.date = v;
          break;
        case 'slot':
          st.slot = Number(v);
          break;
        case 'players':
          st.players = Math.min(G.rules.maxPlayers, Math.max(G.rules.minPlayers, st.players + Number(v)));
          break;
        case 'flow':
          st.flow = v;
          break;
        case 'extra':
          st.extras = st.extras.includes(v) ? st.extras.filter((x) => x !== v) : [...st.extras, v];
          break;
        case 'scare':
          st.scare = v;
          break;
        case 'voucher-apply':
          st.voucher = st.vinput.trim().toUpperCase();
          break;
        case 'voucher-pick':
          st.voucher = st.vinput = v;
          break;
        case 'voucher-clear':
          st.voucher = st.vinput = '';
          break;
        case 'method':
          st.method = v;
          break;
        case 'login':
          openAuth('login', () => {
            const u = S.current();
            for (const k of ['name', 'phone', 'email']) if (!st.contact[k]) st.contact[k] = u[k] || '';
            if (u.wallet >= quote().deposit) st.method = 'wallet';
            draw();
          });
          return;
        case 'topup':
          openTopup();
          return;
        case 'back':
          st.step -= 1;
          break;
        case 'next':
          if (st.step === 1 && !room()) st.error = 'Hãy chọn một phòng chơi.';
          else if (st.step === 1 && st.slot == null) st.error = 'Hãy chọn một suất còn trống.';
          else st.step += 1;
          break;
        case 'pay':
          try {
            S.checkBooking(st);
          } catch (err) {
            st.error = err.message;
            break;
          }
          if (st.method === 'wallet') return finish();
          st.step = 'qr';
          break;
        case 'tickets':
          closeModal();
          openAccount('bookings');
          return;
        case 'close':
          closeModal();
          return;
        default:
          return;
      }
      // đổi phòng / ngày có thể làm suất đang chọn không còn hợp lệ
      if (st.roomId && st.slot != null && !S.canStart(st.roomId, st.date, st.slot)) st.slot = null;
      draw();
    });
    draw();
  }

  /* ================= Biểu mẫu liên hệ / yêu cầu nhóm ================= */
  function bindRequestForm(sel, kind, okMessage) {
    const form = $(sel);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = $('.f-status', form);
      try {
        S.addRequest(kind, Object.fromEntries(new FormData(form)));
        form.reset();
        status.textContent = okMessage;
        status.dataset.state = 'ok';
      } catch (err) {
        status.textContent = err.message;
        status.dataset.state = 'err';
      }
    });
  }

  /* ================= Sự kiện chung ================= */
  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.addEventListener('click', (e) => {
    const t = e.target;
    const pick = (sel) => t.closest(sel);
    let n;
    if ((n = pick('[data-quick-slot]'))) {
      const [roomId, date, slot] = n.dataset.quickSlot.split('|');
      if (pick('.rm')) closeModal();
      return openBooking({ roomId, date, slot: Number(slot) });
    }
    if ((n = pick('[data-book-room]'))) {
      if (pick('.rm')) closeModal();
      return openBooking({ roomId: n.dataset.bookRoom });
    }
    if ((n = pick('[data-detail]'))) return openRoom(n.dataset.detail);
    if ((n = pick('[data-book]'))) return openBooking();
    if ((n = pick('.room-card'))) return openRoom(n.dataset.room);
    if ((n = pick('[data-city]'))) {
      ui.city = n.dataset.city;
      ui.tag = '';
      return renderRooms();
    }
    if ((n = pick('[data-tag]'))) {
      ui.tag = n.dataset.tag;
      return renderRooms();
    }
    if ((n = pick('#schedule [data-fac]'))) {
      ui.sch.facility = n.dataset.fac;
      return renderSchedule();
    }
    if ((n = pick('#sch-days [data-date]'))) {
      ui.sch.date = n.dataset.date;
      return renderSchedule();
    }
    if ((n = pick('[data-topup]'))) return openTopup();
    if ((n = pick('[data-copy]'))) {
      const code = n.dataset.copy;
      const ok = () => toast(`Đã sao chép mã ${code}. Dán ở bước “Tuỳ chọn” khi đặt phòng.`, 'ok');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(ok, () => toast(`Mã của bạn: ${code}`));
      else toast(`Mã của bạn: ${code}`);
      return;
    }
    if ((n = pick('[data-calc-step]'))) {
      ui.calc.players = Math.min(8, Math.max(4, ui.calc.players + Number(n.dataset.calcStep)));
      $('#calc').innerHTML = calcHTML();
      return;
    }
    if ((n = pick('[data-calc-toggle]'))) {
      ui.calc[n.dataset.calcToggle] = !ui.calc[n.dataset.calcToggle];
      $('#calc').innerHTML = calcHTML();
      return;
    }
    if ((n = pick('[data-seg]'))) {
      const s = G.segments[Number(n.dataset.seg)];
      if (s.target === 'group') {
        goTo('group-form');
        return setTimeout(() => $('#group-form input')?.focus({ preventScroll: true }), 600);
      }
      ui.city = 'hn';
      ui.tag = s.tag || '';
      renderRooms();
      return goTo('rooms');
    }
    if ((n = pick('[data-fac-rooms]'))) {
      const f = G.facility(n.dataset.facRooms);
      ui.city = f.city;
      ui.tag = '';
      ui.sch.facility = f.id;
      renderRooms();
      renderSchedule();
      return goTo('rooms');
    }
    if (pick('#acct-btn')) return S.current() ? openAccount('bookings') : openAuth('login');
    if (pick('#rev-write')) return openReviewForm();
    if (pick('#rev-prev') || pick('#rev-next')) {
      const track = $('#rev-track');
      const step = ($('.rev', track)?.offsetWidth || 320) + 20;
      return track.scrollBy({ left: pick('#rev-next') ? step : -step, behavior: 'smooth' });
    }
    if (pick('#reset-demo')) {
      if (confirm('Xoá toàn bộ tài khoản, ví, vé và review demo đang lưu trên trình duyệt này?')) {
        S.resetAll();
        toast('Đã xoá dữ liệu demo.');
      }
      return;
    }
    if (pick('#burger')) {
      const open = html.classList.toggle('menu-open');
      return $('#burger').setAttribute('aria-expanded', String(open));
    }
    if (pick('#menu a')) {
      html.classList.remove('menu-open');
      $('#burger').setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList?.contains('room-card')) openRoom(e.target.dataset.room);
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.id === 'sch-diff') ui.sch.diff = t.value;
    else if (t.id === 'sch-horror') ui.sch.horror = t.value;
    else if (t.id === 'sch-part') ui.sch.part = t.value;
    else if (t.dataset.calc) {
      ui.calc[t.dataset.calc] = t.value;
      $('#calc').innerHTML = calcHTML();
      return;
    } else return;
    renderSchedule();
  });

  /* ================= Khởi động ================= */
  renderQuick();
  renderMarquee();
  renderRooms();
  renderSchedule();
  renderPricing();
  renderStatic();
  renderReviews();
  renderAcctBtn();
  bindRequestForm('#group-form', 'group', 'Đã ghi nhận yêu cầu (bản demo: chỉ lưu trên máy bạn).');
  bindRequestForm('#contact-form', 'contact', 'Đã ghi nhận lời nhắn (bản demo: chỉ lưu trên máy bạn).');

  S.onChange(() => {
    renderAcctBtn();
    renderSchedule();
    renderWalletBand();
    renderReviews();
    stack.forEach((m) => m.refresh?.());
  });

  window.GenesisApp = { openBooking, openRoom, openAuth, openAccount, toast };
})();
