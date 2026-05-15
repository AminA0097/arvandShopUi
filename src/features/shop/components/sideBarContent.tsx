// features/shop/components/sideBarContent.tsx
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import MainCategoryDropdown from "./mainCategoryDropdown";
import TypeFilter from "./typeFilter";
import SortDropdown from "./sortDropdown";
import StockFilter from "./stockFilter";
import PriceSlider from "./priceSlider";
import { FilterState } from "@/features/shop/types/productType";
import { ProductType, MainCategoryName } from "@/features/shop/types/productType";
import { CATEGORY_CONFIG, TYPE_LABELS } from "@/features/shop/types/ProductQuery";

type Props = {
    filters: FilterState;
    update: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    allowedTypes: {
        value: ProductType;
        label: string;
    }[];
};

export default function SidebarContent({ filters, update, allowedTypes }: Props) {
    // State for dynamic allowed types based on selected category
    const [dynamicAllowedTypes, setDynamicAllowedTypes] = useState(allowedTypes);

    // Update dynamic allowed types when category changes
    useEffect(() => {
        const selectedCategory = filters.categories.length > 0 ? filters.categories[0] : null;

        if (selectedCategory) {
            // Get allowed types for the selected category
            const categoryTypes = CATEGORY_CONFIG[selectedCategory]?.allowedTypes || [];
            const newAllowedTypes = categoryTypes.map((type) => ({
                value: type,
                label: TYPE_LABELS?.[type] || type,
            }));
            setDynamicAllowedTypes(newAllowedTypes);
        } else {
            // No category selected, show all types
            setDynamicAllowedTypes(allowedTypes);
        }
    }, [filters.categories, allowedTypes]);

    const handleCategoryChange = (category: MainCategoryName | null) => {
        if (category) {
            // Get allowed types for the selected category
            const newAllowedTypes = CATEGORY_CONFIG[category].allowedTypes;
            // Clear selected types that are not available in new category
            const validTypes = filters.types.filter(type =>
                newAllowedTypes.includes(type as ProductType)
            );
            if (validTypes.length !== filters.types.length) {
                update("types", validTypes);
            }
        } else {
            update("types", []);
        }
    };

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

            {/* Main Category - Dropdown (single select) */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">دسته‌بندی اصلی</label>
                <MainCategoryDropdown
                    value={filters.categories}
                    onChange={(v) => update("categories", v)}
                    onCategoryChange={handleCategoryChange}
                />
            </div>

            {/* Product Type - Dynamic Multi-select */}
            <div>
                <label className="text-sm mb-2 block text-stone-700">نوع محصول</label>
                <TypeFilter
                    options={dynamicAllowedTypes}
                    value={filters.types}
                    onChange={(v) => update("types", v)}
                />
            </div>

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