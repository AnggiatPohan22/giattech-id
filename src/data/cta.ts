/**
 * CTA section content — headline, buttons, logo option, and the
 * decorative behind-the-scenes frame gallery in the background.
 *
 * ── LOGO ─────────────────────────────────────────────────────────
 * Set `logo` to a file path to swap the "Gt" text badge for your own
 * mark. Leave undefined to keep the text fallback.
 *
 *   logo: { src: '/images/cta/my-logo.png', alt: 'My studio' }
 *
 * ── FRAMES ───────────────────────────────────────────────────────
 * Each frame is a small floating rectangle inside the CTA card that
 * cycles through 2–3 BTS/project images with its own transition.
 *
 * Available transitions (each has a distinct visual feel):
 *   fade       — soft crossfade
 *   slide-left | slide-right | slide-up | slide-down
 *   zoom-in    — scale up from ~0.75
 *   flip       — 3D rotateY flip
 *   blur       — blur + fade
 *   swipe      — reveal via clip-path
 *
 * Positions are % of the CTA card (top/left/right/bottom). The card
 * has overflow:hidden so frames near edges get gracefully clipped.
 *
 * Rekomendasi ukuran gambar: 480×320 (3:2) atau 400×300, format
 * AVIF/WebP untuk file size kecil. Taruh di `public/images/cta/`.
 */

export interface CtaLogo {
  src: string;
  alt: string;
}

export type CtaFrameTransition =
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'zoom-in'
  | 'flip'
  | 'blur'
  | 'swipe';

export interface CtaFrame {
  /** 2–3 image paths — cycled in order */
  images: string[];
  /** Transition style — see list above */
  transition: CtaFrameTransition;
  /** How long each image stays before switching (ms). Default 4000 */
  interval?: number;
  /** Transition duration (ms). Default 700 */
  duration?: number;
  /** Delay before this frame starts cycling (ms) — stagger them */
  startDelay?: number;
  /** Absolute position within the CTA card, in CSS values (%, px, rem) */
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  /** Frame width & height (CSS values) */
  width: string;
  height: string;
  /** Tilt angle in degrees (positive = clockwise) */
  rotation?: number;
  /** Optional opacity for the whole frame (0..1). Default 1 */
  opacity?: number;
}

export interface CtaContent {
  logo?: CtaLogo;
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  footnote: string;
  frames: CtaFrame[];
}

import { contact } from '../config/site';

export const ctaContent: CtaContent = {
  // Uncomment and set the src to use a real logo image.
   logo: { src: '/images/cta/logo-blue.png', alt: 'Giattech logo' },

  eyebrow: "Let's Build",
  heading: 'Have Something in Mind?',
  description:
    "Tell us about the platform, the migration, the marketing site — or the problem you keep patching around. We'll come back with an honest read on how to solve it.",
  // Primary CTA points to WhatsApp when configured (Indonesian
  // businesses default there); falls back to email otherwise.
  primaryCta: {
    label: "Let's Talk",
    href: contact.whatsappHref || contact.emailHref,
  },
  secondaryCta: { label: 'See Our Work', href: '#projects' },
  footnote: 'Reply within 1 business day · Free discovery call · No pressure',

  frames: [
    // Top-left — showcases full-stack development (code → dashboard → live site)
    {
      images: [
        '/images/cta/bts-code.svg',
        '/images/cta/bts-dashboard.svg',
        '/images/cta/bts-website.svg',
      ],
      transition: 'fade',
      interval: 4200,
      duration: 700,
      startDelay: 0,
      position: { top: '3%', left: '15%' },
      width: '210px',
      height: '140px',
      rotation: -8,
    },
    // Top-right — devops & mobile
    {
      images: ['/images/cta/bts-terminal.svg', '/images/cta/bts-mobile.svg'],
      transition: 'slide-right',
      interval: 5000,
      duration: 800,
      startDelay: 700,
      position: { top: '3%', right: '5%' },
      width: '240px',
      height: '160px',
      rotation: 14,
    },
    // Middle-right — OTA / design / performance trilogy
    {
      images: [
        '/images/cta/bts-booking.svg',
        '/images/cta/bts-wireframe.svg',
        '/images/cta/bts-lighthouse.svg',
      ],
      transition: 'zoom-in',
      interval: 4600,
      duration: 750,
      startDelay: 1400,
      position: { top: '40%', right: '0%' },
      width: '195px',
      height: '145px',
      rotation: -6,
    },
    // Middle-left — mobile <-> dashboard blur crossfade
    {
      images: ['/images/cta/bts-mobile.svg', '/images/cta/bts-dashboard.svg'],
      transition: 'blur',
      interval: 5400,
      duration: 900,
      startDelay: 2100,
      position: { top: '32%', left: '1%' },
      width: '165px',
      height: '190px',
      rotation: 5,
    },
    // Bottom-left tilted — perf story (score → code → deploy)
    {
      images: [
        '/images/cta/bts-lighthouse.svg',
        '/images/cta/bts-code.svg',
        '/images/cta/bts-terminal.svg',
      ],
      transition: 'flip',
      interval: 4800,
      duration: 800,
      startDelay: 2800,
      position: { bottom: '1%', left: '3%' },
      width: '225px',
      height: '150px',
      rotation: -12,
    },
    // Bottom-right — villa OTA end-to-end
    {
      images: ['/images/cta/bts-website.svg', '/images/cta/bts-booking.svg'],
      transition: 'slide-up',
      interval: 4400,
      duration: 700,
      startDelay: 3500,
      position: { bottom: '6%', right: '8%' },
      width: '200px',
      height: '135px',
      rotation: 8,
    },
    // Center peek — soft overlay behind the CTA content
    {
      images: ['/images/cta/bts-wireframe.svg', '/images/cta/bts-dashboard.svg'],
      transition: 'swipe',
      interval: 5200,
      duration: 850,
      startDelay: 4200,
      position: { top: '52%', left: '52%' },
      width: '170px',
      height: '120px',
      rotation: -4,
      opacity: 0.15,
    },
  ],
};
