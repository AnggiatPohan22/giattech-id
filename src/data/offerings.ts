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
      'Astro / Laravel / Node or React / Vue',
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
      'Maintenance CCTV or website',
      'Fix bug network, server, or code issues',
      'Survey, audit, and recommend improvements',
    ],
  },
  {
    icon: 'sparkle',
    title: 'IT Freelance',
    tagline:
      'Short-term freelance work for Backup your IT at villa or hotel, or for your web or mobile app — from code audits to full-stack development.',
    bullets: [
      'Fixed-scope or hourly',
      'Manageable, well-documented code',
      'Freelance contract with NDA and IP assignment',
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
