/*
 * Rig nhân vật 2D đi bộ (SVG). Chu kỳ bước chân được tính từ quãng đường cuộn,
 * nên cuộn nhanh -> đi nhanh, dừng cuộn -> đứng lại, cuộn ngược -> quay đầu đi lùi.
 */
window.Walker = (() => {
  const THIGH = 52;
  const SHIN = 59; // tính cả đế giày

  function create(root) {
    const rig = root.querySelector('#rig');
    const parts = {
      legNear: root.querySelector('#leg-near'),
      legFar: root.querySelector('#leg-far'),
      armNear: root.querySelector('#arm-near'),
      armFar: root.querySelector('#arm-far'),
    };
    const base = {};
    for (const [k, el] of Object.entries(parts)) {
      base[k] = el.getAttribute('transform');
    }
    const sub = (el) => el.querySelector('.sub');

    let phase = 0;
    let amp = 0;
    let facing = 1;

    const rad = Math.PI / 180;
    const extent = (t, k) => THIGH * Math.cos(t * rad) + SHIN * Math.cos((t + k) * rad);

    function pose() {
      const p = phase;
      const s = Math.sin(p);
      const c = Math.cos(p);
      // Đùi: âm = bước về phía trước (nhân vật hướng sang phải)
      const tN = -28 * s * amp;
      const tF = 28 * s * amp;
      const kN = (6 + 48 * Math.max(0, c)) * amp;
      const kF = (6 + 48 * Math.max(0, -c)) * amp;
      const aN = 24 * s * amp;
      const aF = -24 * s * amp;
      const fN = -8 - 20 * Math.max(0, -s) * amp;
      const fF = -8 - 20 * Math.max(0, s) * amp;

      parts.legNear.setAttribute('transform', `${base.legNear} rotate(${tN})`);
      sub(parts.legNear).setAttribute('transform', `translate(0 ${THIGH}) rotate(${kN})`);
      parts.legFar.setAttribute('transform', `${base.legFar} rotate(${tF})`);
      sub(parts.legFar).setAttribute('transform', `translate(0 ${THIGH}) rotate(${kF})`);
      parts.armNear.setAttribute('transform', `${base.armNear} rotate(${aN})`);
      sub(parts.armNear).setAttribute('transform', `translate(0 38) rotate(${fN})`);
      parts.armFar.setAttribute('transform', `${base.armFar} rotate(${aF})`);
      sub(parts.armFar).setAttribute('transform', `translate(0 38) rotate(${fF})`);

      // Hạ hông theo chân trụ để bàn chân luôn chạm đất
      const drop = THIGH + SHIN - Math.max(extent(tN, kN), extent(tF, kF));
      rig.setAttribute('transform', `translate(0 ${drop.toFixed(2)}) rotate(${(2.5 * amp).toFixed(2)} 72 139)`);
    }

    /**
     * @param {number} dx   quãng đường thế giới đã dịch trong frame (px, + là đi tới)
     * @param {number} dt   thời gian frame (giây)
     * @param {number} stride px cho một chu kỳ 2 bước
     */
    function update(dx, dt, stride) {
      const speed = Math.abs(dx) / Math.max(dt, 1 / 240);
      const target = Math.min(1, speed / 160);
      amp += (target - amp) * Math.min(1, dt * (target > amp ? 10 : 6));
      if (amp < 0.002) amp = 0;
      phase += (Math.abs(dx) / stride) * Math.PI * 2;
      if (Math.abs(dx) > 0.4) {
        const dir = dx > 0 ? 1 : -1;
        if (dir !== facing) {
          facing = dir;
          root.style.setProperty('--facing', facing);
        }
      }
      pose();
    }

    function reset() {
      phase = 0;
      amp = 0;
      facing = 1;
      root.style.setProperty('--facing', 1);
      pose();
    }

    pose();
    return { update, reset, get walking() { return amp > 0.05; } };
  }

  return { create };
})();
