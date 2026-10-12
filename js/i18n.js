/*
 * Đa ngôn ngữ EN / VI.
 * Thứ tự ưu tiên: người dùng tự chọn (lưu localStorage) > IP Việt Nam -> 'vi', còn lại -> 'en'.
 * Trong lúc chờ tra IP, đoán nhanh theo múi giờ / ngôn ngữ trình duyệt để tránh nháy chữ.
 */
window.I18N = (() => {
  const dict = {
    en: {
      'meta.title': 'Zabu — Website Developer',
      'meta.desc': 'Zabu — Website Developer. A scroll-driven portfolio journey: experience, selected projects and contact.',
      'skip': 'Skip to contact',
      'nav.home': 'Home',
      'nav.journey': 'Journey',
      'nav.projects': 'Projects',
      'nav.hobbies': 'Hobbies',
      'nav.contact': 'Contact',
      'nav.cta': 'Let’s talk',
      'nav.lang': 'Language',
      'hero.eyebrow': 'Available for new projects',
      'hero.lead': 'I design and build fast, accessible, story-driven websites — from pixel-perfect landing pages to full-stack web apps.',
      'hero.ctaProjects': 'View projects',
      'hero.ctaContact': 'Contact me',
      'hero.stat1': 'years building for the web',
      'hero.stat2': 'websites shipped',
      'hero.stat3': 'avg. Lighthouse score',
      'hint.scroll': 'Scroll to start the journey',
      'hint.tap': 'Tap › or swipe to start the journey',
      'dock.prev': 'Previous stop',
      'dock.next': 'Next stop',
      'sheet.close': 'Close',
      'contact.write': 'Write me a message',
      'loan.s1': '① Download the app',
      'loan.s2': '② eKYC in 2 minutes',
      'loan.s3': '③ Money in your account',
      'sound.on': 'Guitar sound: on',
      'sound.off': 'Guitar sound: off',
      'sound.tap': 'Tap to hear the guitar',
      'dock.start': 'Start the journey',
      'dock.next': 'Next',
      'stop.home': 'Home',
      'stop.journey': 'The journey',
      'stop.station': 'Stop {n} · {name}',
      'stop.gallery': 'Digital gallery',
      'stop.contact': 'Café · Contact',
      'coach.text': 'Swipe or tap the button below to walk with Zabu',
      'exp.kicker': '01 — The journey',
      'exp.title': 'Every stop taught me <em>something new.</em>',
      'exp.text': 'Scroll to walk through the places I’ve built for — each stop is a chapter of my career.',
      'stop': 'STOP',
      'proj.kicker': '02 — Digital gallery',
      'proj.title': 'Selected <em>work.</em>',
      'proj.text': 'Hover or tap a piece to bring it to life. Each one opens into a short case study.',
      'proj.open': 'open case study',
      'case.view': 'View Case Study',
      'case.challenge': 'Challenge',
      'case.solution': 'Solution',
      'case.result': 'Result',
      'case.live': 'Visit live site',
      'case.repo': 'Source code',
      'case.close': 'Close case study',
      'hob.kicker': '03 — Off the clock',
      'hob.title': 'Life beyond <em>the keyboard.</em>',
      'hob.text': 'Keep walking — this is what keeps me curious and recharged.',
      'stop.hobbies': 'Off the clock',
      'contact.kicker': '04 — Let’s connect',
      'contact.title': 'Have a project in mind? <em>Let’s grab a coffee.</em>',
      'contact.caption': 'Coffee’s on me.',
      'contact.captionText': 'Tell me about your project — tap “Write me a message” below. I reply within 24 hours.',
      'form.name': 'Name',
      'form.namePh': 'Your name',
      'form.email': 'Email',
      'form.message': 'Message',
      'form.messagePh': 'Tell me about your project, timeline and budget…',
      'form.send': 'Send message',
      'form.invalid': 'Please fill in your name, a valid email and a message.',
      'form.opening': 'Opening your email app…',
      'form.sending': 'Sending…',
      'form.ok': 'Thanks! I’ll get back to you within 24 hours.',
      'form.fail': 'Something went wrong — email me at {email}.',
      'form.subject': 'Project enquiry from {name}',
      'footer': 'Crafted with GSAP & a lot of coffee.',
    },
    vi: {
      'meta.title': 'Zabu — Website Developer',
      'meta.desc': 'Zabu — Website Developer. Portfolio kể chuyện bằng cuộn trang: kinh nghiệm, dự án tiêu biểu và liên hệ.',
      'skip': 'Chuyển tới phần liên hệ',
      'nav.home': 'Trang chủ',
      'nav.journey': 'Hành trình',
      'nav.projects': 'Dự án',
      'nav.hobbies': 'Sở thích',
      'nav.contact': 'Liên hệ',
      'nav.cta': 'Trò chuyện nhé',
      'nav.lang': 'Ngôn ngữ',
      'hero.eyebrow': 'Đang nhận dự án mới',
      'hero.lead': 'Tôi thiết kế và xây dựng những website nhanh, thân thiện và biết kể chuyện — từ landing page chỉn chu đến web app full-stack.',
      'hero.ctaProjects': 'Xem dự án',
      'hero.ctaContact': 'Liên hệ',
      'hero.stat1': 'năm làm web',
      'hero.stat2': 'website đã bàn giao',
      'hero.stat3': 'điểm Lighthouse trung bình',
      'hint.scroll': 'Cuộn chuột để bắt đầu hành trình',
      'hint.tap': 'Chạm › hoặc vuốt để bắt đầu hành trình',
      'dock.prev': 'Điểm dừng trước',
      'dock.next': 'Điểm dừng tiếp theo',
      'sheet.close': 'Đóng',
      'contact.write': 'Viết lời nhắn',
      'loan.s1': '① Tải ứng dụng',
      'loan.s2': '② eKYC trong 2 phút',
      'loan.s3': '③ Nhận tiền ngay',
      'sound.on': 'Tiếng đàn: bật',
      'sound.off': 'Tiếng đàn: tắt',
      'sound.tap': 'Chạm để nghe tiếng đàn',
      'dock.start': 'Bắt đầu hành trình',
      'dock.next': 'Tiếp',
      'stop.home': 'Trang chủ',
      'stop.journey': 'Hành trình',
      'stop.station': 'Trạm {n} · {name}',
      'stop.gallery': 'Phòng triển lãm',
      'stop.contact': 'Quán cà phê · Liên hệ',
      'coach.text': 'Vuốt sang hoặc bấm nút bên dưới để đi cùng Zabu',
      'exp.kicker': '01 — Hành trình',
      'exp.title': 'Mỗi điểm dừng cho tôi <em>một bài học mới.</em>',
      'exp.text': 'Cuộn để đi qua những nơi tôi đã làm việc — mỗi trạm là một chương trong sự nghiệp.',
      'stop': 'TRẠM',
      'proj.kicker': '02 — Phòng triển lãm số',
      'proj.title': 'Dự án <em>tiêu biểu.</em>',
      'proj.text': 'Rê chuột hoặc chạm vào một tác phẩm để xem nó chuyển động. Mỗi dự án đều có case study ngắn.',
      'proj.open': 'xem case study',
      'case.view': 'Xem Case Study',
      'case.challenge': 'Thử thách',
      'case.solution': 'Giải pháp',
      'case.result': 'Kết quả',
      'case.live': 'Xem website',
      'case.repo': 'Mã nguồn',
      'case.close': 'Đóng case study',
      'hob.kicker': '03 — Ngoài giờ code',
      'hob.title': 'Cuộc sống ngoài <em>bàn phím.</em>',
      'hob.text': 'Đi tiếp nào — đây là những thứ giúp tôi luôn tò mò và nạp lại năng lượng.',
      'stop.hobbies': 'Ngoài giờ code',
      'contact.kicker': '04 — Kết nối',
      'contact.title': 'Bạn đang có ý tưởng? <em>Cùng đi cà phê nhé.</em>',
      'contact.caption': 'Cà phê tôi mời.',
      'contact.captionText': 'Kể tôi nghe về dự án của bạn — bấm “Viết lời nhắn” bên dưới. Tôi phản hồi trong 24 giờ.',
      'form.name': 'Họ tên',
      'form.namePh': 'Tên của bạn',
      'form.email': 'Email',
      'form.message': 'Lời nhắn',
      'form.messagePh': 'Dự án của bạn là gì, thời gian và ngân sách dự kiến…',
      'form.send': 'Gửi tin nhắn',
      'form.invalid': 'Vui lòng nhập họ tên, email hợp lệ và lời nhắn.',
      'form.opening': 'Đang mở ứng dụng email…',
      'form.sending': 'Đang gửi…',
      'form.ok': 'Cảm ơn bạn! Tôi sẽ phản hồi trong vòng 24 giờ.',
      'form.fail': 'Có lỗi xảy ra — hãy email cho tôi tại {email}.',
      'form.subject': 'Yêu cầu dự án từ {name}',
      'footer': 'Được làm bằng GSAP và rất nhiều cà phê.',
    },
  };

  const SUPPORTED = Object.keys(dict);
  const PREF_KEY = 'zabu-lang';
  const GEO_KEY = 'zabu-geo';
  const listeners = [];
  let lang = 'en';

  const store = (kind) => {
    try {
      return window[kind];
    } catch {
      return null;
    }
  };
  const read = (kind, key) => {
    try {
      return store(kind)?.getItem(key) ?? null;
    } catch {
      return null;
    }
  };
  const write = (kind, key, val) => {
    try {
      store(kind)?.setItem(key, val);
    } catch {
      /* private mode — bỏ qua */
    }
  };

  function t(key, vars) {
    let s = dict[lang][key] ?? dict.en[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    return s;
  }

  // Lấy giá trị theo ngôn ngữ từ data.js: chuỗi thường hoặc { en, vi }
  function pick(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return v[lang] ?? v.en ?? '';
    return v ?? '';
  }

  function apply() {
    const root = document.documentElement;
    root.lang = lang;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll('[data-i18n-html]').forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.i18nPh)));
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  function set(next, { persist = false } = {}) {
    if (!SUPPORTED.includes(next)) return;
    if (persist) write('localStorage', PREF_KEY, next);
    if (next === lang) return;
    lang = next;
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  // Đoán tức thì (không cần mạng)
  function quickGuess() {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    if (tz.includes('ho_chi_minh') || tz.includes('saigon')) return 'vi';
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
    return langs.some((l) => /^vi\b/i.test(l)) ? 'vi' : 'en';
  }

  async function fetchWithTimeout(url, ms) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
      return await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
    } finally {
      clearTimeout(timer);
    }
  }

  // Tra quốc gia theo IP — thử lần lượt các dịch vụ miễn phí, có CORS
  async function countryByIP() {
    const cached = read('sessionStorage', GEO_KEY);
    if (cached) return cached;
    const providers = [
      async () => (await (await fetchWithTimeout('https://api.country.is/', 3000)).json()).country,
      async () => (await (await fetchWithTimeout('https://ipapi.co/country/', 3000)).text()).trim(),
    ];
    for (const get of providers) {
      try {
        const code = (await get())?.toUpperCase();
        if (/^[A-Z]{2}$/.test(code)) {
          write('sessionStorage', GEO_KEY, code);
          return code;
        }
      } catch {
        /* thử dịch vụ tiếp theo */
      }
    }
    return null;
  }

  function init() {
    const saved = read('localStorage', PREF_KEY);
    lang = SUPPORTED.includes(saved) ? saved : quickGuess();
    apply();

    document.querySelectorAll('[data-lang]').forEach((b) =>
      b.addEventListener('click', () => set(b.dataset.lang, { persist: true }))
    );

    // ?lang=vi / ?lang=en để xem thử
    const forced = new URLSearchParams(location.search).get('lang');
    if (SUPPORTED.includes(forced)) {
      set(forced);
      return;
    }
    if (!saved) {
      countryByIP().then((code) => {
        // Người dùng có thể đã tự chọn trong lúc chờ mạng
        if (code && !read('localStorage', PREF_KEY)) set(code === 'VN' ? 'vi' : 'en');
      });
    }
  }

  return {
    init,
    t,
    pick,
    set,
    get lang() {
      return lang;
    },
    onChange: (fn) => listeners.push(fn),
  };
})();
