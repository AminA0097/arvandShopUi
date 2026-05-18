"use client";

import { useRef } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import ProductCard, { SharedProduct } from "./productCard";

import "swiper/css";
import "./../style/hotDeals.css";

type Props = {
    products?: SharedProduct[] | null;
    seeAllHref?: string | null;
};

export default function MobileHotDealsSection({
                                                  products = [],
                                                  seeAllHref = "/products?sort=discount"
                                              }: Props) {
    const swiperRef = useRef<any>(null);
    const restartTimer = useRef<NodeJS.Timeout | null>(null);

    // Filter out invalid products
    const validProducts = products?.filter(p => p && (p.id || p.href)) || [];

    const restartAutoplay = () => {
        if (!swiperRef.current?.autoplay) return;

        if (restartTimer.current) clearTimeout(restartTimer.current);

        restartTimer.current = setTimeout(() => {
            swiperRef.current?.autoplay?.start?.();
        }, 4000);
    };

    // Don't render if no products
    if (validProducts.length === 0) {
        return null;
    }

    return (
        <section className="hotDealsSection">

            <div className="hotDealsHeader">
                <h2 className="hotDealsTitle">
                    <Flame size={18} className="text-[var(--primary)]" />
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
                onSwiper={(s) => (swiperRef.current = s)}
                onTouchStart={() => swiperRef.current?.autoplay?.stop?.()}
                onTouchEnd={restartAutoplay}
                onSlideChange={restartAutoplay}
                onMouseEnter={() => swiperRef.current?.autoplay?.stop?.()}
                onMouseLeave={restartAutoplay}
            >

                {validProducts.map((p, i) => (
                    <SwiperSlide key={p.id || `deal-${i}`}>
                        <ProductCard
                            index={i}
                            product={{
                                id: p.id,
                                name: p.name,
                                title: p.title,
                                image: p.image,
                                price: p.price,
                                oldPrice: p.oldPrice,
                                discount: p.discount,
                                href: p.href || `/product/${p.id}`,
                            }}
                        />
                    </SwiperSlide>
                ))}

                {/* MORE CARD - Only show if seeAllHref exists */}
                {seeAllHref && (
                    <SwiperSlide>
                        <Link
                            href={seeAllHref}
                            className="hotDealMoreCard"
                        >
                            <Flame size={26} className="text-[var(--primary)]" />

                            <div className="mt-4 font-bold">
                                مشاهده همه تخفیف‌ها
                            </div>

                            <div className="text-xs text-[var(--text-muted)]">
                                ورود به کالکشن ویژه
                            </div>
                        </Link>
                    </SwiperSlide>
                )}

            </Swiper>
        </section>
    );
}