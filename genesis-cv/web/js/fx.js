/*
 * Hiệu ứng của bản concept Genesis: màn mở đầu, đèn pin trong hero, tàn lửa, thẻ nghiêng 3D, nút hút chuột,
 * con trỏ, hiện dần khi cuộn, đếm số, cuộn ngang phần "Cách chơi", âm thanh nền.
 * Tất cả đều là lớp trang trí: thiếu GSAP hay bật "giảm chuyển động" thì nội dung vẫn dùng được bình thường.
 */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (gsap && ST) gsap.registerPlugin(ST);

  /* ---------- Hiện dần khi cuộn tới + đếm số ---------- */
  const countUp = (el) => {
    const to = Number(el.dataset.count);
    if (reduce || !to) return;
    const t0 = performance.now();
    const dur = Math.min(2200, 700 + to / 12);
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('vi-VN');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
        if (e.target.dataset.count) countUp(e.target);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  /* ---------- Nút "hút" con trỏ ---------- */
  function magnet(el) {
    if (el.dataset.mag || !fine || reduce) return;
    el.dataset.mag = '1';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 14}px, ${((e.clientY - r.top) / r.height - 0.5) * 10}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  }

  function scan() {
    $$('.rv:not(.in)').forEach((el) => io.observe(el));
    $$('.magnetic').forEach(magnet);
  }

  /* ---------- Thẻ phòng nghiêng 3D theo con trỏ ---------- */
  if (fine && !reduce) {
    const grid = $('#room-grid');
    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.room-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
    });
    grid.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.room-card');
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      }
    });
  }

  /* ---------- Con trỏ phụ ---------- */
  const cursor = $('#cursor');
  if (fine && !reduce) {
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let cx = x;
    let cy = y;
    html.classList.add('has-cursor');
    addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.toggle('hot', !!e.target.closest?.('a, button, .room-card, select, input, textarea, label'));
    });
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Hero: đèn pin ---------- */
  const hero = $('#hero');
  const torch = $('#torch');
  const setTorch = (px, py) => {
    torch.style.setProperty('--tx', `${px}px`);
    torch.style.setProperty('--ty', `${py}px`);
  };
  if (fine && !reduce) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      setTorch(e.clientX - r.left, e.clientY - r.top);
      hero.classList.add('torch-on');
    });
  } else if (!reduce) {
    // Màn hình cảm ứng: đèn pin tự lia chậm qua các góc tối
    $('#torch-hint').textContent = 'Có thứ gì đó đang nhìn bạn từ trong bóng tối';
    let t = 0;
    let visible = true;
    new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(hero);
    const wander = () => {
      if (visible) {
        t += 0.006;
        setTorch(hero.clientWidth * (0.5 + 0.42 * Math.sin(t * 1.3)), hero.clientHeight * (0.42 + 0.26 * Math.sin(t * 2.1 + 1)));
      }
      requestAnimationFrame(wander);
    };
    wander();
  }

  /* ---------- Hero: tàn lửa bay ---------- */
  (function embers() {
    const canvas = $('#embers');
    if (reduce || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let visible = true;
    const dots = [];
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (anywhere) => ({ x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10, r: 0.6 + Math.random() * 1.8, vy: 0.15 + Math.random() * 0.55, sway: Math.random() * Math.PI * 2, hot: Math.random() < 0.35, a: 0.2 + Math.random() * 0.6 });
    size();
    addEventListener('resize', size);
    const count = Math.min(70, Math.round(w / 22));
    for (let i = 0; i < count; i++) dots.push(spawn(true));
    new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(hero);
    const frame = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        dots.forEach((d, i) => {
          d.y -= d.vy;
          d.sway += 0.012;
          d.x += Math.sin(d.sway) * 0.3;
          if (d.y < -10) dots[i] = spawn(false);
          ctx.beginPath();
          ctx.fillStyle = d.hot ? `rgba(255, 90, 70, ${d.a})` : `rgba(255, 220, 180, ${d.a * 0.5})`;
          ctx.arc(d.x, d.y, d.r, 0, 6.283);
          ctx.fill();
        });
      }
      requestAnimationFrame(frame);
    };
    frame();
  })();

  /* ---------- Header: trạng thái cuộn + mục đang xem ---------- */
  const top = $('#top');
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const links = $$('#menu a');
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${e.target.id}`));
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  $$('main section[id]').forEach((s) => spy.observe(s));

  /* ---------- GSAP: mở màn, hành lang lùi sâu khi cuộn, cuộn ngang "Cách chơi" ---------- */
  function intro() {
    if (!gsap || reduce) return;
    gsap.from('.hero-title .glitch', { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.12 });
    gsap.from('.hero .kicker, .hero-lead, .hero-cta, .torch-hint, .quick', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.09, delay: 0.35 });
    gsap.from('.hero-scene', { scale: 1.18, opacity: 0, duration: 1.8, ease: 'power2.out' });
  }
  function scrollFx() {
    if (!gsap || !ST || reduce) return;
    gsap.to('.corridor', { scale: 1.9, ease: 'none', transformOrigin: '50% 50.5%', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-body', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true } });
    gsap.to('#marquee', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });

    ST.matchMedia({
      '(min-width: 900px)': () => {
        const steps = $('#steps');
        const dist = () => Math.max(0, steps.scrollWidth - innerWidth);
        html.classList.add('howto-pinned');
        const tween = gsap.to(steps, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: '.howto-pin', pin: true, start: 'top top', end: () => `+=${dist()}`, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(steps, { clearProps: 'transform' });
          html.classList.remove('howto-pinned');
        };
      },
    });
    document.fonts?.ready.then(() => ST.refresh());
    addEventListener('load', () => ST.refresh());
  }

  /* ---------- Màn mở đầu ---------- */
  function ready() {
    if (html.classList.contains('ready')) return;
    html.classList.add('ready');
    intro();
    setTimeout(() => $('#preloader')?.remove(), 900);
  }
  const minShow = new Promise((r) => setTimeout(r, reduce ? 0 : 1100));
  const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r)));
  Promise.race([Promise.all([minShow, loaded]), new Promise((r) => setTimeout(r, 2400))]).then(ready); // mạng chậm cũng không giữ màn chờ quá 2,4 giây

  /* ---------- Âm thanh nền (tổng hợp bằng WebAudio, chỉ chạy khi người dùng bật) ---------- */
  const sound = (() => {
    let ctx = null;
    let master = null;
    let on = false;
    function build() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      // hai dao động trầm lệch pha nhau tạo tiếng ù "phập phồng"
      [55, 55.6, 82.4].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = i === 2 ? 'triangle' : 'sine';
        o.frequency.value = f;
        g.gain.value = i === 2 ? 0.05 : 0.22;
        o.connect(g).connect(master);
        o.start();
      });
      // tiếng gió: nhiễu trắng qua bộ lọc thông thấp, âm lượng trôi chậm
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 380;
      const ng = ctx.createGain();
      ng.gain.value = 0.12;
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 0.09;
      lg.gain.value = 0.08;
      lfo.connect(lg).connect(ng.gain);
      noise.connect(lp).connect(ng).connect(master);
      noise.start();
      lfo.start();
    }
    function toggle() {
      try {
        if (!ctx) build();
        on = !on;
        if (on) ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(on ? 0.5 : 0, ctx.currentTime + (on ? 1.6 : 0.5));
      } catch {
        on = false;
      }
      return on;
    }
    return { toggle };
  })();
  const sbtn = $('#sound-btn');
  sbtn.addEventListener('click', () => {
    const on = sound.toggle();
    sbtn.classList.toggle('on', on);
    sbtn.setAttribute('aria-pressed', String(on));
    sbtn.setAttribute('aria-label', on ? 'Tắt âm thanh nền' : 'Bật âm thanh nền');
  });

  window.FX = { scan };
  scan();
  scrollFx();
})();
