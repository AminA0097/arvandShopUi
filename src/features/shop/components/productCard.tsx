// features/shop/components/productCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Award, Percent } from "lucide-react";
import { formatPrice, toPersianNumbers } from "@/shared/lib/cn";
import type { ProductViewModel } from "@/features/shop/types/productMapper";

interface ProductCardProps {
    product: ProductViewModel;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const badges: { label: string; icon: React.ReactNode; color: string }[] = [];

    if (product.isNew) {
        badges.push({
            label: "جدید",
            icon: <Sparkles size={12} />,
            color: "bg-emerald-100 text-emerald-700",
        });
    }

    if (product.isBestSeller) {
        badges.push({
            label: "پرفروش",
            icon: <Award size={12} />,
            color: "bg-amber-100 text-amber-700",
        });
    }

    if (product.hasDiscount) {
        badges.push({
            label: `${toPersianNumbers(product.discountPercent)}٪`,
            icon: <Percent size={12} />,
            color: "bg-red-100 text-red-600",
        });
    }

    const visibleTags = product.tagLabels.slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="will-change-transform h-full"
        >
            <Link href={`/products/${product.category}/${product.id}`} className="group block h-full">
                <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] h-full flex flex-col">
                    {/* IMAGE - Fixed aspect ratio */}
                    <div className="relative w-full aspect-square flex-shrink-0 overflow-hidden rounded-xl
                     bg-gradient-to-br from-stone-100 to-stone-50">
                        <img
                            src={product.imgUrl}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    {/* CONTENT - Flexible content that pushes footer down */}
                    <div className="flex-1 flex flex-col mt-4">
                        {/* top row */}
                        <div className="flex justify-between items-start gap-1">
                            <span className="text-[11px] text-stone-400
                            font-shabnam
                            ">{product.categoryLabel}</span>
                            <span className="flex items-center gap-1 text-[11px] text-stone-400 flex-shrink-0
                            font-tanha-fd">
                                <TrendingUp size={12} />
                                {toPersianNumbers(product.views)}
                            </span>
                        </div>

                        {/* name */}
                        <h3 className="font-medium text-stone-800 line-clamp-2 text-base mt-1 min-h-[3.5rem]
                        font-shabnam">
                            {product.name}
                        </h3>

                        {/* tags */}
                        {visibleTags.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                                {visibleTags.map((tag, i) => (
                                    <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full
                                    font-shabnam">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Spacer to push price and badges to bottom */}
                        <div className="flex-1" />

                        {/* price */}
                        <div className="mt-3">
                            {product.hasDiscount ? (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-red-500 line-through
                                    font-tanha-fd">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="text-lg md:text-xl font-bold text-emerald-600
                                    font-tanha-fd">
                                        {formatPrice(product.finalPrice)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg md:text-xl font-bold text-stone-800 font-tanha-fd">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        {/* badges + stock */}
                        <div className="mt-3 flex flex-wrap gap-2 min-h-[2rem]">
                            {badges.map((b, i) => (
                                <div key={i} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${b.color}`}>
                                    {b.icon}
                                    {b.label}
                                </div>
                            ))}
                            {!product.isOutOfStock ? (
                                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full
                                font-shabnam">
                                    موجود
                                </span>
                            ) : (
                                <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full
                                font-shabnam">
                                    ناموجود
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}