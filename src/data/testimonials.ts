export interface Testimonial {
  heading: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  /** Personal avatar (headshot). Optional — falls back to initials. */
  avatar?: string;
  /** Client company logo or hero image displayed inside the card. */
  companyImage?: string;
}

export const testimonials: Testimonial[] = [
  {
    heading: 'Trusted long-term collaborator.',
    quote:
      'Giattech rebuilt our booking platform from scratch and shipped ahead of schedule. Two years later they are still our first call for anything that has to actually work under load.',
    name: 'Rina Halim',
    role: 'Operations Director',
    company: 'Bintan Prestige',
    companyUrl: 'https://bintanprestige.com',
    avatar: '/images/testimonial-rina.avif',
    companyImage: '/images/testimonials/company-bintan-prestige.jpg',
  },
  {
    heading: 'They think in outcomes, not tickets.',
    quote:
      'What surprised me most was the questions they asked before writing a line of code. The dashboard they delivered changed how our team plans the week.',
    name: 'Damar Wibisono',
    role: 'Co-founder',
    company: 'Prima Logistik',
    avatar: '/images/testimonial-damar.avif',
    companyImage: '/images/testimonials/company-prima-logistik.jpg',
  },
  {
    heading: 'Serious engineering, without the ego.',
    quote:
      'Clean code, clear commits, and honest estimates. When something took longer than expected we knew about it early — never a Friday-night surprise.',
    name: 'Sarah Anggraini',
    role: 'Product Manager',
    company: 'Kelola Studio',
    avatar: '/images/testimonial-sarah.avif',
    companyImage: '/images/testimonials/company-kelola-studio.jpg',
  },
  {
    heading: 'The site finally matches our brand.',
    quote:
      'Our old site was slow and looked five years old. The new one loads instantly, ranks better on Google, and I actually enjoy sending the link.',
    name: 'Yudha Pratama',
    role: 'Marketing Lead',
    company: 'Rimba Kopi',
    avatar: '/images/testimonial-yudha.avif',
    companyImage: '/images/testimonials/company-rimba-kopi.jpg',
  },
  {
    heading: 'Booking flow that finally converts.',
    quote:
      'They untangled our old channel-manager mess and built a direct-booking site that has doubled our repeat guests. Support responses are same-day, every time.',
    name: 'Made Sudiarta',
    role: 'General Manager',
    company: 'Villa Anantara Bali',
    companyImage: '/images/testimonials/company-villa-anantara.jpg',
  },
  {
    heading: 'A rare mix of speed and taste.',
    quote:
      'Most agencies pick one — either they ship fast or the design looks good. Giattech gave us both, and the handover docs meant our in-house team could keep building.',
    name: 'Alifia Rahman',
    role: 'Head of Growth',
    company: 'Nusantara Retail Co.',
    companyImage: '/images/testimonials/company-nusantara-retail.jpg',
  },
];
