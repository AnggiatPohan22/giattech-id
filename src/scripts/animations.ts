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

  // If the user reloaded while already scrolled past the hero (browsers
  // preserve scroll position on reload), the hero pin scrub owns these
  // elements and has driven them to their end-state (opacity 0, off
  // viewport). Running the entrance here would set them back to opacity 0
  // then animate them to opacity 1 — with scrub:0.6 smoothing, the scrub
  // can't always catch up in time, so hero-traits / hero-corner-right /
  // stat cards end up stuck visible over the About/Projects sections.
  // Skip the entrance entirely in that case — the initHeroPin deep-scroll
  // fast-path handles final positioning.
  if (window.scrollY > window.innerHeight * 0.5) return;

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
    // No pin: the page scrolls naturally. Hero morph elements are
    // position: fixed (via lg:fixed in the markup) so they stay in view
    // while the user scrolls past hero. GSAP scrubs their transforms
    // over the scroll range from the top of hero to just past its
    // bottom — that's the moment About's title arrives at reading
    // position, and the sidebar is meant to be fully assembled.
    const opts = { ease: 'none', immediateRender: false };
    const vw = () => window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top+=120', // ends ~120px into About (where the section header sits)
        scrub: 0.6,
      },
    });

    // All hero elements end at opacity 0 by the time the scrub is done —
    // any residual visibility past the end reads as a stuck ghost.
    // Direction of travel converges on the sidebar counterpart to sell
    // the "morphed into the sidebar" reading.

    // GIAT giant word → shrinks toward the sidebar's GIATTECH badge.
    tl.fromTo('.hero-giant',
      { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, transformOrigin: 'left top' },
      { xPercent: -120, yPercent: -35, scale: 0.06, opacity: 0, ...opts }, 0);

    // Portrait sinks and fades (no sidebar counterpart).
    tl.fromTo('.hero-portrait',
      { yPercent: 0, opacity: 1 },
      { yPercent: 25, opacity: 0, ...opts }, 0);

    // 80+ Projects & 3+ Years cards travel far up-left onto the sidebar's
    // stats-card slot then fade — they don't get stranded mid-viewport.
    tl.fromTo('.hero-stat-1, .hero-stat-2',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.14, y: -260, scale: 0.4, opacity: 0, stagger: 0.05, ...opts }, 0);

    // Traits card (right side): no sidebar counterpart — fade in place
    // with a small drift so it doesn't fly across the viewport.
    tl.fromTo('.hero-traits',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: 40, y: -60, scale: 0.85, opacity: 0, ...opts }, 0);

    // Nav-left nudges toward the sidebar column, nav-right flies across.
    tl.fromTo('.hero-nav-left',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: -60, y: -40, scale: 0.85, opacity: 0, ...opts }, 0);
    tl.fromTo('.hero-nav-right',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.6, y: -40, scale: 0.85, opacity: 0, ...opts }, 0);

    // Headline exits to the right.
    tl.fromTo('.hero-heading',
      { xPercent: 0, opacity: 1 },
      { xPercent: 25, opacity: 0, ...opts }, 0.05);

    // CTAs collapse toward the sidebar Book-a-Call button (bottom-left).
    tl.fromTo('.hero-cta',
      { x: 0, y: 0, scale: 1, opacity: 1 },
      { x: () => -vw() * 0.4, y: 220, scale: 0.65, opacity: 0, ...opts }, 0.05);

    // Corner texts fold toward the sidebar tagline area.
    tl.fromTo('.hero-corner-left',
      { x: 0, y: 0, opacity: 1 },
      { x: -60, y: -120, scale: 0.85, opacity: 0, ...opts }, 0);
    tl.fromTo('.hero-corner-right',
      { x: 0, y: 0, opacity: 1 },
      { x: () => -vw() * 0.45, y: -120, scale: 0.85, opacity: 0, ...opts }, 0);

    // Sidebar: container reveals early, then each card cascades in as if
    // it's "receiving" the hero element traveling toward it. Ordering
    // roughly mirrors the visual flow of hero pieces converging left.
    if (sidebar) {
      const cards = Array.from(sidebar.children) as HTMLElement[];
      gsap.set(sidebar, { autoAlpha: 0 });
      gsap.set(cards, { opacity: 0, x: -14, scale: 0.94 });

      tl.to(sidebar, { autoAlpha: 1, ...opts, duration: 0.08 }, 0.22);

      cards.forEach((card, i) => {
        tl.to(card,
          { opacity: 1, x: 0, scale: 1, ...opts, duration: 0.12 },
          0.3 + i * 0.05
        );
      });
    }

    // Loading directly at a deep scroll position: force the hero morph
    // elements to their END state immediately AND reveal the sidebar.
    // Without this, the scrub (immediateRender:false + scrub:0.6) lags on
    // first paint and hero-fixed elements (traits card, corner texts,
    // stat cards) appear stuck visible over the section behind them
    // until the next scroll event nudges the scrub to catch up.
    if (window.scrollY > window.innerHeight * 0.5) {
      gsap.set('.hero-giant', {
        xPercent: -120, yPercent: -35, scale: 0.06, opacity: 0,
        transformOrigin: 'left top',
      });
      gsap.set('.hero-portrait', { yPercent: 25, opacity: 0 });
      gsap.set('.hero-stat-1, .hero-stat-2', {
        x: () => -vw() * 0.14, y: -260, scale: 0.4, opacity: 0,
      });
      gsap.set('.hero-traits', { x: 40, y: -60, scale: 0.85, opacity: 0 });
      gsap.set('.hero-nav-left', { x: -60, y: -40, scale: 0.85, opacity: 0 });
      gsap.set('.hero-nav-right', {
        x: () => -vw() * 0.6, y: -40, scale: 0.85, opacity: 0,
      });
      gsap.set('.hero-heading', { xPercent: 25, opacity: 0 });
      gsap.set('.hero-cta', {
        x: () => -vw() * 0.4, y: 220, scale: 0.65, opacity: 0,
      });
      gsap.set('.hero-corner-left', {
        x: -60, y: -120, scale: 0.85, opacity: 0,
      });
      gsap.set('.hero-corner-right', {
        x: () => -vw() * 0.45, y: -120, scale: 0.85, opacity: 0,
      });

      if (sidebar) {
        gsap.set(sidebar, { autoAlpha: 1 });
        const cards = Array.from(sidebar.children) as HTMLElement[];
        gsap.set(cards, { opacity: 1, x: 0, scale: 1 });
      }
    }

    return () => {
      if (sidebar) {
        gsap.set(sidebar, { clearProps: 'opacity,visibility,transform' });
        const cards = Array.from(sidebar.children) as HTMLElement[];
        gsap.set(cards, { clearProps: 'opacity,transform' });
      }
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
