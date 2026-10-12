/*
 * Nội dung portfolio — chỉnh sửa file này để thay thông tin của bạn.
 * Kinh nghiệm bên dưới là DỮ LIỆU MẪU; phần dự án là dự án thật.
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
  // link: để trống nếu dự án nội bộ (nút "Xem website" sẽ ẩn).
  projects: [
    {
      title: 'POD Fulfillment',
      year: '2026',
      category: { vi: 'Hệ thống vận hành', en: 'Operations System', zh: '运营系统', fr: 'Système d’exploitation', cs: 'Provozní systém' },
      url: 'pod-fulfillment · internal',
      colors: ['#0f172a', '#e2e8f0', '#f97316'],
      layout: 'b',
      video: '',
      link: '',
      repo: '',
      role: { vi: 'Thiết kế quy trình & Lập trình', en: 'Workflow Design & Development', zh: '流程设计与开发', fr: 'Conception de flux & développement', cs: 'Návrh procesu & vývoj' },
      stack: ['Web App', 'Automation', 'Dashboard'],
      problem: {
        vi: 'Seller, designer và xưởng fulfill mỗi bên một file, một nhóm chat — đơn hàng dễ lạc, trạng thái không ai nắm rõ.',
        en: 'Sellers, designers and the fulfillment team each worked from their own sheets and chat groups — orders slipped through and nobody knew the real status.',
        zh: '卖家、设计师和生产团队各用各的表格和聊天群——订单容易遗漏，没人清楚真实进度。',
        fr: 'Vendeurs, designers et atelier travaillaient chacun sur leurs propres fichiers et groupes de discussion — commandes égarées, statut flou.',
        cs: 'Prodejci, designéři a fulfillment pracovali každý ve vlastních tabulkách a chatech — objednávky se ztrácely a nikdo neznal skutečný stav.',
      },
      solution: {
        vi: 'Một hệ thống chung đồng bộ cả ba khâu: seller lên đơn → designer nhận brief và nộp file → xưởng fulfill in, đóng gói, cập nhật vận đơn. Mỗi đơn có một trạng thái duy nhất, ai cũng nhìn thấy.',
        en: 'One shared system that syncs all three steps: seller places the order → designer receives the brief and uploads artwork → fulfillment prints, packs and updates tracking. Every order has a single status everyone can see.',
        zh: '一个统一系统打通三个环节：卖家下单 → 设计师接收需求并上传稿件 → 生产端打印、打包并更新物流。每笔订单只有一个状态，人人可见。',
        fr: 'Un système unique qui synchronise les trois étapes : le vendeur crée la commande → le designer reçoit le brief et dépose le fichier → l’atelier imprime, emballe et met à jour le suivi. Un seul statut par commande, visible de tous.',
        cs: 'Jeden společný systém propojující všechny tři kroky: prodejce zadá objednávku → designér dostane brief a nahraje grafiku → fulfillment tiskne, balí a doplní sledovací číslo. Každá objednávka má jediný stav, který vidí všichni.',
      },
      result: {
        vi: 'Không còn đơn bị bỏ sót, bớt hỏi đi hỏi lại trong nhóm chat; mỗi bên chỉ cần mở một màn hình để biết việc của mình.',
        en: 'No more missed orders and far fewer back-and-forth messages; each team opens one screen and knows exactly what to do next.',
        zh: '不再漏单，群里反复确认的消息大幅减少；每个环节只需打开一个页面就知道下一步。',
        fr: 'Plus de commandes oubliées, beaucoup moins d’allers-retours ; chaque équipe ouvre un seul écran et sait quoi faire.',
        cs: 'Žádné zapomenuté objednávky a mnohem méně dotazů v chatu; každý tým otevře jednu obrazovku a ví, co dál.',
      },
    },
    {
      title: 'Học Môi Giới Pro',
      year: '2025',
      category: { vi: 'LMS · Khoá học online', en: 'LMS · Online Courses', zh: 'LMS · 在线课程', fr: 'LMS · Cours en ligne', cs: 'LMS · Online kurzy' },
      url: 'hocmoigioipro.com',
      colors: ['#f5f7fb', '#1b2a4a', '#2f6fed'],
      layout: 'a',
      video: '',
      link: 'https://hocmoigioipro.com',
      repo: '',
      role: { vi: 'Thiết kế & Lập trình', en: 'Design & Development', zh: '设计与开发', fr: 'Design & développement', cs: 'Design & vývoj' },
      stack: ['Next.js', 'LMS', 'Thanh toán online'],
      problem: {
        vi: 'Một đơn vị đào tạo môi giới bất động sản muốn chuyển từ lớp học trực tiếp sang bán khoá học online, nhưng chưa có nền tảng để học viên đăng ký, thanh toán và học theo lộ trình.',
        en: 'A real-estate brokerage training provider wanted to move from in-person classes to online courses, but had no platform for students to enrol, pay and follow a learning path.',
        zh: '一家房产经纪培训机构想从线下课转向线上课程，却没有让学员报名、付费并按路径学习的平台。',
        fr: 'Un centre de formation pour agents immobiliers voulait passer des cours en présentiel aux cours en ligne, sans plateforme pour s’inscrire, payer et suivre un parcours.',
        cs: 'Školicí centrum pro realitní makléře chtělo přejít z prezenčních lekcí na online kurzy, ale nemělo platformu pro zápis, platbu a studium podle osnovy.',
      },
      solution: {
        vi: 'Website LMS hoàn chỉnh: trang giới thiệu khoá học, đăng ký và thanh toán online, khu vực học viên với video bài giảng, bài kiểm tra và theo dõi tiến độ từng chương.',
        en: 'A complete LMS site: course landing pages, online enrolment and payment, and a student area with video lessons, quizzes and chapter-by-chapter progress tracking.',
        zh: '完整的 LMS 网站：课程介绍页、在线报名与付款、学员专区，含视频课程、测验和逐章进度跟踪。',
        fr: 'Un site LMS complet : pages de présentation des cours, inscription et paiement en ligne, espace apprenant avec vidéos, quiz et suivi de progression chapitre par chapitre.',
        cs: 'Kompletní LMS web: prezentační stránky kurzů, online zápis a platba, studentská sekce s videolekcemi, testy a sledováním postupu po kapitolách.',
      },
      result: {
        vi: 'Học viên tự đăng ký và học mọi lúc trên điện thoại; đội ngũ đào tạo tự thêm khoá mới mà không cần gọi lập trình viên.',
        en: 'Students enrol themselves and learn anytime on their phones; the training team adds new courses without calling a developer.',
        zh: '学员可自行报名并随时在手机上学习；培训团队无需开发人员即可自行上架新课程。',
        fr: 'Les apprenants s’inscrivent seuls et suivent les cours sur mobile ; l’équipe ajoute de nouveaux cours sans développeur.',
        cs: 'Studenti se zapisují sami a studují kdykoli z telefonu; školicí tým přidává nové kurzy bez programátora.',
      },
    },
    {
      title: 'Thẩm Mỹ Kim Hoo',
      year: '2025',
      category: { vi: 'Website thương hiệu', en: 'Brand Website', zh: '品牌网站', fr: 'Site de marque', cs: 'Web značky' },
      url: 'thammykimhoo.vn',
      colors: ['#fff5f3', '#3a2326', '#d4849a'],
      layout: 'c',
      video: '',
      link: 'https://thammykimhoo.vn',
      repo: '',
      role: { vi: 'Thiết kế & Lập trình', en: 'Design & Development', zh: '设计与开发', fr: 'Design & développement', cs: 'Design & vývoj' },
      stack: ['Next.js', 'Landing page', 'SEO'],
      problem: {
        vi: 'Một thẩm mỹ viện có khách quen đông nhưng khách mới chỉ tìm thấy qua Facebook — không có nơi nào giới thiệu dịch vụ, bảng giá và đặt lịch một cách chuyên nghiệp.',
        en: 'A beauty clinic with loyal regulars, but new customers could only find it on Facebook — nowhere to present services, pricing and bookings professionally.',
        zh: '一家美容院老客户很多，但新客只能通过 Facebook 找到——没有一个专业展示服务、价目和预约的地方。',
        fr: 'Un institut de beauté avec une clientèle fidèle, mais les nouveaux clients ne le trouvaient que sur Facebook — aucun espace pour présenter services, tarifs et prise de rendez-vous.',
        cs: 'Kosmetická klinika se stálou klientelou, ale noví zákazníci ji našli jen na Facebooku — nikde profesionálně nepředstavovala služby, ceník a rezervace.',
      },
      solution: {
        vi: 'Website thương hiệu nhẹ nhàng, tông hồng pastel: từng dịch vụ có trang riêng với hình ảnh trước – sau, bảng giá rõ ràng, nút đặt lịch và gọi Zalo ngay trên mobile, chuẩn SEO để khách tìm thấy trên Google.',
        en: 'A soft, pastel-pink brand site: a page for every service with before/after photos, clear pricing, one-tap booking and Zalo call on mobile, and SEO-ready structure so customers find it on Google.',
        zh: '柔和的粉色品牌网站：每项服务独立页面，含前后对比图、清晰价目，手机端一键预约和 Zalo 通话，并做好 SEO 让客户能在 Google 上搜到。',
        fr: 'Un site de marque doux en rose pastel : une page par service avec photos avant/après, tarifs clairs, réservation et appel Zalo en un geste sur mobile, structure SEO pour être trouvé sur Google.',
        cs: 'Jemný web značky v pastelově růžové: stránka pro každou službu s fotkami před/po, přehledný ceník, rezervace a volání přes Zalo jedním klepnutím na mobilu, SEO struktura pro vyhledání na Googlu.',
      },
      result: {
        vi: 'Khách mới tìm thấy và đặt lịch trực tiếp từ website; chủ tiệm tự cập nhật bảng giá và ưu đãi theo tháng.',
        en: 'New customers find the clinic and book straight from the site; the owner updates prices and monthly promotions herself.',
        zh: '新客户直接从网站找到并预约；店主可自行更新价目和每月优惠。',
        fr: 'Les nouveaux clients trouvent l’institut et réservent directement sur le site ; la gérante met à jour tarifs et promotions mensuelles elle-même.',
        cs: 'Noví zákazníci kliniku najdou a rezervují přímo z webu; majitelka si sama upravuje ceník a měsíční akce.',
      },
    },
    {
      title: 'Vic Craft Co.',
      year: '2026',
      category: { vi: 'Shopify · Print-on-demand', en: 'Shopify · Print-on-demand', zh: 'Shopify · 按需印刷', fr: 'Shopify · Print-on-demand', cs: 'Shopify · Print-on-demand' },
      url: 'viccraftco.com',
      colors: ['#f7f1e8', '#2b2420', '#c0843f'],
      layout: 'a',
      video: '',
      link: 'https://viccraftco.com',
      repo: '',
      role: { vi: 'Xây dựng store & vận hành', en: 'Store Build & Operations', zh: '店铺搭建与运营', fr: 'Création & exploitation de la boutique', cs: 'Stavba obchodu & provoz' },
      stack: ['Shopify', 'Liquid', 'POD'],
      problem: {
        vi: 'Cần một store print-on-demand bán ra thị trường quốc tế: sản phẩm cá nhân hoá, nhiều biến thể màu – size, và quy trình đơn hàng phải tự chảy về xưởng in.',
        en: 'Needed a print-on-demand store for international customers: personalised products, many colour and size variants, and orders that flow automatically to the print partner.',
        zh: '需要一个面向海外客户的按需印刷店铺：个性化产品、多颜色多尺码变体，订单需自动流转到印刷端。',
        fr: 'Il fallait une boutique print-on-demand pour une clientèle internationale : produits personnalisés, nombreuses variantes couleur/taille, et des commandes transmises automatiquement à l’imprimeur.',
        cs: 'Bylo potřeba print-on-demand obchod pro zahraniční zákazníky: personalizované produkty, spousta variant barev a velikostí a objednávky, které samy tečou k tiskaři.',
      },
      solution: {
        vi: 'Store Shopify với theme tuỳ chỉnh bằng Liquid: trang sản phẩm có mockup theo từng màu, ô nhập nội dung cá nhân hoá, bộ sưu tập theo mùa và kết nối fulfillment để đơn tự đẩy sang in – ship.',
        en: 'A Shopify store with a custom Liquid theme: product pages with per-colour mockups, personalisation fields, seasonal collections and a fulfillment integration that pushes each order straight to print and ship.',
        zh: '使用自定义 Liquid 主题的 Shopify 店铺：产品页按颜色展示样机、个性化输入框、季节性系列，并对接生产端让每笔订单自动进入印刷与发货。',
        fr: 'Une boutique Shopify avec thème Liquid sur mesure : pages produit avec mockups par couleur, champs de personnalisation, collections saisonnières et intégration fulfillment qui envoie chaque commande à l’impression et à l’expédition.',
        cs: 'Shopify obchod s vlastní Liquid šablonou: produktové stránky s mockupy podle barvy, pole pro personalizaci, sezónní kolekce a napojení na fulfillment, které každou objednávku pošle rovnou k tisku a odeslání.',
      },
      result: {
        vi: 'Store vận hành gần như tự động từ lúc khách đặt tới lúc giao; thêm sản phẩm mới chỉ mất vài phút với mockup sẵn.',
        en: 'The store runs almost hands-free from checkout to delivery; adding a new product takes minutes with ready-made mockups.',
        zh: '从下单到送达几乎全自动运行；借助现成样机，上架新品只需几分钟。',
        fr: 'La boutique tourne presque sans intervention, de la commande à la livraison ; ajouter un produit prend quelques minutes grâce aux mockups prêts.',
        cs: 'Obchod běží téměř bez zásahu od objednávky po doručení; nový produkt přidáte za pár minut díky hotovým mockupům.',
      },
    },
  ],
};
