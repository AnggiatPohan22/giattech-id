export interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: 'primary' | 'outline';
}

export interface HeroContent {
  /** Giant background word rendered behind the portrait */
  brandWord: string;
  headline: string[];
  subheadline: string;
  /** Small two-line signature in the bottom-left corner */
  corner: [string, string];
  stats: HeroStat[];
  ctas: HeroCta[];
  /** Vertical keyword card on the right side */
  traits: string[];
  /** Portrait image (drop your real photo at this path to replace the placeholder) */
  portrait: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const hero: HeroContent = {
  brandWord: 'GIAT',
  headline: ['Web Apps,', 'Built', 'Differently.'],
  subheadline:
    'Working closely with your team to deliver Laravel and Astro builds that merge creativity, technical excellence, and long-term value.',
  corner: ['The Web App Studio.', "That's Giattech."],
  stats: [
    { value: 40, suffix: '+', label: 'Projects' },
    { value: 8, suffix: '+', label: 'Years of experience' },
  ],
  ctas: [
    { label: 'Book a Call', href: '#cta', variant: 'primary' },
    { label: 'About Us', href: '#about', variant: 'outline' },
  ],
  traits: ['Creative', 'Reliable', 'Full-Stack', 'Performance', 'AI-Assisted'],
  portrait: {
    src: '/images/hero-portrait.svg',
    alt: 'Giattech founder portrait',
    width: 600,
    height: 760,
  },
};

/** Nav links rendered inside the hero (desktop) — split left/right of the portrait */
export const heroNavLeft = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
];

export const heroNavRight = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
];
