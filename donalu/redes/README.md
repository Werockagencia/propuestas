# Doña Lú · Contenidos de lanzamiento y anuncios de Navidad

Una sola página para presentarle a Doña Lú (Diana Zamudio) dos entregas con el mismo sistema de marca:

1. **Contenidos de lanzamiento** (Instagram y Facebook): 12 piezas, Nº 01 a Nº 12.
2. **Anuncios de Navidad** (Meta Ads): un anuncio por kit (k01 a k10) en 4:5 y 9:16, y 3 anuncios principales (hogar, empresas, recordatorio) en 4:5, 9:16 y 1:1. Ver la sección *Anuncios de Navidad* más abajo.

## Contenidos de lanzamiento

**Todo lo que hubo que cuidar.** Doce piezas que presentan la marca nueva de Doña Lú (concepto, empaque único, finca, gente y Casas que honran) del **lunes 23 de noviembre al viernes 11 de diciembre de 2026**, mientras corre la pauta de los kits de Navidad (va aparte, en Meta Ads).

- Página para Diana: `index.html`, con dos pestañas (Contenidos de lanzamiento / Anuncios de Navidad), botones para copiar textos y un ZIP de descarga por sección en `descargas/`. Solo usa rutas relativas: se publica tal cual con GitHub Pages desde `main`. Hacer el repo público necesita el OK de David.
- Todos los captions en orden: [CAPTIONS.md](CAPTIONS.md)
- WhatsApp de pedidos y Casas que honran: **+57 322 470 2667** (wa.me/573224702667), impreso en las láminas de cierre y en los captions.
- Perfil @donalucoffee hoy: 97 seguidores y pocas publicaciones, así que la parrilla arranca casi de cero.

## La idea

El concepto ya estaba en las palabras de la familia: *“No vendemos café. Compartimos todo lo que hubo que cuidar para que exista.”* La parrilla lo explica sin rodeos (nadie tiene que descifrar qué es “Café que se honra”) y lo demuestra con hechos: la ladera, la recolección grano por grano, el secado sin prisa, la gente que lo hace (con admiración, nunca con lástima) y la mesa donde termina.

| Cap. | Línea madre | Piezas |
|---|---|---|
| I · Lo que hubo que cuidar | Qué es Doña Lú y qué quiere decir “Café que se honra” | Nº 01 Manifiesto · Nº 02 Café que se honra, explicado · Nº 03 Los códigos de la casa |
| II · Tres maneras de tomarlo | Un empaque para los tres procesos: cambia la etiqueta, no el cuidado | Nº 04 Una bolsa, tres cafés · Nº 05 Guía Lavado, Honey, Natural · Nº 06 Los tres, en una caja (puente a Navidad) |
| III · Quienes lo hacen | La finca y su gente, con admiración | Nº 07 Los invasores somos nosotros (la finca) · Nº 08 Aquí no hay pobrecitos (gente y recolección) |
| IV · Su mesa | Cómo prepararlo, a quién servírselo, cómo habla la casa | Nº 09 Un buen café no se acelera (preparación) · Nº 10 Casas que honran · Nº 11 Lo que nunca va a oír aquí (voz con humor) |
| Historias | El camino corto a pedir | Nº 12 Cuatro historias (web, WhatsApp, preguntas, tienda) + 5 portadas de destacadas |

## Calendario (fuente única: `scripts/plan.mjs`)

| Nº | Fecha | Hora | Formato |
|---|---|---|---|
| 01 | lun 23 nov | 7:00 p. m. | Carrusel 8 (fijar) |
| 02 | lun 23 nov | 7:10 p. m. | Carrusel 7 (fijar) |
| 03 | lun 23 nov | 7:20 p. m. | Carrusel 8 (fijar) |
| 04 | mié 25 nov | 7:00 p. m. | Carrusel 6 + historia |
| 05 | vie 27 nov | 7:00 a. m. | Carrusel 7 + historia encuesta |
| 06 | lun 30 nov | 7:00 a. m. | Carrusel 5 + historia con enlace |
| 07 | mié 2 dic | 7:00 p. m. | Carrusel 7 |
| 08 | vie 4 dic | 7:00 a. m. | Carrusel 7 + historia |
| 09 | lun 7 dic | 8:00 a. m. | Carrusel 8 (víspera del festivo del 8) |
| 10 | mié 9 dic | 7:00 a. m. | Carrusel 7 + historia con enlace |
| 11 | vie 11 dic | 7:00 p. m. | Carrusel 7 |
| 12 | 23 nov a 11 dic | según notas | 4 historias + 5 portadas de destacadas |

**Sobre las fechas:** el encargo decía “lunes 24 nov a viernes 12 dic”, pero en 2026 el 24 de noviembre es martes y el 12 de diciembre es sábado. Se mantuvo el ritmo lunes, miércoles y viernes (el mismo del plan de Instagram del Resumen Maestro) y se corrió todo un día: del lunes 23 al viernes 11. Son 9 días de publicación; por eso el lunes 23 salen tres seguidas (la primera fila del perfil queda completa con el concepto) y el Nº 12 es la serie de historias. Para mover fechas: editar `plan.mjs` y correr `npm run build && npm run site`.

**Biografía sugerida** (del manual): *Doña Lú · Café que se honra / De Arabia, Risaralda, a su mesa. / Lavado · Honey · Natural. Grano por grano. / Pedidos y Casas que honran por WhatsApp*. Enlace: wa.me/573224702667 hasta que la tienda de donalu.com.co esté publicada.

## Sistema visual

Del manual de marca v3 con la paleta cerrada del empaque único (`../EMPAQUE-UNICO.md`): verde #0F3B26, verde bolsa #173E2C, kraft #EBDFC8, crema #F4EDE0, café tostado #5B3A23, dorado #C9A45C; rojo cereza #9E2B25 solo en la fruta y el tachón de la pieza de voz. **Cormorant Garamond** (voz, títulos, itálica dorada para la palabra clave) y **Jost** (datos, mayúsculas espaciadas), descargadas de google/fonts en `assets/brand/fonts/` (licencia OFL incluida).

Recursos: masthead *Doña Lú · Nº XX* + capítulo, folio, “Desliza”, curvas de nivel de la ladera, isotipo Lú, wordmark, código grano por grano, íconos de proceso (gota, panal, cerezas), rama en grabado del catálogo, grano de película y **la luz Doña Lú** (el ajuste de color del manual) sobre todas las fotos de la finca. Tres layouts alternados: foto a sangre, foto arriba con texto abajo y tipográfico con numeral gigante. Las bolsas son el SVG del manual (`scripts/lib/bag.cjs`). Por regla de David no llevan rótulo de “ejemplo” ni “ilustración” en las láminas; el caption del Nº 04 dice “Así se ve el nuevo empaque” y nunca las presenta como foto. Las historias salen limpias: la posición de cada sticker va en las notas de `copy.md`.

Fotos: reales de la finca (las del manual) y de los kits con el tratamiento nuevo de `../kits-fotos/` (mesa de regalos para portada e historia del Nº 06, cuadrado para la cuadrícula). Salen de capturas del catálogo: pedir a Diana los originales. **Nunca se amplían** (`npm run check` lo verifica: hoy todas a resolución nativa o menor). No se usaron las imágenes del drive del cliente (generadas por IA), `taza.webp` ni `capsulas.webp`. Historias con zonas seguras (nada clave arriba de 240 px ni debajo de 1580 px).

## Fuentes de cada dato

- Citas del manifiesto (Nº 01, 07, 08): `MANIFIESTO DE MARCA.pdf`, verificadas palabra por palabra. Algunas van recortadas o partidas en dos frases, sin cambiar palabras.
- “Los invasores somos nosotros” (dicha por un trabajador): `qué significa este café para ti.pdf` (Diana) e informe integral.
- “Un buen café no se acelera”: `Informe_integral_Dona_Lu_Coffee.docx` (frases de marca) y manual. **No está en los PDF**, está en el informe (docx).
- Fauna, lotes con y sin sombra, ladera, cámara, recolección selectiva, abono y maleza, humedad del secado: texto de Diana (`qué significa este café para ti.pdf`) e historia fundacional.
- Finca en Arabia, Risaralda; café abandonado por costos y resembrado hace ~3 años: Resumen Ejecutivo / Maestro e informe integral.
- Procesos y notas de taza: manual v3 y Resumen Maestro. Medida y temperatura de preparación: ficha técnica del drive.
- Casas que honran, tono y pares “evitamos / decimos”: manual v3. Kits: catálogo de Navidad de Diana.

## Validar con Diana antes de publicar

- [ ] **Empaque único:** que ya está aprobado para producción y si hay bolsas impresas para el 25 nov. Si las hay, reemplazar las ilustraciones (Nº 04, Nº 10 lámina 6, Nº 12 historia 4) por fotos reales.
- [ ] **Origen:** la bolsa dice “Café de Colombia”; las piezas dicen finca de familia en **Arabia, Risaralda** (Nº 07, 10, 11, 12). Confirmar que se puede decir así (antes las bolsas decían “del Valle y del Eje Cafetero”).
- [ ] **Nº 07:** “hace unos tres años” se volvió a sembrar; “la tierra donde nació la familia”; que el Willys es de la finca. No se mencionan el desplazamiento ni el terremoto (decisión de la familia).
- [ ] **Nº 08:** nombre y permiso de cada persona que sale en las fotos (si quieren, nombrarlos en el caption).
- [ ] **Nº 03 código VI:** “sin intermediarios”: que hoy todo el café vendido es de la finca familiar (al inicio se vendió café Linares).
- [ ] **Nº 05:** que los tres procesos se venden en grano y molido.
- [ ] **Nº 06:** fecha límite de pedidos de Navidad y cobertura de envío (agregar al caption); enlace de la historia (landing de kits o WhatsApp).
- [ ] **Nº 09:** medida (10 g por 180 ml) y temperatura (92 °C) con quien tuesta.
- [ ] **Nº 10:** que llevan muestra y catan con el equipo; bolsa de 2,5 kg como formato para negocios; si el hablador con QR y el sello de puerta existen (si no, quitar la lámina 5 o decir “próximamente”); zonas que atienden; si se pueden nombrar las casas actuales (Cajicá, Sopó, Tienda Balsa).
- [ ] **Nº 12:** fecha de la tienda en donalu.com.co. Mientras la tienda no esté publicada, la historia 4 no sale.
- [ ] Biografía y enlace del perfil.

## Anuncios de Navidad (Meta Ads)

Fuente única: `scripts/ads.mjs` (kits del catálogo de Diana, textos, enlaces). Plan: `../meta-ads/PLAN-META-ADS-NAVIDAD.md`. Todos los textos en `anuncios/ANUNCIOS.md` y uno por anuncio en `anuncios/piezas/<id>/copy.md`.

| Anuncio | Formatos | Conjunto |
|---|---|---|
| k01 a k10 · un anuncio por kit, misma plantilla (solo cambia el kit) | 4:5 (1080×1350) y 9:16 (1080×1920) | A · Regalo hogar y C · Ya los conocen; los de $119.000 o más también en B · Empresas |
| h1 · Regale lo que hubo que cuidar (hogar) | 4:5, 9:16, 1:1 | A |
| h2 · Para su equipo y sus clientes (empresas) | 4:5, 9:16, 1:1 | B |
| h3 · Un buen café no se acelera. Su pedido, mejor ya (recordatorio) | 4:5, 9:16, 1:1 | C |

- Plantilla: kraft arriba con la foto del kit (estudio 4:5 de `../kits-fotos`, a su tamaño, nunca ampliada) y banda verde abajo con filete dorado, como la bolsa del empaque único: nombre, contenido, precio del catálogo y WhatsApp 322 470 2667. Sello dorado con la etiqueta del catálogo (Para empezar, Tres procesos, Un kilo de café…).
- Cada anuncio trae texto principal, título, descripción y dos destinos: **Comprar** → `https://donalu.com.co/kits-navidad/?utm_source=meta&utm_medium=paid&utm_campaign=nav-prueba&utm_content=k01#k01` y **Enviar mensaje** → wa.me/573224702667 con mensaje prellenado que incluye el código del anuncio.
- 9:16: nada clave arriba de 270 px ni debajo de 1.540 px (ahí Meta pone el perfil y el botón).
- **Fecha límite:** "Pida antes del XX de diciembre" va solo en los textos (copy.md) hasta que se confirme. No está impresa en las imágenes.

Validar antes de pautar:
- [ ] Fecha límite de pedidos y envío (agregarla a los textos).
- [ ] k08 y k10: el catálogo dice "mug térmico" y la foto muestra un termo Owala. Confirmar el contenido.
- [ ] Que la landing `donalu.com.co/kits-navidad/` esté publicada con los anclajes #k01 a #k10 (si no, usar el destino WhatsApp).
- [ ] Precios vigentes del catálogo.
- [ ] Fotos: las de `kits-fotos` salen de capturas del catálogo (unos 600 px). Pedir a Diana las fotos originales para ganar nitidez.

## Derechos

Fotos de la finca y de los kits: material de Doña Lú (uso orgánico y en pauta). Tipografías: OFL. Las bolsas son ilustraciones de We Rock sobre la dirección de empaque de Diana; el wordmark es un trazado de We Rock, no el vector oficial (pedir el original antes de imprimir).

## Estructura y cómo re-exportar

```
piezas/NN-slug/  slides.html · copy.md · export/*.png      (generados: no editar a mano; export/ no se sube al repo)
anuncios/        piezas/<id>/(slides.html · copy.md · export/) · ANUNCIOS.md · anuncios.json
descargas/       ZIP por sección con los PNG a tamaño completo y los textos
web/img, web/ads vistas previas WebP de la página
assets/          css/donalu.css · brand/(fonts, wordmark, rama) · photos/
scripts/         plan.mjs (calendario) · piezas.mjs (láminas, captions, alt, notas) · build · render · preview · feed-grid · site · resolucion · prep-assets
preview/         feed-grid.jpg + una hoja de contacto por pieza
index.html + web/img/   página para Diana
```

```
npm install
npm run prep            # fotos y recursos de marca a assets/ (sin redimensionar)
npm run build           # slides.html + copy.md + CAPTIONS.md desde plan.mjs y piezas.mjs
npm run render [-- 04]  # PNG en piezas/NN/export/ (Chrome local + puppeteer-core)
npm run preview         # hojas de contacto en preview/
npm run grid            # preview/feed-grid.jpg
npm run check           # ninguna foto ampliada
node scripts/ads.mjs                                  # anuncios: slides.html + copy.md + ANUNCIOS.md
PIEZAS=anuncios/piezas node scripts/render.mjs        # PNG de los anuncios
node scripts/hoja-anuncios.mjs                        # preview/anuncios-hoja.jpg
node scripts/zips.mjs   # descargas/*.zip (PNG + textos)
npm run site            # index.html + web/ (WebP)
```

`npm run prep` lee las fotos de las carpetas hermanas del cliente (`../img`, `../kits-fotos`…); en el repo ya van copiadas en `assets/photos/`, así que para re-renderizar basta con `npm install`, build y render (necesita Chrome instalado).

Peso: la página y sus vistas previas pesan unos 6 MB; los ZIP, unos 74 MB (contenidos) y 30 MB (anuncios), por debajo del límite de 100 MB por archivo de GitHub. Los PNG de `export/` se regeneran y no se suben (`.gitignore`).

Sin repo, sin commits y sin publicar desde aquí: el coordinador crea el repo y publica con el OK de David.
