"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type HeroItem = {
    id: number;
    title: string;
    description?: string | null;
    backgroundImage: string;
    floatingImage?: string | null;
    badge?: string | null;
    href?: string | null;
    duration?: number;
};

export default function HeroSlider({ items }: { items: HeroItem[] }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const item = items[index];
    const duration = item.duration ?? 5000;

    const clear = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const start = () => {
        clear();
        timerRef.current = setTimeout(() => {
            setIndex((p) => (p + 1) % items.length);
        }, duration);
    };

    useEffect(() => {
        start();
        return clear;
    }, [index]);

    const next = () => setIndex((p) => (p + 1) % items.length);
    const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);

    return (
        <section
            dir="rtl"
            className="relative w-full h-[520px] overflow-hidden hidden md:block rounded-[var(--radius)]"
        >

            {/* progress */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-white/20 z-30">
                <motion.div
                    key={index}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    className="h-full origin-right"
                    style={{ background: "var(--primary)" }}
                />
            </div>

            <Image
                src={item.backgroundImage}
                alt={item.title}
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 hero-overlay" />

            <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">

                <div className="text-white max-w-lg space-y-4">

                    {item.badge && (
                        <span className="hero-badge">
          {item.badge}
        </span>
                    )}

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {item.title}
                    </h2>

                    {item.description && (
                        <p className="text-white/85 text-lg">
                            {item.description}
                        </p>
                    )}

                    {item.href && (
                        <Link href={item.href} className="hero-link">
                            مشاهده بیشتر
                            <span className="text-xl">←</span>
                        </Link>
                    )}

                </div>

            </div>

        </section>

    );
}
