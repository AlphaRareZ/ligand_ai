import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "./common/Footer";
import Header from "./common/Header";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-full flex flex-col bg-[#101622] text-white h-full">
            <Header></Header>
            <main className="grow">{children}</main>
            <Footer></Footer>
        </div>
    );
}
