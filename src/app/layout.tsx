// app/layout.tsx

import type { Metadata } from "next";
import "./global.css";

import {
    shabnam,
    tanha,
    tanhaFD,
    mosalas,
} from "@/shared/utils/fonts";

import DesktopHeader from "@/features/home/components/desktop/desktop-header";
import MobileFooterNav from "@/features/home/components/mobile/mobile-footer-nav";
import MobileHomeHeader from "@/features/home/components/mobile/mobileHomeHeader";

export const metadata: Metadata = {
    title: "ZENN",
    description: "Luxury modern commerce",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl">
        <body
            className={`
                    ${shabnam.variable}
                    ${tanha.variable}
                    ${tanhaFD.variable}
                    ${mosalas.variable}
                    bg-[#f7f5f3]
                `}
        >
        {/* desktop */}
        <div className="hidden lg:block">
            <DesktopHeader />
        </div>

        {/* mobile */}
        <div className="lg:hidden">
            <MobileHomeHeader />
        </div>

        <main
            className="
                        min-h-screen
                        pb-28
                        pt-16
                        lg:pb-0
                        lg:pt-0
                    "
        >
            {children}
        </main>

        <div className="lg:hidden">
            <MobileFooterNav />
        </div>
        </body>
        </html>
    );
}