import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GeometricBackground from "@/components/GeometricBackground";
import ThemeToggle from "@/components/ThemeToggle";
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
  metadataBase: new URL("https://your-portfolio.pages.dev"), // Update with your actual domain
  title: "Al Shahriah | Portfolio",
  description: "Portfolio of Al Shahriah, a Full Stack Developer specializing in high-performance distributed systems, modern frontend architecture, and cloud-native solutions.",
  keywords: ["Al Shahriah", "Full Stack Developer", "Distributed Systems", "React", "Next.js", "Microservices", "Cloud Native"],
  authors: [{ name: "Al Shahriah" }],
  openGraph: {
    title: "Al Shahriah | Portfolio",
    description: "Architecting the future with distributed systems and premium web experiences.",
    url: "https://your-domain.com",
    siteName: "Al Shahriah Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Shahriah | Portfolio",
    description: "Architecting the future with distributed systems and premium web experiences.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <GeometricBackground />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
