"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ShoppingCart,
    User,
} from "lucide-react";

import { useState } from "react";

import { desktopNavItems } from "@/config/nav";

import Badge from "@/shared/components/ui/badge";

export default function DesktopHeader() {
    const [activeMenu, setActiveMenu] =
        useState<string | null>(null);

    return (
        <header
            className="
        hidden
        lg:flex
        sticky
        top-0
        z-50
        w-full
        border-b
        border-black/5
        bg-white/80
        backdrop-blur-2xl
      "
        >
            <div
                className="
          mx-auto
          flex
          h-20
          w-full
          max-w-7xl
          items-center
          justify-between
          px-6
        "
            >
                {/* BRAND */}
                <Link
                    href="/"
                    className="
            font-shabnam
            text-2xl
            font-bold
            tracking-wide
            text-[#1f1f1f]
          "
                >
                    چرم آروند
                </Link>

                {/* NAVIGATION */}
                <nav className="flex h-full items-center gap-12">
                    {desktopNavItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative h-full"
                            onMouseEnter={() =>
                                setActiveMenu(item.label)
                            }
                            onMouseLeave={() =>
                                setActiveMenu(null)
                            }
                        >
                            {/* MAIN ITEM */}
                            <button
                                className="
                                font-shabnam
                  group
                  flex
                  h-full
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-zinc-700
                  transition-colors
                  hover:text-[#9a8174]
                "
                            >
                <span className="font-shabnam">
                  {item.label}
                </span>

                                <ChevronDown
                                    size={16}
                                    className={`
                    transition-transform
                    duration-300
                    ${
                                        activeMenu === item.label
                                            ? "rotate-180"
                                            : ""
                                    }
                  `}
                                />
                            </button>

                            {/* HOVER LINE */}
                            <span
                                className={`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  bg-[#9a8174]
                  transition-all
                  duration-300
                  ${
                                    activeMenu === item.label
                                        ? "w-full"
                                        : "w-0"
                                }
                `}
                            />

                            {/* DROPDOWN */}
                            <AnimatePresence>
                                {activeMenu === item.label && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 12,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 12,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className="
                      absolute
                      left-1/2
                      top-full
                      z-50
                      mt-5
                      w-72
                      -translate-x-1/2
                      rounded-3xl
                      border
                      border-black/5
                      bg-white
                      p-3
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    "
                                    >
                                        <div className="space-y-1">
                                            {item.children.map(
                                                (subItem) => {
                                                    const Icon =
                                                        subItem.icon;

                                                    return (
                                                        <Link
                                                            key={subItem.label}
                                                            href={
                                                                subItem.href
                                                            }
                                                            className="
                                group/sub
                                flex
                                items-center
                                gap-4
                                rounded-2xl
                                p-3
                                transition
                                hover:bg-[#f7f5f3]
                              "
                                                        >
                                                            <div
                                                                className="
                                  flex
                                  h-11
                                  w-11
                                  items-center
                                  justify-center
                                  rounded-2xl
                                  bg-[#f7f5f3]
                                  text-[#9a8174]
                                  transition
                                  group-hover/sub:bg-[#9a8174]
                                  group-hover/sub:text-white
                                "
                                                            >
                                                                <Icon
                                                                    size={18}
                                                                />
                                                            </div>

                                                            <div>
                                                                <p
                                                                    className="
                                                                    font-shabnam
                                    font-shabnam
                                    text-sm
                                    font-semibold
                                    text-[#1f1f1f]
                                  "
                                                                >
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </p>

                                                                <p
                                                                    className="
                                                                    font-tanha
                                    mt-1
                                    text-xs
                                    text-zinc-500
                                  "
                                                                >
                                                                    مشاهده
                                                                    محصولات
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                    {/* PROFILE */}
                    <motion.div
                        whileHover={{ y: -2 }}
                    >
                        <Link
                            href="/profile"
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-black/5
                bg-[#f7f5f3]
                transition
                hover:border-[#9a8174]
              "
                        >
                            <User size={18} />
                        </Link>
                    </motion.div>

                    {/* CART */}
                    <motion.div
                        whileHover={{ y: -2 }}
                    >
                        <Link
                            href="/cart"
                            className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-black/5
                bg-[#f7f5f3]
                transition
                hover:border-[#9a8174]
              "
                        >
                            <ShoppingCart
                                size={18}
                            />

                            <Badge
                                size="sm"
                                className="
                                font-tanha-fd
                  absolute
                  -right-2
                  -top-2
                  min-w-5
                  font-tanha-fd
                "
                            >
                                2
                            </Badge>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}