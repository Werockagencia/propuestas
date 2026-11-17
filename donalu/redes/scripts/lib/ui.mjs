// Piezas de construcción de las láminas (HTML). Medidas en px sobre lienzo 1080×1350 (feed) o 1080×1920 (historia).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { symbols, bag } = require('./brand.cjs');

const box = ({ l, t, r, b, w, h }) => [l != null && `left:${l}px`, t != null && `top:${t}px`, r != null && `right:${r}px`, b != null && `bottom:${b}px`, w != null && `width:${w}px`, h != null && `height:${h}px`].filter(Boolean).join(';');

/** Foto con la luz Doña Lú. Sin medidas = a sangre. pos = object-position. raw = sin ajuste (catálogo). */
export const ph = (src, o = {}) => `<div class="ph${o.raw ? ' raw' : ''}${o.cls ? ' ' + o.cls : ''}${o.l == null && o.t == null ? ' full' : ''}" style="${box(o)}${o.style ? ';' + o.style : ''}"><img src="../../assets/photos/${src}" alt="" style="object-position:${o.pos || '50% 50%'}"></div>`;
export const topo = (cls = '', style = '') => `<svg class="topo ${cls}" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" style="${style}" aria-hidden="true"><use href="#topo" width="1000" height="1000"/></svg>`;
export const wm = (o) => `<svg class="wm" viewBox="0 0 2880 1008" style="${box(o)};color:${o.color || 'var(--verde)'}${o.style ? ';' + o.style : ''}" aria-label="Doña Lú"><use href="#wm" width="2880" height="1008"/></svg>`;
export const iso = (o) => `<svg class="iso" viewBox="0 0 1200 1200" style="position:absolute;${box(o)};color:${o.color || 'var(--crema)'};--acc:${o.acc || 'var(--cereza)'}"><use href="#${o.ring ? 'isoc' : 'iso'}" width="1200" height="1200"/></svg>`;
export const arrow = `<svg viewBox="0 0 46 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M0 7h44M37 1l7 6-7 6"/></svg>`;
export const beans = (k, extra = '') => `<div class="beans" style="${extra}">${[0, 1, 2].map(i => `<i${i < k ? ' class="on"' : ''}></i>`).join('')}</div>`;
export const pos = (o, inner, cls = '') => `<div class="${cls}" style="position:absolute;${box(o)}">${inner}</div>`;
export const tx = (o, inner, cls = "") => `<div class="tx${o.mid ? " mid" : ""}${cls ? " " + cls : ""}" style="${box(o)}">${inner}</div>`;
export const bagAt = (view, proc, o) => `<div style="position:absolute;${box(o)};z-index:${o.z || 6}${o.style ? ';' + o.style : ''}">${bag(view, proc).replace('<svg ', `<svg style="width:100%;height:auto" `)}</div>`;

// Íconos lineales de proceso (los del manual) en trazo dorado
export const ICON = {
  lavado: '<path d="M12 3.5c-2.6 3.6-5.5 7.2-5.5 10.4a5.5 5.5 0 0 0 11 0c0-3.2-2.9-6.8-5.5-10.4z"/><path d="M9.6 15.2a2.6 2.6 0 0 0 2.4 2"/>',
  honey: '<path d="M12 3l7 4v8l-7 4-7-4V7z"/><path d="M12 8.6l3.4 2v3.9L12 16.4l-3.4-1.9v-3.9z"/>',
  natural: '<circle cx="8.5" cy="15" r="4"/><circle cx="15.5" cy="15" r="4"/><path d="M8.5 11c.5-3.5 2-5.5 3.5-6.5 1.5 1 3 3 3.5 6.5"/><path d="M12 4.5c1.8-1.6 4-1.8 5.5-1"/>',
  finca: '<path d="M2.5 19.5 9 9l4 6 2.5-3.5 6 8z"/><circle cx="17" cy="6" r="2"/>',
  casa: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5v10h13v-10"/><path d="M10 19.5v-5h4v5"/>',
  chat: '<path d="M4.2 19.8 5.3 16A8 8 0 1 1 8.2 18.8z"/><path d="M9.2 8.6c.3 2.8 2.5 5.3 5.6 6.2l1.2-1.4-1.9-1-.9.8c-1-.5-2-1.5-2.4-2.5l.8-.9-.9-1.9z"/>',
  web: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5s1.1-5.9 3.6-8.5z"/>',
  regalo: '<path d="M3.5 8.5h17v11h-17zM2.5 5h19v3.5h-19zM12 5v14.5"/><path d="M12 5c-1.5-2.5-5-2.5-5 0M12 5c1.5-2.5 5-2.5 5 0"/>',
};
export const icon = (n, size, color = 'var(--oro)', sw = 1.4) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block">${ICON[n]}</svg>`;
