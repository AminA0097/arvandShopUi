import ProductCard from "@/features/shop/components/productCard";
import {Product} from "@/features/shop/types/shopType";

const mockProduct2: Product = {
    id: "1",
    name: "کیف چرمی کلاسیک",
    title: "کیف دست‌دوز ایتالیایی",
    price: 500000,
    discount: 3,
    stock: 1,
    isNew: false,
    isBestSeller: true,
    imgUrl: "p1.jpg",
    views: 1200,
    rank: 1,
    createdAt: new Date().toISOString(),
    category: { id: "c1", name: "mens" },
    type: "bag",
    audience: "unisex",
    tags: [
        { id: "t2", name: "premium" }
    ],
}
export default function ShopPage() {
    return (
        <div className="p-10  min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard product={mockProduct2} index={0} />
        </div>
    );
}