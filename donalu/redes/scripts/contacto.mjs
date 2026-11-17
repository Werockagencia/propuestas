// Hoja de contacto de un conjunto de imágenes: node scripts/contacto.mjs salida.jpg cols ruta1 ruta2 ...
import sharp from 'sharp';
const [out, cols, ...fl] = process.argv.slice(2); const C = +cols, W = +(process.env.W || 300), H = Math.round(W * 1.25);
const t = await Promise.all(fl.map(async (f, i) => { const m = await sharp(f).metadata(); const name = f.split('/').pop().replace(/\.(webp|jpg|png)$/, '').slice(-26) + ` ${m.width}x${m.height}`;
  const lab = Buffer.from(`<svg width="${W}" height="28"><rect width="100%" height="28" fill="black" opacity=".7"/><text x="5" y="19" font-size="14" fill="white" font-family="Arial">${i}·${name}</text></svg>`);
  return { input: await sharp(f).resize(W, H, { fit: 'contain', background: '#222' }).composite([{ input: lab, top: 0, left: 0 }]).toBuffer(), left: (i % C) * W, top: Math.floor(i / C) * H }; }));
await sharp({ create: { width: C * W, height: Math.ceil(fl.length / C) * H, channels: 3, background: '#222' } }).composite(t).jpeg({ quality: 80 }).toFile(out);
console.log(fl.length);
