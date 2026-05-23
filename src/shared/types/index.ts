export type MainCategoryName  = "men" | "women" | "accessory" | "careTools";
export type ProductType = "bag" | "shoes" | "cloths" | "belt" | "hats" | "wallet" | "other" | "shoesWax";
export type Audience = "mens" | "women" | "unisex";
export type ProductTag = "premium" | "leather" | "new" | "hot" | "summer";
export type SortType = "latest" | "popular" | "price_asc" | "price_desc";
export type StockType = "all" | "inStock" | "outOfStock";

export interface MainCategory {
    id: string;
    name: MainCategoryName;
}

export interface Tag {
    id: string;
    name: ProductTag;
}

export interface Audiences {
    id: string;
    name: Audience;
}

export interface Product {
    id: string;
    name: string;
    title?: string;

}
export interface FilterState {
    sort: SortType;
    categories: MainCategoryName[];
    types: ProductType[];
    stock: StockType;
    minPrice: number;
    maxPrice: number;
    search: string;
}
export const defaultFilters: FilterState = {
    sort: "latest",
    categories: [],
    types: [],
    stock: "all",
    minPrice: 0,
    maxPrice: 50_000_000,
    search: "",
};