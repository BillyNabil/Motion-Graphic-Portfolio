import type { Metadata } from "next";
import { Syne, Manrope, Oswald } from "next/font/google"; // Added Oswald
import LenisProvider from "@/components/providers/LenisProvider";
import { AppProviders } from "@/components/providers/AppProviders";
import GrainOverlay from "@/components/ui/GrainOverlay";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billynabil - Motion Graphics Designer",
  description: "Professional motion graphics designer specializing in logo animations, explainer videos, and visual storytelling. Transform your ideas into captivating motion design.",
  keywords: ["motion graphics", "animation", "video editing", "visual effects", "logo animation", "explainer videos"],
  authors: [{ name: "Billynabil" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#000000',
  openGraph: {
    title: "Billynabil - Motion Graphics Designer",
    description: "Professional motion graphics designer specializing in logo animations, explainer videos, and visual storytelling.",
    url: "https://billynabil.com",
    siteName: "Billynabil Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Billynabil Motion Graphics Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billynabil - Motion Graphics Designer",
    description: "Professional motion graphics designer specializing in logo animations, explainer videos, and visual storytelling.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body
        className={`${syne.variable} ${manrope.variable} ${oswald.variable} antialiased bg-black text-white font-sans`}
        suppressHydrationWarning={true}
      >
        <AppProviders>
          <LenisProvider>
            <GrainOverlay />
            {children}
          </LenisProvider>
        </AppProviders>
      </body>
    </html>
  );
}
