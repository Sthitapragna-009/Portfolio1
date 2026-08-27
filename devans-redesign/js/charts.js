/* DEVAN'S — redesign — chart generators
   Every function returns SVG/HTML markup. No chart library — plain SVG so it
   stays crisp and matches the hairline, editorial look of the rest of the site.
   The roast gauge deliberately echoes the "Coffee strength" scale printed on
   Devan's own packaging (a dotted line with a single filled marker). */

const ACCENT = "#B03A22";
const INK = "#17130F";
const LINE = "#D9D0BE";
const ROAST_RAMP = ["#D9A05B", "#B87840", "#8C5228", "#4A2A14"]; // Light–Medium → Dark, one hue family

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/* ---------- Roast gauge — mirrors the strength scale printed on every Devan's bag ---------- */
function roastGauge(roastIndex, { withLabels = false } = {}) {
  const labels = ROAST_LEVELS;
  const w = withLabels ? 300 : 128;
  const h = withLabels ? 34 : 14;
  const y = withLabels ? 8 : 7;
  const pad = withLabels ? 4 : 3;
  const usable = w - pad * 2;
  const step = usable / (labels.length - 1);
  const activeX = pad + step * roastIndex;

  let ticks = "";
  labels.forEach((lab, i) => {
    const x = pad + step * i;
    const active = i === roastIndex;
    ticks += `<circle cx="${x}" cy="${y}" r="${active ? 4.5 : 2.5}" fill="${active ? ACCENT : "var(--paper)"}" stroke="${active ? ACCENT : "var(--line)"}" stroke-width="1.4"/>`;
    if (withLabels) {
      ticks += `<text x="${x}" y="${y + 20}" text-anchor="${i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}" class="gauge-label" ${active ? 'font-weight="700"' : ""}>${lab}</text>`;
    }
  });

  return `<svg class="roast-gauge" viewBox="0 0 ${w} ${withLabels ? 34 : 14}" width="${w}" height="${withLabels ? 34 : 14}" role="img" aria-label="Roast level: ${labels[roastIndex]}">
    <line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="var(--line)" stroke-width="1.4" stroke-dasharray="1 4" stroke-linecap="round"/>
    <line x1="${pad}" y1="${y}" x2="${activeX}" y2="${y}" stroke="${ACCENT}" stroke-width="1.4"/>
    ${ticks}
  </svg>`;
}

/* ---------- Mini rings — compact per-card infographic (Aroma / Body / Acidity) ---------- */
function miniRings(metrics) {
  const keys = ["aroma", "body", "acidity"];
  const r = 18;
  const stroke = 3.5;
  const circ = 2 * Math.PI * r;
  const size = (r + stroke) * 2;
  let out = `<div class="mini-rings" role="img" aria-label="Aroma ${metrics.aroma}, Body ${metrics.body}, Acidity ${metrics.acidity} out of 100">`;
  keys.forEach((k) => {
    const val = metrics[k];
    const frac = Math.max(0, Math.min(1, val / 100));
    const dash = frac * circ;
    out += `
      <div class="ring-item">
        <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
          <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
          <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${ACCENT}" stroke-width="${stroke}"
            stroke-linecap="round" stroke-dasharray="${dash} ${circ}"
            transform="rotate(-90 ${size / 2} ${size / 2})"/>
          <text x="${size / 2}" y="${size / 2 + 3.5}" text-anchor="middle" class="ring-value">${val}</text>
        </svg>
        <span class="ring-label">${METRIC_META[k].label}</span>
      </div>`;
  });
  out += `</div>`;
  return out;
}

/* ---------- Taste scale — dotted-line + filled-dot rows, styled after a
   specialty-coffee tasting card (5 dots per axis, filled = intensity). ---------- */
function tasteScale(metrics, { keys = ["aroma", "body", "acidity"], dots = 5 } = {}) {
  const w = 108, h = 12, pad = 6;
  const usable = w - pad * 2;
  const step = usable / (dots - 1);

  let rows = "";
  keys.forEach((k) => {
    const val = metrics[k];
    const filled = Math.max(1, Math.min(dots, Math.round((val / 100) * dots)));
    const activeX = pad + step * (filled - 1);
    let ticks = "";
    for (let i = 0; i < dots; i++) {
      const x = pad + step * i;
      const on = i < filled;
      ticks += `<circle cx="${x}" cy="${h / 2}" r="${on ? 3.6 : 2.4}" fill="${on ? ACCENT : "var(--paper)"}" stroke="${on ? ACCENT : "var(--line)"}" stroke-width="1.3"/>`;
    }
    rows += `
      <div class="scale-row">
        <span class="scale-label">${METRIC_META[k].label}</span>
        <svg class="scale-dots" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${METRIC_META[k].label}: ${val} out of 100">
          <line x1="${pad}" y1="${h / 2}" x2="${w - pad}" y2="${h / 2}" stroke="var(--line)" stroke-width="1.3" stroke-dasharray="1 4" stroke-linecap="round"/>
          <line x1="${pad}" y1="${h / 2}" x2="${activeX}" y2="${h / 2}" stroke="${ACCENT}" stroke-width="1.3"/>
          ${ticks}
        </svg>
      </div>`;
  });
  return `<div class="taste-scale">${rows}</div>`;
}

/* ---------- Bean icon — small roast-coloured bean glyph, used on the Create
   Blend slider to mark each roast stage. ---------- */
function beanIcon(roastIndex, { active = false, size = 26 } = {}) {
  const fill = ROAST_RAMP[roastIndex];
  return `<svg class="bean-icon ${active ? "is-active" : ""}" viewBox="0 0 32 32" width="${size}" height="${size}" role="img" aria-label="${ROAST_LEVELS[roastIndex]} roast">
    <ellipse cx="16" cy="16" rx="13" ry="15" fill="${fill}" opacity="${active ? 1 : 0.45}" transform="rotate(-18 16 16)"/>
    <path d="M16 3 C16 12, 16 20, 16 29" stroke="${active ? "#fff" : "var(--paper)"}" stroke-width="2" fill="none" opacity="${active ? 0.9 : 0.6}" transform="rotate(-18 16 16)"/>
  </svg>`;
}

/* ---------- Flavour Bloom — 6-axis radar chart for product pages ---------- */
function flavourBloom(metrics, { size = 380 } = {}) {
  const order = ["aroma", "body", "acidity", "sweetness", "bitterness", "aftertaste"];
  const cx = size / 2;
  const cy = size / 2 - 6;
  const maxR = size * 0.3;
  const n = order.length;

  let guides = "";
  [0.25, 0.5, 0.75, 1].forEach((f) => {
    const pts = order
      .map((_, i) => {
        const p = polar(cx, cy, maxR * f, (360 / n) * i);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    guides += `<polygon points="${pts}" class="bloom-guide" ${f === 1 ? 'stroke-width="1.25"' : ""}/>`;
  });

  let spokes = "";
  let labels = "";
  order.forEach((k, i) => {
    const ang = (360 / n) * i;
    const end = polar(cx, cy, maxR, ang);
    spokes += `<line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" class="bloom-spoke"/>`;
    const lp = polar(cx, cy, maxR + 30, ang);
    let anchor = "middle";
    if (lp.x > cx + 4) anchor = "start";
    else if (lp.x < cx - 4) anchor = "end";
    labels += `<text x="${lp.x}" y="${lp.y}" text-anchor="${anchor}" class="bloom-axis-label">${METRIC_META[k].label}</text>`;
  });

  const pts = order.map((k, i) => {
    const frac = Math.max(0, Math.min(1, metrics[k] / 100));
    return { ...polar(cx, cy, maxR * frac, (360 / n) * i), val: metrics[k], key: k, ang: (360 / n) * i };
  });
  const dataPts = pts.map((p) => `${p.x},${p.y}`).join(" ");

  let dots = "";
  pts.forEach((p) => {
    const lp = polar(cx, cy, maxR * (p.val / 100) + 14, p.ang);
    let anchor = "middle";
    if (lp.x > cx + 4) anchor = "start";
    else if (lp.x < cx - 4) anchor = "end";
    dots += `
      <circle cx="${p.x}" cy="${p.y}" r="4" class="bloom-dot"><title>${METRIC_META[p.key].label}: ${p.val}/100</title></circle>
      <text x="${lp.x}" y="${lp.y}" text-anchor="${anchor}" class="bloom-value">${p.val}</text>`;
  });

  return `
  <svg class="flavour-bloom" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Flavour profile radar chart">
    <defs>
      <radialGradient id="bloomFill-${size}" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0.04"/>
      </radialGradient>
    </defs>
    ${guides}
    ${spokes}
    <polygon points="${dataPts}" fill="url(#bloomFill-${size})" stroke="${ACCENT}" stroke-width="2" stroke-linejoin="round"/>
    ${dots}
    ${labels}
  </svg>`;
}
