// Hojas de contacto por pieza en preview/<pieza>.jpg
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = process.env.PIEZAS || 'piezas';            // PIEZAS=anuncios/piezas para los anuncios
const OUT = path.join(ROOT, 'preview', SRC === 'piezas' ? '' : 'anuncios');
const filter = process.argv[2] ?? '';
await mkdir(OUT, { recursive: true });
for (const name of (await readdir(path.join(ROOT, SRC))).sort()) {
  if (!name.includes(filter)) continue;
  const exp = path.join(ROOT, SRC, name, 'export');
  const files = (await readdir(exp).catch(() => [])).filter((f) => f.endsWith('.png')).sort();
  if (!files.length) continue;
  const W = 360, G = 16, cols = Math.min(files.length, 6);
  const items = await Promise.all(files.map(async (f) => { const buf = await sharp(path.join(exp, f)).resize({ width: W }).toBuffer(); return { buf, h: (await sharp(buf).metadata()).height }; }));
  const rowH = Math.max(...items.map((x) => x.h));
  const rows = Math.ceil(items.length / cols);
  await sharp({ create: { width: G + cols * (W + G), height: G + rows * (rowH + G), channels: 3, background: { r: 42, g: 42, b: 42 } } })
    .composite(items.map((x, i) => ({ input: x.buf, left: G + (i % cols) * (W + G), top: G + Math.floor(i / cols) * (rowH + G) }))).jpeg({ quality: 86 }).toFile(path.join(OUT, `${name}.jpg`));
  console.log(`preview/${name}.jpg`);
}
