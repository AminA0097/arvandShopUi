// features/shop/components/sortDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OPTIONS = [
    {
        value: "latest",
        label: "جدیدترین",
    },
    {
        value: "popular",
        label: "محبوب‌ترین",
    },
    {
        value: "price_asc",
        label: "ارزان‌ترین",
    },
    {
        value: "price_desc",
        label: "گران‌ترین",
    },
];

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number }>({
        top: 0,
        left: 0,
        width: 0,
    });

    const selectedLabel = OPTIONS.find(opt => opt.value === value)?.label || "جدیدترین";

    // محاسبه موقعیت dropdown با fixed positioning
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 220; // ارتفاع تقریبی dropdown

            let top: number;
            if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
                // باز شدن به سمت بالا
                top = rect.top - dropdownHeight - 8;
            } else {
                // باز شدن به سمت پایین
                top = rect.bottom + 8;
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

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-right font-shabnam hover:border-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9a8174]/20"
            >
                <span className="text-stone-800">
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
                            <div className="py-2 max-h-[220px] overflow-y-auto">
                                {OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors text-right font-shabnam"
                                    >
                                        <span className={value === option.value ? "text-[#9a8174] font-medium" : "text-stone-600"}>
                                            {option.label}
                                        </span>
                                        {value === option.value && <Check size={16} className="text-[#9a8174]" />}
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