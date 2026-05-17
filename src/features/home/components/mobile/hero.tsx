"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    CalendarDays,
    MapPin,
    TicketPercent,
    ArrowLeft,
    Sparkles,
    Clock3,
} from "lucide-react";

import { HeroItem } from "../../type/heroItem";

function useCountdown(date?: string) {
    const [time, setTime] = useState<{
        d: number;
        h: number;
        m: number;
        s: number;
    } | null>(null);

    useEffect(() => {
        if (!date) return;

        const target = new Date(date).getTime();

        const interval = setInterval(() => {
            const diff = target - Date.now();

            if (diff <= 0) {
                setTime({
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 0,
                });

                return;
            }

            setTime({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff / 3600000) % 24),
                m: Math.floor((diff / 60000) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return time;
}

type Props = {
    item: HeroItem;
};

export default function Hero({ item }: Props) {

    const time = useCountdown(item.eventStart);

    return (
        <section className="w-full">

            <div
                className="
                    relative
                    h-[560px]
                    overflow-hidden
                    rounded-[var(--radius)]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-[var(--shadow)]
                "
            >

                {/* background */}
                <div className="absolute inset-0">

                    <Image
                        src={item.backgroundImage}
                        alt={item.title}
                        fill
                        priority
                        className="
                            object-cover
                            scale-[1.05]
                        "
                    />

                    {/* cinematic overlay */}
                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-l
                            from-black/85
                            via-black/55
                            to-black/20
                        "
                    />

                </div>

                {/* glow */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-72
                        w-72
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--primary)]/20
                        blur-3xl
                    "
                />

                {/* content */}
                <div
                    className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        justify-center
                        px-6
                        md:px-12
                        text-white
                    "
                >

                    {/* badge */}
                    {item.badge && (
                        <div
                            className="
                                mb-5
                                flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                px-4
                                py-2
                                backdrop-blur-xl
                            "
                        >
                            <Sparkles size={15} />

                            <span className="text-sm font-medium font-shabnam">
                                {item.badge}
                            </span>
                        </div>
                    )}

                    {/* countdown */}
                    {time && (
                        <div className="font-tanha-fd mb-6 flex gap-3">
                            <CountdownBox
                                value={time.m}
                                label="دقیقه"
                            />
                            <CountdownBox
                                value={time.h}
                                label="ساعت"
                            />
                            <CountdownBox
                                value={time.d}
                                label="روز"
                            />
                        </div>
                    )}

                    {/* title */}
                    <h1
                        className="
                            max-w-3xl
                            text-4xl
                            font-black
                            leading-[1.5]
                            md:text-5xl
                            font-shabnam
                        "
                    >
                        {item.title}
                    </h1>

                    {/* desc */}
                    {item.description && (
                        <p
                            className="
                                mt-5
                                max-w-2xl
                                text-base
                                leading-8
                                text-white/75
                                md:text-lg
                                font-shabnam
                            "
                        >
                            {item.description}
                        </p>
                    )}

                    {/* meta */}
                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        {item.location && (
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    px-4
                                    py-3
                                    backdrop-blur-md
                                "
                            >
                                <MapPin size={16} />

                                <span className="text-sm font-shabnam">
                                    {item.location}
                                </span>
                            </div>
                        )}

                        {item.date && (
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    px-4
                                    py-3
                                    backdrop-blur-md
                                "
                            >
                                <CalendarDays size={16} />

                                <span className="text-sm font-tanha-fd">
                                    {item.date}
                                </span>
                            </div>
                        )}

                    </div>

                    {/* coupon */}
                    {item.coupon && (
                        <div
                            className="
                                mt-6
                                flex
                                w-fit
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-dashed
                                border-white/20
                                bg-white/10
                                px-5
                                py-4
                                backdrop-blur-xl
                            "
                        >

                            <TicketPercent size={20} />

                            <div>

                                <div className="text-xs text-white/60 font-shabnam">
                                    کد تخفیف ویژه
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-lg
                                        font-bold
                                        tracking-[0.2em]
                                    "
                                >
                                    {item.coupon}
                                </div>

                            </div>

                        </div>
                    )}

                    {/* button */}
                    {item.href && (
                        <Link
                            href={item.href}
                            className="
                                group
                                mt-8
                                inline-flex
                                h-14
                                w-fit
                                items-center
                                gap-2
                                rounded-2xl
                                bg-[var(--bg)]
                                px-6
                                text-sm
                                font-semibold
                                text-[var(--text)]
                                transition-all
                                hover:scale-[1.03]
                                hover:bg-white
                                font-shabnam
                            "
                        >
                            {item.btnText}
                            <ArrowLeft
                                size={17}
                                className="
                                    transition-transform
                                    group-hover:-translate-x-1
                                "
                            />
                        </Link>
                    )}

                </div>

            </div>

        </section>
    );
}

function CountdownBox({
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
                h-20
                w-20
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/10
                backdrop-blur-xl
            "
        >

            <div
                className="
                    text-2xl
                    font-black
                    text-white
                "
            >
                {value.toString().padStart(2, "0")}
            </div>

            <div
                className="
                    mt-1
                    text-[11px]
                    text-white/60
                    font-shabnam
                "
            >
                {label}
            </div>

        </div>
    );
}