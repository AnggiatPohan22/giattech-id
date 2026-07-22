export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email';
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#cta' },
];

export const primaryCta: NavLink = {
  label: 'Book a Call',
  href: '#cta',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/AnggiatPohan22', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'X / Twitter', href: 'https://x.com/', icon: 'twitter' },
  { label: 'Email', href: 'mailto:hello@giattech.com', icon: 'email' },
];

export const sidebarSections = [
  'hero',
  'about',
  'services',
  'projects',
  'pricing',
  'testimonials',
  'faq',
] as const;

export type SidebarSection = (typeof sidebarSections)[number];
