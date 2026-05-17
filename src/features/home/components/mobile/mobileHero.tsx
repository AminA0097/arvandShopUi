"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type HeroItem = {
    id: number;
    title?: string;
    description?: string | null;

    backgroundImage: string;

    href?: string | null;
    duration?: number;

    /* event fields */
    badge?: string | null;
    location?: string | null;
    date?: string | null;
    coupon?: string | null;
    eventStart?: string | null;
};

export default function Hero({ items }: { items: HeroItem[] }) {
    const [index, setIndex] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const idleRestartRef = useRef<NodeJS.Timeout | null>(null);

    const item = items[index];
    const duration = item.duration ?? 6000;

    const clearTimers = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (idleRestartRef.current) clearTimeout(idleRestartRef.current);
    };

    const startAutoplay = (delay = duration) => {
        clearTimers();

        timerRef.current = setTimeout(() => {
            setIndex((p) => (p + 1) % items.length);
        }, delay);
    };

    const pauseThenRestart = () => {
        clearTimers();

        idleRestartRef.current = setTimeout(() => {
            startAutoplay(duration);
        }, 3000);
    };

    useEffect(() => {
        startAutoplay();
        return clearTimers;
    }, [index]);

    const next = () => setIndex((p) => (p + 1) % items.length);
    const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);

    return (
        <section
            dir="rtl"
            className="relative w-full h-[420px] md:hidden overflow-hidden rounded-[var(--radius)]"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={item.id}
                    drag="x"
                    dragElastic={0.12}
                    dragConstraints={{ left: 0, right: 0 }}
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -120, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                    }}
                    onDragStart={() => clearTimers()}
                    onDragEnd={(e, info) => {
                        const offsetX = info.offset.x;

                        if (offsetX > 70) prev();
                        else if (offsetX < -70) next();

                        pauseThenRestart();
                    }}
                    className="absolute inset-0"
                >
                    {/* image */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                    >
                        <Image
                            src={item.backgroundImage}
                            alt={item.title ?? "banner"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    <div className="absolute inset-0 hero-overlay" />

                    {/* EVENT CONTENT */}
                    {(item.title ||
                        item.badge ||
                        item.location ||
                        item.coupon ||
                        item.eventStart) && (
                        <motion.div
                            className="absolute bottom-10 right-6 left-6 text-white space-y-3"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {item.badge && (
                                <div className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full w-fit">
                                    {item.badge}
                                </div>
                            )}

                            {item.title && (
                                <h2 className="text-2xl font-bold leading-snug">
                                    {item.title}
                                </h2>
                            )}

                            {item.description && (
                                <p className="text-white/90 text-sm">{item.description}</p>
                            )}

                            {(item.location || item.date) && (
                                <div className="text-sm text-white/80 flex gap-3">
                                    {item.location && <span>📍 {item.location}</span>}
                                    {item.date && <span>🗓 {item.date}</span>}
                                </div>
                            )}

                            {item.coupon && (
                                <div className="text-sm bg-black/40 px-3 py-1 rounded-lg w-fit">
                                    کد تخفیف: <strong>{item.coupon}</strong>
                                </div>
                            )}

                            {item.href && (
                                <Link href={item.href} className="hero-link">
                                    مشاهده جزئیات
                                </Link>
                            )}

                            {item.eventStart && (
                                <EventCounter date={item.eventStart} />
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}

function EventCounter({ date }: { date: string }) {
    const calculate = () => {
        const diff = new Date(date).getTime() - new Date().getTime();

        if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };

        return {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),
            m: Math.floor((diff / (1000 * 60)) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculate());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-2 text-center mt-3 direction-ltr justify-center">
            {/* روز, ساعت, دقیقه, ثانیه */}
            <Box v={time.s} l="ثانیه" />
            <Box v={time.m} l="دقیقه" />
            <Box v={time.h} l="ساعت" />
            <Box v={time.d} l="روز" />
        </div>
    );
}


function Box({ v, l }: { v: number; l: string }) {
    return (
        <div className="w-14 h-14 bg-black/40 rounded-xl flex flex-col items-center justify-center">
      <span className="font-bold text-sm">
        {v.toString().padStart(2, "0")}
      </span>
            <span className="text-[10px] opacity-70">{l}</span>
        </div>
    );
}