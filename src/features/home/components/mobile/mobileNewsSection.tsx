"use client";

import { newestProducts } from "./mock";
import HomeSliderSection from "./homeProductSlider";

export default function MobileNewsSection() {
    return (
        <HomeSliderSection
            title="جدیدترین‌ها"
            href="/products/new"
            products={newestProducts}
        />
    );
}