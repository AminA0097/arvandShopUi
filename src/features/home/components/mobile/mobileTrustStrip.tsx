"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Truck,
    Sparkles,
    Gift,
} from "lucide-react";

const features = [
    {
        icon: Truck,
        label: "ارسال رایگان",
    },
    {
        icon: ShieldCheck,
        label: "ضمانت کیفیت",
    },
    {
        icon: Sparkles,
        label: "چرم طبیعی",
    },
    {
        icon: Gift,
        label: "بسته‌بندی ویژه",
    },
];

export default function MobileTrustStrip() {
    return (
        <section className="relative overflow-hidden">

            {/* glow */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]
                    opacity-[0.03]
                "
            />

            <div className="flex flex-wrap justify-center gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-[var(--surface)]
                                p-3
                                text-[var(--primary)]
                            "
                        >
                            <feature.icon size={20} />
                        </div>

                        <div className="text-right">
                            <p
                                className="
                                    font-shabnam
                                    text-sm
                                    font-bold
                                    text-[var(--text)]
                                "
                            >
                                {feature.label}
                            </p>

                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}