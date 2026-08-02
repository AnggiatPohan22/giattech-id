---
title: "Cara Mempercepat Loading Website: Panduan Core Web Vitals"
description: "Cara mengukur dan memperbaiki LCP, INP, dan CLS pada website bisnis — dari gambar, font, JavaScript, sampai hosting. Dengan target angka yang jelas."
lang: id
slug: cara-mempercepat-loading-website-core-web-vitals
translationKey: optimasi-kecepatan-website
category: tutorial-panduan
tags: ["Performance", "Core Web Vitals", "SEO", "Optimasi", "Lighthouse"]
publishDate: 2026-06-20
author: Giattech
cover: /images/blog/how-to-speed-your-website-giattech.webp
coverAlt: "Cara Mempercepat Loading Website: Panduan Core Web Vitals"
---

Website yang lambat kehilangan pengunjung sebelum sempat menjual apa pun. Google juga menjadikan kecepatan sebagai sinyal peringkat lewat **Core Web Vitals**. Kabar baiknya: sebagian besar masalah kecepatan berasal dari lima penyebab yang sama, dan semuanya bisa diperbaiki.

Artikel ini menjelaskan apa yang diukur, berapa target angkanya, dan urutan perbaikan yang memberi hasil paling besar.

## Tiga metrik yang benar-benar dihitung

### LCP — Largest Contentful Paint

Waktu sampai elemen terbesar di layar (biasanya gambar hero atau judul besar) selesai dirender.

- **Baik:** di bawah 2,5 detik
- **Perlu perbaikan:** 2,5–4 detik
- **Buruk:** di atas 4 detik

### INP — Interaction to Next Paint

Seberapa cepat halaman merespons ketika pengguna mengetuk atau mengklik. Metrik ini menggantikan FID sejak 2024.

- **Baik:** di bawah 200 ms
- **Perlu perbaikan:** 200–500 ms
- **Buruk:** di atas 500 ms

### CLS — Cumulative Layout Shift

Seberapa banyak elemen bergeser sendiri saat halaman dimuat. Ini penyebab Anda salah klik tombol karena iklan tiba-tiba muncul di atasnya.

- **Baik:** di bawah 0,1
- **Perlu perbaikan:** 0,1–0,25
- **Buruk:** di atas 0,25

## Cara mengukur dengan benar

Ada dua jenis data, dan keduanya perlu:

**Lab data** — pengujian sintetis di lingkungan terkendali. Pakai Lighthouse di Chrome DevTools atau [PageSpeed Insights](https://pagespeed.web.dev/). Cepat, bisa diulang, cocok untuk membandingkan sebelum dan sesudah perbaikan.

**Field data** — pengukuran dari pengguna sungguhan (CrUX). Ini yang sebenarnya dipakai Google. Bisa dilihat di PageSpeed Insights bagian atas dan di Google Search Console.

Tiga aturan pengujian yang sering dilanggar:

1. **Uji versi produksi, bukan dev server.** Dev server tidak melakukan minifikasi dan kompresi.
2. **Uji mode mobile.** Sebagian besar trafik Indonesia datang dari ponsel dengan CPU jauh lebih lambat dari laptop Anda.
3. **Uji beberapa kali.** Satu pengukuran bisa menyesatkan karena kondisi jaringan.

## Perbaikan berdampak besar, diurutkan

### 1. Gambar — hampir selalu penyebab terbesar

Gambar biasanya menyumbang 60–70% berat halaman. Langkah perbaikannya:

- **Pakai format modern.** WebP menghemat sekitar 30% dibanding JPEG; AVIF bisa lebih. Sediakan fallback lewat `<picture>`.
- **Sesuaikan dimensi.** Jangan pernah menaruh gambar 4000px untuk slot yang lebarnya 800px.
- **Selalu tulis `width` dan `height`.** Ini yang mencegah CLS — browser bisa menyiapkan ruangnya sebelum gambar tiba.
- **Lazy load yang di bawah lipatan** dengan `loading="lazy" decoding="async"`. Jangan pernah lazy load gambar hero — itu justru merusak LCP.

```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  <img src="/images/hero.jpg" width="1200" height="675" alt="Deskripsi jelas" />
</picture>
```

### 2. Font — penyebab CLS yang sering terlewat

Font kustom menyebabkan teks berkedip atau bergeser saat font asli menggantikan font sementara.

- Self-host font Anda daripada memanggil server pihak ketiga.
- Pakai `font-display: swap` supaya teks langsung terbaca.
- Preload font utama: `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
- Batasi jumlah weight yang dimuat. Dua weight biasanya cukup.
- Pertimbangkan font variabel — satu file untuk semua weight.

### 3. JavaScript — penyebab utama INP buruk

Setiap kilobyte JavaScript harus diunduh, diurai, dan dieksekusi. Di ponsel kelas menengah, tahap eksekusi ini mahal.

- Kirim JavaScript hanya untuk komponen yang benar-benar interaktif.
- Tunda skrip pihak ketiga (chat widget, pixel, heatmap) sampai setelah interaksi pertama.
- Audit dependensi Anda. Library 80 KB untuk memformat tanggal jarang sepadan.
- Hindari framework berat untuk halaman yang isinya statis.

Ini alasan kami memilih Astro untuk website marketing: halaman dikirim sebagai HTML, dan JavaScript hanya dimuat untuk pulau-pulau interaktif. Perbandingan pendekatannya ada di [Astro vs WordPress](/blog/astro-vs-wordpress-mana-yang-cocok/).

### 4. CSS — jangan memblokir render

- Inline CSS kritis untuk konten di atas lipatan.
- Hapus CSS yang tidak terpakai. Tailwind melakukan ini otomatis lewat purge.
- Hindari `@import` berantai di CSS — setiap import menambah satu perjalanan jaringan.

### 5. Hosting dan pengiriman

- **Aktifkan kompresi** Brotli atau Gzip di server.
- **Pasang cache header** yang panjang untuk aset ber-hash.
- **Pakai CDN** kalau pengunjung Anda tersebar secara geografis.
- **Pilih lokasi server dekat pengguna.** Untuk pasar Indonesia, server Singapura atau Jakarta terasa bedanya. Lebih lengkap di [panduan memilih hosting](/blog/memilih-hosting-untuk-website-bisnis/).

## Slot iklan dan skrip pihak ketiga

Kalau website Anda memasang iklan atau widget pihak ketiga, dua aturan ini wajib:

1. **Selalu pesan ruangnya lebih dulu.** Beri container tinggi minimum yang tetap, supaya konten tidak melompat saat iklan dimuat. Ini satu-satunya cara menjaga CLS tetap rendah dengan iklan aktif.
2. **Muat asinkron.** Skrip iklan tidak boleh memblokir render halaman.

## Urutan kerja yang kami pakai

1. Ukur baseline dengan PageSpeed Insights mobile. Catat angkanya.
2. Perbaiki gambar — biasanya ini saja sudah memindahkan LCP secara signifikan.
3. Perbaiki font dan tambahkan dimensi eksplisit di semua media.
4. Pangkas JavaScript dan tunda skrip pihak ketiga.
5. Aktifkan kompresi dan cache di server.
6. Ukur ulang, bandingkan dengan baseline.
7. Pantau field data di Search Console selama 28 hari berikutnya.

## Kesalahan yang sering terjadi

- **Mengoptimasi angka Lighthouse desktop.** Google memakai data mobile.
- **Mengejar skor 100.** Selisih 95 ke 100 hampir tidak terasa oleh pengguna; selisih 40 ke 90 terasa sekali.
- **Memasang plugin cache lalu menganggap selesai.** Cache menyembunyikan masalah, tidak menghapusnya.
- **Lupa halaman selain beranda.** Halaman produk dan artikel biasanya lebih berat.

## Target realistis

Untuk website bisnis, angka ini layak dikejar dan bisa dicapai:

- LCP mobile di bawah 2,5 detik pada koneksi 4G
- INP di bawah 200 ms
- CLS di bawah 0,05
- Total berat halaman pertama di bawah 1 MB

Kalau website Anda saat ini jauh dari angka itu dan Anda ingin bantuan menutup jaraknya, [lihat layanan optimasi performa kami](/#services) atau [ceritakan kondisi website Anda](/#cta).
