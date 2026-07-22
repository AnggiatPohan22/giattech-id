# CLAUDE.md — Claude Code Instructions for Giattech Website

## Read First
1. Read `AGENTS.md` for project rules and design direction
2. Read the relevant skill file(s) from `ai/skills/` based on current task
3. Never read all skill files at once

---

## Project Commands

```bash
# Development
npm run dev              # Start dev server (localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build

# Check
npx astro check          # TypeScript check
npx tsc --noEmit         # Strict type check
```

When starting the dev server in an automated session, prefer background mode:

```
astro dev --background
```

Manage with `astro dev stop`, `astro dev status`, and `astro dev logs`.

---

## Task Checklist

Work through these in order. Check off as completed.
Each task = one focused session. Don't combine tasks.

### Phase 1 — Foundation
- [x] **T01** — Initialize Astro project with all dependencies
- [x] **T02** — Create `src/styles/global.css` with all design tokens (colors, typography, spacing)
- [x] **T03** — Create `src/layouts/Layout.astro` (HTML shell, font imports, meta tags, global CSS)
- [x] **T04** — Create all data files in `src/data/` (navigation, services, testimonials, faq, pricing)
- [x] **T05** — Create `src/components/ui/Button.astro` (primary, outline, ghost variants)
- [x] **T06** — Create `src/components/ui/SectionHeader.astro` (eyebrow + heading + optional subtitle)

### Phase 2 — Layout & Navigation
- [x] **T07** — Create `Navbar.astro` (fixed, transparent→solid scroll, mobile hamburger)
- [x] **T08** — Create sidebar section navigation (desktop only, dot indicators)
- [x] **T09** — Create `Footer.astro`

### Phase 3 — Hero & About
- [x] **T10** — Create `Hero.astro` (headline, sub, stats, CTAs, tags)
- [x] **T11** — Create `About.astro` with timeline format (year cards, expandable details)
- [x] **T12** — Add GSAP entrance animation to Hero

### Phase 4 — Service & Project Sections
- [x] **T13** — Create `ServiceCard.astro` component
- [x] **T14** — Create `Services.astro` section
- [x] **T15** — Set up Astro content collection for projects (`src/content/projects/`)
- [x] **T16** — Create `ProjectCard.astro` component
- [x] **T17** — Create `Projects.astro` section

### Phase 5 — Pricing, Testimonials, FAQ, CTA
- [ ] **T18** — Create `PricingCard.astro` component
- [ ] **T19** — Create `Pricing.astro` section (3-column cards)
- [ ] **T20** — Create `TestimonialCard.astro` component
- [ ] **T21** — Create `Testimonials.astro` section (carousel with Alpine.js)
- [ ] **T22** — Create `FAQ.astro` section (accordion with Alpine.js)
- [ ] **T23** — Create `CTA.astro` section

### Phase 6 — Animations & Polish
- [ ] **T24** — Create `src/scripts/animations.ts` (GSAP ScrollTrigger system)
- [ ] **T25** — Wire data-animate attributes to all sections
- [ ] **T26** — Add prefers-reduced-motion support
- [ ] **T27** — Responsive testing: fix all breakpoints (375, 768, 1024, 1440)
- [ ] **T28** — Performance: lazy load images, preload fonts, optimize assets
- [ ] **T29** — SEO: meta tags, Open Graph, structured data, sitemap
- [ ] **T30** — Assemble all sections in `src/pages/index.astro`
- [ ] **T31** — Final Lighthouse audit → iterate until 95+ all metrics

---

## Coding Standards for This Project

### Astro Components
- Props interface at top of every component with TypeScript
- Use `Astro.props` destructuring
- Default values for optional props
- Slots for flexible content injection

```astro
---
interface Props {
  title: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const { title, variant = 'primary', size = 'md' } = Astro.props;
---
```

### Tailwind Usage
- Prefer utility classes in templates
- Use `@apply` sparingly — only for truly repeated patterns in global.css
- Custom properties (CSS variables) for design tokens — NOT Tailwind theme extension
- Responsive: mobile-first (base → md → lg → xl)

### GSAP Rules
- All animations defined in `src/scripts/animations.ts`
- Use `data-animate` attributes on HTML elements
- Available animations:
  - `data-animate="fade-up"` — fade in + translate up
  - `data-animate="fade-in"` — fade in only
  - `data-animate="stagger"` — stagger children
  - `data-animate="text-reveal"` — split text reveal
  - `data-animate="counter"` — number count up (needs `data-target="number"`)
- All animations respect `prefers-reduced-motion: reduce`
- ScrollTrigger start: "top 85%" (element top hits 85% viewport)
- Duration: 0.6-1s, ease: "power2.out"

### Alpine.js Rules
- Declare `x-data` on the component's root element
- Keep logic minimal — Alpine is for UI state only
- Patterns used:
  - Navbar scroll: `x-data="{ scrolled: false, mobileOpen: false }"`
  - FAQ accordion: `x-data="{ active: null }"`
  - Testimonials: `x-data="{ current: 0, total: N }"`
  - Sidebar nav: `x-data="{ activeSection: 'hero' }"`

### Data Files (src/data/)
- TypeScript with exported typed arrays/objects
- All display text lives here — NOT hardcoded in components
- Example structure:

```typescript
// src/data/services.ts
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: "code",
    title: "Web Application Development",
    description: "Custom Laravel applications built for performance..."
  },
  // ...
];
```

### Image Handling
- Store in `public/images/`
- Use descriptive names: `project-bintan-prestige.avif`
- Always provide width/height attributes
- Use `<picture>` for format fallbacks
- Lazy load below-the-fold images: `loading="lazy" decoding="async"`

---

## Git Workflow

- Branch per task: `feature/T01-project-init`, `feature/T10-hero-section`
- Commit message: `feat(hero): add hero section with stats and CTAs`
- Keep commits atomic — one concern per commit

---

## When Stuck

1. Re-read the relevant skill file in `ai/skills/`
2. Re-read `AGENTS.md` section 6 for section specs
3. Check the reference site https://heynesh.com/ for visual guidance
4. Ask the owner before making assumptions about design or structure
