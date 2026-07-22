type Gsap = typeof import('gsap').default;

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

  // Pins first so later triggers compute positions against final layout.
  initHeroPin(gsap);
  initWorkScroll(gsap);
  initAboutPath(gsap);
  initWordScrub(gsap);
  initScrollAnimations(gsap);

  // Refresh recomputes every trigger; run it BEFORE the hero entrance so
  // the entrance (set()+to()) owns the hero's initial render and nothing
  // resets it afterward.
  ScrollTrigger.refresh();
  initHeroEntrance(gsap);
}

/* ------------------------------------------------------------------ */
/* Hero: entrance timeline on load                                     */
/* ------------------------------------------------------------------ */
function initHeroEntrance(gsap: Gsap) {
  const heading = document.querySelector('.hero-heading');
  if (!heading) return;

  // Use set() + to() (not from()) so ScrollTrigger.refresh() — which the
  // pins trigger — can't re-apply a "from" start state and leave the hero
  // elements stuck invisible.
  gsap.set('.hero-giant', { opacity: 0, scale: 1.06 });
  gsap.set('.hero-portrait', { opacity: 0, y: 60 });
  gsap.set('.hero-line', { yPercent: 110, opacity: 0 });
  gsap.set('.hero-cta > *', { opacity: 0, y: 16 });
  gsap.set('.hero-card', { opacity: 0, scale: 0.9 });
  gsap.set('.hero-nav-left', { opacity: 0, x: -30 });
  gsap.set('.hero-nav-right', { opacity: 0, x: 30 });
  gsap.set('.hero-corner-left', { opacity: 0, x: -20 });
  gsap.set('.hero-corner-right', { opacity: 0, x: 20 });
  gsap.set('.hero-stats-mobile', { opacity: 0, y: 14 });

  const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power2.out' } });
  tl.to('.hero-giant', { opacity: 1, scale: 1, duration: 1.1 })
    .to('.hero-portrait', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
    .to('.hero-line', { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9 }, '-=0.5')
    .to('.hero-nav-left, .hero-nav-right', { opacity: 1, x: 0, duration: 0.6 }, '-=0.6')
    .to('.hero-cta > *', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, '-=0.4')
    .to('.hero-card', { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5 }, '-=0.3')
    .to('.hero-corner-left, .hero-corner-right, .hero-stats-mobile', { opacity: 1, x: 0, y: 0, stagger: 0.08, duration: 0.5 }, '-=0.3');
}

/* ------------------------------------------------------------------ */
/* Hero: pinned scrub — elements slide left "into" the sidebar         */
/* ------------------------------------------------------------------ */
function initHeroPin(gsap: Gsap) {
  const hero = document.getElementById('hero');
  const sidebar = document.querySelector<HTMLElement>('.site-sidebar');
  if (!hero) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    // fromTo + immediateRender:false → clean reverse on scroll-up.
    // Direction of every hero element is chosen to LAND at its sidebar
    // counterpart position, so cross-fading with the sidebar feels like
    // the same element continuing its journey.
    const opts = { ease: 'none', immediateRender: false };
    const vw = () => window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=110%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // GIAT giant word → shrinks toward top-left where sidebar's GIATTECH
    // badge lives (transform-origin left-top so the shrink converges there).
    tl.fromTo('.hero-giant',
      { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, transformOrigin: 'left top' },
      { xPercent: -120, yPercent: -35, scale: 0.06, opacity: 0.9, ...opts }, 0);

    // Portrait fades and sinks (no counterpart in sidebar — exits cleanly).
    tl.fromTo('.hero-portrait',
      { yPercent: 0, opacity: 1 },
      { yPercent: 25, opacity: 0, ...opts }, 0);

    // Left-side floating stat cards (80+ / 3+ Years) travel toward
    // sidebar's stats-card slot at the top-left.
    tl.fromTo('.hero-card',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.18, y: -140, scale: 0.55, opacity: 0.75, stagger: 0.04, ...opts }, 0);

    // Nav links converge toward the left column (they'll become the menu
    // card in the sidebar). Left group nudges inward, right group crosses
    // over from the right side.
    tl.fromTo('.hero-nav-left',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: -60, y: -40, scale: 0.85, opacity: 0, ...opts }, 0);
    tl.fromTo('.hero-nav-right',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.55, y: -40, scale: 0.85, opacity: 0, ...opts }, 0);

    // Headline exits to the right (out of frame — sidebar has no headline).
    tl.fromTo('.hero-heading',
      { xPercent: 0, opacity: 1 },
      { xPercent: 25, opacity: 0, ...opts }, 0.05);

    // CTAs collapse toward the sidebar's Book-a-Call button (bottom-left).
    tl.fromTo('.hero-cta',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.4, y: 220, scale: 0.65, opacity: 0.6, ...opts }, 0.05);

    // Corner texts drift toward the sidebar's brand-card tagline area.
    tl.fromTo('.hero-corner-left',
      { x: 0, y: 0, opacity: 1 },
      { x: -60, y: -120, scale: 0.85, opacity: 0, ...opts }, 0);
    tl.fromTo('.hero-corner-right',
      { x: 0, y: 0, opacity: 1 },
      { x: () => -vw() * 0.45, y: -120, scale: 0.85, opacity: 0, ...opts }, 0);

    // Sidebar cross-fades in during the second half of the scrub, so it
    // appears "arriving" as hero pieces land at its silhouette.
    if (sidebar) {
      tl.fromTo(sidebar,
        { autoAlpha: 0, xPercent: -8 },
        { autoAlpha: 1, xPercent: 0, ...opts }, 0.5);
    }

    // Loading directly at a deep scroll position: reveal sidebar immediately.
    if (window.scrollY > window.innerHeight && sidebar) {
      gsap.set(sidebar, { autoAlpha: 1, xPercent: 0 });
    }

    return () => {
      if (sidebar) gsap.set(sidebar, { clearProps: 'opacity,visibility,transform' });
    };
  });
}

/* ------------------------------------------------------------------ */
/* About: connecting line draws itself as the user scrolls             */
/* ------------------------------------------------------------------ */
function initAboutPath(gsap: Gsap) {
  const svg = document.querySelector<SVGSVGElement>('.about-path');
  const path = svg?.querySelector<SVGPathElement>('path');
  if (!svg || !path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about-track',
      start: 'top 70%',
      end: 'bottom 65%',
      scrub: 1,
    },
  });

  gsap.from('.about-dot', {
    opacity: 0,
    stagger: 0.18,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about-track',
      start: 'top 60%',
      end: 'bottom 70%',
      scrub: 1,
    },
  });
}

/* ------------------------------------------------------------------ */
/* Selected Work: pinned horizontal card scroll (lg+)                  */
/* ------------------------------------------------------------------ */
function initWorkScroll(gsap: Gsap) {
  const section = document.querySelector<HTMLElement>('.work-section');
  const track = section?.querySelector<HTMLElement>('.work-track');
  if (!section || !track) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + distance(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => gsap.set(track, { x: 0 });
  });
}

/* ------------------------------------------------------------------ */
/* Word reveal: dimmed words brighten one by one on scroll             */
/* ------------------------------------------------------------------ */
function initWordScrub(gsap: Gsap) {
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    const words = el.querySelectorAll('.scrub-word');
    if (!words.length) return;

    gsap.to(words, {
      opacity: 1,
      ease: 'none',
      stagger: 0.6,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: 1,
      },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Counters: rAF + IntersectionObserver (GSAP-free)                    */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Generic reveals: [data-animate] attributes                          */
/* ------------------------------------------------------------------ */
function initScrollAnimations(gsap: Gsap) {
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
