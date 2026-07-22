# Skill: Performance & SEO

## Performance Targets
- Lighthouse: 95+ on ALL metrics (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 200ms

## Image Optimization
- Format priority: AVIF -> WebP -> JPG (use `<picture>`)
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
