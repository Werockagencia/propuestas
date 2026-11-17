// Contenido de las 12 piezas: láminas (HTML), caption, alt y notas. El calendario vive en plan.mjs.
// FUENTES (todo dato sale de aquí; lo demás va a "Validar" en el README):
//   M  = MANIFIESTO DE MARCA.pdf (texto literal)            H = HISTORIA FUNDACIONAL DE LA MARCA.pdf
//   Q  = "qué significa este café para ti.pdf" (Diana)      IE = Informe_integral_Dona_Lu_Coffee.docx
//   RE = Dona_Lu_Resumen_Ejecutivo.docx / Resumen Maestro   MAN = manual de marca v3 (tono, procesos, Casas que honran)
//   KIT = catálogo de Navidad de Diana (kits-navidad/_fuente/build.js)
import { ph, topo, wm, iso, arrow, beans, pos, tx, bagAt, icon } from './lib/ui.mjs';

const WA = 'WhatsApp · 322 470 2667';
// Dibujos lineales de los métodos de preparación (trazo del manual: línea fina dorada)
const svgLine = (c, d) => `<svg viewBox="0 0 200 260" width="100%" height="100%" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const METODO = {
  greca: (c) => svgLine(c, '<path d="M62 250h76l-10-92H72z"/><path d="M72 158h56l-4-12H76z"/><path d="M76 146h48l14-88H62z"/><path d="M58 58h84l-12-18H70z"/><circle cx="100" cy="33" r="6"/><path d="M62 62 44 52l12 22"/><path d="M138 70c34 2 36 54 2 62"/><circle cx="128" cy="205" r="5"/><path d="M90 20c-6-8 6-12 0-20M110 18c-6-8 6-12 0-20"/>'),
  filtro: (c) => svgLine(c, '<path d="M36 50h128l-44 104H80z"/><path d="M58 70l26 70M100 66v78M142 70l-26 70"/><path d="M70 154h60v10H70z"/><path d="M164 70c30 4 26 44-12 48"/><path d="M100 168v12"/><path d="M58 190h84v48a12 12 0 0 1-12 12H70a12 12 0 0 1-12-12z"/><path d="M142 204c18 0 18 30 0 30"/><path d="M84 20c-6-8 6-12 0-20M104 22c-6-8 6-12 0-20M124 20c-6-8 6-12 0-20"/>'),
  prensa: (c) => svgLine(c, '<path d="M64 70h80v170H64z"/><path d="M58 70h92V56H58z"/><path d="M104 56V18"/><circle cx="104" cy="12" r="8"/><path d="M68 120h72"/><path d="M104 56v64"/><path d="M144 92c36 0 36 100 0 100"/><path d="M56 248h96"/><path d="M68 170c10 6 20-6 36 0s26-6 36 0"/><path d="M64 76l-14 8"/>'),
};
const sig = (color = 'var(--crema)', t = 1110) => wm({ l: 390, t, w: 300, color });

// Lámina de numeral (códigos, preparación)
const numeral = (n, h, p, o = {}) => `${o.topo != null ? topo(o.topo) : ''}<div class="num${o.ghost ? ' ghost' : ''}" style="left:70px;top:${o.top ?? 150}px;font-size:${o.size ?? 520}px">${n}</div>
${tx({ b: o.b ?? 190 }, `${o.k ? `<div class="k">${o.k}</div>` : ''}<h2 class="d ${o.x || 'x4'}">${h}</h2>${p ? `<p class="p">${p}</p>` : ''}`)}`;

// Lámina de proceso (guía y empaque)
const PROC = {
  lavado: { n: 'Lavado', t: 'Limpio y brillante', d: 'Se despulpa y se lava antes de secar. Es la taza más clara de la casa.', k: 1, i: 'Gota' },
  honey: { n: 'Honey', t: 'Dulce, con cuerpo', d: 'Se seca con parte de la miel del grano. Por eso llega dulce y con cuerpo.', k: 2, i: 'Panal' },
  natural: { n: 'Natural', t: 'Frutal y profundo', d: 'Se seca con la cereza entera, sin prisa. Frutal, complejo y profundo.', k: 3, i: 'Cerezas' },
};

export const piezas = {
// ───────────────────────────────── Nº 01 · Manifiesto
'01': {
  slides: [
    { bg: 'verde', html: `${topo()}${iso({ l: 772, t: 190, w: 220, h: 220, color: 'rgba(244,237,224,.92)' })}
      ${tx({ b: 200 }, `<div class="k">Manifiesto · Doña Lú</div><h1 class="d x1">No creemos que el café sea <em>solo café.</em></h1>`)}`,
      alt: 'Fondo verde con curvas de nivel y el isotipo Lú. Texto: "No creemos que el café sea solo café." Manifiesto de Doña Lú.' },
    { bg: 'crema', photoTop: true, html: `${ph('mano-cereza.jpg', { l: 0, t: 0, w: 1080, h: 640, pos: '60% 50%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<h2 class="d x4">Creemos que se volvió un commodity cuando dejamos de mirar a <em>quienes lo hacen posible.</em></h2><p class="p">Cuando el grano importó más que las manos. Cuando el precio silenció la historia.</p>`)}`,
      alt: 'Una mano escoge una cereza roja de la rama. Texto: "Creemos que se volvió un commodity cuando dejamos de mirar a quienes lo hacen posible."' },
    { bg: 'verde', html: `${ph('amanecer.jpg', { l: 0, t: 0, w: 1080, h: 760, pos: '40% 50%' })}<div class="shade-t" style="height:220px"></div>
      ${tx({ b: 190 }, `<h2 class="d x3">Nuestro café nace <em>antes del amanecer,</em></h2><p class="p">en montañas inclinadas donde el cuerpo aprende a sostenerse.</p>`)}`, photoTop: true,
      alt: 'Silueta de una persona frente a las montañas al amanecer. Texto: "Nuestro café nace antes del amanecer, en montañas inclinadas donde el cuerpo aprende a sostenerse."' },
    { bg: 'verde', html: `${topo('oro')}${ph('recolector-retrato.jpg', { l: 84, t: 190, w: 470, h: 560, pos: '50% 28%', cls: 'framed' })}
      ${pos({ l: 610, t: 190, r: 84 }, `<div class="q-mark" style="font-size:300px">“</div><div class="k" style="margin-top:150px">Del manifiesto</div>`)}
      ${tx({ b: 190 }, `<h2 class="d x2">Aquí no hay <em>pobrecitos.</em></h2><p class="p">Hay conocimiento heredado, hay decisiones diarias.</p>`)}`,
      alt: 'Retrato de un recolector de la finca entre las matas de café. Texto: "Aquí no hay pobrecitos. Hay conocimiento heredado, hay decisiones diarias."' },
    { bg: 'bolsa', html: `${topo()}<div class="q-mark" style="left:70px;top:250px">“</div>
      ${tx({ b: 190 }, `<h2 class="d x3">Somos conscientes de que los verdaderos invasores <em>somos nosotros.</em></h2><p class="p">Por eso cultivamos sin imponer, escuchando el suelo, el clima y la vida que nos rodea.</p>`)}`,
      alt: 'Fondo verde con curvas de nivel. Texto: "Somos conscientes de que los verdaderos invasores somos nosotros. Por eso cultivamos sin imponer."' },
    { bg: 'kraft', html: `<img src="../../assets/brand/rama.png" alt="" style="position:absolute;right:-40px;top:160px;width:420px;z-index:1">
      ${tx({ b: 190, r: 300 }, `<h2 class="d x3">Este café no busca convencer <em>a todos.</em></h2><p class="p">Busca encontrarse con quienes saben que una taza puede ser un acto de gratitud, un ritual, un momento de pausa.</p>`)}`,
      alt: 'Papel kraft con la rama de café en grabado. Texto: "Este café no busca convencer a todos. Busca a quienes saben que una taza puede ser un acto de gratitud."' },
    { bg: 'verde', photo: true, html: `${ph('caficultor-mesa.jpg', { pos: '50% 40%' })}<div class="shade-b" style="height:70%;background:linear-gradient(180deg,rgba(10,33,21,0) 0%,rgba(10,33,21,.75) 35%,rgba(10,33,21,.95) 100%)"></div><div class="shade-t"></div>
      ${tx({ b: 190 }, `<h2 class="d x4">Porque detrás de cada grano hay una historia, y detrás de cada historia, <em>una responsabilidad.</em></h2>`)}`,
      alt: 'Un caficultor con sombrero junto a una mesa servida en medio del cafetal. Texto: "Detrás de cada grano hay una historia, y detrás de cada historia, una responsabilidad."' },
    { bg: 'verde', html: `${topo()}${tx({ t: 300 }, `<h2 class="d x1">No vendemos café.</h2><p class="it" style="color:var(--oro);font-size:58px">Compartimos todo lo que hubo que cuidar para que exista.</p>`, 'c')}
      ${sig('var(--crema)', 1010)}`,
      alt: 'Cierre en verde: "No vendemos café. Compartimos todo lo que hubo que cuidar para que exista." Wordmark Doña Lú y "Café que se honra".' },
  ],
  caption: `No creemos que el café sea solo café.

Nuestro café nace antes del amanecer, en montañas inclinadas, en manos que saben lo que hacen. Este es nuestro manifiesto, con las palabras con las que lo escribimos.

No vendemos café. Compartimos todo lo que hubo que cuidar para que exista. ☕

Deslice y léalo completo. Si se siente en casa, quédese: esto apenas empieza.`,
  corto: 'No vendemos café. Compartimos todo lo que hubo que cuidar para que exista.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #CaféDeColombia #CaféDeOrigen #EjeCafetero #Risaralda',
  notas: ['Fijar esta publicación en el perfil (primera de las tres fijadas).', 'Los textos de las láminas 1 a 8 son citas literales del MANIFIESTO DE MARCA.pdf (algunas recortadas, sin cambiar palabras).', 'Publicar 01, 02 y 03 seguidas el lunes 23 (7:00, 7:10 y 7:20 p. m.) para completar la primera fila.'],
},

// ───────────────────────────────── Nº 02 · Café que se honra, explicado
'02': {
  slides: [
    { bg: 'verde', photo: true, html: `${ph('cerezas-manos.jpg', { pos: '50% 35%' })}<div class="shade-b" style="height:64%"></div><div class="shade-t"></div>
      ${tx({ b: 190 }, `<div class="k">En palabras sencillas</div><h1 class="d x2">¿Qué quiere decir <em>Café que se honra?</em></h1>`)}`,
      alt: 'Manos con una batea llena de cerezas de café rojas y amarillas. Texto: "¿Qué quiere decir Café que se honra?"' },
    { bg: 'crema', html: `${topo('ink')}<img src="../../assets/brand/rama.png" alt="" style="position:absolute;right:-60px;top:150px;width:330px;z-index:1;transform:scaleX(-1) rotate(-12deg)">${tx({ mid: 1, r: 250 }, `<h2 class="d x2">Que su café <em>no salió de la nada.</em></h2><div class="rule"></div><p class="p">Antes de su taza hubo una tierra que se cuidó, unas manos que escogieron y un tiempo que se respetó.</p><p class="p"><b>Doña Lú existe para contárselo.</b></p>`)}`,
      alt: 'Texto: "Que su café no salió de la nada. Antes de su taza hubo una tierra que se cuidó, unas manos que escogieron y un tiempo que se respetó."' },
    ...[
      ['01', 'la tierra.', 'recolector-cafetal.jpg', '50% 50%', 731, 'Una finca de ladera, con guadual y sombra, donde el café se cultiva sin imponer.', 'Un recolector entre las matas de café con su recipiente de cerezas.'],
      ['02', 'las manos.', 'mano-cereza.jpg', '62% 50%', 731, 'Quien recoge decide: solo entran los granos maduros. Lo contamos con orgullo, nunca con lástima.', 'Una mano escoge una cereza roja.'],
      ['03', 'el tiempo.', 'secado.jpg', '50% 55%', 731, 'El café se seca a su ritmo, con la humedad justa. Un buen café no se acelera.', 'Café secándose en una marquesina de la finca.'],
      ['04', 'la mesa.', 'mesa-cafetal.jpg', '50% 55%', 721, 'Y al final, la suya: una taza que se toma con calma y se comparte.', 'Una mesa con mantel blanco servida en medio del cafetal.'],
    ].map(([n, w, f, p, h, txt, a], i) => ({ bg: i % 2 ? 'crema' : 'verde', html: `${ph(f, { l: 0, t: 0, w: 1080, h, pos: p })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<div class="k">Honrar · ${n}</div><h2 class="d x2"><em>${w[0].toUpperCase() + w.slice(1)}</em></h2><p class="p">${txt}</p>`)}`, photoTop: true,
      alt: `${a} Texto: "Honrar ${w} ${txt}"` })),
    { bg: 'verde', html: `${topo()}${tx({ t: 330 }, `<div class="k">Café que se honra</div><h2 class="d x1">Del cultivo <em>a su taza.</em></h2><p class="p" style="max-width:780px;margin-left:auto;margin-right:auto">Honrar la tierra, las manos, el tiempo y la mesa. Eso es todo. Y es mucho.</p>`, 'c')}${sig('var(--crema)', 1040)}`,
      alt: 'Cierre en verde: "Del cultivo a su taza. Honrar la tierra, las manos, el tiempo y la mesa." Wordmark Doña Lú.' },
  ],
  caption: `¿Qué quiere decir "Café que se honra"?

Algo sencillo: que su café no salió de la nada.
Antes de su taza hubo una tierra que se cuidó, unas manos que escogieron solo los granos maduros y un tiempo que nadie apuró.

Honrar la tierra, las manos, el tiempo y la mesa. Eso es Doña Lú.

Guarde este post para cuando alguien le pregunte por qué un buen café vale lo que vale.`,
  corto: 'Café que se honra: la tierra, las manos, el tiempo y la mesa.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #CaféDeColombia #CaféDeOrigen #CaféDeFinca #EjeCafetero',
  notas: ['Fijar como segunda publicación del perfil.', 'Los cuatro "honrar" vienen del concepto del manual (manos, tierra, tiempo, mesa).'],
},

// ───────────────────────────────── Nº 03 · Códigos de la casa
'03': {
  slides: [
    { bg: 'crema', html: `<div class="num ghost" style="right:40px;top:120px;font-size:900px;-webkit-text-stroke:2px rgba(166,124,82,.45)">7</div>
      ${tx({ b: 190 }, `<div class="k">Doña Lú · la casa</div><h1 class="d x1">Toda casa tiene <em>sus códigos.</em></h1><p class="p">Siete que en la finca se cumplen, siempre.</p>`)}`,
      alt: 'Fondo crema con un 7 gigante en filete. Texto: "Toda casa tiene sus códigos. Siete que en la finca se cumplen, siempre."' },
    ...[
      ['I', 'Solo se recogen los granos <em>maduros.</em>', 'Uno verde cambia la taza. Por eso se escoge grano por grano.'],
      ['II', 'El secado <em>no se apura.</em>', 'El grano tiene que llegar a su humedad justa. Si se guarda antes, la recupera y pierde calidad.'],
      ['III', 'A la gente se le muestra <em>con orgullo.</em>', 'Aquí no hay pobrecitos: hay conocimiento heredado.'],
      ['IV', 'La finca <em>se comparte.</em>', 'Con monos aulladores, conejos y pájaros. Los invasores somos nosotros.'],
      ['V', 'Un empaque para <em>los tres cafés.</em>', 'Lavado, Honey y Natural visten igual. Solo cambia la etiqueta.'],
      ['VI', 'Del cultivo a su taza, <em>sin intermediarios.</em>', 'De la finca de la familia a su mesa.'],
      ['VII', 'Aquí no se grita <em>“¡cómprelo ya!”.</em>', 'Le contamos lo que costó hacerlo. Usted decide.'],
    ].map(([n, h, p], i) => ({ bg: ['verde', 'kraft', 'crema'][i % 3], html: numeral(n, h, p, { x: 'x2', size: n.length > 2 ? 560 : 680, top: 130, topo: i % 3 === 0 ? '' : null, ghost: i % 3 === 2 }),
      alt: `Código ${n} de la casa, con el numeral romano grande. Texto: "${h.replace(/<[^>]+>/g, '')} ${p}"` })),
  ],
  caption: `Toda casa tiene sus códigos. Estos son los de Doña Lú:

I. Solo se recogen los granos maduros.
II. El secado no se apura.
III. A la gente se le muestra con orgullo.
IV. La finca se comparte (los invasores somos nosotros).
V. Un empaque para los tres cafés.
VI. Del cultivo a su taza, sin intermediarios.
VII. Aquí no se grita "¡cómprelo ya!".

¿Cuál le sorprendió más? Lo leemos en los comentarios.`,
  corto: 'Siete códigos que en la finca se cumplen, siempre.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #CaféDeColombia #CaféDeOrigen #CaféDeEspecialidadColombiano #EjeCafetero',
  notas: ['Fijar como tercera publicación del perfil.', 'Código II sale del texto de Diana (humedad del secado). Código VI usa la frase "Del cultivo a tu taza. Sin intermediarios." del informe integral: validar que hoy todo el café vendido es de la finca familiar.'],
},

// ───────────────────────────────── Nº 04 · Una bolsa, tres cafés
'04': {
  slides: [
    { bg: 'verde', html: `${topo()}${tx({ t: 150 }, `<div class="k">Nuevo empaque</div><h1 class="d x2">Una bolsa.<br><em>Tres cafés.</em></h1>`)}
      ${bagAt('front', 'lavado', { l: 330, t: 530, w: 430 })}`,
      alt: 'Ilustración del nuevo empaque Doña Lú: bolsa kraft crema con fuelles verdes, wordmark café y rama con cerezas. Texto: "Una bolsa. Tres cafés."' },
    { bg: 'crema', html: `${tx({ t: 150 }, `<h2 class="d x4">Lavado, Honey y Natural ahora <em>visten igual.</em></h2><p class="p s">Kraft crema, el verde de la finca y la rama con cerezas.</p>`)}
      ${bagAt('front', 'lavado', { l: 36, t: 600, w: 336 })}${bagAt('front', 'honey', { l: 372, t: 600, w: 336 })}${bagAt('front', 'natural', { l: 708, t: 600, w: 336 })}`,
      alt: 'Ilustración de las tres bolsas iguales, una junto a otra: Lavado, Honey y Natural. Texto: "Lavado, Honey y Natural ahora visten igual."' },
    { bg: 'verde', html: `${topo()}${tx({ t: 150 }, `<h2 class="d x3">Lo único que cambia es <em>la banda de abajo.</em></h2>`)}
      ${pos({ l: 84, r: 84, t: 470 }, ['lavado', 'honey', 'natural'].map((p) => `<div style="display:grid;grid-template-columns:170px 1fr auto;gap:36px;align-items:center;padding:52px 0;border-top:1px solid rgba(201,164,92,.35)"><div style="width:150px;height:150px;border:1px solid rgba(201,164,92,.55);border-radius:50%;display:flex;align-items:center;justify-content:center">${icon(p, 84)}</div><div><div class="d x5">${PROC[p].n}</div><p class="it" style="margin-top:6px;font-size:40px;color:var(--oro)">${PROC[p].t}</p></div>${beans(PROC[p].k)}</div>`).join(''))}`,
      alt: 'Los tres íconos dorados de proceso: gota para Lavado (limpio y brillante), panal para Honey (dulce, con cuerpo) y cerezas para Natural (frutal y profundo).' },
    { bg: 'kraft', html: `${tx({ t: 150 }, `<div class="k">El código de la casa</div><h2 class="d x2">Grano <em>por grano.</em></h2><p class="p s">Uno, dos o tres granos dorados: así se reconoce cada proceso, incluso de lejos.</p>`)}
      ${pos({ l: 84, r: 84, t: 600 }, `<ul class="rows">${['lavado', 'honey', 'natural'].map(p => `<li style="grid-template-columns:260px 1fr 200px;padding:46px 0;border-color:rgba(91,58,35,.3)"><span class="d x5" style="color:var(--cafe)">${PROC[p].n}</span><span class="it" style="font-size:36px;color:var(--cafe)">${PROC[p].t}</span>${beans(PROC[p].k, 'justify-content:flex-end')}</li>`).join('')}</ul>`)}`,
      alt: 'Tabla en papel kraft: Lavado con un grano dorado, Honey con dos y Natural con tres. Texto: "Grano por grano."' },
    { bg: 'crema', html: `${bagAt('back', 'honey', { l: 60, t: 230, w: 520 })}
      ${tx({ l: 630, t: 330, r: 84 }, `<div class="k">Contraetiqueta</div><h2 class="d x3">Atrás, <em>la historia.</em></h2><p class="p s">Proceso, nota de taza, peso, fecha de tostión y molienda. Y unas líneas sobre quienes lo cuidaron.</p>`)}`,
      alt: 'Ilustración de la parte de atrás de la bolsa con el texto de la marca y los datos: proceso, origen, en taza, peso, tostión y molienda. Texto: "Atrás, la historia."' },
    { bg: 'verde', html: `${topo()}${bagAt('side', 'natural', { l: 215, t: 180, w: 165 })}${bagAt('front', 'natural', { l: 405, t: 180, w: 460 })}
      ${tx({ b: 190 }, `<h2 class="d x3">Cambia el proceso. <em>El cuidado es el mismo.</em></h2>`, 'c')}`,
      alt: 'Ilustración del fuelle verde (Personas, Tierra, Proceso, Café) y el frente de la bolsa Natural. Texto: "Cambia el proceso. El cuidado es el mismo."' },
    { story: true, bg: 'verde', file: 'historia', html: `${topo()}${tx({ t: 340 }, `<div class="k">Nuevo empaque</div><h1 class="d x2">Una bolsa.<br><em>Tres cafés.</em></h1>`, 'c')}
      ${bagAt('front', 'honey', { l: 300, t: 720, w: 480 })}`,
      alt: 'Historia: ilustración de la bolsa Honey sobre verde. "Una bolsa. Tres cafés."' },
  ],
  caption: `Una bolsa. Tres cafés.

Lavado, Honey y Natural ahora visten igual: kraft crema, el verde de la finca y la rama con cerezas.
Lo único que cambia es la banda de abajo: el nombre del proceso, su ícono dorado y el código grano por grano (uno, dos o tres granos).

Cambia el proceso. El cuidado es el mismo.

Así se ve el nuevo empaque.`,
  corto: 'Un empaque para los tres procesos: solo cambia la etiqueta.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #NuevoEmpaque #CaféDeColombia #CaféDeOrigen #Packaging',
  notas: ['Las bolsas son ILUSTRACIONES del manual (empaque único, dirección de Diana del 17 nov), no fotos (uso interno: no se rotula en las láminas, por decisión de David). El caption dice "Así se ve el nuevo empaque" y nunca habla de foto. Si para el 25 nov ya hay bolsas reales impresas, reemplazar por fotos reales.', 'Validar que el empaque único ya está aprobado para producción antes de anunciarlo.', 'Historia: pegar el sticker de mención al post en el área libre debajo de la bolsa (entre 1.480 y 1.580 px de alto).'],
},

// ───────────────────────────────── Nº 05 · Guía de procesos
'05': {
  slides: [
    { bg: 'kraft', html: `${pos({ l: 84, r: 84, t: 210 }, `<div style="display:flex;gap:40px">${['lavado', 'honey', 'natural'].map(p => `<div style="width:270px;height:270px;border:1.5px solid rgba(91,58,35,.4);border-radius:50%;display:flex;align-items:center;justify-content:center">${icon(p, 150, 'var(--cafe)', 1)}</div>`).join('')}</div>`)}
      ${tx({ b: 190 }, `<div class="k">Guía para guardar</div><h1 class="d x2">Lavado, Honey <em>o Natural.</em></h1><p class="p">¿Qué cambia entre los tres? Se lo contamos sin palabras difíciles.</p>`)}`,
      alt: 'Tres íconos grandes sobre papel kraft: gota, panal y cerezas. Texto: "Lavado, Honey o Natural. ¿Qué cambia entre los tres?"' },
    { bg: 'crema', html: `${ph('cerezas-manos.jpg', { l: 0, t: 0, w: 1080, h: 640, pos: '50% 62%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<h2 class="d x4">Los tres son café de la finca. Lo que cambia es <em>qué se hace con la cereza</em> antes de secarla.</h2><p class="p s">Cada camino deja algo distinto en la taza.</p>`)}`, photoTop: true,
      alt: 'Cerezas de café recién recogidas en una batea. Texto: "Los tres son café de la finca. Lo que cambia es qué se hace con la cereza antes de secarla."' },
    ...['lavado', 'honey', 'natural'].map((p, i) => ({ bg: 'verde', html: `${topo()}<div class="num ghost" style="right:30px;top:120px;font-size:600px">0${i + 1}</div>
      ${pos({ l: 84, t: 210 }, icon(p, 150, 'var(--oro)', 1.1))}
      ${tx({ b: 190 }, `<div class="k">Proceso 0${i + 1} · ${PROC[p].i}</div><h2 class="d x1">${PROC[p].n}</h2><p class="it" style="color:var(--oro);font-size:56px">${PROC[p].t}.</p><p class="p">${PROC[p].d}</p>${beans(PROC[p].k)}`)}`,
      alt: `Ícono dorado (${PROC[p].i.toLowerCase()}) y ${PROC[p].k} grano(s) llenos. Texto: "${PROC[p].n}. ${PROC[p].t}. ${PROC[p].d}"` })),
    { bg: 'crema', html: `${tx({ t: 150 }, `<div class="k">De un vistazo</div><h2 class="d x2">Los tres, <em>lado a lado.</em></h2>`)}
      ${pos({ l: 84, r: 84, t: 480 }, `<ul class="rows">${['lavado', 'honey', 'natural'].map(p => `<li style="grid-template-columns:96px 250px 1fr 130px;padding:62px 0;border-color:rgba(166,124,82,.45)">${icon(p, 64, 'var(--tierra)', 1.2)}<span class="d x5">${PROC[p].n}</span><span class="it" style="font-size:38px;color:var(--cafe)">${PROC[p].t}</span>${beans(PROC[p].k, 'justify-content:flex-end;gap:10px')}</li>`).join('')}</ul>`)}
      ${tx({ b: 190 }, `<p class="p s">Se puede pedir en grano o molido.</p>`)}`,
      alt: 'Tabla comparativa: Lavado, limpio y brillante; Honey, dulce y con cuerpo; Natural, frutal y profundo, cada uno con su ícono y su código de granos.' },
    { bg: 'verde', html: `${topo()}${tx({ t: 330 }, `<h2 class="d x1">¿Cuál es <em>el suyo?</em></h2><p class="p" style="max-width:800px;margin-left:auto;margin-right:auto">Escríbanos y le ayudamos a elegir según cómo lo prepara y a qué hora lo toma.</p><div class="btnlike">${WA}</div>`, 'c')}${sig('var(--crema)', 1060)}`,
      alt: 'Cierre en verde: "¿Cuál es el suyo? Escríbanos y le ayudamos a elegir." WhatsApp 322 470 2667.' },
    { story: true, bg: 'verde', file: 'historia-encuesta', html: `${topo()}${tx({ t: 400 }, `<div class="k">Encuesta</div><h1 class="d x2">¿Cuál toma <em>usted?</em></h1>`, 'c')}
      ${['lavado', 'honey', 'natural'].map((p, i) => pos({ l: 120 + i * 290, t: 740, w: 260 }, `<div style="display:flex;flex-direction:column;align-items:center;gap:26px">${icon(p, 160, 'var(--oro)', 1.1)}<span class="k" style="color:var(--crema);font-size:24px">${PROC[p].n}</span><span class="it" style="font-size:34px;color:var(--oro);text-align:center">${PROC[p].t}</span></div>`)).join('')}
      `,
      alt: 'Historia con encuesta: "¿Cuál toma usted?" con los tres íconos de proceso.' },
  ],
  caption: `Lavado, Honey o Natural. ¿Qué cambia?

Los tres son café de la finca. La diferencia está en lo que se hace con la cereza antes de secarla:

Lavado: se despulpa y se lava. Limpio y brillante.
Honey: se seca con parte de la miel del grano. Dulce, con cuerpo.
Natural: se seca con la cereza entera, sin prisa. Frutal y profundo.

En la bolsa lo reconoce por el código grano por grano: uno, dos o tres granos dorados.

Guárdelo para su próxima compra. ¿Cuál es el suyo? Le ayudamos a elegir por WhatsApp: 322 470 2667.`,
  corto: 'Lavado, Honey y Natural, explicados en una guía para guardar.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #ProcesoHoney #CaféNatural #CaféLavado #CaféDeOrigen #CaféDeColombia',
  notas: ['Descripciones de proceso y notas de taza del manual v3 y el Resumen Maestro.', 'Historia: sticker de encuesta con Lavado / Honey / Natural en el área libre debajo de los íconos.', 'Validar si los tres procesos se venden en grano y molido (la bolsa dice "Café en grano o molido").'],
},

// ───────────────────────────────── Nº 06 · Puente a Navidad
'06': {
  slides: [
    { bg: 'kraft', html: `${tx({ t: 150 }, `<div class="k">Kits de Navidad</div><h1 class="d x3">Los tres, <em>en una caja.</em></h1>`)}
      ${ph('kit-07-mesa.jpg', { l: 110, t: 340, w: 860, h: 860, raw: true, pos: '50% 50%' })}`,
      alt: 'Foto de una caja de madera pino abierta con tres bolsas de café Doña Lú. Texto: "Los tres, en una caja. Kits de Navidad."' },
    { bg: 'verde', html: `${topo()}<img src="../../assets/brand/rama.png" alt="" style="position:absolute;right:-50px;top:170px;width:440px;z-index:1;transform:scaleX(-1)">
      ${tx({ b: 190, r: 260 }, `<h2 class="d x3">Lavado, Honey y Natural, <em>para regalar.</em></h2><p class="p">250 g de cada uno en una caja de madera pino. Para quien quiere probarlos todos.</p>`)}`,
      alt: 'Rama de café en grabado sobre verde. Texto: "Lavado, Honey y Natural, para regalar. 250 g de cada uno en una caja de madera pino."' },
    { bg: 'crema', html: `${tx({ t: 150 }, `<h2 class="d x5">Diez kits, <em>entre cestas y cajas.</em></h2>`)}
      ${[['kit-01-cuadrado.jpg', 84, 300], ['kit-04-cuadrado.jpg', 552, 300], ['kit-09-cuadrado.jpg', 84, 764], ['kit-10-cuadrado.jpg', 552, 764]].map(([f, l, t]) => ph(f, { l, t, w: 444, h: 440, raw: true, pos: '50% 50%' })).join('')}`,
      alt: 'Cuatro fotos de kits de Navidad: cestas de madera con bolsas de café, una con mug y otra con termo. Texto: "Diez kits, entre cestas y cajas."' },
    { bg: 'verde', html: `${topo()}${tx({ mid: 1 }, `<h2 class="d x1">Para la familia, para su equipo, <em>para sus clientes.</em></h2><div class="rule"></div><p class="p">Café de la finca en cestas y cajas de madera pino, listas para entregar.</p>`)}`,
      alt: 'Texto en verde: "Para la familia, para su equipo, para sus clientes. Café de la finca en cestas y cajas de madera pino."' },
    { bg: 'kraft', html: `${tx({ mid: 1 }, `<div style="display:flex;justify-content:center">${icon('regalo', 170, 'var(--cafe)', 1)}</div><h2 class="d x1">Pídalo <em>por WhatsApp.</em></h2><p class="p">Le mostramos los diez kits y le confirmamos el envío. Pida con tiempo para que llegue antes de Navidad.</p><div class="btnlike" style="background:var(--verde);color:var(--crema)">${WA}</div>`, 'c')}`,
      alt: 'Ícono de regalo. Texto: "Pídalo por WhatsApp. Le mostramos los diez kits y le confirmamos el envío." WhatsApp 322 470 2667.' },
    { story: true, bg: 'kraft', file: 'historia-enlace', html: `${tx({ t: 340 }, `<div class="k">Kits de Navidad</div><h1 class="d x3">Los tres, <em>en una caja.</em></h1>`, 'c')}
      ${ph('kit-07-mesa.jpg', { l: 84, t: 620, w: 912, h: 912, raw: true })}`,
      alt: 'Historia: caja de madera con tres bolsas de café. "Los tres, en una caja." Sticker de enlace a los kits.' },
  ],
  caption: `Los tres, en una caja. 🎁

Lavado, Honey y Natural, 250 g de cada uno, en una caja de madera pino. Para quien quiere probarlos todos (o para regalarle a alguien la finca entera en una mesa).

Tenemos diez kits de Navidad, entre cestas y cajas, para la familia, el equipo de trabajo o los clientes.

Pídalo por WhatsApp al 322 470 2667 (wa.me/573224702667): le mostramos los kits y le confirmamos el envío. Pida con tiempo para que llegue antes de Navidad.`,
  corto: 'Los kits de Navidad: Lavado, Honey y Natural en una caja.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #RegalosDeNavidad #RegalosCorporativos #KitsDeNavidad #CaféDeColombia',
  notas: ['Fotos de los kits con el tratamiento nuevo (kits-fotos/: mesa de regalos y cuadrado), sacadas de capturas del catálogo de Diana; se muestran a su tamaño o más pequeñas, nunca ampliadas. Pedir a Diana las fotos originales para mejorar la nitidez. Las bolsas de los kits son la edición blanca de Navidad, no el empaque único: es correcto, es lo que se entrega.', 'Contenido del kit 7 (3 × 250 g en caja de madera pino) según el catálogo. Validar fecha límite de pedidos y cobertura de envío para agregarla al caption.', 'Historia: sticker de enlace a la página de kits (donalu.com.co/kits-navidad/ cuando esté publicada) o a WhatsApp.', 'Coordinar con la pauta: este post orgánico no repite los anuncios, presenta el regalo desde la marca.'],
},

// ───────────────────────────────── Nº 07 · La finca
'07': {
  slides: [
    { bg: 'verde', photo: true, html: `${ph('recolector-ladera.jpg', { pos: '50% 30%' })}<div class="shade-b" style="height:60%"></div><div class="shade-t"></div>
      ${tx({ b: 190 }, `<h1 class="d x1">Los invasores <em>somos nosotros.</em></h1><div class="cite">Un trabajador de la finca</div>`)}`,
      alt: 'Un recolector con sombrero recoge cerezas en la ladera. Texto: "Los invasores somos nosotros", un trabajador de la finca.' },
    { bg: 'crema', html: `${ph('willys.jpg', { l: 0, t: 0, w: 1080, h: 640, pos: '50% 60%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<div class="k">La finca</div><h2 class="d x3">Una finca de familia <em>en Arabia, Risaralda.</em></h2><p class="p s">En el Eje Cafetero, en la tierra donde nació la familia.</p>`)}`, photoTop: true,
      alt: 'Un Willys rojo en un potrero junto al cafetal y un caficultor con sombrero. Texto: "Una finca de familia en Arabia, Risaralda."' },
    { bg: 'verde', html: `${topo()}${tx({ mid: 1 }, `<h2 class="d x1">Durante años, el café <em>se dejó de sembrar.</em></h2><div class="rule"></div><p class="p">Cuidarlo costaba más de lo que pagaban por él. Hace unos tres años, la familia volvió a sembrarlo, mata por mata.</p>`)}`,
      alt: 'Texto en verde: "Durante años, el café se dejó de sembrar. Hace unos tres años, la familia volvió a sembrarlo, mata por mata."' },
    { bg: 'kraft', html: `<img src="../../assets/brand/rama.png" alt="" style="position:absolute;left:-30px;top:110px;width:380px;z-index:1">
      ${tx({ l: 380, t: 230 }, `<h2 class="d x2">Aquí vivían otros <em>primero.</em></h2>`)}
      ${tx({ b: 190 }, `<p class="it" style="font-size:54px">Monos aulladores en el guadual, conejos y pájaros de todas las especies. Hasta pumas se han visto.</p><p class="p"><b>Nosotros llegamos después.</b></p>`)}`,
      alt: 'Rama de café en grabado sobre kraft. Texto: "Aquí vivían otros primero. Monos aulladores en el guadual, conejos y pájaros. Hasta pumas se han visto."' },
    { bg: 'crema', html: `${ph('recolector-cafetal.jpg', { l: 0, t: 0, w: 1080, h: 640, pos: '50% 45%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<h2 class="d x3">Cada lote es <em>distinto.</em></h2><p class="p s">Unos con sombra y otros al sol. Unos secos y otros húmedos por el guadual. Algunos tan inclinados que caminarlos da vértigo.</p>`)}`, photoTop: true,
      alt: 'Recolector entre matas de café cargadas. Texto: "Cada lote es distinto: unos con sombra y otros al sol, algunos muy inclinados."' },
    { bg: 'bolsa', html: `${topo()}${tx({ mid: 1 }, `<h2 class="d x1">Por eso se cultiva <em>sin imponer:</em></h2><p class="it" style="font-size:60px;color:var(--crema)">escuchando el suelo, el clima y la vida que nos rodea.</p><div class="cite">Del manifiesto de Doña Lú</div>`)}`,
      alt: 'Texto en verde: "Por eso se cultiva sin imponer: escuchando el suelo, el clima y la vida que nos rodea."' },
    { bg: 'verde', html: `${ph('mesa-cafetal.jpg', { l: 0, t: 0, w: 1080, h: 721, pos: '50% 50%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 290 }, `<h2 class="d x2">De la finca <em>a su mesa.</em></h2>`, 'c')}${sig('var(--crema)', 1130)}`, photoTop: true,
      alt: 'Mesa servida en medio del cafetal. Texto: "De la finca a su mesa." Wordmark Doña Lú.' },
  ],
  caption: `"Los invasores somos nosotros."

Lo dijo un trabajador de la finca y nos cambió la manera de mirarla.

En la finca de la familia, en Arabia, Risaralda, vivían otros primero: monos aulladores en el guadual, conejos, pájaros de todas las especies. Hasta pumas se han visto.

Por eso aquí se cultiva sin imponer: escuchando el suelo, el clima y la vida alrededor. 🌿`,
  corto: 'La finca familiar en Arabia, Risaralda, y quienes vivían ahí primero.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #Risaralda #EjeCafetero #PaisajeCulturalCafetero #CaféDeFinca #CaféDeColombia',
  notas: ['Fuentes: Q (fauna, lotes, frase del trabajador), RE (finca propia en Arabia, abandono del café y resiembra hace ~3 años), M (sin imponer).', 'Validar: "Hace unos tres años" (resiembra), "la tierra donde nació la familia" (la historia del suegro y sus hermanos) y que el Willys es de la finca.', 'No se menciona el desplazamiento ni el terremoto de agosto 2026: es decisión de la familia contarlo o no.'],
},

// ───────────────────────────────── Nº 08 · Aquí no hay pobrecitos
'08': {
  slides: [
    { bg: 'verde', photo: true, html: `${ph('recolector-perfil.jpg', { pos: '50% 40%' })}<div class="shade-b" style="height:56%"></div><div class="shade-t"></div>
      ${tx({ b: 190 }, `<div class="k">Quienes lo hacen</div><h1 class="d x1">Aquí no hay <em>pobrecitos.</em></h1>`)}`,
      alt: 'Recolector de perfil, con gorra, recogiendo cerezas entre las matas. Texto: "Aquí no hay pobrecitos."' },
    { bg: 'verde', html: `${topo()}${tx({ mid: 1 }, `<h2 class="d x2">Hay conocimiento heredado. <em>Hay decisiones diarias.</em></h2><div class="rule"></div><p class="p">Hay personas que entienden que una mala cosecha no se recupera y que un buen café se construye con paciencia, respeto y amor.</p><div class="cite">Del manifiesto de Doña Lú</div>`)}`,
      alt: 'Texto en verde: "Hay conocimiento heredado. Hay decisiones diarias. Un buen café se construye con paciencia, respeto y amor."' },
    { bg: 'crema', html: `${ph('mano-cereza.jpg', { l: 0, t: 0, w: 1080, h: 660, pos: '64% 50%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ b: 190 }, `<div class="k">Grano por grano</div><h2 class="d x2">Recoger es <em>escoger.</em></h2><p class="p s">Solo entran los granos maduros, uno por uno. Si se recogen todos, se daña la taza y sufre la planta.</p>`)}`, photoTop: true,
      alt: 'Mano que escoge una cereza roja entre otras verdes. Texto: "Recoger es escoger. Solo entran los granos maduros, uno por uno."' },
    { bg: 'bolsa', html: `${topo()}${tx({ mid: 1 }, `<h2 class="d x1">Antes de que salga el sol, <em>ya hay gente en la ladera.</em></h2><p class="p">Abonando cada mata, limpiando la maleza alrededor, escogiendo lo que está listo.</p>`)}`,
      alt: 'Texto en verde: "Antes de que salga el sol, ya hay gente en la ladera. Abonando cada mata, escogiendo lo que está listo."' },
    { bg: 'kraft', html: `${tx({ t: 240, r: 360 }, `<h2 class="d x2">Ellos suben y bajan la ladera <em>como si nada.</em></h2><div class="rule" style="background:var(--cafe)"></div><p class="p">Nosotros, de ciudad, todavía nos agarramos de las matas.</p>`)}
      <img src="../../assets/brand/rama.png" alt="" style="position:absolute;right:-20px;bottom:110px;width:330px;z-index:1">`,
      alt: 'Papel kraft con rama de café. Texto: "Ellos suben y bajan la ladera como si nada. Nosotros, de ciudad, todavía nos agarramos de las matas."' },
    { bg: 'verde', photo: true, html: `${ph('cerezas-manos.jpg', { pos: '50% 40%' })}<div class="shade-b" style="height:72%;background:linear-gradient(180deg,rgba(10,33,21,0) 0%,rgba(10,33,21,.8) 38%,rgba(10,33,21,.96) 100%)"></div><div class="shade-t"></div>
      ${tx({ b: 190 }, `<p class="p">El día que llegamos con una cámara se pusieron felices. Como si alguien, por fin, dijera:</p><h2 class="d x2"><em>esto que hace importa.</em></h2>`)}`,
      alt: 'Manos con una batea de cerezas recién recogidas. Texto: "El día que llegamos con una cámara se pusieron felices. Como si alguien, por fin, dijera: esto que hace importa."' },
    { bg: 'verde', html: `${topo()}${tx({ t: 330 }, `<h2 class="d x1">Grano <em>por grano.</em></h2><p class="p" style="max-width:820px;margin-left:auto;margin-right:auto">Esto es lo que hubo que cuidar para que exista su café de mañana.</p>`, 'c')}${sig('var(--crema)', 1040)}`,
      alt: 'Cierre: "Grano por grano. Esto es lo que hubo que cuidar para que exista su café de mañana." Wordmark Doña Lú.' },
    { story: true, bg: 'verde', file: 'historia', html: `${topo()}${ph('recolector-perfil.jpg', { l: 90, t: 330, w: 900, h: 1095, pos: '50% 40%', cls: 'framed' })}<div class="shade-b" style="left:90px;right:90px;top:800px;bottom:auto;height:625px"></div>
      ${tx({ l: 150, r: 150, t: 1130 }, `<h1 class="d x3">Aquí no hay <em>pobrecitos.</em></h1>`)}`,
      alt: 'Historia: retrato del recolector enmarcado. "Aquí no hay pobrecitos."' },
  ],
  caption: `Aquí no hay pobrecitos.

Hay conocimiento heredado. Hay decisiones diarias. Hay gente que sube y baja la ladera como si nada (nosotros, de ciudad, todavía nos agarramos de las matas).

Recoger es escoger: solo entran los granos maduros, uno por uno. Un verde cambia la taza; una rama maltratada cambia la próxima cosecha.

El día que llegamos con una cámara, se pusieron felices. Como si alguien, por fin, dijera: esto que hace importa.

Grano por grano. 🍒`,
  corto: 'La gente de la finca, con admiración: recoger es escoger.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #Caficultores #CaféDeColombia #EjeCafetero #OrgulloCafetero',
  notas: ['Fuentes: M (manifiesto), H y Q (cámara, recolección selectiva, ladera, abono y maleza).', 'Validar con Diana: nombre y permiso de cada persona que aparece en las fotos. Si quieren, el caption puede nombrarlos ("Él es ___").', 'Tono: admiración, nunca lástima. No usar fotos de cansancio.', 'Historia: sticker de mención al post en el área libre debajo de la foto.'],
},

// ───────────────────────────────── Nº 09 · Cómo prepararlo
'09': {
  slides: [
    { bg: 'verde', html: `${topo()}${tx({ t: 150 }, `<div class="k">Cómo prepararlo en casa</div><h1 class="d x2">Un buen café <em>no se acelera.</em></h1>`)}
      ${ph('mesa-cafetal.jpg', { l: 0, t: 629, w: 1080, h: 721, pos: '50% 50%' })}<div class="shade-b" style="height:300px;top:auto"></div>`,
      alt: 'Mesa servida en el cafetal. Texto: "Un buen café no se acelera. Cómo prepararlo en casa."' },
    { bg: 'crema', html: numeral('01', 'Diez gramos por cada <em>180 ml de agua.</em>', 'Más o menos dos cucharadas rasas por taza. ¿Lo quiere más fuerte? Suba el café, no el tiempo.', { k: 'La medida', x: 'x3', topo: 'ink' }),
      alt: 'Numeral 01, la medida: "Diez gramos por cada 180 ml de agua. Más o menos dos cucharadas rasas por taza."' },
    { bg: 'verde', html: numeral('02', 'Caliente, <em>no hirviendo.</em>', 'Alrededor de 92 °C. Cuando el agua hierva, déjela reposar un minuto antes de servirla.', { k: 'El agua', x: 'x2', topo: '' }),
      alt: 'Numeral 02, el agua: "Caliente, no hirviendo. Alrededor de 92 °C: déjela reposar un minuto después de hervir."' },
    { bg: 'kraft', html: `<div class="num" style="left:70px;top:150px;font-size:400px">03</div>${tx({ l: 560, t: 250 }, `<div class="k">La molienda</div><h2 class="d x3">Según cómo lo <em>prepare.</em></h2>`)}
      ${pos({ l: 84, r: 84, t: 600 }, `<ul class="rows">${[['Fina', 'Greca'], ['Media', 'Filtro, goteo o V60'], ['Gruesa', 'Prensa francesa']].map(([a, b]) => `<li style="border-color:rgba(91,58,35,.3);padding:40px 0;grid-template-columns:260px 1fr"><span class="d x5" style="color:var(--cafe)">${a}</span><span class="it" style="font-size:46px;color:var(--cafe)">${b}</span></li>`).join('')}</ul>`)}${tx({ b: 190 }, `<p class="p s">¿Compra en grano? Muélalo justo antes de prepararlo.</p>`)}`,
      alt: 'Numeral 03, la molienda: fina para greca, media para filtro o goteo, gruesa para prensa francesa.' },
    ...[
      ['Greca', 'greca', ['Agua hasta la válvula.', 'Café en el filtro, sin apretar.', 'Fuego medio. Retírela apenas empiece a sonar.'], 'verde', ''],
      ['Filtro', 'filtro', ['Moje el café con un poco de agua.', 'Espere 30 segundos: el café se abre.', 'Sirva el resto despacio, en círculos.'], 'crema', ' · goteo o V60'],
      ['Prensa', 'prensa', ['Molienda gruesa y agua caliente.', 'Tape y espere cuatro minutos.', 'Presione despacio y sirva de una vez.'], 'verde', ' · francesa'],
    ].map(([m, svg, steps, bg, sub], i) => ({ bg, html: `${bg === 'verde' ? topo() : topo('ink')}<div class="k" style="position:absolute;left:84px;top:190px">Método 0${i + 1}${sub}</div>
      <div class="d" style="position:absolute;left:78px;top:250px;font-size:190px;line-height:.9"><em>${m}</em></div>
      <div style="position:absolute;right:84px;top:170px;width:300px;height:400px;z-index:2">${METODO[svg](bg === 'verde' ? 'var(--oro)' : 'var(--tierra)')}</div>
      ${pos({ l: 84, r: 84, t: 640 }, steps.map((s, j) => `<div style="display:grid;grid-template-columns:110px 1fr;align-items:baseline;padding:42px 0;border-top:1px solid ${bg === 'verde' ? 'rgba(201,164,92,.35)' : 'rgba(166,124,82,.4)'}"><span class="d" style="font-size:80px;line-height:.8;color:${bg === 'verde' ? 'var(--oro)' : 'var(--tierra)'}">${j + 1}</span><span class="it" style="font-size:50px">${s}</span></div>`).join(''))}`,
      alt: `Método ${m}${sub}, con un dibujo lineal: ${steps.map((s, j) => `${j + 1}. ${s}`).join(' ')}` })),
    { bg: 'verde', html: `${topo()}${tx({ t: 330 }, `<h2 class="d x1">Y luego, <em>despacio.</em></h2><p class="p" style="max-width:820px;margin-left:auto;margin-right:auto">Así se toma lo que hubo que cuidar. ¿Usted cómo lo prepara?</p>`, 'c')}${sig('var(--crema)', 1040)}`,
      alt: 'Cierre: "Y luego, despacio. Así se toma lo que hubo que cuidar. ¿Usted cómo lo prepara?"' },
  ],
  caption: `Un buen café no se acelera. ☕

Mañana es festivo. Para esa taza sin afán, lo básico para prepararlo en casa:

· La medida: 10 g de café por cada 180 ml de agua (unas dos cucharadas rasas por taza).
· El agua: caliente, no hirviendo. Alrededor de 92 °C.
· La molienda: fina para greca, media para filtro, gruesa para prensa francesa.

Y luego, despacio. Así se toma lo que hubo que cuidar.

Guárdelo y cuéntenos: ¿usted cómo lo prepara?`,
  corto: 'Cómo preparar un buen café en casa: medida, agua, molienda y tres métodos.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #CómoPrepararCafé #Greca #PrensaFrancesa #CaféEnCasa #CaféDeColombia',
  notas: ['Sale el lunes 7 de diciembre (Día de las Velitas), víspera del festivo del martes 8 (Inmaculada Concepción): el caption invita a la mañana sin afán del festivo.', 'Medida y temperatura (10 g / 180 ml, 92 °C) salen de la ficha técnica del drive: validar con Diana o con quien tuesta. Las guías de molienda y métodos son prácticas estándar de preparación.'],
},

// ───────────────────────────────── Nº 10 · Casas que honran
'10': {
  slides: [
    { bg: 'bolsa', html: `${topo('oro')}${iso({ l: 340, t: 200, w: 400, h: 400, color: 'var(--oro)', acc: 'var(--oro)', ring: true })}
      ${tx({ b: 190 }, `<div class="k">Programa para negocios</div><h1 class="d x1">Casas que <em>honran.</em></h1><p class="p">Café de la finca para restaurantes, hoteles, oficinas y tiendas.</p>`, 'c')}`,
      alt: 'Sello dorado con el isotipo Lú sobre verde. Texto: "Casas que honran. Café de la finca para restaurantes, hoteles, oficinas y tiendas."' },
    { bg: 'crema', html: `${topo('ink')}${tx({ mid: 1 }, `<div class="k">¿Qué es?</div><h2 class="d x2">Café para negocios, <em>con su historia.</em></h2><div class="rule"></div><p class="p">Casas que honran es nuestro programa para negocios: usted sirve café de la finca y sus clientes saben de dónde viene y quién lo cultivó.</p>`)}`,
      alt: 'Texto: "Casas que honran es nuestro programa para negocios: usted sirve café de la finca y sus clientes saben de dónde viene."' },
    { bg: 'verde', html: `${ph('mesa-cafetal.jpg', { l: 0, t: 0, w: 1080, h: 560, pos: '50% 55%' })}<div class="shade-t" style="height:200px"></div>
      ${tx({ t: 640 }, `<div class="k">¿Para quién?</div>`)}${pos({ l: 84, r: 84, t: 720 }, `<ul class="rows">${[['Restaurantes', 'que cuidan lo que sirven'], ['Hoteles', 'que reciben con café de origen'], ['Oficinas', 'que quieren una buena taza para su gente'], ['Tiendas', 'que venden café con historia']].map(([a, b]) => `<li style="grid-template-columns:330px 1fr;padding:22px 0"><span class="d x6">${a}</span><span class="p s" style="font-size:28px;opacity:.85">${b}</span></li>`).join('')}</ul>`)}`, photoTop: true,
      alt: 'Mesa servida en el cafetal. Lista: restaurantes, hoteles, oficinas y tiendas.' },
    { bg: 'kraft', html: `${tx({ t: 150 }, `<div class="k">¿Cómo funciona?</div><h2 class="d x3">Tres pasos, <em>sin enredos.</em></h2>`)}
      ${pos({ l: 84, r: 84, t: 470 }, [['01', 'Nos escribe', 'Por WhatsApp. Nos cuenta qué negocio tiene y cuánto café sirve.'], ['02', 'Lo probamos juntos', 'Le llevamos una muestra y la catamos con su equipo.'], ['03', 'Elegimos el café', 'El proceso y el formato que le sirvan, en grano o molido.']].map(([n, h, p]) => `<div style="display:grid;grid-template-columns:160px 1fr;gap:20px;padding:40px 0;border-top:1px solid rgba(91,58,35,.3)"><span class="d" style="font-size:110px;line-height:.8;color:var(--tierra)">${n}</span><div><div class="d x5" style="color:var(--cafe)">${h}</div><p class="p s" style="margin-top:10px">${p}</p></div></div>`).join(''))}`,
      alt: 'Tres pasos: 01 nos escribe por WhatsApp, 02 le llevamos una muestra y la catamos con su equipo, 03 elegimos el café y el formato.' },
    { bg: 'verde', html: `${topo()}${pos({ l: 84, t: 190, w: 450, h: 620 }, `<div style="width:100%;height:100%;background:var(--kraft);border-radius:6px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6);padding:60px 44px;display:flex;flex-direction:column;align-items:center;text-align:center;color:var(--cafe)">
        <svg viewBox="0 0 2880 1008" style="width:280px;color:var(--verde)"><use href="#wm" width="2880" height="1008"/></svg><div class="k" style="margin-top:34px;font-size:16px;color:var(--tierra)">Aquí se sirve Doña Lú</div><p class="it" style="font-size:34px;margin-top:26px">Café de Arabia, Risaralda.<br>Escanee y conozca a quienes lo cultivaron.</p><div style="margin-top:auto;width:130px;height:130px;border:2px solid var(--cafe);opacity:.5;display:flex;align-items:center;justify-content:center;font:500 14px var(--sans);letter-spacing:.2em">QR</div></div>`)}
      ${tx({ l: 590, t: 300, r: 84 }, `<h2 class="d x4">Y su mesa <em>cuenta la historia.</em></h2><p class="p s">Un hablador con la historia de la finca y del café que se está sirviendo.</p>`)}
      ${tx({ b: 190 }, `<p class="it" style="font-size:50px">Y en la puerta, el sello: <em style="color:var(--oro)">aquí se honra el café.</em></p>`)}`,
      alt: 'Ilustración de un hablador de mesa en kraft con el wordmark: "Aquí se sirve Doña Lú. Café de Arabia, Risaralda." Texto: "Y su mesa cuenta la historia."' },
    { bg: 'crema', html: `${bagAt('front', 'lavado', { l: 620, t: 330, w: 400 })}
      ${tx({ t: 260, r: 500 }, `<div class="k">Para empezar</div><h2 class="d x3">Solemos recomendar <em>Lavado.</em></h2><p class="p s">Es limpio, brillante y fácil de servir todo el día. Para negocios, en bolsa de 2,5 kg.</p>`)}`,
      alt: 'Ilustración de la bolsa Lavado. Texto: "Para empezar solemos recomendar Lavado: limpio, brillante y fácil de servir todo el día. En bolsa de 2,5 kg."' },
    { bg: 'bolsa', html: `${topo()}${tx({ t: 300 }, `<h2 class="d x2">¿Su negocio sirve café? <em>Conversemos.</em></h2><p class="p" style="max-width:820px;margin-left:auto;margin-right:auto">Escríbanos y le contamos qué café va mejor con su negocio.</p><div class="btnlike">${WA}</div>`, 'c')}${sig('var(--crema)', 1060)}`,
      alt: 'Cierre: "¿Su negocio sirve café? Conversemos. Escríbanos y le contamos qué café va mejor con su negocio." WhatsApp 322 470 2667.' },
    { story: true, bg: 'bolsa', file: 'historia-enlace', html: `${topo('oro')}${iso({ l: 340, t: 330, w: 400, h: 400, color: 'var(--oro)', acc: 'var(--oro)', ring: true })}
      ${tx({ t: 830 }, `<div class="k">Para restaurantes, hoteles y oficinas</div><h1 class="d x2">Casas que <em>honran.</em></h1><p class="p">Sirva café de la finca, con su historia.</p>`, 'c')}`,
      alt: 'Historia: sello dorado Lú. "Casas que honran. Sirva café de la finca, con su historia." Enlace a WhatsApp.' },
  ],
  caption: `Casas que honran: nuestro programa de café para negocios.

Si usted tiene un restaurante, un hotel, una oficina o una tienda, puede servir café de la finca y contarles a sus clientes de dónde viene y quién lo cultivó.

Cómo funciona:
1. Nos escribe por WhatsApp.
2. Le llevamos una muestra y la probamos con su equipo.
3. Elegimos juntos el café y el formato.

¿Su negocio sirve café? Conversemos por WhatsApp: 322 470 2667.`,
  corto: 'Casas que honran: café de la finca para restaurantes, hoteles, oficinas y tiendas.',
  hashtags: '#DoñaLúCoffee #CasasQueHonran #CaféParaNegocios #CaféParaRestaurantes #CaféParaOficinas #CaféDeColombia',
  notas: ['Programa definido en el manual v3 (capítulo Casas que honran y respuesta modelo de WhatsApp).', 'Validar antes de publicar: que llevan muestras y catan con el equipo; que la bolsa de 2,5 kg es el formato para negocios; si el hablador con QR y el sello de puerta ya existen (si no, quitar la lámina 5 o decir "próximamente"); zonas que atienden.', 'Historia: sticker de enlace a WhatsApp (wa.me/573224702667) en el área libre debajo del texto.', 'Si quieren, nombrar las casas actuales (Cajicá, Sopó, Tienda Balsa en Bogotá según el Resumen Maestro) con su permiso.'],
},

// ───────────────────────────────── Nº 11 · Voz con humor fino
'11': {
  slides: [
    { bg: 'kraft', html: `${tx({ t: 230 }, `<div class="k">Doña Lú · la voz de la casa</div><h1 class="d x1">Cosas que nunca le vamos <em>a decir.</em></h1><p class="it" style="font-size:50px">(Y lo que decimos en su lugar.)</p>`)}
      <img src="../../assets/brand/rama.png" alt="" style="position:absolute;right:-30px;bottom:100px;width:340px;z-index:1">`,
      alt: 'Papel kraft con rama de café. Texto: "Cosas que nunca le vamos a decir. Y lo que decimos en su lugar."' },
    ...[
      ['¡Compre ya! 20 % OFF solo por hoy.', 'Escríbanos y le contamos qué café va con usted.'],
      ['Café premium de calidad exquisita y sabor único.', 'Un buen café no se acelera.'],
      ['Notas complejas para paladares exigentes.', 'Este Honey se secó con la miel de su propio grano. Por eso es dulce y tiene cuerpo.'],
      ['Apoye a nuestros humildes campesinos que lo dan todo.', 'Recoger es decidir: solo entran los granos maduros, uno por uno.'],
      ['Somos una empresa 100 % comprometida con la excelencia.', 'De Arabia, Risaralda, a su mesa.'],
    ].map(([no, si], i) => ({ bg: 'crema', html: `${tx({ t: 190 }, `<div class="k">Nunca va a oír</div><p class="d x3" style="color:rgba(15,59,38,.6)"><span class="strike">“${no}”</span></p>`)}
      <div style="position:absolute;left:0;right:0;bottom:0;height:620px;background:var(--verde);z-index:3;overflow:hidden">${topo()}</div>
      ${tx({ t: 800 }, `<div class="k">Aquí decimos</div><p class="d ${si.length > 50 ? 'x4' : 'x3'}"><em style="color:var(--oro)">${si}</em></p>`)}`, footLight: true,
      alt: `Frase tachada: "${no}". Debajo, en verde, lo que dice Doña Lú: "${si}"` })),
    { bg: 'verde', html: `${topo()}${tx({ t: 330 }, `<h2 class="d x1">Hablamos poco. <em>El café dice el resto.</em></h2>`, 'c')}${sig('var(--crema)', 1020)}`,
      alt: 'Cierre: "Hablamos poco. El café dice el resto." Wordmark Doña Lú, Café que se honra.' },
  ],
  caption: `Cosas que nunca le vamos a decir (y lo que decimos en su lugar). 😌

"¡Compre ya! 20 % OFF solo por hoy." → Escríbanos y le contamos qué café va con usted.
"Café premium de sabor único." → Un buen café no se acelera.
"Notas complejas para paladares exigentes." → Este Honey se secó con la miel de su propio grano.
"Apoye a nuestros humildes campesinos." → Recoger es decidir.

Hablamos poco. El café dice el resto.

¿Cuál frase de café ya no quiere volver a leer? Cuéntenos.`,
  corto: 'Las frases de siempre del café, tachadas, y lo que Doña Lú dice en su lugar.',
  hashtags: '#DoñaLúCoffee #CaféQueSeHonra #CaféDeColombia #CaféDeOrigen #AmantesDelCafé',
  notas: ['Pares "Evitamos / Decimos" del capítulo Tono del manual v3. El tachón usa rojo cereza como detalle mínimo.', 'Cierra el lanzamiento: después del 11 dic, la parrilla de enero continúa con Dr. Bean y la finca.'],
},

// ───────────────────────────────── Nº 12 · Historias + destacadas
'12': {
  slides: [
    { story: true, bg: 'verde', file: 'historia-1-bienvenida', html: `${topo()}${iso({ l: 380, t: 440, w: 320, h: 320, color: 'var(--crema)', ring: true })}
      ${tx({ t: 830 }, `<div class="k">¿Primera vez aquí?</div><h1 class="d x3">Somos <em>Doña Lú.</em></h1><p class="p">Café de una finca de familia en Arabia, Risaralda. Lavado, Honey y Natural, grano por grano.</p>`, 'c')}
      `,
      alt: 'Historia de bienvenida: isotipo Lú. "¿Primera vez aquí? Somos Doña Lú. Café de una finca de familia en Arabia, Risaralda."' },
    { story: true, bg: 'crema', file: 'historia-2-pedidos', html: `${topo('ink')}${pos({ l: 0, r: 0, t: 330 }, `<div style="display:flex;justify-content:center">${icon('chat', 170, 'var(--verde)', 1)}</div>`)}
      ${tx({ t: 620 }, `<div class="k">Pedidos</div><h1 class="d x2">Pídalo <em>por WhatsApp.</em></h1><p class="p">En grano o molido, Lavado, Honey o Natural. Le respondemos nosotros, no un robot.</p>`, 'c')}
      `,
      alt: 'Historia: ícono de WhatsApp. "Pídalo por WhatsApp. En grano o molido, Lavado, Honey o Natural."' },
    { story: true, bg: 'verde', file: 'historia-3-pregunta', html: `${topo()}${ph('recolector-ladera.jpg', { l: 90, t: 340, w: 900, h: 740, pos: '50% 30%', cls: 'framed' })}
      ${tx({ t: 1130 }, `<h1 class="d x3">¿Qué quiere saber <em>de la finca?</em></h1>`, 'c')}`,
      alt: 'Historia con caja de preguntas: recolector en la ladera. "¿Qué quiere saber de la finca?"' },
    { story: true, bg: 'kraft', file: 'historia-4-web', html: `${bagAt('front', 'natural', { l: 340, t: 340, w: 400 })}
      ${tx({ t: 1020 }, `<div class="k">La tienda</div><h1 class="d x3">Todo Doña Lú, <em>en un solo lugar.</em></h1><p class="p">Cafés, kits y Casas que honran en donalu.com.co</p>`, 'c')}
      `,
      alt: 'Historia: ilustración de la bolsa Natural. "Todo Doña Lú en un solo lugar: donalu.com.co".' },
    ...[['finca', 'La finca'], ['lavado', 'Lavado'], ['honey', 'Honey'], ['natural', 'Natural'], ['casa', 'Casas']].map(([i, n]) => ({ story: true, bg: 'verde', file: `destacada-${i === 'casa' ? 'casas' : i}`, noChrome: true,
      html: `${topo()}<div style="position:absolute;left:240px;top:660px;width:600px;height:600px;border-radius:50%;background:var(--crema);display:flex;align-items:center;justify-content:center">${icon(i, 300, 'var(--verde)', 1)}</div>`,
      alt: `Portada de destacada "${n}": ícono lineal verde sobre círculo crema.` })),
  ],
  caption: `(Serie de historias, sin caption de feed.)

Historia 1 · Bienvenida: "¿Primera vez aquí? Somos Doña Lú." + enlace a la web.
Historia 2 · Pedidos: "Pídalo por WhatsApp." + enlace a WhatsApp.
Historia 3 · Preguntas: "¿Qué quiere saber de la finca?" + caja de preguntas (las respuestas alimentan la parrilla de enero).
Historia 4 · Tienda: "Todo Doña Lú en un solo lugar." + enlace a donalu.com.co.`,
  corto: 'Historias que llevan a WhatsApp y a la web + portadas de destacadas.',
  hashtags: '',
  notas: ['Calendario sugerido: H1 lunes 23 nov (después del Nº 03); H2 miércoles 25 nov y se repite cada viernes; H3 jueves 3 dic (después del Nº 07); H4 cuando la tienda esté publicada.', 'Stickers (en el área libre bajo el texto de cada historia): H1 enlace a donalu.com.co; H2 enlace a WhatsApp wa.me/573224702667; H3 caja de preguntas; H4 enlace a la tienda.', 'Destacadas sugeridas: La finca (Nº 07, 08), Lavado / Honey / Natural (Nº 04, 05), Casas (Nº 10). Subir la portada al crear cada destacada.', 'WhatsApp de pedidos: +57 322 470 2667 (wa.me/573224702667). Validar la fecha de publicación de la tienda en donalu.com.co. Mientras la tienda no esté publicada, la H4 no sale.'],
},
};
