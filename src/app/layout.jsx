// import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono,Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-outfit",     
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "DocBot - AI Powered Docs",
//   description: "Your AI-powered document assistant",
// };

export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={outfit.className}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* Optional: other meta tags or title */}
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div id="modal-root"></div>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
