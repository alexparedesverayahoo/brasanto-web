/* BRASANTO — comportamiento de la página.
   Recuperado del componente de Claude Design y adaptado a JS estándar. */
(function () {
  'use strict';

  function init() {
    var root = document.querySelector('[data-root="1"]');
    if (!root) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    /* Aparición al entrar en viewport */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.style.opacity = '1';
        en.target.style.transform = 'none';
        io.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    root.querySelectorAll('[data-reveal="1"]').forEach(function (el, i) {
      var d = ((i % 3) * 0.09).toFixed(2);
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

    /* Scroll: barra de progreso, nav, secuencia del plato, CTA flotante */
    var nav = root.querySelector('[data-nav="1"]');
    var bar = root.querySelector('[data-progress="1"]');
    var float = root.querySelector('[data-float="1"]');
    var plate = root.querySelector('[data-plate="1"]');
    var frames = plate ? Array.prototype.slice.call(plate.querySelectorAll('[data-frame]')) : [];
    var tags = plate ? Array.prototype.slice.call(plate.querySelectorAll('[data-tag]')) : [];
    var bars = plate ? Array.prototype.slice.call(plate.querySelectorAll('[data-bar]')) : [];
    var thresholds = [0.40, 0.55, 0.72];

    /* El menú se colapsa en pantallas angostas */
    var navLinks = root.querySelector('[data-navlinks="1"]');
    var fitNav = function () {
      if (navLinks) navLinks.style.display = window.innerWidth < 860 ? 'none' : 'flex';
    };
    fitNav();
    window.addEventListener('resize', fitNav);

    var raf = 0;
    var paint = function () {
      raf = 0;
      var y = window.scrollY || 0;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = 'scaleX(' + (y / max).toFixed(4) + ')';

      if (nav) {
        var on = y > 40;
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
      }

      if (plate && frames.length) {
        var rect = plate.getBoundingClientRect();
        var span = plate.offsetHeight - window.innerHeight;
        var p = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));
        var idx = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
        frames.forEach(function (f, i) { f.style.opacity = i === idx ? '1' : '0'; });

        tags.forEach(function (t, i) {
          var on2 = p > thresholds[i];
          var base = i === 2 ? 'translate(-50%,' : 'translateY(';
          t.style.opacity = on2 ? '1' : '0';
          t.style.transform = on2 ? (i === 2 ? 'translate(-50%,0)' : 'none') : base + '18px)';
        });
        bars.forEach(function (b, i) {
          var local = Math.min(1, Math.max(0, (p - i / 3) * 3));
          b.style.transform = 'scaleX(' + local.toFixed(3) + ')';
        });
      }
    };
    var onScroll = function () { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();

    /* El video del plato: autoplay silencioso, tolerante a políticas del navegador */
    root.querySelectorAll('[data-plate-video="1"]').forEach(function (el) {
      if (el.__bzWired) return;
      el.__bzWired = true;
      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;
      el.loop = true;
      el.autoplay = true;
      el.setAttribute('muted', '');
      el.setAttribute('playsinline', '');
      var play = function () { var q = el.play(); if (q && q.catch) q.catch(function () {}); };
      el.addEventListener('canplay', play);
      el.addEventListener('playing', function () { el.style.opacity = '1'; });
      play();
      ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach(function (ev) {
        window.addEventListener(ev, play, { passive: true });
      });
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) play(); else el.pause(); });
      }, { threshold: 0.05 }).observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
