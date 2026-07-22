export interface TimelineEntry {
  year: string;
  handle: string;
  timeLabel: string;
  title: string;
  short: string;
  full: string;
  tags: string[];
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  intro: string;
  timeline: TimelineEntry[];
}

export const about: AboutContent = {
  eyebrow: 'Start Small, Grow Big',
  heading: 'About Giattech (&)<br />The Journey',
  intro:
    'Eight years ago we opened a code editor for the first paid project. What happened after that is easier to show than explain.',
  timeline: [
    {
      year: '2017',
      handle: '@giattech',
      timeLabel: '8 years ago',
      title: 'First paid project — a coffee shop landing page',
      short:
        'Hand-coded HTML, a few PHP includes, and a shared hosting cPanel. It went live on a Friday afternoon and the owner still uses the domain today.',
      full: 'Learned three lessons that still shape how we work: understand the client before opening the editor, ship the smallest version that solves the actual problem, and set up a proper backup routine before anything else. The site was crude but honest — and it paid for the semester.',
      tags: ['PHP', 'HTML', 'cPanel'],
    },
    {
      year: '2019',
      handle: '@giattech',
      timeLabel: '6 years ago',
      title: 'Went full-time on Laravel platforms',
      short:
        'Left the office job to focus on building admin systems for small businesses — booking apps, inventory dashboards, reservation flows.',
      full: 'The move from copy-pasting PHP into a proper framework changed everything. Laravel forced good habits: migrations, tested logic, and API-first thinking. Two long-term clients from that year are still on retainer.',
      tags: ['Laravel', 'MySQL', 'Full-Stack'],
    },
    {
      year: '2022',
      handle: '@giattech',
      timeLabel: '3 years ago',
      title: 'Started shipping headless marketing sites',
      short:
        'Astro and Tailwind entered the workflow. Client marketing sites went from 65 Lighthouse scores to 95+ overnight.',
      full: 'Splitting the marketing surface from the Laravel backend meant editors got a clean CMS and visitors got a static site that loads instantly. This is now the default for most new engagements.',
      tags: ['Astro', 'Tailwind', 'Headless'],
    },
    {
      year: '2024',
      handle: '@giattech',
      timeLabel: '2 years ago',
      title: 'Added GSAP-driven motion to the toolkit',
      short:
        'Learned to design animation like a system, not decoration. Scroll-triggered reveals, staggered cards, restrained micro-interactions.',
      full: 'Motion is now part of the design brief, not tacked on at the end. Every animation is gated behind prefers-reduced-motion and profiled for Core Web Vitals — no more heavy libraries breaking the LCP budget.',
      tags: ['GSAP', 'ScrollTrigger', 'Motion Design'],
    },
    {
      year: '2026',
      handle: '@giattech',
      timeLabel: 'Now',
      title: 'AI-assisted engineering, human-reviewed shipping',
      short:
        'Every commit still goes through a human — but reviews, refactors, docs, and boilerplate lean on AI. Faster delivery without cutting corners.',
      full: 'We use large language models as pair programmers, not autopilots. The result: clients get more of our attention on the parts that matter (architecture, UX decisions, testing) instead of typing out the parts a machine can draft.',
      tags: ['AI-Assisted', 'Code Review', 'Automation'],
    },
  ],
};
