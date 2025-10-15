import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased bg-black text-white`}
        suppressHydrationWarning={true}
      >
        <AppProviders>
          <LenisProvider>
            {children}
          </LenisProvider>
        </AppProviders>
      </body>
    </html>
  );
}
