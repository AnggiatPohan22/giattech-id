# CONTENT_GUIDE — Update Konten Website Giattech

Panduan lengkap untuk mengganti semua konten placeholder di website ini dengan
konten asli sebelum go-live. Semua konten teks hidup di file TypeScript di
`src/data/`, semua gambar di `public/images/`, dan warna brand di
`src/styles/theme.css`. **Kamu tidak perlu menyentuh komponen `.astro`**
untuk update konten normal.

---

## Daftar Isi

1. [Cara jalanin project](#cara-jalanin-project)
2. [Peta konten — file mana untuk apa](#peta-konten)
3. [Update per-section](#update-per-section)
   - [Hero](#1-hero-srcdataherots)
   - [About / Timeline](#2-about--timeline-srcdataaboutts)
   - [Services (What You Get)](#3-services-what-you-get-srcdataservicests)
   - [Offerings (What We Offer)](#4-offerings-what-we-offer-srcdataofferingsts)
   - [Projects](#5-projects-srccontentprojects)
   - [Pricing](#6-pricing-srcdatapricingts)
   - [Testimonials](#7-testimonials-srcdatatestimonialsts)
   - [FAQ](#8-faq-srcdatafaqts)
   - [Navigation & Social Links](#9-navigation--social-links-srcdatanavigationts)
   - [Sidebar](#10-sidebar-srcdatasidebarts)
   - [CTA (Have Something in Mind?)](#11-cta-have-something-in-mind-srcdatactats)
4. [Aset — gambar, video, favicon](#aset)
5. [Warna brand / accent](#warna-brand)
6. [SEO, meta tag, Open Graph](#seo-meta-tag-open-graph)
7. [Pre-launch checklist](#pre-launch-checklist)
8. [Deploy](#deploy)

---

## Cara jalanin project

```bash
npm install         # sekali di awal
cp .env.example .env   # sekali di awal — copy config template
# edit .env dengan value asli (email, WA, URL, dst.)
npm run dev         # dev server di http://localhost:4321
npm run build       # generate output produksi ke dist/
npm run preview     # preview hasil build
npx astro check     # cek typescript & schema
```

> **Penting**: setelah edit `.env`, kamu **wajib rebuild** (`npm run build`)
> supaya value baru ter-bake ke output statis. Dev server pakai HMR
> jadi biasanya auto-refresh, tapi tidak selalu untuk semua env var.

---

## 🎛️ Central config via `.env`

Semua pengaturan **brand, kontak, SEO, dan analytics** ada di satu
file: `.env` (root project). Kamu tidak perlu masuk ke section /
komponen manapun untuk ganti email, nomor WA, domain, atau title.

| Env variable                  | Untuk apa                                        |
| ----------------------------- | ------------------------------------------------ |
| `PUBLIC_SITE_NAME`            | Nama brand (title tag, footer, structured data)  |
| `PUBLIC_SITE_TAGLINE`         | Tagline pendek (title tag)                       |
| `PUBLIC_SITE_URL`             | Domain final (canonical, OG url, sitemap, robots) |
| `PUBLIC_SITE_DESCRIPTION`     | Meta description, OG description                 |
| `PUBLIC_OG_IMAGE`             | Path share image (letakkan di `public/`)         |
| `PUBLIC_EMAIL`                | Email kontak (sidebar copy pill, footer, CTA fallback) |
| `PUBLIC_WHATSAPP_NUMBER`      | Nomor WA, format E.164 (`6281234567890`)         |
| `PUBLIC_WHATSAPP_MESSAGE`     | Pesan default WhatsApp saat user klik            |
| `PUBLIC_LINKEDIN_URL`         | LinkedIn URL (kosongin untuk hide)               |
| `PUBLIC_TWITTER_URL`          | X/Twitter URL                                    |
| `PUBLIC_GITHUB_URL`           | GitHub URL                                       |
| `PUBLIC_INSTAGRAM_URL`        | Instagram URL                                    |
| `PUBLIC_GA_MEASUREMENT_ID`    | Google Analytics 4 ID (kosongin = disabled)      |
| `PUBLIC_PLAUSIBLE_DOMAIN`     | Plausible domain (kosongin = disabled)           |

**Cara pakai**:

1. Copy `.env.example` ke `.env` (sekali)
2. Edit value di `.env` sesuai brand kamu
3. `npm run build`
4. Deploy folder `dist/` (lihat section deploy di bawah)

**Prinsip yang dijaga**:
- Nomor WA / email / URL **tidak ditulis lagi** di komponen atau data file
- Semua di-baca dari `src/config/site.ts` yang membaca `.env`
- Kalau env kosong, ada fallback default (biar dev tidak crash), dan
  konsumer bisa guard dengan `if (contact.whatsappHref) { ... }`

**Yang TIDAK di-env** (masih di file terpisah, sengaja):
- Favicon — file di `public/favicon.svg` + `favicon.ico`, ganti file
  langsung karena browser cache-nya kompleks
- Konten section (heading, testimonial, project) — di `src/data/*.ts`
  dan `src/content/projects/` karena isinya panjang / structured



Setiap kali kamu edit file di `src/data/` atau `src/content/`, dev server
langsung hot-reload di browser. Kalau reload nggak jalan, hard-refresh
(`Ctrl+Shift+R`).

---

## Peta konten

| Section di halaman     | File yang harus di-edit                       | Isi                          |
| ---------------------- | --------------------------------------------- | ---------------------------- |
| Hero (halaman atas)    | `src/data/hero.ts`                            | Headline, stats, CTA, portrait |
| About / Timeline       | `src/data/about.ts`                           | 5 entry tahun perjalanan     |
| What You Get           | `src/data/services.ts`                        | Heading + 6 capability cards |
| What We Offer          | `src/data/offerings.ts`                       | 4 service package cards      |
| Projects (Selected Work) | `src/content/projects/*.md`                 | Satu file per project        |
| Pricing                | `src/data/pricing.ts`                         | 3 pricing plan               |
| Testimonials / Clients | `src/data/testimonials.ts`                    | 6 review + gambar client     |
| FAQ                    | `src/data/faq.ts`                             | Daftar pertanyaan + jawaban  |
| Navbar & Footer links  | `src/data/navigation.ts`                      | Nav, social, primary CTA     |
| Sidebar (kiri)         | `src/data/sidebar.ts`                         | Nav pill, stats, client marquee |
| CTA (Have Something…)  | `src/data/cta.ts`                             | Logo/text, headline, buttons, BTS frame gallery |
| Warna brand            | `src/styles/theme.css`                        | Accent color satu tempat     |
| SEO / meta             | `src/layouts/Layout.astro`                    | Default title, description, OG |
| Domain live            | `astro.config.mjs` + `public/robots.txt`      | `site:` URL + sitemap URL    |

---

## Update per-section

### 1. Hero (`src/data/hero.ts`)

Bagian paling atas halaman. Ganti isi object `hero`:

```ts
export const hero: HeroContent = {
  brandWord: 'GIAT',              // Kata raksasa di background hero
  headline: ['Baris 1,', 'Baris 2 &', 'Baris 3'], // Headline 3 baris
  subheadline: 'Paragraf pendek di bawah headline.',
  corner: ['Tagline atas', 'Tagline bawah'],       // Signature bottom-left
  stats: [
    { value: 80, suffix: '+', label: 'Projects', logo: '/images/logo-white.png' },
    { value: 3,  suffix: '+', label: 'Years of experience' },
  ],
  ctas: [
    { label: 'Book a Call', href: '#cta', variant: 'primary' },
    { label: 'About Me',    href: '#about', variant: 'outline' },
  ],
  traits: ['Creative', 'Reliable', 'Strategist', 'Builder', 'Efficient'],
  portrait: {
    src: '/images/hero-1.png',    // Drop foto asli di public/images/
    alt: 'Deskripsi foto',
    width: 1080,
    height: 1080,
  },
};
```

**Nav Hero kiri/kanan** (link di sebelah portrait) juga ada di file yang
sama — `heroNavLeft` dan `heroNavRight`.

**Foto portrait**: taruh file di `public/images/hero-1.png` (atau path lain,
lalu update `portrait.src`). Ukuran ideal 1080×1080 (persegi), format PNG
dengan transparan atau JPG.

---

### 2. About / Timeline (`src/data/about.ts`)

Array `timeline` — tiap entry satu tahun/milestone. Tambah, hapus, atau
edit sebanyak yang perlu:

```ts
{
  year: '2017',                    // Angka tahun (display)
  handle: '@giattech',
  timeLabel: '8 years ago',
  title: 'Judul milestone-nya',
  short: 'Paragraf pendek yang muncul di card.',
  full:  'Paragraf lengkap yang muncul saat card di-expand.',
  tags: ['PHP', 'HTML', 'cPanel'], // Chip di bawah card
},
```

Order di array = urutan tampil. Bagian atas file (`eyebrow`, `heading`,
`intro`) buat header section-nya. `heading` mendukung inline HTML
(`<br />`, dsb).

---

### 3. Services (What You Get) (`src/data/services.ts`)

Section headline + deskripsi utama. **Cards sudah dihapus** — sekarang
hanya heading giant + paragraf word-scrub yang center di viewport.

Isi paragraf ada di `servicesIntro` (array segmen text + icon):

```ts
export const servicesIntro: IntroSegment[] = [
  { type: 'text', value: 'Strategy, precision, and' },
  { type: 'icon', value: 'code' },      // chip icon inline
  { type: 'text', value: 'development combined — turning' },
  { type: 'icon', value: 'gauge' },
  { type: 'text', value: 'your vision into...' },
];
```

Icon yang tersedia: `code`, `layout`, `plug`, `gauge`, `sparkle`, `life-buoy`.
Tinggal alternate `text` dan `icon` sesuka hati.

> Array `services` di bawah masih ada di file — currently tidak
> di-render di section What You Get. Kalau nanti mau bikin lagi 6-card
> grid, data-nya sudah siap.

---

### 4. Offerings (What We Offer) (`src/data/offerings.ts`)

4 card service package. Layout desktop = 2×2 grid, mobile = horizontal
swipe.

```ts
{
  icon: 'code',                    // Salah satu dari 6 icon (lihat services.ts)
  title: 'Web Development',
  tagline: 'Paragraf singkat 1–2 kalimat.',
  bullets: [
    'Point 1',
    'Point 2',
    'Point 3',
  ],
},
```

Ideal 3 bullet per card supaya tinggi kartu seragam. Efek highlight
(lift + accent glow) muncul otomatis saat cursor hover atau saat scroll
menempatkan card di tengah viewport.

---

### 5. Projects (`src/content/projects/`)

Satu file `.md` per project — bukan di `src/data/`, tapi di
`src/content/projects/`. Astro-nya auto-detect setiap file di folder ini.

Contoh file baru — `src/content/projects/nama-project.md`:

```markdown
---
title: Nama Client — Deskripsi Singkat
summary: 1–2 kalimat ringkasan project.
year: 2024
order: 1                          # Urutan tampil (kecil dulu)
tags:
  - Laravel
  - MySQL
role: Full-Stack Lead
client: Nama Client
url: https://client-website.com   # (opsional) link ke live site
thumbnail: /images/projects/nama-project.svg
video: /videos/nama-project.mp4   # (opsional) — kalau ada, override thumbnail
accent: ocean                     # sage | stone | clay | ocean
featured: true
---

Paragraf deskripsi project. Muncul di detail card kalau nanti dibikin.
```

**Field wajib**: `title`, `summary`, `year`, `order`, `tags` (minimal 1).
**Field opsional**: `role`, `client`, `url`, `thumbnail`, `video`,
`accent` (default `sage`), `featured` (default `false`).

**Untuk hapus project**: hapus file `.md`-nya.
**Untuk urutan**: ubah angka `order`. Lebih kecil = duluan.

**Thumbnail**: taruh di `public/images/projects/nama-project.{svg,png,jpg,avif}`.
Rekomendasi rasio 4:3 atau 16:9, resolusi minimal 1200×900.

---

### 6. Pricing (`src/data/pricing.ts`)

3 pricing card. `featured: true` bikin salah satu card di-highlight
(saat ini "Starter Build").

```ts
{
  slug: 'starter',                 // ID unik untuk plan
  name: 'Starter Build',
  price: '$4,800',                 // Boleh angka atau "Let's Talk"
  priceSuffix: 'fixed',            // opsional — kalau kosong nggak muncul
  tagline: 'Deskripsi singkat 1 baris.',
  featured: true,                  // opsional — false default
  features: [
    'Fitur 1',
    'Fitur 2',
    // ...
  ],
  cta: { label: 'Book a Call', href: '#cta' },
},
```

Slug harus salah satu dari `'support' | 'starter' | 'custom'`. Kalau
butuh slug lain, tambahkan ke type `PricingPlan['slug']` di file yang sama.

---

### 7. Testimonials (`src/data/testimonials.ts`)

6 review yang tampil sebagai carousel (1 muncul, ada dot pagination + prev/next).

```ts
{
  heading: 'Judul quote pendek.',
  quote:   'Isi quote lengkap dari client.',
  name:    'Nama Client',
  role:    'Jabatan',
  company: 'Nama Perusahaan',
  companyUrl: 'https://perusahaan.com',   // opsional — bikin nama perusahaan jadi link
  avatar: '/images/testimonial-nama.avif', // opsional — foto profil kecil
  companyImage: '/images/testimonials/company-nama.jpg', // opsional — foto besar di card
},
```

**Kalau `companyImage` ada** → card jadi 2-kolom (foto kiri, quote kanan).
**Kalau nggak ada** → card jadi 1-kolom penuh dengan quote saja.

**Untuk foto**:
- Taruh **foto perusahaan / hasil kerja** di `public/images/testimonials/`
  (rekomendasi 800×600 atau 1200×900, format AVIF/WebP/JPG).
- Taruh **avatar personal** di `public/images/` (rekomendasi 96×96 square).
- Kalau `avatar` dikosongkan, card otomatis tampilkan inisial nama.

Menambah/mengurangi jumlah review: cukup tambah/hapus entry di array.
Pagination dot dan counter auto-adjust.

---

### 8. FAQ (`src/data/faq.ts`)

Array simpel:

```ts
{
  question: 'Pertanyaan lengkap dengan tanda tanya?',
  answer: 'Jawaban 1–3 paragraf. Boleh panjang.',
},
```

Tampil sebagai accordion — hanya 1 open pada satu waktu.

---

### 9. Navigation & Social Links (`src/data/navigation.ts`)

**`navLinks`** — link di navbar & footer:

```ts
{ label: 'Home', href: '#hero' },
```

Kalau mau link ke halaman lain (bukan section), pakai path absolut
(`/blog`, `/contact`, dsb).

**`primaryCta`** — tombol CTA di navbar:

```ts
export const primaryCta: NavLink = { label: 'Book a Call', href: '#cta' };
```

**`socialLinks`** — social media di footer & sidebar:

```ts
{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/username', icon: 'linkedin' },
```

Icon yang tersedia: `github`, `linkedin`, `twitter`, `email`.

**`sidebarSections`** — list ID section untuk active-nav tracking di
sidebar. Hanya edit kalau kamu tambah/hapus section di halaman.

---

### 10. Sidebar (`src/data/sidebar.ts`)

Sidebar kiri (desktop only, lg+).

**`sidebarNav`** — nav pill di card #3 sidebar. Icon-nya inline SVG
markup (path saja, tanpa tag `<svg>` — sudah di-wrap oleh komponen):

```ts
{
  id: 'hero',                      // Harus match ID section di page
  label: 'Home',
  icon: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
},
```

Cari icon di [Lucide](https://lucide.dev/) atau [Heroicons](https://heroicons.com/),
copy path-nya, tempel di `icon`.

**`sidebarStats`** — 2 stat card di sidebar. Format sama seperti hero
stats. `label` boleh mengandung `<br/>` untuk line break.

**`sidebarClients`** — marquee client di sidebar. Cukup array string
nama client.

---

### 11. CTA (Have Something in Mind?) (`src/data/cta.ts`)

Section terakhir sebelum footer. Punya dua fitur khusus:

**A. Logo swap (opsional)** — ganti badge "Gt" jadi logo asli:

```ts
export const ctaContent: CtaContent = {
  logo: { src: '/images/cta/my-logo.png', alt: 'Studio saya' },
  // ...
};
```

Kosongkan (`logo: undefined` atau hapus field-nya) untuk pakai text
"Gt" default. Logo di-render sebagai `<img>` dalam lingkaran ø64px —
gambar akan di-crop dengan `object-cover` biar pas.

**B. Frame gallery (behind-the-scenes)** — array frame kecil yang
berputar di background CTA card. Tiap frame:
- Berisi 2–3 gambar yang di-cycle
- Punya transisi sendiri (fade, slide, zoom, flip, blur, swipe)
- Interval + start delay sendiri (biar out-of-sync, terasa hidup)
- Posisi, ukuran, dan sudut tilt sendiri

```ts
frames: [
  {
    images: [
      '/images/cta/bts-1a.jpg',
      '/images/cta/bts-1b.jpg',
      '/images/cta/bts-1c.jpg',
    ],
    transition: 'fade',              // lihat daftar di bawah
    interval: 4200,                  // ms antar switch
    duration: 700,                   // ms durasi transisi
    startDelay: 0,                   // ms delay pertama (untuk stagger)
    position: { top: '8%', left: '4%' },
    width: '190px',
    height: '120px',
    rotation: -8,                    // derajat, boleh negatif
    opacity: 0.55,                   // opsional, default 1
  },
  // ... 6–7 frame lain
],
```

**Transisi yang tersedia**:

| Nilai         | Efek visual                                  |
| ------------- | -------------------------------------------- |
| `fade`        | Crossfade lembut (opacity 0 → 1)             |
| `slide-left`  | Gambar baru masuk dari kanan                 |
| `slide-right` | Gambar baru masuk dari kiri                  |
| `slide-up`    | Gambar baru naik dari bawah                  |
| `slide-down`  | Gambar baru turun dari atas                  |
| `zoom-in`     | Scale up dari 0.75 → 1                       |
| `flip`        | 3D rotateY dari 90° → 0                      |
| `blur`        | Blur 14px → 0 + scale 1.05 → 1               |
| `swipe`       | Reveal clip-path dari kiri ke kanan          |

Campur transisi berbeda di tiap frame supaya section terasa alive.
Pakai `startDelay` yang berbeda-beda (0, 700, 1400, 2100, ...) biar
frame-frame nggak semua flip di beat yang sama.

**Gambar** — taruh di `public/images/cta/`. Rekomendasi:
- Rasio 3:2 atau 4:3 (contoh 480×320)
- Format AVIF / WebP untuk file kecil
- Konten: screenshot admin panel, mockup design, foto meeting, wireframe,
  Slack chat, git log, dsb. — apapun yang menunjukkan proses kerja

**Menghapus / menambah frame**: cukup edit array `frames`. Frame yang
punya `images` cuma 1 item akan skip cycling (statis).

**Kalau semua gambar belum siap**: frame tetap render sebagai kotak
kosong dengan border tipis (mirip mockup di reference) — kamu bisa
publish dulu dan isi gambarnya belakangan.

---

## Aset

### Struktur folder

```
public/
├─ favicon.ico
├─ favicon.svg
├─ robots.txt
└─ images/
   ├─ logo-blue.png          # Logo brand (untuk background terang)
   ├─ logo-white.png         # Logo brand (untuk background gelap)
   ├─ hero-1.png             # Foto portrait hero
   ├─ hero-portrait.svg      # Alternative placeholder
   ├─ og-image.jpg           # (BELUM ADA — perlu dibuat) 1200×630 untuk share
   ├─ projects/              # Thumbnail project (SVG/PNG/JPG/AVIF)
   │  └─ nama-project.svg
   └─ testimonials/          # Foto client company
      └─ company-nama.jpg
```

Semua aset public di-reference dengan path absolut yang diawali `/`
(contoh: `/images/logo-white.png`) — Astro auto-serve dari folder `public/`.

### Rekomendasi ukuran

| Aset               | Ukuran ideal    | Format            |
| ------------------ | --------------- | ----------------- |
| Portrait hero      | 1080×1080       | PNG (transparent) / JPG |
| Logo brand         | 512×512         | PNG (transparent) |
| Project thumbnail  | 1200×900 (4:3)  | AVIF / WebP / JPG |
| Testimonial photo  | 800×600         | AVIF / WebP / JPG |
| Personal avatar    | 96×96 (square)  | AVIF / WebP       |
| OG image (share)   | 1200×630        | JPG / PNG         |
| Favicon            | 32×32 & 512×512 | ICO + SVG         |

**Tip performa**: pakai AVIF/WebP untuk foto (2–4× lebih kecil dari JPG).
Convert online di [squoosh.app](https://squoosh.app/).

### Favicon

- `public/favicon.ico` — untuk browser lama
- `public/favicon.svg` — untuk browser modern (vector, tajam di semua density)

Generate keduanya sekaligus di [realfavicongenerator.net](https://realfavicongenerator.net/).

---

## Warna brand

Semua warna accent (badge, CTA, active pill, angka stats, chip, dsb.)
dikontrol dari **satu file**: `src/styles/theme.css`.

Buka file, ganti blok `:root`:

```css
:root {
  --brand:       #3B82F6;    /* warna utama */
  --brand-light: #60A5FA;    /* ~10–15% lebih terang (hover) */
  --brand-dark:  #2563EB;    /* ~15–20% lebih gelap (active) */
  --brand-rgb:   59, 130, 246;  /* SAMA dengan --brand, format R,G,B */
  --brand-on:    #F5F9FF;    /* teks/ikon di atas accent — putih kalau accent gelap, hitam kalau accent terang */
}
```

File-nya sudah ada **8 palette siap-pakai** di komentar bawah (Lime, Sage,
Cyan, Orange, Purple, Blue, Pink, Gold). Cukup copy-paste ke blok `:root`.

Cara dapetin nilai R,G,B dari hex: DevTools browser → klik color box → copy
RGB. Atau [rapidtables.com/convert/color/hex-to-rgb](https://www.rapidtables.com/convert/color/hex-to-rgb.html).

---

## SEO, meta tag, Open Graph

Default meta tags di `src/layouts/Layout.astro`:

```ts
const {
  title = 'Giattech — Web Application Studio',
  description = 'Digital agency building high-performance web applications with Laravel...',
  canonical = 'https://giattech.com/',
  ogImage = '/images/og-image.jpg',
} = Astro.props;
```

**Yang harus di-update sebelum go-live**:

1. **`title`** — nama brand + tagline pendek. Max ~60 karakter.
2. **`description`** — 150–160 karakter, muncul di search result.
3. **`canonical`** — ganti ke domain final kamu (contoh `https://giattech.com/`).
4. **`ogImage`** — bikin file `public/images/og-image.jpg` ukuran **1200×630**.
   Ini yang muncul saat link di-share di WhatsApp/Slack/Twitter/LinkedIn.

**Structured data** (JSON-LD untuk Google) juga ada di file yang sama —
`serviceType` dan `areaServed` — ganti kalau perlu.

**Per-page override**: kalau nanti bikin halaman lain (misal `/about`),
kamu bisa lempar `title`, `description`, `ogImage` sebagai prop ke
`<Layout>`.

---

## Pre-launch checklist

Cek satu-satu sebelum push ke production:

### Konten

- [ ] Semua text di `src/data/*.ts` sudah diganti dari placeholder
- [ ] Semua foto asli sudah masuk ke `public/images/`
- [ ] Semua project di `src/content/projects/` real (bukan dummy)
- [ ] Testimonial + `companyImage` sudah pakai foto client asli
- [ ] Semua `href` external (client URL, socials) mengarah ke link asli
- [ ] Email di `hello@giattech.com` diganti ke email real (cari-replace
      `hello@giattech.com` di seluruh project — ada di Sidebar, Footer,
      Layout, dan navigation.ts)

### Brand & style

- [ ] Warna brand di `src/styles/theme.css` sesuai identity kamu
- [ ] Favicon (`.ico` + `.svg`) sudah pakai logo asli
- [ ] Logo `public/images/logo-white.png` dan `logo-blue.png` sudah diganti

### SEO & metadata

- [ ] `title`, `description`, `canonical`, `ogImage` di `Layout.astro` sudah final
- [ ] `og-image.jpg` (1200×630) sudah dibuat dan diletakkan
- [ ] `site:` URL di `astro.config.mjs` diganti ke domain final
- [ ] `Sitemap:` URL di `public/robots.txt` diganti ke domain final
- [ ] Test share link ke WhatsApp/Slack — cek preview card muncul

### Teknis

- [ ] `npm run build` sukses tanpa error
- [ ] `npx astro check` bersih (no TypeScript errors)
- [ ] `npm run preview` — cek semua halaman di production build
- [ ] Test di mobile (breakpoint 375, 768, 1024, 1440)
- [ ] Test scroll animation smooth di Chrome & Safari
- [ ] Test dengan `prefers-reduced-motion` on (Settings → Accessibility)
- [ ] Klik semua CTA — pastikan mengarah ke tempat yang benar

### Optional but nice

- [ ] Setup Google Analytics / Plausible (tambah script tag di `Layout.astro`
      sebelum `</head>`)
- [ ] Setup Google Search Console — submit sitemap
- [ ] Setup 404 page (`src/pages/404.astro`)
- [ ] Bikin `privacy.astro` dan `terms.astro` kalau nge-collect form data

---

## Deploy

Project ini adalah Astro static site — output-nya HTML/CSS/JS statis di
folder `dist/` setelah `npm run build`. Bisa deploy ke platform static
hosting apa saja:

### Rekomendasi (paling simpel)

- **Vercel** — connect repo GitHub → auto-deploy setiap push. Free tier
  cukup untuk site ini. `astro.config.mjs` sudah support Vercel default.
- **Netlify** — sama saja, connect repo → auto-deploy. `netlify.toml`
  tidak perlu — Netlify auto-detect Astro.
- **Cloudflare Pages** — free tier lebih besar, deployment global.

### Manual deploy (VPS / cPanel / Laragon prod)

```bash
npm run build            # generate dist/
# upload seluruh isi dist/ ke web root server (public_html, /var/www/html, dsb)
```

Tidak perlu Node.js di server — semua sudah pre-rendered. Cukup web
server statis (Nginx, Apache, dsb).

### 🚀 Deploy ke Hostinger (step-by-step)

Hostinger shared hosting = pure static hosting via cPanel / hPanel.
Node.js tidak dijalankan di server; kita hanya upload hasil build.

**1. Siapkan `.env` produksi di komputer**

Edit `.env` di local dengan value production final:

```
PUBLIC_SITE_URL="https://domainmu.com"     # domain kamu di Hostinger
PUBLIC_EMAIL="hello@domainmu.com"
PUBLIC_WHATSAPP_NUMBER="628xxxxxxxxxx"
# ... dst
```

**2. Build production**

```bash
npm run build
```

Output ada di folder `dist/`. Isinya semua HTML, CSS, JS, gambar,
`robots.txt`, `sitemap.xml`, favicon — statik semua.

**3. Upload ke Hostinger**

Ada 3 cara, pilih yang paling nyaman:

**A. Via hPanel File Manager (paling mudah)**
1. Login ke hPanel → Files → File Manager
2. Masuk ke folder `public_html/` (root domain kamu)
3. **Hapus semua isi lama** (kalau ada default index.html Hostinger)
4. Upload SEMUA isi folder `dist/` ke `public_html/`
   - Trik cepat: zip `dist/`, upload zip, extract di server (menu
     kanan-klik → Extract), hapus zip
5. Selesai. Visit `https://domainmu.com` — website live

**B. Via FTP (FileZilla dll)**

1. Dapetin FTP credentials dari hPanel → Files → FTP Accounts
2. Connect via FileZilla / WinSCP
3. Navigate ke `/public_html/`
4. Delete existing files, upload `dist/*` ke situ

**C. Via Git (kalau Hostinger plan support Git deploy)**

Beberapa Hostinger plan support auto-deploy dari GitHub. Setup di
hPanel → Advanced → Git. Set build command `npm run build` dan
deploy directory `dist`. Setiap push ke branch tertentu = auto build
+ deploy.

**4. Point custom domain**

Kalau domain kamu terdaftar di Hostinger, otomatis mapped ke
`public_html/`. Kalau domain di registrar lain, update DNS:
- A record → IP server Hostinger (ada di hPanel → Domains → DNS)
- Atau NS records ke Hostinger nameservers

**5. Enable HTTPS (WAJIB)**

hPanel → Security → SSL. Pilih "Setup" untuk Let's Encrypt SSL
(gratis). Aktifkan "Force HTTPS Redirect". Butuh ~10 menit propagate.

**6. Verifikasi setelah live**

```
✅ https://domainmu.com     → tampil homepage
✅ Ctrl+U (view source)      → cek `<title>`, meta description, OG image sesuai .env
✅ /robots.txt               → tampil, sitemap URL bener
✅ /sitemap.xml              → tampil dengan domain production
✅ pagespeed.web.dev         → target Performance ≥ 95 (mobile)
✅ search.google.com/test/rich-results → structured data valid
✅ Test share ke WhatsApp / Slack → preview card muncul dengan OG image
```

### Kalau butuh update konten setelah live

Cukup:
1. Edit file yang perlu (data, content, `.env`, dsb.)
2. `npm run build`
3. Upload ulang isi `dist/` ke `public_html/` (overwrite files)

Tidak perlu restart apa-apa. Perubahan langsung live setelah upload.

**Tip**: aktifkan cache-busting hash filenames sudah otomatis di Astro
build — jadi CSS/JS baru tidak konflik dengan cache browser lama.

### Setelah deploy

1. Buka [pagespeed.web.dev](https://pagespeed.web.dev/) — masukkan URL, target Perf ≥ 95
2. Buka [search.google.com/test/rich-results](https://search.google.com/test/rich-results/) — verifikasi structured data
3. Setup DNS domain kalau pakai custom domain
4. Enforce HTTPS (auto di Vercel/Netlify/Cloudflare)

---

## Kalau bingung

- Struktur project & tugas asli: baca [`AGENTS.md`](AGENTS.md) dan
  [`CLAUDE.md`](CLAUDE.md).
- Skill spesifik per section (motion, section architecture, dsb.): folder
  [`ai/skills/`](ai/skills/).
- Prompt & spec original: folder [`ai/prompt/`](ai/prompt/).

Selamat launching!
