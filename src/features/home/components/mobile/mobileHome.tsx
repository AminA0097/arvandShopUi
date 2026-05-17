"use client";

import HeroWrapper from "./heroWrapper";
import MobileMostViewed from "./mobileMostViewed";
import MobileInfoSection from "./mobileInfoSection";
import MobileNewsSection from "./mobileNewsSection";
import FlashDeal from "@/features/home/components/mobile/flashDeal";
import MobileHotDealsSection from "@/features/home/components/mobile/mobileHotDealsSection.";

/* ---- mock API response ---- */
const heroResponse = {
    type: "event",
    payload: {
        id: "event-1",
        title: "رویداد رونمایی کالکشن پاییزه",
        description: "تجربه‌ای متفاوت از طراحی‌های جدید",
        backgroundImage: "/images/event.jpg",
        href: null,
        badge: " رویداد حضوری",
        location: "تهران",
        date: "2 تا 8 خرداد",
        coupon: "FALL25",
        eventStart: "2026-05-23T18:00:00",
        btnText : null
    },
    // type: "banner",
    // payload: {
    //     id: "banner-3001",
    //     title: "بهش هدیه اختصاصی بده",
    //     description:
    //         "تهیه ست های هدیه با قیمت مناسب",
    //     backgroundImage: "/banner/banner.webp",
    //     href: "/collections/new-arrivals",
    //     btnText : "مشاهده بسته ها",
    //     badge: null,
    // },
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
    {
        id: "5",
        name: "کیف کمری چرم طبیعی",
        price: 980000,
        oldPrice: 1180000,
        discount: 16,
        image: "/products/bag-3.jpg",
    },
    {
        id: "6",
        name: "دستبند چرم مردانه مینیمال",
        price: 240000,
        image: "/products/accessory-3.jpg",
    },
    {
        id: "7",
        name: "کفش بوت",
        price: 310000,
        oldPrice: 390000,
        discount: 20,
        image: "/products/boot-1.jpg",
    },
    {
        id: "8",
        name: "کاپشن",
        price: 720000,
        oldPrice: 890000,
        discount: 19,
        image: "/products/jacket-2.jpg",
    },
];
export default function MobileHome() {
    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <div className="space-y-8 px-4 py-6">

                <HeroWrapper hero={heroResponse} />
                <FlashDeal
                    title="پیشنهاد ویژه امروز"
                    description="تا پایان این تخفیف فرصت داری"
                    endDate="2026-05-17T23:59:00"
                    href="/products/premium"
                />
                <MobileHotDealsSection products={mockProducts} />


                <MobileNewsSection />
                <MobileMostViewed />
                <MobileInfoSection />

            </div>
        </div>
    );
}