/*
 * Nhân vật Zabu dạng module: một bộ phận cơ thể dùng chung cho dáng đi (rig) và các "cảnh diễn".
 * Hệ toạ độ chung 140x250, sàn ở y=250, nhân vật nhìn sang phải.
 * Trang phục điều khiển bằng biến CSS (xem .outfit-* trong style.css), nên đổi đồ chỉ cần đổi class/data-outfit.
 */
window.Avatar = (() => {
  const HAIR = '#1d1916';
  const STUBBLE = '#2b211c';

  // ---------- defs dùng chung (pattern caro, gradient) ----------
  const plaid = (id, base) => `
    <pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="${base}" />
      <rect width="10" height="4" fill="#161314" opacity=".7" />
      <rect width="4" height="10" fill="#161314" opacity=".7" />
      <rect x="7" width=".8" height="10" fill="#f0c4a8" opacity=".3" />
      <rect y="7" width="10" height=".8" fill="#f0c4a8" opacity=".3" />
    </pattern>`;

  function mountDefs() {
    if (document.getElementById('av-defs')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg id="av-defs" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
      <defs>
        ${plaid('av-plaid', '#b42a2f')}${plaid('av-plaid-d', '#8a1e23')}
        <linearGradient id="av-rgb" x1="0" x2="1"><stop offset="0" stop-color="#ff4d6d" /><stop offset=".33" stop-color="#ffd166" /><stop offset=".66" stop-color="#4dd4ff" /><stop offset="1" stop-color="#a66bff" /></linearGradient>
        <radialGradient id="av-burst" cx=".45" cy=".5" r=".6"><stop offset="0" stop-color="#f2b46b" /><stop offset=".65" stop-color="#c8783e" /><stop offset="1" stop-color="#5a2e16" /></radialGradient>
        <linearGradient id="av-scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b5bff" /><stop offset="1" stop-color="#ff7ab6" /></linearGradient>
        <linearGradient id="av-glow" x1="1" x2="0"><stop offset="0" stop-color="#7ad0ff" stop-opacity=".5" /><stop offset="1" stop-color="#7ad0ff" stop-opacity="0" /></linearGradient>
      </defs></svg>`;
    document.body.prepend(wrap.firstElementChild);
  }

  // ---------- Đầu ----------
  function head(dx = 0, dy = 0, { headset = false } = {}) {
    return `<g class="head" transform="translate(${dx} ${dy})">
      <line x1="74" y1="64" x2="75" y2="50" class="av-neck" stroke-width="13" stroke-linecap="round" />
      <ellipse cx="77" cy="36" rx="20" ry="21" class="av-skin" />
      <path d="M61 40 C61 56 73 63 84 61 C93 59 97 51 96 42 Z" class="av-skin" />
      <path d="M95 35 C100 39 101 43 96 45 Z" class="av-skin" />
      <path d="M64 44 C64 55 74 62 84 61 C92 60 97 54 97 48 C94 50 91 52 88 52 C84 50 80 48 74 47 C70 46 67 44 64 44 Z" fill="${STUBBLE}" opacity=".27" />
      <path d="M62 37 L67 37 L67 46 L63 45 Z" fill="${STUBBLE}" opacity=".3" />
      <path d="M88 48.6 C91 47.6 95 47.6 97 48.8" fill="none" stroke="${STUBBLE}" stroke-width="1.8" stroke-linecap="round" opacity=".5" />
      <g class="av-hair-thin">
        <path d="M58 34 C56 20 64 12 74 12 C80 12 84 14 86 17 C80 17 76 19 74 23 C72 28 70 33 70 38 C66 38 63 42 62 46 C59 44 58 40 58 34 Z" fill="${HAIR}" />
        <path d="M72 13 C78 10 86 12 89 18 C85 16 80 16 76 18 Z" fill="${HAIR}" opacity=".55" />
      </g>
      <g class="av-hair-full" fill="${HAIR}">
        <path d="M57 37 C53 14 66 4 81 5 C94 6 101 15 99 28 C93 21 86 19 80 21 C76 25 72 31 71 38 C66 38 63 42 62 46 C58 44 57 41 57 37 Z" />
        <path d="M80 6 C90 6 98 12 99 22 C96 16 91 13 86 13 Z" opacity=".6" />
        <path d="M57 34 C54 46 57 55 64 59 L66 46 Z" />
      </g>
      <ellipse cx="66.5" cy="38.5" rx="4.5" ry="5.5" class="av-ear" />
      <path d="M66 36 q2 2 0 5" fill="none" stroke="#bb8159" stroke-width="1" />
      <path d="M83 29.4 L93.5 28.8" stroke="${HAIR}" stroke-width="2.6" stroke-linecap="round" />
      <ellipse cx="89" cy="34" rx="1.9" ry="1.5" fill="#1b1512" />
      <path d="M86.6 32.6 q2.5 -1 5 0" fill="none" stroke="#1b1512" stroke-width="1" />
      <path d="M90 52.2 q3 .5 5.4 -.6" fill="none" stroke="#8a4f3a" stroke-width="1.4" stroke-linecap="round" />
      <g class="av-sun">
        <path d="M81 30 H97 V34 Q96 39 90 38 Q84 38 82 34 Z" fill="#14161f" />
        <path d="M85 31.5 h6" stroke="#5b6cff" stroke-width="1.2" stroke-linecap="round" opacity=".7" />
        <path d="M81 31 L68 34" stroke="#14161f" stroke-width="1.6" />
      </g>
      <g class="av-g3d">
        <rect x="80.5" y="28.5" width="19" height="9" rx="2" fill="#f7f7f7" stroke="#d9d9d9" stroke-width=".8" />
        <rect x="82" y="30" width="7" height="6" rx="1" fill="#e0242f" opacity=".9" />
        <rect x="91" y="30" width="7" height="6" rx="1" fill="#1fb6ff" opacity=".9" />
        <path d="M81 31 L68 34" stroke="#f7f7f7" stroke-width="1.8" />
      </g>
      <g class="av-hat">
        <ellipse cx="78" cy="19" rx="28" ry="5" fill="#d9b66b" />
        <path d="M63 19 C63 4 93 4 93 19 Z" fill="#e8cf8f" />
        <rect x="63" y="13.5" width="30" height="4.5" fill="#3a2f2a" />
      </g>
      ${headset ? `<path d="M59 34 C57 5 97 3 98 28" fill="none" stroke="#1b1d24" stroke-width="4.5" stroke-linecap="round" />
        <ellipse cx="67" cy="38" rx="7.5" ry="9.5" fill="#1b1d24" /><ellipse class="rgb" cx="67" cy="38" rx="3.6" ry="5.4" fill="url(#av-rgb)" />
        <path d="M70 47 Q78 61 90 55" fill="none" stroke="#1b1d24" stroke-width="2" /><circle cx="91" cy="55" r="2.4" fill="#1b1d24" />` : ''}
    </g>`;
  }

  // ---------- Cổ áo (toạ độ dáng đứng; dịch khi ngồi) ----------
  function collar(dx = 0, dy = 0) {
    return `<g transform="translate(${dx} ${dy})">
      <g class="av-open"><path d="M76 66 L80 82 L85 67 Z" class="av-skin" /><path d="M71 66 L78 79 L77 66 Z M86 66 L81 80 L89 69 Z" class="av-collar" /></g>
      <g class="av-wide">
        <path d="M73 66 L80 106 L89 67 Z" class="av-skin" />
        <path d="M78 86 q2 3 4 0" fill="none" stroke="#bb8159" stroke-width="1" opacity=".6" />
        <path d="M74 70 Q80 84 87 70" fill="none" stroke="#c9a35c" stroke-width="1.2" />
        <path d="M69 66 L79 100 L75 66 Z M89 66 L81 102 L93 71 Z" class="av-collar" />
      </g>
      <g class="av-points"><path d="M72 64 L79 75 L77 64 Z M86 65 L81 76 L89 67 Z" class="av-collar" /></g>
      <g class="av-tie"><path d="M78 70 L83 70 L82 75.5 L79 75.5 Z" class="av-tie-fill" /><path d="M79 75.5 L82 75.5 L85.5 113 L80.5 119 L76.5 113 Z" class="av-tie-fill" /></g>
      <g class="av-tee"><path d="M71.5 65.5 Q80 75 88.5 66.5" fill="none" class="av-collar-line" stroke-width="3.2" stroke-linecap="round" /></g>
    </g>`;
  }

  // ---------- Tay (bắp tay + tay áo + cẳng tay + bàn tay) ----------
  function arm(sh, el, hand, { far = false, cls = '' } = {}) {
    const d = far ? '-d' : '';
    const s1 = 0.55;
    const sx = (sh[0] + (el[0] - sh[0]) * s1).toFixed(1);
    const sy = (sh[1] + (el[1] - sh[1]) * s1).toFixed(1);
    const cx = (sh[0] + (el[0] - sh[0]) * 0.42).toFixed(1);
    const cy = (sh[1] + (el[1] - sh[1]) * 0.42).toFixed(1);
    const upper = `<line x1="${sh[0]}" y1="${sh[1]}" x2="${el[0]}" y2="${el[1]}" class="av-upper${d}" stroke-width="${far ? 11 : 12}" stroke-linecap="round" />
      <line x1="${sh[0] - 1}" y1="${sh[1] - 2}" x2="${sx}" y2="${sy}" class="av-sleeve${d}" stroke-width="${far ? 16 : 17}" stroke-linecap="round" />
      <line x1="${cx}" y1="${cy}" x2="${sx}" y2="${sy}" class="av-cuff" stroke-width="${far ? 16 : 17}" />`;
    let fore = `<line x1="${el[0]}" y1="${el[1]}" x2="${hand[0]}" y2="${hand[1]}" class="av-fore${d}" stroke-width="${far ? 10 : 11}" stroke-linecap="round" />
      <circle cx="${hand[0]}" cy="${hand[1]}" r="${far ? 6 : 6.5}" class="av-hand${d}" />`;
    if (cls) fore = `<g class="${cls}">${fore}</g>`;
    return { upper, fore, all: upper + fore };
  }

  // ---------- Chân & thân ----------
  const SHOE_FAR = 'M-8 47 C-8 44 -6 43 -3 43 L6 44 C12 45 19 49 22 53 L22 58 L-8 58 Z';
  const SHOE_NEAR = 'M-9 47 C-9 44 -7 43 -4 43 L6 44 C12 45 20 49 23 53 L23 57 L-9 57 Z';

  function legStand(far, id = '') {
    const d = far ? '-d' : '';
    const x = far ? 70 : 74;
    const idAttr = id ? ` id="${id}"` : '';
    return `<g${idAttr} transform="translate(${x} 139)">
      <line x1="0" y1="0" x2="0" y2="52" class="av-thigh${d}" stroke-width="${far ? 19 : 20}" stroke-linecap="round" />
      <line x1="0" y1="0" x2="0" y2="30" class="av-pants${d}" stroke-width="${far ? 21 : 22}" stroke-linecap="round" />
      <g class="sub" transform="translate(0 52)">
        <line x1="0" y1="0" x2="0" y2="46" class="av-shin${d}" stroke-width="${far ? 16 : 17}" stroke-linecap="round" />
        <path d="${far ? SHOE_FAR : SHOE_NEAR}" class="av-shoe${d}" />
        ${far ? '' : '<rect x="-9" y="56" width="32" height="2.6" fill="#050506" /><path d="M1 46 q6 0 11 3" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1" />'}
      </g>
    </g>`;
  }

  const waistStand = '<rect x="51" y="130" width="45" height="20" rx="8" class="av-pants-fill" />';
  const torsoStand = `
    <path d="M50 158 C48 124 50 94 57 79 C62 69 75 64 85 66 C97 71 99 100 98 158 C88 162 60 162 50 158 Z" class="av-shirt av-untucked" />
    <path d="M52 146 C49 120 50 94 57 79 C62 69 75 64 85 66 C97 71 98 100 95 146 Z" class="av-shirt av-tucked" />
    <path d="M83 82 C90 104 93 128 93 156" fill="none" class="av-placket" stroke-width="1.2" />
    <g class="av-tucked"><rect x="51" y="130" width="45" height="18" rx="8" class="av-pants-fill" /><rect x="51" y="131" width="45" height="4" class="av-belt" /></g>
    ${collar()}`;

  function legsSeat() {
    return `
      <line x1="64" y1="176" x2="126" y2="174" class="av-thigh-d" stroke-width="20" stroke-linecap="round" />
      <line x1="64" y1="176" x2="104" y2="175" class="av-pants-d" stroke-width="22" stroke-linecap="round" />
      <line x1="126" y1="174" x2="132" y2="236" class="av-shin-d" stroke-width="17" stroke-linecap="round" />
      <path d="M122 238 C122 235 124 234 127 234 L136 235 C142 236 149 239 153 243 L153 248 L122 248 Z" class="av-shoe-d" />
      <rect x="44" y="168" width="58" height="18" rx="8" class="av-pants-fill" />
      <line x1="66" y1="180" x2="130" y2="180" class="av-thigh" stroke-width="22" stroke-linecap="round" />
      <line x1="66" y1="180" x2="108" y2="180" class="av-pants" stroke-width="24" stroke-linecap="round" />
      <line x1="130" y1="180" x2="134" y2="238" class="av-shin" stroke-width="18" stroke-linecap="round" />
      <path d="M124 240 C124 237 126 236 129 236 L139 237 C145 238 152 241 156 245 L156 249 L124 249 Z" class="av-shoe" />
      <rect x="124" y="247.5" width="32" height="2.5" fill="#050506" />`;
  }

  const torsoSeat = `
    <path d="M43 190 C41 152 45 118 59 101 C68 91 87 89 96 98 C106 109 107 148 108 186 C92 193 60 194 43 190 Z" class="av-shirt av-untucked" />
    <path d="M45 182 C43 152 45 118 59 101 C68 91 87 89 96 98 C106 109 105 148 102 180 Z" class="av-shirt av-tucked" />
    <path d="M90 113 C96 136 99 160 100 188" fill="none" class="av-placket" stroke-width="1.2" />
    <g class="av-tucked"><rect x="44" y="168" width="58" height="18" rx="8" class="av-pants-fill" /><rect x="44" y="169" width="58" height="4" class="av-belt" /></g>
    ${collar(7, 28)}`;

  // ---------- Dáng đi (rig cho Walker) ----------
  function rig() {
    const sub = (far) => {
      const d = far ? '-d' : '';
      return `<g class="sub" transform="translate(0 38)">
          <line x1="0" y1="0" x2="0" y2="34" class="av-fore${d}" stroke-width="${far ? 10 : 11}" stroke-linecap="round" />
          <circle cx="0" cy="38" r="${far ? 6 : 6.5}" class="av-hand${d}" />
        </g>`;
    };
    const armRig = (far) => {
      const d = far ? '-d' : '';
      const w = far ? [11, 16] : [12, 17];
      return `<line x1="0" y1="0" x2="0" y2="38" class="av-upper${d}" stroke-width="${w[0]}" stroke-linecap="round" />
        <line x1="0" y1="-2" x2="0" y2="21" class="av-sleeve${d}" stroke-width="${w[1]}" stroke-linecap="round" />
        <line x1="0" y1="16" x2="0" y2="21" class="av-cuff" stroke-width="${w[1]}" />
        ${sub(far)}`;
    };
    return `<g id="rig">
      <g id="arm-far" transform="translate(72 74)">${armRig(true)}</g>
      ${legStand(true, 'leg-far')}
      ${waistStand}
      ${legStand(false, 'leg-near')}
      ${torsoStand}
      ${head()}
      <g id="arm-near" transform="translate(76 76)">${armRig(false)}</g>
    </g>`;
  }

  // ---------- Các cảnh diễn ----------
  const qrPattern = (x, y, cell) => {
    const bits = '101100101011010110010110101101001011010101101001011010110101101001010110101101011';
    let out = `<rect x="${x - cell}" y="${y - cell}" width="${cell * 11}" height="${cell * 11}" fill="#fff" />`;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
        if (!finder && bits[r * 9 + c] === '1') out += `<rect x="${x + c * cell}" y="${y + r * cell}" width="${cell}" height="${cell}" fill="#14161f" />`;
      }
    }
    const f = (fx, fy) =>
      `<rect x="${x + fx * cell}" y="${y + fy * cell}" width="${cell * 3}" height="${cell * 3}" fill="#14161f" /><rect x="${x + (fx + 0.6) * cell}" y="${y + (fy + 0.6) * cell}" width="${cell * 1.8}" height="${cell * 1.8}" fill="#fff" /><rect x="${x + (fx + 1) * cell}" y="${y + (fy + 1) * cell}" width="${cell}" height="${cell}" fill="#14161f" />`;
    return out + f(0, 0) + f(6, 0) + f(0, 6);
  };

  const standBody = () => `${legStand(true)}${waistStand}${legStand(false)}${torsoStand}`;
  const seatBody = () => `${legsSeat()}${torsoSeat}`;

  const SCENES = {
    // 1. Ngân hàng — thao tác máy POS
    bank: { outfit: 'bank', render: () => {
      const far = arm([72, 74], [84, 106], [104, 126], { far: true });
      const near = arm([76, 76], [100, 104], [124, 98]);
      return `
        <rect x="100" y="150" width="80" height="100" rx="4" fill="#e9e4dc" />
        <rect x="96" y="144" width="88" height="8" rx="3" fill="#c9bfae" />
        <rect x="110" y="166" width="60" height="64" rx="3" fill="#ded6c8" />
        <rect x="110" y="166" width="60" height="6" fill="#17325a" /><g transform="translate(140 196)"><path d="M-10 5 L-3 -6 L3 -6 L-4 5 Z" fill="#17325a" /><path d="M-1 5 L6 -6 L12 -6 L5 5 Z" fill="#c9a35c" /></g>
        ${far.all}
        ${standBody()}
        ${head()}
        <g class="pos">
          <rect class="receipt" x="127" y="98" width="16" height="16" fill="#fff" stroke="#e6e1d8" />
          <g class="receipt-lines" stroke="#c9c2b6" stroke-width="1"><line x1="130" y1="102" x2="140" y2="102" /><line x1="130" y1="106" x2="138" y2="106" /></g>
          <rect x="118" y="112" width="34" height="34" rx="6" fill="#2b2f3b" />
          <rect x="122" y="108" width="26" height="5" rx="2" fill="#14161f" />
          <rect x="122" y="116" width="26" height="13" rx="2" fill="#0f1424" />
          <g class="pos-ok"><rect x="122" y="116" width="26" height="13" rx="2" fill="#2ecc8a" /><path d="M130 122.5 l3 3 l6 -6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g>
          <g fill="#9aa1b0">${[0, 1, 2].map((c) => [0, 1].map((r) => `<rect x="${124 + c * 8}" y="${133 + r * 6}" width="6" height="4" rx="1" />`).join('')).join('')}</g>
        </g>
        ${near.upper}
        <g class="swipe">
          <g transform="rotate(-12 128 94)"><rect x="118" y="88" width="22" height="14" rx="2" fill="#ffd166" /><rect x="118" y="91" width="22" height="3" fill="#14161f" opacity=".7" /><rect x="121" y="96" width="6" height="4" rx="1" fill="#c9a35c" /></g>
          ${near.fore}
        </g>`;
    } },

    // 2. Vận hành & kỹ thuật — quét QR, xách hộp đồ nghề
    ops: { outfit: 'ops', render: () => {
      const far = arm([72, 74], [70, 110], [72, 146], { far: true });
      const near = arm([76, 76], [98, 92], [102, 66]);
      return `
        <line x1="134" y1="250" x2="134" y2="150" stroke="#3a3f4b" stroke-width="5" />
        <rect x="110" y="102" width="48" height="48" rx="6" fill="#14161f" />
        ${qrPattern(116, 108, 4)}
        <rect class="scanline" x="114" y="106" width="40" height="2" fill="#ff4d6d" opacity=".9" />
        <polygon class="beam-scan" points="108,58 108,74 114,146 114,106" fill="#2ecc8a" opacity=".22" />
        ${far.upper}
        <g><rect x="54" y="146" width="36" height="20" rx="3" fill="#e0524b" /><rect x="54" y="152" width="36" height="3" fill="#b8423c" /><path d="M64 146 v-5 h16 v5" fill="none" stroke="#3a3f4b" stroke-width="2.5" /></g>
        ${far.fore}
        ${standBody()}
        ${head()}
        <g transform="rotate(10 104 64)"><rect x="97" y="50" width="13" height="24" rx="3" fill="#14161f" /><rect x="98.6" y="52.5" width="9.8" height="18" rx="1.5" fill="#0f1424" />
          <g class="scan-ok"><rect x="98.6" y="52.5" width="9.8" height="18" rx="1.5" fill="#2ecc8a" /><path d="M100.5 61.5 l2 2 l4 -4.5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" /></g></g>
        ${near.all}
        <g class="paid-pop"><rect x="104" y="16" width="62" height="22" rx="11" fill="#2ecc8a" /><text x="135" y="31" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" font-family="Inter, sans-serif">✓ 20.000₫</text></g>`;
    } },

    // 3. Tài chính — tư vấn vay online qua điện thoại
    loan: { outfit: 'finance', render: (L = {}) => {
      const far = arm([72, 74], [88, 102], [96, 80], { far: true, cls: 'explain' });
      const near = arm([76, 76], [98, 100], [114, 90]);
      const steps = L.steps || ['① Tải ứng dụng', '② eKYC trong 2 phút', '③ Nhận tiền ngay'];
      // co chữ cho vừa bong bóng (ngôn ngữ dài như tiếng Séc, hoặc chữ Hán rộng)
      const units = Math.max(...steps.map((s) => [...s].reduce((n, c) => n + (/[\u2e80-\u9fff]/.test(c) ? 1.6 : 1), 0)));
      const stepSize = Math.min(10.5, 104 / (units * 0.56)).toFixed(1);
      return `
        ${far.upper}${far.fore}
        ${standBody()}
        ${head()}
        <g><rect x="106" y="52" width="26" height="44" rx="5" fill="#14161f" /><rect x="108.5" y="56" width="21" height="36" rx="2" fill="#fff" />
          <rect x="108.5" y="56" width="21" height="7" fill="#5b6cff" />
          <text x="119" y="73" text-anchor="middle" font-size="6.5" font-weight="800" fill="#14161f" font-family="Inter, sans-serif">50tr₫</text>
          <rect x="111" y="77" width="16" height="3" rx="1.5" fill="#e6e8f0" /><rect class="loan-progress" x="111" y="77" width="16" height="3" rx="1.5" fill="#2ecc8a" />
          <g class="loan-ok"><circle cx="119" cy="86" r="4" fill="#2ecc8a" /><path d="M117 86 l1.5 1.5 l3 -3" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" /></g></g>
        ${near.all}
        <g class="bubble">
          <rect x="104" y="-14" width="112" height="34" rx="11" fill="#fff" stroke="#e3e6ee" />
          <path d="M116 19 L112 30 L126 19 Z" fill="#fff" />
          ${steps.map((s, i) => `<text class="step s${i + 1}" x="160" y="8" text-anchor="middle" font-size="${stepSize}" font-weight="700" fill="#14161f">${s}</text>`).join('')}
        </g>`;
    } },

    // 4. Cửa hàng điện thoại Luxury — giới thiệu máy
    luxury: { outfit: 'luxury', render: () => {
      const far = arm([72, 74], [62, 104], [70, 124], { far: true });
      const near = arm([76, 76], [100, 90], [112, 68]);
      return `
        <ellipse class="halo" cx="112" cy="54" rx="26" ry="26" fill="#ffe7a3" opacity=".35" />
        <rect x="112" y="178" width="46" height="72" fill="#f4efe6" />
        <rect x="108" y="172" width="54" height="8" fill="#c9a35c" />
        <rect x="122" y="152" width="28" height="20" fill="#15151a" /><rect x="134" y="152" width="4" height="20" fill="#c9a35c" /><rect x="122" y="160" width="28" height="4" fill="#c9a35c" />
        <path d="M136 152 q-8 -8 -2 -9 q4 0 2 9 q6 -9 9 -6 q2 4 -9 6" fill="none" stroke="#c9a35c" stroke-width="2" />
        ${far.all}
        ${standBody()}
        ${head()}
        <g class="phone-turn"><rect x="104" y="40" width="17" height="31" rx="4" fill="#1b1b20" stroke="#c9a35c" stroke-width="1.6" /><rect x="106.3" y="43" width="12.4" height="25" rx="2" fill="url(#av-scr)" /></g>
        ${near.all}
        <g fill="#ffe7a3"><path class="sparkle" d="M96 36 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" /><path class="sparkle s2" d="M130 30 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z" /><path class="sparkle s3" d="M128 72 l1.4 4 l4 1.4 l-4 1.4 l-1.4 4 l-1.4 -4 l-4 -1.4 l4 -1.4 Z" /></g>`;
    } },

    // 5. Ecommerce POD — laptop, đơn hàng nổ liên tục
    pod: { outfit: 'pod', render: () => {
      const far = arm([72, 74], [90, 104], [118, 128], { far: true, cls: 'tap' });
      const near = arm([76, 76], [98, 108], [126, 132], { cls: 'tap t2' });
      return `
        <g fill="#c9a06b"><rect x="150" y="214" width="34" height="36" rx="2" /><rect x="156" y="186" width="26" height="28" rx="2" fill="#d9b27c" /></g>
        <g fill="#e9d3a6"><rect x="164" y="214" width="6" height="36" /><rect x="166" y="186" width="5" height="28" /></g>
        <rect x="98" y="146" width="80" height="6" rx="2" fill="#3a3f4b" /><rect x="102" y="152" width="5" height="98" fill="#2b2f3b" /><rect x="168" y="152" width="5" height="98" fill="#2b2f3b" />
        ${far.upper}${far.fore}
        ${standBody()}
        ${head()}
        <rect x="114" y="102" width="44" height="38" rx="3" fill="#1b1d24" /><rect x="117" y="105" width="38" height="31" fill="#fff" />
        <path d="M124 113 L129 110 Q132 113 135 110 L140 113 L138 118 L136 117 V126 H128 V117 L126 118 Z" class="hue" fill="#5b6cff" />
        <rect x="143" y="112" width="9" height="3" rx="1" fill="#d0d5de" /><rect x="143" y="118" width="7" height="3" rx="1" fill="#ff8a5c" /><rect x="143" y="126" width="9" height="5" rx="2" fill="#14161f" />
        <rect x="110" y="140" width="52" height="6" rx="2" fill="#c9ced8" />
        ${near.upper}${near.fore}
        ${[0, 1, 2].map((i) => `<g class="order-pop o${i + 1}"><rect x="${124 + i * 14}" y="80" width="40" height="17" rx="8.5" fill="#2ecc8a" /><text x="${144 + i * 14}" y="92" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Inter, sans-serif">+1 🛒</text></g>`).join('')}`;
    } },

    // ---------- Sở thích ----------
    guitar: { outfit: 'pod', render: () => {
      const far = arm([76, 102], [110, 130], [160, 143], { far: true });
      const near = arm([84, 104], [80, 144], [116, 156], { cls: 'strum' });
      return `
        <rect x="34" y="182" width="66" height="9" rx="4" fill="#8a6a55" />
        <g stroke="#6b4f3f" stroke-width="5" stroke-linecap="round"><line x1="44" y1="190" x2="36" y2="248" /><line x1="90" y1="190" x2="98" y2="248" /></g>
        <line x1="40" y1="222" x2="94" y2="222" stroke="#6b4f3f" stroke-width="3" />
        ${far.upper}
        ${seatBody()}
        ${head(7, 28)}
        <g transform="translate(98 168) rotate(-22)">
          <rect x="44" y="-5" width="98" height="10" fill="#5a3a22" />
          <g stroke="#e8d9b5" stroke-width="1"><line x1="64" y1="-5" x2="64" y2="5" /><line x1="82" y1="-5" x2="82" y2="5" /><line x1="98" y1="-5" x2="98" y2="5" /><line x1="112" y1="-5" x2="112" y2="5" /><line x1="125" y1="-5" x2="125" y2="5" /></g>
          <rect x="140" y="-8" width="20" height="16" rx="2" fill="#3a2414" />
          <g fill="#d9d2c4"><circle cx="146" cy="-10" r="2.4" /><circle cx="154" cy="-10" r="2.4" /><circle cx="146" cy="10" r="2.4" /><circle cx="154" cy="10" r="2.4" /></g>
          <circle cx="0" cy="0" r="29" fill="url(#av-burst)" />
          <circle cx="34" cy="0" r="22" fill="url(#av-burst)" />
          <circle cx="28" cy="0" r="7.5" fill="#2a1a10" />
          <rect x="-15" y="-9" width="5" height="18" rx="1" fill="#2a1a10" />
          <g class="strings" stroke="#f5efe0" stroke-width=".7"><line x1="-12" y1="-3" x2="150" y2="-3" /><line x1="-12" y1="-1" x2="150" y2="-1" /><line x1="-12" y1="1" x2="150" y2="1" /><line x1="-12" y1="3" x2="150" y2="3" /></g>
        </g>
        ${far.fore}
        ${near.upper}${near.fore}`;
    } },

    dota: { outfit: 'pod', render: () => {
      const far = arm([76, 102], [98, 136], [136, 132], { far: true, cls: 'type fast' });
      const near = arm([84, 104], [106, 140], [144, 138], { cls: 'type fast b' });
      return `
        <polygon class="screen-light" points="150,58 150,124 100,116 100,56" fill="url(#av-glow)" />
        <path d="M8 44 Q6 30 20 28 H36 Q50 30 46 44 L40 182 H16 Z" fill="#1b1d24" />
        <rect x="23" y="36" width="8" height="140" rx="3" fill="#e0524b" /><rect x="14" y="44" width="26" height="16" rx="7" fill="#2b2f3b" />
        <rect x="20" y="180" width="92" height="12" rx="6" fill="#2b2f3b" />
        <rect x="61" y="192" width="8" height="36" fill="#1b1d24" />
        <line x1="36" y1="234" x2="96" y2="234" stroke="#1b1d24" stroke-width="6" stroke-linecap="round" />
        <circle cx="38" cy="242" r="6" fill="#111" /><circle cx="94" cy="242" r="6" fill="#111" /><circle cx="66" cy="243" r="6" fill="#111" />
        <rect x="132" y="142" width="74" height="8" rx="2" fill="#3a3f4b" /><rect x="196" y="150" width="6" height="100" fill="#2b2f3b" />
        <rect class="rgb" x="134" y="136" width="48" height="6" rx="2" fill="url(#av-rgb)" />
        <ellipse class="rgb" cx="194" cy="139" rx="6" ry="3.4" fill="#2b2f3b" stroke="url(#av-rgb)" stroke-width="1" />
        ${far.upper}${far.fore}
        ${seatBody()}
        ${head(7, 28, { headset: true })}
        ${near.upper}${near.fore}`;
    } },

    travel: { outfit: 'beach', render: () => {
      const far = arm([72, 74], [100, 66], [98, 42], { far: true });
      const near = arm([76, 76], [108, 64], [106, 40]);
      return `
        ${far.all}
        ${standBody()}
        ${head()}
        <g class="camera">
          <rect x="92" y="24" width="24" height="18" rx="3" fill="#1b1d24" />
          <rect x="96" y="19" width="8" height="5" rx="1" fill="#1b1d24" />
          <rect x="116" y="27" width="9" height="12" rx="2" fill="#2b2f3b" /><circle cx="125" cy="33" r="4" fill="#9ad0ff" />
          <circle cx="110" cy="28" r="1.6" fill="#ff4d6d" />
        </g>
        <circle class="flash" cx="100" cy="18" r="12" fill="#fff" />
        ${near.all}`;
    } },

    movies: { outfit: 'cinema', carry: 'pod', render: () => {
      const far = arm([76, 102], [96, 134], [106, 164], { far: true });
      const near = arm([84, 104], [90, 142], [118, 148], { cls: 'munch' });
      return `
        <rect x="6" y="74" width="38" height="116" rx="12" fill="#b0303a" />
        <rect x="12" y="82" width="26" height="100" rx="9" fill="#c23a44" />
        <rect x="18" y="176" width="96" height="18" rx="8" fill="#c23a44" />
        <rect x="36" y="194" width="12" height="56" fill="#7d1f27" /><rect x="8" y="242" width="70" height="8" rx="3" fill="#7d1f27" />
        <g class="startle">
          ${far.upper}
          ${seatBody()}
          ${head(7, 28)}
          <g><g fill="#fff4d6"><circle cx="108" cy="148" r="6" /><circle cx="119" cy="145" r="6.5" /><circle cx="130" cy="148" r="6" /><circle cx="114" cy="152" r="6" /><circle cx="126" cy="152" r="6" /></g>
            <path d="M102 150 H136 L131 182 H107 Z" fill="#fff" /><g fill="#e0524b"><path d="M108 150 H114 L113 182 H110 Z" /><path d="M121 150 H127 L125 182 H122 Z" /></g></g>
          ${far.fore}
          ${near.upper}${near.fore}
          <circle class="kernel" cx="122" cy="144" r="3.4" fill="#fff4d6" />
        </g>`;
    } },
  };

  function actor(scene, labels) {
    const s = SCENES[scene];
    if (!s) return '';
    return `<svg class="actor-svg av outfit-${s.outfit}" viewBox="0 0 140 250" overflow="visible" aria-hidden="true">${s.render(labels)}</svg>`;
  }

  const carryOf = (scene) => (SCENES[scene] ? SCENES[scene].carry || SCENES[scene].outfit : 'pod');

  return { mountDefs, rig, actor, carryOf };
})();
