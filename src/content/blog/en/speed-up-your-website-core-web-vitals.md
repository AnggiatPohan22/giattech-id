---
title: "How to Speed Up Your Website: A Practical Core Web Vitals Guide"
description: "How to measure and fix LCP, INP, and CLS on a business website — images, fonts, JavaScript, and hosting — with concrete target numbers to hit."
lang: en
slug: speed-up-your-website-core-web-vitals
translationKey: optimasi-kecepatan-website
category: tutorial-panduan
tags: ["Performance", "Core Web Vitals", "SEO", "Optimization", "Lighthouse"]
publishDate: 2026-06-20
author: Giattech
cover: /images/blog/how-to-speed-your-website-giattech.webp
coverAlt: "How to Speed Up Your Website: A Practical Core Web Vitals Guide"
---

A slow website loses visitors before it gets a chance to sell anything. Google also treats speed as a ranking signal through **Core Web Vitals**. The good news: most speed problems trace back to the same five causes, and every one of them is fixable.

This article explains what's measured, what numbers to aim for, and the order of fixes that pays off fastest.

## The three metrics that actually count

### LCP — Largest Contentful Paint

How long until the largest element on screen (usually a hero image or a big heading) finishes rendering.

- **Good:** under 2.5 seconds
- **Needs work:** 2.5–4 seconds
- **Poor:** over 4 seconds

### INP — Interaction to Next Paint

How quickly the page responds when a user taps or clicks. It replaced FID in 2024.

- **Good:** under 200 ms
- **Needs work:** 200–500 ms
- **Poor:** over 500 ms

### CLS — Cumulative Layout Shift

How much things move on their own while the page loads. It's why you tap the wrong button when an ad pops in above it.

- **Good:** under 0.1
- **Needs work:** 0.1–0.25
- **Poor:** over 0.25

## How to measure it properly

There are two kinds of data, and you want both:

**Lab data** — synthetic tests in a controlled environment. Use Lighthouse in Chrome DevTools or [PageSpeed Insights](https://pagespeed.web.dev/). Fast, repeatable, ideal for before-and-after comparisons.

**Field data** — measurements from real users (CrUX). This is what Google actually uses. You'll find it at the top of PageSpeed Insights and inside Google Search Console.

Three testing rules people break constantly:

1. **Test the production build, not the dev server.** Dev servers skip minification and compression.
2. **Test mobile.** Most traffic comes from phones with far slower CPUs than your laptop.
3. **Test more than once.** A single run can mislead you because of network conditions.

## High-impact fixes, in order

### 1. Images — almost always the biggest culprit

Images typically account for 60–70% of page weight. The fixes:

- **Use modern formats.** WebP saves roughly 30% over JPEG; AVIF can do better. Provide fallbacks with `<picture>`.
- **Match the dimensions.** Never ship a 4000px image into an 800px slot.
- **Always set `width` and `height`.** This is what prevents CLS — the browser can reserve the space before the image arrives.
- **Lazy load below the fold** with `loading="lazy" decoding="async"`. Never lazy load the hero image; that actively hurts LCP.

```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  <img src="/images/hero.jpg" width="1200" height="675" alt="A clear description" />
</picture>
```

### 2. Fonts — the CLS cause people forget

Custom fonts make text flash or shift when the real font replaces the fallback.

- Self-host your fonts rather than calling a third-party server.
- Use `font-display: swap` so text is readable immediately.
- Preload the primary font: `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
- Limit how many weights you load. Two is usually plenty.
- Consider variable fonts — one file covers every weight.

### 3. JavaScript — the main driver of bad INP

Every kilobyte of JavaScript has to be downloaded, parsed, and executed. On a mid-range phone that execution step is expensive.

- Ship JavaScript only for components that are genuinely interactive.
- Defer third-party scripts (chat widgets, pixels, heatmaps) until after first interaction.
- Audit your dependencies. An 80 KB library to format a date is rarely worth it.
- Don't reach for a heavy framework on pages whose content is static.

This is why we default to Astro for marketing sites: pages ship as HTML, and JavaScript loads only for the interactive islands. The comparison lives in [Astro vs WordPress](/blog/en/astro-vs-wordpress-which-one-fits/).

### 4. CSS — stop blocking the render

- Inline the critical CSS for above-the-fold content.
- Delete unused CSS. Tailwind handles this automatically at build time.
- Avoid chained `@import` in CSS — each one adds a network round trip.

### 5. Hosting and delivery

- **Enable compression** — Brotli or Gzip at the server.
- **Set long cache headers** on hashed assets.
- **Use a CDN** if your visitors are geographically spread.
- **Pick a server region near your users.** For the Indonesian market, Singapore or Jakarta is noticeably better. More detail in the [hosting guide](/blog/en/choosing-hosting-for-a-business-website/).

## Ad slots and third-party scripts

If your site runs ads or third-party widgets, two rules are non-negotiable:

1. **Reserve the space first.** Give every unit a fixed minimum height so content doesn't jump when the ad loads. It's the only way to keep CLS low with ads enabled.
2. **Load them async.** An ad script must never block page rendering.

## The working order we use

1. Measure a baseline with mobile PageSpeed Insights. Write the numbers down.
2. Fix images — this alone usually moves LCP significantly.
3. Fix fonts and add explicit dimensions to all media.
4. Trim JavaScript and defer third-party scripts.
5. Turn on compression and caching at the server.
6. Re-measure and compare against the baseline.
7. Watch field data in Search Console over the next 28 days.

## Common mistakes

- **Optimising the desktop Lighthouse score.** Google uses mobile data.
- **Chasing a perfect 100.** Going 95 → 100 is invisible to users; 40 → 90 is transformative.
- **Installing a cache plugin and calling it done.** Caching hides problems, it doesn't remove them.
- **Forgetting every page except the homepage.** Product and article pages are usually heavier.

## Realistic targets

For a business website, these are worth chasing and genuinely achievable:

- Mobile LCP under 2.5 seconds on 4G
- INP under 200 ms
- CLS under 0.05
- First-load page weight under 1 MB

If your site is far from those numbers and you want help closing the gap, [see our performance services](/#services) or [tell us what you're running](/#cta).
