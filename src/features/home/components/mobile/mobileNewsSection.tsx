"use client";

import { newProducts } from "./mock";
import HomeSliderSection from "./homeProductSlider";

export default function MobileNewsSection() {
    return (
        <HomeSliderSection
            title="جدیدترین‌ها"
            href="/products/new"
            products={newProducts}
            icon="new"
        />

    );
}