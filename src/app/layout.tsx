// ============================================================
// Layout rrënjësor - fontet, SEO globale, Header & Footer
// ============================================================
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Font futuristik për tituj + font i pastër për tekst
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PC-STYLE | Dyqani #1 i Teknologjisë",
    template: "%s | PC-STYLE",
  },
  description:
    "PC-STYLE - Dyqan online për kompjuterë desktop, laptopë, kartela grafike, procesorë, RAM, SSD, monitorë dhe aksesorë teknologjikë. Çmime të shkëlqyera, dërgesë e shpejtë.",
  keywords: ["PC", "kompjuter", "laptop", "GPU", "CPU", "gaming", "teknologji", "Kosovë", "PC-STYLE"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "sq_AL",
    url: SITE_URL,
    siteName: "PC-STYLE",
    title: "PC-STYLE | Dyqani #1 i Teknologjisë",
    description: "Pajisje dhe pjesë teknologjike premium - desktop, laptopë, GPU, CPU, monitorë dhe më shumë.",
    images: [{ url: "/logo-dark.svg", width: 340, height: 80, alt: "PC-STYLE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PC-STYLE | Dyqani #1 i Teknologjisë",
    description: "Pajisje dhe pjesë teknologjike premium me çmime të shkëlqyera.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
