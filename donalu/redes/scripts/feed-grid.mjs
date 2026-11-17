// Cómo se ve el perfil: portadas del feed en cuadrícula de 3 columnas (la más reciente arriba a la izquierda), recorte 3:4 del grid
// de Instagram (1012×1350 al centro de cada portada 4:5). Se completa con las publicaciones que @donalucoffee ya tiene (gris).
import sharp from 'sharp';
import path from 'node:path';
import { plan } from './plan.mjs';
const ROOT = path.resolve(import.meta.dirname, '..');
const W = 360, H = 480, G = 6, cols = 3;
const feed = plan.filter((p) => p.cap !== '·');
const covers = [...feed].reverse();
const tiles = await Promise.all(covers.map(async (p) => sharp(path.join(ROOT, 'piezas', `${p.n}-${p.slug}`, 'export', `${p.n}-01.png`))
  .extract({ left: 34, top: 0, width: 1012, height: 1350 }).resize(W, H).png().toBuffer()));
const fill = (cols - (tiles.length % cols)) % cols + cols; // una fila más con lo ya publicado
const old = Buffer.from(`<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="#3a3a36"/><text x="50%" y="52%" text-anchor="middle" font-family="Arial" font-size="17" fill="#9a978e">publicación anterior</text></svg>`);
for (let i = 0; i < fill; i++) tiles.push(await sharp(old).png().toBuffer());
const rows = Math.ceil(tiles.length / cols);
await sharp({ create: { width: cols * W + (cols + 1) * G, height: rows * H + (rows + 1) * G, channels: 3, background: '#fafafa' } })
  .composite(tiles.map((b, i) => ({ input: b, left: G + (i % cols) * (W + G), top: G + Math.floor(i / cols) * (H + G) })))
  .jpeg({ quality: 90 }).toFile(path.join(ROOT, 'preview', 'feed-grid.jpg'));
console.log('preview/feed-grid.jpg');
