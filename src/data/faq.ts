export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What industries do you work with?',
    answer:
      'We work with a variety of industries, including hospitality, e-commerce, SaaS, and more. Our team has experience in building solutions for different business needs and challenges.',
  },
  {
    question: 'Do you provide customized solutions?',
    answer:
      'Yes, we provide customized solutions tailored to your specific requirements. We work closely with our clients to understand their needs and deliver solutions that meet their goals.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Depending on the complexity and scope of the project, timelines can vary. A simple website may take a few weeks, while a more complex application could take several months. We provide detailed project timelines during the planning phase.',
  },
  {
    question: 'What type of websites do you build?',
    answer:
      'We build a wide range of websites, including marketing sites, e-commerce platforms, content management systems (CMS), and custom web applications. Our team is skilled in various technologies to deliver the best solution for your needs.',
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
      'We are based in Indonesia (UTC+8) based in Nusa Ceningan Bali',
  },
];
