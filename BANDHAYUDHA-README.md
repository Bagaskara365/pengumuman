# Bandhayudha - Portal Pengumuman Magang

Portal pengumuman hasil seleksi magang untuk UNDIP Abu Robocon Research Team.

## 🎯 Fitur Utama

### ✅ Sistem Autentikasi

- Login menggunakan **email + token** (bukan email + tanggal lahir)
- Validasi data peserta dari file CSV
- Sistem logout dengan konfirmasi

### ✅ Countdown Timer

- Tampilan countdown 30 detik setelah login berhasil
- Responsive typography yang tidak overflow di mobile
- Animasi yang smooth dan modern

### ✅ Dashboard Pengumuman

- Tampilan status lolos/tidak lolos dengan ikon dan warna yang jelas
- Informasi lengkap peserta: nama, email, program studi, fakultas, divisi
- Pesan khusus untuk setiap peserta
- Langkah-langkah selanjutnya yang berbeda untuk yang lolos vs tidak lolos

### ✅ Sistem Divisi

- Kategorisasi peserta berdasarkan divisi: **Mekanik**, **Elektrik**, **Program**
- Tampilan divisi di dashboard
- Data CSV yang sudah include kolom divisi

### ✅ Integrasi WhatsApp

- QR Code untuk bergabung dengan grup WhatsApp (khusus yang lolos)
- Tombol direct link ke grup WhatsApp
- Sistem QR code dengan gambar custom atau fallback ke placeholder

### ✅ Logo System

- Logo Bandhayudha dengan fallback system
- Support untuk file JPG di `src/assets/logo/`
- Desain yang konsisten di seluruh aplikasi

### ✅ UI/UX Modern

- Glass morphism design dengan backdrop blur
- Gradient backgrounds yang menarik
- Responsive design untuk mobile dan desktop
- Animasi smooth dan professional
- Color scheme yang konsisten

## 📁 Struktur File Penting

### Data dan Konfigurasi

- `src/lib/pesertaData.ts` - Interface dan data peserta
- `peserta.csv` - Database peserta dalam format CSV
- `src/assets/qr/whatsapp-group.jpg` - QR code grup WhatsApp (user upload)
- `src/assets/logo/bandhayudha.jpg` - Logo Bandhayudha (user upload)

### Komponen Utama

- `src/components/LoginForm.tsx` - Form login dengan email + token
- `src/components/CountdownTimer.tsx` - Timer 30 detik dengan responsive text
- `src/components/AnnouncementDashboard.tsx` - Dashboard hasil seleksi
- `src/components/QRCodeComponent.tsx` - Komponen QR code WhatsApp
- `src/components/Logo.tsx` - Komponen logo dengan fallback

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Assets

#### Logo Bandhayudha

- Upload file logo sebagai `src/assets/logo/bandhayudha.jpg`
- Ukuran rekomendasi: 200x200px atau lebih (square)

#### QR Code WhatsApp

- Generate QR code untuk link grup WhatsApp
- Upload sebagai `src/assets/qr/whatsapp-group.jpg`
- Ukuran rekomendasi: 400x400px atau lebih (square)

### 3. Update Data Peserta

Edit file `peserta.csv` dengan format:

```csv
nama,email,token,program_studi,fakultas,status_lolos,pesan_khusus,divisi
```

### 4. Update Link WhatsApp

Edit link grup WhatsApp di `src/components/AnnouncementDashboard.tsx`:

```typescript
const whatsappGroupLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK";
```

### 5. Run Development Server

```bash
npm run dev
```

## 🔐 Sistem Autentikasi

### Format Login

- **Email**: alamat email peserta
- **Token**: token unik untuk setiap peserta (bukan tanggal lahir)

### Contoh Data

```csv
John Doe,john@example.com,ABC123,Teknik Mesin,Fakultas Teknik,LOLOS,Selamat! Anda lolos ke tahap wawancara.,Mekanik
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Typography yang Responsive

Countdown timer menggunakan responsive text classes:

- Mobile: `text-2xl`
- Small: `sm:text-3xl`
- Medium: `md:text-4xl`
- Large: `lg:text-5xl`

## 🎨 Design System

### Colors

- **Primary**: Blue gradient untuk buttons dan accents
- **Success**: Green untuk status lolos
- **Destructive**: Red untuk status tidak lolos
- **Glass**: Transparent dengan backdrop blur

### Components

- Cards dengan glass morphism effect
- Buttons dengan gradient dan shadow
- Badges untuk status
- Icons dari Lucide React

## 🔄 Alur Penggunaan

1. **Login**: Peserta masuk dengan email + token
2. **Countdown**: Tampil countdown 30 detik
3. **Dashboard**: Muncul hasil seleksi dengan info lengkap
4. **Next Steps**: Peserta bisa lihat langkah selanjutnya
5. **WhatsApp**: Yang lolos bisa join grup WhatsApp via QR/tombol

## ⚡ Performance

- Vite untuk build tool yang cepat
- React untuk rendering yang efisien
- Tailwind CSS untuk styling yang optimal
- Lazy loading untuk assets
- Optimized images dan responsive design

## 🛠 Maintenance

### Update Data Peserta

1. Edit file `peserta.csv`
2. Update interface di `pesertaData.ts` jika ada perubahan struktur
3. Restart development server

### Update Assets

1. Replace file di folder `src/assets/`
2. Pastikan nama file sesuai yang tertulis di code
3. Hard refresh browser (Ctrl+F5)

## 🚀 Deployment

### Build Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Output akan ada di folder `dist/` yang siap untuk deployment ke hosting manapun.

---

**Bandhayudha Portal** - UNDIP Abu Robocon Research Team 2025
