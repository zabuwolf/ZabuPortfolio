/*
 * "Máy chủ" giả lập cho bản concept: mọi thứ (tài khoản, ví, vé đặt, review) chỉ nằm trong localStorage
 * của trình duyệt đang mở. Không có dữ liệu nào được gửi đi đâu, không có giao dịch thật.
 */
window.Store = (() => {
  const KEY = 'genesis-concept-v1';
  const G = window.GEN;
  const blank = () => ({ users: [], session: null, bookings: [], reviews: [], requests: [] });

  let db = blank();
  try {
    db = { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    db = blank();
  }
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch {
      /* chế độ riêng tư / hết dung lượng: vẫn chạy được trong phiên này */
    }
  };

  const listeners = new Set();
  const emit = () => listeners.forEach((fn) => fn());
  const onChange = (fn) => listeners.add(fn);
  const commit = () => {
    save();
    emit();
  };

  const uid = (prefix = '') => prefix + Math.random().toString(36).slice(2, 8).toUpperCase();
  const fail = (message) => {
    throw new Error(message);
  };

  /* ---------- Ngày giờ ---------- */
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = () => iso(new Date());
  const addDays = (n, from = new Date()) => {
    const d = new Date(from);
    d.setDate(d.getDate() + n);
    return iso(d);
  };
  const parse = (date) => new Date(`${date}T00:00:00`);
  const isWeekend = (date) => [0, 6].includes(parse(date).getDay());
  const startAt = (date, slot) => {
    const d = parse(date);
    d.setHours(parseInt(G.slots[slot], 10));
    return d;
  };

  /* ---------- Mật khẩu: băm SHA-256 kèm salt (đủ cho bản demo, không thay được máy chủ thật) ---------- */
  async function hash(password, salt) {
    const text = `${salt}:${password}`;
    if (window.crypto?.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 5381; // trình duyệt không có WebCrypto (http thường): băm đơn giản để demo vẫn chạy
    for (const ch of text) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
    return `x${h.toString(16)}`;
  }

  const cleanPhone = (p) => String(p || '').replace(/[\s.\-]/g, '');
  const validPhone = (p) => /^0\d{9}$/.test(p);
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || '');

  /* ---------- Tài khoản ---------- */
  const current = () => db.users.find((u) => u.id === db.session) || null;
  const publicUser = (u) => u && { id: u.id, name: u.name, phone: u.phone, email: u.email, gender: u.gender, dob: u.dob, org: u.org, wallet: u.wallet, tx: u.tx, demo: u.demo };

  async function register({ name, phone, email, password }) {
    phone = cleanPhone(phone);
    if (!name?.trim()) fail('Vui lòng nhập họ tên.');
    if (!validPhone(phone)) fail('Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.');
    if (email && !validEmail(email)) fail('Email chưa đúng định dạng.');
    if ((password || '').length < 6) fail('Mật khẩu cần ít nhất 6 ký tự.');
    if (db.users.some((u) => u.phone === phone)) fail('Số điện thoại này đã có tài khoản. Hãy đăng nhập.');
    const salt = uid();
    const user = { id: uid('U'), name: name.trim(), phone, email: (email || '').trim(), salt, pass: await hash(password, salt), wallet: 0, tx: [], createdAt: Date.now() };
    db.users.push(user);
    db.session = user.id;
    adoptGuestBookings(user);
    commit();
    return publicUser(user);
  }

  async function login(phone, password) {
    phone = cleanPhone(phone);
    const user = db.users.find((u) => u.phone === phone);
    if (!user || user.pass !== (await hash(password || '', user.salt))) fail('Sai số điện thoại hoặc mật khẩu.');
    db.session = user.id;
    adoptGuestBookings(user);
    commit();
    return publicUser(user);
  }

  // "Đăng nhập với Google" trong bản demo: tạo sẵn một tài khoản khách mời
  function loginDemo() {
    let user = db.users.find((u) => u.demo);
    if (!user) {
      user = { id: uid('U'), name: 'Khách Google (demo)', phone: '0900000000', email: 'demo@gmail.com', salt: '', pass: '', wallet: 0, tx: [], demo: true, createdAt: Date.now() };
      db.users.push(user);
    }
    db.session = user.id;
    adoptGuestBookings(user);
    commit();
    return publicUser(user);
  }

  function logout() {
    db.session = null;
    commit();
  }

  function updateProfile(patch) {
    const user = current() || fail('Bạn cần đăng nhập.');
    if (!patch.name?.trim()) fail('Vui lòng nhập họ tên.');
    if (patch.email && !validEmail(patch.email)) fail('Email chưa đúng định dạng.');
    Object.assign(user, { name: patch.name.trim(), email: (patch.email || '').trim(), gender: patch.gender || '', dob: patch.dob || '', org: (patch.org || '').trim() });
    commit();
  }

  async function changePassword(oldPw, newPw) {
    const user = current() || fail('Bạn cần đăng nhập.');
    if (user.demo) fail('Tài khoản Google (demo) không dùng mật khẩu.');
    if (user.pass !== (await hash(oldPw || '', user.salt))) fail('Mật khẩu hiện tại chưa đúng.');
    if ((newPw || '').length < 6) fail('Mật khẩu mới cần ít nhất 6 ký tự.');
    user.salt = uid();
    user.pass = await hash(newPw, user.salt);
    commit();
  }

  const hasAccount = (phone) => db.users.some((u) => u.phone === cleanPhone(phone) && !u.demo);
  async function resetPassword(phone, newPw) {
    const user = db.users.find((u) => u.phone === cleanPhone(phone) && !u.demo) || fail('Không tìm thấy tài khoản với số điện thoại này.');
    if ((newPw || '').length < 6) fail('Mật khẩu mới cần ít nhất 6 ký tự.');
    user.salt = uid();
    user.pass = await hash(newPw, user.salt);
    commit();
  }

  /* ---------- Ví ---------- */
  function addTx(user, type, amount, note) {
    user.wallet += amount;
    user.tx.unshift({ id: uid('T'), type, amount, note, at: Date.now() });
  }
  function topup(amount) {
    const user = current() || fail('Bạn cần đăng nhập để nạp ví.');
    amount = Math.round(Number(amount));
    if (!amount || amount < 100000 || amount % 100000) fail('Số tiền nạp là bội số của 100.000đ.');
    if (amount > 20000000) fail('Bản demo giới hạn 20.000.000đ mỗi lần nạp.');
    addTx(user, 'topup', amount, 'Nạp ví qua QR (giả lập)');
    const pack = [...G.topups].reverse().find((p) => amount >= p.amount && p.bonus);
    if (pack) addTx(user, 'bonus', pack.bonus, `Thưởng nạp gói ${fmt(pack.amount)}`);
    commit();
    return pack?.bonus || 0;
  }

  /* ---------- Lịch trống ---------- */
  const span = (room) => Math.ceil(room.duration / 60);
  // Lịch "đã có người đặt" sinh từ một hàm băm cố định theo phòng/ngày/suất để mỗi lần mở trang đều giống nhau
  function seededBusy(roomId, date, i) {
    let h = 2166136261;
    for (const ch of `${roomId}|${date}|${i}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
    const chance = 26 + (i >= 8 ? 16 : 0) + (isWeekend(date) ? 14 : 0);
    return h % 100 < chance;
  }
  const liveBookings = () => db.bookings.filter((b) => b.status !== 'cancelled');
  function slotState(roomId, date, i) {
    if (startAt(date, i) <= new Date()) return 'past';
    const mine = liveBookings().find((b) => b.roomId === roomId && b.date === date && i >= b.slot && i < b.slot + b.span);
    if (mine) return 'mine';
    return seededBusy(roomId, date, i) ? 'busy' : 'free';
  }
  function canStart(roomId, date, i) {
    const n = span(G.room(roomId));
    if (i + n > G.slots.length) return false;
    for (let k = 0; k < n; k++) if (slotState(roomId, date, i + k) !== 'free') return false;
    return true;
  }
  const freeCount = (roomId, date) => G.slots.filter((_, i) => canStart(roomId, date, i)).length;

  /* ---------- Giá ---------- */
  const fmt = (n) => `${Math.round(n).toLocaleString('vi-VN')}đ`;
  function checkVoucher(code, { date, slot, players }) {
    const v = G.vouchers.find((x) => x.code === String(code || '').trim().toUpperCase());
    if (!v) return { error: 'Mã không tồn tại.' };
    if (v.minPlayers && players < v.minPlayers) return { error: `Mã áp dụng cho đội từ ${v.minPlayers} người.` };
    if (v.morning && slot >= 3) return { error: 'Mã chỉ áp dụng cho suất trước 12:00.' };
    if (v.weekdayOnly && isWeekend(date)) return { error: 'Mã chỉ áp dụng từ thứ 2 đến thứ 6.' };
    if (v.code === 'MAMOI' && myBookings().some((b) => b.status !== 'cancelled')) return { error: 'Mã chỉ dành cho lần đặt đầu tiên.' };
    return { voucher: v };
  }
  function quote({ roomId, date, slot, players, extras = [], voucher }) {
    const room = G.room(roomId);
    const weekend = isWeekend(date);
    const tier = G.pricing.tiers.find((t) => t.test(players));
    const perHead = (weekend ? tier.weekend : tier.weekday) + G.pricing.durationFee[room.duration] + (slot >= 8 ? G.pricing.nightFee : 0);
    const lines = [{ label: `${players} người × ${fmt(perHead)}`, amount: perHead * players }];
    for (const id of extras) {
      const e = G.extras.find((x) => x.id === id);
      if (e) lines.push({ label: e.name, amount: e.per === 'người' ? e.price * players : e.price });
    }
    const subtotal = lines.reduce((s, l) => s + l.amount, 0);
    let discount = 0;
    let applied = null;
    if (voucher) {
      const res = checkVoucher(voucher, { date, slot, players });
      if (res.voucher) {
        applied = res.voucher;
        discount = applied.type === 'percent' ? Math.round((subtotal * applied.value) / 100 / 1000) * 1000 : applied.value * players;
        lines.push({ label: `Mã ${applied.code}`, amount: -discount });
      }
    }
    const total = Math.max(0, subtotal - discount);
    const deposit = Math.min(G.rules.deposit, total);
    return { perHead, lines, subtotal, discount, total, deposit, remain: total - deposit, voucher: applied?.code || null, weekend };
  }

  /* ---------- Vé đặt ---------- */
  const guestKey = () => {
    let k = sessionStorage.getItem('genesis-guest');
    if (!k) {
      k = uid('G');
      try {
        sessionStorage.setItem('genesis-guest', k);
      } catch {
        /* bỏ qua */
      }
    }
    return k;
  };
  function adoptGuestBookings(user) {
    const k = guestKey();
    db.bookings.forEach((b) => {
      if (!b.userId && b.guest === k) b.userId = user.id;
    });
  }
  function myBookings() {
    const user = current();
    const k = guestKey();
    return db.bookings.filter((b) => (user ? b.userId === user.id : !b.userId && b.guest === k)).sort((a, b) => b.createdAt - a.createdAt);
  }
  function bookingStatus(b) {
    if (b.status === 'cancelled') return { key: 'cancelled', label: 'Đã huỷ' };
    const end = startAt(b.date, b.slot);
    end.setHours(end.getHours() + b.span);
    if (end < new Date()) return { key: 'done', label: 'Đã chơi' };
    // Thực tế Genesis xác nhận trong 24 – 48 giờ; bản demo tự "xác nhận" sau 40 giây để xem được trọn luồng
    if (Date.now() - b.createdAt > 40000) return { key: 'confirmed', label: 'Đã xác nhận' };
    return { key: 'pending', label: 'Chờ xác nhận' };
  }

  // Kiểm tra một yêu cầu đặt phòng; ném lỗi (kèm tên trường sai nếu có) khi chưa hợp lệ
  function checkBooking(data) {
    const { roomId, date, slot, players, contact, method } = data;
    const room = G.room(roomId) || fail('Chưa chọn phòng.');
    if (slot == null) fail('Chưa chọn suất chơi.');
    if (players < G.rules.minPlayers || players > G.rules.maxPlayers) fail(`Mỗi đội từ ${G.rules.minPlayers} đến ${G.rules.maxPlayers} người.`);
    if (!canStart(roomId, date, slot)) fail('Suất này vừa có người giữ. Hãy chọn suất khác.');
    if (!contact?.name?.trim()) fail('Vui lòng nhập họ tên người đặt.');
    if (!validPhone(cleanPhone(contact.phone))) fail('Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.');
    if (contact.email && !validEmail(contact.email)) fail('Email chưa đúng định dạng.'); // email không bắt buộc, giống lúc đăng ký
    const q = quote(data);
    const user = current();
    if (method === 'wallet') {
      if (!user) fail('Bạn cần đăng nhập để thanh toán bằng ví.');
      if (user.wallet < q.deposit) fail('Số dư ví không đủ. Hãy nạp thêm hoặc chọn chuyển khoản QR.');
    }
    return { room, q, user };
  }

  function createBooking(data) {
    const { roomId, date, slot, players, contact, method } = data;
    const { room, q, user } = checkBooking(data);
    const booking = {
      id: uid('GEN-'), userId: user?.id || null, guest: guestKey(), roomId, date, slot, span: span(room), players,
      flow: data.flow || '', extras: data.extras || [], scare: data.scare || 'normal', note: (data.note || '').trim().slice(0, 300),
      contact: { name: contact.name.trim(), phone: cleanPhone(contact.phone), email: contact.email.trim() },
      quote: q, method, status: 'active', createdAt: Date.now(),
    };
    if (method === 'wallet') addTx(user, 'pay', -q.deposit, `Cọc vé ${booking.id} · ${room.name}`);
    db.bookings.push(booking);
    commit();
    return booking;
  }

  function cancelBooking(id) {
    const b = myBookings().find((x) => x.id === id) || fail('Không tìm thấy vé.');
    if (b.status === 'cancelled') return { refunded: 0 };
    const hours = (startAt(b.date, b.slot) - Date.now()) / 36e5;
    if (hours < 0) fail('Suất chơi đã diễn ra.');
    b.status = 'cancelled';
    let refunded = 0;
    const user = current();
    if (user && hours >= 24) {
      refunded = b.quote.deposit;
      addTx(user, 'refund', refunded, `Hoàn cọc vé ${b.id}`);
    }
    commit();
    return { refunded, late: hours < 24, guest: !user };
  }

  /* ---------- Review & yêu cầu liên hệ ---------- */
  function addReview({ name, roomId, stars, text }) {
    if (!name?.trim()) fail('Cho Genesis biết tên đội của bạn nhé.');
    if ((text || '').trim().length < 10) fail('Review cần ít nhất 10 ký tự.');
    db.reviews.unshift({ id: uid('R'), name: name.trim().slice(0, 40), room: roomId, stars: Math.min(5, Math.max(1, Number(stars) || 5)), text: text.trim().slice(0, 400), at: Date.now() });
    commit();
  }
  const reviews = () => [...db.reviews, ...G.reviews];

  function addRequest(kind, data) {
    if (!data.name?.trim()) fail('Vui lòng nhập họ tên.');
    if (!validPhone(cleanPhone(data.phone)) && !validEmail(data.email)) fail('Hãy để lại số điện thoại hoặc email hợp lệ.');
    db.requests.push({ id: uid('Q'), kind, ...data, at: Date.now() });
    commit();
  }

  function resetAll() {
    db = blank();
    commit();
  }

  return {
    onChange, fmt, iso, today, addDays, parse, isWeekend, startAt,
    current: () => publicUser(current()), register, login, loginDemo, logout, updateProfile, changePassword, hasAccount, resetPassword,
    topup, span, slotState, canStart, freeCount, checkVoucher, quote,
    myBookings, bookingStatus, checkBooking, createBooking, cancelBooking, addReview, reviews, addRequest, resetAll,
  };
})();
