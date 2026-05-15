// features/shop/components/mobileFilterSheet.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, Search } from "lucide-react";
import {FilterState, defaultFilters, CATEGORY_CONFIG, TYPE_LABELS} from "@/features/shop/types/ProductQuery";
import { SortType, ProductType, MainCategoryName } from "@/features/shop/types/productType";
import SortDropdown from "./sortDropdown";
import StockFilter from "./stockFilter";
import PriceSlider from "./priceSlider";
import TypeFilter from "./typeFilter";
import MainCategoryDropdown from "./mainCategoryDropdown";

interface Props {
    open: boolean;
    onClose: () => void;
    filters: FilterState;
    onUpdate: (key: keyof FilterState, value: any) => void;
    onClear: () => void;
    onApply: () => void;
    allowedTypes: { value: string; label: string }[];
}

export default function MobileFilterSheet({
                                              open,
                                              onClose,
                                              filters,
                                              onUpdate,
                                              onClear,
                                              onApply,
                                              allowedTypes,
                                          }: Props) {
    const [section, setSection] = useState<string | null>(null);

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

            // Filter out invalid types from current selection
            const validTypes = filters.types.filter((type) =>
                categoryTypes.includes(type as ProductType)
            );
            if (validTypes.length !== filters.types.length) {
                onUpdate("types", validTypes);
            }
        } else {
            // No category selected, show all types
            setDynamicAllowedTypes(allowedTypes);
        }
    }, [filters.categories, allowedTypes]);

    // Prevent body scroll when sheet is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [open]);

    const activeCount =
        filters.categories.length +
        (filters.types.length > 0 ? 1 : 0) +
        (filters.stock !== "all" ? 1 : 0) +
        (filters.sort !== "latest" ? 1 : 0) +
        (filters.search.length > 0 ? 1 : 0) +
        (filters.minPrice > defaultFilters.minPrice || filters.maxPrice < defaultFilters.maxPrice ? 1 : 0);

    const handleApply = () => {
        onApply();
        onClose();
    };

    const handleCategoryChange = (category: MainCategoryName | null) => {
        if (category) {
            // Get allowed types for the selected category
            const newAllowedTypes = CATEGORY_CONFIG[category].allowedTypes;
            // Clear selected types that are not available in new category
            const validTypes = filters.types.filter(type =>
                newAllowedTypes.includes(type as ProductType)
            );
            if (validTypes.length !== filters.types.length) {
                onUpdate("types", validTypes);
            }
        } else {
            onUpdate("types", []);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[9999]"
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[10000] bg-white rounded-t-3xl flex flex-col max-h-[85vh]"
                    >
                        {/* Drag handle */}
                        <div className="py-2 flex justify-center sticky top-0 bg-white z-10 rounded-t-3xl">
                            <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="flex justify-between items-center px-5 py-3 border-b border-stone-100">
                            <h2 className="font-semibold text-lg text-stone-800 font-shabnam">فیلترها</h2>
                            <button onClick={onClose} className="p-1">
                                <X size={20} className="text-stone-500" />
                            </button>
                        </div>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                            {/* Search Input */}
                            <div>
                                <label className="text-sm mb-2 block text-stone-700 font-shabnam">جستجو</label>
                                <div className="relative">
                                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={filters.search}
                                        onChange={(e) => onUpdate("search", e.target.value)}
                                        placeholder="جستجو محصول..."
                                        className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-400 focus:outline-none transition-colors font-shabnam text-sm"
                                    />
                                </div>
                            </div>

                            {/* Sort Section */}
                            <AccordionSection
                                title="مرتب‌سازی"
                                open={section === "sort"}
                                onToggle={() => setSection(section === "sort" ? null : "sort")}
                            >
                                <SortDropdown
                                    value={filters.sort}
                                    onChange={(v) => onUpdate("sort", v as SortType)}
                                />
                            </AccordionSection>

                            {/* Main Category Section - Dropdown */}
                            <AccordionSection
                                title="دسته‌بندی اصلی"
                                open={section === "mainCat"}
                                onToggle={() => setSection(section === "mainCat" ? null : "mainCat")}
                            >
                                <MainCategoryDropdown
                                    value={filters.categories}
                                    onChange={(v) => onUpdate("categories", v)}
                                    onCategoryChange={handleCategoryChange}
                                />
                            </AccordionSection>

                            {/* Product Type Section - Dynamic based on category */}
                            <AccordionSection
                                title="نوع محصول"
                                open={section === "type"}
                                onToggle={() => setSection(section === "type" ? null : "type")}
                            >
                                <TypeFilter
                                    options={dynamicAllowedTypes}
                                    value={filters.types}
                                    onChange={(v) => onUpdate("types", v)}
                                />
                            </AccordionSection>

                            {/* Stock Section */}
                            <AccordionSection
                                title="موجودی"
                                open={section === "stock"}
                                onToggle={() => setSection(section === "stock" ? null : "stock")}
                            >
                                <StockFilter
                                    value={filters.stock}
                                    onChange={(v) => onUpdate("stock", v)}
                                />
                            </AccordionSection>

                            {/* Price Section */}
                            <AccordionSection
                                title="قیمت"
                                open={section === "price"}
                                onToggle={() => setSection(section === "price" ? null : "price")}
                            >
                                <PriceSlider
                                    min={0}
                                    max={50_000_000}
                                    valueMin={filters.minPrice}
                                    valueMax={filters.maxPrice}
                                    onChange={(min, max) => {
                                        onUpdate("minPrice", min);
                                        onUpdate("maxPrice", max);
                                    }}
                                />
                            </AccordionSection>
                        </div>

                        {/* Footer buttons */}
                        <div className="border-t border-stone-100 p-4 pb-6 bg-white sticky bottom-0 z-10">
                            <div className="flex gap-2">
                                <button
                                    onClick={onClear}
                                    className="flex-1 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors font-shabnam"
                                >
                                    حذف همه
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="flex-[2] py-3 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors font-shabnam"
                                >
                                    اعمال
                                    <span className="font-tanha-fd"> ({activeCount}) </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function AccordionSection({
                              title,
                              open,
                              onToggle,
                              children,
                          }: {
    title: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="border border-stone-200 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center px-4 py-3 bg-stone-50 text-sm font-medium text-stone-700 hover:bg-stone-100 font-shabnam transition-colors"
            >
                {title}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} />
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-3">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}