window.MATERI = {
  id: "uji_t",
  judul: "Uji-t",
  isi: `
## Apa Itu Uji-t?

Uji-t (*t-test*) adalah uji statistik yang digunakan untuk **membandingkan rata-rata** satu atau dua kelompok. Uji ini sangat umum digunakan ketika ukuran sampel kecil ($n < 30$) dan simpangan baku populasi tidak diketahui.

Statistik uji-t mengikuti **distribusi-t Student** dengan derajat kebebasan tertentu.

---

## Jenis-Jenis Uji-t

### 1. Uji-t Satu Sampel (*One Sample t-test*)

Membandingkan rata-rata sampel dengan nilai tetap yang dihipotesiskan ($\\mu_0$).

$$t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}$$

- $\\bar{x}$ = rata-rata sampel  
- $\\mu_0$ = nilai rata-rata yang dihipotesiskan  
- $s$ = simpangan baku sampel  
- $n$ = ukuran sampel  
- $df = n - 1$

**Contoh:**

Rata-rata berat badan bayi yang lahir di suatu RS diketahui $\\mu_0 = 3{,}2$ kg. Sampel 16 bayi baru menunjukkan $\\bar{x} = 3{,}5$ kg dengan $s = 0{,}4$ kg. Apakah ada perbedaan signifikan pada $\\alpha = 0{,}05$?

$$t = \\frac{3{,}5 - 3{,}2}{0{,}4/\\sqrt{16}} = \\frac{0{,}3}{0{,}1} = 3{,}00$$

$t_{tabel}$ untuk $df = 15$, dua sisi, $\\alpha = 0{,}05$ → $t_{0{,}025; 15} = 2{,}131$

Karena $3{,}00 > 2{,}131$, **tolak $H_0$** — rata-rata berat bayi berbeda signifikan dari 3,2 kg.

---

### 2. Uji-t Dua Sampel Independen (*Independent Samples t-test*)

Membandingkan rata-rata dua kelompok yang **tidak saling berhubungan**.

**Asumsi varians sama (pooled):**

$$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{S_p\\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}$$

$$S_p = \\sqrt{\\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}}$$

$df = n_1 + n_2 - 2$

**Asumsi varians tidak sama (Welch's t-test):**

$$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}$$

$$df = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1-1} + \\frac{(s_2^2/n_2)^2}{n_2-1}}$$

**Contoh:**

Kelompok A (metode belajar baru): $n_1=10$, $\\bar{x}_1=82$, $s_1=6$  
Kelompok B (metode lama): $n_2=10$, $\\bar{x}_2=76$, $s_2=8$

$$S_p = \\sqrt{\\frac{9(36) + 9(64)}{18}} = \\sqrt{\\frac{324 + 576}{18}} = \\sqrt{50} = 7{,}07$$

$$t = \\frac{82 - 76}{7{,}07\\sqrt{1/10 + 1/10}} = \\frac{6}{7{,}07 \\times 0{,}447} = \\frac{6}{3{,}16} \\approx 1{,}90$$

$t_{tabel}$ ($df = 18$, $\\alpha = 0{,}05$, dua sisi) $= 2{,}101$

Karena $1{,}90 < 2{,}101$, **gagal tolak $H_0$** — tidak ada perbedaan signifikan.

---

### 3. Uji-t Sampel Berpasangan (*Paired t-test*)

Digunakan ketika dua pengukuran dilakukan pada **subjek yang sama** (sebelum–sesudah, kiri–kanan, dll).

$$d_i = x_{1i} - x_{2i}$$

$$t = \\frac{\\bar{d}}{s_d / \\sqrt{n}}$$

- $\\bar{d}$ = rata-rata selisih  
- $s_d$ = simpangan baku selisih  
- $df = n - 1$

**Contoh:**

Tekanan darah 5 pasien sebelum dan sesudah terapi:

| Pasien | Sebelum ($x_1$) | Sesudah ($x_2$) | $d = x_1 - x_2$ | $d^2$ |
|--------|-----------------|-----------------|-----------------|-------|
| 1 | 140 | 130 | 10 | 100 |
| 2 | 155 | 145 | 10 | 100 |
| 3 | 160 | 148 | 12 | 144 |
| 4 | 148 | 142 | 6  | 36  |
| 5 | 152 | 140 | 12 | 144 |
| **$\\Sigma$** | | | **50** | **524** |

$$\\bar{d} = \\frac{50}{5} = 10, \\quad s_d = \\sqrt{\\frac{524 - 5(100)}{4}} = \\sqrt{\\frac{24}{4}} = \\sqrt{6} \\approx 2{,}449$$

$$t = \\frac{10}{2{,}449/\\sqrt{5}} = \\frac{10}{1{,}095} \\approx 9{,}13$$

$t_{tabel}$ ($df = 4$, $\\alpha = 0{,}05$, dua sisi) $= 2{,}776$

Karena $9{,}13 > 2{,}776$, **tolak $H_0$** — terapi berpengaruh signifikan menurunkan tekanan darah.

---

## Hipotesis dan Jenis Uji

| Jenis | $H_0$ | $H_1$ | Uji |
|-------|-------|-------|-----|
| Dua sisi | $\\mu = \\mu_0$ | $\\mu \\neq \\mu_0$ | $|t| > t_{\\alpha/2; df}$ |
| Satu sisi kanan | $\\mu \\leq \\mu_0$ | $\\mu > \\mu_0$ | $t > t_{\\alpha; df}$ |
| Satu sisi kiri | $\\mu \\geq \\mu_0$ | $\\mu < \\mu_0$ | $t < -t_{\\alpha; df}$ |

---

## Asumsi Uji-t

1. Data berdistribusi **normal** (atau $n$ cukup besar, $n \\geq 30$)
2. Data diukur dalam skala **interval atau rasio**
3. Untuk dua sampel independen: sampel **tidak saling berkaitan**
4. Untuk satu sampel / berpasangan: **random sampling**

> Jika asumsi normalitas tidak terpenuhi, gunakan uji non-parametrik seperti **Uji Wilcoxon** (pengganti paired t-test) atau **Uji Mann-Whitney** (pengganti independent t-test).

---

## Latihan Soal

**Soal.** Seorang guru ingin menguji apakah program les intensif meningkatkan nilai siswa. Nilai 6 siswa sebelum dan sesudah les:

| Siswa | Sebelum | Sesudah |
|-------|---------|---------|
| 1 | 65 | 72 |
| 2 | 70 | 78 |
| 3 | 60 | 68 |
| 4 | 75 | 80 |
| 5 | 68 | 74 |
| 6 | 72 | 76 |

Gunakan uji-t berpasangan dengan $\\alpha = 0{,}05$. Apakah les intensif berpengaruh signifikan?
`
};
