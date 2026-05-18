"use client";

import HeroWrapper from "./heroWrapper";
import MobileMostViewed from "./mobileMostViewed";
import MobileInfoSection from "./mobileInfoSection";
import MobileNewsSection from "./mobileNewsSection";

import FlashDeal from "@/features/home/components/mobile/flashDeal";
import MobileHotDealsSection from "@/features/home/components/mobile/mobileHotDealsSection.";
import MobileTrustStrip from "@/features/home/components/mobile/mobileTrustStrip";

import { dealProducts , newProducts , mostViewedProducts } from "./mock"
/* ---- mock API response ---- */

const heroResponse = {
    type: "event",
    payload: {
        id: "event-1",
        title: "رویداد رونمایی کالکشن پاییزه",
        description: "تجربه‌ای متفاوت از طراحی‌های جدید",
        backgroundImage: "/images/event.jpg",
        href: null,
        badge: "رویداد حضوری",
        location: "تهران",
        date: "2 تا 8 خرداد",
        coupon: "FALL25",
        eventStart: "2026-05-23T18:00:00",
        btnText: null,
    },
} as const;

interface Productt {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    discount?: number;
}

export const mockProducts: Productt[] = [
    {
        id: "1",
        name: "کیف دوشی چرم طبیعی آروند",
        price: 1450000,
        oldPrice: 1890000,
        discount: 23,
        image: "/products/bag-1.jpg",
    },
    {
        id: "2",
        name: "کمربند چرم مردانه کلاسیک",
        price: 420000,
        oldPrice: 520000,
        discount: 19,
        image: "/products/accessory-1.jpg",
    },
    {
        id: "3",
        name: "کیف پول چرم دست‌دوز",
        price: 680000,
        oldPrice: 820000,
        discount: 17,
        image: "/products/accessory-2.jpg",
    },
    {
        id: "4",
        name: "کیف اداری چرم لوکس",
        price: 2450000,
        oldPrice: 3100000,
        discount: 21,
        image: "/products/bag-2.jpg",
    },
];

export default function MobileHome() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[var(--bg)]">

            {/* background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-80px] top-32 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl" />
                <div className="absolute right-[-120px] top-[40%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative z-10 px-4 pb-16 pt-5 space-y-10">

                {/* 1. HOOK */}
                <div className="space-y-5">
                    <HeroWrapper hero={heroResponse} />
                    <MobileTrustStrip />
                </div>

                {/* 2. URGENCY */}
                <FlashDeal
                    title="پیشنهاد ویژه امروز"
                    description="تا پایان این تخفیف فرصت داری"
                    endDate="2026-05-16T23:59:00"
                    href="/products/premium"
                />

                {/* 3. IMPULSE */}
                <MobileHotDealsSection products={dealProducts} />

                {/* 4. DISCOVERY */}
                <MobileNewsSection />

                {/* 5. SOCIAL PROOF */}
                <MobileMostViewed />

                {/* 6. TRUST */}
                <MobileInfoSection />

            </div>
        </div>
    );
}