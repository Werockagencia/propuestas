// Junta varias hojas de contacto en una sola (revisión): node scripts/hoja.mjs salida.jpg filtro1 filtro2 ...
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
const [out, ...f] = process.argv.slice(2);
const fl = readdirSync('preview').filter((x) => x.endsWith('.jpg') && x !== 'feed-grid.jpg' && f.some((k) => x.startsWith(k)));
const bufs = [];
for (const x of fl) { const b = await sharp('preview/' + x).resize({ width: 1600 }).toBuffer(); bufs.push({ b, h: (await sharp(b).metadata()).height }); }
let y = 0;
await sharp({ create: { width: 1600, height: bufs.reduce((a, x) => a + x.h, 0), channels: 3, background: '#222' } }).composite(bufs.map((x) => { const o = { input: x.b, left: 0, top: y }; y += x.h; return o; })).jpeg({ quality: 80 }).toFile(out);
