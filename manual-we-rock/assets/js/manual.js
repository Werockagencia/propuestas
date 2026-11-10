/* WE ROCK · Manual de Marca 2.0 · comportamiento del manual. Sin dependencias. */
(function () {
  'use strict';
  var d = document, raiz = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var quieto = function () { return mq.matches || raiz.classList.contains('sin-mov'); };

  /* ---------- aviso corto ---------- */
  var tostada = $('#tostada'), tt;
  function avisar(t) {
    if (!tostada) return;
    tostada.textContent = t; tostada.classList.add('ver');
    clearTimeout(tt); tt = setTimeout(function () { tostada.classList.remove('ver'); }, 1600);
  }
  function copiar(texto, ok) {
    var fin = function () { avisar(ok); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(texto).then(fin, respaldo); } else { respaldo(); }
    function respaldo() {
      var a = d.createElement('textarea'); a.value = texto; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;opacity:0';
      d.body.appendChild(a); a.select();
      try { d.execCommand('copy'); fin(); } catch (e) { avisar('No se pudo copiar'); }
      a.remove();
    }
  }

  /* ---------- entradas en scroll ---------- */
  var vistos = $$('.rv, .pulso.trazo');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in'); io.unobserve(e.target);
        $$('[data-cuenta]', e.target).forEach(contar);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    vistos.forEach(function (el) { io.observe(el); });
  } else {
    vistos.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- contador de cifras: 0 → valor en 960 ms ---------- */
  function contar(el) {
    var fin = parseInt(el.getAttribute('data-cuenta'), 10);
    if (isNaN(fin) || quieto() || fin === 0) { el.textContent = String(fin); return; }
    var t0 = null, dur = 960;
    function paso(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(fin * e));
      if (p < 1) requestAnimationFrame(paso);
    }
    el.textContent = '0'; requestAnimationFrame(paso);
  }
  var demoCuenta = $('#demo-cuenta');
  if (demoCuenta) {
    var relanzar = function () { contar($('[data-cuenta]', demoCuenta)); };
    demoCuenta.addEventListener('mouseenter', relanzar); demoCuenta.addEventListener('click', relanzar);
  }

  /* ---------- barra: capítulo actual y progreso ---------- */
  var caps = $$('[data-cap]'), dn = $('#donde-n'), dt = $('#donde-t'), prog = $('.barra-prog'), pend = false;
  function medir() {
    pend = false;
    var y = window.scrollY, alto = d.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.setProperty('--prog', alto > 0 ? Math.min(1, y / alto).toFixed(4) : 0);
    var linea = window.innerHeight * 0.35, actual = caps[0];
    for (var i = 0; i < caps.length; i++) { if (caps[i].getBoundingClientRect().top <= linea) actual = caps[i]; }
    if (actual && dn && dn.textContent !== actual.dataset.cap + actual.dataset.nombre) {
      dn.textContent = actual.dataset.cap; dt.textContent = actual.dataset.nombre;
    }
  }
  window.addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(medir); } }, { passive: true });
  window.addEventListener('resize', medir); medir();

  /* ---------- índice ---------- */
  var indice = $('#indice'), bInd = $('#btn-indice'), bCer = $('#btn-cerrar');
  function abrir(si) {
    indice.classList.toggle('abierto', si); bInd.setAttribute('aria-expanded', String(si));
    d.body.style.overflow = si ? 'hidden' : '';
    if (si) { bCer.focus(); } else { bInd.focus(); }
  }
  if (indice) {
    bInd.addEventListener('click', function () { abrir(true); });
    bCer.addEventListener('click', function () { abrir(false); });
    $$('a', indice).forEach(function (a) { a.addEventListener('click', function () { indice.classList.remove('abierto'); bInd.setAttribute('aria-expanded', 'false'); d.body.style.overflow = ''; }); });
    indice.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a, button', indice), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    });
  }

  /* ---------- retícula y movimiento ---------- */
  var bRet = $('#btn-reticula'), bRet2 = $('#btn-reticula-2'), bMov = $('#btn-mov');
  function reticula() {
    var si = raiz.classList.toggle('ver-reticula');
    if (bRet) bRet.setAttribute('aria-pressed', String(si));
    if (bRet2) bRet2.textContent = si ? 'Ocultar retícula' : 'Ver retícula';
  }
  if (bRet) bRet.addEventListener('click', reticula);
  if (bRet2) bRet2.addEventListener('click', reticula);
  if (bMov) bMov.addEventListener('click', function () {
    var si = raiz.classList.toggle('sin-mov'); bMov.setAttribute('aria-pressed', String(si));
    avisar(si ? 'Movimiento apagado' : 'Movimiento encendido');
  });
  d.addEventListener('keydown', function (e) {
    var t = e.target, escribe = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if (e.key === 'Escape' && indice && indice.classList.contains('abierto')) abrir(false);
    if (!escribe && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'g' || e.key === 'G')) reticula();
  });

  /* ---------- copiar color ---------- */
  $$('[data-hex]').forEach(function (el) {
    el.addEventListener('click', function () {
      copiar(el.dataset.hex, 'Copiado ' + el.dataset.hex);
      el.classList.add('ok'); setTimeout(function () { el.classList.remove('ok'); }, 1200);
    });
  });

  /* ---------- matriz de contraste, calculada desde los tokens ---------- */
  (function () {
    var tabla = $('#matriz'); if (!tabla) return;
    var cs = getComputedStyle(raiz);
    var tok = function (n) { return cs.getPropertyValue(n).trim().toUpperCase(); };
    var lum = function (h) {
      var v = [1, 3, 5].map(function (i) { var c = parseInt(h.substr(i, 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
      return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
    };
    var razon = function (a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    var fondos = [['Negro', '--wr-negro'], ['Tinta', '--wr-tinta'], ['Tinta 2', '--wr-tinta-2'], ['Crema', '--wr-crema'], ['Crema 2', '--wr-crema-2'], ['Rojo', '--wr-rojo']];
    var textos = [['Blanco', '--wr-blanco'], ['Crema', '--wr-crema'], ['Negro', '--wr-negro'], ['Rojo Rock', '--wr-rojo'], ['Rojo profundo', '--wr-rojo-profundo'], ['Rojo claro', '--wr-rojo-claro'],
      ['Piedra oscura', '--wr-piedra-oscura'], ['Piedra', '--wr-piedra'], ['Carbón', '--wr-carbon'], ['Carbón claro', '--wr-carbon-claro'],
      ['Ámbar', '--wr-ambar'], ['Ámbar oscuro', '--wr-ambar-oscuro'], ['Verde', '--wr-verde'], ['Verde oscuro', '--wr-verde-oscuro']];
    var h = '<thead><tr><th scope="col">Texto / fondo</th>' + fondos.map(function (f) { return '<th scope="col"><i style="background:' + tok(f[1]) + '"></i>' + f[0] + '</th>'; }).join('') + '</tr></thead><tbody>';
    textos.forEach(function (t) {
      var ht = tok(t[1]);
      h += '<tr><th scope="row"><i style="background:' + ht + '"></i>' + t[0] + '</th>';
      fondos.forEach(function (f) {
        var hf = tok(f[1]);
        if (hf === ht) { h += '<td class="no" aria-label="mismo color">·</td>'; return; }
        var r = razon(ht, hf), c = r >= 7 ? 'aaa' : r >= 4.5 ? 'aa' : r >= 3 ? 'gr' : 'no';
        h += '<td class="' + c + '"><b>' + r.toFixed(2).replace('.', ',') + '</b></td>';
      });
      h += '</tr>';
    });
    tabla.insertAdjacentHTML('beforeend', h + '</tbody>');
  })();

  /* ---------- pestañas de tono por canal ---------- */
  (function () {
    var caja = $('#canales'); if (!caja) return;
    var tabs = $$('[role=tab]', caja);
    function elegir(t, foco) {
      tabs.forEach(function (x) {
        var si = x === t; x.setAttribute('aria-selected', String(si)); x.tabIndex = si ? 0 : -1;
        $('#' + x.getAttribute('aria-controls')).hidden = !si;
      });
      if (foco) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { elegir(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); elegir(tabs[(i + 1) % tabs.length], true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); elegir(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      });
    });
  })();

  /* ---------- probador tipográfico ---------- */
  (function () {
    var r = $('#prob-tam'), o = $('#prob-val'), caja = $('#probador'); if (!r) return;
    function poner() {
      var max = Math.max(32, Math.min(200, Math.floor(caja.clientWidth / 4.2)));
      r.max = max; if (+r.value > max) r.value = max;
      caja.style.setProperty('--tam', r.value + 'px'); o.textContent = r.value + ' px';
    }
    r.addEventListener('input', poner); window.addEventListener('resize', poner); poner();
  })();

  /* ---------- demos de duración y curva ---------- */
  function reproducir(lista) {
    lista.forEach(function (el) {
      var i = $('.via i', el); if (!i) return;
      i.style.transition = 'none'; el.classList.remove('va'); void i.offsetWidth;
      if (quieto()) { el.classList.add('va'); return; }
      i.style.transition = 'left ' + el.dataset.d + 'ms ' + el.dataset.c; el.classList.add('va');
    });
  }
  var bPlay = $('#btn-play');
  if (bPlay) bPlay.addEventListener('click', function () { reproducir($$('#duraciones .demo-mov')); });
  $$('.demo-mov').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () { reproducir([el]); });
    el.addEventListener('mouseenter', function () { reproducir([el]); });
  });
  $$('.trans-demo').forEach(function (b) {
    b.addEventListener('click', function () { b.classList.toggle('va'); });
  });

  /* ---------- copiar firma y tokens ---------- */
  var bFirma = $('#btn-firma');
  if (bFirma) bFirma.addEventListener('click', function () {
    var html = $('#firma-html').innerHTML.trim().replace(/src="assets\/logo\//g, 'src="[URL-PUBLICA-DEL-LOGO]/');
    copiar(html, 'Firma copiada. Falta la URL del logo');
  });
  var bTok = $('#btn-tokens');
  if (bTok) bTok.addEventListener('click', function () {
    fetch('descargas/we-rock-tokens.css').then(function (r) { return r.text(); }).then(function (t) { copiar(t, 'Tokens copiados'); }, function () { avisar('Descarga el archivo'); });
  });
})();
