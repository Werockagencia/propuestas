// Captura de la página del cliente a un ancho: node scripts/shot-page.mjs ancho salida.jpg
import puppeteer from 'puppeteer-core';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const [w, out] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: +w, height: 900 });
await p.goto(pathToFileURL(path.resolve(import.meta.dirname, '..', 'index.html')).href + (process.argv[4] || ''), { waitUntil: 'networkidle0' });
await p.evaluate(async () => { document.querySelectorAll('img').forEach((i) => i.loading = 'eager'); await document.fonts.ready; await new Promise((r) => setTimeout(r, 800)); });
await p.screenshot({ path: out, clip: { x: 0, y: 0, width: +w, height: 2600 }, type: 'jpeg', quality: 70 });
await b.close();
