"use client";

import { mostViewedProducts } from "./mock";
import HomeSliderSection from "./homeProductSlider";

export default function MobileMostViewed() {
    return (
        <HomeSliderSection
            title="پربازدیدترین‌ها"
            href="/products/most-viewed"
            products={mostViewedProducts}
            icon="view"
        />

    );
}