// Genera piezas/NN-slug/slides.html + copy.md y CAPTIONS.md a partir de plan.mjs (calendario) y piezas.mjs (contenido).
// Uso: node scripts/build.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { plan, capitulos } from './plan.mjs';
import { piezas } from './piezas.mjs';
import { symbols, arrow } from './lib/ui.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const capName = (c) => capitulos.find((x) => x.n === c)?.name;
import { fechaLarga } from './fecha.mjs';
const strip = (s) => s.replace(/<[^>]+>/g, '');

const sectionHtml = (p, s, i, total, files) => {
  const feedSlides = p.slides.filter((x) => !x.story);
  const fi = feedSlides.indexOf(s);
  const light = s.photo || s.photoTop || ['verde', 'bolsa', 'cafe'].includes(s.bg);
  const capTxt = p.cap === '·' ? 'Historias' : `Cap. ${p.cap} · ${capName(p.cap)}`;
  const mast = s.noChrome ? '' : `<div class="mast${light ? ' on-photo' : ''}"><span><b>Doña Lú</b> · <span class="no">Nº ${p.n}</span></span><span>${capTxt}</span></div>`;
  let foot = '';
  if (!s.noChrome && !s.story) {
    const last = fi === feedSlides.length - 1;
    const footLight = s.photo || s.footLight || ['verde', 'bolsa', 'cafe'].includes(s.bg);
    foot = `<div class="foot${footLight ? ' on-photo' : ''}"><span class="sw">${last ? 'Café que se honra' : `Desliza ${arrow}`}</span>${feedSlides.length > 1 ? `<span class="fol">${String(fi + 1).padStart(2, '0')} / ${String(feedSlides.length).padStart(2, '0')}</span>` : ''}</div>`;
  }
  return `<section class="slide bg-${s.bg}${s.story ? ' story' : ''}" data-file="${files[i]}">\n${s.html}\n${mast}${foot}\n</section>`;
};

const fileNames = (p) => {
  let f = 0;
  return p.slides.map((s) => s.story ? `${p.n}-${s.file}.png` : `${p.n}-${String(++f).padStart(2, '0')}.png`);
};

let captions = `# Doña Lú · Captions de lanzamiento (en orden de publicación)\n\nGenerado por \`scripts/build.mjs\` desde \`plan.mjs\` y \`piezas.mjs\`. Tratamiento de **usted**, como pide el manual.\n`;
for (const p of plan) {
  const c = piezas[p.n];
  const dir = path.join(ROOT, 'piezas', `${p.n}-${p.slug}`);
  await mkdir(dir, { recursive: true });
  const files = fileNames({ ...c, n: p.n });
  const html = `<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<title>Nº ${p.n} · ${strip(p.title)} · Doña Lú</title>\n<link rel="stylesheet" href="../../assets/css/donalu.css">\n</head>\n<body>\n${symbols}\n${c.slides.map((s, i) => sectionHtml({ ...p, slides: c.slides }, s, i, c.slides.length, files)).join('\n\n')}\n</body>\n</html>\n`;
  await writeFile(path.join(dir, 'slides.html'), html);

  const feed = c.slides.filter((s) => !s.story).length, stories = c.slides.filter((s) => s.story).length;
  const formato = [feed ? `${feed === 1 ? 'Post' : `Carrusel de ${feed}`} (1080×1350)` : '', stories ? `${stories} ${stories === 1 ? 'historia' : 'historias / portadas'} (1080×1920)` : ''].filter(Boolean).join(' + ');
  const md = `# Nº ${p.n} · ${p.title}

**Capítulo:** ${p.cap === '·' ? 'Historias (todo el lanzamiento)' : `${p.cap} · ${capName(p.cap)}`}
**Formato:** ${formato}
**Publicar:** ${p.cap === '·' ? p.hora : `${fechaLarga(p.fecha)} · ${p.hora}`}
**Rol en la narrativa:** ${p.rol}
**Le habla a:** ${p.audiencia}

## Caption

${c.caption}
${c.hashtags ? `\n## Hashtags\n\n${c.hashtags}\n` : ''}
## Versión corta

${c.corto}

## Texto alternativo

${c.slides.map((s, i) => `- **${files[i].replace('.png', '')}**: ${s.alt}`).join('\n')}

## Notas y qué validar

${c.notas.map((n) => `- ${n}`).join('\n')}
`;
  await writeFile(path.join(dir, 'copy.md'), md);
  captions += `\n---\n\n## Nº ${p.n} · ${p.title}\n*${p.cap === '·' ? p.hora : `${fechaLarga(p.fecha)} · ${p.hora}`} · ${formato}*\n\n${c.caption}\n${c.hashtags ? `\n${c.hashtags}\n` : ''}`;
  console.log(`piezas/${p.n}-${p.slug}  ${c.slides.length} láminas`);
}
await writeFile(path.join(ROOT, 'CAPTIONS.md'), captions);
console.log('CAPTIONS.md');
