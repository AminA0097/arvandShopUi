// features/shop/components/sidebar/filters/SortDropdown.tsx

"use client";

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

export default function SortDropdown({
                                         value,
                                         onChange,
                                     }: Props) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="
                w-full
                rounded-2xl
                border
                border-[var(--border)]
                px-4
                py-3
                bg-[var(--bg)]
                font-shabnam
            "
        >
            {OPTIONS.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}