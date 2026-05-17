"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Clock3,
    ArrowLeft,
    Sparkles,
} from "lucide-react";

type Props = {
    title: string;
    description?: string;
    endDate: string;
    href?: string;
};

export default function FlashDeal({
                                      title,
                                      description,
                                      endDate,
                                      href = "/products/premium",
                                  }: Props) {

    const calculate = () => {
        const diff =
            new Date(endDate).getTime() - new Date().getTime();

        if (diff <= 0) {
            return { h: 0, m: 0, s: 0 };
        }

        return {
            h: Math.floor(diff / 1000 / 60 / 60),
            m: Math.floor((diff / 1000 / 60) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculate());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full">

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[var(--radius)]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-[var(--shadow)]
                "
            >

                {/* glow */}
                <div
                    className="
                        absolute
                        -top-12
                        left-1/2
                        h-44
                        w-44
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--primary)]/15
                        blur-3xl
                    "
                />

                {/* top border accent */}
                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-[2px]
                        bg-[var(--primary)]
                    "
                />

                {/* content */}
                <div className="relative z-10 p-5">

                    {/* top */}
                    <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-3">

                            {/* icon */}
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--surface-2)]
                                "
                            >
                                <Sparkles
                                    size={20}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            {/* text */}
                            <div>

                                <div
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-[var(--text-muted)]
                                    "
                                >
                                    <Clock3 size={13} />

                                </div>

                                <h3
                                    className="
                                        text-lg
                                        font-bold
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
                                            max-w-md
                                            text-sm
                                            leading-6
                                            text-[var(--text-muted)]
                                            font-shabnam
                                        "
                                    >
                                        {description}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* bottom */}
                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        {/* timer */}
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

                        {/* button */}
                        <Link
                            href={href}
                            className="
                                group
                                inline-flex
                                h-12
                                items-center
                                gap-2
                                rounded-2xl
                                bg-[var(--primary)]
                                px-5
                                text-sm
                                font-medium
                                text-white
                                transition-all
                                hover:bg-[var(--primary-hover)]
                                hover:scale-[1.02]
                                font-shabnam
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

                </div>

            </div>

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
                flex
                h-16
                w-16
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface-2)]
            "
        >

            <span
                className="
                    text-lg
                    font-bold
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
                    font-shabnam
                "
            >
                {label}
            </span>

        </div>
    );
}