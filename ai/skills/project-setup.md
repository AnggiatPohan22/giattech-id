# Skill: Project Setup & Configuration

## Dependencies (installed in this project)

```json
{
  "dependencies": {
    "astro": "^7.1.3",
    "@tailwindcss/vite": "^4.3.3",
    "tailwindcss": "^4.3.3",
    "alpinejs": "^3.15.12",
    "@types/alpinejs": "^3.13.11",
    "gsap": "^3.15.0",
    "@fontsource-variable/outfit": "^5.3.0",
    "@fontsource-variable/inter": "^5.3.0"
  }
}
```

> Note: This project uses **Tailwind CSS v4** via the Vite plugin
> (`@tailwindcss/vite`) — not the legacy `@astrojs/tailwind` integration.
> Tailwind v4 has NO `tailwind.config.mjs` file — configuration lives
> directly in CSS via `@theme` blocks in `src/styles/global.css`.

## astro.config.mjs

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://giattech.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
```

## global.css Structure (Tailwind v4)

Tailwind v4 uses a single `@import "tailwindcss"` directive. Design tokens
and font family aliases are declared in a `@theme` block — no
`tailwind.config.mjs` needed.

```css
@import "tailwindcss";

@theme {
  --font-display: "Outfit Variable", sans-serif;
  --font-body: "Inter Variable", sans-serif;

  /* Colors as Tailwind theme (available as bg-*, text-*, etc.) */
  --color-bg: #0C0C0C;
  --color-surface: #141414;
  --color-surface-hover: #1A1A1A;
  --color-border: #1F1F1F;
  --color-border-light: #2A2A2A;
  --color-text: #F5F5F4;
  --color-text-muted: #A8A29E;
  --color-text-subtle: #78716C;
  --color-accent: #A3B18A;
  --color-accent-light: #B7C4A1;
  --color-accent-dark: #8B9E74;
}

@layer base {
  :root {
    /* Spacing tokens (custom, not exposed to Tailwind theme) */
    --space-xs:  0.5rem;
    --space-sm:  1rem;
    --space-md:  1.5rem;
    --space-lg:  2rem;
    --space-xl:  3rem;
    --space-2xl: 5rem;
    --space-3xl: 7.5rem;

    /* Fluid type scale */
    --text-hero:    clamp(2.5rem, 5vw + 1rem, 5rem);
    --text-h2:      clamp(2rem, 4vw + 0.5rem, 3.5rem);
    --text-h3:      clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
    --text-body:    clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
    --text-small:   0.875rem;
    --text-eyebrow: 0.75rem;

    /* Accent tint (rgba can't live in @theme cleanly) */
    --color-accent-muted: rgba(163, 177, 138, 0.15);
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* navbar height */
  }

  body {
    font-family: var(--font-body);
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  [x-cloak] {
    display: none !important;
  }

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
