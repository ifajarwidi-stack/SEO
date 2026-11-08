# Dashboard internal Jago.com Security Monitoring

Halaman statis yang membaca satu berkas, `security-daily.json`, sesuai
[kontrak data](../docs/jago-security-data-contract.md) dan
[skema](../docs/schema/security-daily.schema.json).

- Tanpa build, tanpa dependensi, tanpa font atau skrip pihak ketiga.
  Satu-satunya permintaan jaringan: `security-daily.json` (diperiksa ulang tiap 5 menit).
- Hanya angka agregat. Tidak ada IP, path, atau user agent di berkas data.

## Menjalankan

Browser memblokir `fetch` lewat `file://`, jadi buka lewat server:

```
cd dashboard
python3 -m http.server 8000     # lalu buka http://localhost:8000
```

## Data contoh

`security-daily.json` di folder ini adalah **data contoh sintetis** (`"is_sample": true`),
sehingga dashboard menampilkan banner "Data contoh". Buat ulang dengan:

```
node tools/make-sample.js
```

## Memakai data asli

Ganti `security-daily.json` dengan keluaran job agregasi. Job produksi tidak boleh menulis
`is_sample`. Perilaku dashboard:

| Kondisi | Tampilan |
|---|---|
| `is_sample: true` | Banner "Data contoh" |
| `generated_at` lebih tua dari 3 jam (bukan contoh) | Peringatan "Data mungkin basi" |
| `schema_version` tidak dikenal, nilai rusak, atau berkas hilang | Pesan error; tidak ada grafik kosong |
| Hari terakhir `complete: false` | Ditampilkan sebagai "Hari ini, berjalan" tanpa dibandingkan dengan rata-rata; tidak ikut hitungan periode |
| Data kurang dari 7, 30, atau 360 hari lengkap | Tombol periode itu dinonaktifkan |
| Kurang dari 2× panjang periode | Pembanding "vs periode sebelumnya" diganti "Belum ada periode pembanding" |

Parameter `?data=nama.json` memuat berkas lain di folder yang sama (untuk pengujian).
