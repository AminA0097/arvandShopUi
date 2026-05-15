// features/shop/components/sidebar/filters/MainCategoryFilter.tsx
"use client";

import { CATEGORY_CONFIG } from "@/features/shop/types/ProductQuery";
import type { MainCategoryName } from "@/features/shop/types/productType";

interface Props {
    value: MainCategoryName[];
    onChange: (value: MainCategoryName[]) => void;
}

export default function MainCategoryFilter({ value, onChange }: Props) {
    const categories = Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
        value: key as MainCategoryName,
        label: config.label,
    }));

    const toggleCategory = (category: MainCategoryName) => {
        if (value.includes(category)) {
            onChange(value.filter((v) => v !== category));
        } else {
            onChange([...value, category]);
        }
    };

    return (
        <div className="space-y-3">
            {categories.map((category) => (
                <label
                    key={category.value}
                    className="flex items-center gap-3 cursor-pointer font-shabnam"
                >
                    <input
                        type="checkbox"
                        checked={value.includes(category.value)}
                        onChange={() => toggleCategory(category.value)}
                        className="w-4 h-4"
                    />
                    <span className={value.includes(category.value) ? "text-[#9a8174] font-medium" : ""}>
                        {category.label}
                    </span>
                </label>
            ))}
        </div>
    );
}