"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Award, Percent } from "lucide-react";
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
            icon: <Sparkles size={10} />,
            color: "bg-emerald-100 text-emerald-700",
        });
    }

    if (product.isBestSeller) {
        badges.push({
            label: "پرفروش",
            icon: <Award size={10} />,
            color: "bg-amber-100 text-amber-700",
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
                <div className="bg-white border border-stone-200 rounded-xl hover:shadow-md transition-all duration-300 h-full">
                    <div className="flex p-3 gap-3 h-full">
                        {/* IMAGE - fixed 96x96 */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
                                <img
                                    src={product.imgUrl}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* CONTENT - flexible */}
                        <div className="flex-1 flex flex-col min-w-0">
                            {/* Top row: name and badges */}
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-medium text-stone-800 line-clamp-2 text-sm flex-1 font-shabnam">
                                    {product.name}
                                </h3>
                                <div className="flex gap-1 flex-shrink-0">
                                    {badges.map((b, i) => (
                                        <div key={i} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${b.color}`}>
                                            {b.icon}
                                            <span>{b.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            {visibleTags.length > 0 && (
                                <div className="flex gap-1 mt-1 flex-wrap">
                                    {visibleTags.map((tag, i) => (
                                        <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full font-shabnam">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Price and stock row */}
                            <div className="mt-auto flex items-center justify-between pt-2">
                                {/* Price */}
                                <div>
                                    {product.hasDiscount ? (
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[10px] text-stone-400 line-through font-tanha-fd">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                            <span className="text-sm font-bold text-emerald-600 font-tanha-fd">
                                                {formatPrice(product.finalPrice)}
                                            </span>
                                            <span className="text-[10px] text-red-500 bg-red-50 px-1 py-0.5 rounded-full">
                                                {toPersianNumbers(product.discountPercent)}٪
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm font-bold text-stone-800 font-tanha-fd">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>

                                {/* Stock status */}
                                {!product.isOutOfStock ? (
                                    <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-shabnam flex-shrink-0">
                                        موجود
                                    </span>
                                ) : (
                                    <span className="text-[9px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-shabnam flex-shrink-0">
                                        ناموجود
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}