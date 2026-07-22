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

  initHeroEntrance(gsap);
  initAboutPath(gsap);
  initWordScrub(gsap);
  initScrollAnimations(gsap);

  ScrollTrigger.refresh();
}

/* ------------------------------------------------------------------ */
/* Hero: entrance timeline on load                                     */
/* ------------------------------------------------------------------ */
function initHeroEntrance(gsap: Gsap) {
  const heading = document.querySelector('.hero-heading');
  if (!heading) return;

  const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power2.out' } });
  tl.from('.hero-giant', { scale: 1.06, opacity: 0, duration: 1.1 })
    .from('.hero-portrait', { y: 60, opacity: 0, duration: 0.9 }, '-=0.7')
    .from(
      '.hero-line',
      { yPercent: 110, opacity: 0, stagger: 0.12, duration: 0.9 },
      '-=0.5'
    )
    .from('.hero-cta > *', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.4')
    .from(
      '.hero-card',
      { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.5 },
      '-=0.3'
    )
    .from('.hero-nav', { opacity: 0, duration: 0.5 }, '-=0.3')
    .from(
      '.hero-corner, .hero-stats-mobile',
      { y: 14, opacity: 0, stagger: 0.08, duration: 0.5 },
      '-=0.3'
    );
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

    tl.to('.hero-giant', { xPercent: -55, scale: 0.35, opacity: 0, ease: 'none' }, 0)
      .to('.hero-card', { x: () => -window.innerWidth * 0.45, opacity: 0, stagger: 0.04, ease: 'none' }, 0)
      .to('.hero-nav, .hero-corner', { opacity: 0, ease: 'none' }, 0)
      .to('.hero-heading, .hero-cta', { xPercent: -40, opacity: 0, ease: 'none' }, 0.08)
      .to('.hero-portrait', { yPercent: 14, opacity: 0, ease: 'none' }, 0.12);

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
