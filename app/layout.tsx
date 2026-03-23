import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./common/Header";
import Footer from "./common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ligand AI - Revolutionizing AML Drug Discovery with AI & RNA-Seq",
  description: "Ligand AI leverages advanced generative models and precision RNA sequencing to identify novel therapeutic targets and small molecules for Acute Myeloid Leukemia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#101622] text-white h-full">
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
