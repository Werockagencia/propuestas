/* Fundación Solidaridad por Colombia · interacciones del sitio (vanilla, sin dependencias) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tactil = matchMedia('(hover: none)').matches;
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  /* ---------- Encabezado: estado sólido + progreso de lectura ---------- */
  const hdr = $('.hdr');
  const barra = $('.barra-lectura');
  const alScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (hdr) {
      hdr.classList.toggle('solido', y > 40);
      document.body.classList.toggle('ver-flotante', y > innerHeight * .9);
      hdr.style.setProperty('--prog', max > 0 ? (y / max).toFixed(4) : 0);
    }
    if (barra) {
      const art = $('.articulo');
      const r = art ? art.getBoundingClientRect() : null;
      const p = r ? Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))) : y / max;
      barra.style.transform = `scaleX(${p})`;
    }
  };
  addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  /* ---------- Mega menú ---------- */
  const disparadores = $$('.nav-a[aria-controls]');
  const cerrarMenus = (excepto) => disparadores.forEach(b => { if (b !== excepto) b.setAttribute('aria-expanded', 'false'); });
  disparadores.forEach(b => {
    const li = b.parentElement;
    let t;
    b.addEventListener('click', e => { e.stopPropagation(); const abierto = b.getAttribute('aria-expanded') === 'true'; cerrarMenus(b); b.setAttribute('aria-expanded', String(!abierto)); });
    if (!tactil) {
      li.addEventListener('mouseenter', () => { clearTimeout(t); cerrarMenus(b); b.setAttribute('aria-expanded', 'true'); });
      li.addEventListener('mouseleave', () => { t = setTimeout(() => b.setAttribute('aria-expanded', 'false'), 180); });
    }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) cerrarMenus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { cerrarMenus(); document.body.classList.remove('menu-abierto'); $('.burger')?.setAttribute('aria-expanded', 'false'); } });

  /* ---------- Panel móvil ---------- */
  const burger = $('.burger');
  burger?.addEventListener('click', () => {
    const abierto = document.body.classList.toggle('menu-abierto');
    burger.setAttribute('aria-expanded', String(abierto));
  });
  $$('.panel-movil a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('menu-abierto'); burger?.setAttribute('aria-expanded', 'false'); }));

  /* ---------- Franja de emergencia ---------- */
  const alerta = $('.alerta');
  if (alerta) {
    if (leer('spc-alerta-cerrada') === alerta.dataset.version) alerta.hidden = true;
    // El hero mide 100vh menos la fila visible de la franja
    const medirAlerta = () => document.documentElement.style.setProperty('--alerta-h', alerta.hidden ? '0px' : $('.alerta-fila', alerta).offsetHeight + 'px');
    medirAlerta(); addEventListener('resize', medirAlerta);
    $('.alerta-abrir', alerta)?.addEventListener('click', e => {
      const abierta = alerta.toggleAttribute('data-open');
      e.currentTarget.setAttribute('aria-expanded', String(abierta));
    });
    $('.alerta-cerrar', alerta)?.addEventListener('click', () => {
      alerta.style.transition = 'opacity .4s, transform .5s';
      alerta.style.opacity = '0'; alerta.style.transform = 'translateY(-100%)';
      setTimeout(() => { alerta.hidden = true; medirAlerta(); }, 420);
      guardar('spc-alerta-cerrada', alerta.dataset.version);
    });
  }

  /* ---------- Copiar al portapapeles ---------- */
  $$('[data-copiar]').forEach(b => b.addEventListener('click', async () => {
    const txt = b.dataset.copiar, original = b.innerHTML;
    try { await navigator.clipboard.writeText(txt); } catch (e) {
      const t = document.createElement('textarea'); t.value = txt; document.body.append(t); t.select(); document.execCommand('copy'); t.remove();
    }
    b.classList.add('ok'); b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>' + (document.documentElement.lang === 'en' ? 'Copied' : 'Copiado');
    setTimeout(() => { b.classList.remove('ok'); b.innerHTML = original; }, 1800);
  }));

  /* ---------- Revelado y contadores ---------- */
  const formato = (n, dec) => n.toLocaleString('es-CO', { maximumFractionDigits: dec || 0, minimumFractionDigits: dec || 0 });
  const contar = el => {
    const fin = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    if (quieto) { el.textContent = pre + formato(fin, dec) + suf; return; }
    const dur = 2200, t0 = performance.now();
    const paso = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = pre + formato(fin * e, dec) + suf; if (p < 1) requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    $$('[data-count]', e.target).forEach(c => { if (!c.dataset.ok) { c.dataset.ok = 1; contar(c); } });
    if (e.target.matches('[data-count]') && !e.target.dataset.ok) { e.target.dataset.ok = 1; contar(e.target); }
    io.unobserve(e.target);
  }), { threshold: .18, rootMargin: '0px 0px -40px 0px' });
  $$('.rv, [data-count], .impacto-grid').forEach(el => io.observe(el));

  /* ---------- Líneas de acción: acordeón horizontal ---------- */
  $$('.lineas').forEach(grupo => {
    const paneles = $$('.linea-panel', grupo);
    const activar = p => { paneles.forEach(x => { x.classList.toggle('activa', x === p); x.setAttribute('aria-expanded', String(x === p)); }); };
    paneles.forEach(p => {
      if (!tactil) p.addEventListener('mouseenter', () => activar(p));
      p.addEventListener('focus', () => activar(p));
      p.addEventListener('click', e => { if (!p.classList.contains('activa')) { e.preventDefault(); activar(p); } });
    });
  });

  /* ---------- Inclinación 3D y foco de luz en tarjetas ---------- */
  if (!quieto && !tactil) {
    $$('.tilt').forEach(el => {
      let raf;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { el.style.transform = `perspective(1100px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`; });
      });
      el.addEventListener('mouseleave', () => { cancelAnimationFrame(raf); el.style.transform = ''; });
    });
    $$('.card').forEach(c => c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }));
    // Botones magnéticos
    $$('.btn-donar, .magnetico').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        b.style.translate = `${(x * .18).toFixed(1)}px ${(y * .28).toFixed(1)}px`;
      });
      b.addEventListener('mouseleave', () => { b.style.translate = ''; });
    });
  }

  /* ---------- Anillos del hero (canvas liviano que sigue al mouse) ---------- */
  const lienzo = $('#anillos');
  if (lienzo && !quieto) {
    const ctx = lienzo.getContext('2d');
    const colores = ['#36C3F3', '#F98621', '#FB303C', '#286FBE', '#ffffff'];
    let W, H, dpr, anillos = [], mx = -999, my = -999, vivo = true;
    const medir = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      W = lienzo.clientWidth; H = lienzo.clientHeight;
      lienzo.width = W * dpr; lienzo.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(26, W / 55));
      anillos = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H, r: 4 + Math.random() * (i % 5 === 0 ? 34 : 12),
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, c: colores[i % colores.length], a: .15 + Math.random() * .35, w: 1 + Math.random() * 2.5
      }));
    };
    const dibujar = () => {
      if (!vivo) return;
      ctx.clearRect(0, 0, W, H);
      for (const o of anillos) {
        const dx = o.x - mx, dy = o.y - my, d = Math.hypot(dx, dy);
        if (d < 160 && d > 0) { o.vx += dx / d * .06; o.vy += dy / d * .06; }
        o.vx *= .985; o.vy *= .985; o.x += o.vx + Math.sin(performance.now() / 4000 + o.r) * .08; o.y += o.vy;
        if (o.x < -40) o.x = W + 40; if (o.x > W + 40) o.x = -40; if (o.y < -40) o.y = H + 40; if (o.y > H + 40) o.y = -40;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.strokeStyle = o.c; ctx.globalAlpha = o.a; ctx.lineWidth = o.w; ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(dibujar);
    };
    medir(); dibujar();
    addEventListener('resize', medir);
    lienzo.parentElement.addEventListener('mousemove', e => { const r = lienzo.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    lienzo.parentElement.addEventListener('mouseleave', () => { mx = my = -999; });
    new IntersectionObserver(([e]) => { const antes = vivo; vivo = e.isIntersecting; if (vivo && !antes) dibujar(); }).observe(lienzo);
  }

  /* ---------- Pestañas accesibles ---------- */
  $$('[role="tablist"]').forEach(lista => {
    const tabs = $$('[role="tab"]', lista), ind = $('.tabs-indicador', lista);
    const mover = t => { if (!ind) return; ind.style.left = t.offsetLeft + 'px'; ind.style.width = t.offsetWidth + 'px'; ind.style.background = getComputedStyle(t).getPropertyValue('--c'); };
    const activar = (t, foco) => {
      tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
      mover(t); if (foco) t.focus();
      if (lista.dataset.hash !== undefined) history.replaceState(null, '', '#' + t.dataset.slug);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activar(t));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); activar(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
    const inicial = tabs.find(t => location.hash && t.dataset.slug === location.hash.slice(1)) || tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    activar(inicial);
    addEventListener('resize', () => mover(tabs.find(t => t.getAttribute('aria-selected') === 'true')));
    document.fonts?.ready.then(() => mover(tabs.find(t => t.getAttribute('aria-selected') === 'true')));
  });

  /* ---------- Línea de tiempo arrastrable ---------- */
  $$('.tl-wrap').forEach(w => {
    const tl = $('.tl', w), barraP = $('.tl-progreso i', w);
    const act = () => { const max = tl.scrollWidth - tl.clientWidth; barraP && (barraP.style.transform = `scaleX(${Math.max(.06, max ? tl.scrollLeft / max : 1)})`); };
    tl.addEventListener('scroll', act, { passive: true }); act();
    $$('[data-tl]', w).forEach(b => b.addEventListener('click', () => tl.scrollBy({ left: (+b.dataset.tl) * (tl.clientWidth * .8), behavior: 'smooth' })));
    let x0, s0, mov = false;
    tl.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; x0 = e.clientX; s0 = tl.scrollLeft; mov = true; });
    addEventListener('pointermove', e => { if (!mov) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) tl.classList.add('arrastrando'); tl.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { mov = false; tl.classList.remove('arrastrando'); });
    tl.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.shiftKey) { tl.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
  });

  /* ---------- Tarjetas que se voltean ---------- */
  $$('.flip').forEach(f => f.addEventListener('click', () => f.setAttribute('aria-pressed', String(f.getAttribute('aria-pressed') !== 'true'))));

  /* ---------- Filtro del Consejo Superior ---------- */
  const filtro = $('#filtro-consejo');
  if (filtro) {
    const items = $$('.consejo li'), out = $('#filtro-n');
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    filtro.addEventListener('input', () => {
      const q = norm(filtro.value.trim()); let n = 0;
      items.forEach(li => {
        const nombre = li.dataset.nombre, ok = !q || norm(nombre).includes(q);
        li.hidden = !ok; if (ok) n++;
        const span = $('span', li);
        if (q && ok) { const i = norm(nombre).indexOf(q); span.innerHTML = nombre.slice(0, i) + '<mark>' + nombre.slice(i, i + q.length) + '</mark>' + nombre.slice(i + q.length); }
        else span.textContent = nombre;
      });
      out.textContent = n + ' de ' + items.length;
    });
  }

  /* ---------- Mapa de seccionales ---------- */
  $$('.mapa-grid').forEach(g => {
    const pins = $$('.pin', g), panel = $('.sede-panel', g);
    const datos = JSON.parse($('#datos-sedes').textContent);
    const pintar = id => {
      const d = datos[id];
      pins.forEach(p => p.setAttribute('aria-pressed', String(p.dataset.sede === id)));
      panel.style.setProperty('--c', d.color);
      panel.innerHTML = `
        <span class="eyebrow" style="color:${d.color}">${d.tipo}</span>
        <h3>${d.nombre}</h3>
        <p>${d.texto}</p>
        <ul class="sede-datos">${d.datos.map(x => `<li>${document.getElementById('ico-' + x[0])?.innerHTML || ''}<span>${x[1]}</span></li>`).join('')}</ul>
        ${d.municipios ? `<div class="municipios">${d.municipios.map(m => `<span class="chip"><i style="--c:${d.color}"></i>${m}</span>`).join('')}</div>` : ''}`;
      panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    };
    pins.forEach(p => p.addEventListener('click', () => pintar(p.dataset.sede)));
    pintar(pins[0].dataset.sede);
  });

  /* ---------- Padrino Solidario (datos reales del sitio actual) ---------- */
  const P = window.PADRINO = {
    infancia: { n: 'Primera infancia', d: 'Educación, nutrición y valores para un niño del CDI de Patio Bonito.',
      o: { anual: [5000000, 1200, 'KQm66H', 'BSHWX2CEREHFL'], mensual: [417000, 100, 'tfEQMF', '4URA4S5N4LK8L'], parcial: [1650000, 384, 'jQEf7x', 'JQ5Y2H9ZT37AU'] } },
    semillitas: { n: 'Semillitas', d: 'Talleres de danza, pensamiento crítico, liderazgo y valores para niños de 6 a 12 años.',
      o: { anual: [1230000, 272, 'XAJKh8', 'F9WWB785F54EC'], mensual: [103000, 23, 'AeVCpU', 'VSVTGQXZ2QCTU'] } },
    jovenes79: { n: 'Jóvenes Solidarios 7° a 9°', d: 'Formación en ciudadanía, valores y liderazgo para construir paz.',
      o: { anual: [1200000, 256, '4mqST0', '4R9N7ECSATG7E'], mensual: [100000, 22, 'bbJo4f', 'LBYVB748HE4EU'] } },
    jovenes1011: { n: 'Jóvenes Solidarios 10° y 11°', d: 'Ciudadanía, valores y liderazgo para los últimos grados del colegio.',
      o: { anual: [1750000, 384, '1ITTRL', 'DYGAHKC3PXAH2'], mensual: [146000, 32, 'ExZIgv', '6Q7TWSPGC52MG'] } },
    becas: { n: 'Becas Diana Turbay', d: 'Educación superior para jóvenes destacados de Jóvenes Solidarios.',
      o: { anual: [3600000, 767, '1ZWczB', 'XBFVGEJMLHH2G'], mensual: [300000, 64, 'v9Ojbd', '2FCJLBWDHZ646'], parcial: [1600000, 384, 'vypd7k', '53XBA6BYJ4ZM4'] } },
    mayor: { n: 'Adulto mayor', d: '3 libras de complemento nutricional al mes, con seguimiento psicosocial y nutricional.',
      o: { anual: [1160000, 256, 'VPsWJL', 'PF4XFY9NB6R24'], mensual: [97000, 22, 'nPLOHt', 'NRYTKK7A6U7QL'] } },
  };
  const FREQ = { anual: ['al año', 'per year', 'Un año completo'], mensual: ['al mes', 'per month', 'Mensual recurrente'], parcial: ['pago único', 'one time', 'Aporte parcial único'] };
  const cop = n => '$' + n.toLocaleString('es-CO');
  $$('[data-padrino]').forEach(w => {
    const st = { prog: w.dataset.inicial || 'infancia', freq: 'mensual', mon: 'COP' };
    const pintar = () => {
      const en = document.documentElement.lang === 'en';
      const p = P[st.prog]; if (!p.o[st.freq]) st.freq = 'mensual';
      const [c, u, wompi, paypal] = p.o[st.freq];
      $$('[data-prog]', w).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.prog === st.prog)));
      $$('[data-freq]', w).forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.freq === st.freq)); b.hidden = !p.o[b.dataset.freq]; });
      $$('[data-mon]', w).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mon === st.mon)));
      const m = $('[data-monto]', w);
      m.innerHTML = (st.mon === 'COP' ? cop(c) : 'US$' + u) + `<span>${st.mon} · ${FREQ[st.freq][en ? 1 : 0]}</span>`;
      m.classList.remove('swap'); void m.offsetWidth; m.classList.add('swap');
      const d = $('[data-desc]', w); if (d) d.textContent = p.d;
      const nom = $('[data-nombre]', w); if (nom) nom.textContent = p.n + ' · ' + FREQ[st.freq][2];
      const ir = $('[data-ir]', w);
      if (ir) ir.href = st.mon === 'COP' ? 'https://checkout.wompi.co/l/' + wompi : 'https://www.paypal.com/donate/?hosted_button_id=' + paypal;
      const via = $('[data-via]', w); if (via) via.textContent = st.mon === 'COP' ? (en ? 'Secure payment with Wompi (PSE, cards, Nequi)' : 'Pago seguro con Wompi (PSE, tarjetas, Nequi)') : (en ? 'Secure payment with PayPal' : 'Pago seguro con PayPal');
    };
    w.addEventListener('click', e => {
      const b = e.target.closest('[data-prog],[data-freq],[data-mon]'); if (!b) return;
      if (b.dataset.prog) st.prog = b.dataset.prog; if (b.dataset.freq) st.freq = b.dataset.freq; if (b.dataset.mon) st.mon = b.dataset.mon;
      pintar();
    });
    document.addEventListener('idioma', pintar);
    pintar();
  });

  /* Donación libre: montos sugeridos */
  $$('.monto-libre').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', g).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));

  /* ---------- Filtros de noticias ---------- */
  $$('.filtros').forEach(f => f.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', f).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const cat = b.dataset.cat;
    const cambiar = () => $$('.notas .nota').forEach(n => n.classList.toggle('oculta', cat !== 'todas' && n.dataset.cat !== cat));
    document.startViewTransition && !quieto && !document.hidden ? document.startViewTransition(cambiar) : cambiar();
  }));

  /* ---------- Formularios (solo demostración) ---------- */
  $$('form.form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.classList.add('enviado'); f.reset(); }));

  /* ---------- Relato del homenaje ---------- */
  const fotos = $$('.relato-fotos figure'), anoF = $('.relato-fotos .ano-flotante');
  if (fotos.length) {
    const ior = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('.relato-paso').forEach(p => p.classList.toggle('on', p === e.target));
      const i = +e.target.dataset.i; fotos.forEach((f, k) => f.classList.toggle('on', k === i));
      if (anoF) anoF.textContent = e.target.dataset.ano;
    }), { rootMargin: '-45% 0px -45% 0px' });
    $$('.relato-paso').forEach(p => ior.observe(p));
  }

  /* ---------- Barra de anclas con sección activa ---------- */
  const anclas = $$('.ancla-bar a');
  if (anclas.length) {
    const ioa = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) anclas.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    anclas.forEach(a => { const s = $(a.getAttribute('href')); s && ioa.observe(s); });
  }

  /* ---------- Aviso de propuesta ---------- */
  const aviso = $('.aviso-propuesta');
  if (aviso && !sessionStorage.getItem('spc-aviso')) {
    setTimeout(() => aviso.classList.add('on'), 2600);
    $('button', aviso).addEventListener('click', () => { aviso.classList.remove('on'); try { sessionStorage.setItem('spc-aviso', 1); } catch (e) {} });
  }

  /* ---------- Slider del hero ---------- */
  const slider = $('.hero-slider');
  if (slider) {
    const slides = $$('.slide', slider), puntos = $$('.sp', slider), pausaBtn = $('.sf-pausa', slider);
    let actual = 0, pausaManual = quieto, sobre = false, fuera = false;
    slider.style.setProperty('--dur', '7s');
    const pausar = () => slider.classList.toggle('pausado', pausaManual || sobre || fuera);
    const ir = n => {
      n = (n + slides.length) % slides.length;
      if (n === actual) return;
      slides.forEach((s, i) => {
        const on = i === n;
        s.classList.toggle('activo', on);
        s.toggleAttribute('inert', !on);
        s.setAttribute('aria-hidden', String(!on));
        if (on) $$('img[loading="lazy"]', s).forEach(img => { img.loading = 'eager'; });
      });
      puntos.forEach((p, i) => p.setAttribute('aria-current', String(i === n)));
      actual = n;
    };
    // La barra de progreso manda: cuando termina de llenarse, pasa a la siguiente
    puntos.forEach((p, i) => {
      p.addEventListener('click', () => ir(i));
      $('i b', p).addEventListener('animationend', () => { if (i === actual) ir(actual + 1); });
    });
    $$('[data-dir]', slider).forEach(b => b.addEventListener('click', () => ir(actual + +b.dataset.dir)));
    pausaBtn?.addEventListener('click', () => {
      pausaManual = !pausaManual;
      pausaBtn.setAttribute('aria-pressed', String(pausaManual));
      pausaBtn.setAttribute('aria-label', pausaManual ? 'Reproducir' : 'Pausar');
      pausar();
    });
    if (quieto) pausaBtn?.setAttribute('aria-pressed', 'true');
    if (!tactil) {
      slider.addEventListener('mouseenter', () => { sobre = true; pausar(); });
      slider.addEventListener('mouseleave', () => { sobre = false; pausar(); });
    }
    slider.addEventListener('focusin', () => { sobre = true; pausar(); });
    slider.addEventListener('focusout', () => { sobre = false; pausar(); });
    slider.addEventListener('keydown', e => { if (e.key === 'ArrowRight') ir(actual + 1); if (e.key === 'ArrowLeft') ir(actual - 1); });
    // Deslizar con el dedo
    let x0 = null, y0 = 0;
    slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    slider.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) ir(actual + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    // Precarga de las fotos grandes cuando la página ya cargó
    addEventListener('load', () => setTimeout(() => $$('.slide img[loading="lazy"]', slider).forEach(img => { img.loading = 'eager'; }), 1200));
    // Fuera de pantalla no avanza
    new IntersectionObserver(([e]) => { fuera = !e.isIntersecting; pausar(); }).observe(slider);
    pausar();
  }

  /* Año del pie */
  $$('[data-ano-actual]').forEach(e => { e.textContent = new Date().getFullYear(); });
})();
