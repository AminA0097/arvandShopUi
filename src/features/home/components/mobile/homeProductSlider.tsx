"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Eye, Sparkles } from "lucide-react";

import ProductCard, { SharedProduct } from "./productCard";

type Props = {
    title: string;
    href?: string | null;
    products?: SharedProduct[] | null;
    icon?: "new" | "view";
};

export default function HomeSliderSection({
                                              title,
                                              href = "/products",
                                              products = [],
                                              icon = "new",
                                          }: Props) {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        direction: "rtl",
        align: "start",
        dragFree: true,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const draggingRef = useRef(false);

    const Icon = icon === "view" ? Eye : Sparkles;

    // Filter out invalid products
    const validProducts = products?.filter(p => p && (p.id || p.href)) || [];

    useEffect(() => {
        if (!emblaApi || validProducts.length === 0) return;

        const clear = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };

        const autoplay = (delay = 2800) => {
            clear();
            if (draggingRef.current) return;

            timerRef.current = setTimeout(() => {
                if (!emblaApi.canScrollNext()) {
                    emblaApi.scrollTo(0);
                } else {
                    emblaApi.scrollNext();
                }
            }, delay);
        };

        const onDown = () => {
            draggingRef.current = true;
            clear();
        };

        const onUp = () => {
            draggingRef.current = false;
            autoplay(4000);
        };

        autoplay();

        emblaApi.on("pointerDown", onDown);
        emblaApi.on("pointerUp", onUp);

        return () => {
            clear();
            emblaApi.off("pointerDown", onDown);
            emblaApi.off("pointerUp", onUp);
        };
    }, [emblaApi, validProducts.length]);

    // Don't render if no products
    if (validProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-8">

            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between px-4">

                <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--surface-2)]">
                        <Icon size={16} className="text-[var(--primary)]" />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-[var(--text)]">
                            {title}
                        </h2>

                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                            منتخب محصولات ویژه
                        </p>
                    </div>

                </div>

            </div>

            {/* SLIDER */}
            <div ref={emblaRef} className="overflow-hidden px-4">

                <div className="flex">

                    {validProducts.map((product, i) => (
                        <div key={product.id || `product-${i}`} className="flex-[0_0_48%] pl-3">
                            <ProductCard product={product} index={i} />
                        </div>
                    ))}

                    {/* MORE CARD - Only show if href exists */}
                    {href && (
                        <div className="flex-[0_0_48%] pl-3">
                            <Link
                                href={href}
                                className="
                                    group
                                    flex
                                    h-full
                                    min-h-[100%]
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-[24px]
                                    bg-[var(--surface)]
                                    px-4
                                    text-center
                                "
                            >
                                <div className="
                                    mb-4
                                    flex h-14 w-14
                                    items-center justify-center
                                    rounded-2xl
                                    bg-[var(--primary)]
                                    text-white
                                    group-hover:scale-105
                                    transition
                                ">
                                    <Icon size={22} />
                                </div>

                                <span className="text-sm font-bold text-[var(--text)]">
                                    مشاهده همه
                                </span>

                                <span className="mt-1 text-xs text-[var(--text-muted)]">
                                    ورود به کالکشن کامل
                                </span>
                            </Link>
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}