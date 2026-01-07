import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { MonitoringProvider } from "@/components/providers/MonitoringProvider";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PowerNetPro",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1B5E20",
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
      <body suppressHydrationWarning>
        <MonitoringProvider>{children}</MonitoringProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then((registration) => {
                      console.log('SW registered successfully');
                    })
                    .catch((error) => {
                      // Silently fail - service worker is optional
                      console.debug('SW registration skipped:', error.message);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

