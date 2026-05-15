"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";

import { ProductViewModel } from "@/features/shop/types/productMapper";

type Props = {
    product: ProductViewModel;
    index: number;
};

export default function HomeProductCard({
                                            product,
                                            index,
                                        }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="h-full"
        >
            <Link
                href={`/products/${product.category}/${product.id}`}
                className="group block h-full"
            >
                <article
                    className="
                        h-full
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-[var(--border)]
                        bg-white
                        shadow-[var(--shadow)]
                        transition-all
                        duration-300
                        active:scale-[0.98]
                    "
                >
                    {/* image */}
                    <div
                        className="
                            relative
                            aspect-[4/5]
                            overflow-hidden
                            bg-[var(--surface)]
                        "
                    >
                        <Image
                            src={product.imgUrl}
                            alt={product.name}
                            fill
                            className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />

                        {/* badges */}
                        <div className="absolute right-3 top-3 flex flex-col gap-2">
                            {product.isNew && (
                                <div
                                    className="
                                        rounded-full
                                        bg-white/90
                                        px-3
                                        py-1
                                        text-[10px]
                                        text-[var(--text)]
                                        backdrop-blur
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
                                        text-[10px]
                                        text-white
                                    "
                                >
                                    %{product.discountPercent}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* content */}
                    <div className="space-y-3 p-4">
                        {/* category */}
                        <div className="flex items-center justify-between">
                            <span
                                className="
                                    text-xs
                                    text-[var(--text-muted)]
                                "
                            >
                                {product.categoryLabel}
                            </span>

                            <span
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    text-xs
                                    text-[var(--text-muted)]
                                "
                            >
                                <Eye size={14} />
                                {product.views}
                            </span>
                        </div>

                        {/* title */}
                        <h3
                            className="
                                line-clamp-1
                                text-sm
                                font-bold
                                leading-7
                                text-[var(--text)]
                            "
                        >
                            {product.name}
                        </h3>

                        {/* tags */}
                        <div className="flex flex-wrap gap-2">
                            {product.tagLabels
                                .slice(0, 2)
                                .map((tag) => (
                                    <span
                                        key={tag}
                                        className="
                                            rounded-full
                                            bg-[var(--surface)]
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            text-[var(--text-muted)]
                                        "
                                    >
                                        {tag}
                                    </span>
                                ))}
                        </div>

                        {/* footer */}
                        <div className="flex items-end justify-between pt-1">
                            <div>
                                {product.hasDiscount && (
                                    <p
                                        className="
                                            text-xs
                                            text-[var(--text-muted)]
                                            line-through
                                        "
                                    >
                                        {product.originalPrice.toLocaleString()}
                                    </p>
                                )}

                                <p
                                    className="
                                        text-base
                                        font-bold
                                        text-[var(--text)]
                                    "
                                >
                                    {product.finalPrice.toLocaleString()}
                                </p>
                            </div>

                            {product.isBestSeller && (
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-full
                                        bg-amber-50
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        text-amber-700
                                    "
                                >
                                    <Sparkles size={12} />
                                    پرفروش
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}