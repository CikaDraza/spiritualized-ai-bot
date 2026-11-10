import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

const overpass = localFont({
  src: "./fonts/Overpass.ttf",
  weight: "400 900",
  variable: "--font-overpass",
});

const inter = localFont({
  src: "./fonts/Inter.ttf",
  weight: "400 700",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Spiritualized Language Tutor",
  description: "Learn English with an AI tutor that talks, corrects and guides you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${overpass.variable} ${inter.variable} antialiased`}
    >
      {/* Mobile-first: a white "app" column centred on a neutral page (desktop refined later). */}
      <body className="min-h-dvh bg-[#E9EBF2]">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-white">
          <QueryProvider>{children}</QueryProvider>
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
