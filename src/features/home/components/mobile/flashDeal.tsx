"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Clock3,
    ArrowLeft,
    Sparkles,
    Zap,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
    title: string;
    description?: string;
    endDate?: string;
    href?: string;
};

type TimeLeft = {
    h: number;
    m: number;
    s: number;
};

export default function FlashDeal({
                                      title,
                                      description,
                                      endDate,
                                      href = "/products/premium",
                                  }: Props) {

    const calculate = (): TimeLeft => {

        if (!endDate) {
            return { h: 0, m: 0, s: 0 };
        }

        const diff =
            new Date(endDate).getTime() - Date.now();

        if (diff <= 0) {
            return { h: 0, m: 0, s: 0 };
        }

        return {
            h: Math.floor(diff / 1000 / 60 / 60),
            m: Math.floor((diff / 1000 / 60) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    };

    // IMPORTANT:
    // avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    const [time, setTime] = useState<TimeLeft>({
        h: 0,
        m: 0,
        s: 0,
    });

    useEffect(() => {

        setMounted(true);

        setTime(calculate());

        const timer = setInterval(() => {
            setTime(calculate());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const expired =
        mounted &&
        time.h === 0 &&
        time.m === 0 &&
        time.s === 0;

    return (
        <section className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">

            {/* top glow */}
            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    h-52
                    w-52
                    -translate-x-1/2
                    rounded-full
                    bg-[var(--primary)]/15
                    blur-3xl
                "
            />

            {/* accent line */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-[var(--primary)]
                    to-transparent
                "
            />

            <AnimatePresence mode="wait">

                {!expired ? (

                    <motion.div
                        key="timer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10 p-5"
                    >

                        {/* top */}
                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--primary)]/10
                                    text-[var(--primary)]
                                "
                            >
                                <Zap size={22} />
                            </div>

                            <div className="flex-1">

                                <div className="mb-2 flex items-center gap-2 text-xs text-[var(--primary)]">
                                    <Clock3 size={13} />
                                    فرصت محدود
                                </div>

                                <h3
                                    className="
                                        text-lg
                                        font-black
                                        text-[var(--text)]
                                        font-shabnam
                                    "
                                >
                                    {title}
                                </h3>

                                {description && (
                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            leading-7
                                            text-[var(--text-muted)]
                                            font-shabnam
                                        "
                                    >
                                        {description}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* bottom */}
                        <div className="mt-6 flex items-center justify-between gap-3">

                            <div className="flex gap-2">

                                <TimeBox
                                    value={time.s}
                                    label="ثانیه"
                                />

                                <TimeBox
                                    value={time.m}
                                    label="دقیقه"
                                />

                                <TimeBox
                                    value={time.h}
                                    label="ساعت"
                                />

                            </div>

                            <Link
                                href={href}
                                className="
                                    group
                                    flex
                                    h-12
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    bg-[var(--primary)]
                                    px-5
                                    text-sm
                                    font-bold
                                    text-white
                                    transition-all
                                    hover:scale-[1.03]
                                "
                            >
                                مشاهده

                                <ArrowLeft
                                    size={16}
                                    className="
                                        transition-transform
                                        group-hover:-translate-x-1
                                    "
                                />

                            </Link>

                        </div>

                    </motion.div>

                ) : (

                    <motion.div
                        key="expired"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 p-6"
                    >

                        <div className="flex items-center gap-4">

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--surface-2)]
                                "
                            >
                                <Sparkles
                                    size={22}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <div>

                                <div className="text-xs text-[var(--primary)]">
                                    کالکشن ویژه
                                </div>

                                <h3
                                    className="
                                        mt-1
                                        text-lg
                                        font-black
                                        text-[var(--text)]
                                        font-shabnam
                                    "
                                >
                                    محصولات منتخب آروند
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-[var(--text-muted)]
                                        leading-7
                                    "
                                >
                                    جدیدترین محصولات و پیشنهادهای ویژه را ببین.
                                </p>

                            </div>

                        </div>

                        <Link
                            href={href}
                            className="
                                mt-6
                                group
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-[var(--primary)]
                                text-sm
                                font-bold
                                text-white
                                transition-all
                                hover:scale-[1.02]
                            "
                        >
                            ورود به فروشگاه

                            <ArrowLeft
                                size={16}
                                className="
                                    transition-transform
                                    group-hover:-translate-x-1
                                "
                            />

                        </Link>

                    </motion.div>

                )}

            </AnimatePresence>

        </section>
    );
}

function TimeBox({
                     value,
                     label,
                 }: {
    value: number;
    label: string;
}) {
    return (
        <div
            className="
                relative
                flex
                h-[72px]
                w-[72px]
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface-2)]
            "
        >

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-white/5
                    to-transparent
                "
            />

            <span
                className="
                    text-lg
                    font-black
                    text-[var(--text)]
                    font-tanha-fd
                "
            >
                {value.toString().padStart(2, "0")}
            </span>

            <span
                className="
                    mt-1
                    text-[10px]
                    text-[var(--text-muted)]
                "
            >
                {label}
            </span>

        </div>
    );
}