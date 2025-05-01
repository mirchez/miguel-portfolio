import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderIcons from "@/components/ui/headerIcons"; // o la ruta correcta si la pones en /components/ui

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
    "Portafolio showing personal web developer named Miguel Miranda proyects. Uses next.js intenting to show every proyects he has worked on and built",
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
      </body>
    </html>
  );
}
