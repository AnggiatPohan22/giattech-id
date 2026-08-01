/**
 * ─────────────────────────────────────────────────────────────
 *  Blog UI strings + route helpers (id / en)
 * ─────────────────────────────────────────────────────────────
 *
 * URL strategy — two fully separate, indexable trees so Google
 * can rank each language on its own:
 *
 *   Indonesian (default)        English
 *   ───────────────────────     ─────────────────────────────
 *   /blog/                      /blog/en/
 *   /blog/<slug>/               /blog/en/<slug>/
 *   /blog/kategori/<cat>/       /blog/en/category/<cat>/
 *   /blog/tentang/              /blog/en/about/
 *   /blog/tools/                /blog/en/tools/
 *   /blog/arsip/                /blog/en/archive/
 *
 * Every page emits <link rel="alternate" hreflang> for its twin,
 * built with `alternatePath()` below.
 */

import type { BlogLang } from './blog-categories';

export const blogLangs: BlogLang[] = ['id', 'en'];

export const langNames: Record<BlogLang, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const langShort: Record<BlogLang, string> = { id: 'ID', en: 'EN' };

/** BCP-47 codes used in <html lang> and hreflang. */
export const htmlLang: Record<BlogLang, string> = { id: 'id-ID', en: 'en' };

/* ── Route builders ─────────────────────────────────────────── */

const base = (lang: BlogLang) => (lang === 'id' ? '/blog' : '/blog/en');

export const routes = {
  home:     (lang: BlogLang) => `${base(lang)}/`,
  post:     (lang: BlogLang, slug: string) => `${base(lang)}/${slug}/`,
  category: (lang: BlogLang, slug: string) =>
    lang === 'id' ? `/blog/kategori/${slug}/` : `/blog/en/category/${slug}/`,
  about:    (lang: BlogLang) => (lang === 'id' ? '/blog/tentang/' : '/blog/en/about/'),
  tools:    (lang: BlogLang) => `${base(lang)}/tools/`,
  archive:  (lang: BlogLang) => (lang === 'id' ? '/blog/arsip/' : '/blog/en/archive/'),
} as const;

export const otherLang = (lang: BlogLang): BlogLang => (lang === 'id' ? 'en' : 'id');

/**
 * The same logical page in the other language. `kind` mirrors the
 * `routes` keys; `slug` is required for post/category.
 */
export function alternatePath(
  kind: keyof typeof routes,
  lang: BlogLang,
  slug?: string
): string {
  switch (kind) {
    case 'post':
      return routes.post(lang, slug ?? '');
    case 'category':
      return routes.category(lang, slug ?? '');
    default:
      return routes[kind](lang);
  }
}

/* ── UI copy ────────────────────────────────────────────────── */

export interface BlogStrings {
  brandSuffix: string;
  nav: {
    home: string;
    content: string;
    about: string;
    tools: string;
    archive: string;
    backToSite: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    stats: { articles: string; categories: string; languages: string };
  };
  sections: {
    featured: string;
    latest: string;
    latestSub: string;
    byCategory: string;
    byCategorySub: string;
    popular: string;
    popularSub: string;
    newsletter: string;
    newsletterSub: string;
    related: string;
    relatedSub: string;
    topics: string;
    allArticles: string;
    inCategory: string;
    archiveIntro: string;
    toc: string;
  };
  post: {
    readingTime: (m: number) => string;
    published: string;
    updated: string;
    by: string;
    share: string;
    copyLink: string;
    copied: string;
    backToBlog: string;
    prev: string;
    next: string;
    tags: string;
    inThisArticle: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    projectTitle: string;
    projectBody: string;
    viewProject: string;
  };
  common: {
    readMore: string;
    viewAll: string;
    noPosts: string;
    adLabel: string;
    switchLang: string;
    breadcrumbHome: string;
  };
  footer: {
    tagline: string;
    explore: string;
    categories: string;
    company: string;
    rights: string;
    mainSite: string;
  };
}

export const t: Record<BlogLang, BlogStrings> = {
  id: {
    brandSuffix: 'Blog',
    nav: {
      home: 'Home',
      content: 'Content',
      about: 'About Blog',
      tools: 'Tools',
      archive: 'Arsip',
      backToSite: 'giattech.com',
      menu: 'Buka menu',
      close: 'Tutup menu',
    },
    hero: {
      eyebrow: 'GIATTECH BLOG',
      title: 'Catatan kerja dari studio yang membangun aplikasi web',
      subtitle:
        'Tutorial, tips bisnis digital, review tools, dan studi kasus nyata dari proyek yang kami kerjakan di Indonesia — ditulis supaya bisa langsung dipakai.',
      searchPlaceholder: 'Cari artikel…',
      stats: { articles: 'Artikel', categories: 'Kategori', languages: 'Bahasa' },
    },
    sections: {
      featured: 'Artikel Pilihan',
      latest: 'Artikel Terbaru',
      latestSub: 'Tulisan paling baru dari meja kerja Giattech.',
      byCategory: 'Jelajahi Kategori',
      byCategorySub: 'Lima jalur baca, dari teknis sampai strategi bisnis.',
      popular: 'Paling Sering Dibaca',
      popularSub: 'Artikel yang paling banyak dicari pembaca kami.',
      newsletter: 'Dapat kabar tiap ada tulisan baru',
      newsletterSub:
        'Tidak ada spam. Hanya artikel baru dan catatan proyek, sesekali dalam sebulan.',
      related: 'Artikel Terkait',
      relatedSub: 'Bacaan lanjutan dari kategori yang sama.',
      topics: 'Topik Populer',
      allArticles: 'Semua Artikel',
      inCategory: 'artikel dalam kategori ini',
      archiveIntro:
        'Seluruh artikel yang pernah terbit, diurutkan dari yang paling baru.',
      toc: 'Daftar Isi',
    },
    post: {
      readingTime: (m) => `${m} menit baca`,
      published: 'Terbit',
      updated: 'Diperbarui',
      by: 'Oleh',
      share: 'Bagikan',
      copyLink: 'Salin tautan',
      copied: 'Tersalin!',
      backToBlog: 'Kembali ke Blog',
      prev: 'Sebelumnya',
      next: 'Berikutnya',
      tags: 'Tag',
      inThisArticle: 'Dalam artikel ini',
    },
    cta: {
      eyebrow: 'BUTUH BANTUAN?',
      title: 'Punya proyek yang mau dibangun serius?',
      body: 'Giattech membangun aplikasi web, dashboard admin, dan situs berperforma tinggi untuk bisnis di Indonesia. Ceritakan kebutuhan Anda — kami balas dengan rencana, bukan brosur.',
      primary: 'Diskusikan Proyek',
      secondary: 'Lihat Layanan',
      projectTitle: 'Proyek terkait',
      projectBody: 'Contoh nyata penerapan yang dibahas di artikel ini.',
      viewProject: 'Lihat proyek',
    },
    common: {
      readMore: 'Baca selengkapnya',
      viewAll: 'Lihat semua',
      noPosts: 'Belum ada artikel di kategori ini.',
      adLabel: 'Iklan',
      switchLang: 'Ganti bahasa',
      breadcrumbHome: 'Beranda',
    },
    footer: {
      tagline:
        'Blog resmi Giattech — studio aplikasi web dari Indonesia. Kami menulis apa yang benar-benar kami kerjakan.',
      explore: 'Jelajahi',
      categories: 'Kategori',
      company: 'Giattech',
      rights: 'Seluruh hak cipta dilindungi.',
      mainSite: 'Situs utama',
    },
  },
  en: {
    brandSuffix: 'Blog',
    nav: {
      home: 'Home',
      content: 'Content',
      about: 'About Blog',
      tools: 'Tools',
      archive: 'Archive',
      backToSite: 'giattech.com',
      menu: 'Open menu',
      close: 'Close menu',
    },
    hero: {
      eyebrow: 'GIATTECH BLOG',
      title: 'Field notes from a studio that ships web applications',
      subtitle:
        'Tutorials, digital business tips, tooling reviews, and real case studies from the projects we run in Indonesia — written to be used, not skimmed.',
      searchPlaceholder: 'Search articles…',
      stats: { articles: 'Articles', categories: 'Categories', languages: 'Languages' },
    },
    sections: {
      featured: 'Featured',
      latest: 'Latest Articles',
      latestSub: 'The newest writing from the Giattech desk.',
      byCategory: 'Browse by Category',
      byCategorySub: 'Five reading tracks, from deep technical to business strategy.',
      popular: 'Most Read',
      popularSub: 'The pieces our readers come back to.',
      newsletter: 'Get notified when we publish',
      newsletterSub:
        'No spam. Just new articles and project notes, a couple of times a month.',
      related: 'Related Articles',
      relatedSub: 'Keep reading in the same category.',
      topics: 'Popular Topics',
      allArticles: 'All Articles',
      inCategory: 'articles in this category',
      archiveIntro: 'Everything we have published, newest first.',
      toc: 'Table of Contents',
    },
    post: {
      readingTime: (m) => `${m} min read`,
      published: 'Published',
      updated: 'Updated',
      by: 'By',
      share: 'Share',
      copyLink: 'Copy link',
      copied: 'Copied!',
      backToBlog: 'Back to Blog',
      prev: 'Previous',
      next: 'Next',
      tags: 'Tags',
      inThisArticle: 'In this article',
    },
    cta: {
      eyebrow: 'NEED A HAND?',
      title: 'Have a project you want built properly?',
      body: 'Giattech builds web applications, admin dashboards, and high-performance sites for businesses in Indonesia and beyond. Tell us what you need — you get a plan back, not a brochure.',
      primary: 'Discuss Your Project',
      secondary: 'See Our Services',
      projectTitle: 'Related project',
      projectBody: 'A real-world build of what this article covers.',
      viewProject: 'View project',
    },
    common: {
      readMore: 'Read more',
      viewAll: 'View all',
      noPosts: 'No articles in this category yet.',
      adLabel: 'Advertisement',
      switchLang: 'Switch language',
      breadcrumbHome: 'Home',
    },
    footer: {
      tagline:
        'The official Giattech blog — a web application studio from Indonesia. We write about what we actually build.',
      explore: 'Explore',
      categories: 'Categories',
      company: 'Giattech',
      rights: 'All rights reserved.',
      mainSite: 'Main site',
    },
  },
};

/** Locale-aware date formatting used on cards, archives, and articles. */
export function formatDate(date: Date, lang: BlogLang): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatMonth(date: Date, lang: BlogLang): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
