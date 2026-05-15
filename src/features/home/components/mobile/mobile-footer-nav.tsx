"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { mobileNavItems } from "@/config/nav";

export default function MobileFooterNav() {
    const pathname = usePathname();

    return (
        <div
            className="
        fixed
        bottom-4
        left-1/2
        z-50
        w-[92%]
        max-w-md
        -translate-x-1/2
        rounded-3xl
        border
        border-black/5
        bg-white/90
        backdrop-blur-2xl
        shadow-xl
        lg:hidden
      "
        >
            <nav
                className="
          relative
          flex
          items-center
          justify-around
          p-2
        "
            >
                {mobileNavItems.map((item) => {
                    const active = pathname === item.href;

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="
                            font-shabnam
                relative
                z-10
                flex
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                py-3
              "
                        >
                            {active && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                    className="
                    absolute
                    inset-1
                    rounded-2xl
                    bg-[#9a8174]/12
                  "
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
                                <Icon
                                    size={20}
                                    className={
                                        active
                                            ? "text-[#9a8174]"
                                            : "text-zinc-500"
                                    }
                                />
                            </motion.div>

                            <span
                                className={`
                  relative
                  z-10
                  text-[11px]
                  font-medium
                  transition-colors
                  duration-300
                  ${
                                    active
                                        ? "text-[#1f1f1f]"
                                        : "text-zinc-500"
                                }
                `}
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