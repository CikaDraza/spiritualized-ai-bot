import type { Metadata } from "next";
import { Overpass, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-overpass",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flexio Lingua — AI Language Tutor",
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
          {children}
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
