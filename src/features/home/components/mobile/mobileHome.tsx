"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { } from "../../hooke/userBanner";
// Components
import HeroWrapper from "./heroWrapper";
import MobileCategoryGrid from "./mobileCategoryGrid";
import MobileTrustStrip from "./mobileTrustStrip";
import FlashDeal from "./flashDeal";
import MobileNewsSection from "./mobileNewsSection";
import MobileHotDealsSection from "./mobileHotDealsSection";
import MobileMostViewed from "./mobileMostViewed";
import MobileInfoSection from "./mobileInfoSection";

// Mock data
import { dealProducts, newProducts, mostViewedProducts } from "./mock";
import {useBanner} from "@/features/home/hooke/useBanner";


// Loading skeleton
function HomeSkeleton() {
    return (
        <div className="space-y-6 px-4 pb-8 pt-5">
            {/* Hero skeleton */}
            <div className="h-[400px] animate-pulse rounded-2xl bg-[var(--surface-2)]" />

            {/* Trust strip skeleton */}
            <div className="flex justify-between gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 flex-1 animate-pulse rounded-xl bg-[var(--surface-2)]" />
                ))}
            </div>

            {/* Categories skeleton */}
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--surface-2)]" />
                ))}
            </div>
        </div>
    );
}

export default function MobileHome() {
    const [isLoading, setIsLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const { banners, loading } = useBanner();

    useEffect(() => {
        // Simulate initial load
        const timer = setTimeout(() => setIsLoading(false), 800);

        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] pb-24">

            {/* Background decorative elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl" />
                <div className="absolute -right-20 top-[40%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />
            </div>

            {/* Main content with narrative flow */}
            <div className="relative z-10 space-y-8 px-4 pb-8 pt-5">

                {/* CHAPTER 1: FIRST IMPRESSION - Hero & Trust */}
                <AnimatePresence mode="wait">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* اینجا بنرهایی که از هوک گرفتیم رو پاس میدیم */}
                        <HeroWrapper banners={banners} />
                        <MobileTrustStrip />
                    </motion.div>

                </AnimatePresence>

                {/* CHAPTER 2: DISCOVERY - Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                >
                    <MobileCategoryGrid />
                </motion.div>

                {/* CHAPTER 3: URGENCY - Flash Deals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.3 }}
                >
                    <FlashDeal
                        title="شگفت‌انگیز هفته"
                        description="فرصت رو از دست نده!"
                        endDate="2026-05-10T23:59:00"
                        href="/products/flash-deal"
                    />
                </motion.div>

                {/* CHAPTER 4: NEW ARRIVALS - Fresh Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <div className="h-1 w-8 rounded-full bg-[var(--primary)]" />
                            <h2 className="text-sm font-medium text-[var(--text-muted)]">
                                تازه‌های بازار
                            </h2>
                        </div>
                        <MobileNewsSection />
                    </div>
                </motion.div>

                {/* CHAPTER 5: BEST DEALS - Hot Discounts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <div className="h-1 w-8 rounded-full bg-[var(--primary)]" />
                            <h2 className="text-sm font-medium text-[var(--text-muted)]">
                                بهترین تخفیف‌ها
                            </h2>
                        </div>
                        <MobileHotDealsSection products={dealProducts} />
                    </div>
                </motion.div>

                {/* CHAPTER 6: SOCIAL PROOF - Most Viewed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <div className="h-1 w-8 rounded-full bg-[var(--primary)]" />
                            <h2 className="text-sm font-medium text-[var(--text-muted)]">
                                پرطرفدارترین‌ها
                            </h2>
                        </div>
                        <MobileMostViewed />
                    </div>
                </motion.div>

                {/* CHAPTER 7: FOOTER - About & Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                >
                    <MobileInfoSection />
                </motion.div>

                {/* Back to top button */}
                <AnimatePresence>
                    {scrolled && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-24 left-4 z-50 rounded-full bg-[var(--primary)] p-3 text-white shadow-lg"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}