export interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
  /** Optional logo image shown beside the value (e.g. brand mark) */
  logo?: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: 'primary' | 'outline';
}

export interface HeroNavLink {
  label: string;
  href: string;
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
  /** Portrait image (drop your real photo at this path to replace it) */
  portrait: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const hero: HeroContent = {
  brandWord: 'GIAT',
  headline: ['Web Dev,', 'Freelance IT &', 'Manage Villa OTA'],
  subheadline:
    'Working closely with your team to deliver web builds, IT support, and villa OTA management that merge creativity, technical excellence, and long-term value.',
  corner: ['The Web & IT Studio.', "That's Giattech."],
  stats: [
    { value: 27, suffix: '+', label: 'Projects', logo: '/images/logo-white.png' },
    { value: 4, suffix: '+', label: 'Years of experience' },
  ],
  ctas: [
    { label: 'Book a Call', href: '#cta', variant: 'primary' },
    { label: 'About Me', href: '#about', variant: 'outline' },
  ],
  traits: ['Creative', 'Reliable', 'Strategist', 'Builder', 'Efficient'],
  portrait: {
    src: '/images/hero-1.png',
    alt: 'Giattech founder portrait',
    width: 1080,
    height: 1080,
  },
};

/** Nav links rendered inside the hero (desktop) — split left/right of the portrait */
export const heroNavLeft: HeroNavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About Me', href: '#about' },
  { label: 'What You Get', href: '#services' },
];

export const heroNavRight: HeroNavLink[] = [
  { label: 'Services', href: '#pricing' },
  { label: 'Clients', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];
