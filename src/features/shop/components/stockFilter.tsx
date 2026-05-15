// features/shop/components/sidebar/filters/StockFilter.tsx

"use client";

const OPTIONS = [
    {
        value: "all",
        label: "همه",
    },
    {
        value: "inStock",
        label: "موجود",
    },
    {
        value: "outOfStock",
        label: "ناموجود",
    },
];

interface Props {
    value: string;

    onChange: (value: string) => void;
}

export default function StockFilter({
                                        value,
                                        onChange,
                                    }: Props) {
    return (
        <div className="space-y-3">
            {OPTIONS.map((item) => (
                <label
                    key={item.value}
                    className="
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                        font-shabnam
                    "
                >
                    <input
                        type="radio"
                        checked={value === item.value}
                        onChange={() =>
                            onChange(item.value)
                        }
                    />

                    <span>{item.label}</span>
                </label>
            ))}
        </div>
    );
}