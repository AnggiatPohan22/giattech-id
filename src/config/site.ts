/**
 * ─────────────────────────────────────────────────────────────
 *  Central site config
 * ─────────────────────────────────────────────────────────────
 *
 * Every value here comes from `.env` (see `.env.example` at the
 * project root for the full list). This module gives components
 * a single typed import for identity, contact, socials, and
 * analytics — so nobody hard-codes an email address, a WhatsApp
 * number, or a domain in a component ever again.
 *
 *   import { site, contact, social } from '../config/site';
 *
 * The .env file is baked in at build time (`npm run build`);
 * runtime env changes won't do anything to the deployed static
 * output — you must rebuild after editing .env.
 */

// Vite exposes PUBLIC_* env vars on import.meta.env. Non-prefixed
// vars stay server-only (safe for secrets), but we don't need any
// of those here — this is all client-visible marketing data.
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;

function read(name: string, fallback = ''): string {
  const value = env[name];
  return value && value.trim() !== '' ? value : fallback;
}

/** Brand & SEO defaults consumed by Layout.astro and any page overrides. */
export const site = {
  name:        read('PUBLIC_SITE_NAME', 'Giattech'),
  tagline:     read('PUBLIC_SITE_TAGLINE', 'Web Application Studio'),
  url:         read('PUBLIC_SITE_URL', 'https://giattech.com'),
  description: read(
    'PUBLIC_SITE_DESCRIPTION',
    'Digital agency building high-performance web applications with Laravel, modern frontend, and AI-assisted development.'
  ),
  ogImage:     read('PUBLIC_OG_IMAGE', '/images/og-image.jpg'),
  /** "Giattech — Web Application Studio" — the browser tab default */
  get title() { return `${this.name} — ${this.tagline}`; },
} as const;

/** Contact channels — email + WhatsApp with pre-baked click-to-open hrefs. */
export const contact = (() => {
  const email = read('PUBLIC_EMAIL', 'hello@giattech.com');
  const waNumber = read('PUBLIC_WHATSAPP_NUMBER');
  const waMessage = read('PUBLIC_WHATSAPP_MESSAGE');
  return {
    email,
    emailHref: `mailto:${email}`,
    whatsappNumber: waNumber,
    whatsappMessage: waMessage,
    /** wa.me link — empty string if no number configured, so callers can guard with `if (…)` */
    whatsappHref: waNumber
      ? `https://wa.me/${waNumber}${waMessage ? `?text=${encodeURIComponent(waMessage)}` : ''}`
      : '',
  };
})();

/** Social handles — only entries with a non-empty URL should be rendered. */
export const social = {
  linkedin:  read('PUBLIC_LINKEDIN_URL'),
  twitter:   read('PUBLIC_TWITTER_URL'),
  github:    read('PUBLIC_GITHUB_URL'),
  instagram: read('PUBLIC_INSTAGRAM_URL'),
} as const;

/** Analytics — either provider empty string means "disabled". */
export const analytics = {
  gaId:            read('PUBLIC_GA_MEASUREMENT_ID'),
  plausibleDomain: read('PUBLIC_PLAUSIBLE_DOMAIN'),
} as const;

/**
 * Google AdSense — used by the blog only.
 *
 * `client` is the ca-pub-XXXXXXXX publisher id. While it's empty the
 * AdSlot component renders a labelled, correctly-sized placeholder
 * instead of a real <ins> — so the layout (and Cumulative Layout
 * Shift) is identical before and after you're approved by AdSense.
 * Fill in the slot ids from the AdSense dashboard as you create each
 * unit; a slot with no id still renders a placeholder.
 */
export const adsense = {
  client: read('PUBLIC_ADSENSE_CLIENT'),
  slots: {
    blogTop:       read('PUBLIC_ADSENSE_SLOT_BLOG_TOP'),
    blogInline:    read('PUBLIC_ADSENSE_SLOT_BLOG_INLINE'),
    blogBottom:    read('PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM'),
    articleTop:    read('PUBLIC_ADSENSE_SLOT_ARTICLE_TOP'),
    articleInline: read('PUBLIC_ADSENSE_SLOT_ARTICLE_INLINE'),
    articleBottom: read('PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM'),
    sidebar:       read('PUBLIC_ADSENSE_SLOT_SIDEBAR'),
  },
  /** True once a publisher id exists — gates the adsbygoogle loader script. */
  get enabled() { return this.client !== ''; },
} as const;

export type AdSlotName = keyof typeof adsense.slots;
