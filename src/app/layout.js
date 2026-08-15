import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggleWrapper from "@/components/ThemeToggleWrapper";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/NavbarClient";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Irfan Arshad | Full Stack Developer",
    template: "%s | Irfan Arshad",
  },
  description: "Irfan Arshad — Full Stack Developer specializing in Next.js, NestJS, React, Node.js, and MongoDB. Building scalable, high-performance web applications.",
  keywords: ["Irfan Arshad", "Full Stack Developer", "Next.js Developer", "NestJS", "React", "Node.js", "Portfolio", "Web Developer Lahore", "Pakistan"],
  authors: [{ name: "Irfan Arshad" }],
  creator: "Irfan Arshad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://irfanarshad.dev",
    siteName: "Irfan Arshad Portfolio",
    title: "Irfan Arshad | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, NestJS, React, Node.js, and MongoDB.",
    images: [{ url: "/Images/Irfan-Pic.png", width: 1200, height: 630, alt: "Irfan Arshad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irfan Arshad | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, NestJS, React and Node.js.",
    images: ["/Images/Irfan-Pic.png"],
  },
  icons: {
    icon: "/Images/favicons/favicon-32x32.png",
    shortcut: "/Images/favicons/favicon-32x32.png",
    apple: "/Images/favicons/favicon-32x32.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll custom-scrollbar`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <ThemeToggleWrapper />
          {/* Global sticky Navbar — desktop: right side centered, mobile: bottom bar */}
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}