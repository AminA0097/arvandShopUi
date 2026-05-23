// features/shop/components/sideBarContent.tsx
"use client";

import { Search } from "lucide-react";
import SortDropdown from "./sortDropdown";
import StockFilter from "./stockFilter";
import PriceSlider from "./priceSlider";
import TypeFilter from "./typeFilter";
import { FilterState } from "@/features/shop/types/productType";
import { MainCategoryName, ProductType } from "@/features/shop/types/productType";

type Props = {
    filters: FilterState;
    update: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    allowedTypes?: { value: ProductType; label: string }[];
    currentCategory?: MainCategoryName;
    showTypeFilter?: boolean;
};

export default function SidebarContent({
                                           filters,
                                           update,
                                           allowedTypes,
                                           currentCategory,
                                           showTypeFilter = false
                                       }: Props) {
    return (
        <div className="space-y-6 font-shabnam">
            {/* Search */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">جستجو</label>
                <div className="relative">
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={filters.search}
                        onChange={(e) => update("search", e.target.value)}
                        placeholder="جستجو محصول..."
                        className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors font-shabnam text-sm"
                    />
                </div>
            </div>

            {/* Sort */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">مرتب‌سازی</label>
                <SortDropdown value={filters.sort} onChange={(v) => update("sort", v)} />
            </div>

            {/* Product Type Filter - فقط در صفحه اصلی categories نشان داده شود */}
            {showTypeFilter && allowedTypes && allowedTypes.length > 0 && (
                <div>
                    <label className="text-sm mb-2 block text-stone-700">نوع دسته‌بندی</label>
                    <TypeFilter
                        options={allowedTypes}
                        value={filters.types}
                        onChange={(v) => update("types", v)}
                    />
                </div>
            )}

            {/* Stock */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">موجودی</label>
                <StockFilter value={filters.stock} onChange={(v) => update("stock", v)} />
            </div>

            {/* Price */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">قیمت</label>
                <PriceSlider
                    min={0}
                    max={50_000_000}
                    valueMin={filters.minPrice}
                    valueMax={filters.maxPrice}
                    onChange={(min, max) => {
                        update("minPrice", min);
                        update("maxPrice", max);
                    }}
                />
            </div>
        </div>
    );
}