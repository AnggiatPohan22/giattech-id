export type ServiceIcon =
  | 'code'
  | 'layout'
  | 'plug'
  | 'gauge'
  | 'sparkle'
  | 'life-buoy';

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: 'code',
    title: 'Web Application Development',
    description:
      'Custom Laravel applications built for scale — from data-heavy dashboards to complex booking systems, engineered around your workflow, not a template.',
  },
  {
    icon: 'layout',
    title: 'CMS & Admin Dashboard',
    description:
      'Tailored admin panels with clean role-based access, real-time updates, and content models your team can actually use without training.',
  },
  {
    icon: 'plug',
    title: 'API Development & Integration',
    description:
      'REST or GraphQL APIs that other systems can trust — versioned, documented, and hardened against the messy real world of payment and shipping providers.',
  },
  {
    icon: 'gauge',
    title: 'Performance & SEO Optimization',
    description:
      'Turn slow Laravel or WordPress sites into 95+ Lighthouse scores. Real-user metrics, image pipeline, cache strategy, and structured data — the boring wins.',
  },
  {
    icon: 'sparkle',
    title: 'Creative & Interactive Motion',
    description:
      'GSAP-driven scroll experiences, micro-interactions, and marketing sites that feel handcrafted — without hurting Core Web Vitals or accessibility.',
  },
  {
    icon: 'life-buoy',
    title: 'Ongoing Support & Maintenance',
    description:
      'Monthly retainers for hosting, updates, small features, and on-call fixes. Predictable hours, direct communication, no ticket queues.',
  },
];
