import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PowerNetPro Digital Solar | Solar Savings Without Solar Panels",
  description:
    "Reserve clean energy from large solar plants and reduce your electricity bill every month. No installation required.",
  keywords: ["solar energy", "renewable energy", "electricity savings", "digital solar"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} ${dmSerif.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

