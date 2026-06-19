window.MATERI = {
  id: "uji_chi",
  judul: "Uji Chi-Kuadrat",
  isi: `
## Apa Itu Uji Chi-Kuadrat?

Uji Chi-Kuadrat ($\\chi^2$) adalah uji statistik **non-parametrik** yang digunakan untuk data kategorik. Uji ini membandingkan frekuensi yang **diamati (observed)** dengan frekuensi yang **diharapkan (expected)** berdasarkan suatu hipotesis.

Statistik uji:

$$\\chi^2 = \\sum_{i=1}^{k} \\frac{(O_i - E_i)^2}{E_i}$$

- $O_i$ = frekuensi observasi kategori ke-$i$  
- $E_i$ = frekuensi harapan kategori ke-$i$  

---

## Jenis Uji Chi-Kuadrat

### 1. Uji Kecocokan (*Goodness of Fit*)

Menguji apakah distribusi frekuensi observasi **sesuai** dengan distribusi yang dihipotesiskan.

- $H_0$: Data sesuai dengan distribusi yang dihipotesiskan
- $H_1$: Data tidak sesuai  
- $df = k - 1$ (k = banyak kategori)

**Contoh:**

Sebuah dadu dilempar 120 kali. Apakah dadu tersebut seimbang ($\\alpha = 0{,}05$)?

| Mata Dadu | $O_i$ | $E_i$ | $(O_i - E_i)^2/E_i$ |
|-----------|-------|-------|----------------------|
| 1 | 18 | 20 | 0,200 |
| 2 | 22 | 20 | 0,200 |
| 3 | 17 | 20 | 0,450 |
| 4 | 24 | 20 | 0,800 |
| 5 | 19 | 20 | 0,050 |
| 6 | 20 | 20 | 0,000 |
| **Total** | **120** | **120** | **1,700** |

$$\\chi^2_{hitung} = 1{,}700$$

$\\chi^2_{tabel}$ untuk $df = 5$, $\\alpha = 0{,}05$ = **11,070**

Karena $1{,}70 < 11{,}07$, **gagal tolak $H_0$** — dadu seimbang.

---

### 2. Uji Independensi (*Chi-Square Test of Independence*)

Menguji apakah dua variabel kategorik **saling independen** atau ada keterkaitan.

Data disusun dalam **tabel kontingensi** $r \\times c$:

$$E_{ij} = \\frac{(\\text{Total baris ke-}i) \\times (\\text{Total kolom ke-}j)}{\\text{Total keseluruhan}}$$

$$\\chi^2 = \\sum_{i}\\sum_{j} \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}$$

$$df = (r-1)(c-1)$$

**Contoh:**

Apakah ada hubungan antara jenis kelamin dan preferensi olahraga?

**Tabel Observasi:**

| | Sepak Bola | Bulu Tangkis | Renang | **Total** |
|--|-----------|-------------|--------|-----------|
| Laki-laki | 30 | 10 | 20 | **60** |
| Perempuan | 10 | 20 | 30 | **60** |
| **Total** | **40** | **30** | **50** | **120** |

**Tabel Harapan ($E_{ij} = \\frac{\\text{Total baris} \\times \\text{Total kolom}}{120}$):**

| | Sepak Bola | Bulu Tangkis | Renang |
|--|-----------|-------------|--------|
| Laki-laki | $\\frac{60 \\times 40}{120} = 20$ | $\\frac{60 \\times 30}{120} = 15$ | $\\frac{60 \\times 50}{120} = 25$ |
| Perempuan | 20 | 15 | 25 |

**Perhitungan $\\chi^2$:**

$$\\chi^2 = \\frac{(30-20)^2}{20} + \\frac{(10-15)^2}{15} + \\frac{(20-25)^2}{25} + \\frac{(10-20)^2}{20} + \\frac{(20-15)^2}{15} + \\frac{(30-25)^2}{25}$$

$$= \\frac{100}{20} + \\frac{25}{15} + \\frac{25}{25} + \\frac{100}{20} + \\frac{25}{15} + \\frac{25}{25}$$

$$= 5 + 1{,}667 + 1 + 5 + 1{,}667 + 1 = 15{,}333$$

$df = (2-1)(3-1) = 2$, $\\quad \\chi^2_{tabel, 0{,}05} = 5{,}991$

Karena $15{,}33 > 5{,}99$, **tolak $H_0$** — ada hubungan antara jenis kelamin dan preferensi olahraga.

---

## Ukuran Kekuatan Asosiasi

Setelah menemukan asosiasi yang signifikan, ukur kekuatannya:

### Koefisien Phi ($\\phi$) — untuk tabel 2×2

$$\\phi = \\sqrt{\\frac{\\chi^2}{n}}$$

### Cramér's V — untuk tabel lebih besar

$$V = \\sqrt{\\frac{\\chi^2}{n \\cdot \\min(r-1, c-1)}}$$

| Nilai $V$ | Interpretasi |
|-----------|-------------|
| 0,00–0,10 | Asosiasi sangat lemah |
| 0,10–0,30 | Asosiasi lemah |
| 0,30–0,50 | Asosiasi sedang |
| > 0,50 | Asosiasi kuat |

**Dari contoh di atas:**

$$V = \\sqrt{\\frac{15{,}333}{120 \\times 1}} = \\sqrt{0{,}1278} \\approx 0{,}357$$

Asosiasi antara jenis kelamin dan preferensi olahraga tergolong **sedang**.

---

## Asumsi Uji Chi-Kuadrat

1. Data berupa **frekuensi** (bukan proporsi atau persentase)
2. Setiap observasi **independen**
3. **Frekuensi harapan** setiap sel minimal **5** (aturan praktis)
4. Ukuran sampel cukup besar

> Jika frekuensi harapan < 5, gunakan **Uji Fisher's Exact** (terutama untuk tabel 2×2).

---

## Uji Chi-Kuadrat vs Uji-t

| Aspek | Uji Chi-Kuadrat | Uji-t |
|-------|----------------|-------|
| Jenis data | Kategorik (nominal/ordinal) | Numerik (interval/rasio) |
| Tujuan | Distribusi / asosiasi | Perbandingan rata-rata |
| Asumsi distribusi | Tidak diperlukan | Normalitas |
| Ukuran sampel | Besar ($E_{ij} \\geq 5$) | Bisa kecil |

---

## Latihan Soal

**Soal.** Survei dilakukan terhadap 200 responden mengenai hubungan antara pendidikan dan kepuasan kerja:

| | Puas | Tidak Puas | **Total** |
|--|------|------------|-----------|
| SMA | 40 | 60 | **100** |
| Sarjana | 70 | 30 | **100** |
| **Total** | **110** | **90** | **200** |

a) Hitung nilai $\\chi^2$ dan tentukan apakah ada hubungan signifikan ($\\alpha = 0{,}05$)  
b) Hitung Cramér's V dan interpretasikan kekuatan asosiasinya
`
};
