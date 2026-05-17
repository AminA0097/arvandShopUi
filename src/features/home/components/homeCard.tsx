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

export default function HomeProductCard({ product, index }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
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
          rounded-2xl
          border
          border-[var(--border)]
          bg-white
          shadow-sm
          transition
          duration-300
          hover:shadow-md
          active:scale-[0.98]
        "
                >
                    {/* image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
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
                        <div className="absolute right-2 top-2 flex flex-col gap-1">

                            {product.isNew && (
                                <span
                                    className="
                  rounded-full
                  bg-white/90
                  px-2
                  py-[2px]
                  text-[9px]
                  text-[var(--text)]
                  backdrop-blur
                "
                                >
                  جدید
                </span>
                            )}

                            {product.hasDiscount && (
                                <span
                                    className="
                  rounded-full
                  bg-[var(--primary)]
                  px-2
                  py-[2px]
                  text-[9px]
                  text-white
                "
                                >
                  %{product.discountPercent}
                </span>
                            )}

                        </div>
                    </div>

                    {/* content */}
                    <div className="space-y-2 p-3">

                        {/* category + views */}
                        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                            <span>{product.categoryLabel}</span>

                            <span className="flex items-center gap-1">
                <Eye size={12} />
                                {product.views}
              </span>
                        </div>

                        {/* title */}
                        <h3
                            className="
              line-clamp-1
              text-[13px]
              font-semibold
              text-[var(--text)]
              transition
              group-hover:text-[var(--primary)]
            "
                        >
                            {product.name}
                        </h3>

                        {/* tags */}
                        <div className="flex flex-wrap gap-1">
                            {product.tagLabels.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="
                  rounded-full
                  bg-[var(--surface)]
                  px-2
                  py-[2px]
                  text-[9px]
                  text-[var(--text-muted)]
                "
                                >
                  {tag}
                </span>
                            ))}
                        </div>

                        {/* price */}
                        <div className="flex items-end justify-between pt-1">

                            <div className="leading-tight">
                                {product.hasDiscount && (
                                    <p className="text-[10px] text-[var(--text-muted)] line-through">
                                        {product.originalPrice.toLocaleString()}
                                    </p>
                                )}

                                <p className="text-[14px] font-bold text-[var(--primary)]">
                                    {product.finalPrice.toLocaleString()}
                                </p>
                            </div>

                            {product.isBestSeller && (
                                <span
                                    className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  bg-amber-50
                  px-2
                  py-[2px]
                  text-[9px]
                  text-amber-700
                "
                                >
                  <Sparkles size={10} />
                  پرفروش
                </span>
                            )}

                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
