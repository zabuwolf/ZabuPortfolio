/*
 * Phần hình riêng của CV Genesis: hoá trang "ma mới" cho nhân vật Zabu, cảnh thử vai,
 * hình minh hoạ kỹ năng và mặt tiền Genesis. Dựng trên module Avatar của trang chính (js/avatar.js).
 */
window.CVScenes = (() => {
  const A = window.Avatar;
  const { arm, head, standBody, seatBody } = A.parts;

  const BONE = '#e9e6df';
  const BLOOD = '#e0242f';
  const NIGHT = '#0d0f14';

  // ---------- Hoá trang ma: tóc giả dài, hốc mắt thâm, mắt đỏ, vệt máu ----------
  // Chỉ hiện khi trang phục là "npc" (biến CSS --d-npc trong cv.css).
  A.extras.head = `
    <g class="av-npc">
      <path d="M57 36 C52 12 68 2 82 4 C96 5 102 16 99 30 C92 22 84 20 78 23 C74 28 72 34 72 40 C71 54 71 72 67 98 C58 100 51 93 49 85 C54 70 56 52 57 36 Z" fill="#0b0b0e" />
      <path d="M84 21 C89 31 89 45 86 59" fill="none" stroke="#0b0b0e" stroke-width="2.6" stroke-linecap="round" />
      <path d="M92 20 C95 27 95 33 93 40" fill="none" stroke="#0b0b0e" stroke-width="1.8" stroke-linecap="round" />
      <ellipse cx="89" cy="34" rx="4.6" ry="3.6" fill="#1a0f12" opacity=".8" />
      <circle class="cv-eye" cx="89.6" cy="34" r="1.5" fill="#ff3b3b" />
      <path d="M90 37.5 q.8 5 -.3 9.5" fill="none" stroke="#a3141b" stroke-width="1.4" stroke-linecap="round" />
    </g>`;

  // ---------- defs dùng chung ----------
  function mountDefs() {
    if (document.getElementById('cv-defs')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg id="cv-defs" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
      <defs>
        <radialGradient id="cv-aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9dffd0" stop-opacity=".34" /><stop offset="1" stop-color="#9dffd0" stop-opacity="0" /></radialGradient>
        <radialGradient id="cv-red" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff5148" stop-opacity=".85" /><stop offset="1" stop-color="#ff5148" stop-opacity="0" /></radialGradient>
        <radialGradient id="cv-warm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc56b" stop-opacity=".8" /><stop offset="1" stop-color="#ffc56b" stop-opacity="0" /></radialGradient>
        <linearGradient id="cv-doorlight" x1="0" x2="1"><stop offset="0" stop-color="#ff3b30" stop-opacity=".95" /><stop offset="1" stop-color="#5a0c10" stop-opacity=".9" /></linearGradient>
        <linearGradient id="cv-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1c4" stop-opacity=".5" /><stop offset="1" stop-color="#fff1c4" stop-opacity="0" /></linearGradient>
      </defs></svg>`;
    document.body.prepend(wrap.firstElementChild);
  }

  // ---------- Cảnh thử vai: Zabu hoá ma, giơ tay doạ ----------
  A.addScene('npc', {
    outfit: 'npc',
    render: () => {
      const far = arm([72, 74], [98, 72], [126, 66], { far: true, cls: 'cv-reach' });
      const near = arm([76, 76], [104, 78], [132, 74], { cls: 'cv-reach r2' });
      return `
        <ellipse class="cv-aura" cx="74" cy="140" rx="84" ry="124" fill="url(#cv-aura)" />
        <g class="cv-haunt">
          ${far.all}
          ${standBody()}
          ${head()}
          ${near.all}
        </g>
        <g class="cv-boo">
          <rect x="104" y="4" width="70" height="30" rx="15" fill="${BLOOD}" />
          <path d="M116 32 L109 45 L128 33 Z" fill="${BLOOD}" />
          <text x="139" y="25" text-anchor="middle" font-size="15" font-weight="900" fill="#fff" font-family="Inter, sans-serif">HÙ!</text>
        </g>`;
    },
  });

  // ---------- Zabu ngồi (dùng trong cảnh mở đầu và cảnh kết), toạ độ khớp cảnh 600x420 ----------
  function seated(kind) {
    if (kind === 'offer') {
      const far = arm([76, 102], [98, 134], [166, 136], { far: true });
      const near = arm([84, 104], [112, 128], [156, 105]);
      return `<g transform="translate(160 170)">
        ${far.all}
        ${seatBody()}
        ${head(7, 28)}
        <g class="cv-offer">
          ${near.all}
          <g transform="rotate(-8 177 88)">
            <rect x="146" y="68" width="66" height="40" rx="3" fill="#f3e9c8" />
            <rect x="146" y="68" width="5" height="40" fill="${BLOOD}" />
            <text x="157" y="83" font-size="9.5" font-weight="700" fill="#14161f" font-family="Playfair Display, Georgia, serif">HỒ SƠ</text>
            <text x="157" y="92" font-size="5.4" fill="#4a4f5e" font-family="Inter, sans-serif">Zabu · ứng viên “ma mới”</text>
            <text x="157" y="100" font-size="4.6" fill="#7b8090" font-family="Inter, sans-serif">Sẵn sàng học việc</text>
            <g transform="rotate(-14 198 96)"><rect x="186" y="90" width="22" height="11" rx="2" fill="none" stroke="${BLOOD}" stroke-width="1.2" /><text x="197" y="98.2" text-anchor="middle" font-size="6" font-weight="800" fill="${BLOOD}" font-family="Inter, sans-serif">MẬT</text></g>
          </g>
          <circle cx="158" cy="104" r="6.5" class="av-hand" />
        </g>
      </g>`;
    }
    const far = arm([76, 102], [98, 136], [136, 132], { far: true, cls: 'cv-type' });
    const near = arm([84, 104], [106, 140], [144, 138], { cls: 'cv-type b' });
    return `<g transform="translate(160 170)">
      ${far.all}
      ${seatBody()}
      ${head(7, 28)}
      ${near.all}
    </g>`;
  }

  // ---------- Minh hoạ kỹ năng — viewBox 0 0 320 200 ----------
  const frame = (bg, body) => `<svg class="skill-svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="200" fill="${bg}" />${body}</svg>`;

  const skillArts = {
    // Mặt nạ sân khấu giữa hai cánh màn nhung
    mask: () =>
      frame(
        '#14090b',
        `<ellipse cx="160" cy="96" rx="120" ry="96" fill="url(#cv-warm)" opacity=".35" />
        <path d="M0 0 H86 C80 60 70 120 40 200 H0 Z" fill="#5a0f15" /><path d="M0 0 H54 C50 70 40 130 16 200 H0 Z" fill="#7a151c" />
        <path d="M320 0 H234 C240 60 250 120 280 200 H320 Z" fill="#5a0f15" /><path d="M320 0 H266 C270 70 280 130 304 200 H320 Z" fill="#7a151c" />
        <g class="sk-sway">
          <path d="M160 34 C198 34 216 62 214 98 C212 136 190 166 160 168 C130 166 108 136 106 98 C104 62 122 34 160 34 Z" fill="${BONE}" />
          <path d="M160 34 C198 34 216 62 214 98 C212 136 190 166 160 168 Z" fill="#cfcabf" opacity=".55" />
          <path d="M124 92 q13 -13 27 0 q-13 9 -27 0 Z" fill="${NIGHT}" /><path d="M169 92 q13 -13 27 0 q-13 9 -27 0 Z" fill="${NIGHT}" />
          <circle class="sk-glint" cx="138" cy="91" r="2.4" fill="#ff3b3b" /><circle class="sk-glint" cx="183" cy="91" r="2.4" fill="#ff3b3b" />
          <path d="M136 130 q24 20 48 0 q-24 7 -48 0 Z" fill="${NIGHT}" />
          <path d="M183 97 q1.5 14 -1 26" fill="none" stroke="${BLOOD}" stroke-width="2.4" stroke-linecap="round" />
        </g>`
      ),

    // Sổ quỹ cuối ca: từng dòng thu chi được tích, két khoá lại
    ledger: () =>
      frame(
        '#12100d',
        `<circle cx="110" cy="100" r="110" fill="url(#cv-warm)" opacity=".2" />
        <g transform="rotate(-4 118 100)">
          <rect x="44" y="26" width="148" height="150" rx="4" fill="#f3e9c8" />
          <rect x="44" y="26" width="148" height="24" rx="4" fill="#a3141b" />
          <text x="56" y="43" font-size="10" font-weight="800" letter-spacing="1.5" fill="#fff" font-family="Inter, sans-serif">SỔ QUỸ · CA 3</text>
          ${[0, 1, 2, 3]
            .map((i) => {
              const y = 68 + i * 24;
              return `<rect x="56" y="${y}" width="${[70, 58, 76, 50][i]}" height="5" rx="2.5" fill="#b9ad8c" /><rect x="140" y="${y}" width="24" height="5" rx="2.5" fill="#8c8263" />
              <path class="sk-tick k${i}" pathLength="1" d="M171 ${y + 2} l4 4 l8 -9" fill="none" stroke="#1f8a4c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />`;
            })
            .join('')}
          <line x1="56" y1="158" x2="180" y2="158" stroke="#8c8263" stroke-width="1.5" />
          <text x="56" y="170" font-size="8" font-weight="800" fill="#14161f" font-family="Inter, sans-serif">KHỚP SỔ ✓</text>
        </g>
        <rect x="216" y="70" width="76" height="92" rx="8" fill="#23262f" stroke="#3a4052" stroke-width="2" />
        <rect x="226" y="80" width="56" height="72" rx="4" fill="#1a1d25" />
        <g class="sk-dial"><circle cx="254" cy="116" r="17" fill="#0b0d12" stroke="#c9a35c" stroke-width="3" /><line x1="254" y1="116" x2="254" y2="103" stroke="#c9a35c" stroke-width="3" stroke-linecap="round" /></g>
        <circle class="sk-led" cx="278" cy="88" r="3" fill="#7dffb0" />
        <g class="sk-coin"><ellipse cx="254" cy="52" rx="13" ry="13" fill="#f2c94c" /><text x="254" y="56.5" text-anchor="middle" font-size="12" font-weight="800" fill="#8a6d1d" font-family="Inter, sans-serif">₫</text></g>`
      ),

    // Bàn điều khiển: fader, đồng hồ VU, đèn sân khấu nhấp nháy
    console: () =>
      frame(
        '#10131a',
        `<polygon class="sk-flicker" points="160,22 96,132 224,132" fill="url(#cv-cone)" />
        <rect x="146" y="10" width="28" height="16" rx="4" fill="#2b2f3b" /><circle class="sk-flicker" cx="160" cy="27" r="5" fill="#fff1c4" />
        <rect x="34" y="112" width="252" height="78" rx="8" fill="#1d2230" stroke="#2f3647" stroke-width="2" />
        ${[0, 1, 2, 3, 4, 5]
          .map((i) => {
            const x = 58 + i * 28;
            return `<rect x="${x - 2}" y="124" width="4" height="54" rx="2" fill="#0b0d12" /><rect class="sk-fader f${i}" x="${x - 8}" y="142" width="16" height="10" rx="2" fill="${i % 3 === 0 ? BLOOD : BONE}" />`;
          })
          .join('')}
        <g>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect class="sk-vu v${i % 4}" x="${226 + i * 7}" y="126" width="5" height="34" rx="1" fill="${i > 4 ? BLOOD : '#7dffb0'}" />`).join('')}</g>
        <circle cx="236" cy="174" r="7" fill="#0b0d12" stroke="#c9a35c" stroke-width="2" /><circle cx="262" cy="174" r="7" fill="#0b0d12" stroke="#c9a35c" stroke-width="2" />
        <text x="46" y="106" font-size="9" font-weight="700" letter-spacing="2" fill="#7b8499" font-family="Inter, sans-serif">CUE 07 · LIGHT · SFX</text>`
      ),

    // Đèn bão dẫn đường tới cửa EXIT
    lantern: () =>
      frame(
        '#0e1014',
        `<rect x="236" y="56" width="56" height="124" fill="#07080b" stroke="#2a2f3a" stroke-width="3" />
        <rect x="244" y="36" width="40" height="15" rx="3" fill="#0f6b43" /><text x="264" y="47" text-anchor="middle" font-size="9" font-weight="800" fill="#b7ffd9" font-family="Inter, sans-serif">EXIT</text>
        <path class="sk-path" d="M72 176 C120 150 150 186 196 168 S250 176 262 176" fill="none" stroke="#f3e9c8" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round" />
        <g class="sk-swing">
          <line x1="78" y1="18" x2="78" y2="62" stroke="#8a8f9c" stroke-width="2" />
          <circle cx="78" cy="104" r="62" fill="url(#cv-warm)" />
          <path d="M62 62 H94 L100 74 H56 Z" fill="#3a3f4b" />
          <rect x="60" y="74" width="36" height="46" rx="6" fill="#ffd98f" opacity=".92" />
          <path class="sk-flame" d="M78 110 C68 100 76 92 78 82 C82 92 88 100 78 110 Z" fill="#ff7a2f" />
          <rect x="56" y="120" width="44" height="10" rx="3" fill="#3a3f4b" />
        </g>`
      ),

    // Nhịp tim ổn định
    pulse: () =>
      frame(
        '#0b0f10',
        `<g stroke="#12301f" stroke-width="1">${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${20 + i * 20}" x2="320" y2="${20 + i * 20}" />`).join('')}${Array.from({ length: 15 }, (_, i) => `<line x1="${20 + i * 20}" y1="0" x2="${20 + i * 20}" y2="200" />`).join('')}</g>
        <path class="sk-ecg" pathLength="100" d="M0 112 H70 L82 112 L92 86 L104 144 L116 60 L128 128 L138 112 H196 L208 112 L218 90 L230 138 L242 70 L254 124 L264 112 H320" fill="none" stroke="#7dffb0" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
        <g class="sk-beat"><path d="M52 44 C52 34 66 32 68 43 C70 32 84 34 84 44 C84 56 68 64 68 66 C68 64 52 56 52 44 Z" fill="${BLOOD}" /></g>
        <text x="96" y="56" font-size="22" font-weight="800" fill="${BONE}" font-family="Inter, sans-serif">72</text><text x="128" y="56" font-size="10" font-weight="700" fill="#7b8499" font-family="Inter, sans-serif">BPM · bình tĩnh</text>`
      ),

    // Bộ đàm và ba đồng đội nối tín hiệu
    team: () =>
      frame(
        '#11121a',
        `<g fill="none" stroke="${BONE}" stroke-width="2" opacity=".85"><path class="sk-wave w1" d="M112 62 q14 -16 28 0" /><path class="sk-wave w2" d="M102 50 q24 -26 48 0" /><path class="sk-wave w3" d="M92 38 q34 -36 68 0" /></g>
        <rect x="104" y="74" width="44" height="96" rx="8" fill="#1f2430" stroke="#39415a" stroke-width="2" />
        <rect x="134" y="44" width="5" height="32" rx="2" fill="#39415a" />
        <rect x="112" y="84" width="28" height="20" rx="3" fill="#0b0d12" /><text x="126" y="98" text-anchor="middle" font-size="9" font-weight="800" fill="#7dffb0" font-family="Inter, sans-serif">CH 3</text>
        <g fill="#39415a">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<circle cx="${116 + c * 10}" cy="${118 + r * 10}" r="2.6" />`).join('')).join('')}</g>
        <circle class="sk-led" cx="140" cy="158" r="4" fill="${BLOOD}" />
        <g stroke="#39415a" stroke-width="2" stroke-dasharray="4 5" class="sk-link"><line x1="204" y1="62" x2="258" y2="104" /><line x1="258" y1="104" x2="204" y2="148" /><line x1="204" y1="62" x2="204" y2="148" /></g>
        ${[[204, 62, 'GM'], [258, 104, 'NPC'], [204, 148, 'NPC']]
          .map(([x, y, l], i) => `<g class="sk-node n${i}"><circle cx="${x}" cy="${y}" r="17" fill="${i === 0 ? BLOOD : '#1f2430'}" stroke="${BONE}" stroke-width="2" /><text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Inter, sans-serif">${l}</text></g>`)
          .join('')}`
      ),

    // Bản demo website: lịch suất chơi sáng dần
    web: () =>
      frame(
        '#0f1117',
        `<rect x="26" y="20" width="268" height="164" rx="10" fill="#161922" stroke="#2a2f3d" stroke-width="2" />
        <g fill="#3a4052"><circle cx="42" cy="34" r="3.5" /><circle cx="54" cy="34" r="3.5" /><circle cx="66" cy="34" r="3.5" /></g>
        <rect x="84" y="28" width="150" height="12" rx="6" fill="#0b0d12" /><text x="92" y="37" font-size="7" fill="#7b8499" font-family="Inter, sans-serif">zabudev.com/genesis-cv/web</text>
        <rect x="42" y="56" width="92" height="12" rx="3" fill="${BLOOD}" /><rect x="42" y="74" width="64" height="6" rx="3" fill="#3a4052" /><rect x="42" y="86" width="78" height="6" rx="3" fill="#3a4052" />
        <rect x="42" y="104" width="54" height="18" rx="9" fill="${BONE}" />
        <g>${Array.from({ length: 4 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<rect class="sk-slot s${(r * 5 + c) % 7}" x="${152 + c * 26}" y="${56 + r * 28}" width="20" height="20" rx="4" fill="#232838" />`).join('')).join('')}</g>
        <path class="sk-cursor" d="M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z" fill="#fff" stroke="${NIGHT}" stroke-width="1" />`
      ),
  };

  function skillArt(key) {
    return (skillArts[key] || skillArts.mask)();
  }

  // ---------- Mặt tiền Genesis — viewBox 0 0 320 300, chân ở y=300 ----------
  function genesisArt() {
    const talisman = (x, y, cls) => `<g class="cv-talisman ${cls}" transform="translate(${x} ${y})"><rect width="16" height="44" fill="#f2c94c" /><path d="M4 8 h8 M8 6 v30 M4 18 q4 4 8 0 M4 28 q4 -4 8 0" fill="none" stroke="#a3141b" stroke-width="1.6" /></g>`;
    return `<svg class="hobby-svg" viewBox="0 0 320 300" preserveAspectRatio="xMidYMax meet" overflow="visible" aria-hidden="true">
      <rect x="14" y="22" width="292" height="278" fill="#15171e" />
      <g stroke="#1e212b" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="14" y1="${52 + i * 30}" x2="306" y2="${52 + i * 30}" />`).join('')}</g>
      <rect x="6" y="14" width="308" height="12" rx="3" fill="#23262f" />
      <path d="M14 26 L60 26 M14 26 L14 70 M14 26 L52 58 M26 26 Q30 44 14 46 M40 26 Q44 58 14 62" fill="none" stroke="#3a3f4b" stroke-width="1" />
      <rect x="62" y="40" width="196" height="40" rx="5" fill="#0a0b0e" stroke="#5a0c10" stroke-width="2" />
      <text class="cv-neon" x="160" y="67" text-anchor="middle" font-size="19" font-weight="800" letter-spacing="3" fill="#ff4a40" font-family="Inter, sans-serif">GENESIS</text>
      <rect x="104" y="98" width="112" height="202" fill="#050506" />
      <polygon class="cv-doorglow" points="166,104 210,104 210,300 166,300" fill="url(#cv-doorlight)" />
      <polygon points="110,104 166,112 166,300 110,300" fill="#2a1c17" />
      <g stroke="#1d130f" stroke-width="2"><line x1="128" y1="107" x2="128" y2="300" /><line x1="147" y1="110" x2="147" y2="300" /></g>
      <circle cx="158" cy="208" r="4" fill="#c9a35c" />
      <g class="cv-peek"><circle cx="182" cy="170" r="3" fill="#fff" /><circle cx="196" cy="170" r="3" fill="#fff" /><circle cx="182.6" cy="170" r="1.4" fill="#050506" /><circle cx="196.6" cy="170" r="1.4" fill="#050506" /></g>
      <ellipse class="cv-doorglow" cx="190" cy="298" rx="78" ry="12" fill="url(#cv-red)" />
      ${talisman(74, 104, 't1')}${talisman(232, 112, 't2')}${talisman(252, 96, 't3')}
      <g class="cv-lantern">
        <line x1="46" y1="26" x2="46" y2="96" stroke="#3a3f4b" stroke-width="2" />
        <circle cx="46" cy="124" r="44" fill="url(#cv-red)" opacity=".6" />
        <ellipse cx="46" cy="122" rx="20" ry="26" fill="#c5222b" /><rect x="34" y="94" width="24" height="6" rx="2" fill="#1b1d24" /><rect x="34" y="144" width="24" height="6" rx="2" fill="#1b1d24" />
        <g stroke="#7a1218" stroke-width="1.4"><line x1="38" y1="100" x2="38" y2="144" /><line x1="46" y1="98" x2="46" y2="146" /><line x1="54" y1="100" x2="54" y2="144" /></g>
        <path d="M46 150 v14 M42 164 h8" stroke="#f2c94c" stroke-width="2" />
      </g>
      <g fill="#7a1218" opacity=".8" transform="translate(262 196) rotate(12)"><ellipse cx="0" cy="8" rx="9" ry="11" /><rect x="-9" y="-12" width="3.4" height="14" rx="1.7" /><rect x="-4.4" y="-17" width="3.4" height="18" rx="1.7" /><rect x=".4" y="-18" width="3.4" height="19" rx="1.7" /><rect x="5.2" y="-14" width="3.4" height="15" rx="1.7" /><rect x="9" y="1" width="3.4" height="11" rx="1.7" transform="rotate(50 9 1)" /></g>
      <g class="cv-fog" fill="#c7d2e0" opacity=".12"><ellipse cx="60" cy="292" rx="90" ry="14" /><ellipse cx="230" cy="296" rx="110" ry="12" /></g>
    </svg>`;
  }

  return { mountDefs, seated, skillArt, genesisArt };
})();
