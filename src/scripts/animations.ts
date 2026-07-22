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
  if (!hero) return;

  const showSidebar = (show: boolean) =>
    window.dispatchEvent(new CustomEvent('giat:sidebar', { detail: { show } }));

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    // fromTo with explicit start values + immediateRender:false guarantees
    // the timeline reverses cleanly — elements always return to full
    // opacity/position at scroll progress 0 (fixes disappearing on scroll-up).
    const opts = { ease: 'none', immediateRender: false };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=85%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        onLeave: () => showSidebar(true),
        onEnterBack: () => showSidebar(false),
      },
    });

    tl.fromTo('.hero-giant',
      { xPercent: 0, scale: 1, opacity: 1 },
      { xPercent: -55, scale: 0.35, opacity: 0, ...opts }, 0)
      .fromTo('.hero-card',
        { x: 0, opacity: 1 },
        { x: () => -window.innerWidth * 0.45, opacity: 0, stagger: 0.04, ...opts }, 0)
      .fromTo('.hero-nav-left',
        { x: 0, opacity: 1 },
        { x: -90, opacity: 0, ...opts }, 0)
      .fromTo('.hero-nav-right',
        { x: 0, opacity: 1 },
        { x: 90, opacity: 0, ...opts }, 0)
      .fromTo('.hero-corner-left',
        { x: 0, opacity: 1 },
        { x: -50, opacity: 0, ...opts }, 0)
      .fromTo('.hero-corner-right',
        { x: 0, opacity: 1 },
        { x: 60, opacity: 0, ...opts }, 0)
      .fromTo('.hero-heading, .hero-cta',
        { xPercent: 0, opacity: 1 },
        { xPercent: -40, opacity: 0, ...opts }, 0.08)
      .fromTo('.hero-portrait',
        { yPercent: 0, opacity: 1 },
        { yPercent: 14, opacity: 0, ...opts }, 0.12);

    // Handle loading the page already scrolled past the hero
    if (window.scrollY > window.innerHeight) showSidebar(true);

    return () => showSidebar(false);
  });

  // No pin below lg — sidebar is hidden there anyway; show it for
  // tablet users who rotate later by falling back on hero height.
  mm.add('(max-width: 1023.98px)', () => {
    showSidebar(false);
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
