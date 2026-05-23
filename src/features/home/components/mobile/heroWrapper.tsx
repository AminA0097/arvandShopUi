"use client";

import MobileHeroSlider from "./mobileHeroSlider";

type BannerItem = {
    id: string;
    title: string;
    description?: string | null;
    backgroundImage: string;
    href?: string | null;
    btnText?: string | null;
    badge?: string | null;
};

type Props = {
    banners: BannerItem[];
};

export default function HeroWrapper({ banners }: Props) {
    if (!banners || banners.length === 0) return null;

    return <MobileHeroSlider banners={banners} autoPlayInterval={5000} />;
}