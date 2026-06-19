window.MATERI = {
  id: "distribusi_normal",
  judul: "Distribusi Normal",
  kategori: "Distribusi Probabilitas",
  isi: `
# Distribusi Normal

Distribusi normal (disebut juga **distribusi Gaussian**) adalah salah satu
distribusi probabilitas paling penting dalam statistika. Bentuknya
menyerupai kurva lonceng (*bell curve*) yang simetris terhadap rata-ratanya.

> Banyak fenomena alam — tinggi badan, nilai ujian, kesalahan pengukuran —
> mendekati distribusi normal jika sampelnya cukup besar (lihat *Teorema Limit Pusat*).

## Fungsi Densitas Probabilitas

Fungsi densitas probabilitas (PDF) dari distribusi normal dirumuskan sebagai:

$$
f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$

Dengan:
- $\\mu$ = rata-rata (mean) populasi
- $\\sigma$ = standar deviasi populasi
- $e$ = konstanta Euler ($\\approx 2.718$)

Distribusi ini sepenuhnya ditentukan oleh dua parameter: $\\mu$ dan $\\sigma$.
Notasi umum yang digunakan adalah $X \\sim N(\\mu, \\sigma^2)$.

## Distribusi Normal Standar

Untuk mempermudah perhitungan, data sering ditransformasi menjadi **skor-Z**,
yaitu distribusi normal dengan $\\mu = 0$ dan $\\sigma = 1$.

$$
Z = \\frac{X - \\mu}{\\sigma}
$$

Skor-Z menunjukkan seberapa banyak standar deviasi suatu nilai berada dari rata-rata.

## Aturan Empiris (68-95-99.7)

Pada distribusi normal, berlaku aturan empiris berikut:

| Rentang | Persentase Data |
|---------|------------------|
| $\\mu \\pm 1\\sigma$ | 68% |
| $\\mu \\pm 2\\sigma$ | 95% |
| $\\mu \\pm 3\\sigma$ | 99.7% |

## Contoh Soal

Sebuah tes memiliki nilai rata-rata $\\mu = 75$ dengan standar deviasi
$\\sigma = 5$. Berapa skor-Z untuk siswa yang mendapat nilai $85$?

$$
Z = \\frac{85 - 75}{5} = \\frac{10}{5} = 2
$$

Artinya, nilai siswa tersebut berada **2 standar deviasi di atas rata-rata**,
yang termasuk dalam 2.5% nilai tertinggi (berdasarkan tabel distribusi normal).

## Mengapa Distribusi Normal Penting?

1. Dasar dari banyak uji statistik (uji-t, uji-z, ANOVA).
2. Banyak fenomena alami mendekati bentuk ini.
3. Teorema Limit Pusat menyatakan bahwa distribusi rata-rata sampel akan
   mendekati normal meskipun populasi asalnya tidak normal, asalkan ukuran
   sampel cukup besar ($n \\geq 30$).

## Implementasi Sederhana (JavaScript)

\`\`\`javascript
function normalPDF(x, mean, std) {
  const exponent = -((x - mean) ** 2) / (2 * std ** 2);
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

function zScore(x, mean, std) {
  return (x - mean) / std;
}

console.log(zScore(85, 75, 5)); // 2
\`\`\`

## Ringkasan

- Distribusi normal berbentuk lonceng, simetris terhadap $\\mu$.
- Skor-Z mengubah data ke skala standar untuk mempermudah perbandingan.
- Aturan 68-95-99.7 membantu interpretasi cepat penyebaran data.
`
};
