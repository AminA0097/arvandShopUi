// features/shop/components/sidebar/filters/TypeFilter.tsx
"use client";

interface Props {
    options: {
        value: string;
        label: string;
    }[];
    value: string[];
    onChange: (value: string[]) => void;
}

export default function TypeFilter({ options, value, onChange }: Props) {
    const toggleType = (type: string) => {
        if (value.includes(type)) {
            onChange(value.filter((v) => v !== type));
        } else {
            onChange([...value, type]);
        }
    };

    if (options.length === 0) {
        return (
            <div className="text-center py-4 text-stone-400 text-sm">
                هیچ نوع محصولی موجود نیست
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* Select All / Clear All buttons */}
            {options.length > 1 && (
                <div className="flex gap-2 mb-3 pb-2 border-b border-stone-100">
                    <button
                        onClick={() => onChange(options.map(opt => opt.value))}
                        className="text-xs text-[#9a8174] hover:underline"
                    >
                        انتخاب همه
                    </button>
                    <span className="text-stone-300">|</span>
                    <button
                        onClick={() => onChange([])}
                        className="text-xs text-stone-400 hover:underline"
                    >
                        حذف همه
                    </button>
                </div>
            )}

            {/* Options */}
            {options.map((item) => (
                <label
                    key={item.value}
                    className="flex items-center gap-3 cursor-pointer font-shabnam p-2 hover:bg-stone-50 rounded-lg transition-colors"
                >
                    <input
                        type="checkbox"
                        checked={value.includes(item.value)}
                        onChange={() => toggleType(item.value)}
                        className="w-4 h-4 rounded border-stone-300 text-[#9a8174] focus:ring-[#9a8174]"
                    />
                    <span className={value.includes(item.value) ? "text-[#9a8174] font-medium" : "text-stone-600"}>
                        {item.label}
                    </span>
                </label>
            ))}
        </div>
    );
}