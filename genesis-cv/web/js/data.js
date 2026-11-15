/*
 * Dữ liệu cho bản concept thiết kế lại website Genesis Escape.
 *
 * ★ ĐÂY KHÔNG PHẢI WEBSITE CHÍNH THỨC. Tên phòng, địa chỉ, hotline, luật chơi lấy từ thông tin công khai
 *   trên genesis-escape.vn và tin tuyển dụng. Những thứ còn lại (mô tả phòng, độ khó, thời lượng, giá,
 *   phòng nào thuộc cơ sở nào, voucher, lịch trống, review mẫu) chỉ là MINH HOẠ để dựng giao diện.
 */
window.GEN = (() => {
  const facilities = [
    { id: 'hc', city: 'hn', name: 'Hoàng Cầu', address: 'Tầng 5, số 189 Hoàng Cầu, P. Đống Đa, Hà Nội', phone: '0325559019' },
    { id: 'cl', city: 'hn', name: 'Chùa Láng', address: 'Tầng 3, số 158 Chùa Láng, P. Láng, Hà Nội', phone: '0347576158' },
    { id: 'pdl', city: 'hcm', name: 'Phan Đăng Lưu', address: '79/5B Phan Đăng Lưu, P. Cầu Kiệu, TP. Hồ Chí Minh', phone: '0886989795' },
  ];
  const cities = { hn: 'Hà Nội', hcm: 'TP. Hồ Chí Minh' };
  const email = 'genesis.escape@gmail.com';

  // art: hình minh hoạ trên poster (vẽ bằng SVG trong app.js). c: [màu nền đậm, màu nhấn, màu sáng]
  const rooms = [
    {
      id: 'gone', name: 'Gone', vn: 'Mất Tích', facility: 'hc', art: 'gone', c: ['#0d1b2a', '#3d7ea6', '#bfe3ff'],
      tags: ['Trinh thám', 'Phá án', 'Family'], difficulty: 4.0, horror: 4.0, duration: 60,
      teaser: 'Một người biến mất. Căn phòng vẫn còn nguyên hơi ấm.',
      story: 'Tách trà chưa nguội, đèn bàn vẫn sáng, nhưng chủ nhân căn phòng thì không còn ở đó. Lần theo những thứ bị bỏ lại để biết chuyện gì đã xảy ra trong 60 phút cuối cùng.',
    },
    {
      id: 'morgue', name: 'The Morgue', vn: 'Giao Ước Máu', facility: 'hc', art: 'morgue', c: ['#0b1512', '#2f6b57', '#b8ffe0'],
      tags: ['Kinh dị', 'Tâm linh', 'Khám nghiệm hiện trường'], difficulty: 4.5, horror: 5.0, duration: 90,
      teaser: 'Ngăn số 7 không có tên trong sổ trực.',
      story: 'Ca trực đêm ở nhà xác bệnh viện. Mọi thi thể đều có hồ sơ, trừ một ngăn tủ lạnh. Có người đã ký một giao ước, và đêm nay đến hạn trả.',
    },
    {
      id: 'hide', name: "Hide 'N Seek", vn: 'Trốn Tìm', facility: 'hc', art: 'hide', c: ['#1a1023', '#7a4bb0', '#e6cfff'],
      tags: ['Kinh dị', 'Adventure', 'Family'], difficulty: 4.0, horror: 4.0, duration: 60,
      teaser: 'Năm, mười, mười lăm… Ai chưa trốn kỹ thì ra.',
      story: 'Trò chơi tuổi thơ trong một căn nhà bỏ hoang. Luật vẫn như cũ: đừng để bị tìm thấy. Chỉ khác là lần này, người đi tìm không còn là bạn của bạn nữa.',
    },
    {
      id: 'illusion', name: 'The Illusion', vn: 'Ảo Mộng', facility: 'cl', art: 'illusion', c: ['#101028', '#4b56c9', '#cfd4ff'],
      tags: ['Huyền bí', 'Nghệ Thuật', 'Trinh thám'], difficulty: 4.5, horror: 4.0, duration: 90,
      teaser: 'Thứ bạn thấy chưa chắc là thứ đang ở đó.',
      story: 'Buổi triển lãm cuối cùng của một hoạ sĩ ảo thuật. Mỗi bức tranh là một lời nói dối được dàn dựng công phu, và lối ra nằm sau lời nói dối duy nhất có thật.',
    },
    {
      id: 'ngai', name: 'Incantation', vn: 'Ngải', facility: 'cl', art: 'ngai', c: ['#1a0c0c', '#b0372b', '#ffc9b8'],
      tags: ['Kinh dị', 'Bùa ngải', 'Tâm linh'], difficulty: 4.5, horror: 5.0, duration: 90,
      teaser: 'Đừng đọc thành tiếng những gì viết trên lá bùa.',
      story: 'Ngôi nhà cuối bản có một bàn thờ không ai dám gọi tên. Người thầy đã chết, nhưng bùa vẫn còn hiệu lực. Muốn giải, phải làm lại nghi lễ từ đầu.',
    },
    {
      id: 'bride', name: 'The Ghost Bride', vn: 'Chiếc Hài Đỏ', facility: 'cl', art: 'bride', c: ['#1c0a10', '#c2183a', '#ffd0d8'],
      tags: ['Kinh dị', 'Tâm linh', 'Multiple Flows'], difficulty: 5.0, horror: 4.5, duration: 120,
      flows: ['Flow Nhà trai', 'Flow Nhà gái'],
      teaser: 'Đám cưới đã định ngày. Chỉ thiếu chú rể còn sống.',
      story: 'Một chiếc hài đỏ nằm giữa đường. Ai nhặt lên thì thành người nhà. Hai nhánh truyện, hai góc nhìn, và một hôn lễ mà không ai muốn được mời.',
    },
    {
      id: 'death', name: 'The Death', vn: 'Rồng Rắn Lên Mây', facility: 'hc', art: 'death', c: ['#0f1410', '#6a8f2a', '#e3ffb0'],
      tags: ['Kinh dị', 'Hành động', 'Sudden Death'], difficulty: 5.0, horror: 4.5, duration: 90,
      teaser: 'Thầy thuốc có nhà hay không? Trả lời sai, mất một người.',
      story: 'Trò đồng dao biến thành bài kiểm tra sinh tử. Mỗi câu trả lời sai, hàng người ngắn đi một đoạn. Phòng có thử thách “Sudden Death”: sai là dừng cuộc chơi.',
    },
    {
      id: 'xfiles', name: 'X-Files', vn: 'Apartment 31', facility: 'cl', art: 'xfiles', c: ['#0c1418', '#c9a227', '#fff1b8'],
      tags: ['Trinh thám', 'Phá án', 'Khám nghiệm hiện trường'], difficulty: 5.0, horror: 4.0, duration: 120,
      teaser: 'Hồ sơ đã đóng 9 năm. Căn hộ 31 thì chưa.',
      story: 'Bạn là tổ điều tra được giao lại một vụ án treo. Hiện trường được giữ nguyên: dấu vân tay, vết kéo lê, lời khai mâu thuẫn. Tìm ra hung thủ trước khi hắn quay lại.',
    },
    {
      id: 'dance', name: 'The Last Dance', vn: 'Oán Vũ', facility: 'hc', art: 'dance', c: ['#170d18', '#d14b8f', '#ffd3ea'], isNew: true,
      tags: ['Mới ra', 'Kinh dị', 'Nghệ Thuật'], difficulty: 4.5, horror: 5.0, duration: 90,
      teaser: 'Nhạc đã tắt từ lâu, nhưng có người vẫn đang múa.',
      story: 'Nhà hát cũ đóng cửa sau đêm diễn dang dở. Người vũ công chính chưa bao giờ cúi chào khán giả. Đêm nay, tấm màn nhung lại kéo lên cho điệu múa cuối.',
    },
    // TP. Hồ Chí Minh
    { id: 'hcm-morgue', base: 'morgue', facility: 'pdl' },
    { id: 'hcm-ngai', base: 'ngai', facility: 'pdl' },
    { id: 'hcm-xfiles', base: 'xfiles', facility: 'pdl' },
    { id: 'hcm-dance', base: 'dance', facility: 'pdl' },
  ].reduce((list, r) => {
    list.push(r.base ? { ...list.find((x) => x.id === r.base), ...r } : r);
    return list;
  }, []);

  // 13 suất mỗi ngày, mỗi suất 1 tiếng (theo hướng dẫn trên website gốc). Giờ cụ thể là minh hoạ.
  const slots = Array.from({ length: 13 }, (_, i) => `${String(9 + i).padStart(2, '0')}:00`);
  const dayPart = (i) => (i < 3 ? 'Sáng' : i < 8 ? 'Chiều' : 'Tối');

  const rules = { minPlayers: 4, maxPlayers: 8, deposit: 150000, qrSeconds: 120 };

  // Giá minh hoạ (đ / người)
  const pricing = {
    tiers: [
      { label: '4 người', test: (n) => n <= 4, weekday: 189000, weekend: 209000 },
      { label: '5 – 6 người', test: (n) => n <= 6, weekday: 169000, weekend: 189000 },
      { label: '7 – 8 người', test: (n) => n > 6, weekday: 149000, weekend: 169000 },
    ],
    durationFee: { 60: 0, 90: 40000, 120: 80000 },
    nightFee: 10000, // suất từ 17:00
  };
  const extras = [
    { id: 'highlight', name: 'Highlight', price: 200000, per: 'đội', desc: 'Thêm phân cảnh đặc biệt cùng NPC ở cao trào của phòng.' },
    { id: 'hardcore', name: 'Extra Hardcore', price: 30000, per: 'người', desc: 'NPC tương tác dày hơn, ít gợi ý hơn. Chỉ dành cho đội đã quen chơi.' },
  ];
  const scareLevels = [
    { id: 'normal', name: 'Tiêu chuẩn', desc: 'Đúng như thiết kế của phòng.' },
    { id: 'soft', name: 'Giảm doạ', desc: 'NPC giữ khoảng cách, bớt hù bất ngờ. Hợp đội có người mới.' },
  ];
  const vouchers = [
    { code: 'MAMOI', label: 'Giảm 10% cho đội chơi lần đầu', type: 'percent', value: 10 },
    { code: 'DITAM', label: 'Giảm 20.000đ / người cho đội từ 8 người', type: 'perHead', value: 20000, minPlayers: 8 },
    { code: 'SANGSOM', label: 'Giảm 15% cho suất trước 12:00, thứ 2 – thứ 6', type: 'percent', value: 15, morning: true, weekdayOnly: true },
  ];
  const topups = [
    { amount: 500000, bonus: 0 },
    { amount: 1000000, bonus: 50000 },
    { amount: 2000000, bonus: 150000 },
  ];

  const stats = [
    { value: 15198, label: 'Người chơi' },
    { value: 7265, label: 'Lượt thắng' },
    { value: 10252, label: 'Lượt quay lại' },
  ];

  const steps = [
    { title: 'Lập đội 4 – 8 người', text: 'Tối thiểu 4, tối đa 8 người để trải nghiệm trọn vẹn nhất. Chưa đủ người? Vào nhóm Review – Ghép Nhóm của Genesis trên Facebook để tìm đồng đội.' },
    { title: 'Đặt phòng trước khi đến', text: 'Mỗi ngày một phòng có 13 suất, mỗi suất 1 tiếng. Đặt trên website hoặc qua Fanpage, và thanh toán tiền cọc đúng hạn để được xác nhận giữ chỗ.' },
    { title: 'Đối đầu hàng trăm thử thách', text: 'Phòng chơi mang hơi hướng tâm linh, kinh dị với nhân vật phụ là người thật tương tác ngẫu nhiên. Câu đố thử IQ, thể lực và khả năng xử lý tình huống của cả đội.' },
    { title: 'Thời gian không đứng về phía bạn', text: 'Có những thử thách giới hạn thời gian và số lần nhập đáp án. Vượt giới hạn là thua. Hãy tỉnh táo trước mỗi hành động.' },
    { title: 'Thắng và ghi tên lên Hall of Fame', text: 'Chỉ khoảng 10% số đội chiến thắng. Đội thắng nhận bằng chứng nhận, merchandise và được dán ảnh lên bức tường Hall of Fame.' },
  ];

  const genres = ['Phiêu lưu', 'Trinh thám', 'Tâm linh', 'Sinh tồn', 'Hành động', 'Khoa học viễn tưởng'];

  const segments = [
    { title: 'Nhóm bạn 12 – 30 tuổi', text: 'Muốn thử một thứ giải trí mới, hét cùng nhau và có chuyện để kể cả tháng.', cta: 'Chọn phòng', target: 'rooms' },
    { title: 'Gia đình & đồng nghiệp', text: 'Gắn kết bằng một nhiệm vụ chung. Có phòng nhẹ đô và lựa chọn “Giảm doạ” cho người mới.', cta: 'Xem phòng Family', target: 'rooms', tag: 'Family' },
    { title: 'Doanh nghiệp & câu lạc bộ', text: 'Team-building, đào tạo kỹ năng phối hợp. Bao phòng theo khung giờ, có sự kiện ngoài trời.', cta: 'Gửi yêu cầu', target: 'group' },
  ];

  // Review mẫu để dựng giao diện (không phải trích dẫn khách thật)
  const reviews = [
    { name: 'Đội “Toán tin K68”', room: 'gone', stars: 5, text: 'NPC diễn nổi da gà, câu đố logic thật sự. Bọn mình thua lần đầu, hôm sau quay lại và thắng.', sample: true },
    { name: 'Trang · đi 4 người', room: 'hide', stars: 5, text: 'Chọn phòng dễ nhất mà hét khản cổ. Đèn chớp, nhạc nổi lên là cả đội ôm nhau. Sợ nhưng muốn đi tiếp.', sample: true },
    { name: 'Nhóm văn phòng tầng 12', room: 'xfiles', stars: 4, text: 'Phá án đúng nghĩa: phải ghép lời khai, soi hiện trường. Hợp team-building hơn mọi trò bọn mình từng thử.', sample: true },
    { name: 'Chị P. · phụ huynh', room: 'gone', stars: 5, text: 'Cho tụi nhỏ trong lớp đi cùng, chọn Giảm doạ. Nhân viên hướng dẫn kỹ, tụi nhỏ ra về vẫn còn bàn tán.', sample: true },
    { name: 'Bình · chơi lần 3', room: 'ngai', stars: 5, text: 'Không gian đầu tư, mùi hương, ánh sáng đều có chủ ý. Ngải là phòng làm mình im lặng lâu nhất sau khi ra.', sample: true },
  ];

  // Thông tin tuyển dụng (theo JD Genesis chia sẻ)
  const hiring = {
    duties: ['Nhập vai và tương tác với người chơi trong từng căn phòng', 'Vận hành âm thanh, ánh sáng, hiệu ứng', 'Giới thiệu cách chơi, hướng dẫn và chăm sóc khách', 'Sắp xếp, kiểm tra phòng chơi sau mỗi lượt'],
    shifts: [
      { name: 'Ca 1', time: '08:00 – 12:30' },
      { name: 'Ca 2', time: '12:30 – 17:00' },
      { name: 'Ca 3', time: '17:00 – 22:00' },
      { name: 'Ca 4', time: '22:00 – 01:30', note: '×150%' },
    ],
    perks: ['Được đào tạo từ đầu', 'Ca làm linh hoạt', 'Thưởng theo KPI', 'Chơi phòng miễn phí', 'Team building · Movie day · Tea break', 'Cơ hội lên vị trí quản lý'],
    values: ['Sáng tạo', 'Linh hoạt', 'Quyết liệt', 'Đam mê', 'Bền bỉ'],
  };

  const facility = (id) => facilities.find((f) => f.id === id);
  const room = (id) => rooms.find((r) => r.id === id);

  return { facilities, cities, email, rooms, slots, dayPart, rules, pricing, extras, scareLevels, vouchers, topups, stats, steps, genres, segments, reviews, hiring, facility, room };
})();
