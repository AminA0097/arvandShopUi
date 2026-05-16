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
    href?: string | null;
    duration?: number;
};

export default function MobileHero({ items }: { items: HeroItem[] }) {

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
            className="relative w-full h-[420px] md:hidden overflow-hidden rounded-[var(--radius)]"
        >

            {/* progress */}
            <div dir="rtl" className="absolute top-3 left-3 right-3 flex gap-1 z-30">
                {items.map((_, i) => (
                    <div key={i} className="flex-1 h-[3px] bg-white/30 overflow-hidden">

                        {i === index && (
                            <motion.div
                                key={index}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: duration / 1000, ease: "linear" }}
                                className="h-full origin-right"
                                style={{ background: "var(--primary)" }}
                            />
                        )}

                        {i < index && (
                            <div
                                className="h-full"
                                style={{ background: "var(--primary)" }}
                            />
                        )}

                    </div>
                ))}
            </div>

            <Image
                src={item.backgroundImage}
                alt={item.title}
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 hero-overlay" />

            <div className="absolute bottom-10 right-6 left-6 text-white space-y-3">

                <h2 className="text-2xl font-bold leading-snug">
                    {item.title}
                </h2>

                {item.description && (
                    <p className="text-white/90 text-sm">
                        {item.description}
                    </p>
                )}

                {item.href && (
                    <Link href={item.href} className="hero-link">
                        مشاهده بیشتر
                        <span className="text-lg">←</span>
                    </Link>
                )}

            </div>

        </section>

    );
}
