# Format File Excel untuk Data Peserta

## Lokasi File

- **File:** `src/data/nama_format.xlsx`
- **File Public:** `public/nama_format.xlsx` (auto-copied)

## Format Kolom yang Diharapkan

| Kolom           | Nama Alternatif                        | Wajib | Keterangan                            |
| --------------- | -------------------------------------- | ----- | ------------------------------------- |
| `email`         | `Email`                                | ✅    | Email peserta untuk generate username |
| `token`         | `Token`                                | ✅    | Token akses untuk login               |
| `nama`          | `Nama`, `nama_lengkap`, `Nama Lengkap` | ✅    | Nama lengkap peserta                  |
| `status_lolos`  | `status`, `Status Lolos`               | ✅    | Status kelulusan (LOLOS/TIDAK LOLOS)  |
| `program_studi` | `Program Studi`, `prodi`               | ❌    | Program studi peserta                 |
| `fakultas`      | `Fakultas`                             | ❌    | Fakultas peserta                      |
| `divisi`        | `Divisi`                               | ❌    | Divisi yang dipilih                   |

## Contoh Format Excel

| email                | token  | nama               | status_lolos | program_studi      | fakultas        | divisi   |
| -------------------- | ------ | ------------------ | ------------ | ------------------ | --------------- | -------- |
| ahmad.budi@email.com | ABC123 | Ahmad Budi Santoso | LOLOS        | Teknik Informatika | Fakultas Teknik | Program  |
| siti.nur@email.com   | DEF456 | Siti Nurhaliza     | LOLOS        | Teknik Elektro     | Fakultas Teknik | Elektrik |
| john.doe@email.com   | GHI789 | John Doe           | TIDAK LOLOS  | Teknik Mesin       | Fakultas Teknik | Mekanik  |

## Fitur Otomatis

### 1. **Username Generation**

- Otomatis dibuat dari email (bagian sebelum @)
- Menghapus titik dan mengubah ke huruf kecil
- Contoh: `ahmad.budi@email.com` → `ahmadbudi`

### 2. **Pesan Otomatis**

- **LOLOS**: "Selamat! Anda lolos ke tahap wawancara"
- **TIDAK LOLOS**: "Mohon maaf belum berhasil kali ini"

### 3. **Status Normalisasi**

- Otomatis mendeteksi berbagai variasi status
- Case-insensitive (lolos = LOLOS = Lolos)
- Default: TIDAK LOLOS jika tidak terdeteksi

## Cara Update Data

1. **Edit file Excel** di `src/data/nama_format.xlsx`
2. **Copy ke public folder:**
   ```bash
   xcopy "src\data\nama_format.xlsx" "public\" /Y
   ```
3. **Restart development server:**
   ```bash
   npm run dev
   ```

## Error Handling

Jika file Excel gagal dimuat, sistem akan menggunakan data fallback untuk development.

## Testing

Sistem akan membaca data dari Excel secara realtime ketika aplikasi dijalankan.
