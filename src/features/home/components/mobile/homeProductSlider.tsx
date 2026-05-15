"use client";

import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

import { ProductViewModel } from "@/features/shop/types/productMapper";

type Props = {
    title: string;
    href: string;
    products: ProductViewModel[];
};

export default function HomeSliderSection({
                                              title,
                                              href,
                                              products,
                                          }: Props) {
    const [emblaRef] = useEmblaCarousel(
        {
            direction: "rtl",
            align: "start",
            loop: true,
            dragFree: true,
        },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    return (
        <section className="py-10">
            {/* header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-6 flex items-center justify-between px-4"
            >
                <h2
                    className="
                    font-shabnam
                        text-2xl
                        font-light
                        text-[var(--text)]
                    "
                >
                    {title}
                </h2>

                <Link
                    href={href}
                    className="
                        text-sm
                        text-[var(--text-muted)]
                        transition
                        hover:text-[var(--primary)]
                        font-shabnam
                    "
                >
                    نمایش بیشتر
                </Link>
            </motion.div>

            {/* slider */}
            <div
                className="overflow-hidden"
                ref={emblaRef}
            >
                <div className="flex">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.06,
                            }}
                            viewport={{ once: true }}
                            className="
                                min-w-0
                                flex-[0_0_72%]
                                px-2
                                sm:flex-[0_0_48%]
                            "
                        >
                            <Link
                                href={`/products/${product.category}/${product.id}`}
                                className="group block"
                            >
                                {/* image */}
                                <div
                                    className="
                                        relative
                                        aspect-[4/5]
                                        overflow-hidden
                                        rounded-[28px]
                                        bg-[var(--surface)]
                                    "
                                >
                                    <img
                                        src={product.imgUrl}
                                        alt={product.name}
                                        loading="lazy"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105
                                        "
                                    />

                                    {/* overlay */}
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/10
                                            to-transparent
                                        "
                                    />

                                    {/* badges */}
                                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                                        {product.isNew && (
                                            <div
                                                className="
                                                    rounded-full
                                                    bg-white/90
                                                    px-3
                                                    py-1
                                                    text-[11px]
                                                    text-[var(--text)]
                                                    backdrop-blur
                                                    font-shabnam
                                                "
                                            >
                                                جدید
                                            </div>
                                        )}

                                        {product.hasDiscount && (
                                            <div
                                                className="
                                                    rounded-full
                                                    bg-[var(--primary)]
                                                    px-3
                                                    py-1
                                                    text-[11px]
                                                    text-white
                                                    font-tanha-fd
                                                "
                                            >
                                                %{product.discountPercent}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* content */}
                                <div className="px-1 pb-2 pt-4">
                                    <p
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-wider
                                            text-[var(--text-muted)]
                                            font-shabnam
                                        "
                                    >
                                        {product.categoryLabel}
                                    </p>

                                    <h3
                                        className="
                                            mt-1
                                            line-clamp-1
                                            text-base
                                            font-medium
                                            text-[var(--text)]
                                            transition
                                            group-hover:text-[var(--primary)]
                                            font-shabnam
                                        "
                                    >
                                        {product.name}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2">
                                        {product.hasDiscount && (
                                            <span
                                                className="
                                                    text-sm
                                                    text-[var(--text-muted)]
                                                    line-through
                                                    font-tanha-fd
                                                "
                                            >
                                                {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-[var(--text)]
                                                font-tanha-fd
                                            "
                                        >
                                            {product.finalPrice.toLocaleString()}
                                        </span>
                                        <span className="font-shabnam"> تومان </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}