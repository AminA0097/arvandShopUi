// features/shop/components/mobileFilterSheet.tsx
"use client";

import { X, SlidersHorizontal } from "lucide-react";
import SidebarContent from "./sideBarContent";
import { FilterState } from "@/features/shop/types/productType";
import { MainCategoryName, ProductType } from "@/features/shop/types/productType";

type Props = {
    open: boolean;
    onClose: () => void;
    filters: FilterState;
    onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    onClear: () => void;
    onApply: () => void;
    allowedTypes?: { value: ProductType; label: string }[];
    currentCategory?: MainCategoryName;
    showTypeFilter?: boolean;
};

export default function MobileFilterSheet({
                                              open,
                                              onClose,
                                              filters,
                                              onUpdate,
                                              onClear,
                                              onApply,
                                              allowedTypes,
                                              currentCategory,
                                              showTypeFilter = false,
                                          }: Props) {
    const filterCount =
        (filters.categories.length > 0 ? 1 : 0) +
        (showTypeFilter && filters.types.length > 0 ? 1 : 0) +
        (filters.stock !== "all" ? 1 : 0) +
        (filters.search.length > 0 ? 1 : 0) +
        (filters.minPrice > 0 ? 1 : 0) +
        (filters.maxPrice < 50_000_000 ? 1 : 0);

    if (!open) return null;

    return (
        <>
            {/* Backdrop - z-index بالاتر از فوتر */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
                onClick={onClose}
            />

            {/* Sheet - z-index بالاتر از فوتر */}
            <div
                className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[61] lg:hidden shadow-xl flex flex-col"
                style={{
                    animation: "slideInFromRight 0.3s ease-out",
                }}
            >
                <div className="flex items-center justify-between p-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18} className="text-stone-700" />
                        <h2 className="text-lg font-bold text-stone-800">فیلترها</h2>
                        {filterCount > 0 && (
                            <span className="text-xs bg-stone-800 text-white px-2 py-0.5 rounded-full">
                                {filterCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-stone-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 pb-24">
                    <SidebarContent
                        filters={filters}
                        update={onUpdate}
                        allowedTypes={allowedTypes}
                        currentCategory={currentCategory}
                        showTypeFilter={showTypeFilter}
                    />
                </div>

                {/* Footer با padding-bottom اضافی برای فاصله از فوتر موبایل */}
                <div className="p-4 border-t border-stone-100 bg-white">
                    <button
                        onClick={() => {
                            onApply();
                            onClose();
                        }}
                        className="w-full py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 transition-colors"
                    >
                        اعمال فیلتر
                        {filterCount > 0 && (
                            <span className="mr-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                                {filterCount}
                            </span>
                        )}
                    </button>

                    {filterCount > 0 && (
                        <button
                            onClick={() => {
                                onClear();
                                onClose();
                            }}
                            className="w-full mt-2 py-2.5 border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors text-sm"
                        >
                            حذف همه فیلترها
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
}