/*
 * Hình minh hoạ vẽ bằng SVG cho bản concept: poster từng phòng chơi và mã QR giả lập.
 * Không dùng ảnh thật của Genesis; mọi hình ở đây tự vẽ để dựng giao diện.
 */
window.Art = (() => {
  let seq = 0;

  // Mỗi hình nhận (A = màu nhấn, L = màu sáng, D = màu nền) và trả về các phần tử SVG trong khung 300 × 400
  const ART = {
    gone: (A, L, D, id) => `
      <path d="M150 0v70" stroke="${L}" stroke-width="2"/>
      <path d="M128 70h44l12 20h-68z" fill="${L}"/>
      <path class="a-flick" d="M116 90 36 400h228L184 90z" fill="url(#${id}-cone)"/>
      <g stroke="${A}" stroke-width="6" stroke-linecap="round" fill="none"><path d="M118 212v140M118 292h66v60M184 292v0"/></g>
      <g class="a-dash" stroke="${L}" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round" fill="none">
        <circle cx="152" cy="198" r="20"/><path d="M152 218v62h34v64M152 238l30 22"/>
      </g>`,
    morgue: (A, L, D) => {
      const doors = [];
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++) {
          if (r === 1 && c === 1) continue;
          const x = 42 + c * 74;
          const y = 78 + r * 84;
          doors.push(`<rect x="${x}" y="${y}" width="68" height="76" rx="3" fill="${D}" stroke="${A}" stroke-width="2"/><rect x="${x + 26}" y="${y + 58}" width="16" height="5" rx="2" fill="${A}"/>`);
        }
      return `
      <path class="a-flick" d="M30 52h240" stroke="${L}" stroke-width="5" stroke-linecap="round"/>
      ${doors.join('')}
      <rect x="116" y="162" width="68" height="76" rx="3" fill="#020403" stroke="${L}" stroke-width="2"/>
      <path d="M112 232h76l22 118H90z" fill="#d6e2dc"/>
      <ellipse cx="136" cy="238" rx="9" ry="15" fill="#b9c8c1"/><ellipse cx="164" cy="238" rx="9" ry="15" fill="#b9c8c1"/>
      <g class="a-sway" style="transform-origin:164px 250px"><path d="M164 250v22" stroke="#31403a" stroke-width="1.5"/><rect x="152" y="272" width="24" height="15" rx="2" fill="#f3e9c8"/><text x="164" y="283" font-size="9" font-family="monospace" font-weight="700" text-anchor="middle" fill="#7a1218">07</text></g>
      <path class="a-drop" d="M76 330c5 8 7 12 7 16a7 7 0 0 1-14 0c0-4 2-8 7-16z" fill="#e0242f"/>`;
    },
    hide: (A, L, D) => `
      <text x="150" y="48" font-size="12" font-family="monospace" letter-spacing="4" text-anchor="middle" fill="${L}" opacity=".7">5 · 10 · 15 · 20</text>
      <rect x="62" y="66" width="176" height="290" rx="4" fill="${D}" stroke="${A}" stroke-width="4"/>
      <rect x="72" y="76" width="66" height="270" fill="#0c0714" stroke="${A}" stroke-width="2"/>
      <rect x="138" y="76" width="24" height="270" fill="#000"/>
      <path d="M162 76h66v270h-66z" fill="#0c0714" stroke="${A}" stroke-width="2"/>
      <circle cx="128" cy="214" r="4" fill="${L}"/><circle cx="172" cy="214" r="4" fill="${L}"/>
      <g class="a-peek"><ellipse cx="150" cy="170" rx="8" ry="5" fill="#fff"/><circle cx="151" cy="170" r="3" fill="#e0242f"/></g>
      <g fill="${L}" opacity=".9"><rect x="157" y="246" width="9" height="5" rx="2.5"/><rect x="157" y="254" width="10" height="5" rx="2.5"/><rect x="157" y="262" width="9" height="5" rx="2.5"/><rect x="157" y="270" width="8" height="5" rx="2.5"/></g>`,
    illusion: (A, L) => `
      <g class="a-spin" style="transform-origin:150px 196px" fill="none" stroke-width="2.5">
        ${[200, 164, 130, 98, 68].map((s, i) => `<rect x="${150 - s / 2}" y="${196 - s / 2}" width="${s}" height="${s}" transform="rotate(${i * 11} 150 196)" stroke="${i % 2 ? L : A}" opacity="${0.5 + i * 0.1}"/>`).join('')}
      </g>
      <path d="M108 196q42-36 84 0q-42 36-84 0z" fill="${L}"/>
      <circle cx="150" cy="196" r="15" fill="#0b0b1e"/><circle class="a-pupil" cx="150" cy="196" r="6" fill="${A}"/><circle cx="145" cy="191" r="3" fill="#fff"/>`,
    ngai: (A, L) => `
      <g class="a-sway" style="transform-origin:150px 40px">
        <path d="M150 20v32" stroke="${L}" stroke-width="2"/>
        <rect x="104" y="52" width="92" height="236" fill="#e8c45a"/>
        <g stroke="#a3161d" stroke-width="6" stroke-linecap="round" fill="none">
          <path d="M150 74v190M120 104h60M126 140h48M120 180q30 22 60 0M132 216h36M126 246h48"/><circle cx="150" cy="120" r="12"/>
        </g>
        <g stroke="#1a0c0c" stroke-width="2.5" stroke-linecap="round"><path d="M90 150l44 14M212 196l-46 10M96 250l40-12"/></g>
      </g>
      <g class="a-flame"><path d="M70 330c8 12 12 18 12 26a12 12 0 0 1-24 0c0-8 4-14 12-26z" fill="#ffb347"/></g>
      <rect x="64" y="362" width="12" height="38" fill="${L}"/>
      <g class="a-flame"><path d="M230 330c8 12 12 18 12 26a12 12 0 0 1-24 0c0-8 4-14 12-26z" fill="#ffb347"/></g>
      <rect x="224" y="362" width="12" height="38" fill="${L}"/>`,
    bride: (A, L) => `
      <path class="a-veil" d="M150 78c-66 0-90 86-98 232h196c-8-146-32-232-98-232z" fill="${A}" opacity=".88"/>
      <path d="M150 92c-50 0-70 74-78 204" fill="none" stroke="${L}" stroke-width="1.5" opacity=".5"/>
      <ellipse cx="150" cy="166" rx="34" ry="42" fill="#12040a"/>
      <g class="a-peek" fill="#fff"><circle cx="138" cy="162" r="2.5"/><circle cx="162" cy="162" r="2.5"/></g>
      <path d="M92 350q32-30 66-8l46 9q11 2 9 14H92z" fill="#e0242f" stroke="${L}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M118 340q14 8 30 4" fill="none" stroke="#ffd36b" stroke-width="2"/>`,
    death: (A, L) => {
      const kids = [[48, 316], [98, 290], [150, 306], [202, 282], [254, 300]];
      return `
      <circle cx="214" cy="86" r="42" fill="${L}" opacity=".92"/><circle cx="200" cy="74" r="8" fill="${A}" opacity=".35"/><circle cx="228" cy="100" r="5" fill="${A}" opacity=".35"/>
      <path d="M0 132q60-22 120 0t180-6" fill="none" stroke="${L}" stroke-width="2" opacity=".3"/>
      <ellipse cx="150" cy="420" rx="240" ry="130" fill="${A}" opacity=".4"/>
      <path d="${kids.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y + 22}`).join(' ')}" fill="none" stroke="#050805" stroke-width="5" stroke-linecap="round"/>
      ${kids.map(([x, y], i) => `<g class="a-bob" style="animation-delay:${-i * 0.35}s"><circle cx="${x}" cy="${y}" r="11" fill="#050805"/><path d="M${x - 11} ${y + 52}l11-42 11 42z" fill="#050805"/>${i === 4 ? `<g class="a-peek" fill="#e0242f"><circle cx="${x - 4}" cy="${y}" r="2"/><circle cx="${x + 4}" cy="${y}" r="2"/></g>` : ''}</g>`).join('')}`;
    },
    xfiles: (A, L, D) => `
      <rect x="92" y="62" width="116" height="268" fill="${D}" stroke="${L}" stroke-width="2" opacity=".95"/>
      <rect x="104" y="76" width="92" height="104" fill="none" stroke="${L}" stroke-width="1.5" opacity=".4"/>
      <rect x="104" y="196" width="92" height="120" fill="none" stroke="${L}" stroke-width="1.5" opacity=".4"/>
      <rect x="130" y="92" width="40" height="26" rx="3" fill="${A}"/><text x="150" y="111" font-size="18" font-family="Oswald, sans-serif" font-weight="700" text-anchor="middle" fill="#14110a">31</text>
      <circle cx="150" cy="140" r="4" fill="${L}"/><circle cx="192" cy="206" r="5" fill="${A}"/>
      <g class="a-tape"><g transform="rotate(-17 150 220)"><rect x="-20" y="208" width="340" height="24" fill="${A}"/><text x="150" y="225" font-size="11" font-family="monospace" font-weight="700" letter-spacing="3" text-anchor="middle" fill="#14110a">HIỆN TRƯỜNG · CẤM VÀO · HIỆN TRƯỜNG</text></g>
      <g transform="rotate(13 150 286)"><rect x="-20" y="276" width="340" height="20" fill="${A}" opacity=".85"/></g></g>
      <g fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M226 372a16 16 0 0 1 32 0M218 372a24 24 0 0 1 48 0M210 372a32 32 0 0 1 64 0M234 372a8 8 0 0 1 16 0"/></g>`,
    dance: (A, L) => `
      <path d="M0 0h96q-34 160-12 400H0z" fill="${A}" opacity=".55"/><path d="M300 0h-96q34 160 12 400h84z" fill="${A}" opacity=".55"/>
      <path class="a-flick" d="M150 0 62 400h176z" fill="${L}" opacity=".13"/>
      <ellipse cx="150" cy="340" rx="60" ry="9" fill="#000" opacity=".5"/>
      <g class="a-sway" style="transform-origin:150px 330px">
        <g stroke="${L}" stroke-width="4.5" stroke-linecap="round" fill="none"><path d="M144 204q-30-28-32-62M156 204q30-28 32-62M146 248l-5 82M154 248l15 54-10 26"/></g>
        <path d="M150 194l-9 46h18z" fill="${L}"/><ellipse cx="150" cy="244" rx="40" ry="10" fill="${L}"/>
        <circle cx="150" cy="180" r="12" fill="${L}"/><g class="a-peek" fill="#e0242f"><circle cx="146" cy="180" r="1.8"/><circle cx="154" cy="180" r="1.8"/></g>
      </g>`,
  };

  function poster(room) {
    const id = `p${++seq}`;
    const [D, A, L] = room.c;
    return `<svg class="poster" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Poster minh hoạ phòng ${room.name}">
      <defs>
        <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${D}"/><stop offset="1" stop-color="#050507"/></linearGradient>
        <radialGradient id="${id}-glow" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="${A}" stop-opacity=".5"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L}" stop-opacity=".42"/><stop offset="1" stop-color="${L}" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}-fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#050507" stop-opacity="0"/><stop offset="1" stop-color="#050507" stop-opacity=".95"/></linearGradient>
      </defs>
      <rect width="300" height="400" fill="url(#${id}-bg)"/>
      <rect width="300" height="400" fill="url(#${id}-glow)"/>
      <g class="poster-art">${(ART[room.art] || ART.gone)(A, L, D, id)}</g>
      <rect width="300" height="400" fill="url(#${id}-fade)"/>
    </svg>`;
  }

  // Mã QR GIẢ: các ô sinh ngẫu nhiên theo seed, có dải chữ DEMO đè lên giữa. Không quét được, không chứa thông tin thanh toán.
  function qr(seed) {
    let h = 2166136261;
    for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
    const rand = () => ((h = (Math.imul(h, 1664525) + 1013904223) >>> 0) / 4294967296);
    const N = 25;
    const cells = [];
    const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!finder(x, y) && rand() > 0.52) cells.push(`<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`);
    const eye = (x, y) => `<path d="M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z" fill-rule="evenodd"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return `<svg class="qr" viewBox="-2 -2 29 29" role="img" aria-label="Mã QR giả lập, không dùng để thanh toán">
      <rect x="-2" y="-2" width="29" height="29" fill="#fff"/>
      <g fill="#0b0d12">${cells.join('')}${eye(0, 0)}${eye(N - 7, 0)}${eye(0, N - 7)}</g>
      <rect x="-2" y="9.4" width="29" height="6.2" fill="#e0242f"/>
      <text x="12.5" y="14.1" font-size="4.4" font-family="Oswald, Arial, sans-serif" font-weight="700" letter-spacing=".6" text-anchor="middle" fill="#fff">DEMO</text>
    </svg>`;
  }

  return { poster, qr };
})();
