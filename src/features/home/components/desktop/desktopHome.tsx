// features/home/components/desktop/desktopHome.tsx

import DesktopHero from "./desktopHero";
import DesktopCategories from "./desktopCategories";
// import DesktopNewsSection from "./desktopNewsSection";
// import DesktopMostViewed from "./desktopMostViewed";
import DesktopInfoSection from "./dekstopInfo";

const slides = [
    {
        id: 1,
        title: "رویداد اختصاصی چرم آروند در اقدسیه",
        description:
            "تجربه‌ای متفاوت از کالکشن جدید محصولات چرمی با تخفیف ویژه و معرفی طراحی‌های جدید فصل.",
        backgroundImage: "/images/accessory-categories.jpg",
        floatingImage:null,
        badge: "📍 رویداد حضوری ویژه",
        coupon: "AGHDASIEH25",
        location: "تهران • اقدسیه",
        date: "۲۵ تا ۲۸ خرداد",
        href: "/events/aghdasieh",
        button: null,
        duration:8000
    },
    {
        id: 2,
        title: "کالکشن جدید چرم طبیعی آروند",
        description:
            "طراحی‌های مدرن با چرم طبیعی درجه یک، ترکیب ظرافت و دوام برای استایل روزمره و رسمی.",
        backgroundImage: "/images/accessory-categories.jpg",
        floatingImage:null,
        badge: "✨ New Collection",
        coupon: "ARVAND25",
        location: "فروشگاه آنلاین + شعب منتخب",
        date: "تابستان ۱۴۰۵",
        href: "/products/new-arrivals",
        button: "مشاهده کالکشن",
        duration:4000
    },
    {
        id: 3,
        title: "حراج بزرگ تابستانی",
        description:
            "تا ۴۰٪ تخفیف برای کیف، کفش و اکسسوری‌های منتخب. فرصت محدود برای ارتقای استایل.",
        backgroundImage: "/images/accessory-categories.jpg",
        floatingImage:null,
        badge: "🔥 Summer Sale",
        coupon: "SUMMER40",
        location: "فقط فروشگاه آنلاین",
        date: "تا پایان مرداد",
        href: "/products/sale",
        button: "مشاهده تخفیف‌ها",
        duration:4000
    },
    {
        id: 4,
        title: "کفش‌های رسمی مردانه نسل جدید",
        description:
            "ترکیب راحتی، دوام و استایل کلاسیک با چرم طبیعی و طراحی ارگونومیک.",
        backgroundImage: "/images/accessory-categories.jpg",
        floatingImage:null,
        badge: "👞 Men Collection",
        coupon: "FORMAL15",
        location: "آنلاین + شعب منتخب",
        date: "موجودی محدود",
        href: "/products/mensoes",
        button: "خرید کفش",
        duration:4000
    },
    {
        id: 5,
        title: "اکسسوری‌های چرمی لوکس",
        description:
            "کمربند، کیف پول و اکسسوری‌های خاص برای استایل حرفه‌ای و مینیمال.",
        backgroundImage: "/images/accessory-categories.jpg",
        floatingImage:null,
        badge: "💼 Luxury Accessories",
        coupon: "LUX10",
        location: "آنلاین",
        date: "موجودی محدود",
        href: "/products/accessories",
        button: "مشاهده محصولات",
        duration:4000
    },
];



export default function DesktopHome() {
    return (
        <div className="hidden lg:block bg-[var(--bg)]">
            <DesktopHero items={slides}/>

            <main className="mx-auto max-w-7xl space-y-14 px-6 py-10">
                <DesktopCategories />
                {/**/}
                {/*<DesktopNewsSection />*/}
                {/**/}
                {/*<DesktopMostViewed />*/}

                <DesktopInfoSection />
            </main>
        </div>
    );
}