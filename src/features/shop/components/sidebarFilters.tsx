// features/shop/components/sidebarFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import SidebarContent from "./sideBarContent";
import MobileFilterSheet from "./mobileFilterSheet";
import { FilterState, defaultFilters } from "@/features/shop/types/ProductQuery";

type Props = {
    allowedTypes: {
        value: string;
        label: string;
    }[];
    initialFilters?: Partial<FilterState>;
};

export default function SidebarFilters({
                                           allowedTypes,
                                           initialFilters
                                       }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        ...defaultFilters,
        ...initialFilters,
    });

    // Update filters when URL params change
    useEffect(() => {
        if (initialFilters) {
            setFilters(prev => ({
                ...prev,
                ...initialFilters,
            }));
        }
    }, [initialFilters]);

    const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        const clearedFilters = { ...defaultFilters };
        setFilters(clearedFilters);
        router.push(pathname);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (filters.sort !== "latest") {
            params.append("sort", filters.sort);
        }

        if (filters.stock !== "all") {
            params.append("stock", filters.stock);
        }

        if (filters.search) {
            params.append("search", filters.search);
        }

        if (filters.minPrice > 0) {
            params.append("minPrice", filters.minPrice.toString());
        }

        if (filters.maxPrice < 50_000_000) {
            params.append("maxPrice", filters.maxPrice.toString());
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newUrl);
    };

    const filterCount =
        (filters.categories.length > 0 ? 1 : 0) +
        (filters.types.length > 0 ? 1 : 0) +
        (filters.stock !== "all" ? 1 : 0) +
        (filters.search.length > 0 ? 1 : 0) +
        (filters.minPrice > defaultFilters.minPrice ? 1 : 0) +
        (filters.maxPrice < defaultFilters.maxPrice ? 1 : 0);

    return (
        <>
            {/* Mobile trigger button */}
            <div className="lg:hidden mb-4 sticky top-0 bg-[#f7f5f3] z-20 py-2">
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-stone-200 rounded-xl bg-white shadow-sm active:scale-95 transition-transform"
                >
                    <SlidersHorizontal size={18} />
                    <span className="font-medium">فیلترها</span>
                    {filterCount > 0 && (
                        <span className="text-xs bg-stone-800 text-white px-2 py-0.5 rounded-full">
                            {filterCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Desktop Sidebar - با قابلیت اسکرول */}
            <div className="hidden lg:block sticky top-24">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col max-h-[calc(100vh-120px)]">
                    {/* Header - sticky */}
                    <div className="flex justify-between items-center p-5 pb-3 border-b border-stone-100 sticky top-0 bg-white rounded-t-2xl z-10">
                        <h3 className="font-bold text-stone-800">فیلترها</h3>
                        {filterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-red-500 hover:text-red-600 transition-colors"
                            >
                                حذف همه
                            </button>
                        )}
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        <SidebarContent
                            filters={filters}
                            update={update}
                            allowedTypes={allowedTypes}
                        />
                    </div>

                    {/* Footer - sticky */}
                    <div className="p-5 pt-3 border-t border-stone-100 sticky bottom-0 bg-white rounded-b-2xl">
                        <button
                            onClick={applyFilters}
                            className="w-full py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 transition-colors"
                        >
                            اعمال فیلتر
                            {filterCount > 0 && (
                                <span className="mr-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                                    {filterCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sheet */}
            <MobileFilterSheet
                open={open}
                onClose={() => setOpen(false)}
                filters={filters}
                onUpdate={update}
                onClear={clearFilters}
                onApply={applyFilters}
                allowedTypes={allowedTypes}
            />
        </>
    );
}