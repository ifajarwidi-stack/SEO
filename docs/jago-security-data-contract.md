# Kontrak Data: Jago.com Security Monitoring

Status: **draft untuk ditinjau** · Tanggal: 2026-11-08 · Pemakai: dashboard internal Jago

Dokumen ini menetapkan **apa yang diekspor** dari pipeline (Cloudflare WAF → Elasticsearch) ke dashboard, dan **bagaimana tiap angka dihitung**. Tujuannya satu: angka di dashboard bisa dipertanggungjawabkan dan tidak berubah arti diam-diam.

Hal yang saya **asumsikan dan belum diverifikasi** ditandai **[KONFIRMASI]** dan dikumpulkan di bagian 8. Nama field Elasticsearch di bawah adalah usulan; samakan dengan index Anda yang sebenarnya.

## 1. Prinsip

- **Hanya agregat.** File ekspor tidak memuat IP, path, user agent, atau ray ID. Satuan terkecil: jumlah per hari per kategori.
- **Satu file kecil, dibangun ulang berkala.** Dashboard hanya membaca file ini; ia tidak menyentuh Elasticsearch atau API pihak ketiga.
- **Hari mengikuti WIB.** Batas hari adalah 00:00–23:59 `Asia/Jakarta` (UTC+7), bukan UTC. Dashboard menampilkan "hari ini" dalam WIB, jadi batasnya harus sama.
- **Hari lampau tidak berubah, kecuali jendela koreksi** (bagian 5).

## 2. Berkas keluaran

Nama: `security-daily.json`. Skema formal: `docs/schema/security-daily.schema.json`.

```json
{
  "schema_version": 1,
  "generated_at": "2026-11-08T05:00:03Z",
  "timezone": "Asia/Jakarta",
  "categories": [
    { "id": "bot_scanner", "label": "Bot & Scanner" },
    { "id": "ddos_l7",     "label": "DDoS L7 / Rate Limit" },
    { "id": "sqli",        "label": "SQL Injection" },
    { "id": "xss",         "label": "XSS" },
    { "id": "path_trav",   "label": "Path Traversal (LFI/RFI)" },
    { "id": "rce",         "label": "RCE / Command Injection" }
  ],
  "days": [
    {
      "date": "2026-11-08",
      "blocked": { "bot_scanner": 1675, "ddos_l7": 863, "sqli": 345, "xss": 201, "path_trav": 118, "rce": 64 },
      "bad_ip": 1314,
      "complete": false
    }
  ]
}
```

| Field | Arti |
|---|---|
| `schema_version` | Naik hanya jika bentuk file berubah tidak kompatibel. Dashboard menolak versi yang tidak dikenalnya. |
| `generated_at` | Waktu job selesai, UTC. Dashboard memakainya untuk label "diperbarui X lalu". |
| `categories` | Urutan di sini **adalah urutan warna** di dashboard (slot 1 sampai 6). Jangan ubah urutan atau `id` yang sudah ada; menambah kategori hanya dengan menaikkan `schema_version`. Maksimum 6. |
| `days[].date` | Hari WIB, `YYYY-MM-DD`, berurutan tanpa celah, dari lama ke baru. |
| `days[].blocked` | Jumlah request diblokir per kategori. Setiap `id` di `categories` wajib ada, nol jika tidak ada. |
| `days[].bad_ip` | Dari total `blocked` hari itu, berapa yang berasal dari IP reputasi buruk. |
| `days[].complete` | `false` untuk hari berjalan (belum selesai). Dashboard menandai atau mengecualikannya dari perbandingan. |

Total hari itu **tidak disimpan**; dashboard menghitungnya sebagai jumlah `blocked`. Dengan begitu total tidak pernah bertentangan dengan rinciannya.

### Invarian yang divalidasi job sebelum menulis file

1. `0 ≤ bad_ip ≤ jumlah blocked` pada setiap hari.
2. Semua `id` kategori ada di setiap hari; semua nilai bilangan bulat ≥ 0.
3. Tanggal berurutan, tanpa celah, tanpa duplikat.
4. Jumlah hari **≥ 720** (lihat bagian 4). Lebih sedikit berarti dashboard tidak bisa menghitung "12 bulan vs 12 bulan sebelumnya".
5. Lolos JSON Schema.

Jika ada yang gagal, **job tidak menimpa file lama** dan memberi alarm (bagian 6).

## 3. Definisi metrik

### 3.1 "Request diblokir"

Satu request yang **dihentikan WAF** pada hari tersebut. Usulan: aksi `block`, ditambah tantangan yang **gagal** (`challengeFailed`, `jschallengeFailed`, `managedChallengeFailed`). Tidak dihitung: `allow`, `log`, tantangan yang berhasil dilewati (`*Solved`, `*Bypassed`). **[KONFIRMASI]** daftar nilai `Action` yang dipakai di dataset Anda.

**Hitung per request, bukan per event.** Satu request bisa memicu beberapa rule dan menghasilkan beberapa baris event. Hitung `RayID` unik, dan tetapkan **satu kategori per request**: kategori dari rule yang menghentikan request (aksi terminal). Jika tidak, total membengkak.

### 3.2 Kategori

Elasticsearch tidak punya field "kategori OWASP" bawaan. Kategori ditetapkan oleh **tabel pemetaan** `RuleID → category_id` yang dipegang tim keamanan, diterapkan saat ingest (ingest pipeline) agar tersimpan sebagai field `waf.category`.

Titik awal yang diusulkan (rentang rule OWASP CRS; ID rule Cloudflare Anda mungkin berbeda dan perlu dipetakan satu per satu):

| `category_id` | Sumber |
|---|---|
| `sqli` | CRS 942xxx |
| `xss` | CRS 941xxx |
| `rce` | CRS 932xxx, 933xxx (injeksi PHP), 934xxx |
| `path_trav` | CRS 930xxx (LFI), 931xxx (RFI) |
| `bot_scanner` | CRS 913xxx (scanner), bot management / bot fight, rule reputasi |
| `ddos_l7` | rate limiting, DDoS L7 managed rules |

Rule yang tidak masuk tabel (misalnya protocol enforcement 920xxx atau 921xxx) tidak boleh hilang diam-diam. Lihat keputusan **K1**.

### 3.3 "IP reputasi buruk"

Request diblokir yang `ClientIP`-nya ditandai buruk oleh threat intel. Definisi usulan: skor kepercayaan AbuseIPDB **≥ 75**, **atau** IP muncul di feed yang dipakai (AlienVault OTX, abuse.ch). **[KONFIRMASI]** ambang dan feed yang dihitung.

**Pengayaan dilakukan saat ingest**, bukan saat agregasi. Hasilnya disimpan sebagai boolean `threat.intel.bad` pada dokumen. Alasannya: AbuseIPDB tier gratis hanya mengizinkan kuota pengecekan harian yang kecil, jadi lookup harus per IP unik dengan cache (usulan TTL 24 jam), bukan per request. **[KONFIRMASI]** kuota akun yang Anda punya.

## 4. Retensi dan backfill

Dashboard butuh minimal **720 hari** (12 blok × 30 hari, dibandingkan dengan 12 blok sebelumnya). Log mentah biasanya disimpan jauh lebih singkat. Karena itu:

- Job **tidak menghitung ulang 730 hari dari log mentah** setiap kali. Ia **menyimpan agregat harian** ke penyimpanan sendiri dan hanya menghitung hari yang baru atau perlu dikoreksi.
- **Backfill sekali di awal** dari log yang tersedia. Jika log mentah hanya ada untuk 90 hari, dashboard menampilkan 7 hari dan 30 hari penuh, sedangkan mode 12 bulan baru lengkap setelah data terkumpul. Dashboard akan menyembunyikan perbandingan yang datanya belum cukup, bukan menampilkan angka palsu.

## 5. Jadwal dan koreksi

- Job berjalan **tiap jam**.
- Setiap run menghitung ulang **hari ini dan 2 hari sebelumnya**. Log bisa tiba terlambat dari Logpush atau ingest, jadi angka beberapa jam lalu masih bisa naik. Hari lebih tua dari itu dianggap final.
- Hari berjalan ditandai `complete: false`.

## 6. Kegagalan dan kesegaran data

- Job gagal atau validasi tidak lolos: **file lama dipertahankan**, alarm dikirim ke tim pemilik pipeline.
- Dashboard membaca `generated_at`. Jika lebih tua dari **3 jam**, tampil peringatan "Data terakhir diperbarui X jam lalu". Dashboard tidak pernah menyajikan data basi sebagai terkini.
- Jika `schema_version` tidak dikenal atau file rusak, dashboard menampilkan pesan kesalahan, bukan grafik kosong.

## 7. Query agregasi Elasticsearch (usulan)

Nama index dan field di bawah adalah asumsi. Ganti sesuai index Anda. **[KONFIRMASI]**

| Peran | Field usulan |
|---|---|
| Waktu | `@timestamp` |
| Aksi | `cloudflare.action` |
| ID request | `cloudflare.ray_id` |
| Kategori hasil pemetaan | `waf.category` |
| IP buruk (hasil pengayaan) | `threat.intel.bad` |

```json
POST cloudflare-firewall-*/_search
{
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        { "range": { "@timestamp": { "gte": "2026-11-06T00:00:00+07:00", "lt": "2026-11-09T00:00:00+07:00" } } },
        { "terms": { "cloudflare.action": ["block", "challengeFailed", "jschallengeFailed", "managedChallengeFailed"] } }
      ]
    }
  },
  "aggs": {
    "per_day": {
      "date_histogram": { "field": "@timestamp", "calendar_interval": "day", "time_zone": "Asia/Jakarta", "min_doc_count": 0 },
      "aggs": {
        "per_category": {
          "terms": { "field": "waf.category", "size": 10 },
          "aggs": { "requests": { "cardinality": { "field": "cloudflare.ray_id", "precision_threshold": 40000 } } }
        },
        "bad": {
          "filter": { "term": { "threat.intel.bad": true } },
          "aggs": { "requests": { "cardinality": { "field": "cloudflare.ray_id", "precision_threshold": 40000 } } }
        }
      }
    }
  }
}
```

Catatan teknis yang memengaruhi akurasi:

- **`cardinality` adalah hitungan perkiraan.** Dengan `precision_threshold` 40000 (batas atas yang berpengaruh), galatnya kecil untuk hitungan sampai puluhan ribu, tetapi bisa bergeser beberapa persen untuk hitungan harian yang jauh lebih besar. Jika angka harian per kategori bisa di atas ratusan ribu, ada dua jalan: jadikan satu dokumen per request di ingest (lalu pakai `value_count`), atau terima dan dokumentasikan galat perkiraan. Lihat **K4**.
- `terms` dengan `size` 10 cukup untuk 6 kategori; naikkan jika pemetaan menghasilkan lebih.
- Hasil query diubah job menjadi bentuk `days[].blocked` dan `bad_ip` di bagian 2, dengan nol untuk kategori yang tidak muncul.

## 8. Keputusan yang dibutuhkan dari Anda dan tim

| # | Keputusan | Usulan saya |
|---|---|---|
| **K1** | Rule yang tidak terpetakan (misalnya protocol enforcement): dilipat ke kategori mana, atau ditambah kategori ke-7 "Lainnya"? | Tambah "Lainnya" (butuh perubahan dashboard dari 6 ke 7 warna), supaya tidak ada rule yang menyamar sebagai kategori lain. |
| **K2** | Daftar nilai `Action` yang dihitung sebagai "diblokir". | `block` + tantangan gagal. |
| **K3** | Ambang "IP reputasi buruk" dan feed yang dihitung. | AbuseIPDB ≥ 75, atau muncul di OTX atau abuse.ch. |
| **K4** | Toleransi galat hitungan unik (`cardinality`) vs satu dokumen per request. | Terima galat kecil dan catat di dashboard, kecuali volume harian per kategori melewati ratusan ribu. |
| **K5** | Retensi log mentah saat ini dan berapa hari yang bisa di-backfill. | Tentukan setelah Anda cek; menentukan kapan mode 12 bulan penuh. |
| **K6** | Tempat penyimpanan agregat harian dan file `security-daily.json` (bucket, repo internal, atau disk). | Penyimpanan internal di bawah akses Cloudflare Access. |
| **K7** | Pemilik pipeline dan penerima alarm. | Tim keamanan atau data Jago. |

## 9. Di luar cakupan dokumen ini

Endpoint paling diserang, negara sumber, dan panel konteks eksternal (Cloudflare Radar). Semuanya bisa ditambah sebagai field baru dengan menaikkan `schema_version` setelah kontrak ini disepakati.
