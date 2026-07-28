import { contact, social } from '../config/site';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email' | 'instagram' | 'whatsapp';
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

/**
 * Social links — sourced from .env via src/config/site.ts. Any entry
 * whose env var is empty is filtered out here, so the footer / sidebar
 * only render icons for channels the user actually has configured.
 */
export const socialLinks: SocialLink[] = [
  social.github    && { label: 'GitHub',     href: social.github,               icon: 'github'    },
  social.linkedin  && { label: 'LinkedIn',   href: social.linkedin,             icon: 'linkedin'  },
  social.twitter   && { label: 'X / Twitter', href: social.twitter,             icon: 'twitter'   },
  social.instagram && { label: 'Instagram',  href: social.instagram,            icon: 'instagram' },
  contact.whatsappHref && { label: 'WhatsApp', href: contact.whatsappHref,      icon: 'whatsapp'  },
                       { label: 'Email',      href: contact.emailHref,          icon: 'email'     },
].filter(Boolean) as SocialLink[];

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
