window.MATERI = {
  id: "korelasi",
  judul: "Korelasi",
  isi: `
## Apa Itu Korelasi?

Korelasi adalah ukuran statistik yang menggambarkan **seberapa kuat dan ke arah mana** hubungan linier antara dua variabel. Korelasi **tidak berarti sebab-akibat (kausalitas)** — hanya mengukur keterkaitan.

---

## Koefisien Korelasi Pearson

Koefisien korelasi Pearson ($r$) mengukur hubungan linier antara dua variabel kontinu:

$$r = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^2 \\cdot \\sum_{i=1}^{n}(y_i - \\bar{y})^2}}$$

**Bentuk alternatif (lebih mudah dihitung):**

$$r = \\frac{n\\sum x_i y_i - (\\sum x_i)(\\sum y_i)}{\\sqrt{\\left[n\\sum x_i^2 - (\\sum x_i)^2\\right]\\left[n\\sum y_i^2 - (\\sum y_i)^2\\right]}}$$

---

## Interpretasi Nilai $r$

Nilai $r$ selalu berada di antara $-1$ dan $+1$:

| Nilai $r$ | Interpretasi |
|-----------|-------------|
| $r = +1$ | Korelasi positif sempurna |
| $0{,}7 \\leq r < 1$ | Korelasi positif kuat |
| $0{,}4 \\leq r < 0{,}7$ | Korelasi positif sedang |
| $0 < r < 0{,}4$ | Korelasi positif lemah |
| $r = 0$ | Tidak ada korelasi linier |
| $-0{,}4 < r < 0$ | Korelasi negatif lemah |
| $-0{,}7 < r \\leq -0{,}4$ | Korelasi negatif sedang |
| $-1 < r \\leq -0{,}7$ | Korelasi negatif kuat |
| $r = -1$ | Korelasi negatif sempurna |

- **Positif:** nilai kedua variabel naik bersama-sama  
- **Negatif:** satu variabel naik, yang lain turun  

---

## Contoh Perhitungan

Seorang peneliti ingin mengetahui hubungan antara jam belajar ($X$) dan nilai ujian ($Y$):

| Siswa | $x$ (jam) | $y$ (nilai) | $x^2$ | $y^2$ | $xy$ |
|-------|-----------|-------------|-------|-------|------|
| A | 2 | 60 | 4 | 3600 | 120 |
| B | 3 | 70 | 9 | 4900 | 210 |
| C | 5 | 85 | 25 | 7225 | 425 |
| D | 6 | 88 | 36 | 7744 | 528 |
| E | 8 | 95 | 64 | 9025 | 760 |
| **$\\Sigma$** | **24** | **398** | **138** | **32494** | **2043** |

$$r = \\frac{5(2043) - (24)(398)}{\\sqrt{[5(138) - 24^2][5(32494) - 398^2]}}$$

$$r = \\frac{10215 - 9552}{\\sqrt{[690 - 576][162470 - 158404]}}$$

$$r = \\frac{663}{\\sqrt{114 \\times 4066}} = \\frac{663}{\\sqrt{463524}} = \\frac{663}{680{,}97} \\approx 0{,}974$$

**Kesimpulan:** Terdapat korelasi positif sangat kuat ($r \\approx 0{,}97$) antara jam belajar dan nilai ujian.

---

## Koefisien Determinasi ($r^2$)

Koefisien determinasi menunjukkan **berapa persen variasi** variabel $Y$ dapat dijelaskan oleh variabel $X$:

$$r^2 = (0{,}974)^2 = 0{,}949$$

Artinya, **94,9% variasi nilai ujian** dapat dijelaskan oleh jam belajar.

---

## Uji Signifikansi Korelasi

Untuk menguji apakah korelasi signifikan secara statistik:

$$t = \\frac{r\\sqrt{n-2}}{\\sqrt{1-r^2}}$$

dengan derajat kebebasan $df = n - 2$.

**Contoh (dari data di atas):**

$$t = \\frac{0{,}974\\sqrt{5-2}}{\\sqrt{1 - 0{,}949}} = \\frac{0{,}974 \\times 1{,}732}{\\sqrt{0{,}051}} = \\frac{1{,}687}{0{,}226} \\approx 7{,}47$$

Bandingkan $t_{hitung} = 7{,}47$ dengan $t_{tabel}$ untuk $df = 3$, $\\alpha = 0{,}05$ (dua sisi) $= 3{,}182$.

Karena $7{,}47 > 3{,}182$, korelasi **signifikan**.

---

## Korelasi Rank Spearman

Digunakan untuk data ordinal atau ketika distribusi data tidak normal:

$$r_s = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)}$$

di mana $d_i$ = selisih rank variabel $X$ dan $Y$ untuk data ke-$i$.

> **Kapan pakai Pearson vs Spearman?**  
> Gunakan **Pearson** untuk data interval/rasio yang berdistribusi normal.  
> Gunakan **Spearman** untuk data ordinal atau yang tidak memenuhi asumsi normalitas.

---

## Latihan Soal

**Soal.** Dari data 6 mahasiswa berikut, hitung koefisien korelasi Pearson antara IPK ($X$) dan gaji pertama (juta rupiah, $Y$):

| Mhs | $X$ (IPK) | $Y$ (Gaji) |
|-----|-----------|------------|
| 1 | 3,0 | 4,5 |
| 2 | 3,2 | 5,0 |
| 3 | 3,5 | 5,5 |
| 4 | 3,7 | 6,0 |
| 5 | 3,8 | 6,5 |
| 6 | 4,0 | 7,0 |

Hitung $r$ dan interpretasikan hasilnya!
`
};
