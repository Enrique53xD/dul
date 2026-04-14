// animations.js — toda la lógica GSAP

document.addEventListener("DOMContentLoaded", () => {
  // Respeta prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.defaults({ ease: "power2.out" });

  // ============================================================
  // S1: HERO — palabras una por una
  // ============================================================
  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl
    .fromTo(
      ".hero__date .word",
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95, stagger: 0.14 },
    )
    .fromTo(
      ".hero__subtitle",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.85 },
      "-=0.25",
    );

  // ============================================================
  // S2: TEXTO con ScrollTrigger — párrafo a párrafo
  // ============================================================
  gsap.utils.toArray(".s2__p").forEach((p) => {
    gsap.fromTo(
      p,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        scrollTrigger: {
          trigger: p,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // S2: fotos en stagger
  gsap.from(".s2__photo", {
    opacity: 0,
    y: 45,
    duration: 1.1,
    stagger: 0.18,
    scrollTrigger: {
      trigger: ".s2__photos",
      start: "top 80%",
    },
  });

  // ============================================================
  // S3: TIMELINE — línea + items alternados
  // ============================================================
  gsap.to(".timeline__line", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 70%",
      end: "bottom 55%",
      scrub: true,
    },
  });

  gsap.utils.toArray(".timeline__item").forEach((item) => {
    const fromRight = item.classList.contains("timeline__item--right");
    gsap.fromTo(
      item,
      { opacity: 0, x: fromRight ? -48 : 48 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 83%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // ============================================================
  // S4: PARALLAX fondo + contenido
  // ============================================================
  gsap.to(".s4__parallax-img", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: "#s4",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".s4__p").forEach((p, i) => {
    gsap.fromTo(
      p,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: p,
          start: "top 84%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  gsap.utils.toArray(".s4__inline-photo").forEach((photo) => {
    gsap.fromTo(
      photo,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        scrollTrigger: {
          trigger: photo,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // S4: fullbleed parallax interno
  gsap.to(".s4__fullbleed img", {
    yPercent: -14,
    ease: "none",
    scrollTrigger: {
      trigger: ".s4__fullbleed",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // ============================================================
  // S5: ETAPAS — pin + highlight progresivo
  // ============================================================
  const s5Words = gsap.utils.toArray(".s5__word");
  const s5Photos = gsap.utils.toArray(".s5__photo-stage");

  // Estado inicial: sólo la primera activa
  s5Words[0]?.classList.add("active");
  gsap.set(s5Photos[0], { opacity: 1 });

  ScrollTrigger.create({
    trigger: "#s5",
    start: "top top",
    end: `+=${s5Words.length * 100}vh`,
    pin: ".s5__inner",
    scrub: 0.6,
    onUpdate(self) {
      const raw = self.progress * s5Words.length;
      const index = Math.min(Math.floor(raw), s5Words.length - 1);

      s5Words.forEach((w, i) => {
        w.classList.toggle("active", i <= index);
      });

      s5Photos.forEach((ph, i) => {
        const target = i === index ? 1 : 0;
        // Solo actualiza si hay cambio real para evitar llamadas innecesarias
        const current = parseFloat(gsap.getProperty(ph, "opacity"));
        if (Math.abs(current - target) > 0.05) {
          gsap.to(ph, {
            opacity: target,
            y: target ? 0 : 12,
            duration: 0.35,
            overwrite: "auto",
          });
        }
      });
    },
  });

  // ============================================================
  // S6: CANCIONES — clip-path reveal + fade ins
  // ============================================================
  gsap.utils.toArray(".s6__title").forEach((el, i) => {
    gsap.to(el, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.3,
      ease: "power3.out",
      delay: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  gsap.utils.toArray(".s6__artist").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.9,
      delay: 0.6,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });
  });

  gsap.fromTo(
    ".s6__body",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".s6__body",
        start: "top 86%",
        toggleActions: "play none none none",
      },
    },
  );

  // ============================================================
  // S7: PROMESAS — escala + rotación sutil
  // ============================================================
  gsap.utils.toArray(".s7__item").forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, scale: 0.88, rotation: -0.8 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.1,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  gsap.fromTo(
    ".s7__closing",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.1,
      scrollTrigger: {
        trigger: ".s7__closing",
        start: "top 86%",
        toggleActions: "play none none none",
      },
    },
  );

  // ============================================================
  // S8: ME ENCANTA TODO — lista en latidos + galería batch
  // ============================================================
  gsap.fromTo(
    ".s8__chip",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.09,
      ease: "back.out(1.6)",
      scrollTrigger: {
        trigger: ".s8__list",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    },
  );

  ScrollTrigger.batch(".s8__gi", {
    onEnter(els) {
      gsap.fromTo(
        els,
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.08 },
      );
    },
    start: "top 87%",
    once: true,
  });

  gsap.fromTo(
    ".s8__bottom",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.1,
      scrollTrigger: {
        trigger: ".s8__bottom",
        start: "top 86%",
        toggleActions: "play none none none",
      },
    },
  );

  // ============================================================
  // S9: KIRA — lento, respetuoso
  // ============================================================
  gsap.fromTo(
    ".s9__lead",
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".s9__lead",
        start: "top 86%",
        toggleActions: "play none none none",
      },
    },
  );

  gsap.utils.toArray(".s9__photo").forEach((photo, i) => {
    gsap.fromTo(
      photo,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: i * 0.18,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".s9__grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  gsap.fromTo(
    ".s9__body",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".s9__body",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    },
  );

  // ============================================================
  // S10: TEXTO FUTURO
  // ============================================================
  gsap.utils.toArray(".s10__future p").forEach((p) => {
    gsap.fromTo(
      p,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        scrollTrigger: {
          trigger: p,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // ============================================================
  // S10: FINALE — TE AMO MAS, cada palabra ocupa la pantalla
  // ============================================================
  const finaleTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".s10__finale-scene",
      start: "top top",
      end: "+=280%",
      pin: true,
      scrub: 0.8,
    },
  });

  finaleTl
    .fromTo("#fw-yo", { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo(
      "#fw-yo",
      { scale: 1 },
      { scale: 1.06, duration: 0.6, ease: "power1.in" },
      "+=0.6",
    )
    .to("#fw-yo", { opacity: 0, duration: 0.4 })
    .fromTo("#fw-te", { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo(
      "#fw-te",
      { scale: 1 },
      { scale: 1.06, duration: 0.6, ease: "power1.in" },
      "+=0.6",
    )
    .to("#fw-te", { opacity: 0, duration: 0.4 })
    .fromTo("#fw-amo", { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo(
      "#fw-amo",
      { scale: 1 },
      { scale: 1.06, duration: 0.6, ease: "power1.in" },
      "+=0.6",
    )
    .to("#fw-amo", { opacity: 0, duration: 0.4 })
    .fromTo("#fw-mas", { opacity: 0 }, { opacity: 1, duration: 1.2 })
    .fromTo("#fw-mas", { scale: 1 }, { scale: 1.1, duration: 0.8 }, "+=0.8");

  // Cuando "MAS" aparece, lanzar corazones y mostrar el cierre
  ScrollTrigger.create({
    trigger: ".s10__end",
    start: "top 90%",
    onEnter() {
      launchHearts();
      gsap.to(".s10__end", { opacity: 1, duration: 1.2, ease: "power1.out" });
    },
    once: true,
  });

  // ============================================================
  // CORAZONES — canvas
  // ============================================================
  function launchHearts() {
    const canvas = document.getElementById("hearts");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gsap.to(canvas, { opacity: 1, duration: 0.4 });

    const COLORS = ["#FF6B8A", "#D4A0A0", "#C8A2C8", "#FFB3C6"];
    const hearts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20 + Math.random() * 120,
      size: 10 + Math.random() * 22,
      speedY: 1.2 + Math.random() * 2.2,
      drift: (Math.random() - 0.5) * 1.4,
      opacity: 0.55 + Math.random() * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 2800,
      wobble: Math.random() * Math.PI * 2,
    }));

    function drawHeart(x, y, r, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Fórmula paramétrica de corazón
      ctx.translate(x, y);
      ctx.scale(r / 14, r / 14);
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -4, -8, -12, -14, -8);
      ctx.bezierCurveTo(-20, -4, -20, 6, 0, 16);
      ctx.bezierCurveTo(20, 6, 20, -4, 14, -8);
      ctx.bezierCurveTo(8, -12, 0, -4, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    let t0 = null;
    const TOTAL_DURATION = 6000;

    function frame(ts) {
      if (!t0) t0 = ts;
      const elapsed = ts - t0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((h) => {
        if (elapsed < h.delay) return;
        const local = elapsed - h.delay;
        if (local > TOTAL_DURATION) return;

        const progress = local / TOTAL_DURATION;
        const yCurrent = h.y - h.speedY * local * 0.065;
        const xCurrent =
          h.x + Math.sin(local * 0.002 + h.wobble) * 22 * h.drift;
        const fade = h.opacity * (1 - Math.max(0, (progress - 0.65) / 0.35));

        drawHeart(xCurrent, yCurrent, h.size, h.color, fade);
      });

      if (elapsed < TOTAL_DURATION + 3000) {
        requestAnimationFrame(frame);
      } else {
        gsap.to(canvas, { opacity: 0, duration: 0.8 });
      }
    }

    requestAnimationFrame(frame);
  }

  // ============================================================
  // RESIZE
  // ============================================================
  window.addEventListener("resize", () => {
    const c = document.getElementById("hearts");
    if (c) {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    ScrollTrigger.refresh();
  });

  // ============================================================
  // RECALCULAR posiciones cuando TODAS las imágenes carguen.
  // Crítico en móvil: las imágenes tienen alto variable y
  // desplazan los triggers de ScrollTrigger si cargan tarde.
  // ============================================================
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
