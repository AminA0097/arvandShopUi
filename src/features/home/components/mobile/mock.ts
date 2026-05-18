import {SharedProduct} from "@/features/home/components/mobile/productCard";

const newProducts: SharedProduct[] = [
    {
        id: "new-1",
        name: "محصول جدید ۱",
        price: 250000,
        image: "/products/accessory-1.jpg",
        href: "/product/new-1"
    },
    {
        id: "new-2",
        title: "محصول تازه وارد", // Using title instead of name
        price: 320000,
        oldPrice: 450000,
        image: "/products/accessory-1.jpg",
        href: "/product/new-2"
    },
    {
        id: "new-3",
        name: "محصول جدید ۳",
        price: 189000,
        image: "/products/accessory-1.jpg"
        // href is missing - will use fallback
    }
];

// Sample data for MOST VIEWED products
const mostViewedProducts: SharedProduct[] = [
    {
        id: "viewed-1",
        name: "پرفروش‌ترین ۱",
        price: 450000,
        image: "/products/accessory-1.jpg",
        href: "/product/trending-1"
    },
    {
        id: "viewed-2",
        name: "محبوب ۲",
        price: 890000,
        oldPrice: 1200000,
        discount: 26,
        image: "/products/accessory-1.jpg",
        href: "/product/trending-2"
    }
    // Some products might be null/undefined
];

// Sample data for DEALS (with missing fields)
const dealProducts: SharedProduct[] = [
    {
        id: "deal-1",
        name: "کیف شماره سه",
        price: 99000,
        oldPrice: 299000,
        image: "/products/bag-1.jpg",
        href: "/product/deal-1"
    },
    {
        id: "deal-2",
        name : "کیف شماره دو",
        price: 149000,
        oldPrice: 499000,
        image: "/products/bag-2.jpg"
        // href is missing - will use fallback
    },
    null as any, // Invalid product - will be filtered out
    {
        id: "deal-3",
        name: "کیف شماره یک",
        price: 199000,
        oldPrice: 790000,
        discount: 75,
        image: "/products/bag-3.jpg",
        href: "/product/deal-3"
    }
];

export {dealProducts, mostViewedProducts , newProducts};