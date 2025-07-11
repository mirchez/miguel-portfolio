import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Miguel Miranda | Portfolio",
    template: "%s | Miguel Miranda",
  },
  description:
    "Personal portfolio showcasing Miguel Miranda's web development projects. Built with Next.js to display all projects and work experience.",
  keywords: [
    "portfolio",
    "web developer",
    "next.js",
    "react",
    "frontend",
    "fullstack",
    "projects",
  ],
  authors: [{ name: "Miguel Miranda" }],
  creator: "Miguel Miranda",
  publisher: "Miguel Miranda",
  metadataBase: new URL("https://miguel-miranda-portfolio.vercel.app"),
  openGraph: {
    title: "Miguel Miranda | Portfolio",
    description:
      "Personal portfolio showcasing Miguel Miranda's web development projects and experience.",
    url: "https://miguel-miranda-portfolio.vercel.app",
    siteName: "Miguel Miranda Portfolio",
    images: [
      {
        url: "/portfolio.PNG",
        width: 1200,
        height: 630,
        alt: "Miguel Miranda Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://miguel-miranda-portfolio.vercel.app",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased relative">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
