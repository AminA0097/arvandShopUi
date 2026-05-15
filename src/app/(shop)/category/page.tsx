"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
    Package,
    ArrowLeft,
    Sparkles,
    Shield,
    Truck,
} from "lucide-react";

import {
    categories,
    getCategoryRoute,
    getCategoryTypeRoute,
    TYPE_LABELS,
} from "@/features/shop/types/ProductQuery";

export default function ProductMobileCategories() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-14 md:mb-20"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-4 font-shabnam">
                    محصولات{" "}
                    <span className="text-[var(--primary)]">
                        آروند
                    </span>
                </h1>

                <p
                    className="
                        text-[var(--text-muted)]
                        max-w-2xl
                        mx-auto
                        text-sm
                        md:text-base
                        leading-7
                        font-shabnam
                    "
                >
                    مجموعه‌ای از محصولات چرمی طبیعی با طراحی مدرن،
                    کیفیت ماندگار و ضمانت اصالت کالا
                </p>

                {/* Features */}
                {/*<div className="flex flex-wrap justify-center gap-8 mt-10">*/}
                {/*    {[*/}
                {/*        {*/}
                {/*            icon: Truck,*/}
                {/*            label: "ارسال رایگان",*/}
                {/*            desc: "برای سفارش‌های ویژه",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            icon: Shield,*/}
                {/*            label: "ضمانت اصالت",*/}
                {/*            desc: "بازگشت تا ۷ روز",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            icon: Sparkles,*/}
                {/*            label: "چرم طبیعی",*/}
                {/*            desc: "کیفیت ممتاز",*/}
                {/*        },*/}
                {/*    ].map((feature, i) => (*/}
                {/*        <motion.div*/}
                {/*            key={feature.label}*/}
                {/*            initial={{ opacity: 0, y: 14 }}*/}
                {/*            animate={{ opacity: 1, y: 0 }}*/}
                {/*            transition={{ delay: i * 0.1 }}*/}
                {/*            className="flex items-center gap-3"*/}
                {/*        >*/}
                {/*            <div*/}
                {/*                className="*/}
                {/*                    p-3*/}
                {/*                    rounded-2xl*/}
                {/*                    bg-[var(--surface)]*/}
                {/*                    border*/}
                {/*                    border-[var(--border)]*/}
                {/*                    text-[var(--primary)]*/}
                {/*                "*/}
                {/*            >*/}
                {/*                <feature.icon size={20} />*/}
                {/*            </div>*/}
                
                {/*            <div className="text-right">*/}
                {/*                <p*/}
                {/*                    className="*/}
                {/*                        text-sm*/}
                {/*                        font-bold*/}
                {/*                        text-[var(--text)]*/}
                {/*                        font-shabnam*/}
                {/*                    "*/}
                {/*                >*/}
                {/*                    {feature.label}*/}
                {/*                </p>*/}
                
                {/*                <p*/}
                {/*                    className="*/}
                {/*                        text-xs*/}
                {/*                        text-[var(--text-muted)]*/}
                {/*                        font-shabnam*/}
                {/*                    "*/}
                {/*                >*/}
                {/*                    {feature.desc}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </motion.div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </motion.div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {categories.map((category, idx) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div
                            className="
                                group
                                overflow-hidden
                                rounded-[var(--radius)]
                                bg-[var(--bg)]
                                border
                                border-[var(--border)]
                                shadow-[var(--shadow)]
                                hover:-translate-y-2
                                transition-all
                                duration-500
                            "
                        >
                            {/* Main Category Link */}
                            <Link
                                href={getCategoryRoute(category.name)}
                            >
                                {/* Image */}
                                <div className="relative h-[260px] overflow-hidden">
                                    <Image
                                        src={category.image}
                                        alt={category.label}
                                        fill
                                        className="
                                            object-cover
                                            group-hover:scale-105
                                            transition-transform
                                            duration-700
                                        "
                                    />

                                    {/* Overlay */}
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/45
                                            via-black/10
                                            to-transparent
                                        "
                                    />

                                    {/* Badge */}
                                    <div
                                        className="
                                            absolute
                                            top-4
                                            right-4
                                            w-12
                                            h-12
                                            rounded-2xl
                                            bg-white/90
                                            backdrop-blur-sm
                                            flex
                                            items-center
                                            justify-center
                                            text-[var(--primary)]
                                            shadow-lg
                                        "
                                    >
                                        <Package size={22} />
                                    </div>

                                    {/* Title */}
                                    <div className="absolute bottom-5 right-5">
                                        <h2
                                            className="
                                                text-2xl
                                                font-bold
                                                text-white
                                                font-shabnam
                                                mb-1
                                            "
                                        >
                                            {category.label}
                                        </h2>

                                        <p className="text-white/80 text-sm font-shabnam">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-5">
                                {/* Types */}
                                <div className="flex flex-wrap gap-2 mb-5 font-shabnam">
                                    {category.allowedTypes.map(
                                        (type) => (
                                            <Link
                                                key={type}
                                                href={getCategoryTypeRoute(
                                                    category.name,
                                                    type
                                                )}
                                            >
                                                <span
                                                    className="
                                                        text-xs
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        bg-[var(--surface)]
                                                        border
                                                        border-[var(--border)]
                                                        text-[var(--text-muted)]
                                                        font-medium
                                                        hover:bg-[var(--primary)]
                                                        hover:text-white
                                                        transition-all
                                                        duration-300
                                                        cursor-pointer
                                                    "
                                                >
                                                    {
                                                        TYPE_LABELS[
                                                            type
                                                            ]
                                                    }
                                                </span>
                                            </Link>
                                        )
                                    )}
                                </div>

                                {/* Footer */}
                                <Link
                                    href={getCategoryRoute(
                                        category.name
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="
                                                text-sm
                                                font-shabnam
                                                text-[var(--primary)]
                                            "
                                        >
                                            مشاهده محصولات
                                        </span>

                                        <div
                                            className="
                                                w-9
                                                h-9
                                                rounded-full
                                                bg-[var(--surface)]
                                                flex
                                                items-center
                                                justify-center
                                                text-[var(--primary)]
                                                group-hover:bg-[var(--primary)]
                                                group-hover:text-white
                                                transition-all
                                            "
                                        >
                                            <ArrowLeft
                                                size={16}
                                                className="
                                                    group-hover:-translate-x-0.5
                                                    transition-transform
                                                "
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}