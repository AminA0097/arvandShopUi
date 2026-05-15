// features/shop/components/mainCategoryDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_CONFIG } from "@/features/shop/types/ProductQuery";
import type { MainCategoryName } from "@/features/shop/types/productType";

interface Props {
    value: MainCategoryName[];
    onChange: (value: MainCategoryName[]) => void;
    onCategoryChange?: (category: MainCategoryName | null) => void;
}

export default function MainCategoryDropdown({ value, onChange, onCategoryChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");

    const categories = Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
        value: key as MainCategoryName,
        label: config.label,
    }));

    const selectedCategory = value.length > 0 ? value[0] : null;
    const selectedLabel = selectedCategory
        ? CATEGORY_CONFIG[selectedCategory].label
        : "همه دسته‌ها";

    // محاسبه موقعیت dropdown در موبایل
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 300; // ارتفاع تخمینی dropdown

            if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
                setDropdownPosition("top");
            } else {
                setDropdownPosition("bottom");
            }
        }
    }, [isOpen]);

    const handleSelect = (category: MainCategoryName | null) => {
        if (category === null) {
            onChange([]);
            onCategoryChange?.(null);
        } else {
            onChange([category]);
            onCategoryChange?.(category);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-right font-shabnam hover:border-stone-400 transition-colors"
            >
                <span className={selectedCategory ? "text-stone-800" : "text-stone-400"}>
                    {selectedLabel}
                </span>
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <div
                            className="fixed inset-0 z-40 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`
                                absolute left-0 right-0 z-50
                                bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden
                                ${dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"}
                            `}
                            style={{ maxHeight: "250px", overflowY: "auto" }}
                        >
                            <div className="py-2">
                                {/* All option */}
                                <button
                                    onClick={() => handleSelect(null)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors text-right font-shabnam"
                                >
                                    <span className={!selectedCategory ? "text-[#9a8174] font-medium" : "text-stone-600"}>
                                        همه دسته‌ها
                                    </span>
                                    {!selectedCategory && <Check size={16} className="text-[#9a8174]" />}
                                </button>

                                {/* Divider */}
                                <div className="border-t border-stone-100 my-1" />

                                {/* Category options */}
                                {categories.map((category) => (
                                    <button
                                        key={category.value}
                                        onClick={() => handleSelect(category.value)}
                                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors text-right font-shabnam"
                                    >
                                        <span className={selectedCategory === category.value ? "text-[#9a8174] font-medium" : "text-stone-600"}>
                                            {category.label}
                                        </span>
                                        {selectedCategory === category.value && <Check size={16} className="text-[#9a8174]" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}