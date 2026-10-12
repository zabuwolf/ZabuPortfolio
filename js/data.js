/*
 * Nội dung portfolio — chỉnh sửa file này để thay thông tin của bạn.
 * Toàn bộ kinh nghiệm / dự án bên dưới là DỮ LIỆU MẪU, hãy thay bằng thông tin thật.
 *
 * Trường văn bản có thể là chuỗi (dùng chung) hoặc { en: '...', vi: '...' } (song ngữ).
 */
window.PORTFOLIO = {
  name: 'Zabu',
  role: 'Website Developer',

  contact: {
    email: 'hello@zabu.dev',
    // Dán endpoint Formspree / Getform... vào đây để form gửi thật.
    // Để trống thì form sẽ mở ứng dụng email (mailto).
    formEndpoint: '',
  },

  socials: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/' },
    { label: 'Behance', icon: 'behance', url: 'https://www.behance.net/' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/' },
  ],

  // Mỗi mục là một "trạm" trên hành trình.
  // building: bank | vending | finance | luxury | pod — kiểu toà nhà có animation
  // scene:    bank | ops | loan | luxury | pod     — cảnh Zabu đang làm việc (kèm trang phục của thời kỳ đó)
  // Thông tin dưới đây là MẪU chung chung — thay bằng công ty / vai trò / thời gian thật.
  experience: [
    {
      period: '2014 — 2016',
      role: { en: 'Bank Officer · POS', vi: 'Nhân viên ngân hàng · mảng POS' },
      company: { en: 'Commercial Bank', vi: 'Ngân hàng thương mại' },
      summary: {
        en: 'Rolled out and supported card POS terminals for merchants — training staff and keeping every payment going through.',
        vi: 'Triển khai và hỗ trợ máy quẹt thẻ POS cho các điểm bán — hướng dẫn nhân viên và đảm bảo mọi giao dịch luôn thông suốt.',
      },
      stack: ['POS', { en: 'Card payments', vi: 'Thanh toán thẻ' }, { en: 'Merchant support', vi: 'Hỗ trợ đại lý' }],
      building: 'bank',
      scene: 'bank',
    },
    {
      period: '2016 — 2017',
      role: { en: 'Operations & Tech Staff', vi: 'Nhân viên vận hành & kỹ thuật' },
      company: { en: 'Vending & QR Payments', vi: 'Máy bán hàng tự động & QR' },
      summary: {
        en: 'Kept a fleet of vending machines running and rolled out QR payments — my first taste of hardware, payments and dashboards.',
        vi: 'Vận hành, bảo trì hệ thống máy bán hàng tự động và triển khai thanh toán QR — lần đầu làm quen với thiết bị, thanh toán và dashboard.',
      },
      stack: [{ en: 'QR payments', vi: 'Thanh toán QR' }, 'IoT', { en: 'Field ops', vi: 'Vận hành hiện trường' }],
      building: 'vending',
      scene: 'ops',
    },
    {
      period: '2017 — 2019',
      role: { en: 'Banking Finance Officer · Online Lending', vi: 'Nhân viên tài chính ngân hàng · Cho vay online' },
      company: { en: 'Banking & Finance', vi: 'Tài chính ngân hàng' },
      summary: {
        en: 'Guided customers through online loans on their phones — download, eKYC, approval — and learned how much a good flow matters.',
        vi: 'Hướng dẫn khách hàng vay online ngay trên điện thoại — tải app, eKYC, giải ngân — và hiểu một luồng trải nghiệm tốt quan trọng thế nào.',
      },
      stack: [{ en: 'Online lending', vi: 'Cho vay online' }, 'eKYC', { en: 'Customer guidance', vi: 'Tư vấn khách hàng' }],
      building: 'finance',
      scene: 'loan',
    },
    {
      period: '2019 — 2020',
      role: { en: 'Luxury Sales & Online', vi: 'Bán hàng Luxury & kênh online' },
      company: { en: 'Luxury Phone Store', vi: 'Cửa hàng điện thoại Luxury' },
      summary: {
        en: 'Presented premium devices to VIP customers and took the store online — website, social and a customer database.',
        vi: 'Tư vấn thiết bị cao cấp cho khách VIP và đưa cửa hàng lên online — website, mạng xã hội và dữ liệu khách hàng.',
      },
      stack: [{ en: 'Luxury retail', vi: 'Bán lẻ cao cấp' }, 'CRM', { en: 'Website & social', vi: 'Website & MXH' }],
      building: 'luxury',
      scene: 'luxury',
    },
    {
      period: { en: '2020 — Now', vi: '2020 — Nay' },
      role: 'Website Developer',
      company: 'E-commerce POD',
      summary: {
        en: 'Building and scaling print-on-demand stores — storefronts, product mockups and order automation.',
        vi: 'Xây dựng và mở rộng các store print-on-demand — storefront, mockup sản phẩm và tự động hoá đơn hàng.',
      },
      stack: ['Shopify', 'WooCommerce', { en: 'Automation', vi: 'Tự động hoá' }],
      building: 'pod',
      scene: 'pod',
    },
  ],

  // Sở thích — mỗi mục là một điểm dừng: Zabu tự động "diễn" (đánh đàn, chơi game, đi biển, xem phim 3D).
  // art: guitar | dota | travel | movies
  hobbies: [
    {
      art: 'guitar',
      title: { en: 'Guitar', vi: 'Đánh guitar' },
      text: {
        en: 'Evening ballads on an acoustic — lately the intro of “Mùa Đông” by Erik. Music keeps my sense of rhythm, in code too.',
        vi: 'Những bản ballad buổi tối trên cây acoustic — dạo này là intro “Mùa Đông” của Erik. Âm nhạc giữ cho tôi cảm giác nhịp điệu, cả khi viết code.',
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
        en: 'Main Pudge, hunting for the perfect Meat Hook. Dota taught me strategy, patience and how to communicate under pressure.',
        vi: 'Main Pudge, sống chết vì một cú hook hoàn hảo. Dota dạy tôi chiến thuật, sự kiên nhẫn và cách phối hợp đồng đội khi áp lực.',
      },
      tags: ['Dota 2', 'Pudge', 'Meat Hook', { en: 'Strategy', vi: 'Chiến thuật' }],
    },
    {
      art: 'travel',
      title: { en: 'Travel', vi: 'Du lịch' },
      text: {
        en: 'Beaches, sunsets and street food. Every trip brings back ideas for colour, type and layout.',
        vi: 'Biển, hoàng hôn và đồ ăn đường phố. Chuyến đi nào cũng mang về ý tưởng về màu sắc, chữ và bố cục.',
      },
      tags: [{ en: 'Beach', vi: 'Biển' }, 'Street food', { en: 'Photography', vi: 'Chụp ảnh' }],
    },
    {
      art: 'movies',
      title: { en: 'Movies', vi: 'Xem phim' },
      text: {
        en: 'Popcorn, 3D glasses and big sci-fi worlds. Films are my favourite lesson in storytelling.',
        vi: 'Bỏng ngô, kính 3D và những thế giới khoa học viễn tưởng. Điện ảnh là bài học kể chuyện yêu thích của tôi.',
      },
      tags: ['Sci-fi', '3D', { en: 'Popcorn', vi: 'Bỏng ngô' }],
    },
  ],

  // video: đường dẫn .mp4/.webm (tùy chọn) — sẽ tự play khi hover.
  // Không có video thì hiển thị bản mock giao diện tự cuộn.
  projects: [
    {
      title: 'Lumen Coffee',
      year: '2025',
      category: { en: 'E-commerce', vi: 'Thương mại điện tử' },
      url: 'lumencoffee.vn',
      colors: ['#f6efe6', '#3b2a20', '#d9864e'],
      layout: 'a',
      video: '',
      link: '#',
      repo: '',
      role: { en: 'Design & Development', vi: 'Thiết kế & Lập trình' },
      stack: ['Next.js', 'Shopify', 'GSAP'],
      problem: {
        en: 'A specialty roaster selling only through Instagram DMs, with no way to scale orders.',
        vi: 'Một xưởng rang cà phê đặc sản chỉ bán qua tin nhắn Instagram, không thể mở rộng đơn hàng.',
      },
      solution: {
        en: 'A headless Shopify storefront with subscription bundles and a scroll-told origin story for each bean.',
        vi: 'Storefront Shopify headless với gói đăng ký định kỳ và câu chuyện nguồn gốc từng loại hạt kể bằng cuộn trang.',
      },
      result: {
        en: '3.2× online revenue in the first quarter, 1.1s LCP on mobile.',
        vi: 'Doanh thu online tăng 3,2 lần trong quý đầu, LCP 1,1s trên mobile.',
      },
    },
    {
      title: 'Atlas Finance',
      year: '2024',
      category: { en: 'SaaS Dashboard', vi: 'Dashboard SaaS' },
      url: 'app.atlasfinance.io',
      colors: ['#0f172a', '#e2e8f0', '#5b6cff'],
      layout: 'b',
      video: '',
      link: '#',
      repo: '',
      role: { en: 'Frontend Lead', vi: 'Trưởng nhóm Frontend' },
      stack: ['React', 'TypeScript', 'D3'],
      problem: {
        en: 'Finance teams were exporting data to spreadsheets because the dashboard was too slow.',
        vi: 'Đội tài chính phải xuất dữ liệu ra bảng tính vì dashboard quá chậm.',
      },
      solution: {
        en: 'Rebuilt the reporting UI with virtualised tables, streaming queries and a keyboard-first workflow.',
        vi: 'Xây lại giao diện báo cáo với bảng ảo hoá, truy vấn streaming và thao tác ưu tiên bàn phím.',
      },
      result: {
        en: 'Report load time from 9s to 800ms; weekly active usage up 61%.',
        vi: 'Thời gian tải báo cáo từ 9s xuống 800ms; người dùng hoạt động hằng tuần tăng 61%.',
      },
    },
    {
      title: 'Hanoi Arch Studio',
      year: '2024',
      category: { en: 'Portfolio Site', vi: 'Website Portfolio' },
      url: 'hanoiarch.studio',
      colors: ['#efeee9', '#1c1c1c', '#b08d57'],
      layout: 'c',
      video: '',
      link: '#',
      repo: '',
      role: { en: 'Development', vi: 'Lập trình' },
      stack: ['Astro', 'GSAP', 'Sanity'],
      problem: {
        en: 'An architecture firm whose work looked flat and dated online.',
        vi: 'Một văn phòng kiến trúc có các công trình trông nhạt nhoà và cũ kỹ trên website.',
      },
      solution: {
        en: 'An editorial, image-led site with smooth page transitions and a CMS the team edits themselves.',
        vi: 'Website phong cách tạp chí, lấy hình ảnh làm trọng tâm, chuyển trang mượt và CMS để đội tự cập nhật.',
      },
      result: {
        en: 'Featured on two design galleries; inbound leads doubled.',
        vi: 'Được giới thiệu trên hai trang tuyển chọn thiết kế; lượng khách hàng tiềm năng tăng gấp đôi.',
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
        en: 'Gym members had to call the front desk to book classes.',
        vi: 'Hội viên phải gọi điện cho lễ tân để đặt lớp tập.',
      },
      solution: {
        en: 'An installable PWA for bookings, waitlists and push reminders, synced with the gym’s CRM.',
        vi: 'Ứng dụng PWA cài được để đặt lớp, xếp hàng chờ và nhắc lịch, đồng bộ với CRM của phòng tập.',
      },
      result: {
        en: '12k bookings per month, front-desk calls down 70%.',
        vi: '12.000 lượt đặt mỗi tháng, cuộc gọi tới lễ tân giảm 70%.',
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
      role: { en: 'Design & Development', vi: 'Thiết kế & Lập trình' },
      stack: ['HTML', 'Tailwind', 'Lottie'],
      problem: {
        en: 'A food-tour startup launching in three weeks with no site.',
        vi: 'Một startup tour ẩm thực sắp ra mắt trong ba tuần mà chưa có website.',
      },
      solution: {
        en: 'A playful, fast landing page with Lottie illustrations and a booking flow.',
        vi: 'Landing page vui tươi, tải nhanh với minh hoạ Lottie và luồng đặt tour.',
      },
      result: {
        en: 'Sold out the first 40 tours before launch day.',
        vi: 'Bán hết 40 tour đầu tiên trước ngày ra mắt.',
      },
    },
    {
      title: 'Orbit UI Kit',
      year: '2022',
      category: { en: 'Open Source', vi: 'Mã nguồn mở' },
      url: 'orbit-ui.dev',
      colors: ['#f4f4ff', '#1e1b4b', '#8b5cf6'],
      layout: 'c',
      video: '',
      link: '#',
      repo: 'https://github.com/',
      role: { en: 'Author', vi: 'Tác giả' },
      stack: ['Web Components', 'CSS', 'Storybook'],
      problem: {
        en: 'Teams rebuilding the same accessible components in every project.',
        vi: 'Các nhóm phải viết lại cùng một bộ component chuẩn accessibility cho mỗi dự án.',
      },
      solution: {
        en: 'A framework-agnostic component kit with design tokens and full keyboard support.',
        vi: 'Bộ component độc lập framework, có design token và hỗ trợ bàn phím đầy đủ.',
      },
      result: {
        en: '1.4k GitHub stars, used in 30+ production sites.',
        vi: '1.400 sao GitHub, dùng trong hơn 30 website thực tế.',
      },
    },
  ],
};
