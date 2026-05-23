"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Home,
    ShoppingBag,
    Heart,
    User,
    Grid3x3,
    Calendar
} from "lucide-react";
import { useEvents } from "@/features/shop/hooks/useEvents";

export default function MobileFooterNav() {
    const pathname = usePathname();
    const { activeCount, loading } = useEvents();

    const mobileNavItems = [
        {
            label: "خانه",
            href: "/",
            icon: Home
        },
        {
            label: "دسته‌ها",
            href: "/categories",
            icon: Grid3x3
        },
        {
            label: "رویدادها",
            href: "/events",
            icon: Calendar,
            badge: activeCount > 0 ? activeCount : undefined
        },
        {
            label: "سبد خرید",
            href: "/cart",
            icon: ShoppingBag,
            badge: undefined
        },
        {
            label: "پروفایل",
            href: "/profile",
            icon: User
        },
    ];

    return (
        <div
            className="
                fixed
                bottom-4
                left-1/2
                z-50
                w-[94%]
                max-w-md
                -translate-x-1/2
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--bg)]/95
                backdrop-blur-2xl
                shadow-2xl
                lg:hidden
            "
            dir="rtl"
        >
            <nav className="relative flex items-center justify-around p-2 overflow-x-auto">
                {mobileNavItems.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="relative z-10 flex flex-col items-center justify-center gap-1 py-2 min-w-[60px]"
                        >
                            {active && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                    className="absolute inset-1 rounded-2xl bg-[var(--primary)]/10"
                                />
                            )}

                            <motion.div
                                animate={{
                                    y: active ? -2 : 0,
                                    scale: active ? 1.05 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 20,
                                }}
                                className="relative z-10"
                            >
                                <div className="relative">
                                    <Icon
                                        size={20}
                                        className={
                                            active
                                                ? "text-[var(--primary)]"
                                                : "text-[var(--text-muted)]"
                                        }
                                    />
                                    {item.badge && !loading && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white"
                                        >
                                            {item.badge}
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>

                            <span
                                className={`font-tanha relative z-10 text-[10px] font-medium transition-colors duration-300 ${
                                    active
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--text-muted)]"
                                }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}