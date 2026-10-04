import { SiteChrome } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { site } from "@/data/site";
import { AppProvider } from "@/lib/cart-context";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import brandTokens from "../../tailwind.config";
import "./globals.css";
import "./nextlevel.css";
import "./final.css";

const jakarta = localFont({
  src: "./fonts/PJS.ttf",
  weight: "500 800",
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: site.title,
  description: site.description,
  icons: { icon: "/assets/brand/fork.png" },
  openGraph: {
    title: site.title,
    description: site.description,
    images: ["/assets/hero/hero-sushi.webp"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brandTokens.theme.extend.colors.orange,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${jakarta.variable} font-jakarta`}>
        <AppProvider>
          <SiteChrome />
          <PageTransition />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
