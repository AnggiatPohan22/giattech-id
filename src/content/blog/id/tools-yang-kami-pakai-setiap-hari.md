---
title: "Tools yang Kami Pakai Setiap Hari di Giattech (dan Alasannya)"
description: "Daftar lengkap stack Giattech 2026: framework, editor, hosting, desain, dan tools AI — termasuk yang kami coba lalu tinggalkan, beserta alasannya."
lang: id
slug: tools-yang-kami-pakai-setiap-hari
translationKey: stack-giattech
category: teknologi-tools
tags: ["Stack", "Tools", "Laravel", "Astro", "Produktivitas"]
publishDate: 2026-06-06
author: Giattech
cover: /images/blog/stack-giattech.webp
coverAlt: "Tools yang Kami Pakai Setiap Hari di Giattech (dan Alasannya)"
---

Daftar tools mudah dibuat dan mudah dipamerkan. Yang jarang ditulis orang adalah alasannya, dan apa yang sudah dicoba lalu ditinggalkan. Artikel ini mencoba menulis keduanya.

Ini adalah stack yang benar-benar kami pakai di Giattech pada 2026.

## Pengembangan front-end

### Astro — untuk situs berbasis konten

Situs marketing, portofolio, dan blog kami dibangun dengan Astro. Alasannya sederhana: halaman dikirim sebagai HTML, JavaScript hanya dimuat untuk komponen yang benar-benar interaktif, dan hasilnya cepat tanpa usaha tambahan.

Content collections dengan validasi skema juga menghemat banyak waktu — kesalahan frontmatter ketahuan saat build, bukan saat halaman sudah live.

Perbandingan lengkapnya dengan WordPress ada di [artikel Astro vs WordPress](/blog/astro-vs-wordpress-mana-yang-cocok/).

### Tailwind CSS — untuk semua styling

Tailwind menghilangkan sebagian besar perdebatan penamaan kelas dan menjaga CSS tetap kecil karena hanya kelas yang dipakai yang dikirim.

Yang kami sesuaikan: token desain kami taruh di custom property CSS, bukan di konfigurasi tema Tailwind. Itu membuat pergantian warna brand jadi satu file yang diedit, dan bekerja juga di komponen yang tidak memakai Tailwind.

### Alpine.js — untuk interaksi kecil

Dropdown, accordion, dan toggle menu tidak butuh framework 40 KB. Alpine menangani semua itu dengan atribut di HTML dan ukuran yang jauh lebih kecil.

Aturan kami: kalau state-nya lebih rumit dari satu komponen, itu tanda desainnya perlu disederhanakan, bukan tanda perlu framework lebih besar.

### GSAP — untuk animasi

Kami memakai GSAP dengan ScrollTrigger untuk animasi masuk dan efek scroll. Alasannya konsistensi lintas browser dan kontrol timeline yang tidak dimiliki animasi CSS murni.

Aturan wajib: semua animasi menghormati `prefers-reduced-motion`.

## Pengembangan back-end

### Laravel — untuk semua yang butuh database

Aplikasi web, dashboard admin, dan API kami dibangun dengan Laravel. Yang membuatnya sepadan: Eloquent, sistem queue, scheduler, dan pengujian yang sudah tertata sejak awal.

Yang kami pakai hampir di setiap proyek:

- **Form Request** untuk validasi
- **Policy** untuk hak akses per record
- **Queue** untuk email, PDF, dan panggilan API
- **Pest** untuk pengujian — sintaksnya lebih ringkas dari PHPUnit

Pola yang kami terapkan ada di [panduan dashboard admin Laravel](/blog/cara-membangun-dashboard-admin-laravel/).

### MySQL dan PostgreSQL

MySQL untuk sebagian besar proyek karena dukungan hosting di Indonesia luas. PostgreSQL kalau kami butuh tipe data JSON yang serius atau query analitik.

### Redis

Untuk cache dan queue begitu volumenya melewati kemampuan nyaman driver database.

## Lingkungan kerja

- **VS Code** sebagai editor utama
- **Laragon** untuk lingkungan lokal di Windows — cepat dipasang dan tidak rewel
- **TablePlus** untuk melihat database
- **Insomnia** untuk menguji API
- **Git** dengan alur branch per fitur

## Hosting dan deployment

- **Hostinger** untuk situs statis dan klien kecil di pasar Indonesia — murah dan cukup cepat dengan server regional
- **VPS terkelola** untuk aplikasi Laravel
- **Cloudflare** untuk DNS dan CDN di hampir semua proyek
- **GitHub Actions** untuk build dan deploy otomatis

Pertimbangan lengkap memilih hosting ada di [artikel terpisah](/blog/memilih-hosting-untuk-website-bisnis/).

## Desain

- **Figma** untuk wireframe dan desain antarmuka
- **Squoosh** untuk kompresi gambar manual
- **Sharp** untuk konversi format batch di pipeline build

Kami tidak membuat desain hi-fi untuk setiap halaman. Untuk situs marketing, kami sering langsung membangun di kode setelah wireframe kasar disetujui — iterasi di browser lebih cepat daripada iterasi di Figma lalu menerjemahkannya ulang.

## Pengujian dan audit

- **Lighthouse** di Chrome DevTools untuk audit performa
- **PageSpeed Insights** untuk data lapangan
- **Google Search Console** untuk pemantauan indeks
- **Perangkat sungguhan** — satu Android kelas menengah dan satu iPhone. Emulator tidak menunjukkan seberapa lambat CPU sesungguhnya.

## Tools AI

Kami memakai asisten AI untuk pekerjaan yang memang cocok: menulis boilerplate, menjelaskan kode yang tidak familier, membuat draf pengujian, dan meninjau perubahan sebelum kami tinjau sendiri.

Yang **tidak** kami serahkan ke AI: keputusan arsitektur, penanganan data sensitif, dan kode yang tidak kami pahami. Pandangan kami soal ini ada di [artikel AI dan developer](/blog/ai-tidak-menggantikan-developer/).

## Yang kami coba lalu tinggalkan

**Page builder visual.** Cepat di awal, tapi menghasilkan markup berat dan sulit dirawat. Setiap kali kami memakainya, proyeknya berakhir dengan penulisan ulang.

**Framework CSS komponen jadi.** Terasa cepat di minggu pertama, lalu kami menghabiskan waktu lebih banyak untuk melawan gayanya daripada menulis CSS sendiri.

**Terlalu banyak micro-service untuk proyek kecil.** Kami pernah memecah aplikasi menjadi beberapa layanan yang seharusnya cukup satu. Kompleksitas operasionalnya tidak sepadan.

**Tool manajemen proyek yang berat.** Untuk tim kecil, papan sederhana dan catatan yang rapi mengalahkan sistem dengan 30 field wajib.

## Prinsip yang mendasari pilihan-pilihan ini

1. **Pilih yang membosankan.** Teknologi matang punya dokumentasi, jawaban di forum, dan lebih sedikit kejutan.
2. **Kurangi bagian yang bergerak.** Setiap layanan tambahan adalah satu hal lagi yang bisa gagal jam dua pagi.
3. **Optimalkan untuk perawatan, bukan kesenangan menulisnya.** Kode dibaca jauh lebih sering daripada ditulis.
4. **Ukur sebelum mengganti.** "Terasa lambat" bukan alasan untuk mengganti stack.

## Penutup

Stack yang tepat adalah yang cocok dengan tim, anggaran, dan kebutuhan perawatan Anda — bukan yang sedang ramai dibicarakan.

Kalau Anda ingin tahu stack apa yang cocok untuk proyek Anda, [ceritakan kebutuhannya](/#cta), atau lihat [apa yang sudah kami bangun](/#projects).
