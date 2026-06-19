# StatistikaKu

Aplikasi web statis untuk belajar statistika — HTML, CSS, dan JavaScript murni.
Tidak memerlukan backend, database, atau Node.js. Cukup upload ke **GitHub Pages**.

## ✨ Fitur

- Landing page modern & responsif (desktop + mobile)
- Sidebar daftar materi otomatis (berdasarkan `materi/index.js`)
- Render **Markdown** lengkap (heading, tabel, list, blockquote, code block)
- Render **LaTeX** (rumus inline `$...$` dan blok `$$...$$`) via KaTeX
- Pencarian materi (judul + isi)
- Navigasi materi sebelumnya / berikutnya
- Breadcrumb
- Daftar isi (TOC) otomatis dari heading materi
- Progress bar membaca
- Tombol "Salin Rumus"
- Syntax highlighting untuk code block
- Dark mode & light mode (tersimpan di localStorage)
- Hash routing (`index.html#/materi/regresi`)

## 📁 Struktur Folder

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── router.js
├── materi/
│   ├── index.js          <-- manifest daftar materi
│   ├── statistik_deskriptif.js
│   ├── distribusi_normal.js
│   ├── korelasi.js
│   └── regresi.js
└── assets/
    └── favicon.svg
```

## ➕ Cara Menambah Materi Baru

Cukup **2 langkah**, tanpa mengubah file lain:

### 1. Buat file materi baru di folder `/materi`

Contoh: `materi/uji_hipotesis.js`

```javascript
window.MATERI = {
  id: "uji_hipotesis",
  judul: "Uji Hipotesis",
  kategori: "Inferensial",
  isi: `
# Uji Hipotesis

Penjelasan materi di sini menggunakan **Markdown**.

## Rumus

$$
Z = \\frac{\\bar{x} - \\mu}{\\sigma / \\sqrt{n}}
$$
`
};
```

**Catatan format:**
- `id` harus sama dengan nama file (tanpa `.js`) dan unik.
- `isi` ditulis dalam template literal (backtick) berisi Markdown + LaTeX.
- Gunakan `\\\\` (double backslash) untuk command LaTeX di dalam template literal JS, contoh: `\\\\frac{a}{b}`.

### 2. Daftarkan id materi di `materi/index.js`

```javascript
const MATERI_LIST = [
  "statistik_deskriptif",
  "distribusi_normal",
  "korelasi",
  "regresi",
  "uji_hipotesis"   // <-- tambahkan di sini
];
```

Selesai! Materi baru otomatis muncul di sidebar, halaman beranda, pencarian,
dan navigasi sebelumnya/berikutnya — **tanpa mengubah `index.html`, `app.js`, atau file lainnya.**

> ⚠️ GitHub Pages tidak bisa membaca isi folder secara otomatis dari browser,
> sehingga `materi/index.js` berfungsi sebagai daftar manifest manual yang
> WAJIB diperbarui setiap kali menambah file materi baru.

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (contoh: `statistikaku`).
2. Upload seluruh isi folder ini ke repository tersebut (root, bukan di dalam subfolder).
3. Buka **Settings → Pages** di repository.
4. Pada bagian **Source**, pilih branch `main` dan folder `/ (root)`.
5. Simpan. Tunggu beberapa menit, situs akan aktif di:
   `https://<username>.github.io/<nama-repo>/`

## 🖥️ Menjalankan Secara Lokal

Karena materi dimuat menggunakan `<script src="...">` dinamis dan fetch
relatif, sebaiknya jalankan lewat server lokal sederhana (bukan `file://`)
agar tidak terkena batasan CORS browser:

```bash
# Python 3
python -m http.server 8000

# atau Node (jika tersedia)
npx serve .
```

Lalu buka `http://localhost:8000` di browser.

## 🎨 Kustomisasi Tema

Warna utama diatur lewat CSS variables di `css/style.css`:

```css
:root{
  --color-primary: #2563EB; /* Biru statistik */
  --bg-app: #F4F6F9;        /* Abu-abu muda */
  --bg-surface: #FFFFFF;    /* Putih */
}
```

Dark mode otomatis menyesuaikan lewat atribut `data-theme="dark"` pada `<html>`.

## 📚 Library yang Digunakan (via CDN)

- [KaTeX](https://katex.org/) — render rumus matematika
- [markdown-it](https://github.com/markdown-it/markdown-it) — parser Markdown
- [highlight.js](https://highlightjs.org/) — syntax highlighting code block

Semua dimuat lewat CDN, tidak perlu instalasi apa pun.

---

Dibuat dengan ❤️ untuk siapa pun yang ingin belajar statistika dengan mudah.
