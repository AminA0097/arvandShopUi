"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MobileSearchModal from "./mobileSearchModal";

export default function MobileHomeHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl" dir="rtl">
                <div className="flex h-14 items-center justify-between px-4">
                    {/* Logo with Arvand Branding - RTL */}
                    <Link href="/public" className="group flex items-center gap-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5"
                        >
                            <Sparkles size={16} className="text-[var(--primary)]" />
                            <span className="font-shabnam text-base font-black tracking-tight text-[var(--text)]">
                                آروند
                            </span>
                        </motion.div>
                    </Link>

                    {/* Search Bar - RTL */}
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsSearchOpen(true)}
                        className="flex-1 mx-4"
                    >
                        <div className="flex items-center gap-2 rounded-2xl bg-[var(--surface-2)] px-4 py-2.5 transition-all hover:bg-[var(--surface-2)]/80">
                            <Search size={16} className="text-[var(--text-muted)]" />
                            <span className="text-xs text-[var(--text-muted)] font-shabnam">
                                جستجوی محصولات آروند...
                            </span>
                        </div>
                    </motion.button>

                    {/* Empty spacer for balance */}
                    <div className="w-6" />
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-14" />

            {/* Search Modal */}
            <MobileSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}