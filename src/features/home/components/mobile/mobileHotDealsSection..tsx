"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Percent } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "./../style/hotDeals.css";

interface Productt {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    discount?: number;
}

export default function MobileHotDealsSection({
                                                  products,
                                              }: {
    products: Productt[];
}) {

    const swiperRef = useRef<any>(null);
    const restartTimer = useRef<NodeJS.Timeout | null>(null);

    const restartAutoplay = () => {
        if (!swiperRef.current) return;

        if (restartTimer.current) clearTimeout(restartTimer.current);

        restartTimer.current = setTimeout(() => {
            swiperRef.current.autoplay.start();
        }, 4000); // idle delay
    };

    return (
        <section className="hotDealsSection">

            {/* header */}
            <div className="hotDealsHeader">
                <h2 className="hotDealsTitle">
                    <Flame size={18}
                           className="text-[var(--primary)]"/>
                    پرتخفیف‌ها
                </h2>


            </div>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={14}
                slidesPerView={2.15}
                dir="rtl"
                autoplay={{
                    delay: 3200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onTouchStart={() => {
                    swiperRef.current?.autoplay.stop();
                }}
                onTouchEnd={() => {
                    restartAutoplay();
                }}
                onSlideChange={() => {
                    restartAutoplay();
                }}
                onMouseEnter={() => {
                    swiperRef.current?.autoplay.stop();
                }}
                onMouseLeave={() => {
                    restartAutoplay();
                }}
            >

                {products.map((product, i) => (
                    <SwiperSlide key={product.id}>

                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >

                            <Link
                                href={`/product/${product.id}`}
                                className="hotDealCard"
                            >

                                {product.discount && (
                                    <div className="hotDealBadge">
                                        <Percent size={12} />
                                        {product.discount}
                                    </div>
                                )}

                                <div className="hotDealImage">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="hotDealImg"
                                    />
                                </div>

                                <div className="hotDealContent">

                                    <h3>{product.name}</h3>

                                    <div className="hotDealPrice">

                            <span className="price">
                                {product.price.toLocaleString()}
                            </span>

                                        {product.oldPrice && (
                                            <span className="old font-tanha-fd">
                                    {product.oldPrice.toLocaleString()}
                                </span>
                                        )}

                                    </div>

                                </div>

                            </Link>

                        </motion.div>

                    </SwiperSlide>
                ))}

                {/* MORE CARD */}
                <SwiperSlide>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        viewport={{ once: true }}
                        className="h-full"
                    >

                        <Link
                            href="/products?sort=discount"
                            className="
                    group
                    relative
                    flex
                    min-h-[100%]
                    h-full
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-[var(--shadow)]
                    px-5
                    py-10
                "
                        >

                            {/* glow */}
                            <div
                                className="
                        absolute
                        h-44
                        w-44
                        rounded-full
                        bg-[var(--primary)]/10
                        blur-3xl
                    "
                            />

                            <div
                                className="
                        relative
                        z-10
                        flex
                        flex-col
                        items-center
                        text-center
                    "
                            >

                                <div
                                    className="
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[var(--primary)]
                            text-white
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
                                >
                                    <Flame size={22} />
                                </div>

                                <span
                                    className="
                            text-sm
                            font-bold
                            text-[var(--text)]
                            font-shabnam
                        "
                                >
                        مشاهده همه تخفیف‌ها
                    </span>

                                <span
                                    className="
                            mt-1
                            text-xs
                            text-[var(--text-muted)]
                        "
                                >
                        ورود به کالکشن ویژه
                    </span>

                            </div>

                        </Link>

                    </motion.div>

                </SwiperSlide>

            </Swiper>
        </section>
    );
}
