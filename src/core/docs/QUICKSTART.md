# 🚀 شروع سریع - اجرای لوکال

## دستورات سریع

```bash
# 1. اجرای Next.js
npm run dev

# 2. اجرای ngrok (ترمینال جدید)
ngrok http 3000

# 3. تنظیم webhook (آدرس ngrok رو جایگزین کنید)
# در مرورگر باز کنید:
https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setWebhook?url=https://YOUR-NGROK-URL.ngrok.io/api/telegram/webhook

# 4. تست در تلگرام
# به ربات /start بزنید
```

## توکن شما

```
875017880989:AAEo7pqqd58DosteFghgdYWfPLe-blBto5kE
```

قرار گرفته در: `.env.local`

## نیازمندیها

- ✅ Ollama نصب و روشن باشه
- ✅ ngrok نصب باشه
- ✅ Next.js اجرا شده باشه

## مستندات کامل

- `src/core/docs/LOCAL_DEVELOPMENT.md` - راهنمای کامل لوکال
- `src/core/docs/TELEGRAM_SETUP.md` - راهنمای deploy
- `src/core/docs/CODING_STANDARDS.md` - استانداردهای کد
