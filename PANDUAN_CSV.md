# Panduan Setup Data Peserta Magang

## Lokasi File CSV

### 📁 **Folder untuk CSV Data:**

- **Path**: `src/data/peserta.csv`
- File ini berisi data peserta magang dengan format yang telah ditentukan

### 📋 **Format CSV yang Diperlukan:**

```csv
email,token,nama,status_lolos,program_studi,fakultas,pesan_khusus
ahmad.budi@email.com,ABC123,Ahmad Budi Santoso,LOLOS,Teknik Informatika,Fakultas Teknik,Selamat! Anda lolos ke tahap wawancara
siti.nurhaliza@email.com,DEF456,Siti Nurhaliza,LOLOS,Teknik Elektro,Fakultas Teknik,Selamat! Anda lolos ke tahap wawancara
john.doe@email.com,GHI789,John Doe,TIDAK LOLOS,Teknik Mesin,Fakultas Teknik,Mohon maaf belum berhasil kali ini
```

### 🔧 **Konfigurasi Kolom:**

1. **email** - Email peserta (harus unique)
2. **token** - Token akses untuk login (generate random string)
3. **nama** - Nama lengkap peserta
4. **status_lolos** - Status seleksi: "LOLOS" atau "TIDAK LOLOS"
5. **program_studi** - Program studi yang dipilih
6. **fakultas** - Fakultas terkait
7. **pesan_khusus** - Pesan khusus untuk peserta

### ⚠️ **Catatan Penting:**

- **Jangan ada spasi** setelah koma dalam CSV
- **Token harus unique** untuk setiap peserta
- **Status harus persis** "LOLOS" atau "TIDAK LOLOS"
- **Email harus valid** dan unique
- File harus disimpan dengan encoding **UTF-8**

### 🔄 **Untuk Update Data:**

1. Edit file `src/data/peserta.csv`
2. Atau update array `pesertaData` di `src/lib/pesertaData.ts`
3. Restart development server dengan `npm run dev`

### 📝 **Tips Generate Token:**

```javascript
// Generate random token 6 karakter
function generateToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
```

Contoh token: ABC123, DEF456, GHI789, dll.
