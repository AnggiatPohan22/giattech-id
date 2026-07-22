export interface PricingPlan {
  slug: 'support' | 'starter' | 'custom';
  name: string;
  price: string;
  priceSuffix?: string;
  tagline: string;
  featured?: boolean;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
}

export const pricingPlans: PricingPlan[] = [
  {
    slug: 'support',
    name: 'Ongoing Support',
    price: '$1,200',
    priceSuffix: '/month',
    tagline: 'For live sites that need a reliable technical partner.',
    features: [
      '20 hours of development time per month',
      'Bug fixes, updates, and small feature work',
      'Managed hosting & backups',
      'Monthly performance & SEO report',
      'Priority Slack + email response',
      'Rollover of up to 5 hours',
    ],
    cta: {
      label: 'Start Support',
      href: '#cta',
    },
  },
  {
    slug: 'starter',
    name: 'Starter Build',
    price: '$4,800',
    priceSuffix: 'fixed',
    tagline: 'A polished marketing site or focused landing page.',
    featured: true,
    features: [
      'Up to 6 pages, fully custom design',
      'Astro or Laravel + Tailwind stack',
      'CMS with your content model',
      'Basic on-page SEO & analytics setup',
      '95+ Lighthouse guarantee',
      '2 rounds of revisions per milestone',
      '30 days of post-launch support',
    ],
    cta: {
      label: 'Book a Call',
      href: '#cta',
    },
  },
  {
    slug: 'custom',
    name: 'Custom Project',
    price: "Let's Talk",
    tagline: 'Full web applications, platforms, and rescue work.',
    features: [
      'Discovery workshop & written scope',
      'Two-week build cycles with previews',
      'Dedicated Laravel backend & API layer',
      'Advanced integrations (payments, ERP, etc.)',
      'Role-based admin dashboards',
      'DevOps: staging, CI/CD, monitoring',
      'Handover documentation & training',
    ],
    cta: {
      label: 'Request a Quote',
      href: '#cta',
    },
  },
];
