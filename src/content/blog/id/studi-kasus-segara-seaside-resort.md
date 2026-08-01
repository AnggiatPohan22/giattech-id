---
title: "Studi Kasus: Segara Seaside Resort — Merapikan Jalur Jaringan Internet itu Penting"
description: "Membangun kembali jalur jaringan internet di Segara Seaside agar kualitas jaringan lebih stabil dan mudah dalam maintenance"
lang: id
slug: studi-kasus-segara-seaside-resort
translationKey: studi-kasus-segara-seaside
category: portofolio
tags: ["Studi Kasus", "Network", "Resort", "Maintenance", "Setup", "MikroTik", "VLAN"]
publishDate: 2026-05-30
author: Giattech
relatedProject: segara-seaside-resort
cover: /images/blog/studi-kasus-segara-seaside.webp
coverAlt: "Studi Kasus: Segara Seaside Resort — Merapikan Jalur Jaringan Internet itu Penting"
---

Segara Seaside Resort mengelola properti di Nusa Lembongan dengan tamu yang datang dari berbagai kanal. Internet yang stabil bukan lagi kemewahan — itu bagian dari pengalaman menginap. Masalahnya, jaringan di properti ini sering up and down, dan setiap kali ada gangguan, mencari sumber masalahnya lebih sulit dari memperbaikinya.

## Situasi awal

Sebelum proyek dimulai, kondisi jaringan seperti ini:

- Koneksi internet sering tidak stabil — tamu mengeluh WiFi putus-nyambung
- Ketika salah satu access point di kamar mati atau error, proses troubleshooting memakan waktu lama
- Jalur kabel dari instalasi awal berantakan — tidak ada pelabelan, tidak ada dokumentasi jalur
- Tracing kabel untuk menemukan titik masalah harus dilakukan secara manual dari ujung ke ujung
- Semua perangkat — tamu, CCTV, dan operasional — berada di satu jaringan yang sama, saling berebut bandwidth
- Tidak ada sistem kontrol terpusat untuk memonitor dan mengelola jaringan

Singkatnya: kalau ada masalah, tidak ada yang tahu kabel mana yang menuju ke mana.

## Yang kami temukan di lapangan

Saat survei awal, kami menelusuri setiap jalur kabel dari rack ke masing-masing access point dan perangkat. Beberapa temuan utama:

**Kabel tanpa identitas.** Tidak ada satu pun kabel yang diberi tag name atau label. Di rack, puluhan kabel UTP masuk tanpa tanda — untuk tahu kabel mana yang menuju kamar mana, satu-satunya cara adalah cabut dan lihat mana yang mati.

**Jalur kabel tidak terstruktur.** Beberapa kabel mengambil jalur yang tidak perlu panjang, ada yang ditekuk tajam, dan ada yang digabung dengan kabel listrik. Ini menyebabkan interferensi dan koneksi yang tidak konsisten.

**Satu jaringan untuk semua.** Perangkat CCTV, WiFi tamu, dan komputer operasional semua berada di subnet yang sama. Ketika tamu ramai dan streaming, CCTV ikut terdampak. Tidak ada prioritas bandwidth.

## Apa yang kami kerjakan

### Penataan ulang jalur kabel

Langkah pertama bukan menambah perangkat — tapi merapikan yang sudah ada. Setiap kabel diberi label di kedua ujungnya dengan format yang konsisten: lokasi perangkat, nomor port, dan fungsi. Kabel yang rusak atau terlalu panjang diganti. Jalur yang berantakan dirapikan agar mudah ditelusuri saat troubleshooting berikutnya.

Hasilnya: ketika ada laporan WiFi mati di kamar tertentu, tinggal baca label di rack, langsung ketemu kabelnya.

### Segmentasi jaringan dengan VLAN

Kami memisahkan jaringan menjadi beberapa segmen menggunakan VLAN:

**VLAN Tamu** — khusus untuk WiFi yang diakses tamu. Bandwidth dialokasikan sesuai kapasitas yang dimiliki properti, sehingga penggunaan bisa dikontrol tanpa mengganggu operasional.

**VLAN CCTV** — jalur terpisah untuk sistem pengawasan. CCTV membutuhkan bandwidth yang konsisten untuk streaming dan recording. Dengan VLAN sendiri, kualitas rekaman tidak lagi terganggu oleh traffic tamu.

**VLAN Operasional** — untuk komputer front office dan perangkat internal lainnya.

Pemisahan ini memastikan masing-masing segmen punya alokasi bandwidth yang jelas dan tidak saling mengganggu.

### Kontrol terpusat dengan MikroTik

Seluruh VLAN dikelola melalui MikroTik sebagai DHCP server dan router utama. Dari satu titik kontrol, kami bisa:

- Mengatur alokasi bandwidth per VLAN sesuai kapasitas internet yang tersedia
- Memonitor perangkat mana yang aktif dan mana yang bermasalah
- Membatasi atau memprioritaskan traffic tertentu
- Melakukan troubleshooting tanpa harus ke lokasi fisik perangkat

MikroTik dipilih karena fleksibel, ringan, dan sudah menjadi standar di banyak properti hospitality di Indonesia.

## Hasilnya

- Jaringan internet lebih stabil — keluhan tamu soal WiFi putus turun drastis
- Troubleshooting yang sebelumnya bisa memakan waktu berjam-jam, sekarang bisa dilakukan dalam hitungan menit berkat pelabelan dan dokumentasi jalur
- Bandwidth terkelola — CCTV tidak lagi terganggu saat tamu ramai, dan sebaliknya
- Tim operasional bisa memonitor kondisi jaringan dari satu dashboard tanpa harus tracing kabel manual
- Ketika ada penambahan access point atau perangkat baru, tinggal ikuti jalur dan standar yang sudah ada

## Pelajaran

**Infrastruktur yang rapi menghemat lebih banyak waktu daripada perangkat yang mahal.** Access point terbaik pun tidak akan membantu kalau jalur kabelnya berantakan dan tidak terdokumentasi. Rapikan dulu fondasi, baru bicara upgrade.

**VLAN bukan hanya untuk jaringan besar.** Bahkan untuk properti skala kecil-menengah, memisahkan traffic tamu dan CCTV sudah memberikan perbedaan yang terasa. Ini soal kontrol, bukan soal skala.

**Label itu investasi.** Satu jam memasang label di semua kabel menghemat puluhan jam troubleshooting di masa depan. Tidak ada alasan untuk melewatkan langkah ini.

## Lihat lebih lanjut

Ringkasan proyek ini ada di [halaman portofolio kami](/#projects). Untuk studi kasus lain dengan pendekatan berbeda, baca [studi kasus Bintan Prestige](/blog/studi-kasus-bintan-prestige-transport/).

Kalau jaringan di properti Anda sering bermasalah dan troubleshooting terasa seperti menebak-nebak, [mari bicarakan](/#cta).