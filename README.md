# Bandhayudha - Portal Pengumuman Magang 2025

Portal pengumuman hasil seleksi berkas magang UNDIP Abu Robocon Research Team 2025.

## 🚀 **Perubahan yang Telah Dilakukan**

### ✅ **1. Sistem Login dengan Countdown 30 Detik**

- Setelah login berhasil, sistem akan menunggu **30 detik** sebelum menampilkan pengumuman
- Countdown timer menunjukkan waktu tersisa
- Informasi penting ditampilkan selama countdown

### ✅ **2. Rebranding ke "Bandhayudha"**

- **Sebelum**: "Portal Magang UNDIP"
- **Sekarang**: "Bandhayudha"
- Perubahan di semua komponen (Login, Dashboard, Countdown)

### ✅ **3. Update Tahun 2024 → 2025**

- **Footer**: "Portal Pengumuman Seleksi Magang 2025"
- **Meta tags**: Updated untuk 2025
- **Title**: "Bandhayudha - Portal Pengumuman Magang 2025"

### ✅ **4. Sistem Logo JPG**

- **Logo Path**: `src/assets/images/logo.jpg`
- **Fallback**: SVG placeholder jika JPG tidak ada
- **Fallback Terakhir**: Huruf "B" dengan gradient
- **Ukuran Responsif**: Berbagai ukuran di komponen berbeda

### ✅ **5. Setup Data CSV**

- **Lokasi**: `src/data/peserta.csv`
- **Format**: email, token, nama, status_lolos, program_studi, fakultas, pesan_khusus
- **Panduan Lengkap**: Lihat `PANDUAN_CSV.md`

### ✅ **6. Update Favicon & Browser Metadata**

- **Title**: "Bandhayudha - Portal Pengumuman Magang 2025"
- **Description**: Portal untuk UNDIP Abu Robocon Research Team
- **Favicon**: Gunakan logo tim (instruksi di `PANDUAN_LOGO.md`)

## 📁 **Struktur File Penting**

```
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── logo.jpg                 # 🎯 TARUH LOGO ANDA DI SINI
│   │       └── logo-placeholder.svg     # Fallback logo
│   ├── components/
│   │   ├── Logo.tsx                     # Komponen logo
│   │   ├── LoginForm.tsx               # Form login
│   │   ├── AnnouncementDashboard.tsx   # Dashboard pengumuman
│   │   └── CountdownTimer.tsx          # Timer 30 detik
│   ├── data/
│   │   └── peserta.csv                 # 🎯 DATA PESERTA CSV
│   └── lib/
│       └── pesertaData.ts              # Logic data peserta
├── public/
│   └── favicon.ico                     # 🎯 FAVICON BROWSER
├── PANDUAN_CSV.md                      # 📖 Panduan setup CSV
├── PANDUAN_LOGO.md                     # 📖 Panduan setup logo
└── index.html                          # HTML utama
```

## 🔧 **Cara Setup**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Setup Logo Tim**

```bash
# Copy logo JPG ke folder yang tepat
cp logo-tim-anda.jpg src/assets/images/logo.jpg
```

### **3. Setup Data Peserta**

```bash
# Edit file CSV dengan data peserta
nano src/data/peserta.csv
```

### **4. Setup Favicon**

```bash
# Replace favicon dengan logo tim
cp favicon-tim-anda.ico public/favicon.ico
```

### **5. Jalankan Development Server**

```bash
npm run dev
```

## 🎯 **Login Test Accounts**

| Email                    | Token  | Status         | Program Studi      |
| ------------------------ | ------ | -------------- | ------------------ |
| ahmad.budi@email.com     | ABC123 | ✅ LOLOS       | Teknik Informatika |
| siti.nurhaliza@email.com | DEF456 | ✅ LOLOS       | Teknik Elektro     |
| john.doe@email.com       | GHI789 | ❌ TIDAK LOLOS | Teknik Mesin       |
| jane.smith@email.com     | JKL012 | ✅ LOLOS       | Teknik Industri    |

## 🎨 **Fitur Visual**

- **Tema Warna**: Biru UNDIP dengan aksen emas
- **Responsive Design**: Mobile-friendly
- **Glass Morphism**: Efek transparan modern
- **Gradient**: Background dan tombol bergradien
- **Smooth Animation**: Animasi halus untuk UX
- **QR Code**: Untuk grup WhatsApp peserta lolos

## 📱 **Fitur Khusus**

### **Untuk Peserta LOLOS:**

- ✅ Informasi program studi dan fakultas
- ✅ QR Code grup WhatsApp
- ✅ Tombol join WhatsApp langsung
- ✅ Langkah-langkah persiapan wawancara

### **Untuk Peserta TIDAK LOLOS:**

- ❌ Pesan motivasi
- 📝 Saran untuk kesempatan berikutnya
- 💪 Motivasi tetap semangat

## 🚀 **Production Deploy**

```bash
# Build untuk production
npm run build

# Preview build
npm run preview
```

## 🆘 **Troubleshooting**

### **Logo tidak muncul?**

1. Cek file `src/assets/images/logo.jpg` ada
2. Restart server: `npm run dev`
3. Clear browser cache: Ctrl+F5

### **Data peserta tidak update?**

1. Cek format CSV di `PANDUAN_CSV.md`
2. Restart server setelah edit CSV
3. Cek tidak ada spasi extra di CSV

### **Favicon tidak berubah?**

1. Replace `public/favicon.ico`
2. Hard reload: Ctrl+Shift+R
3. Restart server

---

**Developed with ❤️ for UNDIP Abu Robocon Research Team**
