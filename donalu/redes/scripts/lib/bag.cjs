// Empaque único (dirección de Diana): kraft crema, fuelles y bandas verdes, wordmark café, rama y montañas.
const K = { verde: '#173E2C', kraft: '#EBDFC8', cafe: '#5B3A23', oro: '#C9A45C', crema: '#F4EDE0' };
const PR = {
  lavado: { N: 'LAVADO', n: 'Lavado', t: 'Limpio y brillante', k: 1 },
  honey: { N: 'HONEY', n: 'Honey', t: 'Dulce, con cuerpo', k: 2 },
  natural: { N: 'NATURAL', n: 'Natural', t: 'Frutal y profundo', k: 3 },
};
const ICO = {
  lavado: '<path d="M12 3.5c-2.6 3.6-5.5 7.2-5.5 10.4a5.5 5.5 0 0 0 11 0c0-3.2-2.9-6.8-5.5-10.4z"/><path d="M9.6 15.2a2.6 2.6 0 0 0 2.4 2"/>',
  honey: '<path d="M12 3l7 4v8l-7 4-7-4V7z"/><path d="M12 8.6l3.4 2v3.9L12 16.4l-3.4-1.9v-3.9z"/>',
  natural: '<circle cx="8.5" cy="15" r="4"/><circle cx="15.5" cy="15" r="4"/><path d="M8.5 11c.5-3.5 2-5.5 3.5-6.5 1.5 1 3 3 3.5 6.5"/><path d="M12 4.5c1.8-1.6 4-1.8 5.5-1"/>',
};
const beansG = (k, cy) => [0, 1, 2].map(i => { const x = 138 + i * 12; return `<ellipse class="bd${i}" cx="${x}" cy="${cy}" rx="2.7" ry="3.5" transform="rotate(20 ${x} ${cy})" stroke="${K.oro}" stroke-width=".9" style="fill:${i < k ? K.oro : 'transparent'}"/>`; }).join('');
const mountains = y0 => `<g><path d="M110 ${y0 + 40}C142 ${y0 + 6} 168 ${y0 - 6} 200 ${y0 + 14}C226 ${y0} 254 ${y0 - 18} 300 ${y0 - 2}V${y0 + 110}H110Z" fill="#CFD0BF" fill-opacity=".85"/><path d="M80 ${y0 + 66}C122 ${y0 + 34} 160 ${y0 + 38} 188 ${y0 + 50}C220 ${y0 + 30} 262 ${y0 + 26} 300 ${y0 + 38}V${y0 + 110}H80Z" fill="#B3BBA6" fill-opacity=".85"/><path d="M40 ${y0 + 92}C96 ${y0 + 66} 150 ${y0 + 74} 196 ${y0 + 80}C238 ${y0 + 68} 270 ${y0 + 70} 300 ${y0 + 76}V${y0 + 120}H40Z" fill="#93A08A" fill-opacity=".8"/><rect x="0" y="${y0 - 30}" width="300" height="140" fill="url(#mist)"/></g>`;
const tab = `<rect x="118" y="0" width="64" height="104" fill="${K.verde}"/><g transform="translate(150 52) rotate(20)"><ellipse rx="6" ry="8" fill="${K.oro}"/><path d="M-1.5 -6Q2 0 -1 6" stroke="${K.verde}" stroke-width="1.2" fill="none"/></g><text x="150" y="76" text-anchor="middle" font-family="Jost,sans-serif" font-weight="500" font-size="5.6" letter-spacing="1.8" fill="${K.oro}">CAFÉ</text><text x="150" y="84" text-anchor="middle" font-family="Jost,sans-serif" font-weight="500" font-size="5.6" letter-spacing="1.8" fill="${K.oro}">DE COLOMBIA</text><line x1="143" x2="157" y1="93" y2="93" stroke="${K.oro}" stroke-width=".7"/>`;
const kraftBase = `<rect width="300" height="464" fill="${K.kraft}"/><rect width="300" height="464" filter="url(#pgrain)" opacity=".2" style="mix-blend-mode:multiply"/>`;
const seal = `<rect width="300" height="40" fill="url(#pseal)"/><rect y="40" width="300" height="1" fill="#000" fill-opacity=".16"/><rect width="7" height="464" fill="${K.verde}"/><rect x="293" width="7" height="464" fill="${K.verde}"/>`;
const volume = `<rect width="300" height="464" fill="url(#pshade)" opacity=".55"/><rect width="300" height="464" fill="url(#pvshade)" opacity=".7"/>`;
const shadow = (cx, rx) => `<ellipse cx="${cx}" cy="451" rx="${rx}" ry="9" fill="#000" fill-opacity=".36" filter="url(#pblur)"/>`;
const txt = (x, y, s, a = {}) => `<text x="${x}" y="${y}" text-anchor="${a.anchor || 'middle'}" font-family="${a.serif ? 'Cormorant Garamond,serif' : 'Jost,sans-serif'}"${a.it ? ' font-style="italic"' : ''}${a.w ? ` font-weight="${a.w}"` : ''} font-size="${a.size}"${a.ls ? ` letter-spacing="${a.ls}"` : ''} fill="${a.fill}"${a.cls ? ` class="${a.cls}"` : ''}>${s}</text>`;

function bag(view, p, cls = '') {
  const P = PR[p];
  if (view === 'side') {
    return `<svg class="bag v-side ${cls}" viewBox="0 0 110 464" role="img" aria-label="Fuelle lateral de la bolsa Doña Lú">${shadow(55, 50)}
<g clip-path="url(#sclip)"><rect width="110" height="464" fill="${K.verde}"/><use href="#topo" x="-200" y="-40" width="520" height="560" style="color:rgba(244,237,224,.07)"/><rect width="110" height="464" filter="url(#pgrain)" opacity=".18" style="mix-blend-mode:overlay"/><rect width="110" height="40" fill="url(#pseal)"/><rect y="40" width="110" height="1" fill="#000" fill-opacity=".25"/><rect width="110" height="464" fill="url(#pshade)" opacity=".6"/></g>
<g transform="translate(46 80) scale(.75)" fill="none" stroke="${K.oro}" stroke-width="1.5" stroke-linecap="round"><path d="M12 21C12 14 8 8 4 5c6 0 10 4 8 16zM12 21c0-7 4-13 8-16-6 0-10 4-8 16z"/></g>
${['PERSONAS', 'TIERRA', 'PROCESO', 'CAFÉ'].map((w, i) => txt(55, 130 + i * 16, w, { w: 500, size: 6.6, ls: 2.4, fill: K.crema })).join('')}
<line x1="47" x2="63" y1="200" y2="200" stroke="${K.oro}" stroke-width=".8"/>
${txt(55, 222, 'Todo lo que', { serif: 1, it: 1, size: 10.5, fill: '#E4D6B8' })}${txt(55, 235, 'hubo que cuidar.', { serif: 1, it: 1, size: 10.5, fill: '#E4D6B8' })}
<g fill="none" stroke="${K.oro}" stroke-width=".9" stroke-linecap="round"><path d="M58 432C52 392 64 350 54 300C50 284 54 272 60 262"/><path d="M56 400c-14-4-22-14-24-26 12 2 21 12 24 26z"/><path d="M57 360c13-6 22-16 23-28-11 3-20 13-23 28z"/><path d="M55 322c-13-3-20-12-22-23 11 1 19 10 22 23z"/><path d="M57 290c11-5 18-13 19-23-9 2-16 10-19 23z"/><circle cx="64" cy="404" r="3.2"/><circle cx="68" cy="410" r="3.2"/><circle cx="62" cy="412" r="3.2"/><circle cx="46" cy="344" r="3"/><circle cx="42" cy="350" r="3"/><circle cx="48" cy="352" r="3"/></g>
</svg>`;
  }
  if (view === 'back') {
    const L = ['Este café se recogió grano por grano', 'en las laderas de nuestra finca y se secó', 'sin prisa. Lo que hay en esta bolsa es el', 'trabajo de muchas manos y de una tierra', 'que se cuida. Gracias por prepararlo con calma.'];
    const cell = (x, y, a, b) => txt(x, y, a, { anchor: 'start', w: 500, size: 5.2, ls: 1.4, fill: '#A67C52' }) + txt(x, y + 11, b, { anchor: 'start', size: 7.4, fill: K.cafe });
    return `<svg class="bag v-back ${cls}" viewBox="0 0 300 464" role="img" aria-label="Contraetiqueta de la bolsa Doña Lú">${shadow(150, 132)}
<g clip-path="url(#pclip)">${kraftBase}${mountains(342)}<path d="M0 392Q150 376 300 392V464H0Z" fill="${K.verde}"/><path d="M8 396Q150 380 292 396" stroke="${K.oro}" stroke-width=".8" fill="none"/>${seal}${tab}${volume}</g>
<use href="#wm" x="95" y="110" width="110" height="38.5" style="color:${K.cafe}"/>
${txt(150, 160, 'CAFÉ QUE SE HONRA', { w: 500, size: 6, ls: 2.4, fill: K.cafe })}
${L.map((l, i) => txt(150, 182 + i * 13, l, { serif: 1, it: 1, size: 10, fill: K.cafe })).join('')}
<line x1="40" x2="260" y1="252" y2="252" stroke="${K.cafe}" stroke-opacity=".3" stroke-width=".7"/><line x1="150" x2="150" y1="258" y2="346" stroke="${K.cafe}" stroke-opacity=".2" stroke-width=".7"/>
${cell(46, 268, 'PROCESO', P.n)}${cell(160, 268, 'ORIGEN', 'Café de Colombia')}${cell(46, 296, 'EN TAZA', P.t)}${cell(160, 296, 'PESO NETO', '500 g')}${cell(46, 324, 'TOSTIÓN', '__ / __ / ____')}${cell(160, 324, 'MOLIENDA', 'Grano · ______')}
${txt(150, 418, 'PERSONAS · TIERRA · PROCESO · CAFÉ', { w: 500, size: 5.6, ls: 2, fill: K.oro })}
${txt(150, 432, 'donalu.com.co · @donalucoffee', { size: 6.2, ls: 1, fill: K.crema })}
</svg>`;
  }
  const icons = Object.keys(ICO).map(k => `<g class="pi pi-${k}" style="display:${k === p ? 'inline' : 'none'}">${ICO[k]}</g>`).join('');
  return `<svg class="bag v-front ${cls}" viewBox="0 0 300 464" role="img" aria-label="Bolsa Doña Lú ${P.n}">${shadow(150, 132)}
<g clip-path="url(#pclip)">${kraftBase}${mountains(270)}
<image clip-path="url(#rclip)" href="../../assets/brand/rama.jpg" x="-24" y="234" width="136" height="162" preserveAspectRatio="xMidYMid slice" style="mix-blend-mode:multiply"/>
<path d="M0 362Q150 344 300 362V464H0Z" fill="${K.verde}"/><path d="M8 366Q150 349 292 366" stroke="${K.oro}" stroke-width=".8" fill="none"/>${seal}${tab}${volume}</g>
<use href="#wm" x="52" y="112" width="196" height="68.6" style="color:${K.cafe}"/>
${txt(150, 198, 'CAFÉ QUE SE HONRA', { w: 500, size: 8.4, ls: 3.4, fill: K.cafe })}
<line x1="139" x2="161" y1="209" y2="209" stroke="${K.oro}" stroke-width=".9"/>
${txt(150, 226, 'Del cultivo a su taza.', { serif: 1, it: 1, size: 12.5, fill: K.cafe })}
<g transform="translate(141 368) scale(.75)" fill="none" stroke="${K.oro}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons}</g>
${txt(150, 403, P.N, { w: 500, size: 12, ls: 4.2, fill: K.crema, cls: 'pn' })}
${txt(150, 416, P.t, { serif: 1, it: 1, size: 10.5, fill: '#E4D6B8', cls: 'pt' })}
${beansG(P.k, 427)}
${txt(150, 441, 'CAFÉ EN GRANO O MOLIDO · 500 G', { w: 500, size: 5, ls: 1.6, fill: K.oro })}
</svg>`;
}
const bagDefs = `<clipPath id="rclip"><rect x="-24" y="252" width="128" height="150"/></clipPath><clipPath id="sclip"><path d="M6 4Q6 0 12 0H98Q104 0 104 4L106 40C110 160 110 300 108 400C107 432 104 446 92 448H18C6 446 3 432 2 400C0 300 0 160 4 40Z"/></clipPath><linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.kraft}" stop-opacity="0"/><stop offset=".3" stop-color="${K.kraft}" stop-opacity=".12"/><stop offset=".6" stop-color="${K.kraft}" stop-opacity=".35"/><stop offset="1" stop-color="${K.kraft}" stop-opacity="0"/></linearGradient>`;
module.exports = { bag, bagDefs };
