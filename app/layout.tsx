import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Arpitha Prasad — Product Designer",
    template: "%s — Arpitha Prasad",
  },
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Only the glyphs of ಧನ್ಯವಾದ, for the footer sign-off */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400&text=%E0%B2%A7%E0%B2%A8%E0%B3%8D%E0%B2%AF%E0%B2%B5%E0%B2%BE%E0%B2%A6&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
