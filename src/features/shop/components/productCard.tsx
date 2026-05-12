"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

import { Product } from "@/features/shop/types/shopType";
import { formatPrice, toPersianNumbers } from "@/shared/lib/cn";
import { categoryLabels, tagLabels } from "@/features/shop/types/shopType";

interface Props {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: Props) {
    const hasDiscount = product.discount > 0;

    const finalPrice = hasDiscount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;

    const visibleTags = product.tags.slice(0, 2);

    const badges = [
        product.isNew && { label: "جدید", color: "text-emerald-600 bg-emerald-50" },
        product.isBestSeller && { label: "پرفروش", color: "text-amber-600 bg-amber-50" },
    ].filter(Boolean) as { label: string; color: string }[];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="will-change-transform"
        >
            <Link
                href={`/products/${product.category.name}/${product.id}`}
                className="group block"
            >
                <div className="bg-white border rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">

                    <div className="flex gap-4">

                        {/* IMAGE */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 min-w-0">

                            {/* TOP META */}
                            <div className="font-shabnam flex justify-between items-center text-[11px] text-stone-400">
                                <span>{categoryLabels[product.category.name]}</span>

                                <span className="font-shabnam flex items-center gap-1">
                  <TrendingUp size={12} />
                                    {toPersianNumbers(product.views)}
                </span>
                            </div>

                            {/* TITLE */}
                            <h3 className="font-shabnam font-medium text-stone-800 line-clamp-1 text-base mt-1">
                                {product.name}
                            </h3>

                            {/* TAGS */}
                            {visibleTags.length > 0 && (
                                <div className="flex gap-1 mt-1.5 flex-wrap">
                                    {visibleTags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="font-shabnam text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                                        >
                      {tagLabels[tag.name] || tag.name}
                    </span>
                                    ))}
                                </div>
                            )}

                            {/* PRICE */}
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                                {hasDiscount ? (
                                    <>
                    <span className="font-shabnam text-xs text-red-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                                        <span className="text-lg font-bold text-emerald-600 font-shabnam">
                      {formatPrice(finalPrice)}
                    </span>
                                    </>
                                ) : (
                                    <span className="font-shabnam text-lg font-bold text-stone-800">
                    {formatPrice(product.price)}
                  </span>
                                )}
                            </div>

                            {/* BADGES */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {badges.map((b, i) => (
                                    <span
                                        key={i}
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium font-shabnam ${b.color}`}
                                    >
                    {b.label}
                  </span>
                                ))}

                                {product.stock > 0 ? (
                                    <span className="text-[10px] font-shabnam text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
    موجود
  </span>
                                ) : (
                                    <span className="text-[10px] font-shabnam text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
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