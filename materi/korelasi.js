window.MATERI = {
  id: "korelasi",
  judul: "Analisis Korelasi",
  kategori: "Regresi",
  isi: `
# Analisis Korelasi

Korelasi adalah ukuran statistik yang menunjukkan **seberapa kuat dan ke arah
mana** dua variabel saling berhubungan secara linear. Korelasi tidak menyatakan
hubungan sebab-akibat, melainkan hanya derajat keterkaitan antar variabel.

> "Korelasi bukan kausalitas" — dua variabel bisa berkorelasi tinggi tanpa
> satu menyebabkan yang lain.

## Koefisien Korelasi Pearson

Koefisien korelasi Pearson ($r$) mengukur kekuatan hubungan linear antara
dua variabel $X$ dan $Y$, dengan rentang nilai $-1 \\leq r \\leq 1$.

$$
r = \\frac{n\\sum XY - (\\sum X)(\\sum Y)}{\\sqrt{\\left[n\\sum X^2 - (\\sum X)^2\\right]\\left[n\\sum Y^2 - (\\sum Y)^2\\right]}}
$$

### Interpretasi Nilai $r$

| Nilai $r$ | Interpretasi |
|-----------|---------------|
| $r = 1$ | Korelasi positif sempurna |
| $0.7 \\leq r < 1$ | Korelasi positif kuat |
| $0.3 \\leq r < 0.7$ | Korelasi positif sedang |
| $0 < r < 0.3$ | Korelasi positif lemah |
| $r = 0$ | Tidak ada korelasi linear |
| $r < 0$ | Korelasi negatif (arah berlawanan) |

## Contoh Soal

Diketahui data jam belajar ($X$) dan nilai ujian ($Y$) dari 4 siswa:

$$
X = [1, 2, 3, 4], \\quad Y = [2, 4, 5, 8]
$$

**Langkah 1 — Hitung komponen yang diperlukan:**

| $X$ | $Y$ | $XY$ | $X^2$ | $Y^2$ |
|-----|-----|------|-------|-------|
| 1 | 2 | 2 | 1 | 4 |
| 2 | 4 | 8 | 4 | 16 |
| 3 | 5 | 15 | 9 | 25 |
| 4 | 8 | 32 | 16 | 64 |

Jumlah: $\\sum X = 10$, $\\sum Y = 19$, $\\sum XY = 57$, $\\sum X^2 = 30$, $\\sum Y^2 = 109$

**Langkah 2 — Masukkan ke rumus:**

$$
r = \\frac{4(57) - (10)(19)}{\\sqrt{[4(30)-10^2][4(109)-19^2]}}
$$

$$
r = \\frac{228 - 190}{\\sqrt{[120-100][436-361]}} = \\frac{38}{\\sqrt{20 \\times 75}}
$$

$$
r = \\frac{38}{\\sqrt{1500}} = \\frac{38}{38.73} \\approx 0.98
$$

Nilai $r \\approx 0.98$ menunjukkan korelasi **positif yang sangat kuat**
antara jam belajar dan nilai ujian.

## Korelasi vs Kausalitas

Penting diingat bahwa korelasi tinggi **tidak otomatis** berarti satu
variabel menyebabkan variabel lainnya. Contoh klasik: jumlah es krim
yang terjual dan jumlah kasus tenggelam sama-sama meningkat di musim
panas — namun keduanya disebabkan oleh faktor ketiga, yaitu suhu udara.

## Implementasi Sederhana (JavaScript)

\`\`\`javascript
function pearsonCorrelation(x, y) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
  );

  return numerator / denominator;
}

console.log(pearsonCorrelation([1,2,3,4], [2,4,5,8])); // ≈ 0.98
\`\`\`

## Ringkasan

- Koefisien korelasi Pearson ($r$) mengukur kekuatan hubungan linear.
- Nilai $r$ berkisar antara $-1$ hingga $1$.
- Korelasi tinggi tidak membuktikan hubungan sebab-akibat.
`
};
