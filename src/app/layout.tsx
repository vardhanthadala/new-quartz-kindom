import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quartz | Premium Quartz Solutions",
  description:
    "World-class quartz mining, processing and export. 25+ years of excellence delivering 99.9% purity quartz to 40+ countries.",
  keywords: [
    "Quartz",
    "Quartz Mining",
    "Quartz Export",
    "Premium Quartz",
    "Industrial Minerals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
