window.MATERI = {
  id: "regresi",
  judul: "Analisis Regresi",
  kategori: "Regresi",
  isi: `
# Analisis Regresi

Regresi linear sederhana digunakan untuk memodelkan hubungan antara satu
variabel bebas ($X$) dan satu variabel terikat ($Y$) dalam bentuk garis
lurus. Tujuannya adalah memprediksi nilai $Y$ berdasarkan nilai $X$.

> Regresi berbeda dari korelasi: korelasi hanya mengukur kekuatan hubungan,
> sedangkan regresi membangun **model prediksi** dari hubungan tersebut.

## Model Regresi Linear Sederhana

Bentuk umum model regresi linear sederhana adalah:

$$
Y = a + bX
$$

Dengan:
- $Y$ = variabel terikat (yang diprediksi)
- $X$ = variabel bebas (prediktor)
- $a$ = konstanta (intercept), nilai $Y$ saat $X = 0$
- $b$ = koefisien regresi (slope), besar perubahan $Y$ untuk setiap kenaikan satu unit $X$

## Rumus

Koefisien $b$ (slope) dihitung dengan:

$$
b = \\frac{n\\sum XY - (\\sum X)(\\sum Y)}{n\\sum X^2 - (\\sum X)^2}
$$

Setelah $b$ diketahui, konstanta $a$ dihitung dengan:

$$
a = \\frac{\\sum Y - b\\sum X}{n}
$$

## Contoh

Jika diketahui data berikut:

$$
X = [1,2,3,4]
$$

$$
Y = [2,4,5,8]
$$

**Langkah 1 — Susun tabel bantu:**

| $X$ | $Y$ | $XY$ | $X^2$ |
|-----|-----|------|-------|
| 1 | 2 | 2  | 1  |
| 2 | 4 | 8  | 4  |
| 3 | 5 | 15 | 9  |
| 4 | 8 | 32 | 16 |

Jumlah: $\\sum X = 10$, $\\sum Y = 19$, $\\sum XY = 57$, $\\sum X^2 = 30$, $n = 4$

**Langkah 2 — Hitung $b$:**

$$
b = \\frac{4(57) - (10)(19)}{4(30) - (10)^2} = \\frac{228 - 190}{120 - 100} = \\frac{38}{20} = 1.9
$$

**Langkah 3 — Hitung $a$:**

$$
a = \\frac{19 - (1.9)(10)}{4} = \\frac{19 - 19}{4} = 0
$$

**Langkah 4 — Model regresi yang dihasilkan:**

$$
Y = 0 + 1.9X \\quad \\text{atau} \\quad Y = 1.9X
$$

Maka, jika $X = 5$, prediksi $Y$ adalah:

$$
Y = 1.9(5) = 9.5
$$

## Koefisien Determinasi ($R^2$)

Untuk mengetahui seberapa baik model regresi menjelaskan variasi data,
digunakan koefisien determinasi $R^2$ (kuadrat dari koefisien korelasi $r$):

$$
R^2 = r^2
$$

Nilai $R^2$ berkisar antara $0$ dan $1$. Semakin mendekati $1$, semakin
baik model regresi menjelaskan data.

## Asumsi Regresi Linear

1. **Linearitas** — hubungan antar variabel berbentuk linear.
2. **Homoskedastisitas** — varians residual konstan di semua nilai $X$.
3. **Normalitas residual** — error terdistribusi normal.
4. **Independensi** — observasi tidak saling berkorelasi.

## Implementasi Sederhana (JavaScript)

\`\`\`javascript
function linearRegression(x, y) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const a = (sumY - b * sumX) / n;

  return { a, b, predict: (xi) => a + b * xi };
}

const model = linearRegression([1,2,3,4], [2,4,5,8]);
console.log(model.a, model.b);       // 0, 1.9
console.log(model.predict(5));        // 9.5
\`\`\`

## Ringkasan

- Model regresi linear sederhana: $Y = a + bX$.
- $b$ menunjukkan arah dan kekuatan pengaruh $X$ terhadap $Y$.
- $R^2$ mengukur seberapa baik model menjelaskan variasi data.
- Regresi digunakan untuk **prediksi**, bukan hanya mengukur hubungan.
`
};
