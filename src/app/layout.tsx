import "./globals.css";
import "../features/chat/assets/IranYekanFont/fontiran.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVP Chatbot",
  description: "An MVP chatbot with a local OpenAI-compatible backend"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
