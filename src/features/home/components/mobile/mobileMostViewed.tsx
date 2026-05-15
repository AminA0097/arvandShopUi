"use client";

import HomeProductSlider from "./homeProductSlider";
import { mostViewedProducts } from "./mock";

export default function MobileMostViewed() {
    return (
        <HomeProductSlider
            title="پربازدیدترین‌ها"
            href="/products/most-viewed"
            products={mostViewedProducts}
        />
    );
}