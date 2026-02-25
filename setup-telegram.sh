#!/bin/bash

# راهنمای راه‌اندازی Telegram Mini App

echo "🚀 راه‌اندازی Telegram Mini App"
echo "================================"
echo ""

# دریافت توکن
read -p "توکن ربات تلگرام خود را وارد کنید (از @BotFather دریافت کنید): " BOT_TOKEN

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ توکن نمی‌تواند خالی باشد!"
    exit 1
fi

# دریافت URL
read -p "آدرس دامنه خود را وارد کنید (مثال: https://yourdomain.com): " APP_URL

if [ -z "$APP_URL" ]; then
    echo "❌ آدرس نمی‌تواند خالی باشد!"
    exit 1
fi

# ذخیره در .env.local
echo "" >> .env.local
echo "# Telegram Configuration" >> .env.local
echo "TELEGRAM_BOT_TOKEN=$BOT_TOKEN" >> .env.local
echo "NEXT_PUBLIC_APP_URL=$APP_URL" >> .env.local

echo ""
echo "✅ تنظیمات در .env.local ذخیره شد"
echo ""

# تنظیم webhook
WEBHOOK_URL="${APP_URL}/api/telegram/webhook"
echo "📡 در حال تنظیم webhook..."

RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"${WEBHOOK_URL}\"}")

if echo "$RESPONSE" | grep -q '"ok":true'; then
    echo "✅ Webhook با موفقیت تنظیم شد: $WEBHOOK_URL"
else
    echo "❌ خطا در تنظیم webhook:"
    echo "$RESPONSE"
fi

echo ""
echo "🎉 راه‌اندازی کامل شد!"
echo ""
echo "مراحل بعدی:"
echo "1. پروژه را build کنید: npm run build"
echo "2. پروژه را deploy کنید"
echo "3. در تلگرام /start را به ربات ارسال کنید"
