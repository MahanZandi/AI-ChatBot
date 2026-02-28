# 📚 Documentation Index

All project documentation is located here.

## 📖 Available Guides

### Quick Start
- **[QUICKSTART.md](./QUICKSTART.md)** - شروع سریع با دستورات اصلی
- **[RESTART_GUIDE.md](./RESTART_GUIDE.md)** - 🔄 راهنمای اجرای مجدد (برای دفعات بعد)

### Development
- **[LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)** - راهنمای اجرای لوکال با ngrok
- **[NETWORK_ACCESS.md](./NETWORK_ACCESS.md)** - 🌐 دسترسی شبکه محلی (WiFi/Hotspot)
- **[TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)** - راهنمای deploy و تنظیمات تلگرام

### Technical
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - 📋 خلاصه تغییرات و معماری
- **[CODING_STANDARDS.md](./CODING_STANDARDS.md)** - استانداردهای کدنویسی و ساختار پروژه

## 🎯 Quick Links

- Bot Token: در `.env.local`
- Webhook API: `/api/telegram/webhook`
- Telegram SDK: `src/core/telegram/telegramWebApp.ts`

## 📝 Adding New Documentation

همه مستندات باید در `src/core/docs/` قرار بگیرند.

```bash
# ✅ Correct
src/core/docs/NEW_GUIDE.md

# ❌ Wrong
docs/NEW_GUIDE.md
NEW_GUIDE.md
```
