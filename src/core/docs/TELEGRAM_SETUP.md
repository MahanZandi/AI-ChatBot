# راهنمای راهاندازی Telegram Mini App

## 📋 پیش‌نیازها

1. **ساخت ربات تلگرام:**
   - به [@BotFather](https://t.me/BotFather) در تلگرام پیام دهید
   - دستور `/newbot` را ارسال کنید
   - نام و username برای ربات انتخاب کنید
   - توکن ربات را کپی کنید (مثال: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **دامنه HTTPS:**
   - یک دامنه با SSL (https) نیاز دارید
   - میتوانید از سرویس‌های زیر استفاده کنید:
     - Vercel (رایگان)
     - Netlify (رایگان)
     - Railway
     - یا هر هاست دیگری با HTTPS

## 🚀 مراحل راهاندازی

### روش 1: استفاده از اسکریپت خودکار

```bash
./setup-telegram.sh
```

اسکریپت از شما میپرسد:
- توکن ربات
- آدرس دامنه شما

### روش 2: راهاندازی دستی

#### 1. تنظیم متغیرهای محیطی

فایل `.env.local` را ویرایش کنید:

```env
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=llama3.2

# توکن ربات تلگرام (از @BotFather)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# آدرس دامنه شما
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

#### 2. Build و Deploy

```bash
# نصب وابستگی‌ها
npm install

# ساخت پروژه
npm run build

# اجرای پروژه (محلی)
npm start
```

#### 3. Deploy روی Vercel (توصیه میشود)

```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel

# تنظیم متغیرهای محیطی در Vercel Dashboard:
# - TELEGRAM_BOT_TOKEN
# - NEXT_PUBLIC_APP_URL
# - OPENAI_BASE_URL
# - OPENAI_MODEL
```

#### 4. تنظیم Webhook

بعد از deploy، webhook را تنظیم کنید:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://yourdomain.com/api/telegram/webhook"}'
```

یا از مرورگر:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/api/telegram/webhook
```

#### 5. تست ربات

- به ربات خود در تلگرام پیام دهید
- دستور `/start` را ارسال کنید
- دکمه "🚀 باز کردن چت" را بزنید
- Mini App باز میشود!

## 🔧 تنظیمات اضافی

### تنظیم Menu Button (اختیاری)

برای اضافه کردن دکمه Mini App به منوی ربات:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "باز کردن چت",
      "web_app": {"url": "https://yourdomain.com"}
    }
  }'
```

### بررسی وضعیت Webhook

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

## 📱 ویژگی‌های Mini App

پروژه شما اکنون:
- ✅ در تلگرام به صورت Mini App اجرا میشود
- ✅ از Telegram Web App API استفاده میکند
- ✅ به صورت تمام صفحه باز میشود
- ✅ اطلاعات کاربر تلگرام را دریافت میکند

## 🐛 عیب‌یابی

### Webhook تنظیم نمیشود
- مطمئن شوید URL شما HTTPS است
- بررسی کنید توکن صحیح است
- SSL certificate معتبر باشد

### Mini App باز نمیشود
- Cache مرورگر را پاک کنید
- مطمئن شوید پروژه deploy شده است
- لاگ‌های سرور را بررسی کنید

### API کار نمیکند
- در production باید Ollama روی سرور نصب باشد
- یا از OpenAI API استفاده کنید
- یا یک API gateway راه‌اندازی کنید

## 📚 منابع

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🔐 نکات امنیتی

- هرگز توکن ربات را commit نکنید
- از متغیرهای محیطی استفاده کنید
- Webhook را فقط از IP تلگرام بپذیرید (اختیاری)
