/* Selector ESP / ENG. El español vive en el HTML; aquí está la versión en inglés de los textos marcados con data-i18n.
   Traducción preliminar para revisión del cliente. */
(() => {
  const EN = {
    // Compartidos
    'skip': 'Skip to content', 'donar': 'Donate now', 'copiar': 'Copy', 'ver': 'See programs', 'leer': 'Read story',
    'n.inicio': 'Home', 'n.quienes': 'About us', 'n.hacemos': 'What we do', 'n.noticias': 'News', 'n.transparencia': 'Transparency', 'n.contacto': 'Contact',
    'm.historia': '51 years of history', 'm.historia.d': 'Weaving solidarity in Colombia since 1975',
    'm.linea': 'Our history', 'm.linea.d': 'A timeline from 1975 to today', 'm.directivas': 'Leadership', 'm.directivas.d': 'Board, management and Advisory Council',
    'm.nydia.d': 'The legacy of Mamá Nydia', 'm.seccionales': 'Regional offices', 'm.seccionales.d': 'Bogotá, Antioquia, Córdoba and territories',
    'm.padrino': 'Solidarity Sponsor', 'm.padrino.d': 'Sponsor a program from US$22 a month',
    'l.edu': 'Early childhood and higher education', 'l.edu.d': 'Child center, Semillitas, scholarships and Youth',
    'l.ciu': 'Citizenship and mobilization', 'l.ciu.d': 'Family Network and community leaders',
    'l.rec': 'Recovery and reconstruction', 'l.rec.d': 'Emergency response since 1979',
    'l.nut': 'Nutrition and healthy living', 'l.nut.d': 'Older adults and well-being',
    'l.inn': 'Social innovation', 'l.inn.d': 'Cre-Acción Labs',
    'a.titulo': 'Earthquake emergency.', 'a.texto': 'Together with GEM we deliver food, water and shelter to affected families.',
    'a.boton': 'How to give', 'a.cuenta': 'Bank account', 'a.breb': 'Bre-B key', 'a.linea': 'Online', 'a.linea.d': 'PSE, cards and Nequi', 'a.cta': 'Give for the earthquake',
    'f.mision': 'Since 1975 we have worked for the integral development of Colombian families, with a focus on values and leadership.',
    'f.principal': 'Main office', 'f.explora': 'Explore', 'f.proveedores': 'Suppliers', 'f.privacidad': 'Privacy and data', 'f.terminos': 'Terms',
    'f.esal': 'ESAL update', 'f.informes': 'Annual reports', 'f.credito': 'Website developed by',

    // Inicio
    'h.sello': 'years multiplying solidarity · Since 1975',
    'h.t1': 'Your help today', 'h.t2': 'changes <em class="grad-text" style="font-style:normal">Colombia</em>', 'h.t3': 'tomorrow.',
    'h.lead': 'We educate, support and rebuild alongside children, young people, families and older adults across the country. Every gift becomes a real opportunity.',
    'h.cta2': 'See what we do', 'h.b1': 'Colombians reached', 'h.b2': 'scholarships', 'h.scroll': 'Discover',
    'i.eyebrow': 'Our impact in 51 years', 'i.t': 'Numbers that are <span class="calido-text">stories</span> with a name',
    'i.lead': 'Since 1975 the Foundation has reached millions of Colombians with education, values, emergency relief and opportunities to move forward.',
    'i.c1': 'families supported', 'i.c2': 'Colombians reached', 'i.c3': 'scholarships awarded',
    'i.pie': 'Cumulative figures from the Foundation’s current website. Updated with the latest annual report.', 'i.informes': 'See annual reports',
    'q.eyebrow': 'About us', 'q.t': 'A dream that became a helping hand for millions',
    'q.lead': 'The Foundation was born in 1975 from the dream of Doña Nydia Quintero de Balcázar. We work for the integral development of families, with a focus on values and leadership, especially where institutions cannot arrive in time.',
    'q.v1': 'Education that transforms', 'q.v2': 'Values', 'q.v3': 'Emergency response', 'q.v4': 'Community leadership', 'q.cta': 'Discover our story',
    'l.eyebrow': 'What we do', 'l.t': 'Five lines, one cause',
    'l.lead': 'Hover over (or tap) each line to discover its programs. They all work together so a family can have more opportunities.',
    'l.edu.p': 'From the Patio Bonito Child Development Center to university: we support every stage with free education, values and scholarships.',
    'l.ciu.p': 'More than 302,000 parents and caregivers trained since 1991 in the Solidarity Family Network, plus leaders who connect their community with the State.',
    'l.rec.p': 'Since the 1979 Tumaco tsunami: Armero, the Coffee Region, Mocoa and today the earthquake. 174 places reached and 64,444 families with humanitarian aid.',
    'l.nut.p': 'Physical, mental and social well-being. Our older adults receive nutritional supplements and psychosocial support every month.',
    'l.inn.p': 'Since 2016 we co-create solutions with academia, communities and the public and private sectors in the Cre-Acción Labs.',
    'n.eyebrow': 'The legacy of Mamá Nydia', 'n.cita': 'The legacy of Mamá Nydia lives on in every act of solidarity.',
    'n.cap': 'Founder · Neiva, October 22, 1931 · 2025',
    'n.lead': 'She devoted more than 50 years to serving with love, commitment and deep social sensitivity. Thanks to her vision, generations of children, young people and families transformed their lives.',
    'n.cta': 'Walk through her life',
    'g.eyebrow': 'GEM Alliance · 2026 earthquake', 'g.t': 'We arrived first. We stay to rebuild.',
    'g.lead': 'With Global Empowerment Mission, Fundación Colombia Luz y Sonrisas and Fundación Solidaridad de Colombia we support the communities hit by the earthquake.',
    'g.foto': 'Aid delivered in the affected area', 'g.f1': 'Emergency', 'g.f1.d': 'Immediate care for families',
    'g.f1.1': 'Food', 'g.f1.2': 'Water', 'g.f1.3': 'Hygiene kits', 'g.f1.4': 'Tents', 'g.f1.5': 'Bedding',
    'g.f2': 'Recovery', 'g.f2.d': 'Starting over, with the community', 'g.f2.1': 'Early recovery', 'g.f2.2': 'Home reconstruction', 'g.f2.3': 'Livelihoods',
    'g.alianza': 'About the alliance',
    'ag.eyebrow': 'Our progress in 2026', 'ag.t': 'New places to learn, play and come home',
    'ag.lead': 'In July we opened classrooms, libraries and workshops, and handed over rebuilt homes in Córdoba.',
    'ag.e1': 'New classrooms in Patio Bonito', 'ag.e1.1': 'Opening of the new classrooms', 'ag.e1.2': 'Mass at Inmaculada Concepción parish',
    'ag.e2': 'Library, play center and sewing workshop', 'ag.e2.1': 'Opening at the Trece de Noviembre community center',
    'ag.e3': 'Rebuilt homes in Brisas del Sinú', 'ag.e3.1': 'Home handover', 'ag.e3.2': 'Social programs fair', 'ag.e3.3': 'Mass at Santa Cruz Cathedral, Lorica',
    'p.eyebrow': 'Solidarity Sponsor', 'p.t': 'Sponsor a dream all year long', 'p.lead': 'Choose the program you want to support and see what it takes to change a life.',
    'p.p1': 'Early childhood', 'p.p3': 'Youth grades 7–9', 'p.p4': 'Youth grades 10–11', 'p.p5': 'University scholarships', 'p.p6': 'Older adults',
    'p.mensual': 'Monthly', 'p.anual': 'One year', 'p.parcial': 'One-time', 'p.cta': 'Become a sponsor',
    'no.eyebrow': 'News', 'no.t': 'What’s happening', 'no.todas': 'All news',
    'al.t': 'Partners who multiply',
    'c.eyebrow': 'Since 1979', 'c.t': 'Solidarity Walk 2026', 'c.p': 'The walk Doña Nydia started in 1979 is still the symbol of national solidarity. Sign up, walk and join in.', 'c.cta': 'Sign up for the Walk', 'c.ed': 'Edition',
    'f.eyebrow': 'Join us today', 'f.t': 'Together we are <span class="grad-text">more</span>.',
    'f.lead': 'Your donation reaches children, high school students, university students, families, older adults and communities struck by disaster.',

    // Dona
    'd.t': 'Every gift <span class="calido-text">multiplies</span>', 'd.lead': 'Choose how you want to help: sponsor a program all year, give once, or support the earthquake response.',
    'd.padrino': 'Become a Solidarity Sponsor', 'd.paso1': 'Choose a program', 'd.paso2': 'How often', 'd.paso3': 'Currency',
    'd.libre': 'Give any amount', 'd.libre.p': 'Every peso counts. Choose a suggested amount or enter yours on the payment page.',
    'd.sismo': 'Earthquake emergency', 'd.sismo.p': 'Transfer or scan. 100% goes to the GEM alliance response.',
    'd.cuenta': 'Bank account', 'd.intl': 'Donating from abroad?', 'd.intl.p': 'Give in dollars through GiveLively or PayPal, the Foundation’s international platforms.',
    'd.faq': 'Frequently asked questions', 'otro': 'Other', 'd.ir.cop': 'Give in pesos', 'd.ir.usd': 'Give in dollars',
  };
  const html = document.documentElement;
  const nodos = () => [...document.querySelectorAll('[data-i18n]')];
  nodos().forEach(n => { n.dataset.es = n.innerHTML; });
  const aplicar = lang => {
    html.lang = lang;
    nodos().forEach(n => {
      if (n.dataset.es === undefined) n.dataset.es = n.innerHTML;
      const t = lang === 'en' ? EN[n.dataset.i18n] : n.dataset.es;
      if (t !== undefined) n.innerHTML = t;
    });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem('spc-lang', lang); } catch (e) {}
    document.dispatchEvent(new Event('idioma'));
  };
  document.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) aplicar(b.dataset.lang); });
  let guardado = null; try { guardado = localStorage.getItem('spc-lang'); } catch (e) {}
  if (guardado === 'en') aplicar('en');
})();
