window.MATERI = {
  id: "statistik_deskriptif",
  judul: "Statistika Deskriptif",
  kategori: "Dasar",
  isi: `
# Statistika Deskriptif

Statistika deskriptif adalah cabang ilmu statistika yang berfokus pada
**pengumpulan, penyajian, dan peringkasan data** tanpa menarik kesimpulan
di luar data yang diamati. Tujuannya adalah menggambarkan karakteristik
utama dari suatu kumpulan data secara sederhana dan mudah dipahami.

> Statistika deskriptif menjawab pertanyaan "Bagaimana data ini terlihat?",
> bukan "Apa yang bisa kita simpulkan tentang populasi?"

## Ukuran Pemusatan Data

Ukuran pemusatan menggambarkan nilai pusat atau nilai tipikal dari sekumpulan data.

### Rata-rata (Mean)

Rata-rata aritmetika dihitung dengan menjumlahkan seluruh data lalu membaginya
dengan banyaknya data.

$$
\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}
$$

Dengan:
- $\\bar{x}$ = rata-rata
- $x_i$ = nilai data ke-$i$
- $n$ = banyaknya data

### Median

Median adalah nilai tengah dari data yang telah diurutkan. Jika $n$ ganjil:

$$
Me = x_{\\frac{n+1}{2}}
$$

Jika $n$ genap, median adalah rata-rata dari dua nilai tengah:

$$
Me = \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}
$$

### Modus

Modus adalah nilai yang paling sering muncul dalam suatu kumpulan data.
Suatu data bisa memiliki lebih dari satu modus (bimodal/multimodal) atau
tidak memiliki modus sama sekali.

## Ukuran Penyebaran Data

Ukuran penyebaran menunjukkan seberapa jauh data tersebar dari nilai pusatnya.

### Varians

Varians mengukur rata-rata kuadrat selisih setiap data terhadap rata-ratanya.

$$
s^2 = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}
$$

### Standar Deviasi

Standar deviasi adalah akar kuadrat dari varians, dan memiliki satuan yang
sama dengan data aslinya sehingga lebih mudah diinterpretasikan.

$$
s = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}}
$$

### Rentang (Range)

$$
R = x_{maks} - x_{min}
$$

## Contoh Soal

Diketahui data nilai ujian 5 mahasiswa:

$$
X = [70, 75, 80, 85, 90]
$$

**Langkah 1 — Hitung rata-rata:**

$$
\\bar{x} = \\frac{70+75+80+85+90}{5} = \\frac{400}{5} = 80
$$

**Langkah 2 — Hitung varians:**

| $x_i$ | $x_i - \\bar{x}$ | $(x_i - \\bar{x})^2$ |
|-------|------------------|------------------------|
| 70    | -10              | 100                    |
| 75    | -5               | 25                     |
| 80    | 0                | 0                      |
| 85    | 5                | 25                     |
| 90    | 10               | 100                    |

$$
s^2 = \\frac{100+25+0+25+100}{5-1} = \\frac{250}{4} = 62.5
$$

**Langkah 3 — Standar deviasi:**

$$
s = \\sqrt{62.5} \\approx 7.91
$$

## Implementasi Sederhana (JavaScript)

Berikut contoh kode untuk menghitung mean dan standar deviasi:

\`\`\`javascript
function mean(data) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function stdDev(data) {
  const m = mean(data);
  const variance =
    data.reduce((sum, x) => sum + (x - m) ** 2, 0) / (data.length - 1);
  return Math.sqrt(variance);
}

const nilai = [70, 75, 80, 85, 90];
console.log("Rata-rata:", mean(nilai));     // 80
console.log("Std Dev:", stdDev(nilai));     // 7.91
\`\`\`

## Ringkasan

- Ukuran pemusatan: **mean**, **median**, **modus**.
- Ukuran penyebaran: **varians**, **standar deviasi**, **range**.
- Statistika deskriptif menjadi dasar sebelum melangkah ke statistika
  inferensial seperti uji hipotesis dan estimasi parameter.
`
};
