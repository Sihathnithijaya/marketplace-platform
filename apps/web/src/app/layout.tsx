import type { Metadata } from "next";
// @ts-ignore: global CSS import type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "A multi-vendor marketplace platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
