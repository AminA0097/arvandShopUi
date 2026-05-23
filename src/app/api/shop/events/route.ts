import { NextResponse } from 'next/server';

export type Event = {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    exactLocation: string;
    startDate: string;
    endDate: string;
    offCode?: string;
    discount?: number;
    badge?: string;
    status: "active" | "passed";
};

// Mock database - replace with actual database calls
const getEventsFromDB = (): Event[] => {
    return [
        {
            id: "1",
            title: "نمایشگاه بهاره چرم آروند",
            description: "بزرگترین نمایشگاه محصولات چرمی با تخفیف‌های ویژه",
            image: "/events/spring-exhibition.jpg",
            location: "تهران",
            exactLocation: "سالن نمایشگاهی بوستان گفتگو، غرفه ۱۲",
            startDate: "2026-05-20T10:00:00",
            endDate: "2026-05-25T22:00:00",
            offCode: "SPRING1404",
            discount: 30,
            badge: "🔥 حراج ویژه",
            status: "active",
        },
        {
            id: "2",
            title: "نمایشگاه پاییزه آروند",
            description: "کالکشن جدید پاییزه با طراحی‌های مدرن",
            image: "/events/autumn-exhibition.jpg",
            location: "اصفهان",
            exactLocation: "مرکز همایش‌های بین‌المللی اصفهان، سالن چرم",
            startDate: "2026-05-25T09:00:00",
            endDate: "2026-05-30T20:00:00",
            offCode: "AUTUMN1404",
            discount: 25,
            badge: "🎁 هدیه ویژه",
            status: "active",
        },
        {
            id: "3",
            title: "نمایشگاه زمستانه",
            description: "محصولات زمستانه با کیفیت عالی",
            image: "/events/winter-exhibition.jpg",
            location: "مشهد",
            exactLocation: "مجتمع تجاری آفتاب، طبقه دوم",
            startDate: "2025-12-01T10:00:00",
            endDate: "2025-12-10T22:00:00",
            offCode: "WINTER1403",
            discount: 40,
            badge: "⭐ پرفروش‌ترین",
            status: "passed",
        },
        {
            id: "4",
            title: "نمایشگاه بهاره سال گذشته",
            description: "استقبال بی‌نظیر از محصولات جدید",
            image: "/events/last-spring.jpg",
            location: "شیراز",
            exactLocation: "باغ جنت، سالن هنر",
            startDate: "2025-04-15T10:00:00",
            endDate: "2025-04-20T22:00:00",
            offCode: "SPRING1403",
            discount: 20,
            badge: "✨ استقبال عالی",
            status: "passed",
        },
    ];
};

export async function GET() {
    try {
        // const response = await fetch('/api/shop/events',
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     });
        // const data = await response.json();

        const events = getEventsFromDB();

        // Update status based on current date
        const now = new Date();
        const eventsWithStatus = events.map(event => ({
            ...event,
            status: new Date(event.endDate) > now ? "active" : "passed"
        }));

        return NextResponse.json({ events: eventsWithStatus });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { events: [], error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}