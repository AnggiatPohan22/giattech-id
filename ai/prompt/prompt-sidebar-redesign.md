# Prompt: Redesign Sidebar — Floating Card Blocks + Adaptive Dual Tone

## Context

Sidebar di website Astro saya belum sesuai referensi. Perlu **redesign total** dari sisi:
struktur blok, bentuk kotak, posisi, dan sistem dua tone warna.

**Stack:** Astro | Tailwind CSS | Alpine.js | GSAP + ScrollTrigger
**Accent color:** Sage green `#A3B18A`

---

## MASALAH UTAMA — Apa yang Salah Sekarang

| Aspek | Sekarang (SALAH) | Harus Jadi (BENAR) |
|-------|-----------------|-------------------|
| **Posisi** | Mepet ke sisi kiri layar, full height | **Floating** — ada margin 20-24px dari semua sisi |
| **Struktur** | Satu panel menyatu | **Beberapa card block terpisah** dengan gap antar block |
| **Nav items** | Full-width rows, tanpa container | **Pill kecil (w-fit)** di dalam satu card container |
| **Nav active** | Rounded rect full-width | **Pill kecil** yang lebarnya ikut isi text |
| **Nav inactive** | Plain text tanpa background | **Punya background** (lebih terang dari card) |
| **Logo** | Text plain | **Badge dengan background accent** |
| **Tone** | Satu tone saja | **Dua tone** — light & dark, auto switch |

---

## STRUKTUR LAYOUT — Wajib Sama Persis

Sidebar terdiri dari **5 blok terpisah**, disusun vertikal dengan gap di antaranya.
Setiap blok adalah card rounded yang berdiri sendiri — BUKAN satu panel besar.

```
        ┌ margin 24px dari kiri & atas layar
        ↓
   ╔═══════════════════════════════╗
   ║  BLOK 1 — BRAND CARD          ║   rounded-[20px], padding 20px
   ║  ┌──────────┐      [in] [x]   ║   ← Logo badge + social icons
   ║  │ GIATTECH®│                 ║      (logo pakai bg accent)
   ║  └──────────┘                 ║
   ║                                ║
   ║  Working closely with your     ║   ← Tagline, 3 baris
   ║  team to deliver web builds,   ║      text-sm, muted color
   ║  IT support and villa OTA...   ║
   ╚═══════════════════════════════╝
              ↕ gap 12px
   ╔═══════════════════════════════╗
   ║  BLOK 2 — STATS CARD          ║   rounded-[20px], padding 20px
   ║                                ║
   ║     80+       │      3+        ║   ← Angka BESAR, accent color
   ║   PROJECTS    │   YEARS OF     ║      Label kecil bold di bawah
   ║               │   EXPERIENCE   ║      Divider vertikal di tengah
   ╚═══════════════════════════════╝
              ↕ gap 12px
   ╔═══════════════════════════════╗
   ║  BLOK 3 — NAV CARD            ║   rounded-[20px], padding 12px
   ║  ┌────────────┐               ║
   ║  │ ⌂ HOME     │               ║   ← Pill, lebar = isi content
   ║  └────────────┘               ║      BUKAN full width!
   ║  ┌────────────────┐           ║
   ║  │ ◔ ABOUT ME     │ ← ACTIVE  ║   ← Active = bg accent
   ║  └────────────────┘           ║
   ║  ┌───────────────┐            ║
   ║  │ ▣ PROJECTS    │            ║
   ║  └───────────────┘            ║
   ║  ┌──────────────────┐         ║
   ║  │ ◈ WHAT YOU GET   │         ║
   ║  └──────────────────┘         ║
   ║  ┌───────────────┐            ║
   ║  │ ⚡ SERVICES   │            ║
   ║  └───────────────┘            ║
   ║  ┌──────────────┐             ║
   ║  │ ⚇ CLIENTS    │             ║
   ║  └──────────────┘             ║
   ║  ┌─────────┐                  ║
   ║  │ ? FAQ   │                  ║
   ║  └─────────┘                  ║
   ╚═══════════════════════════════╝
              ↕ gap 12px
   ┌───────────────────────────────┐
   │  BLOK 4 — CLIENT MARQUEE      │   TANPA card background
   │  bintan  primo  kelola  ...   │   Scrolling horizontal, opacity 0.5
   └───────────────────────────────┘
              ↕ gap 12px
   ╔═══════════════════════════════╗
   ║  BLOK 5 — CONTACT             ║
   ║  ┌───────────────────────┐    ║
   ║  │ hello@giattech.com  📋│    ║   ← Email pill, full width
   ║  └───────────────────────┘    ║      bg lebih recessed
   ║                                ║
   ║  ┌───────────────────────┐    ║
   ║  │    Book a Call         │    ║   ← CTA full width, bg accent
   ║  └───────────────────────┘    ║      rounded-[16px], bold
   ╚═══════════════════════════════╝
        ↑
        └ margin 24px dari bawah layar
```

---

## SPESIFIKASI DETAIL PER BLOK

### Positioning Container

```css
/* Sidebar TIDAK mepet layar — floating dengan margin */
.sidebar {
  position: fixed;
  left: 24px;
  top: 24px;
  bottom: 24px;
  width: 300px;
  z-index: 40;

  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Kalau konten lebih panjang dari viewport */
  overflow-y: auto;
  scrollbar-width: none;  /* Firefox */
}
.sidebar::-webkit-scrollbar { display: none; }
```

Tailwind equivalent:
```html
<aside class="fixed left-6 top-6 bottom-6 w-[300px] z-40 flex flex-col gap-3 overflow-y-auto">
```

---

### BLOK 1 — Brand Card

```
Container:
  - background: var(--sb-card-bg)
  - border: 1px solid var(--sb-card-border)
  - border-radius: 20px
  - padding: 20px

Row atas (flex justify-between items-start):
  Logo badge:
    - background: var(--sb-accent)          ← WAJIB ada background!
    - color: var(--sb-accent-text)
    - padding: 6px 12px
    - border-radius: 10px
    - font: Outfit, 700, 15px
    - letter-spacing: -0.02em
    - text: "GIATTECH" + <sup>®</sup>

  Social icons (flex gap-2):
    - size: 32x32px
    - background: var(--sb-icon-btn-bg)
    - border-radius: 10px
    - icon size: 15px
    - color: var(--sb-icon-btn-text)
    - hover: opacity 0.75, scale 1.05

Tagline:
  - margin-top: 16px
  - font-size: 13px
  - line-height: 1.6
  - color: var(--sb-text-muted)
  - text: "Working closely with your team to deliver web builds,
           IT support and villa OTA management."
```

---

### BLOK 2 — Stats Card

```
Container:
  - background: var(--sb-card-bg)
  - border: 1px solid var(--sb-card-border)
  - border-radius: 20px
  - padding: 20px 16px

Grid: 2 kolom, divider vertikal di tengah

Setiap kolom (text-center):
  Angka:
    - font: Outfit, 800
    - font-size: 30px
    - color: var(--sb-accent)              ← accent color
    - line-height: 1
  Label:
    - margin-top: 8px
    - font: Inter, 700
    - font-size: 11px
    - letter-spacing: 0.05em
    - text-transform: uppercase
    - color: var(--sb-text)
    - line-height: 1.3

Divider:
  - width: 1px
  - height: 40px
  - background: var(--sb-divider)
  - self-align: center
```

Content:
- Kolom 1: `80+` / `PROJECTS`
- Kolom 2: `3+` / `YEARS OF EXPERIENCE`

---

### BLOK 3 — Navigation Card ⚠️ INI YANG PALING PENTING

```
Container:
  - background: var(--sb-card-bg)
  - border: 1px solid var(--sb-card-border)
  - border-radius: 20px
  - padding: 12px
  - display: flex, flex-direction: column
  - align-items: flex-start          ← KUNCI! biar pill tidak stretch
  - gap: 6px
```

**Setiap nav item adalah PILL yang lebarnya mengikuti isi content:**

```
Nav item (a tag):
  - display: inline-flex          ← BUKAN flex/block
  - width: auto / fit-content     ← BUKAN w-full!
  - align-items: center
  - gap: 8px
  - padding: 8px 14px
  - border-radius: 10px
  - font: Inter, 700
  - font-size: 12.5px
  - letter-spacing: 0.03em
  - text-transform: uppercase
  - transition: all 300ms ease

  Icon:
    - size: 15px
    - stroke-width: 2
    - flex-shrink: 0

  STATE — Inactive:
    - background: var(--sb-nav-bg)         ← ADA background, bukan transparan
    - color: var(--sb-nav-text)
    - hover: background var(--sb-nav-hover-bg), translateX(2px)

  STATE — Active:
    - background: var(--sb-accent)
    - color: var(--sb-accent-text)
    - font-weight: 700
```

**Nav items (urutan wajib sama):**
1. `HOME` → `#hero` — icon: house
2. `ABOUT ME` → `#about` — icon: user / circle-half
3. `PROJECTS` → `#projects` — icon: briefcase
4. `WHAT YOU GET` → `#services` — icon: layers
5. `SERVICES` → `#pricing` — icon: zap
6. `CLIENTS` → `#testimonials` — icon: users
7. `FAQ` → `#faq` — icon: help-circle

---

### BLOK 4 — Client Marquee

```
Container:
  - NO card background
  - NO border
  - padding: 4px 0
  - overflow: hidden
  - mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent)

Track:
  - display: flex
  - gap: 32px
  - width: max-content
  - animation: marquee 20s linear infinite
  - hover: animation-play-state paused

Item (nama client / logo):
  - font: Inter, 600
  - font-size: 12px
  - letter-spacing: 0.05em
  - color: var(--sb-text-muted)
  - opacity: 0.55
  - white-space: nowrap

Duplikasi list 2x untuk seamless loop
```

---

### BLOK 5 — Contact Block

```
Email pill:
  - width: 100%
  - display: flex, justify-between, items-center
  - background: var(--sb-input-bg)
  - border: 1px solid var(--sb-card-border)
  - border-radius: 12px
  - padding: 11px 14px
  - font-size: 13px
  - color: var(--sb-text-muted)
  - cursor: pointer
  - hover: background var(--sb-input-hover-bg)

  Copy icon:
    - size: 15px
    - color: var(--sb-icon)
    - Klik → copy ke clipboard, ganti jadi checkmark 2 detik

CTA button:
  - margin-top: 10px
  - width: 100%
  - background: var(--sb-accent)
  - color: var(--sb-accent-text)
  - border-radius: 14px
  - padding: 14px
  - font: Outfit, 700
  - font-size: 15px
  - text-align: center
  - hover: brightness(1.06), translateY(-1px)
  - transition: 250ms ease
```

---

## SISTEM DUA TONE — Light & Dark

Sidebar berubah tone otomatis berdasarkan background section di belakangnya.

### Token Light Mode (sidebar di atas background terang/cream)

```css
.sidebar[data-mode="light"] {
  --sb-card-bg:          rgba(255, 255, 255, 0.72);
  --sb-card-border:      rgba(0, 0, 0, 0.06);
  --sb-card-blur:        blur(12px);

  --sb-text:             #1C1C1A;
  --sb-text-muted:       #57534E;
  --sb-icon:             #57534E;
  --sb-divider:          rgba(0, 0, 0, 0.12);

  /* Nav pills — inactive lebih TERANG dari card */
  --sb-nav-bg:           rgba(255, 255, 255, 0.85);
  --sb-nav-text:         #1C1C1A;
  --sb-nav-hover-bg:     #FFFFFF;

  /* Accent — sage green agak gelap biar kontras di light */
  --sb-accent:           #A3B18A;
  --sb-accent-text:      #1A1F14;

  /* Icon buttons (social) — gelap di light mode */
  --sb-icon-btn-bg:      #1C1C1A;
  --sb-icon-btn-text:    #F5F5F4;

  /* Input / email pill */
  --sb-input-bg:         rgba(0, 0, 0, 0.045);
  --sb-input-hover-bg:   rgba(0, 0, 0, 0.07);
}
```

### Token Dark Mode (sidebar di atas background gelap)

```css
.sidebar[data-mode="dark"] {
  --sb-card-bg:          rgba(20, 20, 20, 0.82);
  --sb-card-border:      rgba(255, 255, 255, 0.09);
  --sb-card-blur:        blur(12px);

  --sb-text:             #F5F5F4;
  --sb-text-muted:       #A8A29E;
  --sb-icon:             #A8A29E;
  --sb-divider:          rgba(255, 255, 255, 0.14);

  /* Nav pills — inactive lebih TERANG dari card */
  --sb-nav-bg:           rgba(255, 255, 255, 0.08);
  --sb-nav-text:         #E7E5E4;
  --sb-nav-hover-bg:     rgba(255, 255, 255, 0.14);

  /* Accent — sage green tetap sama */
  --sb-accent:           #A3B18A;
  --sb-accent-text:      #14180F;

  /* Icon buttons (social) — terang di dark mode */
  --sb-icon-btn-bg:      rgba(255, 255, 255, 0.10);
  --sb-icon-btn-text:    #F5F5F4;

  /* Input / email pill */
  --sb-input-bg:         rgba(255, 255, 255, 0.06);
  --sb-input-hover-bg:   rgba(255, 255, 255, 0.10);
}
```

### Yang Berubah vs Tetap Saat Switch Tone

| Elemen | Light | Dark |
|--------|-------|------|
| Card background | Putih semi-transparan | Hitam semi-transparan |
| Card border | Hitam 6% | Putih 9% |
| Text utama | Hampir hitam | Hampir putih |
| Nav pill inactive | Putih solid | Putih 8% |
| Social icon button | **Bg gelap, icon terang** | **Bg terang, icon terang** |
| Logo badge | Sage green | Sage green (tetap) |
| Angka stats | Sage green | Sage green (tetap) |
| Nav active | Sage green | Sage green (tetap) |
| CTA button | Sage green | Sage green (tetap) |

**Poin penting:** accent sage green TIDAK berubah di kedua mode.
Yang berubah cuma card, text, border, dan nav inactive.

---

## FILE YANG PERLU DIBUAT

### 1. `src/components/sections/Sidebar.astro`

```astro
---
import { sidebarNav, sidebarStats, sidebarClients } from '../../data/sidebar';

interface Props {
  email?: string;
  bookingUrl?: string;
}

const {
  email = 'hello@giattech.com',
  bookingUrl = '#contact'
} = Astro.props;
---

<aside
  id="sidebar"
  class="sidebar fixed left-6 top-6 bottom-6 w-[300px] z-40 hidden lg:flex flex-col gap-3 overflow-y-auto"
  data-mode="light"
  x-data="sidebarState()"
  :data-mode="mode"
>
  <!-- BLOK 1: Brand -->
  <div class="sb-card p-5">
    <div class="flex items-start justify-between gap-3">
      <a href="#hero" class="sb-logo-badge">
        GIATTECH<sup class="text-[9px] ml-0.5">®</sup>
      </a>
      <div class="flex gap-2 shrink-0">
        <a href="#" class="sb-icon-btn" aria-label="LinkedIn">
          <!-- LinkedIn SVG 15px -->
        </a>
        <a href="#" class="sb-icon-btn" aria-label="X">
          <!-- X SVG 15px -->
        </a>
      </div>
    </div>
    <p class="sb-tagline mt-4">
      Working closely with your team to deliver web builds,
      IT support and villa OTA management.
    </p>
  </div>

  <!-- BLOK 2: Stats -->
  <div class="sb-card px-4 py-5">
    <div class="flex items-center justify-around">
      <div class="text-center">
        <div class="sb-stat-number" data-counter data-target="80">80+</div>
        <div class="sb-stat-label">Projects</div>
      </div>
      <div class="sb-divider"></div>
      <div class="text-center">
        <div class="sb-stat-number" data-counter data-target="3">3+</div>
        <div class="sb-stat-label">Years of<br/>Experience</div>
      </div>
    </div>
  </div>

  <!-- BLOK 3: Navigation -->
  <nav class="sb-card p-3 flex flex-col items-start gap-1.5">
    {sidebarNav.map((item) => (
      <a
        href={`#${item.id}`}
        class="sb-nav-item"
        data-nav-id={item.id}
        :class={`active === '${item.id}' ? 'sb-nav-active' : ''`}
        @click={`active = '${item.id}'`}
      >
        <span class="sb-nav-icon" set:html={item.icon} />
        <span>{item.label}</span>
      </a>
    ))}
  </nav>

  <!-- BLOK 4: Client marquee (NO card) -->
  <div class="sb-marquee">
    <div class="sb-marquee-track">
      {[...sidebarClients, ...sidebarClients].map((c) => (
        <span class="sb-marquee-item">{c}</span>
      ))}
    </div>
  </div>

  <!-- BLOK 5: Contact -->
  <div class="mt-auto">
    <button @click="copyEmail()" class="sb-email-pill">
      <span x-ref="emailText">{email}</span>
      <span class="sb-icon">
        <svg x-show="!copied" class="w-[15px] h-[15px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <svg x-show="copied" x-cloak class="w-[15px] h-[15px]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
    </button>

    <a href={bookingUrl} class="sb-cta mt-2.5">Book a Call</a>
  </div>
</aside>
```

---

### 2. `src/data/sidebar.ts`

```typescript
export interface NavItem {
  id: string;
  label: string;
  icon: string;   // inline SVG string
}

export const sidebarNav: NavItem[] = [
  { id: 'hero',         label: 'Home',          icon: '<svg .../>' },
  { id: 'about',        label: 'About Me',      icon: '<svg .../>' },
  { id: 'projects',     label: 'Projects',      icon: '<svg .../>' },
  { id: 'services',     label: 'What You Get',  icon: '<svg .../>' },
  { id: 'pricing',      label: 'Services',      icon: '<svg .../>' },
  { id: 'testimonials', label: 'Clients',       icon: '<svg .../>' },
  { id: 'faq',          label: 'FAQ',           icon: '<svg .../>' },
];

export const sidebarStats = [
  { value: 80, suffix: '+', label: 'Projects' },
  { value: 3,  suffix: '+', label: 'Years of Experience' },
];

export const sidebarClients: string[] = [
  'Bintan Prestige',
  'Prima',
  'Kelola',
  // tambahkan client lain
];
```

Gunakan Lucide icon SVG untuk `icon` field. Ukuran 15px, stroke-width 2.

---

### 3. `src/styles/sidebar.css`

```css
/* ══════════════════════════════════════════
   SIDEBAR — Dual Tone Adaptive System
   ══════════════════════════════════════════ */

/* ---------- TOKENS: LIGHT MODE ---------- */
.sidebar[data-mode="light"] {
  --sb-card-bg:        rgba(255, 255, 255, 0.72);
  --sb-card-border:    rgba(0, 0, 0, 0.06);
  --sb-text:           #1C1C1A;
  --sb-text-muted:     #57534E;
  --sb-icon:           #57534E;
  --sb-divider:        rgba(0, 0, 0, 0.12);
  --sb-nav-bg:         rgba(255, 255, 255, 0.85);
  --sb-nav-text:       #1C1C1A;
  --sb-nav-hover-bg:   #FFFFFF;
  --sb-accent:         #A3B18A;
  --sb-accent-text:    #1A1F14;
  --sb-icon-btn-bg:    #1C1C1A;
  --sb-icon-btn-text:  #F5F5F4;
  --sb-input-bg:       rgba(0, 0, 0, 0.045);
  --sb-input-hover-bg: rgba(0, 0, 0, 0.07);
}

/* ---------- TOKENS: DARK MODE ---------- */
.sidebar[data-mode="dark"] {
  --sb-card-bg:        rgba(20, 20, 20, 0.82);
  --sb-card-border:    rgba(255, 255, 255, 0.09);
  --sb-text:           #F5F5F4;
  --sb-text-muted:     #A8A29E;
  --sb-icon:           #A8A29E;
  --sb-divider:        rgba(255, 255, 255, 0.14);
  --sb-nav-bg:         rgba(255, 255, 255, 0.08);
  --sb-nav-text:       #E7E5E4;
  --sb-nav-hover-bg:   rgba(255, 255, 255, 0.14);
  --sb-accent:         #A3B18A;
  --sb-accent-text:    #14180F;
  --sb-icon-btn-bg:    rgba(255, 255, 255, 0.10);
  --sb-icon-btn-text:  #F5F5F4;
  --sb-input-bg:       rgba(255, 255, 255, 0.06);
  --sb-input-hover-bg: rgba(255, 255, 255, 0.10);
}

/* ---------- SCROLLBAR HIDE ---------- */
.sidebar { scrollbar-width: none; }
.sidebar::-webkit-scrollbar { display: none; }

/* ---------- CARD BLOCK ---------- */
.sb-card {
  background: var(--sb-card-bg);
  border: 1px solid var(--sb-card-border);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background-color 0.55s ease, border-color 0.55s ease;
}

/* ---------- LOGO BADGE ---------- */
.sb-logo-badge {
  display: inline-block;
  background: var(--sb-accent);
  color: var(--sb-accent-text);
  padding: 6px 12px;
  border-radius: 10px;
  font-family: 'Outfit Variable', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  transition: background-color 0.55s ease, color 0.55s ease;
}

/* ---------- SOCIAL ICON BUTTONS ---------- */
.sb-icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--sb-icon-btn-bg);
  color: var(--sb-icon-btn-text);
  transition: background-color 0.55s ease, color 0.55s ease,
              opacity 0.2s ease, transform 0.2s ease;
}
.sb-icon-btn:hover { opacity: 0.78; transform: scale(1.05); }
.sb-icon-btn svg { width: 15px; height: 15px; }

/* ---------- TAGLINE ---------- */
.sb-tagline {
  font-size: 13px;
  line-height: 1.6;
  color: var(--sb-text-muted);
  transition: color 0.55s ease;
}

/* ---------- STATS ---------- */
.sb-stat-number {
  font-family: 'Outfit Variable', sans-serif;
  font-weight: 800;
  font-size: 30px;
  line-height: 1;
  color: var(--sb-accent);
  transition: color 0.55s ease;
}
.sb-stat-label {
  margin-top: 8px;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.3;
  color: var(--sb-text);
  transition: color 0.55s ease;
}
.sb-divider {
  width: 1px;
  height: 40px;
  background: var(--sb-divider);
  transition: background-color 0.55s ease;
}

/* ---------- NAV ITEMS — PILL, WIDTH FIT CONTENT ---------- */
.sb-nav-item {
  display: inline-flex;        /* KUNCI: bukan flex/block */
  width: auto;                 /* KUNCI: bukan 100% */
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12.5px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;

  background: var(--sb-nav-bg);
  color: var(--sb-nav-text);

  transition: background-color 0.35s ease, color 0.35s ease,
              transform 0.25s ease;
}
.sb-nav-item:hover {
  background: var(--sb-nav-hover-bg);
  transform: translateX(3px);
}
.sb-nav-item.sb-nav-active {
  background: var(--sb-accent);
  color: var(--sb-accent-text);
}
.sb-nav-item.sb-nav-active:hover {
  transform: translateX(3px);
  filter: brightness(1.04);
}
.sb-nav-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.sb-nav-icon svg { width: 15px; height: 15px; stroke-width: 2; }

/* ---------- CLIENT MARQUEE ---------- */
.sb-marquee {
  overflow: hidden;
  padding: 4px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}
.sb-marquee-track {
  display: flex;
  gap: 32px;
  width: max-content;
  animation: sb-marquee 22s linear infinite;
}
.sb-marquee:hover .sb-marquee-track { animation-play-state: paused; }
.sb-marquee-item {
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.05em;
  white-space: nowrap;
  color: var(--sb-text-muted);
  opacity: 0.55;
  transition: color 0.55s ease;
}
@keyframes sb-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ---------- EMAIL PILL ---------- */
.sb-email-pill {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 11px 14px;
  border-radius: 12px;
  background: var(--sb-input-bg);
  border: 1px solid var(--sb-card-border);
  color: var(--sb-text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.35s ease, color 0.55s ease,
              border-color 0.55s ease;
}
.sb-email-pill:hover { background: var(--sb-input-hover-bg); }

/* ---------- CTA BUTTON ---------- */
.sb-cta {
  display: block;
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: var(--sb-accent);
  color: var(--sb-accent-text);
  font-family: 'Outfit Variable', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  transition: filter 0.25s ease, transform 0.25s ease,
              background-color 0.55s ease, color 0.55s ease;
}
.sb-cta:hover { filter: brightness(1.06); transform: translateY(-1px); }
.sb-cta:active { transform: translateY(0); }

/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) {
  .sidebar *,
  .sb-card,
  .sb-nav-item { transition-duration: 0.01ms !important; }
  .sb-marquee-track { animation: none; }
}
```

---

### 4. `src/scripts/sidebar.ts`

```typescript
/**
 * Sidebar Controller
 * - Adaptive tone switching (light/dark) based on section behind sidebar
 * - Active nav highlighting based on scroll position
 * - Alpine.js state registration
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Mode = 'light' | 'dark';

export function initSidebar(): void {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('section[data-theme]')
  );
  if (!sections.length) return;

  let currentMode: Mode = 'light';
  let currentActive = '';

  /**
   * Probe point = vertical center of the sidebar.
   * Whatever section sits at that point decides the sidebar tone.
   */
  function getProbeY(): number {
    const rect = sidebar!.getBoundingClientRect();
    return rect.top + rect.height / 2;
  }

  function setMode(mode: Mode): void {
    if (mode === currentMode) return;
    currentMode = mode;
    sidebar!.setAttribute('data-mode', mode);

    // Sync Alpine state if present
    const alpine = (sidebar as any)._x_dataStack?.[0];
    if (alpine) alpine.mode = mode;
  }

  function setActive(id: string): void {
    if (id === currentActive) return;
    currentActive = id;

    sidebar!.querySelectorAll<HTMLElement>('[data-nav-id]').forEach((el) => {
      el.classList.toggle('sb-nav-active', el.dataset.navId === id);
    });

    const alpine = (sidebar as any)._x_dataStack?.[0];
    if (alpine) alpine.active = id;
  }

  function update(): void {
    const probeY = getProbeY();

    // Tone: which section is behind the sidebar's center
    for (let i = sections.length - 1; i >= 0; i--) {
      const r = sections[i].getBoundingClientRect();
      if (r.top <= probeY && r.bottom >= probeY) {
        setMode((sections[i].dataset.theme as Mode) || 'light');
        break;
      }
    }

    // Active nav: which section occupies the viewport center
    const centerY = window.innerHeight / 2;
    for (let i = sections.length - 1; i >= 0; i--) {
      const r = sections[i].getBoundingClientRect();
      if (r.top <= centerY && r.bottom >= centerY) {
        setActive(sections[i].id);
        break;
      }
    }
  }

  // Throttle with rAF
  let ticking = false;
  function onScroll(): void {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  update(); // initial

  // Entrance animation for the card blocks
  if (!reduced) {
    gsap.from(sidebar.children, {
      x: -24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    });
  }
}

// Alpine component
export function registerSidebarAlpine(Alpine: any): void {
  Alpine.data('sidebarState', () => ({
    mode: 'light',
    active: 'hero',
    copied: false,
    copyEmail() {
      const text = this.$refs.emailText?.textContent?.trim();
      if (!text) return;
      navigator.clipboard.writeText(text);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
  }));
}
```

---

### 5. Tandai Setiap Section dengan `data-theme`

```astro
<section id="hero"         data-theme="light">...</section>
<section id="about"        data-theme="dark">...</section>
<section id="projects"     data-theme="dark">...</section>
<section id="services"     data-theme="light">...</section>
<section id="pricing"      data-theme="light">...</section>
<section id="testimonials" data-theme="dark">...</section>
<section id="faq"          data-theme="light">...</section>
<section id="cta"          data-theme="dark">...</section>
```

Sesuaikan dengan warna background asli tiap section.

---

### 6. Init di Layout

```astro
<script>
  import Alpine from 'alpinejs';
  import collapse from '@alpinejs/collapse';
  import { initSidebar, registerSidebarAlpine } from '../scripts/sidebar';

  Alpine.plugin(collapse);
  registerSidebarAlpine(Alpine);
  Alpine.start();

  initSidebar();
</script>
```

---

## LAYOUT UTAMA — Beri Ruang untuk Sidebar

Karena sidebar floating dengan lebar 300px + margin 24px kiri:

```css
main {
  margin-left: 348px;  /* 24 + 300 + 24 */
}

@media (max-width: 1023px) {
  main { margin-left: 0; }
}
```

---

## CHECKLIST VERIFIKASI

Sebelum bilang selesai, cek satu per satu:

- [ ] Sidebar **floating** — ada jarak 24px dari kiri, atas, dan bawah layar
- [ ] Ada **5 blok terpisah** dengan gap 12px, bukan satu panel menyatu
- [ ] Setiap blok punya `border-radius: 20px` dan border tipis
- [ ] Logo GIATTECH punya **background sage green** (badge), bukan text polos
- [ ] Social icon: di light mode **bg gelap**, di dark mode **bg terang transparan**
- [ ] Stats: angka 30px sage green, label 11px uppercase bold
- [ ] Nav items **lebarnya ikut isi text** (pill kecil), BUKAN full width
- [ ] Nav inactive punya **background** (bukan transparan)
- [ ] Nav active = **sage green pill**
- [ ] Nav container `align-items: flex-start` biar pill tidak stretch
- [ ] Marquee client **tanpa card background**, ada mask fade kiri-kanan
- [ ] Email pill full width dengan copy button yang berfungsi
- [ ] CTA full width sage green
- [ ] Scroll dari atas ke bawah → semua card, text, border **transisi smooth 0.55s**
- [ ] Sage green **tidak berubah** di kedua mode
- [ ] `backdrop-filter: blur(12px)` aktif di semua card
- [ ] Reduced motion: transisi instant, marquee berhenti
- [ ] Mobile (< 1024px): sidebar hidden, ada toggle button

---

## LARANGAN

- Jangan bikin sidebar full height mepet ke sisi layar
- Jangan gabung semua blok jadi satu panel besar
- Jangan bikin nav item full width — harus `inline-flex` + `width: auto`
- Jangan hilangkan background nav item yang inactive
- Jangan ubah warna sage green saat mode switch
- Jangan pakai `setInterval` untuk deteksi scroll — pakai rAF throttle
- Jangan lupa `align-items: flex-start` di nav container
