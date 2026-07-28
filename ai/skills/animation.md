# Skill: Animation — GSAP + ScrollTrigger

## Setup

GSAP and ScrollTrigger are loaded in `src/scripts/animations.ts`.
Import and register:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

## Animation System — Declarative with data-animate

All animations are applied via HTML attributes, initialized on DOM load.

### Available Animations

**1. Fade Up** — `data-animate="fade-up"`
```
Initial: opacity 0, y 40px
Final: opacity 1, y 0
Duration: 0.8s, ease: power2.out
Trigger: top 85%
```

**2. Fade In** — `data-animate="fade-in"`
```
Initial: opacity 0
Final: opacity 1
Duration: 0.6s
Trigger: top 85%
```

**3. Stagger Children** — `data-animate="stagger"`
```
Animates direct children of the element
Each child: fade-up with 0.15s stagger
Trigger: parent enters viewport
```

**4. Text Reveal** — `data-animate="text-reveal"`
```
Split heading text by lines (using SplitText or manual span wrapping)
Each line clips from below: clipPath inset(100% 0 0 0) -> inset(0)
Stagger: 0.1s per line
```

**5. Counter** — `data-animate="counter"`
```
Requires: data-target="80" (target number)
Animates from 0 to target
Duration: 2s
Trigger: element visible
Uses gsap.to with snap rounding
```

**6. Scale In** — `data-animate="scale-in"`
```
Initial: opacity 0, scale 0.95
Final: opacity 1, scale 1
Duration: 0.6s
```

### Hero Special Animation
Hero doesn't use data-animate — it has a custom timeline:
```typescript
const heroTL = gsap.timeline({ delay: 0.3 });
heroTL
  .from('.hero-heading span', { y: 100, opacity: 0, stagger: 0.1, duration: 0.8 })
  .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.hero-stats', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
  .from('.hero-cta', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.2')
  .from('.hero-tags span', { scale: 0, opacity: 0, stagger: 0.05, duration: 0.4 }, '-=0.3');
```

### Reduced Motion
ALWAYS wrap all GSAP code:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // all GSAP animations here
}
```

If reduced motion is preferred:
- Set all animated elements to their final state immediately
- No transitions, no scroll effects

### Performance Rules
- Use `will-change: transform` sparingly — only on actively animating elements
- Kill ScrollTriggers on route change (if ever multi-page)
- Batch animations where possible: `ScrollTrigger.batch()`
- Don't animate `width`, `height`, `top`, `left` — only `transform` and `opacity`
- Use `gsap.set()` for initial states, not CSS (prevents flash of unstyled content)
