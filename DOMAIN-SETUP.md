# Domain Setup untuk Bandhayudha Portal

## 🌐 **Domain Configuration**

### **Target Domain:** `pengumuman.bandhayudha.com`

### **Development Port:** `2025`

## 🚀 **Setup Development Server**

### **Langkah 1: Jalankan Development Server**

```bash
npm run dev
```

Server akan berjalan di:

- **Local**: `http://localhost:2025`
- **Network**: `http://[YOUR-IP]:2025`

### **Langkah 2: Konfigurasi Host (Optional untuk Testing)**

Untuk testing domain lokal, tambahkan di file `hosts`:

- **Windows**: `C:\Windows\System32\drivers\etc\hosts`
- **Linux/Mac**: `/etc/hosts`

Tambahkan baris:

```
127.0.0.1 pengumuman.bandhayudha.com
```

## 🔧 **Production Deployment Steps**

### **1. Build untuk Production**

```bash
npm run build
```

### **2. Preview Production Build**

```bash
npm run preview
```

### **3. Deploy ke Server**

Upload folder `dist/` ke web server yang mengarah ke domain `pengumuman.bandhayudha.com`

## 📋 **DNS Configuration**

### **Record DNS yang Diperlukan:**

```
Type: A
Name: pengumuman
Value: [IP-SERVER-ANDA]
TTL: 300
```

Atau jika menggunakan CNAME:

```
Type: CNAME
Name: pengumuman
Value: your-server.com
TTL: 300
```

## 🛡️ **SSL Certificate**

Pastikan SSL certificate aktif untuk `https://pengumuman.bandhayudha.com`

### **Let's Encrypt (Gratis):**

```bash
certbot --nginx -d pengumuman.bandhayudha.com
```

## 📱 **Testing URLs**

### **Development:**

- `http://localhost:2025`
- `http://pengumuman.bandhayudha.com:2025` (jika DNS sudah diarahkan)

### **Production:**

- `https://pengumuman.bandhayudha.com`

## ⚙️ **Server Configuration**

### **Nginx Configuration Example:**

```nginx
server {
    listen 80;
    server_name pengumuman.bandhayudha.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pengumuman.bandhayudha.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /var/www/bandhayudha/dist;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔍 **Verification Steps**

### **1. Check Development Server:**

```bash
curl http://localhost:2025
```

### **2. Check Domain Resolution:**

```bash
nslookup pengumuman.bandhayudha.com
```

### **3. Check SSL Certificate:**

```bash
curl -I https://pengumuman.bandhayudha.com
```

## 📊 **Performance Optimization**

### **Build Optimizations:**

- Minified CSS/JS
- Image optimization
- Gzip compression
- CDN integration (optional)

### **SEO Ready:**

- Meta tags configured
- Open Graph tags
- Twitter Card tags
- Proper HTML structure

---

**Domain:** https://pengumuman.bandhayudha.com
**Development:** http://localhost:2025
