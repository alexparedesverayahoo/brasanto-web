/* BRASANTO — comportamiento de la página.
   Sin dependencias. Todo es mejora progresiva: sin JS la página se lee completa. */
(function () {
  'use strict';

  function init() {
    var root = document.querySelector('[data-root="1"]');
    if (!root) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* style-hover → reglas CSS reales.
       El export de diseño escribe los estados hover en un atributo que el
       navegador ignora. Aquí se convierten en :hover/:focus-visible con
       !important para que ganen a los estilos en línea. */
    var hoverRules = [];
    root.querySelectorAll('[style-hover]').forEach(function (el, i) {
      var decl = (el.getAttribute('style-hover') || '')
        .split(';')
        .map(function (d) { return d.trim(); })
        .filter(Boolean)
        .map(function (d) { return d.replace(/\s*!important\s*$/i, '') + ' !important'; })
        .join('; ');
      if (!decl) return;
      var cls = 'bz-h' + i;
      el.classList.add(cls);
      hoverRules.push('@media (hover:hover) { .' + cls + ':hover { ' + decl + '; } } .' + cls + ':focus-visible { ' + decl + '; }');
    });
    if (hoverRules.length) {
      var sheet = document.createElement('style');
      sheet.textContent = hoverRules.join('\n');
      document.head.appendChild(sheet);
    }

    /* Brasas sobre el hero */
    var box = root.querySelector('[data-embers="1"]');
    if (box && !reduce) {
      for (var i = 0; i < 54; i++) {
        var e = document.createElement('span');
        var size = 2 + Math.random() * 3;
        e.style.cssText =
          'position:absolute;border-radius:50%;background:#FFB24D;box-shadow:0 0 8px rgba(255,140,60,.9);' +
          'width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;' +
          'left:' + (Math.random() * 100).toFixed(2) + '%;bottom:-12px;opacity:0;' +
          'animation:bz-ember ' + (4.5 + Math.random() * 5).toFixed(1) + 's linear ' +
          (Math.random() * 7).toFixed(1) + 's infinite';
        box.appendChild(e);
      }
    }

    /* Aparición al entrar en viewport.
       Al terminar, se devuelve la transición original del elemento
       (las tarjetas la necesitan para su hover). */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.opacity = '1';
        el.style.transform = 'none';
        io.unobserve(el);
        var done = false;
        var restore = function (ev) {
          if (ev && ev.target !== el) return;
          if (done) return;
          done = true;
          el.removeEventListener('transitionend', restore);
          el.style.transition = el.__bzTransition || '';
        };
        el.addEventListener('transitionend', restore);
        setTimeout(restore, 1500);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    root.querySelectorAll('[data-reveal="1"]').forEach(function (el, i) {
      var d = ((i % 3) * 0.09).toFixed(2);
      el.__bzTransition = el.style.transition;
      el.style.opacity = '0';
      el.style.transform = 'translateY(34px)';
      el.style.transition =
        'opacity .95s cubic-bezier(.2,.7,.2,1) ' + d + 's, transform .95s cubic-bezier(.2,.7,.2,1) ' + d + 's';
      io.observe(el);
    });

    /* Zoom de la foto al pasar el cursor por la tarjeta */
    root.querySelectorAll('[data-card="1"]').forEach(function (card) {
      var img = card.querySelector('img');
      if (!img) return;
      card.addEventListener('mouseenter', function () { img.style.transform = 'scale(1.06)'; });
      card.addEventListener('mouseleave', function () { img.style.transform = 'none'; });
    });

    /* Menú móvil */
    var nav = root.querySelector('[data-nav="1"]');
    var burger = root.querySelector('[data-burger="1"]');
    var navLinks = root.querySelector('[data-navlinks="1"]');
    var raf = 0;
    var paint; /* se define abajo; setMenu la necesita para pintar el fondo del nav */

    var menuOpen = function () { return !!(nav && nav.hasAttribute('data-nav-open')); };
    var setMenu = function (open) {
      if (!nav || !burger) return;
      if (open) nav.setAttribute('data-nav-open', '1'); else nav.removeAttribute('data-nav-open');
      if (!open && navLinks && navLinks.contains(document.activeElement)) burger.focus();
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar el menú' : 'Abrir el menú');
      var o = burger.querySelector('[data-burger-open="1"]');
      var c = burger.querySelector('[data-burger-close="1"]');
      if (o) o.style.display = open ? 'none' : '';
      if (c) c.style.display = open ? '' : 'none';
      if (paint) paint();
    };
    if (burger) {
      burger.addEventListener('click', function () { setMenu(!menuOpen()); });
      if (navLinks) {
        navLinks.addEventListener('click', function (ev) {
          if (ev.target && ev.target.closest && ev.target.closest('a')) setMenu(false);
        });
      }
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && menuOpen()) setMenu(false); });
      window.addEventListener('resize', function () { if (window.innerWidth >= 860 && menuOpen()) setMenu(false); });
      document.addEventListener('click', function (ev) { if (menuOpen() && !nav.contains(ev.target)) setMenu(false); });
      window.addEventListener('scroll', function () { if (menuOpen()) setMenu(false); }, { passive: true });
    }

    /* Scroll: barra de progreso, estado del nav, CTA flotante */
    var bar = root.querySelector('[data-progress="1"]');
    var float = root.querySelector('[data-float="1"]');

    paint = function () {
      raf = 0;
      var y = window.scrollY || 0;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = 'scaleX(' + (y / max).toFixed(4) + ')';

      if (nav) {
        var on = y > 40 || menuOpen();
        nav.style.height = on ? '76px' : '96px';
        nav.style.background = on ? 'rgba(20,16,14,.82)' : 'transparent';
        nav.style.backdropFilter = on ? 'blur(14px)' : 'none';
        nav.style.borderBottomColor = on ? 'rgba(244,237,226,.09)' : 'transparent';
      }

      if (float) {
        var vis = y > window.innerHeight * 0.85;
        float.style.opacity = vis ? '1' : '0';
        float.style.transform = vis ? 'none' : 'translateY(14px)';
        float.style.pointerEvents = vis ? 'auto' : 'none';
        float.style.visibility = vis ? 'visible' : 'hidden';
        float.setAttribute('aria-hidden', vis ? 'false' : 'true');
      }
    };
    var onScroll = function () { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();

    /* El video del plato: en loop, silencioso, solo mientras está en pantalla.
       La fuente se elige según pantalla y soporte: clip ligero en móvil,
       webm donde se pueda, mp4 en el resto. Con reduced-motion queda el póster. */
    root.querySelectorAll('[data-plate-video="1"]').forEach(function (el) {
      if (el.__bzWired) return;
      el.__bzWired = true;

      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;
      el.loop = true;
      el.setAttribute('muted', '');
      el.setAttribute('playsinline', '');
      if (reduce) return;

      var mobile = el.getAttribute('data-src-mobile');
      var webm = el.getAttribute('data-src-webm');
      var mp4 = el.getAttribute('data-src-mp4');
      var webmOk = !!(webm && el.canPlayType && el.canPlayType('video/webm; codecs="vp9"') === 'probably');
      var src = (window.innerWidth < 720 && mobile) || (webmOk ? webm : mp4);
      if (src && el.getAttribute('src') !== src) {
        el.src = src;
        el.load();
      }

      var visible = false;
      var play = function () {
        if (!visible) return;
        var q = el.play();
        if (q && q.catch) q.catch(function () {});
      };

      /* Los listeners de desbloqueo solo existen para sortear el autoplay
         bloqueado. En cuanto arranca de verdad, se retiran. */
      var unlockEvents = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'];
      var releaseUnlock = function () {
        unlockEvents.forEach(function (ev) { window.removeEventListener(ev, play); });
      };
      el.addEventListener('playing', releaseUnlock);
      /* Si la fuente elegida falla (códec no soportado), se cae al mp4. */
      el.addEventListener('error', function () {
        if (mp4 && el.getAttribute('src') !== mp4) { el.src = mp4; el.load(); play(); }
      });
      el.addEventListener('canplay', play);
      unlockEvents.forEach(function (ev) {
        window.addEventListener(ev, play, { passive: true });
      });

      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          visible = en.isIntersecting;
          if (visible) play();
          else if (!el.paused) el.pause();
        });
      }, { threshold: 0.05 }).observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
