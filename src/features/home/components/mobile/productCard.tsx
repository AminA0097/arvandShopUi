"use client";

import Image from "next/image";
import Link from "next/link";
import { Percent } from "lucide-react";
import { motion } from "framer-motion";

export type SharedProduct = {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    price?: number | null;
    oldPrice?: number | null;
    discount?: number | null;
    href?: string | null;
    title?: string | null;
};

export default function ProductCard({
                                        product,
                                        index = 0,
                                    }: {
    product: SharedProduct;
    index?: number;
}) {
    // Helper function to safely display values
    const displayName = product.name || product.title || "بدون نام";
    const displayPrice = product.price ?? 0;
    const displayOldPrice = product.oldPrice ?? null;
    const displayDiscount = product.discount ?? null;
    const displayHref = product.href || `/product/${product.id || "#"}`;
    const displayImage = product.image || "/placeholder-image.jpg";

    // Calculate discount if not provided but oldPrice exists
    const calculatedDiscount = displayDiscount !== null
        ? displayDiscount
        : (displayOldPrice && displayPrice
            ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
            : null);

    // Check if product has discount/old price for height adjustment
    const hasDiscount = calculatedDiscount && calculatedDiscount > 0;
    const hasOldPrice = displayOldPrice && displayOldPrice > displayPrice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link href={displayHref} className="group block h-full">
                <article className="
                    flex flex-col
                    overflow-hidden rounded-[24px]
                    bg-[var(--bg)] shadow-[var(--shadow)]
                    transition hover:-translate-y-1
                    h-full
                ">

                    {/* IMAGE - Fixed aspect ratio */}
                    <div className="relative aspect-square bg-[var(--surface)] flex-shrink-0">
                        {displayImage ? (
                            <Image
                                src={displayImage}
                                alt={displayName}
                                fill
                                className="object-cover transition group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[var(--surface-2)]">
                                <span className="text-xs text-[var(--text-muted)]">بدون تصویر</span>
                            </div>
                        )}

                        {hasDiscount && (
                            <div className="
                                absolute left-3 top-3
                                flex items-center gap-1
                                rounded-full bg-[var(--primary)]
                                px-2 py-1 text-[10px]
                                text-white
                            ">
                                <Percent size={11} />
                                {calculatedDiscount}%
                            </div>
                        )}
                    </div>

                    {/* CONTENT - Vertical layout */}
                    <div className="flex flex-col flex-grow p-3">

                        {/* NAME */}
                        <h3 className="line-clamp-2 text-[13px] font-medium min-h-[2.5rem]">
                            {displayName}
                        </h3>

                        {/* Spacer between name and price section */}
                        <div className="flex-grow"></div>

                        {/* PRICE SECTION - Vertical layout */}
                        <div className="flex flex-col gap-1 mt-2">
                            {displayPrice > 0 ? (
                                <>
                                    {/* Current Price */}
                                    <div className="text-sm font-black text-[var(--primary)]">
                                        {displayPrice.toLocaleString()} تومان
                                    </div>

                                    {/* Old Price (if exists) */}
                                    {hasOldPrice && (
                                        <div className="text-[11px] line-through text-[var(--text-muted)]">
                                            {displayOldPrice.toLocaleString()} تومان
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-sm text-[var(--text-muted)]">
                                    تماس بگیرید
                                </div>
                            )}
                        </div>

                        {/* VIEW BUTTON - Text only */}
                        <div className="mt-3 pt-2 border-t border-[var(--surface-2)]">
                            <div className="
                                flex items-center justify-center
                                py-2 px-3
                                rounded-xl
                                bg-[var(--surface-2)]
                                text-[var(--text)]
                                text-xs font-medium
                                group-hover:bg-[var(--primary)]
                                group-hover:text-white
                                transition
                                cursor-pointer
                            ">
                                مشاهده محصول
                            </div>
                        </div>

                    </div>

                </article>
            </Link>
        </motion.div>
    );
}