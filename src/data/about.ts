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
    'Starting out as a freelancer in 2025, I brought a wealth of knowledge built from my college years to my work in the hospitality industry. What followed is better shown than explained.',
  timeline: [
    {
      year: '2022',
      handle: '@giattech',
      timeLabel: '4 years ago',
      title: 'First paid project — Landing page Tour Travel',
      short:
        'Built using clean PHP, CSS, and JavaScript for lightning-fast load times. Powered by reliable shared hosting with automated cPanel backups for complete peace of mind.',
      full: 'Optimized for Speed, Simplicity, and ReliabilityA custom-built website engineered for performance and effortless maintenance. By utilizing straightforward PHP, CSS, and JavaScript rather than heavy, bloated frameworks, the site remains lightweight, responsive, and exceptionally fast for visitors on any device. Hosted on an efficient shared hosting environment, it includes automated cPanel maintenance and backup systems to ensure your data stays secure and your site stays online around the clock.',
      tags: ['PHP', 'HTML', 'cPanel', 'JavaScript', 'SharedHosting'],
    },
    {
      year: '2023',
      handle: '@giattech',
      timeLabel: '3 years ago',
      title: 'Setup Network at outlet restaurant - Lagoi Bay Bintan',
      short:
        'Network & CCTV Infrastructure Setup — Lagoi Bay, Bintan Complete network installation and security setup for a restaurant outlet, including cable routing, CCTV with NVR configuration, and dual Ruijie Access Point deployment for seamless Wi-Fi coverage.',
      full: 'End-to-End Network & Security Solution for Restaurant OutletA comprehensive network and security infrastructure setup for a restaurant outlet, ensuring reliable connectivity and robust surveillance. The project involved meticulous cable routing, installation of CCTV cameras with NVR configuration for real-time monitoring, and deployment of dual Ruijie Access Points to provide seamless Wi-Fi coverage throughout the premises. This setup guarantees a secure and efficient environment for both staff and customers.',
      tags: ['Network', 'CCTV', 'Security', 'Ruijie', 'AccessPoint', 'Hikvision', 'NVR', 'Wi-Fi'],
    },
    {
      year: '2024',
      handle: '@giattech',
      timeLabel: '2 years ago',
      title: 'Build Website for One Of A Kind Resort Bintan',
      short:
        'Bespoke Resort Website & Booking System — OOAK Resort Bintan End-to-end web development for One Of A Kind Resort Bintan, featuring custom UI/UX design, direct reservation flows, and tailored service modules for luxury island stays.',
      full: 'Custom Web Development for Luxury Resort ExperienceA complete web development project for One Of A Kind Resort Bintan, focusing on delivering a seamless online experience for potential guests. The website features a custom-designed user interface and user experience, enabling direct reservations and showcasing the resort’s unique offerings. Tailored service modules were implemented to enhance guest interaction and streamline booking processes, ensuring a luxurious and user-friendly digital presence for the resort.',
      tags: ['Web Development', 'UI/UX Design', 'Booking System', 'Luxury Resort', 'Custom Modules','HospitalityIT'],
    },
    {
      year: '2025',
      handle: '@giattech',
      timeLabel: '1 years ago',
      title: 'First time Freelance IT Support, Website & Network Setup for Small Business',
      short:
        'End-to-End IT, Web & Network Infrastructure for Small Business Complete initial IT setup for a growing business—delivering a custom website, structured network configuration, and ongoing IT support to establish a secure, reliable digital foundation.',
      full: 'Comprehensive IT Solutions for Small Business GrowthA full-service IT support and infrastructure setup for a small business, encompassing the development of a custom website, structured network configuration, and continuous IT support. This project aimed to provide a secure and efficient digital environment, enabling the business to operate smoothly and scale effectively. By integrating tailored IT solutions, the business was equipped with the necessary tools to enhance productivity and customer engagement.',
      tags: ['IT Support', 'Web Development', 'Network Configuration','Villa Management','Restaurant','Travel Agent'],
    },
    {
      year: '2026',
      handle: '@giattech',
      timeLabel: 'Now',
      title: 'Merge AI into the workflow for faster delivery without cutting corners',
      short:
        'AI-Assisted Development Workflow & Process Optimization Integrated cutting-edge AI tools into the core engineering and design workflow, drastically speeding up project turnaround times while preserving strict quality control and code standards.',
      full: 'Workflow Optimization with AI Integration for Enhanced EfficiencyA strategic integration of advanced AI tools into the development and design workflow, aimed at accelerating project delivery without compromising on quality. By leveraging AI-assisted coding, design automation, and intelligent project management, the team was able to streamline processes, reduce manual effort, and maintain high standards of code integrity and user experience. This approach not only improved efficiency but also allowed for more innovative solutions to be implemented within tighter deadlines.',
      tags: ['AI Integration', 'Workflow Optimization', 'Process Automation', 'Quality Control', 'Code Standards'],
    },
  ],
};
