// features/shop/types/productType.ts

export type MainCategoryName = "mens" | "women" | "accessory";
export type StockType = "all" | "inStock" | "outOfStock";
export type ProductType = "bag" | "shoes" | "cloths" | "belt" | "hats" | "wallet" | "other";
export type Audience = "mens" | "women" | "unisex";
export type ProductTag = "premium" | "leather" | "new" | "hot" | "summer";
export type SortType = "latest" | "popular" | "price_asc" | "price_desc";

export interface MainCategory {
    id: string;
    name: MainCategoryName;
}

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

// Filter State Type
// features/shop/types/productType.ts

// ... existing types ...

export interface FilterState {
    sort: SortType;
    categories: MainCategoryName[]; // فقط یک آیتم (اولین آیتم)
    types: ProductType[]; // چند آیتم می‌تونه داشته باشه
    stock: StockType;
    minPrice: number;
    maxPrice: number;
    search: string;
}

export const defaultFilters: FilterState = {
    sort: "latest",
    categories: [], // خالی به معنی "همه دسته‌ها"
    types: [],
    stock: "all",
    minPrice: 0,
    maxPrice: 50_000_000,
    search: "",
};