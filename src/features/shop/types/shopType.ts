import {string} from "zod";

export type MainCategoryNames =
    | "mens"
    | "womens"
    | "accessory";

export const categoryLabels: Record<MainCategoryNames, string> = {
    mens: 'مردانه',
    womens: 'زنانه',
    accessory: 'اکسسوری',
};
export const tagLabels: Record<string, string> = {
     premium : "پیشمهاد",
     leather : "چرم",
     new : "جدید",
     hot : "داغ",
     summer : "تابستونی"
};
export interface MainCategory  {
    id: string;
    name: MainCategoryNames;
}

export type ProductType =
    | "bag"
    | "shoes"
    | "cloths"
    | "belt"
    | "hats"
    | "other";

export type Audience =
    | "mens"
    | "womens"
    | "unisex";

export type ProductTag =
    | "premium"
    | "leather"
    | "new"
    | "hot"
    | "summer";
export interface Tag {
    id: string;
    name: ProductTag;
}
export interface Product {
    id: string;

    name: string;
    title?: string;

    price: number;
    discount: number;

    stock: number;

    isNew: boolean;
    isBestSeller: boolean;

    imgUrl: string;

    views: number;
    rank: number;

    createdAt: string;

    category: MainCategory;
    type: ProductType;
    audience: Audience;
    tags: Tag[];
}