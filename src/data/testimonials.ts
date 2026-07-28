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
    heading: 'Recommendation build website and booking flow.',
    quote:
      'Giattech built our website and booking flow from scratch. They are very responsive and always available to answer questions. I highly recommend them.',
    name: 'Deden Kurniawan',
    role: 'Owner',
    company: 'Bintan Prestige Transport',
    companyUrl: 'https://bintanprestigetransport.com',
    avatar: '/images/bintan-prestige-icon.png',
    companyImage: '/images/testimonials/bintan-prestige.webp',
  },
  {
    heading: 'Created Restaurant website and booking flow.',
    quote:
      'what I like about Giattech is that they are very responsive and always available to answer questions. I highly recommend them.',
    name: 'Bli Noe',
    role: 'Owner',
    company: 'Casa Bambu Cantina',
    companyUrl: 'https://casabambucantina.com',
    avatar: '/images/CBC.ico',
    companyImage: '/images/testimonials/cbc-1.webp',
  },
  {
    heading: 'Good Service Network Problem Solving.',
    quote:
      'On Call Service, Good Service Network Problem Solving, and Good Communication. I highly recommend Giattech.',
    name: 'Pak Putu',
    role: 'General Manager',
    company: 'Segara Seaside Resort',
    avatar: '/images/segara-logo.png',
    companyImage: '/images/testimonials/segara-1.jpg',
  },
  {
    heading: 'Simple Website, fast and responsive.',
    quote:
      'Affordable prices for a simple website, fast and responsive. I highly recommend Giattech.',
    name: 'Bang Gawi',
    role: 'Owner',
    company: 'Gotobintan.com',
    companyUrl: 'https://gotobintan.com',
    avatar: '/images/gotobintan.jpg',
    companyImage: '/images/testimonials/gotobintan-1.jpg',
  },
  {
    heading: 'Good Service overall and fast response.',
    quote:
      'Good solving problem with wi-fi and fast response. I highly recommend Giattech.',
    name: 'Paul Moisson',
    role: 'Owner',
    company: 'Lesterasses Villa',
    avatar: '/images/avatar.png',
    companyImage: '/images/testimonials/lesterasses.jpg',
  },
  {
    heading: 'I Request to fix my cctv at Restaurant and they fix it fast.',
    quote:
      'good service and fast response. I highly recommend Giattech.',
    name: 'Jeremy',
    role: 'Owner',
    company: 'La Kaban Restaurant',
    avatar: '/images/avatar.png',
    companyImage: '/images/testimonials/lakaban.webp',
  },
];
