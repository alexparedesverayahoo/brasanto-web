/* [MARCA] — comportamiento de la landing (sin dependencias) */
(function () {
  // Nav: fondo al hacer scroll
  const nav = document.querySelector('.nav');
  const onNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onNav();
  window.addEventListener('scroll', onNav, { passive: true });

  // Hero video: autoplay silencioso. Si el navegador lo bloquea, el atributo poster
  // muestra la foto y reintentamos al primer gesto del usuario (scroll, toque, tecla).
  const video = document.querySelector('.hero video');
  if (video) {
    const tryPlay = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    const retry = () => { tryPlay(); if (!video.paused) cleanup(); };
    const cleanup = () => ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach((e) => window.removeEventListener(e, retry));
    const p = video.play();
    if (p && p.catch) {
      p.catch(() => ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach((e) => window.addEventListener(e, retry, { passive: true })));
    }
  }

  // Sección "el plato se abre": el scroll controla los tres estados
  const plate = document.querySelector('.plate');
  if (plate) {
    const frames = Array.from(plate.querySelectorAll('.plate-stage img'));
    const tags = {
      papas: plate.querySelector('.tag-papas'),
      ensalada: plate.querySelector('.tag-ensalada'),
      cremas: plate.querySelector('.tag-cremas')
    };
    const bars = Array.from(plate.querySelectorAll('.plate-progress i'));

    const update = () => {
      const rect = plate.getBoundingClientRect();
      const total = plate.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total)); // 0 → 1 a lo largo de la sección

      // Estado activo: 0-0.33 cerrado, 0.33-0.66 abriéndose, 0.66-1 abierto
      const idx = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
      frames.forEach((f, i) => f.classList.toggle('is-on', i === idx));

      tags.papas.classList.toggle('is-on', p > 0.38);
      tags.ensalada.classList.toggle('is-on', p > 0.5);
      tags.cremas.classList.toggle('is-on', p > 0.7);

      bars.forEach((b, i) => {
        const local = Math.min(1, Math.max(0, (p - i / 3) * 3));
        b.style.setProperty('--p', local.toFixed(3));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // Aparición de secciones al entrar en pantalla
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
