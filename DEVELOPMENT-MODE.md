# Mode Development - Bandhayudha Portal

## 🔧 Cara Menggunakan Mode Development

### Quick Setup:

1. Buka file: `src/config/devConfig.ts`
2. Ubah nilai `DEVELOPMENT_MODE`:
   - **`DEVELOPMENT_MODE = 1`** → Login bisa kapan saja (untuk development/editing)
   - **`DEVELOPMENT_MODE = 0`** → Login hanya bisa 28 Sept 2025 jam 15:00 WIB (untuk production)

### Mode Development (DEVELOPMENT_MODE = 1)

**✅ Keuntungan:**

- Login bisa diakses kapan saja tanpa menunggu waktu
- Ada indikator "MODE DEVELOPMENT" di halaman login
- Perfect untuk editing dan testing
- Bypass semua pembatasan waktu

**🎯 Kapan Digunakan:**

- Saat butuh edit portal
- Testing fitur baru
- Development dan debugging
- Sebelum launch resmi

### Mode Production (DEVELOPMENT_MODE = 0)

**🔒 Keamanan:**

- Login hanya bisa mulai 28 September 2025 pukul 15:00 WIB
- Sesuai jadwal asli yang diminta
- Tidak ada bypass
- Tampilan normal untuk peserta

**🎯 Kapan Digunakan:**

- Saat portal sudah ready untuk peserta
- Launch resmi pengumuman
- Production environment

## 📝 Langkah Mengganti Mode:

### Untuk Development (Edit Portal):

```typescript
// File: src/config/devConfig.ts
export const DEVELOPMENT_MODE = 1; // ← Ubah jadi 1
```

### Untuk Production (Launch Resmi):

```typescript
// File: src/config/devConfig.ts
export const DEVELOPMENT_MODE = 0; // ← Ubah jadi 0
```

## 🎨 Visual Indicator:

### Mode Development:

- Banner kuning "🔧 MODE DEVELOPMENT"
- Time display hijau
- Pesan "Login tersedia (Mode Development)"

### Mode Production:

- Tampilan normal biru
- Time display sesuai waktu server
- Countdown sampai waktu login dibuka

## ⚠️ PENTING:

**Jangan lupa ubah ke mode production (0) sebelum launch resmi!**

---

**Current Setting**: Cek nilai `DEVELOPMENT_MODE` di `src/config/devConfig.ts`
