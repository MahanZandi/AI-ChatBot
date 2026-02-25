import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  const botInfo = await fetch(`https://api.telegram.org/bot${botToken}/getMe`).then(r => r.json());
  const webhookInfo = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`).then(r => r.json());
  
  return NextResponse.json({
    botToken: botToken ? 'Set ✅' : 'Missing ❌',
    botInfo,
    webhookInfo
  });
}
