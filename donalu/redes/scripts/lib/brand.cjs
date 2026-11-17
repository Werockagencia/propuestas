// Símbolos SVG del manual de marca Doña Lú (wordmark, isotipo, ladera/curvas de nivel, defs de la bolsa).
// Portado de scratchpad/marca/build3.js (manual v3). Se inyecta oculto al inicio de cada slides.html.
const fs = require('fs'), path = require('path');
const svg = fs.readFileSync(path.join(__dirname, '../../assets/brand/wordmark.svg'), 'utf8');
const rd = s => s.replace(/(\d+\.\d)\d+/g, '$1');
const d = rd(svg.match(/ d="([^"]+)"/)[1]);
const subs = d.split(/(?=M)/);
// subpaths: 0 = L, 9 = counter of L loop, 5 = u, 3 = acute accent
const L = subs[0] + subs[9], U = subs[5], ACC = subs[3];
const wm = `<symbol id="wm" viewBox="0 0 2880 1008"><path fill="currentColor" fill-rule="evenodd" d="${d}"/></symbol>`;
const isoG = `<g transform="translate(600 612) scale(.8) translate(-2284 -514)"><path fill="currentColor" fill-rule="evenodd" d="${L}${U}"/><path style="fill:var(--acc,currentColor)" d="${ACC}"/></g>`;
const iso = `<symbol id="iso" viewBox="0 0 1200 1200">${isoG}</symbol>`;
const isoc = `<symbol id="isoc" viewBox="0 0 1200 1200"><circle cx="600" cy="600" r="566" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="600" cy="600" r="530" fill="none" stroke="currentColor" stroke-width="5"/><g transform="translate(600 600) scale(.82) translate(-600 -600)">${isoG}</g></symbol>`;

function ring(k, cx, cy, step) {
  const pts = [], N = 64;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const a = 0.2 * Math.sin(2 * t + 1 + 0.05 * k) + 0.12 * Math.sin(3 * t + 2 + 0.08 * k) + 0.06 * Math.sin(5 * t + 0.1 * k) + 0.035 * Math.sin(7 * t + 0.4 + 0.12 * k);
    const r = step * (k + 0.6) * (1 + a * Math.min(1, k / 6));
    pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t) * 0.82]);
  }
  let s = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
    s += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return s + 'Z';
}
let rings = '';
for (let k = 0; k < 26; k++) rings += `<path vector-effect="non-scaling-stroke" d="${ring(k, 560, 430, 30)}"/>`;
const topo = `<symbol id="topo" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor">${rings}</g></symbol>`;
const pdefs = `
<clipPath id="pclip"><path d="M10 6Q10 0 16 0H284Q290 0 290 6L292 40C297 160 300 300 298 400C297 432 292 446 270 448H30C8 446 3 432 2 400C0 300 3 160 8 40Z"/></clipPath>
<linearGradient id="pshade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".12" stop-color="#000" stop-opacity=".08"/><stop offset=".3" stop-color="#fff" stop-opacity=".13"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
<linearGradient id="pvshade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset=".14" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<pattern id="pseal" width="4" height="46" patternUnits="userSpaceOnUse"><rect width="2" height="46" fill="#fff" fill-opacity=".09"/><rect x="2" width="2" height="46" fill="#000" fill-opacity=".1"/></pattern>
<filter id="pgrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
<filter id="pblur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="lshadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-opacity=".25"/></filter>`;


const { bag, bagDefs } = require('./bag.cjs');
// Bloque oculto con todos los símbolos: va al inicio del <body> de cada slides.html
const symbols = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${wm}${iso}${isoc}${topo}${pdefs}${bagDefs}</defs></svg>`;
// Topo en línea (para fondos verdes): <svg class="topo"><use href="#topo"/></svg>
module.exports = { symbols, bag, ring };
