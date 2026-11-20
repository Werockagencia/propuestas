// Anuncios de Meta para los kits de Navidad 2026 (fuente única de los anuncios): genera anuncios/piezas/<id>/slides.html + copy.md,
// anuncios/ANUNCIOS.md y anuncios/anuncios.json. 4 kits vigentes (k02, k05, k08, k07) + 3 anuncios principales (hogar, empresas, recordatorio).
// Datos de los kits: kits-navidad/_fuente/build.js (array K) y Desarrollos Wordpress/Dona Lu/wp-setup/kits-precios.php. Nada inventado aquí:
// si cambia un precio o un contenido, se cambia allá primero y luego aquí.
// Fotos: reales de Diana (kits-fotos/diana, 18 nov 2026, tratadas) copiadas a assets/photos/nav-kit-*.jpg; la Caja 7 es la del catálogo
// (592 px de ancho), por eso va más pequeña. Ninguna foto se muestra más grande que su tamaño original.
// Uso: node scripts/ads.mjs && PIEZAS=anuncios/piezas node scripts/render.mjs && node scripts/hoja-anuncios.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { symbols, topo, icon } from './lib/ui.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
export const WA_NUM = '322 470 2667';
export const WA = '573224702667';
export const LANDING = 'https://donalu.com.co/kits-navidad/';
const STORE = 'https://donalu.com.co/producto/';
const cop = (v) => '$' + v.toLocaleString('es-CO');
const UTM = (c) => `${LANDING}?utm_source=meta&utm_medium=paid&utm_campaign=nav-prueba&utm_content=${c}`;
const waLink = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

// ───────── Los 4 kits (kits-precios.php, 18 nov 2026). desde = variación más baja (Lavado, 250 g). Caja 7: producto simple, un solo precio.
// rows = contenido real del kit [etiqueta, valor]; h = titular de la imagen; line = una línea con lo que trae.
export const kits = [
  { id: 'k02', name: 'Cesta vertical 2', slug: 'kit-navidad-cesta-vertical-2', price: 100000, desde: true, photo: 'nav-kit-02-1.jpg', pos: '50% 62%', maxW: 900,
    h: 'Usted elige <em>el café.</em>', tag: 'Con termo',
    rows: [['Café', 'Lavado, Honey o Natural'], ['Bolsa', '250 g o 500 g'], ['Y además', 'Termo'], ['Empaque', 'Cesta de madera pino']],
    line: '1 bolsa de café a elegir · Termo · Cesta de madera pino',
    hook: 'Usted elige el café; nosotros lo ponemos en una cesta de madera pino, con su termo.',
    body: 'Cesta vertical 2: una bolsa de café de la finca a elegir entre Lavado, Honey o Natural, de 250 g o 500 g, y un termo.' },
  { id: 'k05', name: 'Cesta vertical 5', slug: 'kit-navidad-cesta-vertical-5', price: 100000, desde: true, photo: 'nav-kit-05-1.jpg', pos: '50% 55%', maxW: 900,
    h: 'Usted elige <em>el café.</em>', tag: 'Con lazo dorado',
    rows: [['Café', 'Lavado, Honey o Natural'], ['Bolsa', '250 g o 500 g'], ['Y además', 'Termo y lazo dorado'], ['Empaque', 'Cesta de madera pino']],
    line: '1 bolsa de café a elegir · Termo · Lazo dorado · Cesta de madera pino',
    hook: 'Usted elige el café; el termo y el lazo dorado ya vienen en la cesta.',
    body: 'Cesta vertical 5: una bolsa de café de la finca a elegir entre Lavado, Honey o Natural, de 250 g o 500 g, un termo y lazo dorado, en cesta de madera pino.' },
  { id: 'k08', name: 'Caja Doña Lú 8', slug: 'kit-navidad-caja-dona-lu-8', price: 170000, desde: true, photo: 'nav-kit-08-1.jpg', pos: '50% 58%', maxW: 899,
    h: 'Usted elige <em>los dos cafés.</em>', tag: 'Dos cafés y termo',
    rows: [['Cafés · combine dos', 'Lavado, Honey, Natural'], ['Bolsas', '250 g o 500 g'], ['Y además', 'Termo'], ['Empaque', 'Caja con tapa de madera pino']],
    line: '2 bolsas de café a elegir · Termo · Caja con tapa de madera pino',
    hook: 'Dos cafés de la finca, los que usted elija, y un termo, en una caja de madera pino con tapa.',
    body: 'Caja Doña Lú 8: dos bolsas de café a elegir (combine Lavado, Honey y Natural), de 250 g o 500 g, y un termo, en caja con tapa de madera pino.' },
  { id: 'k07', name: 'Caja Doña Lú 7', slug: 'kit-navidad-caja-dona-lu-7', price: 120000, desde: false, photo: 'nav-kit-07-1.jpg', pos: '50% 50%', maxW: 900,
    h: 'No elija: <em>llévese los tres.</em>', tag: 'Los tres procesos',
    rows: [['Lavado', '250 g'], ['Honey', '250 g'], ['Natural', '250 g'], ['Empaque', 'Caja con tapa de madera pino']],
    line: '250 g Lavado · 250 g Honey · 250 g Natural · Caja con tapa de madera pino',
    hook: '¿Lavado, Honey o Natural? En esta caja no hay que escoger: vienen los tres.',
    body: 'Caja Doña Lú 7: los tres procesos de la finca, 250 g de cada uno, en caja con tapa de madera pino.' },
];

// ───────── Anuncios principales. v = variantes del texto principal para prueba A/B (la primera es la que va por defecto).
export const heroes = [
  { id: 'h1', slug: 'hogar', set: 'A · Regalo hogar', k: 'Kits de Navidad',
    t: 'Regale café de la finca. <em>Usted elige cuál.</em>', s: 'Cuatro kits en cestas y cajas de madera pino.', price: 100000, cta: 'Elija su kit',
    photos: ['nav-kit-02-1.jpg', 'nav-kit-08-1.jpg', 'nav-kit-05-1.jpg'],
    wa: 'Hola, Doña Lú. Quiero ver los kits de Navidad. ¿Me ayudan a elegir?',
    h: 'Kits de Navidad · desde $100.000', d: 'Usted elige el café. IVA incluido.',
    v: [
      `Este año, regale café de la finca y escoja usted el café: Lavado, Honey o Natural.\n\nCuatro kits de Navidad en cestas y cajas de madera pino, desde $100.000 con IVA incluido. Véalos en donalu.com.co o escríbanos por WhatsApp al ${WA_NUM} y le ayudamos a elegir.`,
      `Un regalo que se nota escogido: café de la finca, con el proceso que usted elija.\n\nCestas y cajas de madera pino, con termo o con los tres cafés, desde $100.000 (IVA incluido). Pídalo en donalu.com.co o por WhatsApp al ${WA_NUM}.`,
      `Lavado, Honey o Natural. Usted elige el café; nosotros lo ponemos en una cesta o caja de madera pino.\n\nKits de Navidad Doña Lú desde $100.000, IVA incluido. Escríbanos al ${WA_NUM}.`,
    ] },
  { id: 'h2', slug: 'empresas', set: 'B · Empresas', k: 'Regalos corporativos',
    t: 'Para su equipo <em>y sus clientes.</em>', s: 'Café de la finca en cajas y cestas de madera pino.', price: 100000, cta: 'Cotice por WhatsApp',
    photos: ['nav-kit-08-2.jpg', 'nav-kit-07-1.jpg'],
    wa: 'Hola, Doña Lú. Quiero cotizar kits de Navidad para mi empresa.',
    h: 'Regalos de fin de año para su equipo', d: 'Termo con su logo desde 10 kits.',
    v: [
      `El regalo de fin de año para su equipo y sus clientes: café de la finca en cajas y cestas de madera pino.\n\nKits desde $100.000, IVA incluido. Desde 10 kits marcamos el termo con el logo de su empresa por $2.000 más por kit. Cuéntenos cuántos necesita y le cotizamos por WhatsApp al ${WA_NUM}.`,
      `Este diciembre, regale a su equipo algo que se toma con calma.\n\nCafé de la finca (Lavado, Honey y Natural) en cajas y cestas de madera pino. Desde 10 kits, el termo va con el logo de su empresa ($2.000 más por kit). Cotice por WhatsApp al ${WA_NUM}.`,
      `¿Regalos para clientes que sí se usan? Café de la finca, en caja de madera pino.\n\nCuatro kits de Navidad desde $100.000 (IVA incluido). Cotice su pedido por cantidad al WhatsApp ${WA_NUM}.`,
    ] },
  { id: 'h3', slug: 'recordatorio', set: 'C · Ya los conocen (remarketing)', k: 'Kits de Navidad',
    t: 'Su regalo <em>le espera.</em>', s: 'Cesta o caja: usted elige el café.', price: 100000, cta: 'Pídalo por WhatsApp',
    photos: ['nav-kit-05-2.jpg'],
    wa: 'Hola, Doña Lú. Vi los kits de Navidad y quiero hacer mi pedido.',
    h: 'Su kit de Navidad le espera', d: 'Desde $100.000, IVA incluido.',
    v: [
      `Su regalo le espera. Ya vio los kits de Navidad de Doña Lú: cesta o caja, usted elige el café.\n\nDesde $100.000, IVA incluido. Haga su pedido en donalu.com.co o escríbanos por WhatsApp al ${WA_NUM}.`,
      `¿Se quedó pensando en el kit? Aquí sigue: café de la finca en madera pino, con el café que usted elija.\n\nPídalo en donalu.com.co o por WhatsApp al ${WA_NUM}.`,
      `Un buen café no se acelera; elegir su regalo, tampoco. Cuando esté listo, aquí están los cuatro kits.\n\nDesde $100.000, IVA incluido. WhatsApp ${WA_NUM}.`,
    ] },
];

// ───────── Piezas visuales
const P = '../../../assets/photos/';
const arch = (f, o) => `<div class="arch${o.cls ? ' ' + o.cls : ''}" style="left:${o.l}px;top:${o.t}px;width:${o.w}px;height:${o.h}px${o.style ? ';' + o.style : ''}"><img src="${P}${f}" alt="" style="object-position:${o.pos || '50% 50%'}">${o.lb ? `<span class="lb">${o.lb}</span>` : ''}</div>`;
const mast = (story) => `<div class="mast"${story ? ' style="top:300px"' : ''}><span><b>Doña Lú</b> · <span class="no">Navidad 2026</span></span><span>Café que se honra</span></div>`;
const priceBlock = (v, desde, label) => `<div class="pr"><span class="pl">${label ?? (desde ? 'Desde' : 'Precio')}</span><span class="pv">${cop(v)}</span><span class="iva">IVA incluido</span></div>`;
const cta = (txt) => `<div class="cta"><span class="btn">${icon('chat', 30, 'currentColor', 1.7)}<span>${txt}</span></span><span class="num">WhatsApp ${WA_NUM} · donalu.com.co</span></div>`;
const buy = (top, inner) => `<div class="buy" style="top:${top}px">${inner}</div>`;
const rows = (r) => `<ul class="rows2">${r.map(([a, b]) => `<li><span>${a}</span><b>${b}</b></li>`).join('')}</ul>`;
const lines = '<div class="lines"></div>';

const css = `<style>
.ad{--v2:#0A2A1B;--o2:#E7CF97;--c3:#FBF7EF;background:radial-gradient(120% 80% at 88% 6%,#1b5639 0%,var(--verde) 40%,var(--v2) 100%);color:var(--crema)}
.ad.crema{background:radial-gradient(120% 80% at 12% 0%,#FBF7EF 0%,var(--crema) 45%,#E9DDC6 100%);color:var(--verde)}
.ad .lines{inset:0;z-index:0;background:repeating-linear-gradient(90deg,rgba(231,207,151,.04) 0 1px,transparent 1px 90px);pointer-events:none}
.ad.crema .lines{background:repeating-linear-gradient(90deg,rgba(15,59,38,.045) 0 1px,transparent 1px 90px)}
.ad .topo{color:rgba(231,207,151,.05)}
.ad.crema .topo{color:rgba(15,59,38,.05)}
.ad .mast{color:rgba(244,237,224,.86)}
.ad.crema .mast{color:var(--verde)}
.ad.crema .mast .no{color:#8E6F31}
.arch{position:absolute;overflow:hidden;border-radius:999px 999px 22px 22px;background:#EADFC9;z-index:6;box-shadow:0 0 0 2px var(--oro),0 0 0 9px var(--v2),0 0 0 10.5px rgba(201,164,92,.5),0 50px 80px -34px rgba(0,0,0,.85)}
.ad.crema .arch{box-shadow:0 0 0 2px var(--oro),0 0 0 9px var(--crema),0 0 0 10.5px rgba(201,164,92,.6),0 46px 70px -34px rgba(43,28,18,.6)}
.arch img{width:100%;height:100%;object-fit:cover;display:block}
.arch .lb{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);white-space:nowrap;background:var(--c3);color:var(--verde);border-radius:999px;padding:13px 26px;font:500 19px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;box-shadow:0 14px 28px -14px rgba(0,0,0,.7)}
.ad .k{color:var(--o2)}
.ad.crema .k{color:#8E6F31}
.ad .d{color:#fff;font-feature-settings:"liga" 1,"dlig" 0,"lnum" 1;text-wrap:balance}
.ad .nm,.ad .pv{font-feature-settings:"lnum" 1,"dlig" 0}
.story .pv{font-size:92px}
.story .cta .btn{padding:24px 34px;font-size:22px}
.ad .d em{color:var(--o2)}
.ad.crema .d{color:var(--verde)}
.ad.crema .d em{color:#8E6F31}
.ad .nm{font:italic 400 60px/1 var(--serif);color:var(--crema)}
.rows2{list-style:none}
.rows2 li{display:flex;flex-direction:column;gap:9px;padding:17px 0;border-top:1px solid rgba(201,164,92,.38)}
.rows2 li:last-child{border-bottom:1px solid rgba(201,164,92,.38)}
.rows2 span{font:500 16px/1.2 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--oro)}
.rows2 b{font:400 27px/1.2 var(--sans);color:var(--crema);white-space:nowrap}
.sub2{font:300 30px/1.4 var(--sans);color:rgba(244,237,224,.88)}
.ad.crema .sub2{color:#3c3226}
.buy{position:absolute;left:var(--m);right:var(--m);display:flex;align-items:flex-end;justify-content:space-between;gap:30px;z-index:10;padding-top:34px;border-top:1px solid rgba(201,164,92,.5)}
.pr{display:flex;flex-direction:column}
.pl{font:500 17px/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--o2);margin-bottom:12px}
.pv{font:400 104px/.9 var(--serif);color:#fff;letter-spacing:-.01em;white-space:nowrap}
.iva{font:400 19px/1 var(--sans);letter-spacing:.06em;color:rgba(244,237,224,.72);margin-top:14px}
.ad.crema .pl{color:#8E6F31}.ad.crema .pv{color:var(--verde)}.ad.crema .iva{color:#5B5145}
.cta{display:flex;flex-direction:column;align-items:flex-end;gap:16px}
.cta .btn{display:inline-flex;align-items:center;gap:16px;background:var(--oro);color:var(--v2);border-radius:999px;padding:26px 38px;font:500 23px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;box-shadow:0 18px 34px -16px rgba(201,164,92,.9)}
.cta .num{font:400 18px/1 var(--sans);letter-spacing:.08em;color:rgba(244,237,224,.7);white-space:nowrap}
.ad.crema .cta .num{color:#5B5145}
.ad.crema .cta .btn{background:var(--verde);color:var(--crema);box-shadow:0 18px 34px -16px rgba(15,59,38,.7)}
.tx.c{text-align:center}
.glow{z-index:1;border-radius:50%;background:radial-gradient(closest-side,rgba(231,207,151,.22),rgba(231,207,151,0));pointer-events:none}
</style>`;

// Ancho de foto: nunca más que el original (k07 = 592 px)
const fitW = (k, w) => Math.min(w, k.maxW);

const kitSlides = (k) => {
  const W4 = 492, H4 = Math.round(W4 * 1.32);
  const W9 = 520, H9 = Math.round(W9 * 1.25);
  const head = (sz) => `<h1 class="d" style="font-size:${sz}px">${k.h}</h1>`;
  const nm = k.name.replace('Doña Lú', 'Doña&nbsp;Lú');
  return [
    // 4:5 · titular arriba, arco con la foto a la derecha, contenido a la izquierda, precio y botón abajo
    { file: `DL-NAV-${k.id}-4x5.png`, cls: 'ad', html: `${lines}${topo()}${mast(false)}
      <div class="tx" style="top:140px"><div class="k">Kit de Navidad · ${nm}</div><div style="margin-top:22px">${head(k.id === 'k02' || k.id === 'k05' ? 120 : 104)}</div></div>
      <div class="glow" style="left:${996 - W4 - 120}px;top:300px;width:${W4 + 240}px;height:${H4 + 200}px"></div>
      ${arch(k.photo, { l: 996 - W4, t: 372, w: W4, h: H4, pos: k.pos, lb: k.tag })}
      <div class="tx" style="top:400px;right:${1080 - (996 - W4) + 52}px"><div class="nm">${nm}</div><div style="margin-top:34px">${rows(k.rows)}</div></div>
      ${buy(1086, priceBlock(k.price, k.desde) + cta('Pídalo por WhatsApp'))}` },
    // 9:16 · todo lo clave dentro de y = 285–1635
    { file: `DL-NAV-${k.id}-9x16.png`, cls: 'ad story', html: `${lines}${topo()}${mast(true)}
      <div class="tx c" style="top:366px"><div class="k">Kit de Navidad · ${nm}</div><div style="margin-top:20px"><h1 class="d" style="font-size:118px">${k.h.replace(' <em>', '<br><em>')}</h1></div></div>
      <div class="glow" style="left:${540 - W9 / 2 - 140}px;top:640px;width:${W9 + 280}px;height:${H9 + 220}px"></div>
      ${arch(k.photo, { l: 540 - W9 / 2, t: 690, w: W9, h: H9, pos: k.pos, lb: k.tag })}
      <div class="tx c" style="top:${690 + H9 + 30}px"><p class="sub2" style="font-size:26px">${k.line}</p></div>
      ${buy(1424, priceBlock(k.price, k.desde) + cta('Pídalo por WhatsApp'))}` },
  ];
};

const fan = (ph, cx, top, w, h) => `${arch(ph[0], { l: cx - w * 1.36, t: top + 40, w, h, style: 'transform:rotate(-5deg);z-index:5', pos: '50% 60%' })}${arch(ph[2], { l: cx + w * 0.36, t: top + 40, w, h, style: 'transform:rotate(5deg);z-index:5', pos: '50% 55%' })}${arch(ph[1], { l: cx - w / 2, t: top, w, h, style: 'z-index:7', pos: '50% 58%' })}`;

const heroSlides = (h) => {
  const f4 = `DL-NAV-${h.id}-${h.slug}-4x5.png`, f9 = `DL-NAV-${h.id}-${h.slug}-9x16.png`;
  const pb = priceBlock(h.price, true, h.id === 'h2' ? 'Kits desde' : 'Desde');
  if (h.id === 'h1') return [
    { file: f4, cls: 'ad', html: `${lines}${topo()}${mast(false)}
      <div class="tx c" style="top:136px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:22px;font-size:94px">${h.t.replace('. <em>', '.<br><em>')}</h1></div>
      <div class="glow" style="left:140px;top:420px;width:800px;height:620px"></div>
      ${fan(h.photos, 540, 456, 330, 450)}
      ${buy(1086, pb + cta(h.cta))}` },
    { file: f9, cls: 'ad story', html: `${lines}${topo()}${mast(true)}
      <div class="tx c" style="top:372px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:22px;font-size:104px">${h.t.replace('. <em>', '.<br><em>')}</h1></div>
      <div class="glow" style="left:90px;top:700px;width:900px;height:760px"></div>
      ${fan(h.photos, 540, 720, 370, 505)}
      <div class="tx c" style="top:1336px"><p class="sub2" style="font-size:28px">${h.s}</p></div>
      ${buy(1420, pb + cta(h.cta))}` },
  ];
  if (h.id === 'h2') return [
    { file: f4, cls: 'ad crema', html: `${lines}${topo()}${mast(false)}
      <div class="tx" style="top:150px;right:540px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:24px;font-size:100px">${h.t}</h1>
        <p class="sub2" style="margin-top:36px;font-size:28px">${h.s}</p><p class="sub2" style="margin-top:22px;font-size:28px"><b style="font-weight:500">Desde 10 kits:</b> el termo con el logo de su empresa, $2.000 más por kit.</p></div>
      ${arch(h.photos[0], { l: 590, t: 150, w: 406, h: 840, pos: '50% 60%' })}
      ${buy(1086, pb + cta(h.cta))}` },
    { file: f9, cls: 'ad crema story', html: `${lines}${topo()}${mast(true)}
      <div class="tx c" style="top:372px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:22px;font-size:110px">${h.t.replace(' <em>', '<br><em>')}</h1></div>
      ${arch(h.photos[0], { l: 130, t: 700, w: 460, h: 620, pos: '50% 60%' })}
      ${arch(h.photos[1], { l: 620, t: 860, w: 330, h: 460, pos: '50% 50%' })}
      <div class="tx c" style="top:1352px"><p class="sub2" style="font-size:27px"><b style="font-weight:500">Desde 10 kits:</b> termo con su logo.</p></div>
      ${buy(1430, pb + cta(h.cta))}` },
  ];
  return [
    { file: f4, cls: 'ad', html: `${lines}${topo()}${mast(false)}
      <div class="glow" style="left:400px;top:120px;width:700px;height:900px"></div>
      ${arch(h.photos[0], { l: 524, t: 150, w: 472, h: 780, pos: '50% 50%' })}
      <div class="tx" style="top:300px;right:600px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:26px;font-size:124px">${h.t.replace(' <em>', '<br><em>')}</h1><p class="sub2" style="margin-top:38px;font-size:29px">${h.s}</p></div>
      ${buy(1086, pb + cta(h.cta))}` },
    { file: f9, cls: 'ad story', html: `${lines}${topo()}${mast(true)}
      <div class="tx c" style="top:372px"><div class="k">${h.k}</div><h1 class="d" style="margin-top:22px;font-size:132px">${h.t}</h1></div>
      <div class="glow" style="left:150px;top:560px;width:780px;height:900px"></div>
      ${arch(h.photos[0], { l: 240, t: 612, w: 600, h: 720, pos: '50% 50%' })}
      <div class="tx c" style="top:1364px"><p class="sub2" style="font-size:28px">${h.s}</p></div>
      ${buy(1424, pb + cta(h.cta))}` },
  ];
};

// ───────── Anuncios
const kitCopy = (k) => ({
  p: `${k.hook}\n\n${k.body} ${k.desde ? `Desde ${cop(k.price)}` : cop(k.price)}, IVA incluido.\n\nPídala en donalu.com.co o por WhatsApp al ${WA_NUM}.`,
  h: `${k.name} · ${k.desde ? 'desde ' : ''}${cop(k.price)}`,
  d: k.id === 'k07' ? 'Lavado, Honey y Natural. IVA incluido.' : 'Usted elige el café. IVA incluido.',
});
const ads = [
  ...kits.map((k) => ({ id: k.id, dir: `${k.id}-${k.slug.replace('kit-navidad-', '')}`, title: `${k.name} · ${k.desde ? 'desde ' : ''}${cop(k.price)}`, headline: strip(k.h),
    slides: kitSlides(k), copy: kitCopy(k), variants: [],
    set: k.price >= 120000 ? 'A · Regalo hogar · B · Empresas · C · Ya los conocen' : 'A · Regalo hogar · C · Ya los conocen',
    url: `${UTM(k.id)}#${k.id}`, product: `${STORE}${k.slug}/`,
    waMsg: `Hola, Doña Lú. Quiero el kit de Navidad ${k.name}. ¿Me ayudan con el pedido? [${k.id}]`, kit: k })),
  ...heroes.map((h) => ({ id: h.id, dir: `${h.id}-${h.slug}`, title: strip(h.t), headline: strip(h.t), slides: heroSlides(h), copy: { p: h.v[0], h: h.h, d: h.d }, variants: h.v,
    set: h.set, url: UTM(`${h.id}-${h.slug}`), product: null, waMsg: `${h.wa} [${h.id}]`, hero: h })),
];

const NOTA_FECHA = '*(Cuando Doña Lú confirme la fecha límite de pedidos: agregar al final "Pida antes del XX de diciembre." No va impresa en las imágenes.)*';
let all = `# Doña Lú · Anuncios de Navidad 2026 (Meta)

Generado por \`scripts/ads.mjs\` (no editar a mano). 7 anuncios: uno por kit vigente (k02, k05, k08, k07) con la misma plantilla, y 3 principales (hogar, empresas, recordatorio). Cada uno en 4:5 (1080 × 1350) y 9:16 (1080 × 1920, texto dentro de y = 285–1635).

- **Kits y precios:** kits-navidad/_fuente/build.js y wp-setup/kits-precios.php (18 nov 2026). Precios con IVA incluido; "desde" = Lavado, bolsa de 250 g.
- **WhatsApp de pedidos:** ${WA_NUM} (wa.me/${WA}). El código entre corchetes al final del mensaje dice qué anuncio trajo el pedido.
- **Landing:** ${LANDING} (anclas #k02 #k05 #k08 #k07). Destino alterno por kit: la página del producto.
- **Fecha límite de pedidos:** por confirmar. ${NOTA_FECHA}
`;
for (const a of ads) {
  const dir = path.join(ROOT, 'anuncios', 'piezas', a.dir);
  await mkdir(dir, { recursive: true });
  const html = `<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<title>${a.id} · ${strip(a.title)} · Doña Lú anuncios</title>\n<link rel="stylesheet" href="../../../assets/css/donalu.css">\n${css}\n</head>\n<body>\n${symbols}\n${a.slides.map((s) => `<section class="slide ${s.cls}" data-file="${s.file}">\n${s.html}\n</section>`).join('\n\n')}\n</body>\n</html>\n`;
  await writeFile(path.join(dir, 'slides.html'), html);
  a.wa = waLink(a.waMsg);
  const variants = a.variants.length > 1 ? `\n## Variantes del texto principal (prueba A/B)\n${a.variants.map((v, i) => `\n**${String.fromCharCode(65 + i)}**${i === 0 ? ' (por defecto)' : ''}\n\n${v}\n`).join('')}` : '';
  const md = `# ${a.id.toUpperCase()} · ${strip(a.title)}

**Titular de la imagen:** ${a.headline}
**Conjunto sugerido:** ${a.set}
**Formatos:** ${a.slides.map((s) => s.file).join(' · ')}

## Texto principal
${a.copy.p}

${NOTA_FECHA}
${variants}
## Título
${a.copy.h}

## Descripción
${a.copy.d}

## Botón y destino
- **Opción sitio:** botón **Comprar** (o **Más información**) → ${a.url}${a.product ? `\n- **Destino alterno:** página del producto → ${a.product}?utm_source=meta&utm_medium=paid&utm_campaign=nav-prueba&utm_content=${a.id}` : ''}
- **Opción WhatsApp:** botón **Enviar mensaje** → ${a.wa}
  (mensaje prellenado: "${a.waMsg}")

## Notas
${a.kit ? `- Contenido y precio: ${a.kit.name} = ${a.kit.line}; ${a.kit.desde ? 'desde ' : ''}${cop(a.kit.price)}, IVA incluido${a.kit.desde ? ' (Lavado, 250 g; el precio sube con 500 g o con Honey/Natural)' : ' (producto simple, un solo precio)'}.
- Foto: ${a.kit.id === 'k07' ? 'foto real de Diana (19 nov 2026), assets/photos/nav-kit-07-1.jpg, a su tamaño o menor.' : `foto real de Diana (18 nov 2026), assets/photos/${a.kit.photo}, a su tamaño o menor.`}
- Fase 1: los cuatro anuncios por kit usan la misma plantilla para que lo único que cambie sea el kit.` : `- Fotos: reales de Diana (${a.hero.photos.join(', ')}), a su tamaño o menor.${a.id === 'h2' ? '\n- Sin promesas no confirmadas: termo con el logo de la empresa desde 10 kits, $2.000 más por kit (confirmado por Nicolás el 19 nov 2026). Sin otras promesas.' : ''}${a.id === 'h3' ? '\n- Remarketing: público que visitó la landing o escribió por WhatsApp sin comprar. Sin urgencia ni fechas inventadas.' : ''}`}
`;
  await writeFile(path.join(dir, 'copy.md'), md);
  all += `\n---\n\n## ${a.id.toUpperCase()} · ${strip(a.title)}\n*${a.slides.map((s) => s.file).join(' · ')}*\n\n**Titular de la imagen:** ${a.headline}  \n**Conjunto:** ${a.set}\n\n**Texto principal**\n\n${a.copy.p}\n${variants.replace('\n## ', '\n#### ')}\n**Título:** ${a.copy.h}  \n**Descripción:** ${a.copy.d}  \n**Comprar →** ${a.url}  \n${a.product ? `**Destino alterno (producto) →** ${a.product}  \n` : ''}**Enviar mensaje →** ${a.wa}\n`;
}
await writeFile(path.join(ROOT, 'anuncios', 'ANUNCIOS.md'), all);
await writeFile(path.join(ROOT, 'anuncios', 'anuncios.json'), JSON.stringify(ads.map((a) => ({ id: a.id, dir: a.dir, title: strip(a.title), headline: a.headline, set: a.set, files: a.slides.map((s) => s.file), copy: a.copy, variants: a.variants, url: a.url, product: a.product, wa: a.wa })), null, 1));
// Control de longitudes (Meta: primera línea ≤ 125, título ≤ 40)
for (const a of ads) for (const t of [a.copy.p, ...a.variants]) { const l1 = t.split('\n')[0].length; if (l1 > 125) console.warn(`! ${a.id} primera línea ${l1} caracteres`); }
for (const a of ads) if (a.copy.h.length > 40) console.warn(`! ${a.id} título ${a.copy.h.length} caracteres`);
console.log(ads.length, 'anuncios ·', ads.reduce((n, a) => n + a.slides.length, 0), 'imágenes');
