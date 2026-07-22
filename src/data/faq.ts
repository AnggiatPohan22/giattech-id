export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What is your typical process from first call to launch?',
    answer:
      'A short discovery call, a written scope with milestones, then two-week build cycles with a working preview at the end of each cycle. You get review windows built into the plan, not tacked on at the end. Launch is a small event, not a big one — because staging has already looked exactly like production for weeks.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'Fixed price for defined scopes (Starter Build), monthly retainer for ongoing work, and quotes for anything custom. You always know what a change costs before it happens. No hourly billing surprises at the end of the month.',
  },
  {
    question: 'What technologies do you primarily work with?',
    answer:
      'Laravel and PHP for backend, TypeScript with Astro, Vue, or React on the frontend, Tailwind for styling, and MySQL or PostgreSQL for data. When AI helps the workflow — code review, refactors, doc generation — we lean on it, but every commit is human-reviewed.',
  },
  {
    question: 'How many revisions are included?',
    answer:
      'Unlimited revisions inside the agreed scope during the review windows for each milestone. Scope changes are quoted separately so pricing stays honest and predictable for both sides.',
  },
  {
    question: 'What is a typical project timeline?',
    answer:
      'A marketing site or landing page: two to three weeks. A CMS-backed platform: six to ten weeks. A full custom web application: three to four months. Every timeline includes a buffer for review cycles and QA — we do not ship on Fridays.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes — every project ships with 30 days of post-launch support included. After that most clients move to a monthly retainer for hosting, updates, small features, and priority response. You can also engage us project-by-project without a retainer.',
  },
  {
    question: 'Can you work with our existing team or codebase?',
    answer:
      'Often, yes. We take on rescue work, audits, and joint builds with in-house developers. Before committing we do a short paid discovery so both sides know what we are stepping into.',
  },
  {
    question: 'Where are you based and how do you handle timezones?',
    answer:
      'We are based in Indonesia (UTC+7) but work asynchronously with clients across Asia, Australia, and Europe. Weekly video call, daily written updates, and a shared board — you never have to guess where a project stands.',
  },
];
