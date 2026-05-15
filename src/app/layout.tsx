// app/layout.tsx (keep your existing but add)
import type { Metadata } from "next";
import "./global.css";
import { shabnam, tanha, tanhaFD, mosalas } from '@/shared/utils/fonts';
import DesktopHeader from "@/shared/components/layout/desktop-header";
import MobileFooterNav from "@/shared/components/layout/mobile-footer-nav";

export const metadata: Metadata = {
    title: "ZENN",
    description: "Luxury modern commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
        <body className={`${shabnam.variable} ${tanha.variable} ${tanhaFD.variable} ${mosalas.variable} bg-[#f7f5f3]`}>
        <DesktopHeader />
        <main className="min-h-screen pb-28 lg:pb-0">
            {children}
        </main>
        <MobileFooterNav />
        </body>
        </html>
    );
}