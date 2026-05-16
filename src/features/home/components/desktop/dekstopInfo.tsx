"use client";

import { motion } from "framer-motion";
import {
    Shield,
    Sparkles,
    Truck,
} from "lucide-react";

const items = [
    {
        icon: Truck,
        title: "ارسال سریع",
        desc: "ارسال ویژه برای سفارش‌ها",
    },
    {
        icon: Shield,
        title: "ضمانت اصالت",
        desc: "بازگشت تا ۷ روز",
    },
    {
        icon: Sparkles,
        title: "چرم طبیعی",
        desc: "کیفیت ممتاز",
    },
];

export default function DesktopInfoSection() {
    return (
        <section>
            <div
                className="
                    grid
                    grid-cols-3
                    gap-6
                "
            >
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="
                            rounded-[32px]
                            border
                            border-[var(--border)]
                            bg-white
                            p-10
                        "
                    >
                        <div
                            className="
                                mb-5
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[var(--surface)]
                                text-[var(--primary)]
                            "
                        >
                            <item.icon size={24} />
                        </div>

                        <h3
                            className="
                                text-lg
                                text-[var(--text)]
                            "
                        >
                            {item.title}
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-7
                                text-[var(--text-muted)]
                            "
                        >
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}