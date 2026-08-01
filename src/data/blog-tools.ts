/**
 * ─────────────────────────────────────────────────────────────
 *  Tools page — curated resources we actually use
 * ─────────────────────────────────────────────────────────────
 *
 * EVERY `href` here is an EXTERNAL link and is rendered with
 * target="_blank" rel="noopener noreferrer nofollow". They are
 * listed in one file on purpose so the full outbound list can be
 * reviewed at a glance — nothing links out from anywhere else on
 * the blog except these, the share buttons, and the two client
 * sites referenced inside case-study articles.
 */

import type { BlogLang } from './blog-categories';

export interface ToolGroup {
  /** Stable id — feeds the DOM's data-paged-grid / data-pager pairing */
  slug: string;
  title: Record<BlogLang, string>;
  description: Record<BlogLang, string>;
  /** Slug of a blog article that goes deeper on this group (id/en pair) */
  article?: { id: string; en: string; label: Record<BlogLang, string> };
  tools: Tool[];
}

export interface Tool {
  name: string;
  /** External URL — always opened in a new tab with rel=nofollow */
  href: string;
  /** Host shown under the name so readers see where they're going */
  host: string;
  free: 'free' | 'freemium' | 'paid';
  note: Record<BlogLang, string>;
}

export const toolGroups: ToolGroup[] = [
  {
    slug: 'measure',
    title: { id: 'Ukur Performa', en: 'Measure Performance' },
    description: {
      id: 'Sebelum memperbaiki kecepatan, ukur dulu. Empat alat ini yang kami buka setiap kali mengaudit sebuah situs.',
      en: 'Before fixing speed, measure it. These are the four we open every time we audit a site.',
    },
    article: {
      id: 'cara-mempercepat-loading-website-core-web-vitals',
      en: 'speed-up-your-website-core-web-vitals',
      label: { id: 'Panduan Core Web Vitals', en: 'The Core Web Vitals guide' },
    },
    tools: [
      {
        name: 'PageSpeed Insights',
        href: 'https://pagespeed.web.dev/',
        host: 'pagespeed.web.dev',
        free: 'free',
        note: {
          id: 'Lab data + data pengguna sungguhan (CrUX). Selalu cek tab mobile lebih dulu.',
          en: 'Lab data plus real-user field data (CrUX). Always check the mobile tab first.',
        },
      },
      {
        name: 'WebPageTest',
        href: 'https://www.webpagetest.org/',
        host: 'webpagetest.org',
        free: 'freemium',
        note: {
          id: 'Uji dari lokasi dan kecepatan jaringan tertentu — berguna untuk menguji dari Jakarta atau Singapura.',
          en: 'Test from a specific location and connection speed — useful for testing from Jakarta or Singapore.',
        },
      },
      {
        name: 'Google Search Console',
        href: 'https://search.google.com/search-console',
        host: 'search.google.com',
        free: 'free',
        note: {
          id: 'Wajib untuk setiap situs. Pantau indeks, kata kunci, dan laporan Core Web Vitals.',
          en: 'Mandatory on every site. Watch indexing, queries, and the Core Web Vitals report.',
        },
      },
      {
        name: 'Chrome DevTools Lighthouse',
        href: 'https://developer.chrome.com/docs/lighthouse/overview',
        host: 'developer.chrome.com',
        free: 'free',
        note: {
          id: 'Sudah ada di browser Anda. Jalankan pada build produksi, bukan dev server.',
          en: 'Already in your browser. Run it against a production build, not a dev server.',
        },
      },
    ],
  },
  {
    slug: 'images',
    title: { id: 'Optimasi Gambar', en: 'Image Optimisation' },
    description: {
      id: 'Gambar biasanya menyumbang 60–70% berat halaman. Ini titik perbaikan dengan hasil tercepat.',
      en: 'Images are usually 60–70% of page weight. This is the fastest place to win.',
    },
    tools: [
      {
        name: 'Squoosh',
        href: 'https://squoosh.app/',
        host: 'squoosh.app',
        free: 'free',
        note: {
          id: 'Kompresi dan konversi ke WebP/AVIF langsung di browser. Tidak ada yang diunggah ke server.',
          en: 'Compress and convert to WebP/AVIF in the browser. Nothing is uploaded to a server.',
        },
      },
      {
        name: 'SVGOMG',
        href: 'https://jakearchibald.github.io/svgomg/',
        host: 'jakearchibald.github.io',
        free: 'free',
        note: {
          id: 'Membersihkan file SVG dari metadata editor. Sering memangkas 50% ukuran logo.',
          en: 'Strips editor metadata out of SVG files. Often halves the size of a logo.',
        },
      },
      {
        name: 'Sharp',
        href: 'https://sharp.pixelplumbing.com/',
        host: 'sharp.pixelplumbing.com',
        free: 'free',
        note: {
          id: 'Untuk konversi batch di dalam pipeline build, bukan satu per satu.',
          en: 'For batch conversion inside a build pipeline rather than one file at a time.',
        },
      },
    ],
  },
  {
    slug: 'seo',
    title: { id: 'SEO & Structured Data', en: 'SEO & Structured Data' },
    description: {
      id: 'Fondasi teknis SEO bisa diperiksa sendiri. Ini alat yang kami pakai untuk memverifikasinya.',
      en: "You can check technical SEO foundations yourself. These are what we verify with.",
    },
    article: {
      id: 'panduan-lengkap-membuat-website-bisnis-pertama',
      en: 'complete-guide-first-business-website',
      label: { id: 'Panduan website bisnis pertama', en: 'The first business website guide' },
    },
    tools: [
      {
        name: 'Rich Results Test',
        href: 'https://search.google.com/test/rich-results',
        host: 'search.google.com',
        free: 'free',
        note: {
          id: 'Memeriksa apakah data terstruktur (Schema.org) Anda terbaca Google.',
          en: 'Checks whether your Schema.org structured data is readable by Google.',
        },
      },
      {
        name: 'Schema.org',
        href: 'https://schema.org/',
        host: 'schema.org',
        free: 'free',
        note: {
          id: 'Referensi resmi tipe data terstruktur — Article, Product, LocalBusiness, dan lainnya.',
          en: 'The reference for structured data types — Article, Product, LocalBusiness, and the rest.',
        },
      },
      {
        name: 'Google Business Profile',
        href: 'https://business.google.com/',
        host: 'business.google.com',
        free: 'free',
        note: {
          id: 'Untuk bisnis dengan lokasi fisik, ini sering lebih berdampak dari SEO on-page.',
          en: 'For a business with a physical location, this often matters more than on-page SEO.',
        },
      },
    ],
  },
  {
    slug: 'build-hosting',
    title: { id: 'Membangun & Hosting', en: 'Build & Hosting' },
    description: {
      id: 'Stack yang kami pakai untuk membangun dan mengirim situs ke produksi.',
      en: 'The stack we use to build and ship sites to production.',
    },
    article: {
      id: 'tools-yang-kami-pakai-setiap-hari',
      en: 'the-tools-we-use-every-day',
      label: { id: 'Stack harian kami', en: 'Our daily stack' },
    },
    tools: [
      {
        name: 'Astro',
        href: 'https://astro.build/',
        host: 'astro.build',
        free: 'free',
        note: {
          id: 'Framework untuk situs berbasis konten. Halaman dikirim sebagai HTML, JS hanya seperlunya.',
          en: 'Framework for content-driven sites. Pages ship as HTML, JavaScript only where needed.',
        },
      },
      {
        name: 'Laravel',
        href: 'https://laravel.com/',
        host: 'laravel.com',
        free: 'free',
        note: {
          id: 'Untuk aplikasi web dengan database, autentikasi, dan pekerjaan latar belakang.',
          en: 'For web applications with a database, authentication, and background work.',
        },
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        host: 'tailwindcss.com',
        free: 'free',
        note: {
          id: 'Styling berbasis utility. CSS yang dikirim hanya kelas yang benar-benar dipakai.',
          en: 'Utility-first styling. Only the classes you actually use get shipped.',
        },
      },
      {
        name: 'Cloudflare',
        href: 'https://www.cloudflare.com/',
        host: 'cloudflare.com',
        free: 'freemium',
        note: {
          id: 'DNS, CDN, dan SSL. Hampir selalu layak dipasang di depan hosting apa pun.',
          en: 'DNS, CDN, and SSL. Almost always worth putting in front of any hosting.',
        },
      },
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        host: 'nextjs.org',
        free: 'free',
        note: {
          id: 'Framework React dengan rendering server-side. Pilihan yang tepat saat proyek benar-benar butuh ekosistem React yang dalam.',
          en: 'React framework with server-side rendering. The right pick when the project genuinely needs the deeper React ecosystem.',
        },
      },
      {
        name: 'Payload CMS',
        href: 'https://payloadcms.com/',
        host: 'payloadcms.com',
        free: 'freemium',
        note: {
          id: 'Headless CMS berbasis TypeScript. Tim editorial dapat panel admin, tim developer dapat REST + GraphQL API otomatis.',
          en: 'TypeScript-first headless CMS. Editorial teams get an admin panel; developers get REST + GraphQL out of the box.',
        },
      },
      {
        name: 'VPS Hostinger',
        href: 'https://www.hostinger.com/vps-hosting',
        host: 'hostinger.com',
        free: 'paid',
        note: {
          id: 'VPS terjangkau untuk aplikasi Laravel skala kecil-menengah, dengan lokasi server Singapura yang dekat pasar Indonesia.',
          en: 'Affordable VPS for small-to-medium Laravel apps, with a Singapore server region close to the Indonesian market.',
        },
      },
    ],
  },
  {
    slug: 'analytics',
    title: { id: 'Analitik & Uptime', en: 'Analytics & Uptime' },
    description: {
      id: 'Anda tidak bisa memperbaiki apa yang tidak diukur — dan tidak bisa memperbaiki downtime yang tidak Anda ketahui.',
      en: "You can't fix what you don't measure — or downtime you never hear about.",
    },
    tools: [
      {
        name: 'Google Analytics',
        href: 'https://analytics.google.com/',
        host: 'analytics.google.com',
        free: 'free',
        note: {
          id: 'Standar industri. Perlu banner persetujuan cookie di banyak yurisdiksi.',
          en: 'The industry standard. Needs a cookie consent banner in many jurisdictions.',
        },
      },
      {
        name: 'Plausible',
        href: 'https://plausible.io/',
        host: 'plausible.io',
        free: 'paid',
        note: {
          id: 'Alternatif ringan tanpa cookie. Skripnya jauh lebih kecil dari GA.',
          en: 'A lightweight, cookie-free alternative. The script is far smaller than GA.',
        },
      },
      {
        name: 'UptimeRobot',
        href: 'https://uptimerobot.com/',
        host: 'uptimerobot.com',
        free: 'freemium',
        note: {
          id: 'Memberi tahu Anda situs turun sebelum pelanggan yang memberi tahu.',
          en: 'Tells you the site is down before a customer does.',
        },
      },
    ],
  },
];

export const freeLabels: Record<Tool['free'], Record<BlogLang, string>> = {
  free:     { id: 'Gratis',   en: 'Free' },
  freemium: { id: 'Freemium', en: 'Freemium' },
  paid:     { id: 'Berbayar', en: 'Paid' },
};
