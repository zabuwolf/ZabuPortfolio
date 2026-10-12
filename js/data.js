/*
 * Nội dung portfolio — chỉnh sửa file này để thay thông tin của bạn.
 * Toàn bộ kinh nghiệm / dự án bên dưới là DỮ LIỆU MẪU, hãy thay bằng thông tin thật.
 *
 * Trường văn bản có thể là chuỗi (dùng chung) hoặc { vi, en, zh, fr, cs } — tiếng Việt là ngôn ngữ chính,
 * thiếu ngôn ngữ nào thì tự rơi về tiếng Việt.
 */
window.PORTFOLIO = {
  name: 'Zabu',
  role: 'Website Developer',

  contact: {
    email: 'hoangminh7894@gmail.com',
    // Dán endpoint Formspree / Getform... vào đây để form gửi thật.
    // Để trống thì form sẽ mở ứng dụng email (mailto).
    formEndpoint: '',
  },

  socials: [
    { label: 'Facebook', icon: 'facebook', url: 'https://fb.com/zabuhoangminh' },
    { label: 'Zalo', icon: 'zalo', url: 'https://zalo.me/0837946886' },
  ],

  // Mỗi mục là một "trạm" trên hành trình.
  // building: bank | vending | finance | luxury | pod — kiểu toà nhà có animation
  // scene:    bank | ops | loan | luxury | pod     — cảnh Zabu đang làm việc (kèm trang phục của thời kỳ đó)
  // Thông tin dưới đây là MẪU chung chung — thay bằng công ty / vai trò / thời gian thật.
  experience: [
    {
      period: '2015 — 2017',
      role: { vi: 'Nhân viên ngân hàng · mảng POS', en: 'Bank Officer · POS', zh: '银行职员 · POS', fr: 'Chargé de clientèle bancaire · TPE', cs: 'Bankovní úředník · POS' },
      company: { vi: 'Ngân hàng thương mại', en: 'Commercial Bank', zh: '商业银行', fr: 'Banque commerciale', cs: 'Komerční banka' },
      summary: {
        vi: 'Triển khai và hỗ trợ máy quẹt thẻ POS cho các điểm bán — hướng dẫn nhân viên và đảm bảo mọi giao dịch luôn thông suốt.',
        en: 'Rolled out and supported card POS terminals for merchants — training staff and keeping every payment going through.',
        zh: '为商户部署并维护刷卡 POS 终端——培训店员，确保每一笔支付顺利完成。',
        fr: 'Déploiement et support des terminaux de paiement (TPE) chez les commerçants — formation du personnel et paiements sans accroc.',
        cs: 'Zaváděl jsem a podporoval platební POS terminály u obchodníků — školil personál a hlídal, aby každá platba prošla.',
      },
      stack: ['POS', { vi: 'Thanh toán thẻ', en: 'Card payments', zh: '刷卡支付', fr: 'Paiement par carte', cs: 'Platby kartou' }, { vi: 'Hỗ trợ đại lý', en: 'Merchant support', zh: '商户支持', fr: 'Support commerçants', cs: 'Podpora obchodníků' }],
      building: 'bank',
      scene: 'bank',
    },
    {
      period: '2017 — 2018',
      role: { vi: 'Nhân viên vận hành & kỹ thuật', en: 'Operations & Tech Staff', zh: '运营与技术员', fr: 'Agent d’exploitation & technique', cs: 'Provozní a technický pracovník' },
      company: { vi: 'Máy bán hàng tự động & QR', en: 'Vending & QR Payments', zh: '自动售货机与扫码支付', fr: 'Distributeurs & paiement QR', cs: 'Prodejní automaty & QR platby' },
      summary: {
        vi: 'Vận hành, bảo trì hệ thống máy bán hàng tự động và triển khai thanh toán QR — lần đầu làm quen với thiết bị, thanh toán và dashboard.',
        en: 'Kept a fleet of vending machines running and rolled out QR payments — my first taste of hardware, payments and dashboards.',
        zh: '维护一批自动售货机的运行并推广扫码支付——我第一次接触硬件、支付和数据面板。',
        fr: 'Maintenance d’un parc de distributeurs automatiques et déploiement du paiement QR — mes premiers pas avec le matériel, les paiements et les tableaux de bord.',
        cs: 'Staral jsem se o síť prodejních automatů a zaváděl QR platby — první kontakt s hardwarem, platbami a dashboardy.',
      },
      stack: [{ vi: 'Thanh toán QR', en: 'QR payments', zh: '扫码支付', fr: 'Paiement QR', cs: 'QR platby' }, 'IoT', { vi: 'Vận hành hiện trường', en: 'Field ops', zh: '现场运维', fr: 'Opérations terrain', cs: 'Terénní provoz' }],
      building: 'vending',
      scene: 'ops',
    },
    {
      period: '2021 — 2023',
      role: { vi: 'Nhân viên tài chính ngân hàng · Cho vay online', en: 'Banking Finance Officer · Online Lending', zh: '银行金融专员 · 线上贷款', fr: 'Conseiller financier bancaire · Crédit en ligne', cs: 'Bankovní finanční poradce · Online půjčky' },
      company: { vi: 'Tài chính ngân hàng', en: 'Banking & Finance', zh: '银行金融', fr: 'Banque & finance', cs: 'Bankovnictví & finance' },
      summary: {
        vi: 'Hướng dẫn khách hàng vay online ngay trên điện thoại — tải app, eKYC, giải ngân — và hiểu một luồng trải nghiệm tốt quan trọng thế nào.',
        en: 'Guided customers through online loans on their phones — download, eKYC, approval — and learned how much a good flow matters.',
        zh: '在手机上一步步引导客户办理线上贷款——下载、eKYC、审批——也让我明白好的流程有多重要。',
        fr: 'Accompagnement des clients dans leur crédit en ligne sur mobile — téléchargement, eKYC, validation — et la preuve qu’un bon parcours change tout.',
        cs: 'Provázel jsem klienty online půjčkou přímo v telefonu — stažení, eKYC, schválení — a pochopil, jak moc záleží na dobrém průchodu.',
      },
      stack: [{ vi: 'Cho vay online', en: 'Online lending', zh: '线上贷款', fr: 'Crédit en ligne', cs: 'Online půjčky' }, 'eKYC', { vi: 'Tư vấn khách hàng', en: 'Customer guidance', zh: '客户指导', fr: 'Accompagnement client', cs: 'Poradenství klientům' }],
      building: 'finance',
      scene: 'loan',
    },
    {
      period: '2023 — 2026',
      role: { vi: 'Bán hàng Luxury & kênh online', en: 'Luxury Sales & Online', zh: '奢侈品销售与线上渠道', fr: 'Vente de luxe & e-commerce', cs: 'Luxusní prodej & online' },
      company: { vi: 'Cửa hàng điện thoại Luxury', en: 'Luxury Phone Store', zh: '奢华手机店', fr: 'Boutique de téléphones de luxe', cs: 'Obchod s luxusními telefony' },
      summary: {
        vi: 'Tư vấn thiết bị cao cấp cho khách VIP và đưa cửa hàng lên online — website, mạng xã hội và dữ liệu khách hàng.',
        en: 'Presented premium devices to VIP customers and took the store online — website, social and a customer database.',
        zh: '为 VIP 客户介绍高端设备，并把门店搬到线上——网站、社交媒体和客户数据库。',
        fr: 'Présentation d’appareils haut de gamme à une clientèle VIP et mise en ligne de la boutique — site, réseaux sociaux et base clients.',
        cs: 'Představoval jsem prémiová zařízení VIP klientům a přenesl obchod online — web, sociální sítě a databáze zákazníků.',
      },
      stack: [{ vi: 'Bán lẻ cao cấp', en: 'Luxury retail', zh: '高端零售', fr: 'Commerce de luxe', cs: 'Luxusní retail' }, 'CRM', { vi: 'Website & MXH', en: 'Website & social', zh: '网站与社媒', fr: 'Site & réseaux sociaux', cs: 'Web & sociální sítě' }],
      building: 'luxury',
      scene: 'luxury',
    },
    {
      period: { vi: '2026 — Nay', en: '2026 — Now', zh: '2026 — 至今', fr: '2026 — Aujourd’hui', cs: '2026 — Dosud' },
      role: 'Website Developer',
      company: 'E-commerce POD',
      summary: {
        vi: 'Xây dựng và mở rộng các store print-on-demand — storefront, mockup sản phẩm và tự động hoá đơn hàng.',
        en: 'Building and scaling print-on-demand stores — storefronts, product mockups and order automation.',
        zh: '搭建并扩展按需印刷（POD）店铺——店面、产品样机和订单自动化。',
        fr: 'Création et croissance de boutiques print-on-demand — vitrines, mockups produits et automatisation des commandes.',
        cs: 'Stavím a rozšiřuji print-on-demand obchody — výlohy, mockupy produktů a automatizaci objednávek.',
      },
      stack: ['Shopify', 'WooCommerce', { vi: 'Tự động hoá', en: 'Automation', zh: '自动化', fr: 'Automatisation', cs: 'Automatizace' }],
      building: 'pod',
      scene: 'pod',
    },
  ],

  // Sở thích — mỗi mục là một điểm dừng: Zabu tự động "diễn" (đánh đàn, chơi game, đi biển, xem phim 3D).
  // art: guitar | dota | travel | movies
  hobbies: [
    {
      art: 'guitar',
      title: { vi: 'Đánh guitar', en: 'Guitar', zh: '弹吉他', fr: 'Guitare', cs: 'Kytara' },
      text: {
        vi: 'Những bản ballad buổi tối trên cây acoustic — dạo này là intro “Mùa Đông” của Erik. Âm nhạc giữ cho tôi cảm giác nhịp điệu, cả khi viết code.',
        en: 'Evening ballads on an acoustic — lately the intro of “Mùa Đông” by Erik. Music keeps my sense of rhythm, in code too.',
        zh: '晚上弹木吉他抒情曲——最近在练 Erik《Mùa Đông》的前奏。音乐让我保持节奏感，写代码时也一样。',
        fr: 'Des ballades le soir à la guitare acoustique — en ce moment l’intro de « Mùa Đông » d’Erik. La musique garde mon sens du rythme, même dans le code.',
        cs: 'Večerní balady na akustiku — teď hlavně intro „Mùa Đông“ od Erika. Hudba mi drží cit pro rytmus, i v kódu.',
      },
      tags: ['Acoustic', 'Ballad', 'Mùa Đông · Erik'],
      // Intro guitar tự chơi khi Zabu tới cảnh này (không hiển thị trên trang), lặp lại liên tục.
      // tab: mỗi phần tử là 1 ô nhịp 4/4 chia 16 móc kép; mỗi nốt: [vị trí 0..15, 'dây:ngăn', ...]
      //      dây: e B G D A E (e = dây 1 mảnh nhất). Nhiều nốt cùng vị trí = gảy cùng lúc.
      song: {
        bpm: 78,
        tab: [
          // D7M:  A5+B2 · D4 G2 · B2 · D4 e2 · · · B2
          [[0, 'A:5', 'B:2'], [2, 'D:4'], [3, 'G:2'], [5, 'B:2'], [7, 'D:4'], [8, 'e:2'], [12, 'B:2']],
          // A7Msus2:  A0+B0 · D2 G1 · B0 · D2 e0
          [[0, 'A:0', 'B:0'], [2, 'D:2'], [3, 'G:1'], [5, 'B:0'], [7, 'D:2'], [8, 'e:0']],
        ],
      },
    },
    {
      art: 'dota',
      title: 'Esports · Dota 2',
      text: {
        vi: 'Main Pudge, sống chết vì một cú hook hoàn hảo. Dota dạy tôi chiến thuật, sự kiên nhẫn và cách phối hợp đồng đội khi áp lực.',
        en: 'Main Pudge, hunting for the perfect Meat Hook. Dota taught me strategy, patience and how to communicate under pressure.',
        zh: '主玩屠夫 Pudge，执着于一记完美的肉钩。Dota 教会我策略、耐心以及在压力下沟通。',
        fr: 'Main Pudge, à la recherche du Meat Hook parfait. Dota m’a appris la stratégie, la patience et la communication sous pression.',
        cs: 'Main Pudge a hon na dokonalý Meat Hook. Dota mě naučila strategii, trpělivost a komunikaci pod tlakem.',
      },
      tags: ['Dota 2', 'Pudge', 'Meat Hook', { vi: 'Chiến thuật', en: 'Strategy', zh: '策略', fr: 'Stratégie', cs: 'Strategie' }],
    },
    {
      art: 'travel',
      title: { vi: 'Du lịch', en: 'Travel', zh: '旅行', fr: 'Voyages', cs: 'Cestování' },
      text: {
        vi: 'Biển, hoàng hôn và đồ ăn đường phố. Chuyến đi nào cũng mang về ý tưởng về màu sắc, chữ và bố cục.',
        en: 'Beaches, sunsets and street food. Every trip brings back ideas for colour, type and layout.',
        zh: '海滩、日落和街头美食。每次旅行都带回关于色彩、字体和版式的灵感。',
        fr: 'Plages, couchers de soleil et street food. Chaque voyage me rapporte des idées de couleurs, de typo et de mise en page.',
        cs: 'Pláže, západy slunce a street food. Z každé cesty si vezu nápady na barvy, písmo a layout.',
      },
      tags: [{ vi: 'Biển', en: 'Beach', zh: '海滩', fr: 'Plage', cs: 'Pláž' }, 'Street food', { vi: 'Chụp ảnh', en: 'Photography', zh: '摄影', fr: 'Photo', cs: 'Fotografie' }],
    },
    {
      art: 'movies',
      title: { vi: 'Xem phim', en: 'Movies', zh: '看电影', fr: 'Cinéma', cs: 'Filmy' },
      text: {
        vi: 'Bỏng ngô, kính 3D và những thế giới khoa học viễn tưởng. Điện ảnh là bài học kể chuyện yêu thích của tôi.',
        en: 'Popcorn, 3D glasses and big sci-fi worlds. Films are my favourite lesson in storytelling.',
        zh: '爆米花、3D 眼镜和宏大的科幻世界。电影是我最喜欢的讲故事课堂。',
        fr: 'Pop-corn, lunettes 3D et grands univers de science-fiction. Le cinéma est ma leçon préférée de narration.',
        cs: 'Popcorn, 3D brýle a velké sci-fi světy. Filmy jsou moje nejoblíbenější lekce vyprávění.',
      },
      tags: ['Sci-fi', '3D', { vi: 'Bỏng ngô', en: 'Popcorn', zh: '爆米花', fr: 'Pop-corn', cs: 'Popcorn' }],
    },
  ],

  // video: đường dẫn .mp4/.webm (tùy chọn) — sẽ tự play khi hover.
  // Không có video thì hiển thị bản mock giao diện tự cuộn.
  projects: [
    {
      title: 'Lumen Coffee',
      year: '2025',
      category: { vi: 'Thương mại điện tử', en: 'E-commerce', zh: '电子商务', fr: 'E-commerce', cs: 'E-commerce' },
      url: 'lumencoffee.vn',
      colors: ['#f6efe6', '#3b2a20', '#d9864e'],
      layout: 'a',
      video: '',
      link: '#',
      repo: '',
      role: { vi: 'Thiết kế & Lập trình', en: 'Design & Development', zh: '设计与开发', fr: 'Design & développement', cs: 'Design & vývoj' },
      stack: ['Next.js', 'Shopify', 'GSAP'],
      problem: {
        vi: 'Một xưởng rang cà phê đặc sản chỉ bán qua tin nhắn Instagram, không thể mở rộng đơn hàng.',
        en: 'A specialty roaster selling only through Instagram DMs, with no way to scale orders.',
        zh: '一家精品咖啡烘焙坊只靠 Instagram 私信卖货，订单无法扩大。',
        fr: 'Un torréfacteur de spécialité qui ne vendait que par messages Instagram, sans moyen de développer les commandes.',
        cs: 'Pražírna výběrové kávy prodávala jen přes zprávy na Instagramu a nemohla objednávky škálovat.',
      },
      solution: {
        vi: 'Storefront Shopify headless với gói đăng ký định kỳ và câu chuyện nguồn gốc từng loại hạt kể bằng cuộn trang.',
        en: 'A headless Shopify storefront with subscription bundles and a scroll-told origin story for each bean.',
        zh: '打造 Headless Shopify 店面，支持订阅套餐，并用滚动叙事讲述每款咖啡豆的产地故事。',
        fr: 'Une boutique Shopify headless avec abonnements et l’histoire de chaque grain racontée au défilement.',
        cs: 'Headless Shopify obchod s předplatným a příběhem původu každého zrna vyprávěným při posouvání.',
      },
      result: {
        vi: 'Doanh thu online tăng 3,2 lần trong quý đầu, LCP 1,1s trên mobile.',
        en: '3.2× online revenue in the first quarter, 1.1s LCP on mobile.',
        zh: '首季度线上营收增长 3.2 倍，移动端 LCP 1.1 秒。',
        fr: 'Chiffre d’affaires en ligne ×3,2 au premier trimestre, LCP de 1,1 s sur mobile.',
        cs: 'Online tržby 3,2× v prvním čtvrtletí, LCP 1,1 s na mobilu.',
      },
    },
    {
      title: 'Atlas Finance',
      year: '2024',
      category: { vi: 'Dashboard SaaS', en: 'SaaS Dashboard', zh: 'SaaS 数据面板', fr: 'Tableau de bord SaaS', cs: 'SaaS dashboard' },
      url: 'app.atlasfinance.io',
      colors: ['#0f172a', '#e2e8f0', '#5b6cff'],
      layout: 'b',
      video: '',
      link: '#',
      repo: '',
      role: { vi: 'Trưởng nhóm Frontend', en: 'Frontend Lead', zh: '前端负责人', fr: 'Lead front-end', cs: 'Vedoucí frontendu' },
      stack: ['React', 'TypeScript', 'D3'],
      problem: {
        vi: 'Đội tài chính phải xuất dữ liệu ra bảng tính vì dashboard quá chậm.',
        en: 'Finance teams were exporting data to spreadsheets because the dashboard was too slow.',
        zh: '面板太慢，财务团队只好把数据导出到表格里处理。',
        fr: 'Les équipes finance exportaient les données vers des tableurs car le tableau de bord était trop lent.',
        cs: 'Finanční týmy exportovaly data do tabulek, protože dashboard byl příliš pomalý.',
      },
      solution: {
        vi: 'Xây lại giao diện báo cáo với bảng ảo hoá, truy vấn streaming và thao tác ưu tiên bàn phím.',
        en: 'Rebuilt the reporting UI with virtualised tables, streaming queries and a keyboard-first workflow.',
        zh: '用虚拟化表格、流式查询和键盘优先的操作重建报表界面。',
        fr: 'Refonte de l’interface de reporting : tableaux virtualisés, requêtes en streaming et usage clavier d’abord.',
        cs: 'Přestavba reportingu s virtualizovanými tabulkami, streamovanými dotazy a ovládáním hlavně z klávesnice.',
      },
      result: {
        vi: 'Thời gian tải báo cáo từ 9s xuống 800ms; người dùng hoạt động hằng tuần tăng 61%.',
        en: 'Report load time from 9s to 800ms; weekly active usage up 61%.',
        zh: '报表加载时间从 9 秒降到 800 毫秒；周活跃使用量提升 61%。',
        fr: 'Chargement des rapports de 9 s à 800 ms ; usage hebdomadaire +61 %.',
        cs: 'Načtení reportu z 9 s na 800 ms; týdenní aktivní používání +61 %.',
      },
    },
    {
      title: 'Hanoi Arch Studio',
      year: '2024',
      category: { vi: 'Website Portfolio', en: 'Portfolio Site', zh: '作品集网站', fr: 'Site portfolio', cs: 'Portfoliový web' },
      url: 'hanoiarch.studio',
      colors: ['#efeee9', '#1c1c1c', '#b08d57'],
      layout: 'c',
      video: '',
      link: '#',
      repo: '',
      role: { vi: 'Lập trình', en: 'Development', zh: '开发', fr: 'Développement', cs: 'Vývoj' },
      stack: ['Astro', 'GSAP', 'Sanity'],
      problem: {
        vi: 'Một văn phòng kiến trúc có các công trình trông nhạt nhoà và cũ kỹ trên website.',
        en: 'An architecture firm whose work looked flat and dated online.',
        zh: '一家建筑事务所的作品在网上显得平淡又过时。',
        fr: 'Un cabinet d’architectes dont les réalisations paraissaient plates et datées en ligne.',
        cs: 'Architektonický ateliér, jehož práce online působila plochě a zastarale.',
      },
      solution: {
        vi: 'Website phong cách tạp chí, lấy hình ảnh làm trọng tâm, chuyển trang mượt và CMS để đội tự cập nhật.',
        en: 'An editorial, image-led site with smooth page transitions and a CMS the team edits themselves.',
        zh: '以图片为主的杂志风网站，页面过渡流畅，并配有团队可自行编辑的 CMS。',
        fr: 'Un site éditorial porté par l’image, avec des transitions fluides et un CMS que l’équipe gère elle-même.',
        cs: 'Editoriální web postavený na fotografiích, s plynulými přechody a CMS, který tým upravuje sám.',
      },
      result: {
        vi: 'Được giới thiệu trên hai trang tuyển chọn thiết kế; lượng khách hàng tiềm năng tăng gấp đôi.',
        en: 'Featured on two design galleries; inbound leads doubled.',
        zh: '入选两个设计展示网站；主动咨询量翻倍。',
        fr: 'Mis en avant sur deux galeries de design ; demandes entrantes doublées.',
        cs: 'Vystaveno ve dvou designových galeriích; poptávky se zdvojnásobily.',
      },
    },
    {
      title: 'Pulse Fitness',
      year: '2023',
      category: 'Web App',
      url: 'pulse.fit',
      colors: ['#101418', '#f2f5f3', '#3ddc97'],
      layout: 'b',
      video: '',
      link: '#',
      repo: '',
      role: 'Fullstack',
      stack: ['Vue', 'Supabase', 'PWA'],
      problem: {
        vi: 'Hội viên phải gọi điện cho lễ tân để đặt lớp tập.',
        en: 'Gym members had to call the front desk to book classes.',
        zh: '健身房会员只能打电话给前台预约课程。',
        fr: 'Les adhérents devaient appeler l’accueil pour réserver un cours.',
        cs: 'Členové posilovny museli kvůli rezervaci lekce volat na recepci.',
      },
      solution: {
        vi: 'Ứng dụng PWA cài được để đặt lớp, xếp hàng chờ và nhắc lịch, đồng bộ với CRM của phòng tập.',
        en: 'An installable PWA for bookings, waitlists and push reminders, synced with the gym’s CRM.',
        zh: '可安装的 PWA，支持预约、候补和推送提醒，并与健身房 CRM 同步。',
        fr: 'Une PWA installable pour les réservations, listes d’attente et rappels push, synchronisée avec le CRM.',
        cs: 'Instalovatelná PWA pro rezervace, čekací listiny a push připomínky, propojená s CRM posilovny.',
      },
      result: {
        vi: '12.000 lượt đặt mỗi tháng, cuộc gọi tới lễ tân giảm 70%.',
        en: '12k bookings per month, front-desk calls down 70%.',
        zh: '每月 1.2 万次预约，前台来电减少 70%。',
        fr: '12 000 réservations par mois, appels à l’accueil −70 %.',
        cs: '12 tisíc rezervací měsíčně, hovorů na recepci o 70 % méně.',
      },
    },
    {
      title: 'Saigon Eats',
      year: '2023',
      category: 'Landing Page',
      url: 'saigoneats.vn',
      colors: ['#fff6ea', '#2d1b12', '#ff6b3d'],
      layout: 'a',
      video: '',
      link: '#',
      repo: '',
      role: { vi: 'Thiết kế & Lập trình', en: 'Design & Development', zh: '设计与开发', fr: 'Design & développement', cs: 'Design & vývoj' },
      stack: ['HTML', 'Tailwind', 'Lottie'],
      problem: {
        vi: 'Một startup tour ẩm thực sắp ra mắt trong ba tuần mà chưa có website.',
        en: 'A food-tour startup launching in three weeks with no site.',
        zh: '一家美食之旅初创公司三周后上线，却还没有网站。',
        fr: 'Une startup de food tours lancée dans trois semaines, sans site.',
        cs: 'Startup s gastro túrami spouštěl za tři týdny a neměl web.',
      },
      solution: {
        vi: 'Landing page vui tươi, tải nhanh với minh hoạ Lottie và luồng đặt tour.',
        en: 'A playful, fast landing page with Lottie illustrations and a booking flow.',
        zh: '一个活泼、快速的落地页，配有 Lottie 插画和预订流程。',
        fr: 'Une landing page rapide et ludique avec illustrations Lottie et parcours de réservation.',
        cs: 'Hravá a rychlá landing page s Lottie ilustracemi a rezervačním procesem.',
      },
      result: {
        vi: 'Bán hết 40 tour đầu tiên trước ngày ra mắt.',
        en: 'Sold out the first 40 tours before launch day.',
        zh: '上线前就售罄了首批 40 个行程。',
        fr: 'Les 40 premières visites vendues avant le lancement.',
        cs: 'Prvních 40 túr vyprodáno ještě před spuštěním.',
      },
    },
    {
      title: 'Orbit UI Kit',
      year: '2022',
      category: { vi: 'Mã nguồn mở', en: 'Open Source', zh: '开源', fr: 'Open source', cs: 'Open source' },
      url: 'orbit-ui.dev',
      colors: ['#f4f4ff', '#1e1b4b', '#8b5cf6'],
      layout: 'c',
      video: '',
      link: '#',
      repo: 'https://github.com/',
      role: { vi: 'Tác giả', en: 'Author', zh: '作者', fr: 'Auteur', cs: 'Autor' },
      stack: ['Web Components', 'CSS', 'Storybook'],
      problem: {
        vi: 'Các nhóm phải viết lại cùng một bộ component chuẩn accessibility cho mỗi dự án.',
        en: 'Teams rebuilding the same accessible components in every project.',
        zh: '各团队在每个项目里重复开发同样的无障碍组件。',
        fr: 'Des équipes qui réécrivaient les mêmes composants accessibles à chaque projet.',
        cs: 'Týmy v každém projektu znovu stavěly stejné přístupné komponenty.',
      },
      solution: {
        vi: 'Bộ component độc lập framework, có design token và hỗ trợ bàn phím đầy đủ.',
        en: 'A framework-agnostic component kit with design tokens and full keyboard support.',
        zh: '一套与框架无关的组件库，带设计令牌并完整支持键盘操作。',
        fr: 'Un kit de composants indépendant du framework, avec design tokens et support clavier complet.',
        cs: 'Sada komponent nezávislá na frameworku, s design tokeny a plnou podporou klávesnice.',
      },
      result: {
        vi: '1.400 sao GitHub, dùng trong hơn 30 website thực tế.',
        en: '1.4k GitHub stars, used in 30+ production sites.',
        zh: 'GitHub 1.4k 星，被 30 多个线上网站使用。',
        fr: '1,4 k étoiles GitHub, utilisé sur plus de 30 sites en production.',
        cs: '1,4 tis. hvězd na GitHubu, používá se na 30+ produkčních webech.',
      },
    },
  ],
};
