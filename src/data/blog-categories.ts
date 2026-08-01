/**
 * ─────────────────────────────────────────────────────────────
 *  Blog categories — the "Content" dropdown in the blog navbar
 * ─────────────────────────────────────────────────────────────
 *
 * The `slug` is the URL segment and is SHARED between languages
 * (so /blog/kategori/tutorial-panduan and
 *  /blog/en/category/tutorial-panduan are the same category in
 *  two languages — a single canonical id keeps hreflang pairing
 *  trivial and avoids duplicate-content signals).
 *
 * Every label / description is bilingual so nothing is hard-coded
 * inside a component.
 */

export type BlogLang = 'id' | 'en';

export type CategorySlug =
  | 'tutorial-panduan'
  | 'tips-bisnis-digital'
  | 'teknologi-tools'
  | 'portofolio'
  | 'opini-insight';

export interface BlogCategory {
  slug: CategorySlug;
  label: Record<BlogLang, string>;
  /** Short blurb shown on the category archive header + meta description */
  description: Record<BlogLang, string>;
  /** Inline SVG path data (24×24 viewBox) for the nav + card badge */
  icon: string;
  /** Hue offset used by CoverArt to give each category its own tint */
  hue: number;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: 'tutorial-panduan',
    label: { id: 'Tutorial & Panduan', en: 'Tutorials & Guides' },
    description: {
      id: 'Langkah demi langkah membangun, merawat, dan mengoptimalkan aplikasi web — ditulis dari pengalaman mengerjakan proyek nyata.',
      en: 'Step-by-step walkthroughs for building, maintaining, and optimizing web applications — written from real client work.',
    },
    icon: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Zm16 0A2.5 2.5 0 0 0 17.5 3H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5v-16Z',
    hue: 0,
  },
  {
    slug: 'tips-bisnis-digital',
    label: { id: 'Tips Bisnis Digital', en: 'Digital Business Tips' },
    description: {
      id: 'Cara memakai website sebagai mesin penjualan: harga, konversi, funnel, dan keputusan teknis yang berdampak ke omzet.',
      en: 'How to turn a website into a sales engine: pricing, conversion, funnels, and the technical calls that move revenue.',
    },
    icon: 'M3 3v16.5A1.5 1.5 0 0 0 4.5 21H21v-2H5V3H3Zm5 12 3.5-4.5 3 3.5L20 7l1.5 1.2-5.8 7.3-3-3.5L9.6 16 8 15Z',
    hue: 40,
  },
  {
    slug: 'teknologi-tools',
    label: { id: 'Teknologi & Tools', en: 'Technology & Tools' },
    description: {
      id: 'Review jujur stack, framework, dan tool yang kami pakai sehari-hari — apa yang layak dipakai dan apa yang sebaiknya dilewati.',
      en: 'Honest reviews of the stacks, frameworks, and tools we use daily — what earns its place and what to skip.',
    },
    icon: 'M21.7 18.6 14.4 11.3a6 6 0 0 0-7.7-7.7l3.5 3.5-2.8 2.8-3.5-3.5a6 6 0 0 0 7.7 7.7l7.3 7.3a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4Z',
    hue: 200,
  },
  {
    slug: 'portofolio',
    label: { id: 'Portofolio', en: 'Portfolio' },
    description: {
      id: 'Studi kasus proyek Giattech: masalah yang dibawa klien, keputusan yang kami ambil, dan hasil yang terukur.',
      en: 'Giattech case studies: the problem the client arrived with, the calls we made, and the measurable outcome.',
    },
    icon: 'M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2Zm0 4h4V4h-4v2Z',
    hue: 300,
  },
  {
    slug: 'opini-insight',
    label: { id: 'Opini & Insight', en: 'Opinion & Insight' },
    description: {
      id: 'Pandangan kami soal industri web Indonesia, cara kerja studio kecil, dan tren yang layak (atau tidak layak) diikuti.',
      en: 'Our take on the Indonesian web industry, how a small studio actually operates, and which trends deserve your attention.',
    },
    icon: 'M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2ZM9 20h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1Z',
    hue: 150,
  },
];

const bySlug = new Map(blogCategories.map((c) => [c.slug, c]));

export function getCategory(slug: string): BlogCategory | undefined {
  return bySlug.get(slug as CategorySlug);
}

/** "Tutorial & Panduan" / "Tutorials & Guides" for the active language. */
export function categoryLabel(slug: string, lang: BlogLang): string {
  return getCategory(slug)?.label[lang] ?? slug;
}
