# MVP Chatbot

An MVP chatbot built with Next.js App Router, Tailwind CSS, and Zustand. It talks to a **local OpenAI-compatible** server using Ollama.

## Prerequisites

### Install Ollama

This chatbot requires Ollama to run. Follow these steps:

1. **Download Ollama:**
   - Visit [https://ollama.com/](https://ollama.com/)
   - Download the installer for your operating system (Windows, macOS, or Linux)
   - Run the installer

2. **Install a Model:**
   
   After installing Ollama, pull a model:
   
   ```bash
   # Example: Install llama3.2 model
   ollama pull llama3.2
   
   # Other popular models:
   ollama pull qwen2.5
   ollama pull mistral
   ollama pull gemma2
   ```

3. **Verify Installation:**
   
   ```bash
   # List installed models
   ollama list
   ```

   Browse available models at [https://ollama.com/library](https://ollama.com/library)

## Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your settings:
   
   ```env
   OPENAI_BASE_URL=http://localhost:11434/v1
   OPENAI_MODEL=llama3.2
   ```

3. **Run the application:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

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

- Ollama runs automatically in the background after installation
- The model specified in `.env.local` must be installed via `ollama pull` first
- The API route in `src/app/api/chat/route.ts` proxies requests to your local Ollama server
