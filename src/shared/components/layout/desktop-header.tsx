"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";

import { desktopNavItems } from "@/config/nav";
import Badge from "@/shared/components/ui/badge";

export default function DesktopHeader() {
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
        backdrop-blur-xl
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
                {/* LEFT */}
                <Link
                    href="/"
                    className="
            text-2xl
            font-bold
            tracking-[0.2em]
            text-[#1f1f1f]
          "
                >
                    Arvand Leather
                </Link>

                {/* CENTER */}
                <nav className="flex items-center gap-10">
                    {desktopNavItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="
                            font-shabnam
                group
                relative
                text-sm
                font-medium
                uppercase
                tracking-widest
                text-zinc-600
                transition
                hover:text-[#7e685d]
              "
                        >
                            {item.label}

                            <span
                                className="
                  absolute
                  -bottom-2
                  left-0
                  h-[1px]
                  w-0
                  bg-[#9a8174]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
                            />
                        </Link>
                    ))}
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    <motion.div whileHover={{ y: -2 }}>
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

                    <motion.div whileHover={{ y: -2 }}>
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
                            <ShoppingCart size={18} />

                            <Badge
                                size="sm"
                                className="
                                font-tanha-fd
    absolute
    -right-2
    -top-2
    min-w-5
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