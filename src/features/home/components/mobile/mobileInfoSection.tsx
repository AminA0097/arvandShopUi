"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    Shield,
    Truck,
    Send,
    Phone,
} from "lucide-react";

export default function MobileInfoSection() {
    const features = [
        {
            icon: Truck,
            label: "ارسال رایگان",
            desc: "برای سفارش‌های ویژه",
        },
        {
            icon: Shield,
            label: "ضمانت اصالت",
            desc: "بازگشت تا ۷ روز",
        },
        {
            icon: Sparkles,
            label: "چرم طبیعی",
            desc: "کیفیت ممتاز",
        },
    ];

    return (
        <section className="mt-14 pb-10">
            {/* features */}


            {/* social + contact */}
            <div
                className="
                    mt-12
                    rounded-[28px]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-6
                    shadow-[var(--shadow)]
                "
            >
                <h3
                    className="
                        text-center
                        font-shabnam
                        font-bold
                        text-lg
                        text-[var(--text)]
                    "
                >
                    چرم آروند
                </h3>

                <p
                    className="
                        mt-3
                        text-center
                        text-sm
                        leading-8
                        text-[var(--text-muted)]
                        font-shabnam
                    "
                >
                    طراحی مدرن، چرم طبیعی و کیفیتی که برای استفاده
                    روزمره و استایل مینیمال ساخته شده.
                </p>

                {/* socials */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <a
                        href="https://t.me/arvand"
                        target="_blank"
                        className="
                        font-shabnam
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-[var(--border)]
                            px-4
                            py-3
                            text-sm
                            text-[var(--text)]
                            transition
                            hover:bg-[var(--surface-2)]
                        "
                    >
                        <Send size={18} />
                        ایتا
                    </a>
                </div>

                {/* phone */}
                <a
                    href="tel:+989123456789"
                    className="
                    font-shabnam
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[var(--primary)]
                        px-4
                        py-4
                        text-sm
                        text-white
                        transition
                        hover:bg-[var(--primary-hover)]
                    "
                >
                    <Phone size={18} />
                    تماس با ما
                </a>

                {/* footer text */}
                <p
                    className="
                        mt-6
                        text-center
                        text-xs
                        leading-7
                        text-[var(--text-muted)]
                        font-shabnam
                    "
                >
                    تمامی محصولات با دقت انتخاب شده‌اند تا تجربه‌ای
                    متفاوت از کیفیت، طراحی و سادگی داشته باشید.
                </p>
            </div>
        </section>
    );
}