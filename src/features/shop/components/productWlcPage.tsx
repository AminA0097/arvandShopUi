// app/product/components/ProductWlcPage.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const products = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `محصول ویژه ${i + 1}`,
    price: "۲,۴۰۰,۰۰۰",
    image: "/images/mens-category.jpg",
}));

export default function ProductWlcPage() {
    return (
        <div className="container mx-auto px-6 py-14">
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-bold font-shabnam text-[var(--text)]">
                        محصولات ویژه
                    </h1>

                    <p className="text-[var(--text-muted)] mt-3 font-shabnam">
                        منتخب بهترین محصولات چرمی آروند
                    </p>
                </div>

                <Link
                    href="/product/all"
                    className="
            flex items-center gap-2
            text-[var(--primary)]
            hover:text-[var(--primary-hover)]
            transition-colors
            font-shabnam
          "
                >
                    مشاهده همه
                    <ArrowLeft size={18} />
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-6">
                {products.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                    >
                        <Link href={`/product/item/${product.id}`}>
                            <div
                                className="
                  group overflow-hidden
                  rounded-[var(--radius)]
                  bg-[var(--bg)]
                  border border-[var(--border)]
                  shadow-[var(--shadow)]
                  hover:-translate-y-1.5
                  transition-all duration-300
                "
                            >
                                {/* Image */}
                                <div className="relative h-[320px] overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="
                      object-cover
                      group-hover:scale-105
                      transition-transform duration-700
                    "
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h2
                                        className="
                      font-shabnam
                      text-[15px]
                      text-[var(--text)]
                      mb-2
                      line-clamp-1
                    "
                                    >
                                        {product.title}
                                    </h2>

                                    <div className="flex items-center justify-between">
                    <span
                        className="
                        text-[var(--primary)]
                        font-bold
                        font-shabnam
                      "
                    >
                      {product.price} تومان
                    </span>

                                        <div
                                            className="
                        w-8 h-8 rounded-full
                        bg-[var(--surface)]
                        flex items-center justify-center
                        text-[var(--primary)]
                        group-hover:bg-[var(--primary)]
                        group-hover:text-white
                        transition-all
                      "
                                        >
                                            <ArrowLeft size={15} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center mt-14">
                <Link
                    href="/product/all"
                    className="
            px-8 py-3 rounded-2xl
            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]
            text-white
            transition-colors
            font-shabnam
            shadow-lg
          "
                >
                    مشاهده همه محصولات
                </Link>
            </div>
        </div>
    );
}