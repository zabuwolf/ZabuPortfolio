/*
 * Đa ngôn ngữ — tiếng Việt là ngôn ngữ chính (và là ngôn ngữ dự phòng khi thiếu bản dịch).
 * Hỗ trợ: vi · en · zh (tiếng Trung giản thể) · fr · cs (tiếng Séc).
 * Thứ tự ưu tiên: người dùng tự chọn (lưu localStorage) > ?lang= > quốc gia theo IP > ngôn ngữ trình duyệt > vi.
 */
window.I18N = (() => {
  const LANGS = {
    vi: { name: 'Tiếng Việt', short: 'VI' },
    en: { name: 'English', short: 'EN' },
    zh: { name: '中文', short: '中' },
    fr: { name: 'Français', short: 'FR' },
    cs: { name: 'Čeština', short: 'CS' },
  };
  const MAIN = 'vi';

  const dict = {
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
      'dock.start': 'Bắt đầu hành trình',
      'dock.next': 'Tiếp',
      'sheet.close': 'Đóng',
      'contact.write': 'Viết lời nhắn',
      'loan.s1': '① Tải ứng dụng',
      'loan.s2': '② eKYC trong 2 phút',
      'loan.s3': '③ Nhận tiền ngay',
      'sound.on': 'Tiếng đàn: bật',
      'sound.off': 'Tiếng đàn: tắt',
      'sound.tap': 'Chạm để nghe tiếng đàn',
      'stop.home': 'Trang chủ',
      'stop.journey': 'Hành trình',
      'stop.station': 'Trạm {n} · {name}',
      'stop.gallery': 'Phòng triển lãm',
      'stop.hobbies': 'Ngoài giờ code',
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

    en: {
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
      'dock.start': 'Start the journey',
      'dock.next': 'Next',
      'sheet.close': 'Close',
      'contact.write': 'Write me a message',
      'loan.s1': '① Download the app',
      'loan.s2': '② eKYC in 2 minutes',
      'loan.s3': '③ Money in your account',
      'sound.on': 'Guitar sound: on',
      'sound.off': 'Guitar sound: off',
      'sound.tap': 'Tap to hear the guitar',
      'stop.home': 'Home',
      'stop.journey': 'The journey',
      'stop.station': 'Stop {n} · {name}',
      'stop.gallery': 'Digital gallery',
      'stop.hobbies': 'Off the clock',
      'stop.contact': 'Café · Contact',
      'coach.text': 'Swipe or tap the button below to walk with Zabu',
      'exp.kicker': '01 — The journey',
      'exp.title': 'Every stop taught me <em>something new.</em>',
      'exp.text': 'Scroll to walk through the places I’ve worked — each stop is a chapter of my career.',
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

    zh: {
      'meta.desc': 'Zabu — 网站开发者。一段随滚动展开的作品集旅程：经历、精选项目与联系方式。',
      'skip': '跳到联系方式',
      'nav.home': '首页',
      'nav.journey': '经历',
      'nav.projects': '项目',
      'nav.hobbies': '爱好',
      'nav.contact': '联系',
      'nav.cta': '聊一聊',
      'nav.lang': '语言',
      'hero.eyebrow': '正在接受新项目',
      'hero.lead': '我设计并开发快速、易用、会讲故事的网站——从精致的落地页到全栈 Web 应用。',
      'hero.ctaProjects': '查看项目',
      'hero.ctaContact': '联系我',
      'hero.stat1': '年网站开发经验',
      'hero.stat2': '个已交付网站',
      'hero.stat3': 'Lighthouse 平均分',
      'hint.scroll': '滚动鼠标，开始旅程',
      'hint.tap': '点击 › 或滑动，开始旅程',
      'dock.prev': '上一站',
      'dock.start': '开始旅程',
      'dock.next': '下一站',
      'sheet.close': '关闭',
      'contact.write': '给我留言',
      'loan.s1': '① 下载应用',
      'loan.s2': '② 2 分钟完成 eKYC',
      'loan.s3': '③ 立即到账',
      'sound.on': '吉他声音：开',
      'sound.off': '吉他声音：关',
      'sound.tap': '点击收听吉他',
      'stop.home': '首页',
      'stop.journey': '经历',
      'stop.station': '第 {n} 站 · {name}',
      'stop.gallery': '数字展厅',
      'stop.hobbies': '下班之后',
      'stop.contact': '咖啡馆 · 联系',
      'coach.text': '滑动或点击下方按钮，和 Zabu 一起出发',
      'exp.kicker': '01 — 经历',
      'exp.title': '每一站都让我 <em>学到新东西。</em>',
      'exp.text': '滚动走过我工作过的地方——每一站都是我职业生涯的一章。',
      'stop': '站',
      'proj.kicker': '02 — 数字展厅',
      'proj.title': '精选 <em>作品。</em>',
      'proj.text': '将鼠标悬停或点击作品即可让它动起来，每个项目都附有简短的案例分析。',
      'proj.open': '查看案例',
      'case.view': '查看案例',
      'case.challenge': '挑战',
      'case.solution': '方案',
      'case.result': '成果',
      'case.live': '访问网站',
      'case.repo': '源代码',
      'case.close': '关闭案例',
      'hob.kicker': '03 — 下班之后',
      'hob.title': '键盘之外的 <em>生活。</em>',
      'hob.text': '继续走——这些让我保持好奇、充满能量。',
      'contact.kicker': '04 — 保持联系',
      'contact.title': '有项目想法？<em>一起喝杯咖啡吧。</em>',
      'contact.caption': '咖啡我请。',
      'contact.captionText': '和我聊聊你的项目——点击下方“给我留言”。我会在 24 小时内回复。',
      'form.name': '姓名',
      'form.namePh': '你的名字',
      'form.email': '邮箱',
      'form.message': '留言',
      'form.messagePh': '介绍一下你的项目、时间安排和预算…',
      'form.send': '发送留言',
      'form.invalid': '请填写姓名、有效邮箱和留言。',
      'form.opening': '正在打开邮件应用…',
      'form.sending': '发送中…',
      'form.ok': '谢谢！我会在 24 小时内回复你。',
      'form.fail': '出了点问题——请发邮件至 {email}。',
      'form.subject': '来自 {name} 的项目咨询',
      'footer': '用 GSAP 和很多咖啡打造。',
    },

    fr: {
      'meta.desc': 'Zabu — Développeur web. Un portfolio narratif qui se déroule au défilement : parcours, projets choisis et contact.',
      'skip': 'Aller au contact',
      'nav.home': 'Accueil',
      'nav.journey': 'Parcours',
      'nav.projects': 'Projets',
      'nav.hobbies': 'Loisirs',
      'nav.contact': 'Contact',
      'nav.cta': 'Discutons',
      'nav.lang': 'Langue',
      'hero.eyebrow': 'Disponible pour de nouveaux projets',
      'hero.lead': 'Je conçois et développe des sites rapides, accessibles et qui racontent une histoire — de la landing page soignée à l’application web full-stack.',
      'hero.ctaProjects': 'Voir les projets',
      'hero.ctaContact': 'Me contacter',
      'hero.stat1': 'ans à créer pour le web',
      'hero.stat2': 'sites livrés',
      'hero.stat3': 'score Lighthouse moyen',
      'hint.scroll': 'Faites défiler pour commencer le voyage',
      'hint.tap': 'Touchez › ou balayez pour commencer',
      'dock.prev': 'Arrêt précédent',
      'dock.start': 'Commencer le voyage',
      'dock.next': 'Suivant',
      'sheet.close': 'Fermer',
      'contact.write': 'Écrivez-moi',
      'loan.s1': '① Téléchargez l’app',
      'loan.s2': '② eKYC en 2 minutes',
      'loan.s3': '③ Argent versé aussitôt',
      'sound.on': 'Son de la guitare : activé',
      'sound.off': 'Son de la guitare : coupé',
      'sound.tap': 'Touchez pour écouter la guitare',
      'stop.home': 'Accueil',
      'stop.journey': 'Le parcours',
      'stop.station': 'Arrêt {n} · {name}',
      'stop.gallery': 'Galerie numérique',
      'stop.hobbies': 'Hors du code',
      'stop.contact': 'Café · Contact',
      'coach.text': 'Balayez ou touchez le bouton ci-dessous pour marcher avec Zabu',
      'exp.kicker': '01 — Le parcours',
      'exp.title': 'Chaque arrêt m’a appris <em>quelque chose.</em>',
      'exp.text': 'Faites défiler pour parcourir les lieux où j’ai travaillé — chaque arrêt est un chapitre de ma carrière.',
      'stop': 'ARRÊT',
      'proj.kicker': '02 — Galerie numérique',
      'proj.title': 'Projets <em>choisis.</em>',
      'proj.text': 'Survolez ou touchez une œuvre pour l’animer. Chacune s’ouvre sur une courte étude de cas.',
      'proj.open': 'voir l’étude de cas',
      'case.view': 'Voir l’étude de cas',
      'case.challenge': 'Défi',
      'case.solution': 'Solution',
      'case.result': 'Résultat',
      'case.live': 'Voir le site',
      'case.repo': 'Code source',
      'case.close': 'Fermer l’étude de cas',
      'hob.kicker': '03 — Hors du code',
      'hob.title': 'La vie au-delà <em>du clavier.</em>',
      'hob.text': 'Continuons — voici ce qui me garde curieux et plein d’énergie.',
      'contact.kicker': '04 — Restons en contact',
      'contact.title': 'Un projet en tête ? <em>Prenons un café.</em>',
      'contact.caption': 'Le café, c’est pour moi.',
      'contact.captionText': 'Parlez-moi de votre projet — touchez « Écrivez-moi » ci-dessous. Je réponds sous 24 heures.',
      'form.name': 'Nom',
      'form.namePh': 'Votre nom',
      'form.email': 'E-mail',
      'form.message': 'Message',
      'form.messagePh': 'Parlez-moi de votre projet, de vos délais et de votre budget…',
      'form.send': 'Envoyer',
      'form.invalid': 'Merci d’indiquer votre nom, un e-mail valide et un message.',
      'form.opening': 'Ouverture de votre messagerie…',
      'form.sending': 'Envoi…',
      'form.ok': 'Merci ! Je vous réponds sous 24 heures.',
      'form.fail': 'Une erreur est survenue — écrivez-moi à {email}.',
      'form.subject': 'Demande de projet de {name}',
      'footer': 'Réalisé avec GSAP et beaucoup de café.',
    },

    cs: {
      'meta.desc': 'Zabu — Webový vývojář. Portfolio vyprávěné posouváním: zkušenosti, vybrané projekty a kontakt.',
      'skip': 'Přejít na kontakt',
      'nav.home': 'Domů',
      'nav.journey': 'Cesta',
      'nav.projects': 'Projekty',
      'nav.hobbies': 'Koníčky',
      'nav.contact': 'Kontakt',
      'nav.cta': 'Napište mi',
      'nav.lang': 'Jazyk',
      'hero.eyebrow': 'Přijímám nové projekty',
      'hero.lead': 'Navrhuji a stavím rychlé, přístupné weby, které vyprávějí příběh — od vyladěných landing pages po full-stack webové aplikace.',
      'hero.ctaProjects': 'Zobrazit projekty',
      'hero.ctaContact': 'Kontaktovat',
      'hero.stat1': 'let tvorby webů',
      'hero.stat2': 'dodaných webů',
      'hero.stat3': 'průměrné skóre Lighthouse',
      'hint.scroll': 'Posouváním začněte cestu',
      'hint.tap': 'Klepněte na › nebo přejeďte prstem',
      'dock.prev': 'Předchozí zastávka',
      'dock.start': 'Začít cestu',
      'dock.next': 'Dále',
      'sheet.close': 'Zavřít',
      'contact.write': 'Napište mi zprávu',
      'loan.s1': '① Stáhněte aplikaci',
      'loan.s2': '② eKYC za 2 minuty',
      'loan.s3': '③ Peníze ihned na účtu',
      'sound.on': 'Zvuk kytary: zapnutý',
      'sound.off': 'Zvuk kytary: vypnutý',
      'sound.tap': 'Klepněte a poslechněte si kytaru',
      'stop.home': 'Domů',
      'stop.journey': 'Cesta',
      'stop.station': 'Zastávka {n} · {name}',
      'stop.gallery': 'Digitální galerie',
      'stop.hobbies': 'Po práci',
      'stop.contact': 'Kavárna · Kontakt',
      'coach.text': 'Přejeďte prstem nebo klepněte na tlačítko dole a vydejte se se Zabu',
      'exp.kicker': '01 — Cesta',
      'exp.title': 'Každá zastávka mě naučila <em>něco nového.</em>',
      'exp.text': 'Posouváním projděte místa, kde jsem pracoval — každá zastávka je kapitola mé kariéry.',
      'stop': 'ZASTÁVKA',
      'proj.kicker': '02 — Digitální galerie',
      'proj.title': 'Vybrané <em>práce.</em>',
      'proj.text': 'Najeďte myší nebo klepněte na dílo a oživte ho. Každé má krátkou případovou studii.',
      'proj.open': 'otevřít případovou studii',
      'case.view': 'Případová studie',
      'case.challenge': 'Výzva',
      'case.solution': 'Řešení',
      'case.result': 'Výsledek',
      'case.live': 'Navštívit web',
      'case.repo': 'Zdrojový kód',
      'case.close': 'Zavřít případovou studii',
      'hob.kicker': '03 — Po práci',
      'hob.title': 'Život mimo <em>klávesnici.</em>',
      'hob.text': 'Pokračujme — tohle mě udržuje zvědavého a nabitého energií.',
      'contact.kicker': '04 — Spojme se',
      'contact.title': 'Máte nápad na projekt? <em>Zajděme na kávu.</em>',
      'contact.caption': 'Káva je na mě.',
      'contact.captionText': 'Povězte mi o svém projektu — klepněte níže na „Napište mi zprávu“. Odpovím do 24 hodin.',
      'form.name': 'Jméno',
      'form.namePh': 'Vaše jméno',
      'form.email': 'E-mail',
      'form.message': 'Zpráva',
      'form.messagePh': 'Popište projekt, termín a rozpočet…',
      'form.send': 'Odeslat zprávu',
      'form.invalid': 'Vyplňte prosím jméno, platný e-mail a zprávu.',
      'form.opening': 'Otevírám e-mailovou aplikaci…',
      'form.sending': 'Odesílám…',
      'form.ok': 'Díky! Ozvu se do 24 hodin.',
      'form.fail': 'Něco se pokazilo — napište mi na {email}.',
      'form.subject': 'Poptávka projektu od {name}',
      'footer': 'Vytvořeno s GSAP a spoustou kávy.',
    },
  };

  // Quốc gia -> ngôn ngữ (còn lại dùng tiếng Anh)
  const COUNTRY = {
    VN: 'vi',
    CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
    FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
    CZ: 'cs', SK: 'cs',
  };

  const SUPPORTED = Object.keys(LANGS);
  const PREF_KEY = 'zabu-lang';
  const GEO_KEY = 'zabu-geo';
  const listeners = [];
  let lang = MAIN;

  const read = (kind, key) => {
    try {
      return window[kind].getItem(key);
    } catch {
      return null;
    }
  };
  const write = (kind, key, val) => {
    try {
      window[kind].setItem(key, val);
    } catch {
      /* private mode — bỏ qua */
    }
  };

  function t(key, vars) {
    let s = dict[lang][key] ?? dict[MAIN][key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    return s;
  }

  // Giá trị theo ngôn ngữ từ data.js: chuỗi thường hoặc { vi, en, zh, fr, cs }
  function pick(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return v[lang] ?? v[MAIN] ?? v.en ?? '';
    return v ?? '';
  }

  function apply() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
    // Thẻ chia sẻ (OG / Twitter) đổi theo ngôn ngữ — crawler đọc HTML tĩnh sẽ thấy bản tiếng Việt mặc định.
    const OG_LOCALE = { vi: 'vi_VN', en: 'en_US', zh: 'zh_CN', fr: 'fr_FR', cs: 'cs_CZ' };
    const setMeta = (sel, val) => document.querySelector(sel)?.setAttribute('content', val);
    setMeta('meta[property="og:title"]', t('meta.title'));
    setMeta('meta[property="og:description"]', t('meta.desc'));
    setMeta('meta[property="og:locale"]', OG_LOCALE[lang] || 'vi_VN');
    setMeta('meta[name="twitter:title"]', t('meta.title'));
    setMeta('meta[name="twitter:description"]', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll('[data-i18n-html]').forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.i18nPh)));
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.lang === lang)));
    document.querySelectorAll('.lang-current').forEach((el) => (el.textContent = LANGS[lang].short));
  }

  function set(next, { persist = false } = {}) {
    if (!SUPPORTED.includes(next)) return;
    if (persist) write('localStorage', PREF_KEY, next);
    if (next === lang) return;
    lang = next;
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  // Đoán tức thì (không cần mạng): ngôn ngữ trình duyệt nếu được hỗ trợ, không thì tiếng Việt
  function quickGuess() {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
    for (const l of langs) {
      const code = l.toLowerCase().split('-')[0];
      if (SUPPORTED.includes(code)) return code;
    }
    return MAIN;
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

  // Menu chọn ngôn ngữ (nút + danh sách)
  function setupSwitcher() {
    document.querySelectorAll('.lang-menu').forEach((wrap) => {
      const btn = wrap.querySelector('.lang-toggle');
      const list = wrap.querySelector('.lang-list');
      list.innerHTML = SUPPORTED.map(
        (code) =>
          `<li role="none"><button type="button" role="menuitemradio" data-lang="${code}" lang="${code}">${LANGS[code].name}<span>${LANGS[code].short}</span></button></li>`
      ).join('');
      const close = () => {
        wrap.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      };
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = !wrap.classList.contains('is-open');
        wrap.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (open) list.querySelector(`[data-lang="${lang}"]`)?.focus();
      });
      list.addEventListener('click', (e) => {
        const b = e.target.closest('[data-lang]');
        if (!b) return;
        set(b.dataset.lang, { persist: true });
        close();
        btn.focus();
      });
      document.addEventListener('click', (e) => !wrap.contains(e.target) && close());
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          close();
          btn.focus();
        }
      });
    });
  }

  function init() {
    setupSwitcher();
    const saved = read('localStorage', PREF_KEY);
    lang = SUPPORTED.includes(saved) ? saved : quickGuess();
    apply();

    // ?lang=vi | en | zh | fr | cs để xem thử
    const forced = new URLSearchParams(location.search).get('lang');
    if (SUPPORTED.includes(forced)) {
      set(forced);
      return;
    }
    if (!saved) {
      countryByIP().then((code) => {
        // Người dùng có thể đã tự chọn trong lúc chờ mạng
        if (code && !read('localStorage', PREF_KEY)) set(COUNTRY[code] || 'en');
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
