"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BannerItem = {
    id: string;
    title: string;
    description?: string | null;
    backgroundImage: string;
    href?: string | null;
    btnText?: string | null;
    badge?: string | null;
};

type Props = {
    banners: BannerItem[];
    autoPlayInterval?: number;
};

export default function MobileHeroSlider({
                                             banners,
                                             autoPlayInterval = 5000
                                         }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progressRef = useRef<NodeJS.Timeout | null>(null);
    const [direction, setDirection] = useState(0);

    const totalSlides = banners.length;

    const clearTimers = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
    }, []);

    const startProgressBar = useCallback(() => {
        setProgress(0);
        const startTime = Date.now();

        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / autoPlayInterval) * 100;

            if (newProgress >= 100) {
                clearInterval(progressRef.current!);
                setProgress(100);
            } else {
                setProgress(newProgress);
            }
        }, 16);
    }, [autoPlayInterval]);

    const goToNext = useCallback(() => {
        if (isDragging) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides, isDragging]);

    const goToPrev = useCallback(() => {
        if (isDragging) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides, isDragging]);

    const goToSlide = useCallback((index: number) => {
        if (isDragging || index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex, isDragging]);

    const startAutoplay = useCallback(() => {
        clearTimers();
        startProgressBar();
        timerRef.current = setTimeout(() => {
            goToNext();
        }, autoPlayInterval);
    }, [clearTimers, startProgressBar, goToNext, autoPlayInterval]);

    const stopAutoplay = useCallback(() => {
        clearTimers();
        setProgress(0);
    }, [clearTimers]);

    const handleDragStart = () => {
        setIsDragging(true);
        stopAutoplay();
    };

    const handleDragEnd = (event: any, info: PanInfo) => {
        setIsDragging(false);
        const swipeDistance = info.offset.x;
        const swipeThreshold = 50;

        // RTL: Swipe right (positive) goes to next, swipe left (negative) goes to previous
        if (swipeDistance > swipeThreshold) {
            goToNext();
        } else if (swipeDistance < -swipeThreshold) {
            goToPrev();
        }

        startAutoplay();
    };

    useEffect(() => {
        if (totalSlides > 1) {
            startAutoplay();
            return () => stopAutoplay();
        }
    }, [currentIndex, startAutoplay, stopAutoplay, totalSlides]);

    if (totalSlides === 0) return null;

    const currentBanner = banners[currentIndex];

    return (
        <div className="relative w-full overflow-hidden rounded-2xl" dir="rtl">
            {/* Slider Container */}
            <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        drag={totalSlides > 1 ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        className="relative cursor-grab active:cursor-grabbing"
                    >
                        <BannerCard item={currentBanner} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar - RTL direction (right to left) */}
            {totalSlides > 1 && (
                <div className="absolute bottom-3 left-0 right-0 z-20 px-4">
                    <div className="flex gap-1.5">
                        {banners.map((_, idx) => {
                            // Calculate progress for RTL
                            let progressWidth = 0;
                            if (idx === currentIndex) {
                                progressWidth = progress;
                            } else if (idx < currentIndex) {
                                progressWidth = 100;
                            } else {
                                progressWidth = 0;
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm"
                                >
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-white"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: progressWidth / 100 }}
                                        style={{
                                            originX: 1, // RTL: start from right
                                            transformOrigin: "right"
                                        }}
                                        transition={idx === currentIndex ? { duration: 0.016 } : { duration: 0.3 }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Navigation Arrows - RTL adjusted */}
            {totalSlides > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 backdrop-blur-sm transition-all hover:bg-black/40 active:scale-95"
                    >
                        <ChevronRight size={18} className="text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 backdrop-blur-sm transition-all hover:bg-black/40 active:scale-95"
                    >
                        <ChevronLeft size={18} className="text-white" />
                    </button>
                </>
            )}

            {/* Slide Counter */}
            {totalSlides > 1 && (
                <div className="absolute bottom-3 left-4 z-20 rounded-full bg-black/30 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                    {currentIndex + 1} / {totalSlides}
                </div>
            )}
        </div>
    );
}

// RTL Banner Card Component
function BannerCard({ item }: { item: BannerItem }) {

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[var(--shadow)]">
            {/* Background Image */}
            <div className="relative h-[280px] w-full">
                {/*<Image*/}
                {/*    src={item.backgroundImage}*/}
                {/*    alt={item.title}*/}
                {/*    fill*/}
                {/*    priority*/}
                {/*    className="object-cover"*/}
                {/*/>*/}

                {/* Gradient Overlay - RTL direction */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

                {/* Soft Glow */}
                <div className="absolute -top-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[var(--primary)]/20 blur-3xl" />
            </div>

            {/* Content - RTL aligned */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 text-white">
                {item.badge && (
                    <div className="mb-3 flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                        <span className="text-xs font-medium">{item.badge}</span>
                    </div>
                )}

                <h2 className="max-w-xs text-2xl font-black leading-tight">
                    {item.title}
                </h2>

                {item.description && (
                    <p className="mt-2 text-sm leading-6 text-white/80 line-clamp-2">
                        {item.description}
                    </p>
                )}

                {item.href && (
                    <Link
                        href={item.href}
                        className="group mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-black"
                    >
                        {item.btnText ?? "مشاهده"}
                        <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    </Link>
                )}
            </div>
        </div>
    );
}