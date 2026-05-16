"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from "./productCard";
import type { ProductViewModel } from "@/features/shop/types/productMapper";
import { toPersianNumbers } from "@/shared/lib/cn";

type Props = {
    products: ProductViewModel[];
    loading: boolean;
    loadingMore: boolean;
    loadMore: () => void;
    hasMore: boolean;
    total: number;
};

export default function ProductGrid({ products, loading, loadingMore, loadMore, hasMore, total }: Props) {
    const observerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!hasMore || loadingMore || loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore();
            },
            { threshold: 0.1, rootMargin: '100px' }
        );
        const current = observerRef.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, [hasMore, loadingMore, loading, loadMore]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-stone-50 rounded-xl h-[175px] animate-pulse">
                        <div className="flex p-3 gap-3">
                            <div className="w-24 h-24 bg-stone-200 rounded-lg"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-stone-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!loading && products.length === 0) {
        return (
            <div className="text-center py-20 text-stone-500 bg-stone-50 rounded-2xl">
                هیچ محصولی با این فیلترها یافت نشد.
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-5 text-sm text-stone-500">
                <span>{toPersianNumbers(total)} محصول</span>
            </div>

            {/* Grid with fixed max-width for desktop and responsive gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                {products.map((product, idx) => (
                    <div key={product.id} className="w-full max-w-[450px] sm:max-w-[450px]">
                        <ProductCard product={product} index={idx} />
                    </div>
                ))}
            </div>

            <div ref={observerRef} className="py-10 flex justify-center">
                {loadingMore && (
                    <div className="flex items-center gap-2 text-stone-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
                        <Loader2 size={16} className="animate-spin" />
                        در حال بارگذاری بیشتر...
                    </div>
                )}
            </div>

            {!hasMore && products.length > 0 && (
                <div className="text-center text-xs text-stone-400 py-6 border-t mt-4 pt-6">
                    به انتهای لیست رسیدید
                </div>
            )}
        </div>
    );
}