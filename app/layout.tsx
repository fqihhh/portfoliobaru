import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARSYAD — Creative Developer",
  description: "Portfolio of Arsyad Faqih Alhisyami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}