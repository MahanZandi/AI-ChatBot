# 🌐 دسترسی شبکه محلی - Local Network Access

## 🎯 هدف
اجرای پروژه روی تمام اینترفیس‌های شبکه برای دسترسی از دستگاه‌های دیگر (موبایل، تبلت، لپتاپ دیگر)

## ⚙️ تنظیمات

### 1. اجرای پروژه روی 0.0.0.0

به صورت پیش‌فرض، Next.js فقط روی `localhost` اجرا می‌شود و فقط همان سیستم به آن دسترسی دارد.

برای قابل دسترس شدن در شبکه محلی، از دستور زیر استفاده کنید:

```bash
npm run dev-host
```

یا مستقیم:
```bash
next dev -H 0.0.0.0
```

### 2. پیدا کردن IP لوکال

#### macOS:
```bash
ipconfig getifaddr en0
```

خروجی نمونه:
```
192.168.43.1
```

#### لینوکس:
```bash
hostname -I | awk '{print $1}'
```

#### ویندوز:
```bash
ipconfig
```
(به دنبال IPv4 Address بگردید)

### 3. دسترسی از دستگاه‌های دیگر

اگر پروژه روی پورت 3000 اجرا شده باشد:

```
http://192.168.43.1:3000
```

(IP واقعی سیستم خود را جایگزین کنید)

## 🔧 استفاده با ngrok

### روش 1: ngrok با localhost (فعلی)
```bash
ngrok http 3000
```

### روش 2: ngrok با IP شبکه
```bash
ngrok http 192.168.43.1:3000
```

## 📱 Use Cases

### 1. تست روی موبایل واقعی
```bash
# روی کامپیوتر:
npm run dev-host

# روی موبایل (همان WiFi):
http://192.168.43.1:3000
```

### 2. دسترسی چند نفره در شبکه محلی
همه افرادی که به همان WiFi/Hotspot متصل هستند می‌توانند به پروژه دسترسی داشته باشند.

### 3. تست Telegram Mini App بدون ngrok
اگر دستگاه موبایل و کامپیوتر در یک شبکه باشند:
```bash
# روی کامپیوتر:
npm run dev-host

# IP را پیدا کنید:
ipconfig getifaddr en0

# در تلگرام از IP استفاده کنید (فقط برای تست محلی)
```

## 🔒 نکات امنیتی

### ⚠️ هشدار
وقتی پروژه روی `0.0.0.0` اجرا می‌شود، **همه دستگاه‌های شبکه محلی** به آن دسترسی دارند.

### توصیه‌ها:
1. فقط در شبکه‌های قابل اعتماد استفاده کنید (WiFi خانگی)
2. در شبکه‌های عمومی از این روش استفاده نکنید
3. برای production از HTTPS استفاده کنید
4. Firewall را فعال نگه دارید

## 🐛 عیب‌یابی

### پروژه در شبکه قابل دسترسی نیست

**1. بررسی Firewall:**
```bash
# macOS - اجازه دسترسی به Node
# System Preferences → Security & Privacy → Firewall → Firewall Options
# اطمینان حاصل کنید که Node.js مجاز است
```

**2. بررسی اجرای صحیح:**
```bash
# باید ببینید:
○ Local:    http://localhost:3000
○ Network:  http://192.168.43.1:3000
```

**3. بررسی اتصال شبکه:**
```bash
# از دستگاه دیگر:
ping 192.168.43.1
```

### Telegram Mini App با IP کار نمی‌کند

**مشکل**: Telegram فقط HTTPS قبول می‌کند، IP محلی HTTP است.

**راه‌حل**: باید از ngrok استفاده کنید:
```bash
npm run dev-host
ngrok http 192.168.43.1:3000
```

## 📊 مقایسه روش‌ها

| روش | دسترسی | HTTPS | Use Case |
|-----|--------|-------|----------|
| `npm run dev` | فقط localhost | ❌ | Development معمولی |
| `npm run dev-host` | شبکه محلی | ❌ | تست روی دستگاه‌های دیگر |
| `ngrok http 3000` | اینترنت | ✅ | Telegram Mini App |
| `ngrok http IP:3000` | اینترنت | ✅ | Telegram + شبکه محلی |

## 🚀 دستورات سریع

```bash
# اجرا روی شبکه محلی
npm run dev-host

# پیدا کردن IP
ipconfig getifaddr en0

# تست از دستگاه دیگر
curl http://192.168.43.1:3000

# ngrok با IP شبکه
ngrok http $(ipconfig getifaddr en0):3000
```

## 💡 نکات پیشرفته

### اجرای خودکار با IP
```bash
# در package.json می‌توانید اضافه کنید:
"dev-network": "next dev -H $(ipconfig getifaddr en0)"
```

### نمایش IP در startup
```bash
echo "🌐 Network IP: $(ipconfig getifaddr en0)"
npm run dev-host
```

### استفاده در Docker
```dockerfile
EXPOSE 3000
CMD ["npm", "run", "dev-host"]
```

## 📚 منابع

- [Next.js Custom Server](https://nextjs.org/docs/advanced-features/custom-server)
- [Network Configuration](https://nextjs.org/docs/api-reference/cli#development)
