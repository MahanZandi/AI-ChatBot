# 🏠 راهنمای اجرای لوکال Telegram Mini App

## 🎯 برای کار لوکال با Ollama

چون Telegram فقط HTTPS قبول میکنه، باید از **ngrok** استفاده کنید تا localhost شما رو به اینترنت متصل کنه.

## 📦 نصب ngrok

### macOS:
```bash
brew install ngrok
```

### لینوکس/ویندوز:
از [ngrok.com/download](https://ngrok.com/download) دانلود کنید

## 🚀 مراحل راهاندازی

### 1. اجرای پروژه Next.js

```bash
npm run dev
```

پروژه روی `http://localhost:3000` اجرا میشه.

### 2. اجرای ngrok

ترمینال جدید باز کنید:

```bash
ngrok http 3000
```

خروجی مثل این میده:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

آدرس `https://abc123.ngrok.io` رو کپی کنید.

### 3. تنظیم Webhook

این لینک رو در مرورگر باز کنید (آدرس ngrok رو جایگزین کنید):

```
https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setWebhook?url=https://abc123.ngrok.io/api/telegram/webhook
```

باید پیام `{"ok":true}` ببینید.

### 4. تست

- به ربات خود پیام دهید
- `/start` بزنید
- دکمه "🚀 باز کردن چت" رو بزنید
- Mini App باز میشه و به Ollama لوکال شما متصل میشه!

## ⚙️ تنظیمات `.env.local`

```env
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=llama3.2

TELEGRAM_BOT_TOKEN=8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE

# این رو نیاز ندارید برای لوکال
# NEXT_PUBLIC_APP_URL=...
```

## 🔄 هر بار که ngrok رو ری‌استارت میکنید

ngrok هر بار آدرس جدید میده، پس باید:

1. آدرس جدید ngrok رو بگیرید
2. دوباره webhook رو تنظیم کنید

## 💡 نکات

- **Ollama باید روشن باشه**: `ollama serve`
- **ngrok باید روشن باشه**: در یک ترمینال جدا
- **Next.js باید روشن باشه**: `npm run dev`

## 🆓 ngrok رایگان

- آدرس هر بار عوض میشه
- محدودیت 40 درخواست در دقیقه
- برای تست کافیه

اگه میخواید آدرس ثابت داشته باشید، باید اکانت ngrok بسازید.

## 🐛 عیبیابی

### Webhook تنظیم نمیشه
```bash
# بررسی وضعیت
curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/getWebhookInfo"
```

### Mini App باز نمیشه
- مطمئن شوید ngrok روشنه
- مطمئن شوید Next.js روشنه (`npm run dev`)
- Cache تلگرام رو پاک کنید (تلگرام رو ببندید و دوباره باز کنید)

### Ollama کار نمیکنه
```bash
# بررسی Ollama
ollama list

# اجرای Ollama
ollama serve
```
