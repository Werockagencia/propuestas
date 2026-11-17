// Hoja de contacto de todos los anuncios en preview/anuncios-hoja.jpg (alto fijo por fila, proporciones reales)
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const A = path.join(ROOT, 'anuncios', 'piezas');
const H = 420, G = 14, rows = [];
for (const d of readdirSync(A).sort()) {
  const files = readdirSync(path.join(A, d, 'export')).filter((f) => f.endsWith('.png')).sort();
  rows.push(await Promise.all(files.map(async (f) => { const b = await sharp(path.join(A, d, 'export', f)).resize({ height: H }).toBuffer(); return { b, w: (await sharp(b).metadata()).width }; })));
}
// dos anuncios por fila
const lines = []; for (let i = 0; i < rows.length; i += 2) lines.push([...rows[i], ...(rows[i + 1] || [])]);
const W = Math.max(...lines.map((l) => l.reduce((a, x) => a + x.w + G, G)));
const comp = []; lines.forEach((l, r) => { let x = G; for (const it of l) { comp.push({ input: it.b, left: x, top: G + r * (H + G) }); x += it.w + G; } });
await sharp({ create: { width: W, height: G + lines.length * (H + G), channels: 3, background: '#2a2a2a' } }).composite(comp).jpeg({ quality: 84 }).toFile(path.join(ROOT, 'preview', 'anuncios-hoja.jpg'));
console.log('preview/anuncios-hoja.jpg');
