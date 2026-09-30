import type { Metadata } from "next";
import "./scrapbook.css";

export const metadata: Metadata = {
  title: "6 months",
  description: "a tiny handmade scrapbook for six months of us.",
};

export default function SixMonthsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      {children}
    </>
  );
}
