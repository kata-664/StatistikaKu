window.MATERI = {
  id: "statistik_deskriptif",
  judul: "Mean, Median & Modus",
  isi: `
## Pengertian Ukuran Pemusatan

Ukuran pemusatan adalah nilai tunggal yang mewakili kumpulan data secara keseluruhan. Tiga ukuran yang paling sering digunakan adalah **mean**, **median**, dan **modus**.

---

## Mean (Rata-Rata)

Mean adalah jumlah seluruh nilai data dibagi banyaknya data.

$$\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}$$

**Contoh:**

Data nilai ujian: 70, 80, 75, 90, 85

$$\\bar{x} = \\frac{70 + 80 + 75 + 90 + 85}{5} = \\frac{400}{5} = 80$$

### Mean Data Berkelompok

Untuk data yang sudah dikelompokkan dalam kelas interval:

$$\\bar{x} = \\frac{\\sum f_i \\cdot x_i}{\\sum f_i}$$

di mana $f_i$ adalah frekuensi kelas ke-$i$ dan $x_i$ adalah nilai tengah kelas ke-$i$.

| Nilai | Frekuensi ($f$) | Nilai Tengah ($x$) | $f \\cdot x$ |
|-------|-----------------|---------------------|--------------|
| 60–69 | 3 | 64,5 | 193,5 |
| 70–79 | 8 | 74,5 | 596,0 |
| 80–89 | 6 | 84,5 | 507,0 |
| 90–99 | 3 | 94,5 | 283,5 |
| **Total** | **20** | | **1580,0** |

$$\\bar{x} = \\frac{1580}{20} = 79$$

---

## Median

Median adalah nilai tengah data setelah diurutkan dari terkecil ke terbesar.

- **Jika $n$ ganjil:** median = nilai ke-$\\frac{n+1}{2}$
- **Jika $n$ genap:** median = rata-rata nilai ke-$\\frac{n}{2}$ dan ke-$\\frac{n}{2}+1$

$$M_e = \\frac{x_{n/2} + x_{n/2+1}}{2} \\quad (\\text{untuk } n \\text{ genap})$$

**Contoh ($n$ ganjil):**

Data: 3, 7, 5, 12, 9 → diurutkan: 3, 5, **7**, 9, 12

Median = 7 (nilai ke-3 dari 5 data)

**Contoh ($n$ genap):**

Data: 3, 5, 7, 9 → Median $= \\frac{5+7}{2} = 6$

### Median Data Berkelompok

$$M_e = L + \\frac{\\frac{n}{2} - F}{f} \\cdot c$$

- $L$ = batas bawah kelas median  
- $n$ = total frekuensi  
- $F$ = frekuensi kumulatif sebelum kelas median  
- $f$ = frekuensi kelas median  
- $c$ = lebar kelas  

---

## Modus

Modus adalah nilai yang **paling sering muncul** dalam data.

**Contoh:**

Data: 4, 6, 6, 7, 8, 8, 8, 9 → **Modus = 8** (muncul 3 kali)

Data bisa memiliki **lebih dari satu modus** (bimodal / multimodal), atau **tidak memiliki modus** jika semua nilai muncul sama sering.

### Modus Data Berkelompok

$$M_o = L + \\frac{d_1}{d_1 + d_2} \\cdot c$$

- $L$ = batas bawah kelas modus  
- $d_1$ = selisih frekuensi kelas modus dengan kelas sebelumnya  
- $d_2$ = selisih frekuensi kelas modus dengan kelas sesudahnya  
- $c$ = lebar kelas  

---

## Perbandingan Mean, Median & Modus

| Ukuran | Kelebihan | Kekurangan |
|--------|-----------|------------|
| Mean | Memperhitungkan semua data | Sensitif terhadap outlier |
| Median | Tidak terpengaruh outlier | Tidak memperhitungkan semua nilai |
| Modus | Mudah ditemukan | Bisa tidak ada / lebih dari satu |

### Hubungan pada Distribusi Miring

Untuk distribusi **miring kanan** (positif skewed):

$$\\text{Modus} < \\text{Median} < \\text{Mean}$$

Untuk distribusi **miring kiri** (negatif skewed):

$$\\text{Mean} < \\text{Median} < \\text{Modus}$$

> **Tips:** Gunakan **median** ketika data mengandung outlier (nilai ekstrem), misalnya data pendapatan. Gunakan **mean** ketika distribusi data mendekati simetris.

---

## Latihan Soal

**Soal 1.** Diketahui data: 12, 15, 18, 15, 20, 25, 15, 22. Tentukan mean, median, dan modusnya!

**Penyelesaian:**

Data diurutkan: 12, 15, 15, 15, 18, 20, 22, 25

- **Mean** $= \\frac{12+15+15+15+18+20+22+25}{8} = \\frac{142}{8} = 17{,}75$
- **Median** $= \\frac{15+18}{2} = 16{,}5$ (rata-rata nilai ke-4 dan ke-5)
- **Modus** $= 15$ (muncul 3 kali)
`
};
