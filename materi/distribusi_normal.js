window.MATERI = {
  id: "distribusi_normal",
  judul: "Distribusi Normal",
  isi: `
## Apa Itu Distribusi Normal?

Distribusi normal (juga dikenal sebagai **distribusi Gauss**) adalah distribusi probabilitas kontinu yang berbentuk **kurva lonceng (bell curve)** — simetris di sekitar nilai rata-ratanya.

Distribusi ini paling banyak muncul secara alami: tinggi badan, berat badan, nilai ujian, dan banyak fenomena alam lainnya cenderung mengikuti distribusi normal.

---

## Fungsi Densitas Probabilitas

Fungsi densitas probabilitas (PDF) distribusi normal adalah:

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$

di mana:
- $\\mu$ = rata-rata (mean) distribusi
- $\\sigma$ = simpangan baku (standard deviation)
- $e \\approx 2{,}718$ (bilangan Euler)
- $\\pi \\approx 3{,}14159$

---

## Sifat-Sifat Distribusi Normal

1. **Simetris** terhadap $\\mu$ — bagian kiri dan kanan kurva identik
2. **Mean = Median = Modus** — ketiganya berada di titik puncak
3. **Asymptotic** — kurva mendekati sumbu-$x$ tetapi tidak pernah menyentuhnya
4. **Total luas di bawah kurva = 1** (probabilitas total)
5. Ditentukan sepenuhnya oleh dua parameter: $\\mu$ dan $\\sigma$

---

## Distribusi Normal Standar ($Z$)

Distribusi normal standar adalah distribusi normal dengan $\\mu = 0$ dan $\\sigma = 1$, dilambangkan $Z \\sim N(0, 1)$.

Setiap distribusi normal dapat diubah menjadi distribusi normal standar menggunakan **transformasi Z (standardisasi)**:

$$Z = \\frac{X - \\mu}{\\sigma}$$

**Contoh:**

Nilai ujian berdistribusi normal dengan $\\mu = 75$ dan $\\sigma = 10$. Berapa nilai $Z$ untuk $X = 85$?

$$Z = \\frac{85 - 75}{10} = \\frac{10}{10} = 1$$

Artinya, nilai 85 berada **1 simpangan baku di atas rata-rata**.

---

## Aturan Empiris (68–95–99,7)

Aturan empiris menyatakan bahwa untuk distribusi normal:

$$P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68{,}27\\%$$

$$P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 95{,}45\\%$$

$$P(\\mu - 3\\sigma < X < \\mu + 3\\sigma) \\approx 99{,}73\\%$$

| Rentang | Persentase Data |
|---------|-----------------|
| $\\mu \\pm 1\\sigma$ | ≈ 68% |
| $\\mu \\pm 2\\sigma$ | ≈ 95% |
| $\\mu \\pm 3\\sigma$ | ≈ 99,7% |

> Data yang berada lebih dari $3\\sigma$ dari rata-rata disebut **outlier** dalam konteks distribusi normal.

---

## Menghitung Probabilitas

Probabilitas dihitung menggunakan **tabel Z** atau fungsi distribusi kumulatif $\\Phi(z)$:

$$P(X \\leq x) = P\\!\\left(Z \\leq \\frac{x-\\mu}{\\sigma}\\right) = \\Phi(z)$$

### Contoh Soal

Tinggi badan mahasiswa berdistribusi normal dengan $\\mu = 165$ cm dan $\\sigma = 8$ cm.

**Pertanyaan:** Berapa probabilitas mahasiswa dipilih acak memiliki tinggi antara 157 cm dan 173 cm?

**Penyelesaian:**

$$Z_1 = \\frac{157 - 165}{8} = -1 \\qquad Z_2 = \\frac{173 - 165}{8} = 1$$

$$P(157 < X < 173) = P(-1 < Z < 1) = \\Phi(1) - \\Phi(-1)$$

$$= 0{,}8413 - 0{,}1587 = 0{,}6827 \\approx 68{,}27\\%$$

---

## Uji Normalitas

Sebelum menggunakan distribusi normal, perlu diuji apakah data benar-benar berdistribusi normal. Beberapa metode:

1. **Histogram** — lihat apakah berbentuk lonceng
2. **Q-Q Plot** — titik-titik data harus mendekati garis diagonal
3. **Uji Shapiro-Wilk** — untuk sampel kecil ($n < 50$)
4. **Uji Kolmogorov-Smirnov** — untuk sampel besar

---

## Latihan Soal

**Soal.** Berat badan siswa SMA berdistribusi normal dengan rata-rata $\\mu = 60$ kg dan simpangan baku $\\sigma = 5$ kg.

a) Berapa probabilitas siswa memiliki berat badan kurang dari 55 kg?  
b) Berapa probabilitas siswa memiliki berat badan antara 55 kg dan 70 kg?

**Penyelesaian:**

**a)** $Z = \\frac{55 - 60}{5} = -1$

$$P(X < 55) = \\Phi(-1) = 0{,}1587 \\approx 15{,}87\\%$$

**b)** $Z_1 = \\frac{55-60}{5} = -1$, $\\quad Z_2 = \\frac{70-60}{5} = 2$

$$P(55 < X < 70) = \\Phi(2) - \\Phi(-1) = 0{,}9772 - 0{,}1587 = 0{,}8185 \\approx 81{,}85\\%$$
`
};
