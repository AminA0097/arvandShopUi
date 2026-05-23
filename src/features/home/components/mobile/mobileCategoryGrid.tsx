"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShoppingBag,
    Briefcase,
    Watch,
    Wallet,
    Shirt,
    Gem,
    Sparkles,
    TrendingUp,
    Percent
} from "lucide-react";

// Category data - you can move this to a config file
export const mobileCategories = [
    {
        id: 1,
        name: "کیف زنانه",
        icon: ShoppingBag,
        href: "/categories/women-bags",
        color: "from-rose-500/20 to-rose-500/5",
        iconColor: "text-rose-500",
        count: 48
    },
    {
        id: 2,
        name: "کیف مردانه",
        icon: Briefcase,
        href: "/categories/men-bags",
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-500",
        count: 32
    },
    {
        id: 3,
        name: "ساعت",
        icon: Watch,
        href: "/categories/watches",
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-500",
        count: 24
    },
    {
        id: 4,
        name: "کیف پول",
        icon: Wallet,
        href: "/categories/wallets",
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-500",
        count: 56
    },
    {
        id: 5,
        name: "اکسسوری",
        icon: Shirt,
        href: "/categories/accessories",
        color: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-500",
        count: 41
    },
    {
        id: 6,
        name: "پرفروش‌ها",
        icon: TrendingUp,
        href: "/products/bestsellers",
        color: "from-orange-500/20 to-orange-500/5",
        iconColor: "text-orange-500",
        count: 12
    },
];

export default function MobileCategoryGrid() {
    return (
        <section className="py-2">
            <div className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-[var(--surface-2)] p-2">
                        <Sparkles size={14} className="text-[var(--primary)]" />
                    </div>
                    <h2 className="text-base font-bold text-[var(--text)]">
                        دسته‌بندی محصولات
                    </h2>
                </div>
                <Link
                    href="/categories"
                    className="text-xs text-[var(--text-muted)] transition hover:text-[var(--primary)]"
                >
                    مشاهده همه
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {mobileCategories.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Link href={cat.href} className="block">
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] p-3 text-center transition-all hover:-translate-y-1 hover:shadow-lg">

                                {/* Background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                                {/* Icon */}
                                <div className="relative z-10">
                                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)] transition-colors group-hover:bg-white/10`}>
                                        <cat.icon size={22} className={`${cat.iconColor} transition-transform group-hover:scale-110`} />
                                    </div>

                                    {/* Name */}
                                    <span className="relative z-10 mt-2 block text-xs font-medium text-[var(--text)]">
                                        {cat.name}
                                    </span>

                                    {/* Product count */}
                                    <span className="relative z-10 mt-0.5 block text-[10px] text-[var(--text-muted)]">
                                        {cat.count} محصول
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}