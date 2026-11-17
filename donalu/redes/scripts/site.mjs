// Página para Doña Lú (index.html + web/): dos pestañas, "Contenidos de lanzamiento" y "Anuncios de Navidad".
// Vistas previas en WebP (web/img, web/ads); los PNG a tamaño completo van en los ZIP de descargas/ (scripts/zips.mjs).
// Solo rutas relativas: la carpeta se puede publicar tal cual en GitHub Pages. Uso: node scripts/site.mjs (después de render).
import sharp from 'sharp';
import { readdir, mkdir, writeFile, rm, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { plan, capitulos } from './plan.mjs';
import { piezas } from './piezas.mjs';
import { fechaLarga } from './fecha.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMG = path.join(ROOT, 'web', 'img'), ADS = path.join(ROOT, 'web', 'ads');
for (const d of [IMG, ADS]) { await rm(d, { recursive: true, force: true }); await mkdir(d, { recursive: true }); }
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const webp = (src, out, w = 720) => sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);

// ───────── Contenidos
const files0 = (n) => { let f = 0; return piezas[n].slides.map((s) => s.story ? `${n}-${s.file}.png` : `${n}-${String(++f).padStart(2, '0')}.png`); };
const items = [];
for (const p of plan) {
  const dir = path.join(ROOT, 'piezas', `${p.n}-${p.slug}`, 'export');
  const names = files0(p.n);
  const imgs = [];
  for (const [i, f] of names.entries()) {
    const out = f.replace('.png', '.webp');
    await webp(path.join(dir, f), path.join(IMG, out));
    imgs.push({ f: out, story: !!piezas[p.n].slides[i].story, alt: piezas[p.n].slides[i].alt });
  }
  let th = '';
  if (p.cap !== '·') { th = `${p.n}-grid.webp`; await sharp(path.join(dir, `${p.n}-01.png`)).extract({ left: 34, top: 0, width: 1012, height: 1350 }).resize(360, 480).webp({ quality: 80 }).toFile(path.join(IMG, th)); }
  items.push({ ...p, ...piezas[p.n], imgs, th });
}
await sharp(path.join(ROOT, 'piezas', '12-historias-escribanos', 'export', '12-historia-1-bienvenida.png')).extract({ left: 340, top: 400, width: 400, height: 400 }).resize(200, 200).webp({ quality: 85 }).toFile(path.join(IMG, 'avatar.webp'));
await sharp(path.join(ROOT, 'preview', 'feed-grid.jpg')).resize({ width: 900 }).webp({ quality: 80 }).toFile(path.join(IMG, 'feed-grid.webp'));

const feed = items.filter((p) => p.cap !== '·');
const grid = [...feed].reverse().map((p) => `<a href="#n${p.n}" class="g"><img src="web/img/${p.th}" alt="Portada de la publicación ${p.n}" loading="lazy">${p.imgs.filter((x) => !x.story).length > 1 ? '<i aria-hidden="true">❐</i>' : ''}</a>`).join('') + '<span class="g old"></span>'.repeat(4);
const capOf = (c) => capitulos.find((x) => x.n === c);
const cards = items.map((p) => `
<article class="pz" id="n${p.n}">
  <header><span class="num">Nº ${p.n}</span><div><h3>${esc(p.title)}</h3><small>${p.cap === '·' ? 'Historias y destacadas' : `Capítulo ${p.cap} · ${esc(capOf(p.cap).name)}`} · ${esc(p.tipo)}</small><b class="date">${p.cap === '·' ? esc(p.hora) : `${esc(cap1(fechaLarga(p.fecha)))} · ${esc(p.hora)}`}</b></div></header>
  <div class="strip">${p.imgs.map((im) => `<img src="web/img/${im.f}" class="${im.story ? 'st' : ''}" alt="${esc(im.alt)}" loading="lazy">`).join('')}</div>
  <p class="rol"><b>Para qué:</b> ${esc(p.rol)}<br><b>Le habla a:</b> ${esc(p.audiencia)}</p>
  <details><summary>Texto de la publicación</summary><pre>${esc(p.caption)}${p.hashtags ? '\n\n' + esc(p.hashtags) : ''}</pre><button data-copy="c${p.n}">Copiar texto</button></details>
  <ul class="nota">${p.notas.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
</article>`).join('');

// ───────── Anuncios
const ads = JSON.parse(await readFile(path.join(ROOT, 'anuncios', 'anuncios.json'), 'utf8'));
for (const a of ads) for (const f of a.files) await webp(path.join(ROOT, 'anuncios', 'piezas', a.dir, 'export', f), path.join(ADS, f.replace('.png', '.webp')), 640);
const fmt = (f) => f.match(/-(4x5|9x16|1x1)\.png$/)[1].replace('x', ':');
const adCard = (a) => `
<article class="pz ad" id="${a.id}">
  <header><span class="num">${a.id.toUpperCase()}</span><div><h3>${esc(a.title)}</h3><small>Conjunto: ${esc(a.set)}</small></div></header>
  <div class="strip">${a.files.map((f) => `<figure><img src="web/ads/${f.replace('.png', '.webp')}" alt="Anuncio ${esc(a.title)} en formato ${fmt(f)}" loading="lazy"><figcaption>${fmt(f)}</figcaption></figure>`).join('')}</div>
  <div class="adcopy"><div><span class="k2">Texto principal</span><pre>${esc(a.copy.p)}</pre><button data-copy="p${a.id}">Copiar texto principal</button></div>
  <div><span class="k2">Título</span><p>${esc(a.copy.h)}</p><span class="k2">Descripción</span><p>${esc(a.copy.d)}</p><span class="k2">Botones</span><p><b>Comprar</b> → landing${a.id.startsWith('k') ? ' #' + a.id : ''} con UTM<br><b>Enviar mensaje</b> → WhatsApp 322 470 2667</p><button data-copy="u${a.id}">Copiar enlace con UTM</button></div></div>
</article>`;
const kitAds = ads.filter((a) => a.id.startsWith('k')), heroAds = ads.filter((a) => a.id.startsWith('h'));
const zip = async (n) => { const f = path.join(ROOT, 'descargas', n); return existsSync(f) ? `${(await stat(f)).size / 1e6 | 0} MB` : 'por generar'; };
const zc = await zip('dona-lu-contenidos-lanzamiento.zip'), za = await zip('dona-lu-anuncios-navidad.zip');
const copyMap = Object.fromEntries([...items.map((p) => [`c${p.n}`, p.caption + (p.hashtags ? '\n\n' + p.hashtags : '')]), ...ads.map((a) => [`p${a.id}`, a.copy.p]), ...ads.map((a) => [`u${a.id}`, a.url])]);

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Doña Lú · Contenidos y anuncios</title><meta name="robots" content="noindex">
<style>
@font-face{font-family:'Cormorant Garamond';src:url(assets/brand/fonts/CormorantGaramond-VF.ttf) format('truetype');font-weight:300 700;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url(assets/brand/fonts/CormorantGaramond-Italic-VF.ttf) format('truetype');font-weight:300 700;font-style:italic;font-display:swap}
@font-face{font-family:Jost;src:url(assets/brand/fonts/Jost-VF.ttf) format('truetype');font-weight:100 900;font-display:swap}
:root{--verde:#0F3B26;--bolsa:#173E2C;--kraft:#EBDFC8;--crema:#F4EDE0;--cafe:#5B3A23;--oro:#C9A45C;--tierra:#A67C52;--line:#E0D3BC}
*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth}body{background:var(--crema);color:var(--verde);font:300 18px/1.6 Jost,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
h1,h2,h3,.num{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;line-height:1.02;letter-spacing:-.01em}h1 em,h2 em{font-style:italic;color:var(--oro)}
.k,.k2{font:500 13px/1 Jost;letter-spacing:.28em;text-transform:uppercase;color:var(--oro)}.k2{display:block;color:var(--tierra);margin:14px 0 6px}
.hero{background:var(--verde);color:var(--crema);padding:64px 0 0}
.hero h1{font-size:clamp(46px,8vw,104px);margin:22px 0 18px}.hero p{max-width:740px;font-size:20px;opacity:.9}
.tabs{display:flex;gap:6px;margin-top:40px;position:sticky;top:0}
.tabs a{font:500 14px/1 Jost;letter-spacing:.2em;text-transform:uppercase;color:var(--crema);text-decoration:none;padding:20px 26px;border-radius:6px 6px 0 0;border:1px solid rgba(201,164,92,.4);border-bottom:0}
.tabs a[aria-selected=true]{background:var(--crema);color:var(--verde)}
.panel{display:none}.panel.on{display:block}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1px;background:var(--line);margin:40px 0;border:1px solid var(--line)}
.facts div{background:#fff;padding:20px 22px;font-size:16px}.facts b{display:block;font:400 30px/1.1 'Cormorant Garamond',serif;color:var(--cafe);margin-bottom:6px}
.dl{display:inline-flex;gap:12px;align-items:center;background:var(--verde);color:var(--crema);text-decoration:none;font:500 14px Jost;letter-spacing:.16em;text-transform:uppercase;padding:16px 24px;border-radius:40px;margin:6px 0 10px}
.caps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin:40px 0}
.caps div{border-top:1px solid var(--oro);padding-top:16px}.caps h2{font-size:34px;margin:10px 0 6px}.caps p{font-size:16px;color:#3c4a40}
.row{display:flex;gap:48px;flex-wrap:wrap;align-items:flex-start;margin:20px 0 40px}
.phone{width:390px;max-width:100%;flex:none;background:#fff;border:10px solid #14130f;border-radius:46px;overflow:hidden;box-shadow:0 40px 70px -30px rgba(15,59,38,.55);font-family:system-ui,sans-serif;color:#111}
.ph-top{padding:18px 16px 8px;font-weight:700;font-size:15px}.ph-head{display:flex;align-items:center;gap:18px;padding:6px 16px}
.av{flex:none;width:80px;height:80px;border-radius:50%;background:url(web/img/avatar.webp) center/cover;border:2px solid var(--oro)}
.stt{display:flex;gap:16px;text-align:center;font-size:13px}.stt b{display:block;font-size:16px}
.bio{padding:8px 16px 10px;font-size:13.5px;line-height:1.45}.bio a{color:#00376b;font-weight:600;text-decoration:none}
.hl{display:flex;gap:10px;padding:6px 14px 14px;overflow:hidden}.hl span{width:58px;flex:none;text-align:center;font-size:11px}.hl i{display:block;width:58px;height:58px;border-radius:50%;border:1px solid #ddd;margin-bottom:4px;background:var(--crema) center/180%}
.gr{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}.g{position:relative;display:block;aspect-ratio:3/4;overflow:hidden;background:#d9d4ca}.g img{width:100%;height:100%;object-fit:cover;display:block}
.g i{position:absolute;top:6px;right:8px;color:#fff;font-style:normal;font-size:14px;text-shadow:0 1px 4px rgba(0,0,0,.6)}.g.old{background:repeating-linear-gradient(45deg,#e7e1d6 0 8px,#ede8de 8px 16px)}
.side{flex:1;min-width:280px}.side h2{font-size:42px}.side ol{margin:18px 0 0 22px}.side li{margin-bottom:10px}
.cal{width:100%;border-collapse:collapse;margin-top:22px;font-size:15px}.cal td,.cal th{padding:9px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.cal th{font:500 12px Jost;letter-spacing:.2em;text-transform:uppercase;color:var(--tierra)}.cal td:first-child{font:italic 22px 'Cormorant Garamond',serif;color:var(--tierra);width:60px}.cal a{color:inherit}
.pz{background:#fff;border:1px solid var(--line);border-radius:4px;padding:28px;margin:30px 0}
.pz header{display:flex;gap:22px;align-items:center;margin-bottom:18px}.num{font-size:56px;font-style:italic;color:var(--oro);flex:none}
.pz h3{font-size:34px}.pz small{display:block;color:var(--tierra);font-size:14px;letter-spacing:.06em;margin-top:4px}.date{display:block;font-weight:500;font-size:15px;margin-top:2px}
.strip{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:12px}
.strip img{height:500px;width:auto;flex:none;scroll-snap-align:start;box-shadow:0 12px 30px -18px rgba(15,59,38,.6)}
.strip figure{flex:none;scroll-snap-align:start}.strip figcaption{font:500 12px Jost;letter-spacing:.2em;color:var(--tierra);margin-top:6px}
.rol{margin-top:14px;font-size:16px;color:#33433a}
details{margin-top:14px;background:var(--crema);padding:12px 16px;border-radius:4px}summary{cursor:pointer;font-weight:500}
pre{white-space:pre-wrap;font:300 16.5px/1.6 Jost,sans-serif;margin:8px 0 12px}button{font:500 13px Jost;letter-spacing:.18em;text-transform:uppercase;background:var(--verde);color:var(--crema);border:0;border-radius:40px;padding:12px 20px;cursor:pointer}
.adcopy{display:grid;grid-template-columns:1.4fr 1fr;gap:28px;margin-top:10px;background:var(--crema);padding:6px 20px 20px;border-radius:4px}.adcopy p{font-size:16px}
.nota{margin:14px 0 0;padding:12px 16px 12px 34px;background:#FBF4E4;border-left:3px solid var(--oro);font-size:15px}.nota li{margin:4px 0}
footer{padding:40px 0 70px;color:var(--tierra);font-size:14px}
@media(max-width:700px){.strip img{height:380px}.pz{padding:18px}.pz header{gap:14px}.num{font-size:42px}.adcopy{grid-template-columns:1fr}.tabs a{padding:16px 14px;font-size:12px}}
</style></head><body>
<section class="hero"><div class="wrap"><div class="k">Doña Lú · Instagram, Facebook y Meta Ads</div><h1>Todo lo que <em>hubo que cuidar.</em></h1>
<p>Diana: aquí están las piezas para presentar la nueva marca en redes y los anuncios de los kits de Navidad. Revíselas con calma y díganos el número de la pieza o del anuncio que quiera ajustar.</p>
<nav class="tabs" role="tablist"><a href="#contenidos" role="tab" data-tab="contenidos">Contenidos de lanzamiento</a><a href="#anuncios" role="tab" data-tab="anuncios">Anuncios de Navidad</a></nav></div></section>

<main class="wrap">
<section class="panel" id="p-contenidos">
<div class="facts"><div><b>12 piezas</b>11 publicaciones y una serie de historias</div><div><b>Lun · Mié · Vie</b>Del 23 nov al 11 dic. El 23 salen tres seguidas</div><div><b>4 capítulos</b>Concepto, procesos, quienes lo hacen y su mesa</div><div><b>Sus palabras</b>Frases del manifiesto y de su historia, sin datos inventados</div></div>
<a class="dl" href="descargas/dona-lu-contenidos-lanzamiento.zip" download>Descargar todas las imágenes (ZIP · ${zc})</a>
<div class="caps">${capitulos.map((c) => `<div><div class="k">Capítulo ${c.n}</div><h2>${esc(c.name)}</h2><p>${esc(c.line)}</p></div>`).join('')}</div>
<div class="row"><div class="phone"><div class="ph-top">donalucoffee</div>
<div class="ph-head"><div class="av"></div><div class="stt"><div><b>${feed.length}+</b>publicaciones</div><div><b>97</b>seguidores</div><div><b>—</b>seguidos</div></div></div>
<div class="bio"><b>Doña Lú · Café que se honra</b><br>De Arabia, Risaralda, a su mesa.<br>Lavado · Honey · Natural. Grano por grano.<br>Pedidos y Casas que honran por WhatsApp<br><a href="https://wa.me/573224702667">wa.me/573224702667</a></div>
<div class="hl">${['finca', 'lavado', 'honey', 'natural', 'casas'].map((h) => `<span><i style="background-image:url(web/img/12-destacada-${h}.webp)"></i>${h === 'finca' ? 'La finca' : h === 'casas' ? 'Casas' : cap1(h)}</span>`).join('')}</div>
<div class="gr">${grid}</div></div>
<div class="side"><h2>Cómo leer <em>esta página</em></h2><ol><li>El teléfono muestra el perfil el 11 de diciembre, con la publicación más nueva arriba.</li><li>Abajo está cada pieza con todas sus láminas (deslice hacia el lado), el texto para copiar y lo que hay que confirmar.</li><li>Las bolsas muestran cómo se ve el nuevo empaque. Cuando lleguen las bolsas impresas, las cambiamos por fotos.</li></ol>
<table class="cal">${items.map((p) => `<tr><td>${p.n}</td><td><a href="#n${p.n}">${esc(p.title)}</a></td><td>${p.cap === '·' ? 'Todo el periodo' : esc(cap1(fechaLarga(p.fecha)))}</td></tr>`).join('')}</table></div></div>
${cards}
</section>

<section class="panel" id="p-anuncios">
<div class="facts"><div><b>13 anuncios</b>Uno por kit (k01 a k10) y tres principales</div><div><b>3 formatos</b>4:5 y 9:16 por kit; 4:5, 9:16 y 1:1 los principales</div><div><b>Misma plantilla</b>En la prueba solo cambia el kit, para saber cuál se vende más</div><div><b>WhatsApp</b>322 470 2667 en cada anuncio</div></div>
<a class="dl" href="descargas/dona-lu-anuncios-navidad.zip" download>Descargar todos los anuncios (ZIP · ${za})</a>
<div class="row" style="margin-top:30px"><div class="side"><h2>El plan <em>de prueba</em></h2>
<ol><li><b>Fase 1 (5 a 7 días):</b> los 10 kits con la misma plantilla, en tres conjuntos: A · Regalo hogar, B · Empresas (kits desde $119.000) y C · Quienes ya los conocen. Cada anuncio lleva su código (k01…k10) en el enlace y en el mensaje de WhatsApp.</li>
<li><b>Ganador:</b> el kit con más utilidad por peso invertido, con mínimo 3 pedidos; si ninguno llega, el de menor costo por clic a WhatsApp.</li>
<li><b>Fase 2:</b> pauta concentrada en 1 o 2 kits y los anuncios principales (hogar, empresas, recordatorio).</li>
<li><b>Fecha límite:</b> “Pida antes del __ de diciembre” se agrega al texto cuando Doña Lú la confirme. No va impresa en las imágenes.</li></ol></div></div>
<h2 style="font-size:44px;margin-top:20px">Anuncios <em>principales</em></h2>${heroAds.map(adCard).join('')}
<h2 style="font-size:44px;margin-top:40px">Un anuncio <em>por kit</em></h2>${kitAds.map(adCard).join('')}
</section>
<footer>Hecho por We Rock para Doña Lú Coffee · noviembre de 2026 · werock.space. Fotos reales de la finca y de los kits de Navidad.</footer></main>
<script>
const C=${JSON.stringify(copyMap)};
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>{navigator.clipboard.writeText(C[b.dataset.copy]);const t=b.textContent;b.textContent='Copiado';setTimeout(()=>b.textContent=t,1600)});
function show(){const id=location.hash.slice(1);const ad=id==='anuncios'||/^(k|h)\\d/.test(id);const tab=ad?'anuncios':'contenidos';
document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+tab));document.querySelectorAll('.tabs a').forEach(a=>a.setAttribute('aria-selected',a.dataset.tab===tab));
if(id&&id!==tab){const el=document.getElementById(id);if(el)el.scrollIntoView();}}
addEventListener('hashchange',show);show();
</script>
</body></html>`;
await writeFile(path.join(ROOT, 'index.html'), html);
console.log('index.html ·', items.reduce((a, p) => a + p.imgs.length, 0), 'láminas +', ads.reduce((a, x) => a + x.files.length, 0), 'anuncios en web/');
