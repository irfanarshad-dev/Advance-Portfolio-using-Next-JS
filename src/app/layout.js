import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeToggle from "@/components/ClientThemeToggle";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/NavbarClient";

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
    default: "My Self Irfan",
    template: "%s - My Self Irfan",
  },
  description: "Welcome to my portfolio website",
  icons: {
    icon: "/Images/favicons/favicon-32x32.png",
    shortcut: "/Images/favicons/favicon-32x32.png",
    apple: "/Images/favicons/favicon-32x32.png",
  },
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
          <div className="fixed top-4 right-4 z-50">
            <ClientThemeToggle />
          </div>
          {/* Global sticky Navbar — desktop: right side centered, mobile: bottom bar */}
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
