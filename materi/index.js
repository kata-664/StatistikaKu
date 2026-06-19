/**
 * materi/index.js
 * ------------------------------------------------------
 * MANIFEST DAFTAR MATERI
 * ------------------------------------------------------
 * Ini adalah satu-satunya file yang perlu diubah ketika
 * menambahkan materi baru.
 *
 * CARA MENAMBAH MATERI BARU:
 * 1. Buat file baru di folder /materi, contoh: materi/uji_hipotesis.js
 *    isinya harus mengikuti format window.MATERI = {...} (lihat materi/regresi.js)
 * 2. Tambahkan nama file (tanpa .js) ke array MATERI_LIST di bawah ini.
 * 3. Tambahkan juga tag <script> untuk file tersebut di index.html
 *    (tepat sebelum <script src="materi/index.js">), ATAU biarkan
 *    app.js memuatnya secara dinamis (sudah didukung otomatis).
 *
 * Urutan dalam array ini menentukan urutan tampilan di sidebar
 * dan urutan tombol "Sebelumnya / Berikutnya".
 */

const MATERI_LIST = [
  "statistik_deskriptif",
  "distribusi_normal",
  "korelasi",
  "regresi"
];

// Jangan diubah — digunakan oleh app.js & router.js
if (typeof window !== "undefined") {
  window.MATERI_LIST = MATERI_LIST;
}
