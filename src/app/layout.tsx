// app/layout.tsx

import type { Metadata } from "next";
import "./global.css";


import {
    shabnam,
    tanha,
    tanhaFD,
    mosalas,
} from "@/shared/utils/fonts";

import DesktopHeader from "@/shared/components/layout/desktop-header";
import MobileFooterNav from "@/shared/components/layout/mobile-footer-nav";
import MobileHomeHeader from "@/shared/components/layout/mobileHomeHeader";
import ToastProvider from "@/shared/utils/ToastProvider";

export const metadata: Metadata = {
    title: "چرم آروند",
    description: "Arvand Leather",
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
        <ToastProvider />
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