# 🔄 راهنمای اجرای مجدد - Telegram Mini App

## ⚡ دستورات سریع

```bash
# ترمینال 1: Next.js
npm run dev

# ترمینال 2: ngrok
ngrok http 3000

# ترمینال 3: تنظیم Telegram (فقط اگر ngrok URL عوض شد)
# آدرس ngrok رو از ترمینال 2 کپی کنید و جایگزین NEW-URL کنید

NGROK_URL="https://NEW-URL.ngrok-free.dev"

curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setWebhook?url=${NGROK_URL}/api/telegram/webhook"

curl -X POST "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "{\"menu_button\":{\"type\":\"web_app\",\"text\":\"🚀 باز کردن چت\",\"web_app\":{\"url\":\"${NGROK_URL}\"}}}"
```

**نکته مهم**: اگر ngrok رو نبستید و همون ترمینال باز هست، نیازی به تنظیم مجدد Telegram نیست!

## 📋 Checklist قبل از شروع

- [ ] Ollama نصب و اجرا شده (`ollama serve`)
- [ ] ngrok نصب شده
- [ ] `.env.local` موجود است
- [ ] Dependencies نصب شده (`npm install`)

## 🔧 مراحل دقیق

### 1. اجرای Ollama (اگر خاموش است)

```bash
ollama serve
```

یا در ترمینال جدید:
```bash
ollama list  # بررسی مدلهای نصب شده
```

### 2. اجرای Next.js

```bash
cd /Users/mahanzandi/Desktop/Projects/Personal/AI-ChatBot
npm run dev
```

باید ببینید:
```
✓ Starting...
✓ Ready in 2.3s
○ Local:   http://localhost:3000
```

### 3. اجرای ngrok

ترمینال جدید:
```bash
ngrok http 3000
```

خروجی:
```
Forwarding  https://[random-name].ngrok-free.dev -> http://localhost:3000
```

**مهم**: آدرس `https://...ngrok-free.dev` رو کپی کنید.

### 4. تنظیم Telegram (فقط اگر ngrok URL عوض شد)

#### روش 1: با curl (سریعتر)

```bash
# جایگزین کنید: YOUR-NGROK-URL
NGROK_URL="https://your-url.ngrok-free.dev"

# تنظیم webhook
curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setWebhook?url=${NGROK_URL}/api/telegram/webhook"

# تنظیم menu button
curl -X POST "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "{\"menu_button\":{\"type\":\"web_app\",\"text\":\"🚀 باز کردن چت\",\"web_app\":{\"url\":\"${NGROK_URL}\"}}}"
```

#### روش 2: با اسکریپت

```bash
./scripts/set-menu-button.sh
```

### 5. تست

1. **تست ngrok**:
```bash
curl https://YOUR-NGROK-URL.ngrok-free.dev/api/telegram/test
```

باید ببینید: `{"botToken":"Set ✅",...}`

2. **تست در تلگرام**:
   - تلگرام رو ببندید و دوباره باز کنید (پاک کردن cache)
   - به [@ZTech_ChatBot](https://t.me/ZTech_ChatBot) برید
   - آیکون منو (☰) کنار input رو بزنید
   - "🚀 باز کردن چت" رو بزنید

## 🔍 بررسی وضعیت

### چک کردن Next.js
```bash
curl http://localhost:3000
# باید HTML برگردونه
```

### چک کردن ngrok
```bash
curl http://127.0.0.1:4040/api/tunnels
# باید لیست tunnels رو نشون بده
```

### چک کردن Webhook
```bash
curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/getWebhookInfo"
```

باید ببینید:
```json
{
  "ok": true,
  "result": {
    "url": "https://...ngrok-free.dev/api/telegram/webhook",
    "pending_update_count": 0
  }
}
```

### چک کردن Menu Button
```bash
curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/getChatMenuButton"
```

## 🐛 مشکلات رایج

### 1. ngrok offline است
**علامت**: `ERR_NGROK_3200`

**راهحل**:
```bash
# ngrok رو ببندید (Ctrl+C) و دوباره اجرا کنید
ngrok http 3000
```

### 2. Next.js اجرا نیست
**علامت**: `Connection refused` در ngrok

**راهحل**:
```bash
# بررسی پورت 3000
lsof -i :3000

# اگر خالی بود:
npm run dev
```

### 3. Ollama کار نمیکنه
**علامت**: خطا در chat responses

**راهحل**:
```bash
# بررسی Ollama
ollama list

# اجرا
ollama serve
```

### 4. Menu button نمیاد
**راهحل**:
- تلگرام رو force quit کنید
- دوباره باز کنید
- به ربات برید

### 5. Webhook 404 میده
**راهحل**:
```bash
# Next.js رو ریاستارت کنید
# Ctrl+C و دوباره:
npm run dev
```

## 💡 نکات مهم

1. **ngrok URL هر بار عوض میشه** (در نسخه رایگان)
   - باید webhook و menu button رو دوباره تنظیم کنید

2. **Cache تلگرام**
   - اگه تغییری ندیدید، تلگرام رو ببندید و باز کنید

3. **Console Logs**
   - لاگهای Next.js رو چک کنید برای debug
   - لاگهای ngrok در `http://127.0.0.1:4040`

4. **Port Conflicts**
   - اگه پورت 3000 اشغاله، در `package.json` تغییر بدید:
   ```json
   "dev": "next dev -p 3001"
   ```

## 📁 فایلهای مهم

```
.env.local                    # Bot token
src/app/api/telegram/         # API endpoints
src/core/telegram/            # Telegram utilities
src/core/docs/                # مستندات
```

## 🔄 Workflow روزانه

```bash
# صبح:
1. ollama serve
2. npm run dev
3. ngrok http 3000
4. تنظیم webhook (اگر URL عوض شد)
5. تست در تلگرام

# شب:
1. Ctrl+C در ngrok
2. Ctrl+C در Next.js
3. Ctrl+C در Ollama (اختیاری)
```

## 📞 دسترسی سریع

- **Bot**: [@ZTech_ChatBot](https://t.me/ZTech_ChatBot)
- **ngrok Dashboard**: http://127.0.0.1:4040
- **Next.js**: http://localhost:3000
- **Test Endpoint**: http://localhost:3000/api/telegram/test

## 🆘 اگه همه چیز خراب شد

```bash
# Reset کامل
curl "https://api.telegram.org/bot8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE/deleteWebhook"

# دوباره از اول:
npm run dev
ngrok http 3000
# تنظیم webhook و menu button
```
