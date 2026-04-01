import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/scroll/SmoothScroll";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { SITE_META } from "./lib/constants";

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: SITE_META.url,
    siteName: SITE_META.name,
    locale: SITE_META.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
