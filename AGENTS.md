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
- Desktop: OK | WARN | FAIL
- Mobile: OK | WARN | FAIL
- Animation: OK | WARN | FAIL
- Accessibility: OK | WARN | FAIL

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
