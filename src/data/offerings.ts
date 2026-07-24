import type { ServiceIcon } from './services';

/** Service offerings that Giattech sells — surfaced in the Services section */
export interface Offering {
  icon: ServiceIcon;
  title: string;
  tagline: string;
  bullets: string[];
}

export const offerings: Offering[] = [
  {
    icon: 'code',
    title: 'Web Development',
    tagline:
      'Custom marketing sites, dashboards, and Laravel applications engineered around your workflow — not a template.',
    bullets: [
      'Astro / Laravel / TypeScript stack',
      'CMS + admin panels',
      '95+ Lighthouse scores',
    ],
  },
  {
    icon: 'life-buoy',
    title: 'IT Support',
    tagline:
      'Monthly retainers or on-call fixes for teams that need a reliable technical partner without hiring in-house.',
    bullets: [
      'Hosting, backups & monitoring',
      'Bug fixes + small features',
      'Priority Slack / email response',
    ],
  },
  {
    icon: 'sparkle',
    title: 'IT Freelance',
    tagline:
      'Short-term project bursts — integrations, migrations, audits, or filling a temporary gap in your dev team.',
    bullets: [
      'Fixed-scope or hourly',
      'API + payment integrations',
      'Codebase audits & rescue work',
    ],
  },
  {
    icon: 'plug',
    title: 'OTA Villa & Hotel',
    tagline:
      'End-to-end online distribution for villas and boutique hotels — listings, channel manager, and booking flow.',
    bullets: [
      'Airbnb / Booking / Agoda setup',
      'Channel manager integration',
      'Direct booking website + PMS',
    ],
  },
];
