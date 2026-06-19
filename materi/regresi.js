window.MATERI = {
  id: "regresi",
  judul: "Regresi Linier",
  isi: `
## Apa Itu Regresi Linier?

Regresi linier adalah metode statistik untuk **memodelkan hubungan** antara satu atau lebih variabel bebas ($X$) dengan variabel terikat ($Y$) dalam bentuk persamaan garis lurus. Tujuannya adalah **memprediksi** nilai $Y$ berdasarkan nilai $X$ yang diketahui.

---

## Regresi Linier Sederhana

Model regresi linier sederhana (satu variabel bebas):

$$\\hat{Y} = a + bX$$

- $\\hat{Y}$ = nilai prediksi $Y$
- $a$ = intersep (nilai $Y$ saat $X = 0$)
- $b$ = koefisien regresi / kemiringan (slope)

### Rumus Koefisien

Menggunakan metode **Ordinary Least Squares (OLS)** — meminimalkan jumlah kuadrat residual:

$$b = \\frac{n\\sum x_i y_i - (\\sum x_i)(\\sum y_i)}{n\\sum x_i^2 - (\\sum x_i)^2}$$

$$a = \\bar{y} - b\\bar{x}$$

---

## Contoh Perhitungan

Data luas lahan ($X$, hektar) dan hasil panen ($Y$, ton):

| No | $x$ | $y$ | $x^2$ | $xy$ |
|----|-----|-----|-------|------|
| 1  | 1   | 2   | 1     | 2    |
| 2  | 2   | 3   | 4     | 6    |
| 3  | 3   | 5   | 9     | 15   |
| 4  | 4   | 6   | 16    | 24   |
| 5  | 5   | 8   | 25    | 40   |
| **$\\Sigma$** | **15** | **24** | **55** | **87** |

$$\\bar{x} = \\frac{15}{5} = 3, \\quad \\bar{y} = \\frac{24}{5} = 4{,}8$$

$$b = \\frac{5(87) - (15)(24)}{5(55) - (15)^2} = \\frac{435 - 360}{275 - 225} = \\frac{75}{50} = 1{,}5$$

$$a = 4{,}8 - 1{,}5(3) = 4{,}8 - 4{,}5 = 0{,}3$$

**Persamaan regresi:**

$$\\hat{Y} = 0{,}3 + 1{,}5X$$

**Interpretasi:**
- Setiap penambahan 1 hektar lahan, hasil panen bertambah **1,5 ton**
- Prediksi untuk $X = 6$ hektar: $\\hat{Y} = 0{,}3 + 1{,}5(6) = 9{,}3$ ton

---

## Residual dan Asumsi OLS

**Residual** adalah selisih antara nilai aktual dan nilai prediksi:

$$e_i = y_i - \\hat{y}_i$$

OLS meminimalkan:

$$SSE = \\sum_{i=1}^{n} e_i^2 = \\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2$$

### Asumsi Model Regresi Linier

1. **Linieritas** — hubungan $X$ dan $Y$ bersifat linier
2. **Independensi** — residual tidak saling berkorelasi
3. **Homoskedastisitas** — varians residual konstan
4. **Normalitas** — residual berdistribusi normal

---

## Ukuran Kebaikan Model

### Koefisien Determinasi ($R^2$)

$$R^2 = 1 - \\frac{SSE}{SST} = 1 - \\frac{\\sum(y_i - \\hat{y}_i)^2}{\\sum(y_i - \\bar{y})^2}$$

$R^2$ berkisar antara 0 dan 1. Semakin mendekati 1, semakin baik model menjelaskan variasi data.

**Contoh (dari data di atas):**

| $y_i$ | $\\hat{y}_i$ | $e_i$ | $e_i^2$ | $(y_i-\\bar{y})^2$ |
|-------|------------|-------|---------|-----------------|
| 2 | 1,8 | 0,2 | 0,04 | 7,84 |
| 3 | 3,3 | −0,3 | 0,09 | 3,24 |
| 5 | 4,8 | 0,2 | 0,04 | 0,04 |
| 6 | 6,3 | −0,3 | 0,09 | 1,44 |
| 8 | 7,8 | 0,2 | 0,04 | 10,24 |
| | | | **0,30** | **22,80** |

$$R^2 = 1 - \\frac{0{,}30}{22{,}80} = 1 - 0{,}0132 = 0{,}987$$

Model menjelaskan **98,7%** variasi hasil panen.

### Standard Error of Estimate ($S_e$)

$$S_e = \\sqrt{\\frac{SSE}{n-2}} = \\sqrt{\\frac{0{,}30}{3}} = \\sqrt{0{,}10} \\approx 0{,}316 \\text{ ton}$$

---

## Uji Signifikansi Koefisien

### Uji-$t$ untuk Slope ($b$)

$$t = \\frac{b}{S_b}, \\quad S_b = \\frac{S_e}{\\sqrt{\\sum(x_i - \\bar{x})^2}}$$

$H_0: b = 0$ (tidak ada hubungan linier)  
$H_1: b \\neq 0$ (ada hubungan linier)

Tolak $H_0$ jika $|t_{hitung}| > t_{\\alpha/2, n-2}$

---

## Regresi Linier Berganda

Jika terdapat lebih dari satu variabel bebas:

$$\\hat{Y} = a + b_1 X_1 + b_2 X_2 + \\cdots + b_k X_k$$

Estimasi koefisien menggunakan matriks:

$$\\mathbf{b} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{Y}$$

> **Perhatian:** Regresi berganda rentan terhadap **multikolinearitas** (variabel bebas saling berkorelasi kuat). Periksa dengan VIF (*Variance Inflation Factor*): $\\text{VIF} > 10$ menandakan multikolinearitas serius.

---

## Latihan Soal

**Soal.** Data pengeluaran iklan ($X$, juta rupiah) dan penjualan ($Y$, unit) selama 5 bulan:

| Bulan | $X$ | $Y$ |
|-------|-----|-----|
| 1 | 10 | 150 |
| 2 | 15 | 200 |
| 3 | 20 | 250 |
| 4 | 25 | 280 |
| 5 | 30 | 320 |

a) Tentukan persamaan regresi linier $\\hat{Y} = a + bX$  
b) Prediksi penjualan jika pengeluaran iklan = 35 juta rupiah  
c) Hitung $R^2$ dan interpretasikan
`
};
