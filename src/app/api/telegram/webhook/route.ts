import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook received:', JSON.stringify(body, null, 2));
    
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      console.log('Message from', chatId, ':', text);

      if (text === '/start') {
        console.log('Sending mini app button...');
        await sendMiniAppButton(chatId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

async function sendMiniAppButton(chatId: number) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const webAppUrl = 'https://uncapriciously-sportive-marylynn.ngrok-free.dev';

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: '🤖 به ربات چت خوش آمدید!\n\nبرای شروع چت، دکمه زیر را بزنید:',
      reply_markup: {
        inline_keyboard: [[
          {
            text: '🚀 باز کردن چت',
            web_app: { url: webAppUrl }
          }
        ]]
      }
    })
  });
  
  const result = await response.json();
  console.log('Send message result:', result);
}
