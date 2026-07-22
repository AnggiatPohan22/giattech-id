import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

/**
 * Hero: single hand-authored entrance timeline.
 * All later section animations live inside initScrollAnimations below.
 */
function initHeroTimeline() {
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

/**
 * Counter tween: any element with [data-counter][data-target="N"] tweens
 * from 0 to N when scrolled into view.
 */
function initCounters() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-counter]');
  nodes.forEach((el) => {
    const target = Number(el.dataset.target ?? el.textContent ?? '0');
    if (!Number.isFinite(target) || target <= 0) return;

    const obj = { value: 0 };
    el.textContent = '0';

    gsap.to(obj, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString();
      },
    });
  });
}

/**
 * Scroll-triggered reveal system: elements with [data-animate="..."] fade in
 * as they enter the viewport. Section components opt in via the attribute.
 */
function initScrollAnimations() {
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

function boot() {
  if (prefersReducedMotion) return;
  initHeroTimeline();
  initCounters();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
