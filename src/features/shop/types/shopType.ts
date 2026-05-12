export type MainCategory =
    | "mens"
    | "womens"
    | "accessory";

export type ProductTag =
    | "bag"
    | "shoes"
    | "cloths"
    | "belt"
    | "hats"
    | "other";

export interface Product {
    id: string;

    name: string;

    title?: string;

    slug: string;

    price: number;

    discount: number;

    finalPrice: number;

    isNew: boolean;

    isBestSeller: boolean;

    stock: number;

    imgUrl: string;

    views: number;

    rank: number;

    createdAt: string;

    category: {
        id: string;

        name: MainCategory;
    };

    tags: {
        id: string;

        name: ProductTag;
    }[];
}