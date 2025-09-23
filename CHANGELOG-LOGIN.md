# Changelog: Sistem Login & Data Excel

## Perubahan Terbaru: Data dari Excel + Auto Message Mapping

### 🆕 **Fitur Baru (Excel Integration)**

1. **Membaca Data dari Excel**

   - ✅ Data sekarang dibaca dari `src/data/nama_format.xlsx`
   - ✅ Support multiple nama kolom (email/Email, nama/Nama, dll)
   - ✅ Auto-copy file Excel ke public folder

2. **Auto Message Mapping**

   - ✅ **LOLOS** → "Selamat! Anda lolos ke tahap wawancara"
   - ✅ **TIDAK LOLOS** → "Mohon maaf belum berhasil kali ini"
   - ✅ Tidak perlu manual input pesan lagi

3. **Username Auto-Generation**
   - ✅ Otomatis dibuat dari email (bagian sebelum @)
   - ✅ Menghapus titik, convert ke lowercase
   - ✅ Contoh: `ahmad.budi@email.com` → `ahmadbudi`

### 📋 **Format Excel yang Didukung**

| Kolom Wajib    | Alternatif               | Contoh               |
| -------------- | ------------------------ | -------------------- |
| `email`        | `Email`                  | ahmad.budi@email.com |
| `token`        | `Token`                  | ABC123               |
| `nama`         | `Nama`, `nama_lengkap`   | Ahmad Budi Santoso   |
| `status_lolos` | `status`, `Status Lolos` | LOLOS / TIDAK LOLOS  |

### 🔧 **Scripts Baru**

- `npm run copy-excel` - Copy Excel file ke public folder
- `npm run dev:full` - Copy Excel + run development server

### 📚 **Dependencies Baru**

- `xlsx` - Library untuk membaca Excel files
- `@types/xlsx` - TypeScript types untuk xlsx

## Perubahan Sebelumnya: Email → Username Login

### 🔄 **Perubahan Login System:**

1. **Interface Data** - Menambahkan field `username` ke `PesertaData`
2. **Validasi Login** - Mengubah fungsi `validateLogin()` untuk menggunakan username
3. **UI Login Form** - Mengubah input field dari email ke username
4. **Data Peserta** - Username auto-generated dari email

### 🧪 **Testing Login:**

Username akan otomatis dibuat dari email di Excel:

- `ahmad.budi@email.com` + `ABC123` → Login dengan `ahmadbudi` + `ABC123`
- `siti.nurhaliza@email.com` + `DEF456` → Login dengan `sitinurhaliza` + `DEF456`

### 🛡️ **Validasi:**

- ✅ Username minimal 3 karakter
- ✅ Username case-insensitive
- ✅ Token tetap case-sensitive
- ✅ Status otomatis normalized (lolos/LOLOS/Lolos → LOLOS)

### 🚀 **Cara Update Data:**

1. **Edit Excel:** Update `src/data/nama_format.xlsx`
2. **Copy File:** `npm run copy-excel`
3. **Restart:** `npm run dev` atau `npm run dev:full`
4. **Test Login:** Gunakan username yang di-generate dari email

### 🔄 **Migration dari CSV:**

Lihat file `CSV-TO-EXCEL-GUIDE.md` untuk panduan konversi dari CSV ke Excel.
