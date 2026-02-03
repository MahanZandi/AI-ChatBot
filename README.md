# MVP Chatbot

An MVP chatbot built with Next.js App Router, Tailwind CSS, and Zustand. It talks to a **local OpenAI-compatible** server (LM Studio, Ollama w/ OpenAI compat, etc.).

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure your local OpenAI-compatible server:

```bash
cp .env.example .env.local
```

3. Run the app:

```bash
npm run dev
```

## Feature-Based Structure

```
src/
  app/
    api/chat/route.ts
    layout.tsx
    page.tsx
  features/
    chat/
      components/
      store/
      types/
```

## Notes

- For Ollama: set `OPENAI_BASE_URL=http://localhost:11434/v1` in `.env.local`.
- Choose a model that exists in Ollama (for example: `llama3.2`, `qwen2.5`, etc.).
- The API route in `src/app/api/chat/route.ts` proxies requests to your local server.
