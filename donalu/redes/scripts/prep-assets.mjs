// Copia las fotos reales de la finca y de los kits a assets/photos/ con nombres semánticos (JPG alta calidad, SIN redimensionar:
// los diseños nunca las amplían, ver scripts/resolucion.mjs) y los recursos de marca a assets/brand/.
// No se usan: imágenes del drive del cliente (generadas por IA), taza.webp ni capsulas.webp (no son fotos de la finca).
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DL = path.resolve(ROOT, '..');                                   // propuestas comerciales/DonaLu
const WP = path.resolve(DL, '../../Desarrollos Wordpress/Dona Lu/wp-setup/media');
const OUT = path.join(ROOT, 'assets', 'photos');
const BR = path.join(ROOT, 'assets', 'brand');

const fotos = {
  // Finca (fotos reales usadas en el manual de marca)
  [`${DL}/img/amanecer.webp`]: 'amanecer.jpg',
  [`${DL}/img/caficultor.webp`]: 'caficultor-mesa.jpg',
  [`${DL}/img/cerezas.webp`]: 'cerezas-manos.jpg',
  [`${DL}/img/finca-cosecha.webp`]: 'recolector-ladera.jpg',
  [`${DL}/img/finca-recolector.webp`]: 'recolector-cafetal.jpg',
  [`${DL}/img/manos.webp`]: 'mano-cereza.jpg',
  [`${DL}/img/mesa-cafetal.webp`]: 'mesa-cafetal.jpg',
  [`${DL}/img/recolector-perfil.webp`]: 'recolector-perfil.jpg',
  [`${DL}/img/recolector.webp`]: 'recolector-retrato.jpg',
  [`${DL}/img/secado.webp`]: 'secado.jpg',
  [`${DL}/img/tueste.webp`]: 'tostion.jpg',
  [`${DL}/img/willys.webp`]: 'willys.jpg',
  // Render del empaque único (las tres bolsas recortadas, fondo transparente) de la tienda: Nº 05
  [`${WP}/ejemplo-danubio-trio-recorte.webp`]: null,
  // Kits de Navidad con el tratamiento nuevo (DonaLu/kits-fotos: mesa = mesa de regalos 1000×1000, cuadrado ≈670×670)
  [`${DL}/kits-fotos/kit-07-mesa.jpg`]: 'kit-07-mesa.jpg',
  ...Object.fromEntries(['01', '04', '09', '10'].map((k) => [`${DL}/kits-fotos/kit-${k}-cuadrado.jpg`, `kit-${k}-cuadrado.jpg`])),
  // Anuncios de Navidad: foto de estudio 4:5 de los 10 kits + mesa de regalos para los anuncios principales
  ...Object.fromEntries(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((k) => [`${DL}/kits-fotos/kit-${k}-estudio.jpg`, `kit-${k}-estudio.jpg`])),
  ...Object.fromEntries(['01', '09', '10'].map((k) => [`${DL}/kits-fotos/kit-${k}-mesa.jpg`, `kit-${k}-mesa.jpg`])),
  [`${DL}/kits-fotos/kit-07-cuadrado.jpg`]: 'kit-07-cuadrado.jpg',
  ...Object.fromEntries(['09', '10'].map((k) => [`${DL}/kits-fotos/kit-${k}-cuadrado.jpg`, `kit-${k}-cuadrado.jpg`])),
  // Versiones anteriores (catálogo sin tratar): ya no se usan, se quitan de assets
};

await mkdir(OUT, { recursive: true });
await mkdir(BR, { recursive: true });
await copyFile(`${WP}/ejemplo-danubio-trio-recorte.webp`, path.join(OUT, 'empaque-trio.webp'));
for (const [src, out] of Object.entries(fotos)) {
  if (!out) continue;
  const info = await sharp(src).rotate().flatten({ background: '#ffffff' })
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4', mozjpeg: true }).toFile(path.join(OUT, out));
  console.log(out.padEnd(24), `${info.width}x${info.height}`);
}
// Rama en grabado del catálogo (la misma de la bolsa) y wordmark (trazado de We Rock, no el vector oficial)
await copyFile(`${DL}/marca/img/rama.jpg`, path.join(BR, 'rama.jpg'));
await copyFile(`${DL}/navidad/img/rama-b.jpg`, path.join(BR, 'rama-b.jpg'));
await copyFile(`${DL}/img/wordmark.svg`, path.join(BR, 'wordmark.svg'));
// Rama con fondo transparente (blanco -> alfa) para usar sobre crema/kraft sin multiplicar
for (const r of ['rama', 'rama-b']) {
  const { data, info } = await sharp(path.join(BR, `${r}.jpg`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    if (m > 238) data[i + 3] = 0; else if (m > 214) data[i + 3] = Math.round(255 * (238 - m) / 24);
  }
  await sharp(data, { raw: info }).png().toFile(path.join(BR, `${r}.png`));
}
console.log('marca ok');
