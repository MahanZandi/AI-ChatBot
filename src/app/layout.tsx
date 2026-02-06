import "./globals.css";
import "../features/chat/assets/IranYekanFont/fontiran.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVP Chatbot",
  description: "An MVP chatbot with a local Ollama Api",
  icons: {
    icon: "/favicon.jpg"
  },
  authors: [{
    name: "mahan zandi",
    url: "https://www.mahanzandi.ir/"
  }]
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
