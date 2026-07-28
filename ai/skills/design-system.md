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
