// features/shop/components/sidebar/filters/PriceSlider.tsx

"use client";

import { formatPrice } from "@/shared/lib/cn";

interface Props {
    min: number;

    max: number;

    valueMin: number;

    valueMax: number;

    onChange: (
        min: number,
        max: number
    ) => void;
}

export default function PriceSlider({
                                        min,
                                        max,
                                        valueMin,
                                        valueMax,
                                        onChange,
                                    }: Props) {
    return (
        <div className="space-y-4">
            <input
                type="range"
                min={min}
                max={max}
                value={valueMax}
                onChange={(e) =>
                    onChange(
                        valueMin,
                        Number(e.target.value)
                    )
                }
                className="w-full"
            />

            <div
                className="
                    flex
                    justify-between
                    text-xs
                    font-shabnam
                "
            >
                <span>
                    {formatPrice(valueMin)}
                </span>

                <span>
                    {formatPrice(valueMax)}
                </span>
            </div>
        </div>
    );
}