// ZIP de descarga por sección (PNG a tamaño completo + textos) en descargas/. Usa el tar de Windows (bsdtar) o zip si existe.
import { mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'descargas');
await mkdir(OUT, { recursive: true });
const TAR = ['C:/Windows/System32/tar.exe', '/usr/bin/bsdtar'].find(existsSync);
async function pack(name, src, extra) {
  const tmp = path.join(os.tmpdir(), 'dl-zip-' + name);
  await rm(tmp, { recursive: true, force: true }); await mkdir(tmp, { recursive: true });
  for (const d of (await readdir(path.join(ROOT, src))).sort()) {
    const exp = path.join(ROOT, src, d, 'export');
    if (!existsSync(exp)) continue;
    await cp(exp, path.join(tmp, d), { recursive: true });
    if (existsSync(path.join(ROOT, src, d, 'copy.md'))) await cp(path.join(ROOT, src, d, 'copy.md'), path.join(tmp, d, 'copy.md'));
  }
  for (const f of extra) await cp(path.join(ROOT, f), path.join(tmp, path.basename(f)));
  const zip = path.join(OUT, name + '.zip');
  await rm(zip, { force: true });
  execFileSync(TAR, ['-a', '-c', '-f', zip, '-C', tmp, '.']);
  await rm(tmp, { recursive: true, force: true });
  console.log('descargas/' + name + '.zip');
}
await pack('dona-lu-contenidos-lanzamiento', 'piezas', ['CAPTIONS.md']);
await pack('dona-lu-anuncios-navidad', 'anuncios/piezas', ['anuncios/ANUNCIOS.md']);
