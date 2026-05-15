// features/shop/components/typeFilter.tsx
"use client";

import { ProductType } from "@/features/shop/types/productType";

type Props = {
    options: { value: ProductType; label: string }[];
    value: ProductType[];
    onChange: (value: ProductType[]) => void;
};

export default function TypeFilter({ options, value, onChange }: Props) {
    const toggleType = (typeValue: ProductType) => {
        if (value.includes(typeValue)) {
            onChange(value.filter((v) => v !== typeValue));
        } else {
            onChange([...value, typeValue]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => toggleType(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${
                        value.includes(option.value)
                            ? "bg-stone-800 text-white"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }
                    `}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}