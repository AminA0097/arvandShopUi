"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
    Eye,
    Sparkles,
    ArrowLeft,
    ChevronLeft,
    Percent,
} from "lucide-react";

import { motion } from "framer-motion";

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
            autoplay(4000);
        };

        autoplay();

        emblaApi.on("pointerDown", onPointerDown);
        emblaApi.on("pointerUp", onPointerUp);

        return () => {
            clearTimer();

            emblaApi.off("pointerDown", onPointerDown);
            emblaApi.off("pointerUp", onPointerUp);
        };

    }, [emblaApi]);

    return (
        <section className="py-8">

            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between px-4">

                <div className="flex items-center gap-2">

                    <div className="
                        flex h-9 w-9 items-center justify-center
                        rounded-2xl
                        bg-[var(--surface-2)]
                    ">
                        <Icon
                            size={16}
                            className="text-[var(--primary)]"
                        />
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

                {/*<Link*/}
                {/*    href={href}*/}
                {/*    className="*/}
                {/*        flex items-center gap-1*/}
                {/*        text-xs*/}
                {/*        font-medium*/}
                {/*        text-[var(--primary)]*/}
                {/*    "*/}
                {/*>*/}
                {/*    مشاهده همه*/}
                {/*    <ChevronLeft size={14} />*/}
                {/*</Link>*/}

            </div>

            {/* SLIDER */}
            <div
                ref={emblaRef}
                className="overflow-hidden px-4"
            >

                <div className="flex">

                    {products.map((product, i) => (

                        <div
                            key={product.id}
                            className="flex-[0_0_48%] pl-3"
                        >

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >

                                <Link
                                    href={`/products/${product.category}/${product.id}`}
                                    className="group block"
                                >

                                    <article
                                        className="
                                            overflow-hidden
                                            rounded-[24px]
                                            bg-[var(--bg)]
                                            shadow-[var(--shadow)]
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                        "
                                    >

                                        {/* IMAGE */}
                                        <div
                                            className="
                                                relative
                                                aspect-square
                                                overflow-hidden
                                                bg-[var(--surface)]
                                            "
                                        >

                                            <img
                                                src={product.imgUrl}
                                                alt={product.name}
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    transition-transform
                                                    duration-700
                                                    group-hover:scale-105
                                                "
                                            />

                                            {/* gradient */}
                                            <div
                                                className="
                                                    absolute
                                                    inset-x-0
                                                    bottom-0
                                                    h-24
                                                    bg-gradient-to-t
                                                    from-black/20
                                                    to-transparent
                                                "
                                            />

                                            {/* discount */}
                                            {product.hasDiscount && (
                                                <div
                                                    className="
                                                        absolute
                                                        left-3
                                                        top-3
                                                        flex
                                                        items-center
                                                        gap-1
                                                        rounded-full
                                                        bg-[var(--primary)]
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-bold
                                                        text-white
                                                    "
                                                >

                                                    <Percent size={11} />

                                                    {product.discountPercent}

                                                </div>
                                            )}

                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-3">

                                            <h3
                                                className="
                                                    line-clamp-2
                                                    min-h-[42px]
                                                    text-[13px]
                                                    leading-6
                                                    text-[var(--text)]
                                                    font-medium
                                                "
                                            >
                                                {product.name}
                                            </h3>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    items-end
                                                    justify-between
                                                "
                                            >

                                                <div>

                                                    <div
                                                        className="
                                                            text-sm
                                                            font-black
                                                            text-[var(--primary)]
                                                        "
                                                    >
                                                        {product.finalPrice}
                                                    </div>

                                                    {product.hasDiscount && (
                                                        <div
                                                            className="
                                                                mt-0.5
                                                                text-[11px]
                                                                text-[var(--text-muted)]
                                                                line-through
                                                            "
                                                        >
                                                            {product.originalPrice}
                                                        </div>
                                                    )}

                                                </div>

                                                <div
                                                    className="
                                                        flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-[var(--surface-2)]
                                                        transition-all
                                                        duration-300
                                                        group-hover:bg-[var(--primary)]
                                                    "
                                                >

                                                    <ArrowLeft
                                                        size={15}
                                                        className="
                                                            text-[var(--primary)]
                                                            transition-all
                                                            duration-300
                                                            group-hover:text-white
                                                            group-hover:-translate-x-1
                                                        "
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                </Link>

                            </motion.div>

                        </div>
                    ))}

                    {/* MORE CARD */}
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

                            <div
                                className="
                                    mb-4
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--primary)]
                                    text-white
                                    transition-all
                                    group-hover:scale-105
                                "
                            >
                                <ArrowLeft size={22} />
                            </div>

                            <span
                                className="
                                    text-sm
                                    font-bold
                                    text-[var(--text)]
                                "
                            >
                                مشاهده همه
                            </span>

                            <span
                                className="
                                    mt-1
                                    text-xs
                                    text-[var(--text-muted)]
                                "
                            >
                                ورود به کالکشن کامل
                            </span>

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}