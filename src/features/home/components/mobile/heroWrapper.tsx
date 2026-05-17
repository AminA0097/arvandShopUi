"use client";

import Hero from "./hero";
import SimpleBanner from "./simpleBanner";

import { HeroItem } from "../../type/heroItem";

type HeroResponse =
    | { type: "event"; payload: HeroItem }
    | { type: "banner"; payload: HeroItem };

type Props = {
    hero: HeroResponse | null;
};

export default function HeroWrapper({ hero }: Props) {
    if (!hero) return null;

    switch (hero.type) {
        case "event":
            return <Hero item={hero.payload} />;

        case "banner":
            return <SimpleBanner item={hero.payload} />;

        default:
            return null;
    }
}