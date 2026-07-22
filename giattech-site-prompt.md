# Master Prompt: Giattech Personal Website — Full Project Setup

## Instruksi Utama

Bangun project Astro untuk website personal/agency brand **Giattech**.
Website ini terinspirasi dari https://heynesh.com/ — ikuti layout, section flow,
spacing, dan premium feel-nya. Bukan copy konten — tapi match structural quality.

Sebelum mulai coding, **buat semua file governance dan skill dulu**.
Urutan kerja:

1. Initialize Astro project
2. Buat semua governance files (AGENTS.md, CLAUDE.md)
3. Buat semua AI skill files di `ai/`
4. Baru mulai coding section per section

---

## Step 1: Initialize Project

```bash
npm create astro@latest giattech-site -- --template minimal --typescript strict
cd giattech-site
npx astro add tailwind
npm install gsap @types/gsap
npm install alpinejs @types/alpinejs
npm install @fontsource-variable/outfit @fontsource-variable/inter
```

---

## Step 2: Buat `AGENTS.md` di root project

File ini adalah master rules untuk semua AI agent yang bekerja di project ini.

```markdown
# Giattech Personal Website — AI Agent Master Rules

Read this file FIRST before doing any work.
Then read the relevant skill file(s) from the Skill Map in Section 3.

---

## 1. Project Identity & Goal

**Project:** Giattech — Personal & Agency Website
**Brand:** Giattech (also styled GiatTech)
**Stack:** Astro | TypeScript | Tailwind CSS v4 | Alpine.js | GSAP + ScrollTrigger
**Type:** Static site (SSG), no backend, no database

**Ultimate Goal:**
Build a premium, high-performance personal/agency website that showcases
Giattech's services, portfolio, and brand identity. The site must feel
as polished and intentional as https://heynesh.com/ — smooth animations,
generous spacing, clean typography, and a cohesive dark theme with sage green accent.

**Design Reference:** https://heynesh.com/
- Match the section flow: Hero → About → Services → Projects → Pricing → Testimonials → FAQ → CTA → Footer
- Match the animation quality: scroll-triggered reveals, staggered cards, smooth transitions
- Match the spacing philosophy: generous whitespace, content breathes
- Match the typography approach: large bold headings, clean body text, tight letter-spacing
- DO NOT copy content — use Giattech's own brand voice and services

---

## 2. Authority Order

When instructions conflict, follow this order:

1. Owner's latest explicit instruction
2. This AGENTS.md
3. `ai/skills/*` (relevant skill files)
4. `docs/*`
5. Existing code structure
6. Astro official conventions

---

## 3. Skill Map — Load Only What the Task Needs

| Task Type | Read These Skill Files |
|-----------|----------------------|
| Design tokens, colors, typography | `ai/skills/design-system.md` |
| Section layout & components | `ai/skills/section-architecture.md` |
| GSAP animations & scroll effects | `ai/skills/animation.md` |
| Alpine.js interactivity | `ai/skills/interactivity.md` |
| Performance & SEO | `ai/skills/performance-seo.md` |
| Content & copywriting | `ai/skills/content.md` |
| Project setup & config | `ai/skills/project-setup.md` |

---

## 4. Design Direction

### Color Palette — Dark Theme with Sage Green Accent

```
Background & Surfaces:
--color-bg:            #0C0C0C     (deep black — main background)
--color-surface:       #141414     (slightly lighter — card backgrounds)
--color-surface-hover: #1A1A1A     (card hover state)
--color-border:        #1F1F1F     (subtle dividers)
--color-border-light:  #2A2A2A     (more visible dividers)

Text:
--color-text:          #F5F5F4     (stone-50 — primary text, warm off-white)
--color-text-muted:    #A8A29E     (stone-400 — secondary text)
--color-text-subtle:   #78716C     (stone-500 — labels, eyebrows)

Accent — Sage Green:
--color-accent:        #A3B18A     (sage green — primary accent)
--color-accent-light:  #B7C4A1     (lighter sage — hover states)
--color-accent-dark:   #8B9E74     (darker sage — active states)
--color-accent-muted:  rgba(163, 177, 138, 0.15)  (sage tint — subtle backgrounds)
```

### Typography
- **Display/Heading:** Outfit Variable — weight 600-800, letter-spacing: -0.03em
- **Body:** Inter Variable — weight 400-500, letter-spacing: normal
- **Type Scale (fluid clamp):**
  - Hero heading: clamp(2.5rem, 5vw + 1rem, 5rem)
  - Section heading (h2): clamp(2rem, 4vw + 0.5rem, 3.5rem)
  - Sub heading (h3): clamp(1.25rem, 2vw + 0.5rem, 1.75rem)
  - Body: clamp(1rem, 1vw + 0.5rem, 1.125rem)
  - Small/caption: 0.875rem
  - Eyebrow: 0.75rem, uppercase, letter-spacing: 0.15em, font-weight: 500

### Spacing
- Section vertical padding: 120px desktop, 80px tablet, 64px mobile
- Max content width: 1280px, centered with auto margins
- Component gap: 24-48px depending on context

### Radius & Effects
- Cards: border-radius 12-16px
- Buttons: border-radius 8px (default), 999px (pill variant)
- No box-shadow — use border (1px solid var(--color-border)) for elevation
- Hover transitions: 300ms ease, subtle scale(1.02) on cards

---

## 5. File Structure

```
giattech-site/
├── AGENTS.md                    ← this file
├── CLAUDE.md                    ← Claude Code specific instructions
├── ai/
│   └── skills/
│       ├── design-system.md
│       ├── section-architecture.md
│       ├── animation.md
│       ├── interactivity.md
│       ├── performance-seo.md
│       ├── content.md
│       └── project-setup.md
├── src/
│   ├── components/
│   │   ├── sections/            ← one file per page section
│   │   │   ├── Navbar.astro
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Services.astro
│   │   │   ├── Projects.astro
│   │   │   ├── Pricing.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── CTA.astro
│   │   │   └── Footer.astro
│   │   └── ui/                  ← reusable UI primitives
│   │       ├── Button.astro
│   │       ├── SectionHeader.astro
│   │       ├── ServiceCard.astro
│   │       ├── ProjectCard.astro
│   │       ├── PricingCard.astro
│   │       └── TestimonialCard.astro
│   ├── content/
│   │   └── projects/            ← Astro content collections
│   │       ├── config.ts
│   │       ├── project-1.md
│   │       ├── project-2.md
│   │       └── project-3.md
│   ├── data/
│   │   ├── services.ts          ← services list
│   │   ├── testimonials.ts      ← client testimonials
│   │   ├── faq.ts               ← FAQ items
│   │   ├── pricing.ts           ← pricing plans
│   │   └── navigation.ts        ← nav links
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   ├── animations.ts        ← GSAP ScrollTrigger setup
│   │   └── alpine-init.ts       ← Alpine.js components
│   └── styles/
│       └── global.css           ← Tailwind + custom properties
├── public/
│   ├── images/                  ← optimized images
│   ├── fonts/                   ← if self-hosting
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 6. Section Specifications

### 6.1 Navbar
- Fixed top, transparent → solid bg on scroll
- Logo: "Giattech" text logo (Outfit font, weight 700)
- Links: Home, About, Services, Projects, Contact
- CTA button: "Book a Call" (sage green, pill shape)
- Mobile: hamburger menu → fullscreen overlay
- Alpine.js for scroll detection + mobile toggle
- Z-index: highest layer

### 6.2 Hero
- Full viewport height (100svh)
- Layout like heynesh.com: large photo/visual left, text content right
  OR centered text with stats — choose based on available assets
- Headline example:
  ```
  Web Apps,
  Built Differently.
  ```
- Subheadline: one sentence about Giattech
- Stats: "X+ Projects" | "Y Years" (animated counter)
- Two CTAs: "Book a Call" (primary sage) + "Our Work" (outline)
- Tags/keywords floating: "Laravel" "Full-Stack" "Performance" "AI-Assisted"
- GSAP: staggered text reveal + fade-in elements
- Subtle background: CSS grid pattern or gradient mesh

### 6.3 About — Timeline Format
- Follow heynesh.com's timeline pattern exactly:
  - Vertical timeline with year markers
  - Each entry: year label, title, short description, image(s)
  - "Read more" expandable for detail (Alpine.js)
  - Social-media-post style cards (like @username, X years ago)
- Timeline entries for Giattech journey (placeholder years/content)
- GSAP: scroll-triggered reveal per timeline entry

### 6.4 Services / What You Get
- Eyebrow: "WHAT YOU GET"
- Heading with line break styling like reference
- Intro paragraph with scattered word styling (like reference site)
- Service cards in grid:
  - Web Application Development
  - CMS & Admin Dashboard
  - API Development & Integration
  - Performance & SEO Optimization
  - Creative & Interactive Motion
  - Ongoing Support & Maintenance
- Each card: icon + title + description
- GSAP: stagger reveal

### 6.5 Projects / Portfolio
- Eyebrow: "SELECTED WORK"
- Heading: "Built to Perform"
- Project cards like reference:
  - Large thumbnail (16:9 or 4:3)
  - Numbered (01, 02, 03...)
  - Tags (Laravel, CMS, API, Tailwind)
  - Project name + one-line description
  - Hover: scale + overlay
- Content collection for project data
- GSAP: scroll-triggered card reveal

### 6.6 Pricing
- Eyebrow: "SERVICES"
- Heading: "Solutions That Deliver"
- Three pricing cards:
  1. **Ongoing Support** — monthly retainer, hours-based
  2. **Starter Build** — fixed price, defined scope
  3. **Custom Project** — "Book a Call", enterprise
- Each: title, price, feature list with checkmarks, CTA
- Middle card highlighted
- GSAP: stagger fade-in

### 6.7 Testimonials
- Eyebrow: "TESTIMONIALS"
- Heading: "From People We've Worked With"
- Card carousel:
  - Quote heading (bold, like reference)
  - Full testimonial text
  - Client photo (rounded)
  - Name + title + company link
- Auto-rotate + manual navigation
- GSAP: fade transitions

### 6.8 FAQ
- Eyebrow: "FAQ"
- Heading: "Got Questions?"
- Accordion with Alpine.js:
  - Question as clickable header
  - Answer slides down with x-collapse
  - Plus/minus or chevron icon rotates
- 6-8 questions about process, pricing, tech stack
- GSAP: stagger on scroll

### 6.9 CTA Section
- Distinct from other sections (slightly different bg or border)
- Photo/avatar
- Heading: "Have Something in Mind?"
- Single large CTA: "Let's Talk" (sage green)

### 6.10 Footer
- Multi-column:
  - Brand + short tagline
  - Navigation links
  - Contact (email, location: Indonesia)
  - Social (GitHub, LinkedIn, X/Twitter)
- Copyright line
- Subtle top border

---

## 7. Sidebar Navigation (Like Reference)
- Fixed right side (desktop only)
- Vertical dots/labels for each section
- Highlights current section on scroll
- Clicking scrolls to section smoothly
- Alpine.js + IntersectionObserver for active state

---

## 8. Critical Rules

### Never do without approval:
- Install additional packages beyond the initial setup
- Add a backend, database, or server-side logic
- Change the color palette or typography
- Remove or reorder sections
- Add pages beyond index (single-page site)

### Always do:
- Keep all content in data files (src/data/) — no hardcoded text in components
- Use Astro components — one file per section
- Use TypeScript for all .ts files
- Use semantic HTML (section, article, nav, header, footer)
- Test responsive at 375px, 768px, 1024px, 1440px
- Respect prefers-reduced-motion for all GSAP animations
- Use picture element with avif/webp fallback for images

---

## 9. Implementation Order

Build section by section, test each before moving to next:

```
Phase 1 — Foundation
  1. Project init + dependencies
  2. Global CSS + design tokens
  3. Layout.astro + meta tags
  4. Data files (services, testimonials, faq, pricing, navigation)

Phase 2 — Core Sections
  5. Navbar (with Alpine.js scroll + mobile menu)
  6. Hero (with GSAP entrance animation)
  7. Sidebar navigation
  8. SectionHeader component (reusable)

Phase 3 — Content Sections
  9.  About/Timeline section
  10. Services section + cards
  11. Projects section + content collection
  12. Pricing section + cards
  13. Testimonials section + carousel
  14. FAQ section + accordion
  15. CTA section
  16. Footer

Phase 4 — Polish
  17. GSAP scroll animations for all sections
  18. Responsive testing & fixes
  19. Performance optimization (images, fonts, lazy loading)
  20. SEO meta tags + Open Graph
  21. Lighthouse audit → fix until 95+ all metrics
```

---

## 10. Report Format

After each completed section:

```
## Section: [name]

### Files Created/Changed
- `path/to/file` — what was done

### Status
- Desktop: ✅ | ⚠️ | ❌
- Mobile: ✅ | ⚠️ | ❌
- Animation: ✅ | ⚠️ | ❌
- Accessibility: ✅ | ⚠️ | ❌

### Next
[recommended next section]
```

---

## 11. Final Principle

This website represents the Giattech brand.
Every pixel, every animation, every word should feel intentional.
Match the premium quality of the reference (heynesh.com) while
establishing Giattech's own identity through the sage green palette,
Indonesian market positioning, and Laravel/full-stack expertise.

Build it section by section. Test as you go. Don't rush.
```

---

## Step 3: Buat `CLAUDE.md` di root project

File ini khusus untuk Claude Code — berisi task list dan specific behaviors.

```markdown
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

---

## Task Checklist

Work through these in order. Check off as completed.
Each task = one focused session. Don't combine tasks.

### Phase 1 — Foundation
- [ ] **T01** — Initialize Astro project with all dependencies
- [ ] **T02** — Create `src/styles/global.css` with all design tokens (colors, typography, spacing)
- [ ] **T03** — Create `src/layouts/Layout.astro` (HTML shell, font imports, meta tags, global CSS)
- [ ] **T04** — Create all data files in `src/data/` (navigation, services, testimonials, faq, pricing)
- [ ] **T05** — Create `src/components/ui/Button.astro` (primary, outline, ghost variants)
- [ ] **T06** — Create `src/components/ui/SectionHeader.astro` (eyebrow + heading + optional subtitle)

### Phase 2 — Layout & Navigation
- [ ] **T07** — Create `Navbar.astro` (fixed, transparent→solid scroll, mobile hamburger)
- [ ] **T08** — Create sidebar section navigation (desktop only, dot indicators)
- [ ] **T09** — Create `Footer.astro`

### Phase 3 — Hero & About
- [ ] **T10** — Create `Hero.astro` (headline, sub, stats, CTAs, tags)
- [ ] **T11** — Create `About.astro` with timeline format (year cards, expandable details)
- [ ] **T12** — Add GSAP entrance animation to Hero

### Phase 4 — Service & Project Sections
- [ ] **T13** — Create `ServiceCard.astro` component
- [ ] **T14** — Create `Services.astro` section
- [ ] **T15** — Set up Astro content collection for projects (`src/content/projects/`)
- [ ] **T16** — Create `ProjectCard.astro` component
- [ ] **T17** — Create `Projects.astro` section

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
```

---

## Step 4: Buat AI Skill Files

### File: `ai/skills/design-system.md`

```markdown
# Skill: Design System — Giattech Website

## Color System

This site uses a dark theme inspired by heynesh.com with sage green accent.
All colors are defined as CSS custom properties in `src/styles/global.css`.

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0C0C0C` | Page background |
| `--color-surface` | `#141414` | Cards, elevated sections |
| `--color-surface-hover` | `#1A1A1A` | Card hover state |
| `--color-border` | `#1F1F1F` | Subtle borders, dividers |
| `--color-border-light` | `#2A2A2A` | More visible borders |
| `--color-text` | `#F5F5F4` | Primary text (stone-50) |
| `--color-text-muted` | `#A8A29E` | Secondary text (stone-400) |
| `--color-text-subtle` | `#78716C` | Labels, eyebrows (stone-500) |
| `--color-accent` | `#A3B18A` | Sage green — links, buttons, highlights |
| `--color-accent-light` | `#B7C4A1` | Hover state for accent |
| `--color-accent-dark` | `#8B9E74` | Active/pressed state |
| `--color-accent-muted` | `rgba(163,177,138,0.15)` | Tinted backgrounds |

### Color Usage Rules
- Background must ALWAYS be `--color-bg` (never pure black #000)
- Card backgrounds use `--color-surface` with `--color-border` border
- Sage green accent is used sparingly: CTAs, links, active states, tags
- Text hierarchy: primary → muted → subtle (three levels max)
- Never use sage green for large background areas — only small accents
- Hover transitions on color: 300ms ease

### Typography

**Display Font — Outfit Variable**
- Used for: all headings (h1-h3), hero text, section titles
- Weights: 600 (subheading), 700 (heading), 800 (hero display)
- Letter spacing: -0.03em (tighter than default)
- Line height: 1.1 (hero), 1.2 (h2), 1.3 (h3)

**Body Font — Inter Variable**
- Used for: body text, descriptions, cards, buttons, nav
- Weights: 400 (body), 500 (emphasis, buttons, labels)
- Letter spacing: normal
- Line height: 1.6 (body), 1.5 (cards)

**Type Scale (fluid clamp):**
```css
--text-hero:    clamp(2.5rem, 5vw + 1rem, 5rem);
--text-h2:      clamp(2rem, 4vw + 0.5rem, 3.5rem);
--text-h3:      clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
--text-body:    clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
--text-small:   0.875rem;
--text-eyebrow: 0.75rem;
```

**Eyebrow Text Pattern:**
- Font: Inter, weight 500
- Size: 0.75rem (12px)
- Letter spacing: 0.15em
- Transform: uppercase
- Color: `--color-accent` (sage green)
- Always appears above section heading

### Spacing Scale
```css
--space-xs:  0.5rem;    /* 8px */
--space-sm:  1rem;      /* 16px */
--space-md:  1.5rem;    /* 24px */
--space-lg:  2rem;      /* 32px */
--space-xl:  3rem;      /* 48px */
--space-2xl: 5rem;      /* 80px */
--space-3xl: 7.5rem;    /* 120px */
```

Section padding: `--space-3xl` top/bottom (desktop), `--space-2xl` (mobile)

### Component Patterns

**Buttons:**
- Primary: bg sage green, text #0C0C0C, rounded-lg (8px), px-6 py-3
- Outline: border sage green, text sage green, transparent bg, same radius
- Ghost: no border, text sage green, hover: accent-muted bg
- Pill variant: rounded-full (for navbar CTA)
- All: font Inter 500, transition 300ms

**Cards:**
- bg: `--color-surface`
- border: 1px solid `--color-border`
- border-radius: 12px (default), 16px (large cards)
- padding: 24px (default), 32px (large)
- hover: border-color `--color-border-light`, bg `--color-surface-hover`
- transition: all 300ms ease

**Tags/Badges:**
- bg: `--color-accent-muted`
- text: `--color-accent`
- font-size: 0.75rem
- padding: 4px 12px
- border-radius: 999px
```

---

### File: `ai/skills/section-architecture.md`

```markdown
# Skill: Section Architecture — Giattech Website

## Section Pattern

Every section follows a consistent structure:

```astro
<section
  id="section-name"
  class="relative py-20 lg:py-[120px]"
  data-section="section-name"
>
  <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
    <SectionHeader
      eyebrow="EYEBROW TEXT"
      heading="Section Heading"
    />
    <!-- Section content -->
  </div>
</section>
```

Rules:
- `id` for anchor links / sidebar nav
- `data-section` for IntersectionObserver (sidebar active state)
- Max width 1280px, centered
- Horizontal padding scales with breakpoint
- `SectionHeader` component used in every section (except Hero, CTA, Footer)

## Section Inventory

| # | Section | id | Has SectionHeader | Special Pattern |
|---|---------|-----|-------------------|----------------|
| 1 | Navbar | — | No | Fixed, transparent→solid |
| 2 | Hero | `hero` | No | Full viewport, custom layout |
| 3 | About | `about` | Yes | Timeline with expandable cards |
| 4 | Services | `services` | Yes | Grid of ServiceCards |
| 5 | Projects | `projects` | Yes | Grid of ProjectCards |
| 6 | Pricing | `pricing` | Yes | 3-column PricingCards |
| 7 | Testimonials | `testimonials` | Yes | Carousel slider |
| 8 | FAQ | `faq` | Yes | Accordion |
| 9 | CTA | `cta` | No | Standalone CTA block |
| 10 | Footer | — | No | Multi-column footer |
| — | Sidebar Nav | — | No | Fixed right, dots |

## Layout Patterns from Reference

### Hero Layout
The reference uses a split layout:
- Left: large personal photo
- Right: text content (headline, sub, stats, CTAs)
- Bottom: scrolling logo marquee of client brands
- Background: subtle gradient or pattern
- The floating keyword tags add visual interest

### Timeline (About)
The reference's timeline is the most distinctive section:
- Vertical line with year markers
- Each entry looks like a social media post:
  - Small images (2 images per entry, rounded)
  - @username tag + "X years ago" label
  - Title + short description
  - "Read more" that expands to show full story with larger image
- Entries alternate or stack vertically
- Year labels: large, muted color

### Project Cards
Reference uses full-width cards with:
- Large thumbnail covering most of the card
- Numbered index (01, 02, 03) in top-left
- Tags as small badges
- Project name + one-line description at bottom
- Hover: subtle scale + darker overlay

### Pricing Cards
Three cards side by side:
- Each has: plan name, price, feature list, CTA button
- Middle card may be visually distinct (highlighted border or accent)
- Feature items: checkmark icon + text
- Clean, structured layout

### Testimonial Cards
Each testimonial:
- Bold heading that summarizes the testimonial (like "Trusted long-term collaborator.")
- Full quote text below
- Client info at bottom: photo (small circle), name, role, company link
- Cards slide horizontally or fade between

### FAQ Accordion
- Clean list of questions
- Click to expand → answer slides down
- Icon rotates (+ to × or chevron)
- Only one open at a time
- Question text: white, answer text: muted
```

---

### File: `ai/skills/animation.md`

```markdown
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
Each line clips from below: clipPath inset(100% 0 0 0) → inset(0)
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
```

---

### File: `ai/skills/interactivity.md`

```markdown
# Skill: Interactivity — Alpine.js Patterns

## Setup

Alpine.js is initialized in `src/scripts/alpine-init.ts` and loaded
in Layout.astro via script tag.

## Component Patterns

### 1. Navbar Scroll + Mobile Menu

```html
<nav
  x-data="{
    scrolled: false,
    mobileOpen: false
  }"
  x-init="
    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 50
    })
  "
  :class="scrolled ? 'bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#1F1F1F]' : 'bg-transparent'"
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
>
  <!-- Desktop nav items -->
  <!-- Mobile hamburger: @click="mobileOpen = !mobileOpen" -->
  <!-- Mobile overlay: x-show="mobileOpen" x-transition -->
</nav>
```

### 2. FAQ Accordion

```html
<div x-data="{ active: null }">
  {faqs.map((faq, i) => (
    <div class="border-b border-[#1F1F1F]">
      <button
        @click={`active = active === ${i} ? null : ${i}`}
        class="w-full flex justify-between items-center py-6 text-left"
      >
        <span class="text-lg font-medium">{faq.question}</span>
        <span
          :class={`active === ${i} ? 'rotate-45' : ''`}
          class="transition-transform duration-300 text-[--color-accent]"
        >+</span>
      </button>
      <div
        x-show={`active === ${i}`}
        x-collapse
        class="pb-6 text-[--color-text-muted]"
      >
        {faq.answer}
      </div>
    </div>
  ))}
</div>
```

### 3. Testimonial Carousel

```html
<div
  x-data="{
    current: 0,
    total: testimonials.length,
    autoplay: null,
    next() { this.current = (this.current + 1) % this.total },
    prev() { this.current = (this.current - 1 + this.total) % this.total },
    startAutoplay() {
      this.autoplay = setInterval(() => this.next(), 5000)
    },
    stopAutoplay() {
      clearInterval(this.autoplay)
    }
  }"
  x-init="startAutoplay()"
  @mouseenter="stopAutoplay()"
  @mouseleave="startAutoplay()"
>
  <!-- Show testimonial[current] with transition -->
  <!-- Dot indicators: click to set current -->
</div>
```

### 4. Sidebar Section Navigation

```html
<nav
  x-data="{
    activeSection: 'hero',
    sections: ['hero','about','services','projects','pricing','testimonials','faq']
  }"
  x-init="
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) activeSection = e.target.id
      })
    }, { threshold: 0.3 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  "
  class="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
>
  <!-- Dot per section, active = sage green -->
</nav>
```

### 5. Timeline "Read More" Toggle

```html
<div x-data="{ expanded: false }">
  <p class="line-clamp-2">{shortDescription}</p>
  <button @click="expanded = !expanded" class="text-[--color-accent] mt-2">
    <span x-text="expanded ? 'Show less' : 'Read more'"></span>
  </button>
  <div x-show="expanded" x-collapse>
    {fullContent}
  </div>
</div>
```

## Rules
- Keep Alpine logic minimal — UI state only
- No API calls or heavy computation in Alpine
- Use `x-cloak` on elements that flash before Alpine loads
- Add `[x-cloak] { display: none !important; }` in global.css
```

---

### File: `ai/skills/performance-seo.md`

```markdown
# Skill: Performance & SEO

## Performance Targets
- Lighthouse: 95+ on ALL metrics (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 200ms

## Image Optimization
- Format priority: AVIF → WebP → JPG (use <picture>)
- Hero/above-fold images: `loading="eager"`, `fetchpriority="high"`
- Below-fold images: `loading="lazy"`, `decoding="async"`
- Always set explicit `width` and `height` attributes
- Compress: 80% quality for photos, lossless for illustrations
- Max dimensions: 1920px wide for full-width, 800px for cards

```html
<picture>
  <source srcset="/images/project.avif" type="image/avif" />
  <source srcset="/images/project.webp" type="image/webp" />
  <img
    src="/images/project.jpg"
    alt="Descriptive alt text"
    width="800"
    height="450"
    loading="lazy"
    decoding="async"
  />
</picture>
```

## Font Loading
- Use @fontsource-variable (npm packages) — no external requests
- Import only needed weights in Layout.astro
- Font-display: swap

```astro
---
import '@fontsource-variable/outfit';
import '@fontsource-variable/inter';
---
```

## SEO Setup

### Meta Tags (in Layout.astro)
```html
<title>{title} — Giattech</title>
<meta name="description" content="{description}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href="https://giattech.com/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:url" content="https://giattech.com/" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="/images/og-image.jpg" />
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Giattech",
  "description": "Digital agency specializing in web application development",
  "url": "https://giattech.com",
  "areaServed": "Indonesia",
  "serviceType": ["Web Development", "CMS Development", "API Development"]
}
```

### HTML Semantics
- `<header>` for navbar
- `<main>` wrapping all sections
- `<section>` for each content section with `aria-labelledby`
- `<article>` for project cards
- `<footer>` for footer
- `<nav>` for navigation (main + sidebar + footer)
- Heading hierarchy: only one `<h1>` (in hero), `<h2>` per section

## Build Optimization
- Astro handles HTML/CSS/JS minification
- No unused CSS (Tailwind purge)
- Inline critical CSS (Astro does this by default)
- Prefetch visible links: `<link rel="prefetch">`
```

---

### File: `ai/skills/content.md`

```markdown
# Skill: Content & Copywriting — Giattech Website

## Brand Voice
- Professional but approachable
- Confident without arrogance
- Technical credibility — mention specific technologies naturally
- Indonesian roots, international quality
- Short sentences. Clear language. No corporate jargon.

## Content Guidelines
- All display text lives in `src/data/*.ts` files
- Components receive text via props or imports — never hardcoded
- Heading line breaks are intentional — use `<br />` or span wrapping for emphasis
- Eyebrow text: always uppercase, short (1-3 words)

## Placeholder Content Structure

### Hero
- Headline: 2-3 words per line, max 2 lines
- Subheadline: 1-2 sentences
- Stats: 2 metrics (projects count + years experience)
- Tags: 4-6 technology/skill keywords

### About Timeline
- 4-6 entries spanning career history
- Each: year, title (short), description (2 sentences), expanded detail (1 paragraph)
- Tone: personal, narrative, like telling your story

### Services
- 6 services
- Each: icon name, title (2-4 words), description (2-3 sentences)
- Focus on outcomes, not features

### Projects
- 4-6 projects
- Each: title, description (1 sentence), tags (2-4), thumbnail path, external URL
- Description focuses on what was achieved, not how

### Pricing
- 3 tiers with clear differentiation
- Feature lists: 5-7 items each
- Prices in USD or "Let's Talk" for custom

### Testimonials
- 4-6 testimonials
- Each: quote heading (bold summary), full quote, client name, role, company, photo
- Heading pattern from reference: "Trusted long-term collaborator." style

### FAQ
- 6-8 questions
- Topics: process, pricing, tech stack, revisions, timeline, ongoing support
- Answers: 3-5 sentences, direct and helpful
```

---

### File: `ai/skills/project-setup.md`

```markdown
# Skill: Project Setup & Configuration

## Dependencies (exact versions at time of writing)

```json
{
  "dependencies": {
    "astro": "latest",
    "@astrojs/tailwind": "latest",
    "alpinejs": "^3.x",
    "@types/alpinejs": "^3.x",
    "gsap": "^3.12",
    "@fontsource-variable/outfit": "latest",
    "@fontsource-variable/inter": "latest"
  }
}
```

## astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://giattech.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
```

## tailwind.config.mjs

Keep it minimal — use CSS custom properties for theming instead of
extending Tailwind's theme. This keeps the design system in one place
(global.css) and avoids duplication.

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit Variable', 'sans-serif'],
        body: ['Inter Variable', 'sans-serif'],
      }
    }
  }
};
```

## global.css Structure

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* All color tokens */
    /* All spacing tokens */
    /* All type scale tokens */
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* navbar height */
  }

  body {
    font-family: 'Inter Variable', sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  [x-cloak] {
    display: none !important;
  }

  /* Selection color */
  ::selection {
    background-color: var(--color-accent-muted);
    color: var(--color-accent);
  }
}
```

## Layout.astro Structure

```astro
---
import '@fontsource-variable/outfit';
import '@fontsource-variable/inter';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Giattech — Web Application Studio',
  description = 'Digital agency building high-performance web applications with Laravel, modern frontend, and AI-assisted development.'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <!-- OG tags, favicon, etc. -->
</head>
<body class="antialiased">
  <slot />
  <script src="../scripts/alpine-init.ts"></script>
  <script src="../scripts/animations.ts"></script>
</body>
</html>
```

## index.astro Assembly

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/sections/Navbar.astro';
import Hero from '../components/sections/Hero.astro';
import About from '../components/sections/About.astro';
import Services from '../components/sections/Services.astro';
import Projects from '../components/sections/Projects.astro';
import Pricing from '../components/sections/Pricing.astro';
import Testimonials from '../components/sections/Testimonials.astro';
import FAQ from '../components/sections/FAQ.astro';
import CTA from '../components/sections/CTA.astro';
import Footer from '../components/sections/Footer.astro';
import SidebarNav from '../components/sections/SidebarNav.astro';
---

<Layout>
  <Navbar />
  <SidebarNav />
  <main>
    <Hero />
    <About />
    <Services />
    <Projects />
    <Pricing />
    <Testimonials />
    <FAQ />
    <CTA />
  </main>
  <Footer />
</Layout>
```
```

---

## Step 5: Sekarang Mulai Coding

Setelah semua governance files dan skill files dibuat, mulai coding dari Task T01.
Ikuti `CLAUDE.md` task checklist secara berurutan.

**Reminder:** Semua warna menggunakan palette sage green yang sudah didefinisikan.
Jangan gunakan warna biru atau kuning. Accent color = sage green (#A3B18A).

Buat setiap file governance dan skill terlebih dahulu sebelum menulis code apapun.
Pastikan file structure sesuai dengan yang didefinisikan di AGENTS.md section 5.
