---
name: Lumina Tech Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#424754'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#605f54'
  on-secondary: '#ffffff'
  secondary-container: '#e4e0d3'
  on-secondary-container: '#656358'
  tertiary: '#5d5c5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#767474'
  on-tertiary-container: '#f7feff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e6e2d5'
  secondary-fixed-dim: '#cac6ba'
  on-secondary-fixed: '#1d1c14'
  on-secondary-fixed-variant: '#48473d'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  bone-white: '#F9F8F3'
  deep-obsidian: '#0C0C0C'
  electric-blue: '#3B82F6'
  warm-sand: '#E5E1D4'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system blends high-performance technology with architectural precision. It targets a sophisticated audience of tech leaders, architects, and developers who value clarity and intentionality. The aesthetic is a hybrid of **Minimalism** and **Corporate Modern**, drawing inspiration from modern architectural photography: deep shadows, clean lines, and expansive negative space.

The emotional response should be one of "quiet confidence"—professional and systematic, yet warm and grounded. By combining the digital precision of a SaaS product with the tactile, organic elegance of high-end architectural design, the interface feels both innovative and established.

## Colors

The palette is anchored by a high-contrast relationship between **Deep Obsidian** and **Bone White**, mirroring the interplay of light and shadow in modern architecture. 

- **Primary:** The electric blue from the tech reference is used sparingly as a "digital thread"—guiding the eye to primary actions and interactive states.
- **Secondary:** The warm sand tone is utilized for large surface areas or background sections to soften the clinical feel of pure white, providing a gallery-like backdrop for content.
- **Functional:** Success, warning, and error states should maintain high saturation but occupy minimal screen real estate to preserve the editorial atmosphere.

## Typography

The typographic strategy utilizes **Outfit** for structural elements and **Inter** for utility and long-form reading. 

- **Headlines:** Use Outfit with tight letter spacing for a geometric, architectural feel. Display styles should be reserved for hero sections and major content breaks.
- **Body:** Inter provides the necessary legibility for technical blog posts and documentation. Line heights are intentionally generous (1.5x - 1.6x) to ensure a comfortable reading pace.
- **Labels:** Labels and small metadata should use Inter with increased letter-spacing and uppercase styling to act as clear navigational markers without competing with headlines.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to mimic the structured nature of an architectural blueprint. 

- **Grid:** A 12-column grid with a wide 24px gutter. 
- **Rhythm:** Spacing follows an 8px linear scale. Large vertical gaps (80px, 120px, 160px) are encouraged between major sections to provide "breathing room," allowing high-quality photography to stand out.
- **Breakpoints:**
  - **Desktop (1280px+):** Full 12-column layout with 64px margins.
  - **Tablet (768px - 1279px):** 8-column layout with 40px margins.
  - **Mobile (0 - 767px):** 4-column fluid layout with 20px margins; typography scales down and horizontal padding reduces to maximize content width.

## Elevation & Depth

This design system eschews heavy shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**. Depth is created through the stacking of surfaces rather than physical distance.

- **Surfaces:** The base layer is `Bone White`. Overlays (cards, modals) use `White` with a very subtle 1px border in a lightened version of `Warm Sand`.
- **Shadows:** When necessary for functional elevation (e.g., dropdowns), use a single, ultra-diffused shadow: `0px 10px 30px rgba(12, 12, 12, 0.05)`.
- **Glassmorphism:** Use sparingly for navigation bars. A backdrop blur of 12px with a 70% opaque white fill ensures content remains legible while hinting at the layers beneath.

## Shapes

The shape language is disciplined and "Soft-Minimalist." 

Elements use a consistent **0.25rem (4px)** corner radius. This subtle rounding prevents the UI from feeling "sharp" or aggressive while maintaining the rigid, professional structure of a tech product. Large components like hero imagery or primary CTA sections may use up to **0.75rem (12px)** to create a distinct container feel without veering into "bubbly" or "playful" territory.

## Components

- **Buttons:** Primary buttons are solid `Deep Obsidian` with white text. Secondary buttons use a 1px border of `Deep Obsidian` with no fill. The `Electric Blue` is reserved for "Action Icons" or small "Submit" indicators to avoid overwhelming the monochromatic theme.
- **Inputs:** Fields are defined by a bottom border only in their default state, shifting to a full 1px `Electric Blue` border on focus. This mimics architectural drawing styles.
- **Cards:** Cards should have no shadow; instead, use a subtle background shift to `Warm Sand` on hover or a thin `1px` border.
- **Chips:** Small, rectangular tags with `Inter Label-sm` typography. Backgrounds should be `Warm Sand` with `Deep Obsidian` text.
- **Photography:** All imagery should feature high-contrast architectural or tech-hardware subjects, emphasizing perspective and natural light.
- **Lists:** Technical specs and blog indexes should use generous vertical padding (24px+) and thin separators in `#E5E1D4`.