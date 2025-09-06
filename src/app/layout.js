import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeToggle from "@/components/ClientThemeToggle";
import { iconButtonClasses } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//
export const metadata = {
  title: {
    default: "My Self Irfan",   // fallback title
    template: "%s - My Self Irfan", // used by pages
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Global Theme Toggle Button */}
          <div className="fixed top-4 right-4 z-50">
            <ClientThemeToggle />
          </div>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
