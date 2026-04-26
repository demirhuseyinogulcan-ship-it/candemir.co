import "./globals.css";

/**
 * Root Layout — Minimal wrapper.
 * Locale-specific metadata ve layout [locale]/layout.tsx'de yönetilir.
 * Bu dosya sadece html + body shell'i sağlar.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
