# Panduan Setup Logo dan Favicon

## 🎨 **Logo Utama**

### 📁 **Lokasi Logo:**

- **Path**: `src/assets/images/logo.jpg`
- **Format**: JPG, PNG, atau SVG
- **Ukuran Rekomendasi**: 512x512px atau 1024x1024px
- **Rasio**: 1:1 (kotak/bulat)

### 🔧 **Cara Mengganti Logo:**

1. **Siapkan file logo** dengan nama `logo.jpg` (atau `logo.png`)
2. **Copy file** ke folder `src/assets/images/`
3. **Update path** di `src/components/Logo.tsx` jika perlu:
   ```tsx
   src = "/src/assets/images/logo.jpg"; // Ganti sesuai nama file
   ```

## 🏷️ **Favicon (Logo di Tab Browser)**

### 📁 **Lokasi Favicon:**

- **Path**: `public/favicon.ico`
- **Format**: ICO, PNG (16x16, 32x32, 48x48px)

### 🔧 **Cara Mengganti Favicon:**

1. **Siapkan file favicon** berukuran 32x32px
2. **Convert ke format .ico** (gunakan tool online converter)
3. **Replace file** `public/favicon.ico` dengan favicon baru
4. **Restart server** dengan `npm run dev`

### 🌐 **Tool Convert Favicon:**

- [favicon.io](https://favicon.io/) - Generate dari image
- [realfavicongenerator.net](https://realfavicongenerator.net/) - Advanced generator

## 📱 **Progressive Web App Icons (Opsional)**

### 📁 **Lokasi PWA Icons:**

- `public/icon-192.png` (192x192px)
- `public/icon-512.png` (512x512px)

### 🔧 **Langkah Setup PWA Icons:**

1. **Buat 2 versi logo:**
   - **192x192px** untuk Android
   - **512x512px** untuk iOS
2. **Save** sebagai PNG dengan nama `icon-192.png` dan `icon-512.png`
3. **Letakkan** di folder `public/`

## ⚠️ **Tips Penting:**

- **Logo harus berkualitas tinggi** agar tidak pecah
- **Background transparan** lebih baik untuk logo
- **Hindari text kecil** pada logo karena akan sulit dibaca
- **Test di berbagai ukuran** (login form, header, countdown)
- **Format JPG** untuk foto, **PNG** untuk logo dengan transparansi

## 🔄 **Troubleshooting:**

### Jika logo tidak muncul:

1. Cek path file sudah benar
2. Cek nama file sesuai (case-sensitive)
3. Restart development server
4. Clear browser cache (Ctrl+F5)

### Jika favicon tidak berubah:

1. Clear browser cache
2. Cek file ada di `public/favicon.ico`
3. Restart server
4. Hard reload (Ctrl+Shift+R)
