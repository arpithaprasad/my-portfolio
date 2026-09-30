import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6 months",
  description: "a tiny handmade scrapbook for six months of us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Figtree:ital,wght@0,300..600;1,300..600&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
