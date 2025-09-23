# 🔍 Panduan Debugging Login Issue

## Langkah-langkah Debugging

### 1. **Cek Server Status**

- Pastikan server berjalan di http://localhost:2025
- Refresh halaman jika perlu

### 2. **Akses Debug Mode**

- Di halaman login, clik tombol **"Debug Data"** di pojok kanan atas
- Tombol ini hanya muncul dalam development mode

### 3. **Periksa Data Excel**

- Dalam mode debug, akan terlihat semua data yang berhasil dimuat
- Perhatikan username dan token yang tersedia
- Cek apakah data sesuai dengan file Excel

### 4. **Test Login**

- Gunakan username dan token yang terlihat di debug data
- Username adalah email tanpa domain (@xxx.com) dan tanpa titik
- Contoh: `ahmad.budi@email.com` → username: `ahmadbudi`

### 5. **Cek Browser Console**

- Tekan F12 untuk buka Developer Tools
- Pergi ke tab Console
- Lihat log untuk debugging:
  - 🔄 Loading Excel file...
  - 📊 Raw Excel data
  - 🔐 Validating login
  - 👥 Available users

### 6. **Kemungkinan Masalah**

#### A. File Excel Tidak Terbaca

**Gejala:** Error di console "Failed to fetch Excel file"
**Solusi:**

```bash
npm run copy-excel
```

#### B. Format Excel Salah

**Gejala:** Data kosong atau username/token tidak sesuai
**Solusi:** Periksa kolom di Excel:

- `email` (wajib)
- `token` (wajib)
- `nama` (wajib)
- `status_lolos` (wajib)

#### C. Username Generation Error

**Gejala:** Username tidak sesuai yang diharapkan
**Solusi:**

- Email: `ahmad.budi@email.com` → Username: `ahmadbudi`
- Email: `siti.nurhaliza@email.com` → Username: `sitinurhaliza`

### 7. **Manual Test Data**

Jika Excel bermasalah, sistem akan menggunakan data fallback:

```
Username: ahmadbudi, Token: ABC123
Username: sitinurhaliza, Token: DEF456
Username: johndoe, Token: GHI789
```

### 8. **Fix Common Issues**

#### Reset Data:

```bash
npm run copy-excel
npm run dev
```

#### Clear Browser Cache:

- Tekan Ctrl+Shift+R untuk hard reload
- Atau buka Incognito/Private window

### 9. **Format Excel yang Benar**

Pastikan file `src/data/nama_format.xlsx` memiliki kolom:

| email                | token  | nama       | status_lolos |
| -------------------- | ------ | ---------- | ------------ |
| ahmad.budi@email.com | ABC123 | Ahmad Budi | LOLOS        |
| jane.doe@email.com   | DEF456 | Jane Doe   | TIDAK LOLOS  |

**Username akan otomatis generated dari email!**
