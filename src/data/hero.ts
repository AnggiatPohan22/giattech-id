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
  headline: string[];
  subheadline: string;
  stats: HeroStat[];
  ctas: HeroCta[];
  tags: string[];
}

export const hero: HeroContent = {
  headline: ['Web Apps,', 'Built Differently'],
  subheadline:
    'Giattech is a small studio building fast, reliable Laravel applications and marketing sites for teams that care how it actually runs.',
  stats: [
    { value: 40, suffix: '+', label: 'Projects Shipped' },
    { value: 8, suffix: ' yrs', label: 'Building for the Web' },
  ],
  ctas: [
    { label: 'Book a Call', href: '#cta', variant: 'primary' },
    { label: 'Our Work', href: '#projects', variant: 'outline' },
  ],
  tags: ['Laravel', 'Astro', 'Full-Stack', 'Performance', 'AI-Assisted', 'Indonesia'],
};
