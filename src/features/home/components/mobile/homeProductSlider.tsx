"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
    Eye,
    Sparkles,
    ArrowLeft,
    ChevronLeft,
} from "lucide-react";

import { ProductViewModel } from "@/features/shop/types/productMapper";

type Props = {
    title: string;
    href: string;
    products: ProductViewModel[];
    icon?: "new" | "view";
};

export default function HomeSliderSection({
                                              title,
                                              href,
                                              products,
                                              icon = "new",
                                          }: Props) {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        direction: "rtl",
        align: "start",
        loop: false,
        dragFree: true,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const draggingRef = useRef(false);

    const Icon = icon === "view" ? Eye : Sparkles;

    useEffect(() => {
        if (!emblaApi) return;

        const clearTimer = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };

        const autoplay = (delay = 2800) => {
            clearTimer();
            if (draggingRef.current) return;

            timerRef.current = setTimeout(() => {
                if (!emblaApi.canScrollNext()) {
                    emblaApi.scrollTo(0);
                } else {
                    emblaApi.scrollNext();
                }
            }, delay);
        };

        const onPointerDown = () => {
            draggingRef.current = true;
            clearTimer();
        };

        const onPointerUp = () => {
            draggingRef.current = false;
            autoplay(4500);
        };

        const onMouseEnter = () => clearTimer();
        const onMouseLeave = () => autoplay(3000);

        const onSelect = () => autoplay();

        autoplay();

        emblaApi.on("select", onSelect);
        emblaApi.on("pointerDown", onPointerDown);
        emblaApi.on("pointerUp", onPointerUp);

        const node = emblaApi.rootNode();
        node.addEventListener("mouseenter", onMouseEnter);
        node.addEventListener("mouseleave", onMouseLeave);

        return () => {
            clearTimer();
            emblaApi.off("select", onSelect);
            emblaApi.off("pointerDown", onPointerDown);
            emblaApi.off("pointerUp", onPointerUp);
            node.removeEventListener("mouseenter", onMouseEnter);
            node.removeEventListener("mouseleave", onMouseLeave);
        };

    }, [emblaApi]);

    return (
        <section className="py-10">

            {/* HEADER (premium upgrade) */}
            <div className="mb-5 flex items-end justify-between px-4">

                <div className="flex items-center gap-3">

                    <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-[var(--primary)]/10 blur-md" />
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                            <Icon size={16} className="text-[var(--primary)]" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-[var(--text)]">
                            {title}
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            جدیدترین انتخاب‌های پیشنهادی
                        </p>
                    </div>

                </div>

                <Link
                    href={href}
                    className="flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:opacity-80 transition"
                >
                    مشاهده همه
                    <ChevronLeft size={14} />
                </Link>

            </div>

            {/* SLIDER */}
            <div ref={emblaRef} className="overflow-hidden px-2">
                <div className="flex">

                    {products.map((product) => (
                        <div key={product.id} className="flex-[0_0_64%] pl-3">

                            <Link
                                href={`/products/${product.category}/${product.id}`}
                                className="group block"
                            >

                                <article className="
                                    relative
                                    overflow-hidden
                                    rounded-[28px]
                                    border
                                    border-[var(--border)]
                                    bg-[var(--bg)]
                                    shadow-[var(--shadow)]
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                ">

                                    {/* IMAGE */}
                                    <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">

                                        <img
                                            src={product.imgUrl}
                                            alt={product.name}
                                            className="
                                                h-full w-full object-cover
                                                transition-transform duration-700
                                                group-hover:scale-110
                                            "
                                        />

                                        {/* gradient depth */}
                                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />

                                        {/* badge */}
                                        {product.hasDiscount && (
                                            <div className="
                                                absolute top-3 left-3
                                                rounded-full
                                                bg-[var(--primary)]
                                                px-3 py-1
                                                text-[10px]
                                                font-bold text-white
                                            ">
                                                OFF
                                            </div>
                                        )}

                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex flex-col p-4">

                                        <h3 className="
                                            text-[13px]
                                            font-medium
                                            text-[var(--text)]
                                            line-clamp-2
                                            min-h-[40px]
                                        ">
                                            {product.name}
                                        </h3>

                                        <div className="mt-3 flex items-end justify-between">

                                            <div>
                                                {product.hasDiscount && (
                                                    <div className="text-[11px] text-[var(--text-muted)] line-through">
                                                        {product.originalPrice}
                                                    </div>
                                                )}

                                                <div className="text-base font-black text-[var(--primary)]">
                                                    {product.finalPrice}
                                                </div>
                                            </div>

                                            {/* CTA micro icon */}
                                            <div className="
                                                flex h-9 w-9 items-center justify-center
                                                rounded-xl
                                                bg-[var(--surface-2)]
                                                transition-all
                                                group-hover:bg-[var(--primary)]
                                            ">
                                                <ArrowLeft
                                                    size={15}
                                                    className="
                                                        text-[var(--primary)]
                                                        group-hover:text-white
                                                        group-hover:-translate-x-1
                                                        transition
                                                    "
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </article>

                            </Link>

                        </div>
                    ))}

                    {/* MORE CARD */}
                    <div className="flex-[0_0_64%] pl-3">

                        <Link
                            href={href}
                            className="
                                group relative flex h-full items-center justify-center
                                overflow-hidden rounded-[28px]
                                border border-[var(--border)]
                                bg-[var(--surface)]
                                shadow-[var(--shadow)]
                            "
                        >

                            <div className="absolute h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />

                            <div className="relative z-10 flex flex-col items-center">

                                <div className="
                                    mb-4 flex h-14 w-14 items-center justify-center
                                    rounded-2xl bg-[var(--primary)] text-white
                                    group-hover:scale-105 transition
                                ">
                                    <ArrowLeft size={22} />
                                </div>

                                <span className="text-sm font-bold text-[var(--text)]">
                                    مشاهده همه
                                </span>

                                <span className="text-xs text-[var(--text-muted)] mt-1">
                                    ورود به کل مجموعه
                                </span>

                            </div>

                        </Link>

                    </div>

                </div>
            </div>

        </section>
    );
}