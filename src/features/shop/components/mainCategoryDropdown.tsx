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
    const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number }>({
        top: 0,
        left: 0,
        width: 0,
    });

    const categories = Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
        value: key as MainCategoryName,
        label: config.label,
    }));

    const selectedCategory = value.length > 0 ? value[0] : null;
    const selectedLabel = selectedCategory
        ? CATEGORY_CONFIG[selectedCategory].label
        : "همه دسته‌ها";

    // محاسبه موقعیت dropdown با fixed positioning - همیشه زیر دکمه
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 280;

            let top: number;
            // همیشه سعی کن زیر دکمه باز شود، فقط اگر فضای کافی نبود بالا باز شو
            if (spaceBelow >= dropdownHeight) {
                // باز شدن به سمت پایین
                top = rect.bottom + 8;
            } else {
                // فضای پایین کم است، به سمت بالا باز شو
                top = rect.top - dropdownHeight - 8;
            }

            setDropdownStyle({
                top: top,
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Close on escape key
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
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
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-right font-shabnam hover:border-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9a8174]/20"
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
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="fixed z-[9999]"
                        style={{
                            top: dropdownStyle.top,
                            left: dropdownStyle.left,
                            width: dropdownStyle.width,
                        }}
                    >
                        <div className="bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
                            <div className="py-2 max-h-[280px] overflow-y-auto">
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}