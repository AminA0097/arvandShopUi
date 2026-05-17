"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { HeroItem } from "../../type/heroItem";

export default function SimpleBanner({ item }: { item: HeroItem }) {
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

                {/* background image */}
                <div className="absolute inset-0">

                    <Image
                        src={item.backgroundImage}
                        alt={item.title}
                        fill
                        priority
                        className="object-cover scale-[1.03]"
                    />

                    {/* overlay */}
                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-l
                            from-black/65
                            via-black/40
                            to-black/10
                        "
                    />

                </div>

                {/* soft glow */}
                <div
                    className="
                        absolute
                        -top-16
                        left-1/2
                        h-52
                        w-52
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--primary)]/20
                        blur-3xl
                    "
                />

                {/* content */}
                <div
                    className="
                        relative z-10
                        flex h-[320px]
                        flex-col
                        justify-center
                        px-6
                        md:px-10
                        text-white
                    "
                >

                    {item.badge && (
                        <div
                            className="
                                mb-4
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

                    <h2
                        className="
                            max-w-2xl
                            text-3xl
                            font-black
                            leading-[1.4]
                            md:text-4xl
                            font-shabnam
                        "
                    >
                        {item.title}
                    </h2>

                    {item.description && (
                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-sm
                                leading-7
                                text-white/75
                                md:text-base
                                font-shabnam
                            "
                        >
                            {item.description}
                        </p>
                    )}

                    {item.href && (
                        <Link
                            href={item.href}
                            className="
                                group
                                mt-7
                                inline-flex
                                h-12
                                w-fit
                                items-center
                                gap-2
                                rounded-2xl
                                bg-[var(--bg)]
                                px-5
                                text-sm
                                font-semibold
                                text-[var(--text)]
                                transition-all
                                hover:scale-[1.02]
                                hover:bg-white
                                font-shabnam
                            "
                        >
                            {item.btnText ?? "مشاهده"}

                            <ArrowLeft
                                size={16}
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