---
title: "Cara Membangun Dashboard Admin Laravel yang Benar-Benar Dipakai"
description: "Panduan membangun dashboard admin Laravel: struktur data, hak akses, audit trail, dan keputusan UI yang membuat tim operasional berhenti memakai spreadsheet."
lang: id
slug: cara-membangun-dashboard-admin-laravel
translationKey: laravel-admin-dashboard
category: tutorial-panduan
tags: ["Laravel", "Dashboard", "Backend", "PHP", "Admin Panel"]
publishDate: 2026-05-16
author: Giattech
relatedProject: segara-seaside-resort
cover: /images/blog/build-laravel-admin-dashboard-giattech.webp
coverAlt: "Cara Membangun Dashboard Admin Laravel yang Benar-Benar Dipakai"
---

Dashboard admin adalah bagian aplikasi yang paling sering dipakai dan paling jarang diperhatikan. Klien melihat halaman depan; tim operasional hidup di dashboard delapan jam sehari. Kalau dashboardnya buruk, mereka akan diam-diam kembali ke spreadsheet — dan investasi Anda hangus.

Panduan ini merangkum keputusan yang kami ambil saat membangun dashboard admin Laravel untuk klien nyata.

## Mulai dari alur kerja, bukan dari tabel database

Kesalahan paling umum: membuat CRUD untuk setiap tabel, lalu menyebutnya dashboard. Hasilnya adalah 25 menu yang secara teknis lengkap tapi tidak membantu siapa pun.

Cara yang benar adalah duduk bersama orang yang akan memakainya dan menuliskan pertanyaan yang mereka ajukan setiap hari:

- "Booking mana yang belum dikonfirmasi hari ini?"
- "Siapa yang belum bayar lewat dari tujuh hari?"
- "Berapa okupansi minggu ini dibanding minggu lalu?"

Setiap pertanyaan itu adalah satu layar. CRUD adalah pendukungnya, bukan produk utamanya.

## Struktur proyek yang tidak berantakan di bulan keenam

Laravel memberi kebebasan besar, dan kebebasan itu jadi masalah kalau tim tidak menyepakati struktur di awal.

Yang kami pakai:

- **Controller tipis.** Controller hanya menerima request, memanggil satu service, dan mengembalikan response.
- **Form Request untuk validasi.** Jangan pernah menaruh aturan validasi di dalam controller.
- **Service class untuk aturan bisnis.** Satu kelas, satu tanggung jawab.
- **Eloquent scope untuk query yang berulang.** `Booking::pending()->today()` jauh lebih terbaca daripada rantai `where` sepanjang tiga baris.
- **Policy untuk hak akses.** Bukan `if ($user->role === 'admin')` tersebar di mana-mana.

```php
// app/Models/Booking.php
public function scopePending($query)
{
    return $query->where('status', BookingStatus::Pending);
}

public function scopeToday($query)
{
    return $query->whereDate('check_in', now()->toDateString());
}
```

### Pakai enum, bukan string mentah

Status yang disimpan sebagai string bebas akan menghasilkan `pending`, `Pending`, dan `PENDING` dalam satu tabel dalam waktu tiga bulan. PHP 8.1 punya backed enum — gunakan.

```php
enum BookingStatus: string
{
    case Pending   = 'pending';
    case Confirmed = 'confirmed';
    case Cancelled = 'cancelled';
}
```

## Hak akses: rancang sejak awal, bukan ditambal

Hampir semua sistem operasional butuh lebih dari satu peran. Menambahkan sistem peran setelah aplikasi jadi selalu lebih mahal daripada memasangnya di awal.

Tiga lapis yang kami pakai:

1. **Role** — kumpulan izin (admin, supervisor, staff, finance).
2. **Permission** — aksi spesifik (`booking.confirm`, `invoice.void`).
3. **Policy** — aturan per record (`hanya boleh mengedit booking milik cabangnya`).

Package seperti `spatie/laravel-permission` menangani dua lapis pertama dengan baik. Lapis ketiga tetap milik Policy Laravel.

## Audit trail bukan fitur opsional

Begitu ada uang atau jadwal yang bisa diubah, Anda butuh jawaban untuk pertanyaan "siapa yang mengubah ini dan kapan". Tanpa itu, setiap kesalahan berubah jadi perdebatan.

Minimum yang harus dicatat:

- Siapa yang melakukan aksi
- Apa yang berubah — nilai lama dan nilai baru
- Kapan, sampai detik
- Dari mana (IP atau perangkat) kalau relevan

Model events Laravel membuat ini sederhana:

```php
protected static function booted(): void
{
    static::updated(function (Booking $booking) {
        ActivityLog::create([
            'user_id'   => auth()->id(),
            'action'    => 'booking.updated',
            'subject_id'=> $booking->id,
            'changes'   => $booking->getChanges(),
            'original'  => array_intersect_key(
                $booking->getOriginal(),
                $booking->getChanges()
            ),
        ]);
    });
}
```

## Keputusan UI yang membuat dashboard benar-benar dipakai

### Tabel harus bisa disaring dan diekspor

Tim operasional akan selalu butuh memfilter dan mengunduh. Kalau Anda tidak menyediakannya, mereka akan meminta laporan lewat WhatsApp setiap minggu — dan itu menjadi pekerjaan Anda selamanya.

Sediakan minimal: filter tanggal, filter status, pencarian teks, dan ekspor CSV.

### Aksi massal menghemat jam kerja

Mengonfirmasi 40 booking satu per satu adalah 40 klik dan 40 pemuatan halaman. Checkbox pilih-semua plus satu tombol aksi mengubahnya jadi dua klik.

### Konfirmasi hanya untuk aksi merusak

Dialog konfirmasi di setiap tombol melatih pengguna untuk mengklik "Ya" tanpa membaca. Simpan konfirmasi untuk penghapusan dan pembatalan saja.

### Dashboard beranda menampilkan tindakan, bukan hanya angka

Kartu "Total Booking: 1.284" tidak menyuruh siapa pun melakukan apa pun. Kartu "12 booking menunggu konfirmasi" yang bisa diklik langsung ke daftarnya jauh lebih berguna.

## Performa: masalah yang muncul di bulan ketiga

Dashboard terasa cepat saat datanya 50 baris. Pada 50.000 baris, tiga hal ini akan menggigit:

**Query N+1.** Selalu pakai `with()` untuk memuat relasi. Pasang Laravel Debugbar di lingkungan lokal supaya Anda melihatnya sebelum klien yang melihatnya.

**Paginasi wajib.** `Booking::all()` di halaman index adalah bom waktu. Pakai `paginate()`, dan untuk tabel yang sangat besar pertimbangkan `cursorPaginate()`.

**Index database.** Kolom yang dipakai di `where`, `order by`, dan `join` perlu index. Ini perbaikan lima menit yang sering menghemat detik per request.

## Pekerjaan latar belakang

Apa pun yang lebih lambat dari sekitar 200 ms sebaiknya tidak terjadi di dalam siklus request:

- Kirim email dan notifikasi lewat queue.
- Buat laporan PDF dan ekspor besar lewat job.
- Panggil API pihak ketiga lewat job dengan retry.

Laravel Queue dengan driver database sudah cukup untuk sebagian besar kasus; Redis kalau volumenya besar.

## Checklist sebelum diserahkan ke klien

- [ ] Semua tabel besar punya paginasi dan index
- [ ] Setiap peran diuji dengan akun sungguhan, bukan hanya sebagai admin
- [ ] Audit log aktif untuk semua aksi yang menyentuh uang atau jadwal
- [ ] Backup database terjadwal dan sudah pernah diuji restore-nya
- [ ] Ada halaman error yang manusiawi, bukan stack trace
- [ ] Rate limiting di endpoint login
- [ ] Dokumen singkat cara memakai, dengan tangkapan layar

## Penutup

Dashboard yang baik diukur dari satu hal: apakah timnya berhenti memakai spreadsheet. Semua keputusan teknis di atas mengarah ke sana.

Kalau Anda ingin melihat penerapannya pada sistem operasional resort, baca [studi kasus Segara Seaside Resort](/blog/studi-kasus-segara-seaside-resort/). Untuk membicarakan sistem internal Anda sendiri, [hubungi kami di sini](/#cta).
