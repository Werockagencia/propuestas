/* WE ROCK · Propuesta de Home · narración con scroll. Sin dependencias.
   Un solo listener de scroll y un solo requestAnimationFrame.
   Cada escena es un contenedor alto con un hijo fijo (position: sticky).
   El progreso p (0 a 1) de cada escena mueve su contenido.
   Sin la clase html.mov (movimiento reducido) nada de esto corre:
   el HTML ya trae todo el contenido en su estado final. */
(function () {
  'use strict';
  var d = document, raiz = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var MOV = raiz.classList.contains('mov');
  setTimeout(function () { raiz.classList.add('listo'); }, 2600);
  var lim = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var suave = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* ---------- navegación ---------- */
  var nav = $('#nav'), menu = $('#menu'), bMenu = $('#btn-menu');
  function abrirMenu(si) {
    if (si) { menu.hidden = false; void menu.offsetWidth; }
    menu.classList.toggle('abierto', si); nav.classList.toggle('abierto', si);
    bMenu.setAttribute('aria-expanded', String(si));
    d.body.style.overflow = si ? 'hidden' : '';
    if (!si) setTimeout(function () { if (!menu.classList.contains('abierto')) menu.hidden = true; }, 500);
  }
  if (bMenu) {
    bMenu.addEventListener('click', function () { abrirMenu(bMenu.getAttribute('aria-expanded') !== 'true'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { abrirMenu(false); }); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('abierto')) { abrirMenu(false); bMenu.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 900 && menu.classList.contains('abierto')) abrirMenu(false); });
  }

  /* ---------- entradas simples ---------- */
  var ver = $$('.ver');
  if (MOV && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    ver.forEach(function (el) { io.observe(el); });
  } else { ver.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- preparación de escenas ---------- */
  var escenas = $$('[data-escena]').map(function (el) {
    var e = { el: el, tipo: el.getAttribute('data-escena'), p: -1 };
    if (e.tipo === 'palabras') {
      var h = $('[data-palabras]', el);
      if (MOV) {
        // Parte el titular en palabras sin perder el <em>. El texto completo queda en aria-label.
        h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
        var partir = function (nodo) {
          Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
            if (n.nodeType === 3) {
              var f = d.createDocumentFragment();
              n.textContent.split(/(\s+)/).forEach(function (t) {
                if (!t) return;
                if (/^\s+$/.test(t)) { f.appendChild(d.createTextNode(' ')); return; }
                var s = d.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.textContent = t; f.appendChild(s);
              });
              nodo.replaceChild(f, n);
            } else if (n.nodeType === 1) { partir(n); }
          });
        };
        partir(h);
      }
      e.palabras = $$('.w', el);
    }
    if (e.tipo === 'pasos') {
      e.pasos = $$('.paso', el); e.marcas = $$('.sistema-nav li', el);
      e.capas = $$('.capa', el); e.vis = $('.sistema-vis', el); e.paso = -1;
    }
    if (e.tipo === 'tablero') {
      e.cifras = $$('.cifra', el).map(function (c) { var b = $('[data-n]', c); return { caja: c, b: b, n: parseInt(b.getAttribute('data-n'), 10), v: -1 }; });
    }
    if (e.tipo === 'galeria') { e.carril = $('.carril', el); e.pista = $('.pista', el); }
    if (e.tipo === 'chat') { e.burbujas = $$('.b', el); }
    return e;
  });

  if (!MOV) return; // contenido estático: nada más que hacer

  /* ---------- pintar cada escena según su progreso ---------- */
  function pintar(e, p) {
    if (e.tipo === 'palabras') {
      var n = e.palabras.length, corte = lim((p - 0.08) / 0.74) * n;
      for (var i = 0; i < n; i++) e.palabras[i].classList.toggle('on', i < corte);
    }
    if (e.tipo === 'pasos') {
      var total = e.pasos.length, k = Math.min(total - 1, Math.floor(p * total * 0.999));
      e.vis.style.setProperty('--sep', suave(lim(p * total / 0.9)).toFixed(3));
      e.vis.style.setProperty('--rayo', lim((p * total - 0.35) / (total - 1.6)).toFixed(3));
      if (k !== e.paso) {
        e.paso = k;
        e.pasos.forEach(function (x, j) { x.classList.toggle('act', j === k); });
        e.marcas.forEach(function (x, j) { x.classList.toggle('act', j === k); });
        e.capas.forEach(function (x) { x.classList.toggle('act', +x.getAttribute('data-c') === k); });
        e.vis.classList.toggle('todo', k === total - 1);
      }
    }
    if (e.tipo === 'tablero') {
      e.el.style.setProperty('--p', lim((p - 0.1) / 0.75).toFixed(3));
      e.cifras.forEach(function (c, i) {
        var t = lim((p - 0.12 - i * 0.13) / 0.22), v = Math.round(c.n * suave(t));
        c.caja.classList.toggle('on', t > 0);
        if (v !== c.v) { c.v = v; c.b.textContent = String(v); }
      });
    }
    if (e.tipo === 'galeria') {
      if (!ancho) { e.pista.style.transform = ''; return; }
      var rec = Math.max(0, e.pista.scrollWidth - window.innerWidth);
      e.pista.style.transform = 'translate3d(' + (-rec * lim((p - 0.06) / 0.86)).toFixed(1) + 'px,0,0)';
    }
    if (e.tipo === 'chat') {
      var m = e.burbujas.length;
      e.burbujas.forEach(function (b, i) { b.classList.toggle('on', p > 0.06 + i * (0.7 / m)); });
    }
  }

  /* ---------- bucle ---------- */
  var ancho = false, pend = false, vh = 0;
  function medir() {
    vh = window.innerHeight;
    ancho = window.innerWidth > 760;
    raiz.classList.toggle('ancho', ancho);
    escenas.forEach(function (e) { e.p = -1; });
    cuadro();
  }
  function cuadro() {
    pend = false;
    nav.classList.toggle('baja', window.scrollY > 24);
    for (var i = 0; i < escenas.length; i++) {
      var e = escenas[i], r = e.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      var tramo = r.height - vh, p = tramo > 0 ? lim(-r.top / tramo) : (r.top < vh * 0.5 ? 1 : 0);
      if (Math.abs(p - e.p) < 0.0005) continue;
      e.p = p; pintar(e, p);
    }
  }
  window.addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(cuadro); } }, { passive: true });
  window.addEventListener('resize', medir);
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(medir);
  medir();
})();
