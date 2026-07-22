async function boot() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Counters use plain rAF + IntersectionObserver so they always run,
  // even with reduced-motion (they just snap instantly there).
  initCounters(prefersReducedMotion);

  if (prefersReducedMotion) return;

  const { default: gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  initHeroTimeline(gsap);
  initScrollAnimations(gsap);
}

function initHeroTimeline(gsap: typeof import('gsap').default) {
  const heading = document.querySelector('.hero-heading');
  if (!heading) return;

  const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power2.out' } });
  tl.from('.hero-eyebrow', { y: 12, opacity: 0, duration: 0.5 })
    .from(
      '.hero-line',
      { yPercent: 110, opacity: 0, stagger: 0.12, duration: 0.9 },
      '-=0.25'
    )
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-cta > *', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3')
    .from(
      '.hero-tags > li',
      { scale: 0.85, opacity: 0, stagger: 0.04, duration: 0.4 },
      '-=0.25'
    )
    .from(
      '.hero-stats > *',
      { y: 24, opacity: 0, stagger: 0.12, duration: 0.6 },
      '-=0.4'
    );
}

function initCounters(reduced: boolean) {
  const nodes = document.querySelectorAll<HTMLElement>('[data-counter]');
  const duration = 1800;

  const tween = (el: HTMLElement, target: number) => {
    if (reduced) {
      el.textContent = target.toString();
      return;
    }
    const startTime = performance.now();
    el.textContent = '0';
    const step = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 2);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.target ?? el.textContent ?? '0');
        if (Number.isFinite(target) && target > 0) tween(el, target);
        observer.unobserve(el);
      }
    },
    { threshold: 0.4 }
  );

  nodes.forEach((el) => observer.observe(el));
}

function initScrollAnimations(gsap: typeof import('gsap').default) {
  const start = 'top 85%';
  const defaults = { duration: 0.8, ease: 'power2.out' };

  document.querySelectorAll<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      ...defaults,
      y: 40,
      opacity: 0,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-animate="fade-in"]').forEach((el) => {
    gsap.from(el, {
      ...defaults,
      duration: 0.6,
      opacity: 0,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-animate="stagger"]').forEach((el) => {
    gsap.from(el.children, {
      ...defaults,
      y: 30,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-animate="scale-in"]').forEach((el) => {
    gsap.from(el, {
      duration: 0.6,
      ease: 'power2.out',
      opacity: 0,
      scale: 0.95,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });
}

if (document.readyState === 'complete') {
  void boot();
} else {
  window.addEventListener('load', () => void boot(), { once: true });
}

export {};
