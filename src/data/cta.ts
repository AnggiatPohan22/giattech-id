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

export const ctaContent: CtaContent = {
  // Uncomment and set the src to use a real logo image.
  // logo: { src: '/images/cta/logo.png', alt: 'Giattech logo' },

  eyebrow: "Let's Build",
  heading: 'Have Something in Mind?',
  description:
    "Tell us about the platform, the migration, the marketing site — or the problem you keep patching around. We'll come back with an honest read on how to solve it.",
  primaryCta: { label: "Let's Talk", href: 'mailto:hello@giattech.com' },
  secondaryCta: { label: 'See Our Work', href: '#projects' },
  footnote: 'Reply within 1 business day · Free discovery call · No pressure',

  frames: [
    // Top-left horizontal card
    {
      images: [
        '/images/cta/bts-1a.jpg',
        '/images/cta/bts-1b.jpg',
        '/images/cta/bts-1c.jpg',
      ],
      transition: 'fade',
      interval: 4200,
      duration: 700,
      startDelay: 0,
      position: { top: '8%', left: '4%' },
      width: '190px',
      height: '120px',
      rotation: -8,
    },
    // Top-right bigger card
    {
      images: ['/images/cta/bts-2a.jpg', '/images/cta/bts-2b.jpg'],
      transition: 'slide-right',
      interval: 5000,
      duration: 800,
      startDelay: 700,
      position: { top: '3%', right: '5%' },
      width: '230px',
      height: '145px',
      rotation: 14,
    },
    // Middle-right medium card
    {
      images: [
        '/images/cta/bts-3a.jpg',
        '/images/cta/bts-3b.jpg',
        '/images/cta/bts-3c.jpg',
      ],
      transition: 'zoom-in',
      interval: 4600,
      duration: 750,
      startDelay: 1400,
      position: { top: '38%', right: '2%' },
      width: '175px',
      height: '135px',
      rotation: -6,
    },
    // Middle-left tall-ish
    {
      images: ['/images/cta/bts-4a.jpg', '/images/cta/bts-4b.jpg'],
      transition: 'blur',
      interval: 5400,
      duration: 900,
      startDelay: 2100,
      position: { top: '32%', left: '1%' },
      width: '150px',
      height: '175px',
      rotation: 5,
    },
    // Bottom-left tilted
    {
      images: [
        '/images/cta/bts-5a.jpg',
        '/images/cta/bts-5b.jpg',
        '/images/cta/bts-5c.jpg',
      ],
      transition: 'flip',
      interval: 4800,
      duration: 800,
      startDelay: 2800,
      position: { bottom: '4%', left: '6%' },
      width: '210px',
      height: '135px',
      rotation: -12,
    },
    // Bottom-right small
    {
      images: ['/images/cta/bts-6a.jpg', '/images/cta/bts-6b.jpg'],
      transition: 'slide-up',
      interval: 4400,
      duration: 700,
      startDelay: 3500,
      position: { bottom: '6%', right: '8%' },
      width: '180px',
      height: '120px',
      rotation: 8,
    },
    // Middle overlap (peeking behind CTA content)
    {
      images: ['/images/cta/bts-7a.jpg', '/images/cta/bts-7b.jpg'],
      transition: 'swipe',
      interval: 5200,
      duration: 850,
      startDelay: 4200,
      position: { top: '52%', left: '52%' },
      width: '160px',
      height: '110px',
      rotation: -4,
      opacity: 0.55,
    },
  ],
};
