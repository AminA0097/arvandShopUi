// features/shop/components/productGrid.tsx
"use client";

import ProductCard from "./productCard";
import type { ProductViewModel } from "@/features/shop/types/productMapper";

type Props = {
    products: ProductViewModel[];
};

export default function ProductGrid({ products }: Props) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-stone-500">محصولی یافت نشد</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr">
            {products.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
            ))}
        </div>
    );
}