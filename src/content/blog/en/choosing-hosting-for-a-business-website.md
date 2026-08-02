---
title: "Choosing Hosting for a Business Website: A Jargon-Free Guide"
description: "How to pick the right hosting: shared vs VPS vs static platforms, why server location matters for the Indonesian market, and a checklist before you buy."
lang: en
slug: choosing-hosting-for-a-business-website
translationKey: hosting-indonesia
category: teknologi-tools
tags: ["Hosting", "VPS", "Cloudflare", "Infrastructure", "Uptime"]
publishDate: 2026-04-28
author: Giattech
cover: /images/blog/choosing-hosting-for-your-business-giattech.webp
coverAlt: "Choosing Hosting for a Business Website: A Jargon-Free Guide"
---

Hosting feels like a boring decision right up until your site falls over on campaign day. This article explains the options in language you can make a decision with, rather than the language of a sales page.

## The four hosting types worth knowing

### Shared hosting

Your site shares one server with hundreds of others. Cheap, easy, and genuinely enough for many business websites.

**Good for:** company profile sites, blogs, portfolios, static sites.
**Limits:** performance is affected by your neighbours, and configuration control is limited.
**Price:** IDR 500,000 – 2,500,000 per year.

### VPS

You get a guaranteed slice of resources and full control over configuration.

**Good for:** Laravel applications, anything with a database, and medium-to-high traffic sites.
**Limits:** you need someone who can administer a server — or buy the managed version.
**Price:** IDR 3,000,000 – 15,000,000 per year depending on spec and management level.

### Static platforms (Cloudflare Pages, Netlify, Vercel)

For sites built into static files, these serve them from a global network. Often free at small-to-medium traffic.

**Good for:** Astro, static Next.js, Hugo, and similar.
**Limits:** they don't run PHP or MySQL.
**Price:** free up to roughly IDR 3,000,000 per year.

### Managed platforms (Forge + a server, Ploi, Laravel Cloud)

A layer that handles setup, deploys, SSL certificates, and backups on top of your VPS.

**Good for:** teams running Laravel without a dedicated sysadmin.
**Price:** VPS cost plus roughly IDR 200,000 – 500,000 per month.

## Server location: the most ignored factor

Data moves at a finite speed. A server in the United States adds roughly 200–300 ms per round trip for a visitor in Indonesia. On a page with many requests, that's clearly felt.

For the Indonesian market, the sensible order:

1. **Jakarta** — best for Indonesian visitors
2. **Singapore** — excellent, the most common choice, better pricing
3. **Hong Kong / Tokyo** — still reasonable
4. **Europe / US** — avoid unless your visitors are actually there

A CDN shrinks this problem for images and static assets, but not for requests that must reach the origin server — logging in or checking out, for example.

## What to actually check before buying

**Uptime.** Look for a 99.9% commitment or better. The gap between 99% and 99.9% is seven hours versus 43 minutes of downtime per month.

**Backups.** How often, retained how long, and most importantly: can you restore them yourself without opening a ticket?

**SSL.** Must be included and auto-renewing. Let's Encrypt is free — there's no reason to pay a lot for a basic certificate.

**Support.** Test it before you buy. Send one technical question to their live chat and see how long it takes, and whether the answer is useful.

**Resource limits.** "Unlimited" is never unlimited. Look for inode limits, process counts, and I/O caps in the terms of service.

**Ease of leaving.** Is there SSH access? Can you export the database yourself? If not, you're locked in.

**Renewal price.** This is the most common trap: IDR 500,000 the first year, IDR 2,000,000 on renewal. Always check the renewal rate.

## Cloudflare: almost always worth adding

For most sites, putting Cloudflare in front of your hosting gives a lot for zero cost:

- A global CDN for static assets
- SSL certificates
- Basic DDoS protection
- Analytics that don't need a script on the page
- Fast DNS

One thing to watch: when using proxy mode, set the SSL setting to *Full (strict)* so the connection to your origin stays encrypted.

## Recommendation by project type

| Project type | Recommendation |
| --- | --- |
| Static site (Astro, Hugo) | Cloudflare Pages, or shared hosting + Cloudflare |
| Small-to-medium WordPress | Good shared hosting, Singapore region, + Cloudflare |
| High-traffic WordPress | Managed WordPress hosting |
| Laravel application | Managed VPS, Singapore region |
| Online store | VPS or managed hosting — not shared |

## When it's time to upgrade

Signs your hosting has run out of room:

- Server response time (TTFB) consistently above 600 ms
- The site slows down at peak hours
- Occasional 503 or 508 errors
- Resource-usage warnings from your provider
- Backups failing because the database is too large

If three or more of those are happening, migrating is cheaper than continuing to patch.

## Common mistakes

- **Buying a three-year plan from an untested provider.** Take one year first.
- **Never testing a restore.** A backup you've never restored is not a backup.
- **Handing the hosting account to your vendor.** Same as the domain — register it in your own name.
- **Choosing purely on price.** A IDR 1 million annual difference doesn't cover one day of downtime in peak season.
- **Forgetting email.** Email on shared hosting often has deliverability problems. Use a separate email service for a business domain.

## A short pre-purchase checklist

- [ ] Server located in Singapore or Jakarta
- [ ] 99.9% uptime commitment
- [ ] Daily backups with self-service restore
- [ ] Free, automatic SSL
- [ ] SSH access, or at minimum a full file manager
- [ ] Renewal price known up front
- [ ] Account in your company's name
- [ ] Support tested before paying

If you want help choosing or migrating hosting without downtime, [we can help](/#services). For the overall cost picture of a web project, see [how much a website costs](/blog/en/how-much-does-a-website-cost-in-indonesia/).
