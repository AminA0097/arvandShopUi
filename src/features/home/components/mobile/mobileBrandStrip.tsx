"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
    { id: 1, name: "چرم طبیعی", logo: "/brands/leather.svg" },
    { id: 2, name: "طراحی مدرن", logo: "/brands/design.svg" },
    { id: 3, name: "کیفیت بالا", logo: "/brands/quality.svg" },
];

export default function MobileBrandStrip() {
    return (
        <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-4">
            <div className="flex items-center justify-between gap-4">
                {brands.map((brand, i) => (
                    <motion.div
                        key={brand.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-1 flex-col items-center gap-2 text-center"
                    >
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-lg">⭐</span>
                        </div>
                        <span className="text-xs font-medium text-[var(--text)]">
                            {brand.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}