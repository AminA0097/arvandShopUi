"use client";

export type Event = {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    city: string;
    exactLocation: string;
    lat: number;
    lng: number;
    image: string;
    status: "active" | "passed";
    offCode?: string;
    discount?: number;
    badge?: string;
};

// Mock Data - حتما به صورت آرایه باشد
const mockEvents: Event[] = [
    {
        id: "1",
        title: "نمایشگاه بهاره",
        description: "بزرگترین نمایشگاه فصلی با تخفیف‌های شگفت‌انگیز برای تمام محصولات. همراه با جوایز نفیس و قرعه‌کشی.",
        startDate: "2026-05-10T00:00:00",
        endDate: "2026-05-25T23:59:59",
        location: "تهران",
        city: "تهران",
        exactLocation: "خیابان ولیعصر، نبستانی رسالت، پلاک ۱۲، سالن همایش‌های بهار",
        lat: 35.7219,
        lng: 51.3347,
        image: "",
        status: "active",
        offCode: "SPRING1405",
        discount: 30,
        badge: "تخفیف ویژه"
    },
    {
        id: "2",
        title: "حراج تابستانه",
        description: "با بیش از ۵۰٪ تخفیف در تمام برندها. فرصت استثنایی برای خرید با بهترین قیمت‌ها.",
        startDate: "2026-06-01T00:00:00",
        endDate: "2026-06-30T23:59:59",
        location: "مشهد",
        city: "مشهد",
        exactLocation: "بلوار احمدآباد، مجتمع تجاری الماس، طبقه سوم",
        lat: 36.2972,
        lng: 59.6067,
        image: "",
        status: "active",
        offCode: "SUMMER50",
        discount: 50,
        badge: "حراج بزرگ"
    },
    {
        id: "3",
        title: "جشنواره پاییزی",
        description: "بهترین فرصت برای خرید لوازم خانگی با بهترین کیفیت و گارانتی معتبر.",
        startDate: "2025-09-01T00:00:00",
        endDate: "2025-10-15T23:59:59",
        location: "اصفهان",
        city: "اصفهان",
        exactLocation: "خیابان چهارباغ، مجتمع نقش جهان، واحد ۲۰۲",
        lat: 32.6546,
        lng: 51.6674,
        image: "",
        status: "passed",
        offCode: "AUTUMN1404",
        discount: 20,
        badge: "جشنواره"
    },
    {
        id: "4",
        title: "نمایشگاه دیجیتال",
        description: "جدیدترین محصولات دیجیتال، لپ‌تاپ، گوشی و گجت‌های هوشمند با قیمت‌های ویژه.",
        startDate: "2026-05-15T00:00:00",
        endDate: "2026-05-20T23:59:59",
        location: "شیراز",
        city: "شیراز",
        exactLocation: "بلوار کریمخان زند، مرکز همایش‌های بین‌المللی",
        lat: 29.5918,
        lng: 52.5837,
        image: "",
        status: "active",
        offCode: "DIGI10",
        discount: 15,
        badge: "جدید"
    },
    {
        id: "5",
        title: "نمایشگاه مد و پوشاک",
        description: "برترین برندهای پوشاک با تخفیف‌های استثنایی. استایل بهاری خود را با بهترین قیمت‌ها بسازید.",
        startDate: "2025-11-01T00:00:00",
        endDate: "2025-11-15T23:59:59",
        location: "تهران",
        city: "تهران",
        exactLocation: "خیابان انقلاب، بوستان گفتگو، سالن شرقی",
        lat: 35.7036,
        lng: 51.3902,
        image: "",
        status: "passed",
        offCode: "FASHION25",
        discount: 25,
        badge: "مد ۱۴۰۴"
    },
    {
        id: "6",
        title: "ویکند تخفیف",
        description: "فقط ۴۸ ساعت فرصت! تخفیف‌های لحظه‌ای روی همه محصولات تا ۷۰٪",
        startDate: "2026-05-17T00:00:00",
        endDate: "2026-05-19T23:59:59",
        location: "کرج",
        city: "کرج",
        exactLocation: "بلوار شهید چمران، پلاتین ۲، طبقه همکف",
        lat: 35.8355,
        lng: 50.9928,
        image: "",
        status: "active",
        offCode: "WEEKEND70",
        discount: 70,
        badge: "شگفت‌انگیز"
    }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
    async getEvents(): Promise<Event[]> {
        await delay(800);
        // حتما یک آرایه برگردانید
        return [...mockEvents];
    },

    async getEventById(id: string): Promise<Event | null> {
        await delay(300);
        const event = mockEvents.find(e => e.id === id);
        return event || null;
    },

    async getActiveEvents(): Promise<Event[]> {
        await delay(500);
        return mockEvents.filter(e => e.status === "active");
    },

    async getPassedEvents(): Promise<Event[]> {
        await delay(500);
        return mockEvents.filter(e => e.status === "passed");
    }
};