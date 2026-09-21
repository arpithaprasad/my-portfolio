import type { Metadata } from "next";
import CursorBloom from "./components/CursorBloom";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arpitha Prasad — Product Designer",
  description:
    "Product designer designing digital products that help people navigate complexity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Geist+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans">
        <CursorBloom />
        {children}
      </body>
    </html>
  );
}
