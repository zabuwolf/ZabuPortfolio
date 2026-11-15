/*
 * Nội dung CV ứng tuyển Genesis Escape (CTV Game Master / NPC nhập vai).
 * ★ Sửa file này để đổi câu chữ. Trang này chỉ có tiếng Việt.
 *
 * Mốc thời gian và công việc lấy từ js/data.js của trang chính; phần mô tả được viết lại
 * bám theo JD của Genesis (mô tả công việc, yêu cầu, 5 giá trị văn hoá).
 * Hãy đọc lại và sửa những chỗ chưa đúng với thực tế của bạn trước khi gửi.
 */
window.PORTFOLIO = {
  name: 'Zabu',
  role: 'Ứng viên “ma mới” · Genesis Escape',

  // Thông tin cá nhân hiển thị ở khối cuối. Dòng nào để trống ('') sẽ tự ẩn.
  facts: [
    { label: 'Họ và tên', value: 'Từ Hoàng Minh' },
    { label: 'Năm sinh', value: '1994' },
    { label: 'Khu vực', value: '' }, // vd. 'Đống Đa, Hà Nội'
    { label: 'Vị trí ứng tuyển', value: 'CTV Game Master / NPC nhập vai' },
    { label: 'Hình thức', value: 'Sẵn sàng học việc không lương' },
    { label: 'Ca làm', value: 'Linh hoạt theo sắp xếp của team' }, // vd. 'Ca 3 (17:00–22:00) và ca 4, cả cuối tuần'
  ],

  // Kênh liên hệ: mỗi dòng là một nút bấm được. text là phần chữ hiển thị, url là nơi mở ra.
  // Muốn thêm email: { label: 'Email', icon: 'mail', text: 'ban@example.com', url: 'mailto:ban@example.com' }
  contacts: [
    { label: 'Facebook', icon: 'facebook', text: 'fb.com/zabuwolf', url: 'https://fb.com/zabuwolf' },
    { label: 'Zalo', icon: 'zalo', text: '0837 946 886', url: 'https://zalo.me/0837946886' },
    { label: 'Website', icon: 'globe', text: 'zabudev.com', url: 'https://zabudev.com' },
  ],

  // Mỗi mục là một "trạm". building / scene dùng lại toà nhà và cảnh diễn của trang chính.
  experience: [
    {
      period: '2015 — 2017',
      role: 'Nhân viên ngân hàng · mảng POS',
      company: 'Ngân hàng thương mại',
      summary:
        'Đi từng điểm bán để lắp đặt và hướng dẫn dùng máy POS. Tôi học cách giải thích một thứ lạ lẫm sao cho người mới hiểu ngay, và học sự cẩn thận của người làm ngân hàng với tiền bạc, con số.',
      stack: ['Hướng dẫn người mới', 'Cẩn thận với tiền', 'Đúng quy trình'],
      building: 'bank',
      scene: 'bank',
    },
    {
      period: '2017 — 2018',
      role: 'Nhân viên vận hành & kỹ thuật',
      company: 'Máy bán hàng tự động & QR',
      summary:
        'Kiểm tra, bảo trì hệ thống máy mỗi ngày. Lỗi nhỏ thì khắc phục tại chỗ, lỗi vượt tầm thì báo kỹ thuật ngay để máy không nằm chờ. Đó cũng là cách JD của Genesis yêu cầu với đồ đạc trong phòng chơi.',
      stack: ['Kiểm tra thiết bị', 'Khắc phục tại chỗ', 'Báo kỹ thuật kịp thời'],
      building: 'vending',
      scene: 'ops',
    },
    {
      period: '2021 — 2023',
      role: 'Nhân viên tài chính · Cho vay online',
      company: 'Tài chính ngân hàng',
      summary:
        'Đồng hành cùng khách qua từng bước trên điện thoại, kể cả lúc họ rối và sốt ruột. Giữ giọng điềm tĩnh, xử lý trong tầm của mình, gợi ý vừa đủ để khách tự làm tiếp: đúng việc của một Game Master khi đội chơi đang bí.',
      stack: ['Xử lý tình huống', 'Giữ bình tĩnh', 'Lắng nghe'],
      building: 'finance',
      scene: 'loan',
    },
    {
      period: '2023 — 2026',
      role: 'Bán hàng Luxury & kênh online',
      company: 'Cửa hàng điện thoại Luxury',
      summary:
        'Mỗi vị khách VIP cần một “vai” khác nhau. Tôi quen đón khách, đọc cảm xúc, tư vấn thêm đúng thứ họ cần và giữ tác phong chỉn chu suốt ca làm trong một không gian luôn phải gọn, sạch.',
      stack: ['Chăm sóc khách', 'Upsell', 'Tác phong'],
      building: 'luxury',
      scene: 'luxury',
    },
    {
      period: '2026 — Nay',
      role: 'Website Developer',
      company: 'E-commerce POD',
      summary:
        'Công việc hiện tại, chủ động được thời gian nên tôi xếp được ca linh hoạt. Nghề này rèn tư duy logic, thói quen đặt câu hỏi “vì sao lỗi” và tự học thứ mình chưa biết.',
      stack: ['Tư duy logic', 'Chủ động', 'Tự học nhanh'],
      building: 'pod',
      scene: 'pod',
    },
  ],

  // "Phòng kỹ năng" — thay cho mục dự án của trang chính.
  // match: dòng tương ứng trong JD của Genesis. art: hình minh hoạ trong cv-scenes.js.
  skills: [
    {
      art: 'mask',
      title: 'Nhập vai & giữ vai',
      match: 'JD · “Nhân vật phụ là người thật xuyên suốt trò chơi”',
      text: 'Ba năm bán hàng luxury dạy tôi giữ đúng “vai” suốt ca: giọng nói, ánh mắt, khoảng lặng. Tôi chưa diễn chuyên nghiệp, nhưng không ngại hoá trang, la hét, bò trườn và rất chịu học.',
    },
    {
      art: 'lantern',
      title: 'Giới thiệu cách chơi & chăm sóc khách',
      match: 'JD · “Giới thiệu cách chơi, hướng dẫn và chăm sóc khách hàng”',
      text: 'Phổ biến luật rõ ràng, gợi ý đúng lúc, trấn an khi khách hoảng. Việc này tôi đã làm hằng ngày ở ngân hàng, tài chính và cửa hàng.',
    },
    {
      art: 'pulse',
      title: 'Xử lý tình huống trong tầm của mình',
      match: 'JD · “Giải quyết tình huống với khách khi có vấn đề phát sinh”',
      text: 'Máy treo giữa giờ cao điểm, khách nóng ruột, hồ sơ lỗi: tôi quen giữ bình tĩnh, xử lý phần của mình và báo lên đúng người khi vượt tầm.',
    },
    {
      art: 'console',
      title: 'Reset phòng, kiểm tra & báo kỹ thuật',
      match: 'JD · “Sắp xếp phòng chơi như cũ, kiểm tra đồ đạc, khắc phục lỗi ngay”',
      text: 'Từng bảo trì hệ thống máy bán hàng theo checklist. Đạo cụ về đúng chỗ, phòng sạch trước lượt kế tiếp; lỗi nào sửa được thì sửa, không thì báo kỹ thuật ngay.',
    },
    {
      art: 'ledger',
      title: 'Cẩn thận với quỹ & báo cáo',
      match: 'JD · “Bảo quản quỹ tiền mặt, chịu trách nhiệm thu chi, báo cáo”',
      text: 'Xuất thân ngân hàng và tài chính nên tôi quen làm việc với tiền bạc, con số, chứng từ: thu chi rõ ràng, cuối ca khớp sổ, báo cáo đúng hạn.',
    },
    {
      art: 'team',
      title: 'Hoà đồng, linh hoạt ca',
      match: 'JD · “Hoà đồng với đồng nghiệp” · 4 ca linh hoạt',
      text: 'Đúng giờ, bàn giao ca rõ ràng, phối hợp theo tín hiệu với GM và Trainer. Sẵn sàng góp mặt ở sự kiện ngoài trời khi được phân công.',
    },
    {
      art: 'web',
      title: 'Tư duy logic, và một món quà',
      match: 'JD · “Tư duy logic và phản biện tốt” · giá trị Sáng tạo',
      text: 'Làm web là nghề gỡ lỗi mỗi ngày. Tôi dựng thử một bản thiết kế lại website Genesis, có phòng chơi, lịch trống, đặt phòng, ví, làm quà ra mắt team.',
      link: { label: 'Mở bản demo', url: '/genesis-cv/web' },
    },
  ],

  // "Ngoài giờ làm" — mỗi sở thích gắn với một giá trị văn hoá của Genesis (value).
  // art / cảnh diễn dùng lại của trang chính.
  hobbies: [
    {
      art: 'movies',
      value: 'Đam mê',
      title: 'Xem phim',
      text: 'Điện ảnh là bài học kể chuyện yêu thích của tôi: nhịp dựng, âm thanh, ánh sáng. Genesis hứa một “trải nghiệm hơn cả điện ảnh”, và tôi muốn đứng ở phía tạo ra nó.',
      tags: ['Kể chuyện', 'Âm thanh', 'Ánh sáng'],
    },
    {
      art: 'guitar',
      value: 'Bền bỉ',
      title: 'Đánh guitar',
      text: 'Một đoạn intro phải tập đi tập lại cả tuần mới tròn tiếng. Cây đàn dạy tôi đi đường dài, và cảm giác về nhịp: lúc nào cần lặng, lúc nào cần bùng lên.',
      tags: ['Acoustic', 'Ballad', 'Cảm nhịp'],
      // Intro guitar tự chơi khi Zabu tới cảnh này (xem js/fx.js của trang chính)
      song: {
        bpm: 78,
        tab: [
          [[0, 'A:5', 'B:2'], [2, 'D:4'], [3, 'G:2'], [5, 'B:2'], [7, 'D:4'], [8, 'e:2'], [12, 'B:2']],
          [[0, 'A:0', 'B:0'], [2, 'D:2'], [3, 'G:1'], [5, 'B:0'], [7, 'D:2'], [8, 'e:0']],
        ],
      },
    },
    {
      art: 'dota',
      value: 'Quyết liệt',
      title: 'Esports · Dota 2',
      text: 'Main Pudge: nấp trong bụi, chờ đúng khoảnh khắc rồi kéo đối thủ về phía mình. Đã vào trận là chơi tới cùng, phối hợp đồng đội kể cả khi đang bị dẫn.',
      tags: ['Pudge', 'Chọn thời điểm', 'Phối hợp'],
    },
    {
      art: 'travel',
      value: 'Linh hoạt',
      title: 'Du lịch',
      text: 'Biển, hoàng hôn và đồ ăn đường phố. Đi nhiều giúp tôi thích nghi nhanh với nơi mới, người mới, và lịch trình đổi vào phút chót.',
      tags: ['Biển', 'Street food', 'Chụp ảnh'],
    },
  ],

  // Trạm cuối trước khi vào Genesis: Zabu "thử vai".
  finale: {
    art: 'genesis',
    scene: 'npc',
    value: 'Sáng tạo',
    title: 'Vai tiếp theo: “ma mới” @ Genesis',
    text: 'Dám nghĩ, dám thử, dám sai và dám làm lại. Tôi chưa có kinh nghiệm diễn, nên xin bắt đầu từ con số 0: học việc không lương, được đào tạo từ đầu, làm ca linh hoạt theo sắp xếp của team.',
    tags: ['Học việc không lương', 'Ca linh hoạt', 'Sẵn sàng hoá trang'],
  },
};
