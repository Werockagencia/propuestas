// Calendario de los 12 contenidos de lanzamiento de marca Doña Lú (ÚNICA FUENTE: build, CAPTIONS.md, README y página para el cliente leen de aquí).
// Ritmo: lunes, miércoles y viernes del lunes 23 nov al viernes 11 dic 2026 (9 días; el 24 nov de 2026 es martes y el 12 dic, sábado). El lunes 23 salen 3 seguidas para que la primera fila del perfil
// quede completa (11 publicaciones de feed) y el Nº 12 es la serie de historias + portadas de destacadas que lleva a WhatsApp y a la web.
// La pauta de los kits de Navidad va aparte (Meta Ads): estas piezas son orgánicas y conviven con ella.

export const capitulos = [
  { n: 'I', name: 'Lo que hubo que cuidar', line: 'Qué es Doña Lú y qué quiere decir “Café que se honra”, dicho sin rodeos.' },
  { n: 'II', name: 'Tres maneras de tomarlo', line: 'Un solo empaque para los tres procesos: cambia la etiqueta, no el cuidado.' },
  { n: 'III', name: 'Quienes lo hacen', line: 'La finca y su gente, con admiración y nunca con lástima.' },
  { n: 'IV', name: 'Su mesa', line: 'Cómo prepararlo, a quién servírselo y cómo habla esta casa.' },
];

export const plan = [
  { n: '01', slug: 'no-vendemos-cafe', cap: 'I', title: 'No vendemos café.', tipo: 'Carrusel', fecha: '2026-11-23', hora: '7:00 p. m.',
    rol: 'Manifiesto. Rompe la categoría: presenta la marca con las palabras de su propio manifiesto. Se fija en el perfil.',
    audiencia: 'Quien toma café todos los días y nunca se ha preguntado de dónde viene (30–55 años, Sabana de Bogotá y Bogotá).' },
  { n: '02', slug: 'cafe-que-se-honra', cap: 'I', title: '¿Qué quiere decir “Café que se honra”?', tipo: 'Carrusel', fecha: '2026-11-23', hora: '7:10 p. m.',
    rol: 'Explica el concepto en palabras sencillas: la tierra, las manos, el tiempo y la mesa. Nadie tiene que descifrar nada.',
    audiencia: 'Quien llega por primera vez al perfil y necesita entender en 10 segundos qué es Doña Lú.' },
  { n: '03', slug: 'todo-lo-que-hubo-que-cuidar', cap: 'I', title: 'Todo lo que hubo que cuidar', tipo: 'Carrusel', fecha: '2026-11-23', hora: '7:20 p. m.',
    rol: 'Inventario de cuidados: seis hechos de la finca, uno por lámina con su foto, del texto de Diana. Cierra la primera fila del perfil con la última línea del manifiesto.',
    audiencia: 'Comprador de 30 a 55 años en Bogotá y la Sabana que compara marcas de café y quiere hechos, no adjetivos.' },
  { n: '04', slug: 'una-bolsa-tres-cafes', cap: 'II', title: 'Limpio, dulce o frutal. La misma finca.', tipo: 'Carrusel + historia', fecha: '2026-11-25', hora: '7:00 p. m.',
    rol: 'Presenta el empaque único: los tres procesos visten igual y solo cambia la etiqueta. Enseña a leer la bolsa.',
    audiencia: 'Clientes actuales que conocían las bolsas de colores y nuevos compradores en la tienda o la web.' },
  { n: '05', slug: 'lavado-honey-natural', cap: 'II', title: 'Lavado, Honey o Natural', tipo: 'Carrusel + historia (encuesta)', fecha: '2026-11-27', hora: '7:00 a. m.',
    rol: 'Guía de procesos que se guarda: qué cambia entre los tres y cómo se nota en la taza, sin jerga.',
    audiencia: 'Quien quiere probar café de origen pero no sabe qué pedir.' },
  { n: '06', slug: 'los-tres-en-una-caja', cap: 'II', title: 'Los tres, en una caja.', tipo: 'Carrusel + historia (enlace)', fecha: '2026-11-30', hora: '7:00 a. m.',
    rol: 'Puente con la campaña de Navidad: los kits como la forma de regalar los tres procesos. Lleva a WhatsApp.',
    audiencia: 'Quien busca un regalo de fin de año con historia (familia, clientes, equipo de trabajo).' },
  { n: '07', slug: 'los-invasores-somos-nosotros', cap: 'III', title: 'Los invasores somos nosotros.', tipo: 'Carrusel', fecha: '2026-12-02', hora: '7:00 p. m.',
    rol: 'Origen: la finca familiar como ecosistema. La frase de un trabajador que cambió la manera de mirar la finca.',
    audiencia: 'Público que valora la naturaleza, el origen y el consumo consciente.' },
  { n: '08', slug: 'aqui-no-hay-pobrecitos', cap: 'III', title: 'Aquí no hay pobrecitos.', tipo: 'Carrusel + historia', fecha: '2026-12-04', hora: '7:00 a. m.',
    rol: 'La gente y la recolección grano por grano, contadas con admiración: conocimiento, decisiones y orgullo.',
    audiencia: 'Quien quiere saber quién está detrás de lo que compra. También aliados B2B que necesitan una historia que contar.' },
  { n: '09', slug: 'un-buen-cafe-no-se-acelera', cap: 'IV', title: 'Un buen café no se acelera.', tipo: 'Carrusel', fecha: '2026-12-07', hora: '8:00 a. m.',
    rol: 'Cómo prepararlo en casa (medida, agua, molienda y tres métodos). Contenido para guardar, la víspera del festivo del 8 de diciembre.',
    audiencia: 'Quien ya compró o recibió un kit y quiere sacarle el mejor café.' },
  { n: '10', slug: 'casas-que-honran', cap: 'IV', title: 'Casas que honran', tipo: 'Carrusel + historia (enlace)', fecha: '2026-12-09', hora: '7:00 a. m.',
    rol: 'Explica en simple el programa para negocios: café para restaurantes, hoteles, oficinas y tiendas. Lleva a WhatsApp.',
    audiencia: 'Dueños y administradores de restaurantes, hoteles pequeños, oficinas y tiendas de la Sabana y Bogotá.' },
  { n: '11', slug: 'este-se-quedo-en-casa', cap: 'IV', title: 'Este se quedó en casa.', tipo: 'Carrusel', fecha: '2026-12-11', hora: '7:00 p. m.',
    rol: 'Cierra el lanzamiento con orgullo: el mejor café de Colombia suele irse lejos; este se queda en su mesa, en sus regalos de Navidad y en las Casas que honran. Lleva a WhatsApp.',
    audiencia: 'Comprador de 30 a 55 años en Bogotá y la Sabana que quiere tomar y regalar el café bueno de su propio país, y negocios que lo sirven.' },
  { n: '12', slug: 'historias-escribanos', cap: '·', title: 'Escríbanos (historias y destacadas)', tipo: '4 historias + 5 portadas de destacadas', fecha: '2026-11-23', hora: 'Del 23 nov al 11 dic',
    rol: 'Serie de historias que lleva a WhatsApp y a la web, y portadas de destacadas para ordenar el perfil (La finca, Lavado, Honey, Natural, Casas).',
    audiencia: 'Quien ya está interesado y necesita el camino corto para pedir.' },
];
