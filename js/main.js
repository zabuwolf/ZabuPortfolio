(() => {
  const D = window.PORTFOLIO;
  const S = window.Scenes;
  const L = window.I18N;
  const t = (k, v) => L.t(k, v);
  const pick = (v) => L.pick(v);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const html = document.documentElement;

  // Hàm điều hướng tới section — thay đổi theo chế độ (ngang / dọc)
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  let refreshNav = () => {};
  let goTo = scrollToId;

  /* ---------------- Render nội dung từ data.js ---------------- */
  function renderStatic() {
    const socials = [...D.socials, { label: 'Email', icon: 'mail', url: `mailto:${D.contact.email}` }];
    $('#socials').innerHTML = socials
      .map(
        (s) =>
          `<a class="social" href="${S.esc(s.url)}" ${s.icon === 'mail' ? '' : 'target="_blank" rel="noopener"'}>${S.icons[s.icon] || ''}<span>${S.esc(s.label)}</span></a>`
      )
      .join('');

    $('#year').textContent = new Date().getFullYear();

    // Nhân vật đi bộ dựng từ module Avatar (trang phục đổi bằng data-outfit)
    window.Avatar.mountDefs();
    $('#walker svg').innerHTML = window.Avatar.rig();

    // Parallax layers
    $('.skyline-far').style.backgroundImage = S.skylineDataURI(7, '#c9d7ec');
    $('.skyline-near').style.backgroundImage = S.skylineDataURI(42, '#aebfdc', 240, 1000);
    $('.clouds').style.backgroundImage = S.cloudsDataURI();
  }

  // Phần phụ thuộc ngôn ngữ — render lại mỗi lần đổi ngôn ngữ
  function renderContent() {
    $('#stations').innerHTML = D.experience
      .map((e, i) => {
        const company = pick(e.company);
        return `
        <article class="station play-scope" data-scene="${S.esc(e.scene || '')}">
          <div class="station-card glass reveal">
            <p class="period">${S.esc(pick(e.period))}</p>
            <h3>${S.esc(pick(e.role))}</h3>
            <p class="company">@ ${S.esc(company)}</p>
            <p class="summary">${S.esc(pick(e.summary))}</p>
            <ul class="chips">${e.stack.map((x) => `<li>${S.esc(pick(x))}</li>`).join('')}</ul>
          </div>
          <div class="bus-stop" aria-hidden="true">
            <span class="bus-sign"><small>${S.esc(t('stop'))}</small>${String(i + 1).padStart(2, '0')}</span>
            <span class="bus-pole"></span>
          </div>
          <div class="tree" aria-hidden="true"><span></span></div>
          <div class="building">${S.building(e.building ?? i, company.toUpperCase())}</div>
          ${actorHTML(e.scene)}
        </article>`;
      })
      .join('');

    $('#hobbies-list').innerHTML = D.hobbies
      .map(
        (h, i) => `
        <article class="station hobby play-scope" data-scene="${S.esc(h.art)}">
          <div class="station-card hobby-card glass reveal">
            <p class="period">${String(i + 1).padStart(2, '0')}</p>
            <h3>${S.esc(pick(h.title))}</h3>
            <p class="summary">${S.esc(pick(h.text))}</p>
            <ul class="chips">${h.tags.map((x) => `<li>${S.esc(pick(x))}</li>`).join('')}</ul>
            ${h.art === 'guitar' ? `<button class="btn btn-ghost btn-sm sound-toggle" type="button" data-sound>${soundLabel()}</button>` : ''}
          </div>
          <div class="building hobby-art">${S.hobbyArt(h.art)}</div>
          ${actorHTML(h.art)}
        </article>`
      )
      .join('');

    $('#frames').innerHTML = D.projects
      .map(
        (p, i) => `
        <article class="frame-slot">
          <div class="spot" aria-hidden="true"></div>
          <div class="frame reveal" tabindex="0" data-index="${i}" aria-label="${S.esc(p.title)} — ${S.esc(t('proj.open'))}">
            <div class="frame-inner">${S.projectMock(p)}</div>
            <div class="frame-overlay">
              <button class="btn btn-light" type="button" data-case="${i}">${S.esc(t('case.view'))} <span aria-hidden="true">→</span></button>
            </div>
          </div>
          <div class="plaque">
            <span class="plaque-no">${String(i + 1).padStart(2, '0')}</span>
            <div><h3>${S.esc(p.title)}</h3><p>${S.esc(pick(p.category))} · ${S.esc(p.year)}</p></div>
          </div>
        </article>`
      )
      .join('');

    bindGallery();
    observeReveals();
  }

  // "Diễn viên": Zabu đang làm việc / chơi tại từng điểm dừng (trang phục theo thời kỳ)
  function actorHTML(scene) {
    if (!scene) return '';
    const labels = scene === 'loan' ? { steps: [t('loan.s1'), t('loan.s2'), t('loan.s3')] } : undefined;
    return `<div class="actor" data-scene="${S.esc(scene)}" data-carry="${window.Avatar.carryOf(scene)}" aria-hidden="true">${window.Avatar.actor(scene, labels)}</div>`;
  }

  // Công tắc tiếng đàn (guitar tự chơi khi Zabu tới cảnh đánh đàn)
  function soundLabel() {
    const st = window.Ballad?.state || 'locked';
    const icon = st === 'on' ? '🔊' : st === 'off' ? '🔇' : '🔈';
    return `<span aria-hidden="true">${icon}</span> ${S.esc(t(`sound.${st === 'locked' ? 'tap' : st}`))}`;
  }
  function setupSound() {
    if (!window.Ballad) return;
    const song = D.hobbies.find((h) => h.song)?.song;
    if (song) window.Ballad.configure(song);
    $('#hobbies-list').addEventListener('click', (e) => {
      if (e.target.closest('[data-sound]')) window.Ballad.toggle();
    });
    window.Ballad.onState(() => $$('[data-sound]').forEach((b) => (b.innerHTML = soundLabel())));
  }

  // Animation trong toà nhà / minh hoạ chỉ chạy khi đang hiển thị
  const playIO = new IntersectionObserver((entries) =>
    entries.forEach((en) => {
      en.target.classList.toggle('is-playing', en.isIntersecting);
      en.target.querySelectorAll('svg').forEach((svg) => (en.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()));
    })
  );

  /* ---------------- Reveal (fade-up) ---------------- */
  const revealIO = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => en.target.classList.toggle('is-in', en.isIntersecting)),
    { rootMargin: '0px -8% -6% 0px', threshold: 0.12 }
  );
  function observeReveals() {
    $$('.reveal').forEach((el) => revealIO.observe(el));
    $$('.play-scope').forEach((el) => playIO.observe(el));
  }

  /* ---------------- Nav, progress, section active ---------------- */
  function setupNav() {
    $$('[data-target]').forEach((a) =>
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        goTo(a.dataset.target);
      })
    );

    const bar = $('#progress-bar');
    const nav = $('.nav');
    const links = $$('.nav-links a');
    const sections = ['home', 'experience', 'projects', 'hobbies', 'contact'].map((id) => document.getElementById(id));
    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;

      const horizontal = html.classList.contains('h-mode');
      const px = innerWidth * 0.5;
      const py = innerHeight * 0.45;
      let active = sections[0].id;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (horizontal ? r.left <= px && r.right > px : r.top <= py && r.bottom > py) active = s.id;
      }
      links.forEach((l) => l.classList.toggle('is-active', l.dataset.target === active));
      nav.classList.toggle('is-dark', active === 'contact');
    };
    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    addEventListener('resize', update);
    refreshNav = update;
    update();
  }

  /* ---------------- Gallery hover + modal ---------------- */
  const touch = matchMedia('(hover: none)');

  function setLive(frame, live) {
    if (frame.classList.contains('is-live') === live) return;
    frame.classList.toggle('is-live', live);
    const video = $('video', frame);
    if (video) live ? video.play().catch(() => {}) : video.pause();
  }

  function bindGallery() {
    $$('.frame').forEach((frame) => {
      frame.addEventListener('mouseenter', () => setLive(frame, true));
      frame.addEventListener('mouseleave', () => setLive(frame, false));
      frame.addEventListener('focusin', () => setLive(frame, true));
      frame.addEventListener('focusout', (e) => {
        if (!frame.contains(e.relatedTarget)) setLive(frame, false);
      });
      frame.addEventListener('click', (e) => {
        // Cảm ứng: chạm lần 1 để "play", chạm lần 2 để mở case study
        if (touch.matches && !frame.classList.contains('is-live')) {
          $$('.frame.is-live').forEach((f) => f !== frame && setLive(f, false));
          setLive(frame, true);
          return;
        }
        if (!e.target.closest('[data-case]')) openCase(+frame.dataset.index);
      });
      frame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target === frame) openCase(+frame.dataset.index);
      });
    });

    $$('[data-case]').forEach((b) =>
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        openCase(+b.dataset.case);
      })
    );
  }

  const modal = $('#modal');
  let lastFocus = null;
  let openIndex = -1;

  function fillCase(i) {
    const p = D.projects[i];
    $('#modal-kicker').textContent = `${pick(p.category)} · ${p.year} · ${pick(p.role)}`;
    $('#modal-title').textContent = p.title;
    $('#modal-stack').innerHTML = p.stack.map((x) => `<li>${S.esc(x)}</li>`).join('');
    $('#modal-problem').textContent = pick(p.problem);
    $('#modal-solution').textContent = pick(p.solution);
    $('#modal-result').textContent = pick(p.result);
    $('#modal-links').innerHTML = [
      p.link ? `<a class="btn btn-primary" href="${S.esc(p.link)}" target="_blank" rel="noopener">${S.esc(t('case.live'))}</a>` : '',
      p.repo ? `<a class="btn btn-ghost" href="${S.esc(p.repo)}" target="_blank" rel="noopener">${S.esc(t('case.repo'))}</a>` : '',
    ].join('');
  }

  function openCase(i) {
    const p = D.projects[i];
    if (!p) return;
    openIndex = i;
    lastFocus = document.activeElement;
    $('#modal-media').innerHTML = S.projectMock(p);
    fillCase(i);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      $('.mock', modal)?.classList.add('is-playing');
      const v = $('video', modal);
      if (v) v.play().catch(() => {});
    });
    $('.modal-close', modal).focus();
  }

  function closeCase() {
    openIndex = -1;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.hidden = true;
      $('#modal-media').innerHTML = '';
    }, 300);
    lastFocus?.focus({ preventScroll: true });
  }

  function setupModal() {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeCase();
    });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeCase();
      if (e.key === 'Tab' && !modal.hidden) {
        const f = $$('a[href], button', modal);
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------------- Contact form ---------------- */
  function setupForm() {
    const form = $('#contact-form');
    const status = $('#form-status');
    const say = (key, state, vars) => {
      status.textContent = t(key, vars);
      status.dataset.state = state;
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');
      if (!data.name?.trim() || !emailOk || !data.message?.trim()) {
        say('form.invalid', 'error');
        return;
      }
      const btn = $('button[type=submit]', form);
      if (!D.contact.formEndpoint) {
        const subject = encodeURIComponent(t('form.subject', { name: data.name }));
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        location.href = `mailto:${D.contact.email}?subject=${subject}&body=${body}`;
        say('form.opening', 'ok');
        return;
      }
      btn.disabled = true;
      say('form.sending', '');
      try {
        const res = await fetch(D.contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, lang: L.lang }),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        say('form.ok', 'ok');
      } catch {
        say('form.fail', 'error', { email: D.contact.email });
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---------------- Scroll story (GSAP ScrollTrigger) ---------------- */
  function setupMotion() {
    if (!window.gsap || !window.ScrollTrigger) return; // fallback: bố cục dọc, vẫn đầy đủ nội dung
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 901px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 900px) and (orientation: portrait) and (prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { desktop, mobile, reduce } = ctx.conditions;
        if (desktop) return journeyStory();
        if (mobile) return stageStory();
        if (!reduce) verticalStory();
        return undefined;
      }
    );
  }

  // Đồng bộ nhân vật + cảnh theo vị trí thế giới (dùng chung cho desktop và mobile)
  function sceneSync(proxy, { mobile = false } = {}) {
    const track = $('#track');
    const walkerEl = $('#walker');
    const walker = window.Walker.create(walkerEl);
    const seatedHero = $('#seated-hero');
    const seatedCafe = $('#seated-cafe');
    const hint = $('#scroll-hint');
    const caption = $('.cafe-caption');
    const parallax = $$('.parallax');
    const journeyPanel = $('#experience');

    let lastX = 0;
    let stride = 200;
    let walkerCX = 0;
    let walkerW = 1;
    const measure = () => {
      const r = walkerEl.getBoundingClientRect();
      stride = r.height * 0.85;
      walkerCX = r.left + r.width / 2;
      walkerW = r.width;
    };
    measure();

    // Zabu "hoà" vào từng cảnh. Không trộn theo khoảng cách (gây 2 hình mờ lệch nhau):
    // chỉ chuyển khi nhân vật gần trùng vị trí cảnh diễn, mờ nhanh ~0.2s, có ngưỡng trễ để không nhấp nháy.
    // Trang phục của nhân vật đi bộ = trang phục của cảnh vừa đi qua (đổi lúc đang ẩn nên không lộ).
    let outfit = 'pod';
    walkerEl.dataset.outfit = outfit;
    const fade = new Map(); // actor -> opacity hiện tại
    const targets = new Map(); // actor -> 0 | 1
    const locate = () => {
      let carry = 'pod';
      let carryX = -Infinity;
      for (const a of $$('.actor')) {
        const r = a.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(cx - walkerCX);
        const on = targets.get(a) === 1;
        targets.set(a, d < walkerW * (on ? 0.5 : 0.28) ? 1 : 0);
        if (cx - walkerCX <= 1 && cx > carryX) {
          carryX = cx;
          carry = a.dataset.carry;
        }
      }
      if (carry !== outfit) walkerEl.dataset.outfit = outfit = carry;
    };
    const blendActors = (deltaMs) => {
      const k = Math.min(1, (deltaMs / 1000) * 12);
      let maxB = 0;
      let guitarB = 0;
      for (const [a, target] of targets) {
        if (!a.isConnected) {
          targets.delete(a);
          fade.delete(a);
          continue;
        }
        let o = fade.get(a) ?? 0;
        o += (target - o) * k;
        if (Math.abs(target - o) < 0.01) o = target;
        if (o !== fade.get(a)) {
          fade.set(a, o);
          a.style.opacity = o.toFixed(3);
        }
        maxB = Math.max(maxB, o);
        if (a.dataset.scene === 'guitar') guitarB = o;
      }
      // Tiếng đàn: tự chơi khi tới cảnh đánh đàn, dừng khi rời đi
      if (window.Ballad) {
        if (guitarB > 0.5) window.Ballad.start();
        else if (guitarB < 0.05) window.Ballad.stop();
      }
      return maxB;
    };
    let blend = -1;
    const reblend = () => (blend = -1);
    addEventListener('zabu:rerender', reblend);

    // trả về quãng đường thế giới vừa dịch trong frame
    const frame = (deltaMs) => {
      const x = gsap.getProperty(track, 'x');
      const dx = lastX - x;
      lastX = x;
      walker.update(dx, deltaMs / 1000, stride);

      const s = proxy.stand;
      const c = proxy.sit;
      seatedHero.style.opacity = 1 - s;
      seatedCafe.style.opacity = c;
      caption.style.opacity = c;
      caption.style.visibility = c > 0.05 ? 'visible' : 'hidden';
      caption.style.transform = `translateY(${(1 - c) * 20}px)`;
      hint.style.opacity = Math.max(0, 1 - s * 3);
      if (dx !== 0 || blend < 0) locate();
      blend = blendActors(deltaMs);
      walkerEl.style.opacity = Math.min(1, s * 1.6) * (1 - Math.min(1, c * 1.6)) * (1 - blend);
      walkerEl.style.setProperty('--rise', `${(1 - s) * 14}px`);

      const local = -x - journeyPanel.offsetLeft;
      for (const layer of parallax) {
        layer.style.backgroundPositionX = `${(local * layer.dataset.speed).toFixed(1)}px`;
      }
      // vị trí thực vẫn thay đổi sau khi người dùng ngừng thao tác -> cập nhật nav
      if (dx !== 0) refreshNav();
      return dx;
    };

    const reset = () => {
      window.Ballad?.stop();
      removeEventListener('zabu:rerender', reblend);
      $$('.actor').forEach((a) => a.removeAttribute('style'));
      walkerEl.dataset.outfit = 'pod';
      [seatedHero, seatedCafe, hint, walkerEl, caption].forEach((el) => el.removeAttribute('style'));
      parallax.forEach((l) => (l.style.backgroundPositionX = ''));
      gsap.set(track, { clearProps: 'transform' });
      walker.reset();
    };

    return { frame, measure, reset };
  }

  // DESKTOP: cuộn chuột điều khiển hành trình ngang
  // Mỗi trạm / sở thích có một "vùng dừng": thế giới đứng yên thêm một quãng cuộn để cảnh không vụt qua,
  // và khi người dùng ngừng cuộn gần một cảnh, trang hút nhẹ vào đúng tâm cảnh đó (ưu tiên theo chiều đang cuộn).
  function journeyStory() {
    html.classList.add('h-mode');

    const journey = $('#journey');
    const track = $('#track');
    const proxy = { stand: 0, sit: 0 };
    const scene = sceneSync(proxy);

    const STAND = 0.6; // đứng dậy khỏi bàn
    const SIT = 0.6; // ngồi xuống quán café
    const HOLD = 0.45; // vùng dừng tại mỗi cảnh (đơn vị: chiều rộng màn hình)
    const MAGNET_AHEAD = 1.0; // bán kính hút tới cảnh phía trước (đơn vị như trên)
    const MAGNET_BEHIND = 0.35; // bán kính kéo lùi về cảnh vừa đi qua

    // Mọi bề rộng trong track tính bằng vw nên toạ độ quy về đơn vị "màn hình" không đổi khi resize
    const vw = () => innerWidth;
    const maxX = () => Math.max(0, track.scrollWidth - vw());
    const MAXV = maxX() / vw();
    const trackLeft = track.getBoundingClientRect().left;
    const anchors = $$('.stations .station, .hobbies .station')
      .map((el) => Math.min(MAXV, (el.getBoundingClientRect().left - trackLeft) / vw()))
      .sort((a, b) => a - b);

    // Các đoạn [thời gian bắt đầu, x bắt đầu, thời gian kết thúc, x kết thúc] để quy đổi vị trí <-> thời gian
    const segments = [];
    const sceneTimes = [];
    let t = STAND;
    let pos = 0;
    const move = (to) => {
      const d = Math.max(0.001, to - pos);
      segments.push([t, pos, t + d, to]);
      t += d;
      pos = to;
      return d;
    };

    const TOTAL = STAND + MAXV + anchors.length * HOLD + SIT;
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: journey,
        pin: true,
        start: 'top top',
        end: () => `+=${TOTAL * vw()}`,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => {
            const dir = tl.scrollTrigger ? tl.scrollTrigger.direction : 1;
            const dur = tl.duration();
            const pts = sceneTimes.map((st) => st / dur);
            const dist = (p) => Math.abs(p - value) * dur;
            const closest = (list) => list.reduce((a, b) => (dist(b) < dist(a) ? b : a));
            // Ưu tiên cảnh phía trước theo chiều đang cuộn (người dùng muốn đi tiếp)
            const ahead = pts.filter((p) => (dir > 0 ? p >= value : p <= value) && dist(p) <= MAGNET_AHEAD);
            if (ahead.length) return closest(ahead);
            // Chỉ kéo lùi khi vừa lố qua một chút
            const behind = pts.filter((p) => dist(p) <= MAGNET_BEHIND);
            return behind.length ? closest(behind) : value; // xa mọi cảnh: để yên
          },
          duration: { min: 0.3, max: 0.8 },
          delay: 0.12,
          ease: 'power2.inOut',
        },
      },
    });

    tl.to(proxy, { stand: 1, duration: STAND });
    anchors.forEach((a) => {
      tl.to(track, { x: () => -a * vw(), duration: move(a) });
      sceneTimes.push(t + HOLD / 2);
      tl.to({}, { duration: HOLD }); // vùng dừng: cuộn tiếp nhưng cảnh đứng yên
      t += HOLD;
    });
    tl.to(track, { x: () => -maxX(), duration: move(MAXV) });
    tl.to(proxy, { sit: 1, duration: SIT });

    // vị trí x (đơn vị màn hình) -> thời gian trên timeline
    const timeAtX = (xv) => {
      for (const [t0, x0, t1, x1] of segments) {
        if (xv <= x1) return t0 + ((Math.max(xv, x0) - x0) / Math.max(0.001, x1 - x0)) * (t1 - t0);
      }
      return TOTAL - SIT;
    };

    goTo = (id) => {
      const st = tl.scrollTrigger;
      const el = document.getElementById(id);
      let time = 0;
      if (id === 'contact') time = tl.duration();
      else if (id !== 'home' && el) time = timeAtX(Math.min(MAXV, el.offsetLeft / vw()));
      const y = st.start + (time / tl.duration()) * (st.end - st.start);
      scrollTo({ top: Math.ceil(y), behavior: 'smooth' });
    };

    ScrollTrigger.addEventListener('refresh', scene.measure);
    const tick = (time, deltaMs) => scene.frame(deltaMs);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ScrollTrigger.removeEventListener('refresh', scene.measure);
      html.classList.remove('h-mode');
      scene.reset();
      goTo = scrollToId;
    };
  }

  // MOBILE: "sân khấu" cố định — bấm menu / ‹ › / vuốt để nhân vật tự đi tới điểm dừng
  function stageStory() {
    html.classList.add('h-mode', 'm-mode');
    scrollTo(0, 0);

    const journey = $('#journey');
    const track = $('#track');
    const dock = $('#stage-dock');
    const sheet = $('#contact-sheet');
    const sheetBody = $('.sheet-body', sheet);
    const card = $('.contact-card');
    const footer = $('.footer-note');
    const cardHome = $('#contact');
    const proxy = { stand: 0, sit: 0 };
    const scene = sceneSync(proxy, { mobile: true });

    // Form nằm trong bottom sheet để bàn phím ảo không đè lên sân khấu
    sheetBody.append(card, footer);
    dock.hidden = false;

    const maxX = () => Math.max(0, track.scrollWidth - innerWidth);
    // Danh sách điểm dừng: phần tử, section chứa nó và nhãn hiển thị trên nút "Tiếp"
    const stopList = () => [
      { el: $('#home'), section: 'home', label: () => t('stop.home') },
      { el: $('.journey-intro'), section: 'experience', label: () => t('stop.journey') },
      ...$$('.stations .station').map((el, i) => ({
        el,
        section: 'experience',
        label: () => t('stop.station', { n: String(i + 1).padStart(2, '0'), name: pick(D.experience[i].company) }),
      })),
      { el: $('.gallery-intro'), section: 'projects', label: () => t('stop.gallery') },
      ...$$('.frame-slot').map((el, i) => ({ el, section: 'projects', label: () => D.projects[i].title })),
      { el: $('.hobbies-intro'), section: 'hobbies', label: () => t('stop.hobbies') },
      ...$$('.hobbies .station').map((el, i) => ({ el, section: 'hobbies', label: () => pick(D.hobbies[i].title) })),
      { el: $('#contact'), section: 'contact', label: () => t('stop.contact') },
    ];
    const stops = () => stopList().map((s) => s.el);
    const stopX = (el) => Math.min(maxX(), el.getBoundingClientRect().left - track.getBoundingClientRect().left);
    const sectionStop = (id) => Math.max(0, stopList().findIndex((s) => s.section === id));

    let index = 0;
    let tl = null;

    const autoPlayFrames = () => {
      const mid = innerWidth / 2;
      for (const f of $$('.frame')) {
        const r = f.getBoundingClientRect();
        setLive(f, Math.abs(r.left + r.width / 2 - mid) < r.width * 0.35);
      }
    };

    const nextBtn = $('.dock-next', dock);
    const nextLabel = $('.dock-next-label', dock);
    const updateDock = () => {
      const list = stopList();
      const last = list.length - 1;
      const current = list[index];
      $('[data-step="-1"]', dock).disabled = index === 0;
      dock.classList.toggle('is-start', index === 0);
      dock.classList.toggle('is-end', index === last);
      // Nút chính luôn nói rõ bấm vào sẽ đi đâu
      nextLabel.textContent =
        index === 0 ? t('dock.start') : index === last ? t('contact.write') : `${t('dock.next')}: ${list[index + 1].label()}`;
      $('.dock-next-icon', dock).textContent = index === last ? '✉' : '→';
      nextBtn.setAttribute('aria-label', nextLabel.textContent);
      // Mỗi chấm = một điểm dừng trong section; chấm hiện tại kéo dài
      $$('.dock-tabs [data-target]', dock).forEach((tab) => {
        const sec = tab.dataset.target;
        tab.classList.toggle('is-active', sec === current.section);
        if (sec === current.section) tab.setAttribute('aria-current', 'step');
        else tab.removeAttribute('aria-current');
        $('.dock-dots', tab).innerHTML = list
          .map((s, i) => (s.section === sec ? `<b class="${i === index ? 'is-current' : ''}"></b>` : ''))
          .join('');
      });
    };

    // Gợi ý cử chỉ — chỉ hiện ở lần truy cập đầu tiên
    const coach = $('#coach', dock);
    const COACH_KEY = 'zabu-coach-seen';
    let coachSeen = false;
    let coachAutoHide = null;
    try {
      coachSeen = localStorage.getItem(COACH_KEY) === '1';
    } catch {
      /* private mode */
    }
    const coachTimer = coachSeen
      ? null
      : setTimeout(() => {
          if (index !== 0) return;
          coach.hidden = false;
          requestAnimationFrame(() => coach.classList.add('is-on'));
          coachAutoHide = setTimeout(() => dismissCoach(), 7000);
        }, 1400);
    const dismissCoach = () => {
      clearTimeout(coachTimer);
      clearTimeout(coachAutoHide);
      if (coachSeen) return;
      coachSeen = true;
      try {
        localStorage.setItem(COACH_KEY, '1');
      } catch {
        /* private mode */
      }
      coach.classList.remove('is-on');
      setTimeout(() => (coach.hidden = true), 300);
    };

    function walkTo(i, { openForm = false } = {}) {
      const list = stops();
      i = Math.max(0, Math.min(list.length - 1, i));
      const last = list.length - 1;
      if (i === index && !tl?.isActive()) {
        if (openForm && i === last) openSheet();
        return;
      }
      index = i;
      dismissCoach();
      tl?.kill();
      const targetX = -stopX(list[i]);
      const dist = Math.abs(gsap.getProperty(track, 'x') - targetX);

      tl = gsap.timeline({
        onComplete: () => {
          autoPlayFrames();
          if (openForm && i === last) openSheet();
        },
      });
      if (proxy.sit > 0 && i !== last) tl.to(proxy, { sit: 0, duration: 0.45, ease: 'power1.inOut' });
      if (proxy.stand < 1 && dist > 1) tl.to(proxy, { stand: 1, duration: 0.55, ease: 'power1.inOut' });
      if (dist > 1) {
        // càng xa càng "chạy" nhanh, nhưng không quá 3 giây
        tl.to(track, { x: targetX, duration: gsap.utils.clamp(0.7, 3, 0.35 + dist / 700), ease: 'power1.inOut' });
      }
      if (i === 0) tl.to(proxy, { stand: 0, duration: 0.55, ease: 'power1.inOut' });
      if (i === last) tl.to(proxy, { sit: 1, duration: 0.55, ease: 'power1.inOut' });
      $$('.frame.is-live').forEach((f) => setLive(f, false));
      updateDock();
    }

    const step = (d) => walkTo(index + d);
    goTo = (id) => walkTo(sectionStop(id), { openForm: id === 'contact' });

    // Nút ‹ ›
    const onDock = (e) => {
      const b = e.target.closest('[data-step]');
      if (!b) return;
      // Điểm cuối: nút chính mở form liên hệ
      if (b === nextBtn && index === stopList().length - 1) openSheet();
      else step(+b.dataset.step);
    };
    dock.addEventListener('click', onDock);

    // Vuốt = sang điểm dừng kế tiếp / trước đó (không cuộn liên tục)
    let t0 = null;
    const onStart = (e) => {
      const p = e.touches[0];
      t0 = { x: p.clientX, y: p.clientY, time: Date.now() };
    };
    const onEnd = (e) => {
      if (!t0) return;
      const p = e.changedTouches[0];
      const dx = p.clientX - t0.x;
      const dy = p.clientY - t0.y;
      t0 = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 45) return; // chạm, không phải vuốt
      const horizontal = Math.abs(dx) > Math.abs(dy);
      step(horizontal ? (dx < 0 ? 1 : -1) : dy < 0 ? 1 : -1);
    };
    journey.addEventListener('touchstart', onStart, { passive: true });
    journey.addEventListener('touchend', onEnd, { passive: true });

    const onKey = (e) => {
      if (!modal.hidden || !sheet.hidden) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') step(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') step(-1);
    };
    addEventListener('keydown', onKey);

    // Xoay / đổi kích thước: đặt lại đúng điểm dừng hiện tại
    const onResize = () => {
      tl?.progress(1);
      gsap.set(track, { x: -stopX(stops()[index]) });
      scene.measure();
    };
    addEventListener('resize', onResize);
    let alive = true;
    L.onChange(() => alive && requestAnimationFrame(() => (onResize(), updateDock())));

    // Bottom sheet liên hệ
    const openSheet = () => {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add('is-open'));
      $('.sheet-close', sheet).focus({ preventScroll: true });
    };
    const closeSheet = () => {
      sheet.classList.remove('is-open');
      setTimeout(() => (sheet.hidden = true), 350);
    };
    const onSheet = (e) => {
      if (e.target.closest('[data-close-sheet]')) closeSheet();
    };
    sheet.addEventListener('click', onSheet);

    const tick = (time, deltaMs) => {
      if (scene.frame(deltaMs) !== 0) autoPlayFrames();
    };
    gsap.ticker.add(tick);
    updateDock();

    return () => {
      alive = false;
      tl?.kill();
      gsap.ticker.remove(tick);
      dock.removeEventListener('click', onDock);
      journey.removeEventListener('touchstart', onStart);
      journey.removeEventListener('touchend', onEnd);
      removeEventListener('keydown', onKey);
      removeEventListener('resize', onResize);
      sheet.removeEventListener('click', onSheet);
      clearTimeout(coachTimer);
      clearTimeout(coachAutoHide);
      coach.hidden = true;
      coach.classList.remove('is-on');
      sheet.classList.remove('is-open');
      sheet.hidden = true;
      dock.hidden = true;
      cardHome.prepend(card);
      cardHome.append(footer);
      $$('.frame.is-live').forEach((f) => setLive(f, false));
      html.classList.remove('h-mode', 'm-mode');
      scene.reset();
      goTo = scrollToId;
    };
  }

  // Màn hình ngang thấp (điện thoại xoay ngang): bố cục dọc với chuyển động nhẹ
  function verticalStory() {
    $$('.building').forEach((b) =>
      gsap.fromTo(b, { y: 40 }, { y: -10, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } })
    );
  }

  L.init();
  renderStatic();
  renderContent();
  setupNav();
  setupSound();
  setupModal();
  setupForm();
  // GSAP được load bằng defer trước main.js nên đã sẵn sàng ở đây
  setupMotion();
  // Đợi font load xong để đo lại kích thước
  document.fonts?.ready.then(() => window.ScrollTrigger?.refresh());

  L.onChange(() => {
    renderContent();
    if (openIndex >= 0) fillCase(openIndex);
    window.dispatchEvent(new Event('zabu:rerender'));
    const status = $('#form-status');
    status.textContent = '';
    window.ScrollTrigger?.refresh();
  });
})();
