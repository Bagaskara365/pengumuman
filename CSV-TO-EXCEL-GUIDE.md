# Script untuk Convert CSV ke Excel Format

Jika Anda ingin menggunakan data dari `peserta.csv` yang sudah ada, berikut adalah script untuk membantu konversi:

## Format CSV Saat Ini

```csv
email,token,nama,status_lolos,program_studi,fakultas,divisi,pesan_khusus
ahmad.budi@email.com,ABC123,Ahmad Budi Santoso,LOLOS,Teknik Informatika,Fakultas Teknik,Program,Selamat! Anda lolos ke tahap wawancara
```

## Yang Perlu Dilakukan

1. **Buka file `peserta.csv`** dengan Excel
2. **Hapus kolom `pesan_khusus`** (akan di-generate otomatis)
3. **Save As** → `nama_format.xlsx`
4. **Pindahkan** ke `src/data/nama_format.xlsx`
5. **Copy** ke public folder dengan command: `npm run copy-excel`

## Atau Manual Copy Data

Dari data CSV yang ada:

| email                    | token  | nama               | status_lolos | program_studi      | fakultas               | divisi   |
| ------------------------ | ------ | ------------------ | ------------ | ------------------ | ---------------------- | -------- |
| ahmad.budi@email.com     | ABC123 | Ahmad Budi Santoso | LOLOS        | Teknik Informatika | Fakultas Teknik        | Program  |
| siti.nurhaliza@email.com | DEF456 | Siti Nurhaliza     | LOLOS        | Teknik Elektro     | Fakultas Teknik        | Elektrik |
| john.doe@email.com       | GHI789 | John Doe           | TIDAK LOLOS  | Teknik Mesin       | Fakultas Teknik        | Mekanik  |
| jane.smith@email.com     | JKL012 | Jane Smith         | LOLOS        | Teknik Industri    | Fakultas Teknik        | Mekanik  |
| muhammad.rizki@email.com | MNO345 | Muhammad Rizki     | LOLOS        | Sistem Informasi   | Fakultas Ilmu Komputer | Program  |
| sarah.amanda@email.com   | PQR678 | Sarah Amanda       | TIDAK LOLOS  | Teknik Sipil       | Fakultas Teknik        | Elektrik |

**Pesan akan otomatis dibuat sesuai status!**
