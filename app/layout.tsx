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
  title: "Miguel Miranda | Portfolio",
  description:
    "Personal portfolio showcasing Miguel Miranda's web development projects. Built with Next.js to display all projects and work experience.",
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
