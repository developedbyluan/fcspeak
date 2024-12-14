import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcard for Speaking Comfortably",
  description:
    "Flashcard app for speaking English comfortably and vocabulary memorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <meta name="apple-mobile-web-app-title" content="SpeakFc" />
      </head> */}
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
