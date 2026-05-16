"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type HeroItem = {
    id: number;
    title: string;
    description: string;
    backgroundImage: string;
    floatingImage: string;
    badge: string;
    coupon: string;
    location: string;
    date: string;
    href: string;
    button: string;
};

export default function HeroSlider({ items }: { items: HeroItem[] }) {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [items.length]);

    const item = items[index];

    return (
        <section className="relative w-full h-[520px] overflow-hidden">

            {/* background */}
            <Image
                src={item.backgroundImage}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">

                {/* text */}
                <div className="text-white max-w-lg space-y-4">
          <span className="bg-white/20 px-3 py-1 rounded">
            {item.badge}
          </span>

                    <h1 className="text-4xl font-bold">
                        {item.title}
                    </h1>

                    <p className="text-gray-200">
                        {item.description}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-200">
                        <span>📍 {item.location}</span>
                        <span>⏳ {item.date}</span>
                        <span>🎟 {item.coupon}</span>
                    </div>

                    <Link
                        href={item.href}
                        className="inline-block mt-4 bg-white text-black px-6 py-3 rounded-lg font-semibold"
                    >
                        {item.button}
                    </Link>
                </div>

                {/* floating image */}
                <div className="hidden md:block ml-auto">
                    <Image
                        src={item.floatingImage}
                        alt={item.title}
                        width={420}
                        height={420}
                        className="rounded-xl shadow-xl"
                    />
                </div>
            </div>

            {/* arrows */}
            <button
                onClick={prev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-4 py-2 rounded"
            >
                ←
            </button>

            <button
                onClick={next}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-4 py-2 rounded"
            >
                →
            </button>
        </section>
    );
}
