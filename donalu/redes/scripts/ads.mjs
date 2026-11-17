// Anuncios de Meta para los kits de Navidad (fuente única de los anuncios): genera anuncios/piezas/<id>/slides.html + copy.md y anuncios/ANUNCIOS.md.
// Plan: ../meta-ads/PLAN-META-ADS-NAVIDAD.md · Fase 1: un anuncio por kit con la MISMA plantilla (solo cambia el kit) + 3 anuncios principales.
// Datos de los kits: catálogo de Navidad de Diana (kits-navidad/_fuente/build.js). Fotos: ../kits-fotos (tratamiento nuevo), nunca ampliadas.
// Uso: node scripts/ads.mjs && PIEZAS=anuncios/piezas node scripts/render.mjs && PIEZAS=anuncios/piezas node scripts/preview.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { symbols, topo, wm, iso, icon } from './lib/ui.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
export const WA_NUM = '322 470 2667';
export const WA = '573224702667';
export const LANDING = 'https://donalu.com.co/kits-navidad/';
const cop = (v) => '$' + v.toLocaleString('es-CO');
const utm = (id) => `${LANDING}?utm_source=meta&utm_medium=paid&utm_campaign=nav-prueba&utm_content=${id}#${id}`;
const waLink = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;

// Kits (catálogo). t = título del anuncio (sale del contenido real del kit), s = contenido, b = sello del catálogo
export const kits = [
  { id: 'k01', name: 'Cesta vertical 1', price: 59000, t: 'Lavado y <em>Honey</em>', s: '2 × 250 g · cesta de madera pino', b: 'Para empezar', p: 'Dos maneras de tomar el mismo café de la finca: Lavado y Honey, 250 g de cada uno, en una cesta de madera pino lista para regalar.' },
  { id: 'k02', name: 'Cesta vertical 2', price: 99000, t: 'Café y <em>mug térmico</em>', s: '250 g Lavado · mug térmico · cesta de madera pino', p: 'Para quien se toma el café en camino: 250 g de Lavado y un mug térmico, en una cesta de madera pino.' },
  { id: 'k03', name: 'Cesta vertical 3', price: 139000, t: 'Café y <em>termo Owala</em>', s: '500 g Lavado · termo Owala · cesta de madera pino', b: 'Con termo Owala', p: 'Medio kilo de Lavado y un termo Owala para llevar el café a todas partes. En cesta de madera pino.' },
  { id: 'k04', name: 'Cesta horizontal 4', price: 69000, t: 'Lavado y Honey, <em>con lazo</em>', s: '2 × 250 g · cesta horizontal de madera pino', p: 'Lavado y Honey, 250 g de cada uno, en una cesta horizontal de madera pino con lazo.' },
  { id: 'k05', name: 'Cesta vertical 5', price: 99000, t: 'Café y mug, <em>lazo dorado</em>', s: '250 g Lavado · mug térmico · cesta de madera pino', p: '250 g de Lavado y un mug térmico, en una cesta de madera pino con lazo dorado.' },
  { id: 'k06', name: 'Cesta horizontal 6', price: 119000, t: 'Medio kilo <em>y mug</em>', s: '500 g Lavado · mug térmico · cesta horizontal', p: 'Medio kilo de Lavado y un mug térmico, en una cesta horizontal de madera pino.' },
  { id: 'k07', name: 'Caja Doña Lú 7', price: 119000, t: 'Los tres <em>procesos</em>', s: 'Lavado, Honey y Natural · 3 × 250 g · caja de madera', b: 'Tres procesos', p: 'Lavado, Honey y Natural, 250 g de cada uno, en una caja de madera pino. Los tres procesos de la finca para probarlos todos.' },
  { id: 'k08', name: 'Caja Doña Lú 8', price: 169000, t: 'Dos cafés <em>y mug térmico</em>', s: '250 g Lavado · 250 g Honey · mug térmico · caja', p: 'Lavado y Honey, 250 g de cada uno, y un mug térmico, en una caja de madera pino.' },
  { id: 'k09', name: 'Caja Doña Lú 9', price: 119000, t: 'Un kilo <em>de café</em>', s: '500 g Lavado · 500 g Honey · caja de madera pino', b: 'Un kilo de café', p: 'Un kilo de café de la finca: 500 g de Lavado y 500 g de Honey en una caja de madera pino.' },
  { id: 'k10', name: 'Caja Doña Lú 10', price: 199000, t: 'La caja <em>más completa</em>', s: '500 g Lavado · 500 g Honey · mug térmico · caja', b: 'La más completa', p: 'La caja más completa: 500 g de Lavado, 500 g de Honey y un mug térmico, en una caja de madera pino.' },
];

// Anuncios principales (3 ángulos del plan: hogar, empresas, recordatorio)
export const heroes = [
  { id: 'h1', slug: 'hogar', k: 'Kits de Navidad', t: 'Regale lo que <em>hubo que cuidar.</em>', s: 'Café de la finca en cestas y cajas de madera pino.', price: 'Desde $59.000', mesa: 'kit-07-mesa.jpg', est: 'kit-07-estudio.jpg', set: 'A · Regalo hogar',
    p: 'Este año, regale café de la finca. Diez kits de Navidad con Lavado, Honey y Natural, en cestas y cajas de madera pino, desde $59.000.\n\nCada grano se recogió maduro, uno por uno. Escríbanos por WhatsApp al 322 470 2667 y le ayudamos a elegir.', h: 'Kits de Navidad desde $59.000', d: 'Café que se honra, listo para regalar.' },
  { id: 'h2', slug: 'empresas', k: 'Regalos para empresas', t: 'Para su equipo <em>y sus clientes.</em>', s: 'Cajas de madera pino con café de la finca.', price: 'Cajas desde $119.000', mesa: 'kit-10-mesa.jpg', est: 'kit-10-estudio.jpg', set: 'B · Empresas',
    p: 'Un regalo de fin de año que se toma con calma: cajas de madera pino con café de nuestra finca familiar, desde $119.000.\n\nCuéntenos cuántas cajas necesita y le cotizamos por WhatsApp al 322 470 2667.', h: 'Regalos de Navidad para su equipo', d: 'Cajas con café de la finca. Cotice por WhatsApp.' },
  { id: 'h3', slug: 'recordatorio', k: 'Navidad', t: 'Un buen café no se acelera. <em>Su pedido, mejor ya.</em>', s: 'Diez kits listos para regalar.', price: 'Desde $59.000', mesa: 'kit-09-mesa.jpg', est: 'kit-09-estudio.jpg', set: 'C · Ya los conocen',
    p: 'Un buen café no se acelera. Su regalo de Navidad, mejor pedirlo ya.\n\nDiez kits con café de la finca, desde $59.000. Escríbanos por WhatsApp al 322 470 2667.', h: 'Pida su kit de Navidad', d: 'Café de la finca, listo para regalar.' },
];

const P = '../../../assets/photos/';
const shot = (f, o, extra = '') => `<div class="ph raw kitph" style="left:${o.l}px;top:${o.t}px;width:${o.w}px;height:${o.h}px${extra}"><img src="${P}${f}" alt=""></div>`;
const mast = (light) => `<div class="mast${light ? ' on-photo' : ''}"><span><b>Doña Lú</b> · <span class="no">Kits de Navidad</span></span><span>Café que se honra</span></div>`;
const seal = (b, l, t) => b ? `<div class="seal" style="left:${l}px;top:${t}px"><span>${b}</span></div>` : '';
const band = (top) => `<div class="band" style="top:${top}px"><svg class="band-edge" viewBox="0 0 1080 60" preserveAspectRatio="none"><path d="M0 60V34Q540 -6 1080 34V60Z" fill="var(--bolsa)"/><path d="M0 44Q540 4 1080 44" fill="none" stroke="var(--oro)" stroke-width="1.6"/></svg>${topo()}</div>`;
const pill = `<div class="btnlike">${icon('chat', 30, 'var(--verde)', 1.6)}<span>WhatsApp ${WA_NUM}</span></div>`;
const priceHtml = (p) => { const m = p.match(/^(.*?)\s*(\$[\d.]+)$/); return m && m[1] ? `<i>${m[1]}</i>${m[2]}` : p; };
const buyRow = (price, t) => `<div class="buy" style="top:${t}px"><span class="price">${priceHtml(price)}</span>${pill}</div>`;

const css = `<style>
.kitph{box-shadow:0 34px 60px -26px rgba(43,28,18,.55);outline:1px solid rgba(201,164,92,.6);outline-offset:14px}
.band{position:absolute;left:0;right:0;bottom:0;background:var(--bolsa);color:var(--crema);z-index:4}
.band .topo{inset:0;width:100%;height:100%;color:rgba(244,237,224,.06)}
.band-edge{position:absolute;left:0;right:0;top:-58px;width:100%;height:60px}
.seal{width:190px;height:190px;border-radius:50%;background:var(--verde);border:2px solid var(--oro);outline:1px solid rgba(201,164,92,.5);outline-offset:6px;display:flex;align-items:center;justify-content:center;text-align:center;z-index:8;transform:rotate(-8deg)}
.seal span{font:italic 400 36px/1.05 var(--serif);color:var(--oro);padding:0 22px}
.buy{position:absolute;left:var(--m);right:var(--m);display:flex;align-items:center;justify-content:space-between;z-index:10}
.price{font:300 96px/1 var(--serif);color:var(--oro);letter-spacing:-.01em;white-space:nowrap}
.price i{display:block;font:500 18px/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;font-style:normal;color:var(--kraft);margin-bottom:12px}
.buy .btnlike{white-space:nowrap}
.buy .btnlike{padding:22px 32px;font-size:22px;gap:14px}
.ad .tx{z-index:10}
.ad .d em{color:var(--oro)}
.bg-kraft.ad .mast{color:var(--cafe)}
.ad .sub{font:300 30px/1.35 var(--sans);color:var(--kraft)}
</style>`;

const kitSlides = (k) => {
  const n = k.id.slice(1);
  const f = `kit-${n}-estudio.jpg`;
  return [
    // 4:5 · foto arriba, banda verde abajo (como la bolsa: kraft arriba, banda verde con filete dorado)
    { file: `DL-NAV-${k.id}-4x5.png`, cls: 'bg-kraft ad', html: `${shot(f, { l: 247, t: 140, w: 586, h: 732 })}${seal(k.b, 800, 120)}${band(950)}
      <div class="tx" style="top:990px"><div class="k">Kit ${n} · ${k.name}</div><h1 class="d x4" style="margin-top:14px;color:var(--crema)">${k.t}</h1><p class="sub" style="margin-top:10px">${k.s}</p></div>${buyRow(cop(k.price), 1205)}${mast(false)}` },
    // 9:16 · zonas seguras: nada clave arriba de 270 ni debajo de 1540
    { file: `DL-NAV-${k.id}-9x16.png`, cls: 'bg-kraft ad story', html: `${shot(f, { l: 247, t: 310, w: 586, h: 732 })}${seal(k.b, 790, 290)}${band(1110)}
      <div class="tx" style="top:1150px"><div class="k">Kit ${n} · ${k.name}</div><h1 class="d x4" style="margin-top:14px;color:var(--crema)">${k.t}</h1><p class="sub" style="margin-top:10px">${k.s}</p></div>${buyRow(cop(k.price), 1440)}${mast(false)}` },
  ];
};

const heroSlides = (h) => [
  { file: `DL-NAV-${h.id}-${h.slug}-4x5.png`, cls: 'bg-verde ad', html: `${topo()}${shot(h.mesa, { l: 84, t: 470, w: 912, h: 580 }, ';outline-color:rgba(201,164,92,.4)').replace('alt="">', 'alt="" style="object-position:50% 72%">')}
    <div class="tx" style="top:170px"><div class="k">${h.k}</div><h1 class="d x4" style="margin-top:14px;font-size:84px">${h.t}</h1></div>${band(1090)}${buyRow(h.price, 1150)}${mast(true)}` },
  { file: `DL-NAV-${h.id}-${h.slug}-9x16.png`, cls: 'bg-verde ad story', html: `${topo()}<div class="tx" style="top:300px"><div class="k">${h.k}</div><h1 class="d x3" style="margin-top:14px">${h.t}</h1></div>
    ${shot(h.mesa, { l: 140, t: 570, w: 800, h: 800 }, ';outline-color:rgba(201,164,92,.4)')}${band(1420)}${buyRow(h.price, 1450)}${mast(true)}` },
  { file: `DL-NAV-${h.id}-${h.slug}-1x1.png`, cls: 'bg-kraft ad sq', html: `${shot(h.est, { l: 560, t: 150, w: 440, h: 550 })}
    <div class="tx" style="top:170px;right:560px"><div class="k">${h.k}</div><h1 class="d x5" style="margin-top:14px;color:var(--verde)">${h.t.replace(/<em>/g, '<em style="color:var(--cafe)">')}</h1><p class="p s" style="margin-top:18px;color:var(--cafe)">${h.s}</p></div>${band(800)}${buyRow(h.price, 880)}${mast(false)}` },
];

const ads = [
  ...kits.map((k) => ({ id: k.id, dir: `${k.id}-${k.name.replace(/ñ/g, 'n').replace(/ú/g, 'u').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`, title: `${k.name} · ${cop(k.price)}`, slides: kitSlides(k),
    copy: { p: `${k.p}\n\nCafé que se honra: cada grano se recogió maduro, uno por uno. Pídalo por WhatsApp al ${WA_NUM} y le confirmamos el envío.`, h: `${k.name} · ${cop(k.price)}`, d: 'Café de la finca, listo para regalar.' },
    set: k.price >= 119000 ? 'A · Regalo hogar · B · Empresas · C · Ya los conocen' : 'A · Regalo hogar · C · Ya los conocen', kit: k })),
  ...heroes.map((h) => ({ id: h.id, dir: `${h.id}-${h.slug}`, title: strip(h.t), slides: heroSlides(h), copy: { p: h.p, h: h.h, d: h.d }, set: h.set, hero: h })),
];
function strip(s) { return s.replace(/<[^>]+>/g, ''); }

let all = `# Doña Lú · Anuncios de Navidad (Meta)\n\nGenerado por \`scripts/ads.mjs\`. Plan: \`meta-ads/PLAN-META-ADS-NAVIDAD.md\` (fase 1: un anuncio por kit con la misma plantilla + 3 anuncios principales). WhatsApp de pedidos: **${WA_NUM}** (wa.me/${WA}). Landing: ${LANDING}\n\n**Fecha límite:** cuando Doña Lú la confirme, agregar al final de cada texto principal: *Pida antes del XX de diciembre.* (no va impresa en las imágenes hasta confirmarla).\n`;
for (const a of ads) {
  const dir = path.join(ROOT, 'anuncios', 'piezas', a.dir);
  await mkdir(dir, { recursive: true });
  const html = `<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<title>${a.id} · ${strip(a.title)} · Doña Lú anuncios</title>\n<link rel="stylesheet" href="../../../assets/css/donalu.css">\n${css}\n</head>\n<body>\n${symbols}\n${a.slides.map((s) => `<section class="slide ${s.cls}" data-file="${s.file}">\n${s.html}\n</section>`).join('\n\n')}\n</body>\n</html>\n`;
  await writeFile(path.join(dir, 'slides.html'), html);
  const waMsg = a.kit ? `Hola, quiero el kit ${a.id.toUpperCase()} (${a.kit.name}) de Navidad. [${a.id}]` : `Hola, quiero ver los kits de Navidad de Doña Lú. [${a.id}]`;
  const url = a.kit ? utm(a.id) : `${LANDING}?utm_source=meta&utm_medium=paid&utm_campaign=nav-prueba&utm_content=${a.id}-${a.hero.slug}`;
  const md = `# ${a.id.toUpperCase()} · ${strip(a.title)}

**Conjunto sugerido:** ${a.set}
**Formatos:** ${a.slides.map((s) => s.file).join(' · ')}

## Texto principal
${a.copy.p}

*(Cuando se confirme la fecha: agregar "Pida antes del XX de diciembre.")*

## Título
${a.copy.h}

## Descripción
${a.copy.d}

## Botón y destino
- **Opción sitio:** botón **Comprar** → ${url}
- **Opción WhatsApp:** botón **Enviar mensaje** → ${waLink(waMsg)}
  (mensaje prellenado: "${waMsg}". El código entre corchetes dice qué anuncio trajo el pedido.)

## Notas
${a.kit ? `- Contenido y precio del catálogo de Navidad de Diana (${a.kit.name}: ${strip(a.kit.s)}, ${cop(a.kit.price)}).\n- Foto: kits-fotos/kit-${a.id.slice(1)}-estudio.jpg con el tratamiento nuevo, a su tamaño o menor (nunca ampliada).` : '- Foto: kits-fotos (mesa de regalos y estudio), a su tamaño o menor.'}
${a.id === 'k08' || a.id === 'k10' ? '- **Validar:** el catálogo dice "mug térmico" pero la foto muestra un termo Owala. Confirmar qué trae el kit antes de pautar.\n' : ''}- Fase 1: todos los anuncios por kit usan la misma plantilla para que lo único que cambie sea el kit.
`;
  await writeFile(path.join(dir, 'copy.md'), md);
  all += `\n---\n\n## ${a.id.toUpperCase()} · ${strip(a.title)}\n*${a.slides.map((s) => s.file).join(' · ')}*\n\n**Texto principal**\n\n${a.copy.p}\n\n**Título:** ${a.copy.h}  \n**Descripción:** ${a.copy.d}  \n**Comprar →** ${url}  \n**Enviar mensaje →** ${waLink(waMsg)}\n`;
  a.url = url; a.wa = waLink(waMsg);
}
await writeFile(path.join(ROOT, 'anuncios', 'ANUNCIOS.md'), all);
await writeFile(path.join(ROOT, 'anuncios', 'anuncios.json'), JSON.stringify(ads.map((a) => ({ id: a.id, dir: a.dir, title: strip(a.title), set: a.set, files: a.slides.map((s) => s.file), copy: a.copy, url: a.url, wa: a.wa })), null, 1));
console.log(ads.length, 'anuncios ·', ads.reduce((n, a) => n + a.slides.length, 0), 'imágenes');
