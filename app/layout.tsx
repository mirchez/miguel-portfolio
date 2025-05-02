import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderIcons from "@/components/ui/headerIcons"; // or the correct path if placed in /components/ui
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  metadataBase: new URL("https://miguelmiranda.dev"), // Replace with your actual domain
  openGraph: {
    title: "Miguel Miranda | Portfolio",
    description:
      "Personal portfolio showcasing Miguel Miranda's web development projects and experience.",
    url: "https://miguelmiranda.dev", // Replace with your actual domain
    siteName: "Miguel Miranda Portfolio",
    images: [
      {
        url: "/og-image.png", // You should create and add this image
        width: 1200,
        height: 630,
        alt: "Miguel Miranda Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Miranda | Portfolio",
    description:
      "Personal portfolio showcasing Miguel Miranda's web development projects and experience.",
    images: ["/og-image.png"], // Same image as OpenGraph
    creator: "@yourtwitter", // Replace with your Twitter handle
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
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification
  },
  alternates: {
    canonical: "https://miguelmiranda.dev", // Replace with your actual domain
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-black`}
      >
        <HeaderIcons />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
