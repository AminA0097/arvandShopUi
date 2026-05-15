"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileHero() {
    return (
        <section className="px-4 pt-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                "
            >
                {/* image */}
                <div className="relative aspect-[4/5]">
                    <img
                        src="/images/womens-category.jpg"
                        alt="Arvand Leather"
                        className="h-full w-full object-cover"
                    />

                    {/* overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/75
                            via-black/20
                            to-transparent
                        "
                    />
                </div>

                {/* content */}
                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-6
                    "
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="
                            text-3xl
                            font-light
                            leading-relaxed
                            text-white
                        "
                    >
                        چرم آروند
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="
                            mt-2
                            max-w-xs
                            text-sm
                            leading-7
                            text-white/80
                        "
                    >
                        طراحی مدرن با چرم طبیعی برای
                        استایل روزمره و مینیمال.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-5"
                    >
                        <Link
                            href="/category"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                rounded-2xl
                                bg-white
                                px-5
                                py-3
                                text-sm
                                text-black
                                transition
                                hover:bg-white/90
                            "
                        >
                            مشاهده کالکشن
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}