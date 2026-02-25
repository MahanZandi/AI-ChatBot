#!/bin/bash

BOT_TOKEN="8750178849:AAEo7pqqd58DosteF4DdYWfPLe-blBto5kE"

# Get current ngrok URL
echo "Enter your ngrok URL (e.g., https://abc123.ngrok-free.app):"
read NGROK_URL

# Set menu button
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "{
    \"menu_button\": {
      \"type\": \"web_app\",
      \"text\": \"🚀 باز کردن چت\",
      \"web_app\": {\"url\": \"${NGROK_URL}\"}
    }
  }"

echo ""
echo "✅ Menu button set! Open your bot and click the menu button (☰) next to the message input."
