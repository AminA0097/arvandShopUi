// features/shop/types/ProductQuery.ts

import {
    MainCategoryName,
    ProductType,
    ProductTag,
    SortType,
    StockType,
    FilterState,
} from "./productType";

// Re-export for convenience
export type { SortType, StockType, FilterState };

/**
 * Type labels (UI only)
 */
export const TYPE_LABELS: Record<ProductType, string> = {
    bag: "کیف",
    shoes: "کفش",
    cloths: "لباس",
    belt: "کمربند",
    hats: "کلاه",
    wallet: "کیف پول",
    other: "سایر",
};

/**
 * Sort options labels
 */
export const SORT_LABELS: Record<SortType, string> = {
    latest: "جدیدترین",
    popular: "محبوب‌ترین",
    price_asc: "ارزان‌ترین",
    price_desc: "گران‌ترین",
};

/**
 * Stock filter labels
 */
export const STOCK_LABELS: Record<StockType, string> = {
    all: "همه",
    inStock: "موجود",
    outOfStock: "ناموجود",
};

/**
 * Tag labels (UI only)
 */
export const TAG_LABELS: Record<ProductTag, string> = {
    premium: "پیشنهادی",
    leather: "چرم",
    new: "جدید",
    hot: "داغ",
    summer: "تابستونی",
};

/**
 * Category config (single source of truth)
 */
export type CategoryConfig = {
    slug: string;
    label: string;
    description: string;
    image: string;
    allowedTypes: ProductType[];
};

export const CATEGORY_CONFIG: Record<MainCategoryName, CategoryConfig> = {
    mens: {
        slug: "mens",
        label: "مردانه",
        description: "بهترین محصولات مردانه",
        image: "/images/mens-category.jpg",
        allowedTypes: ["bag", "shoes", "cloths", "belt", "hats"],
    },
    womens: {
        slug: "womens",
        label: "زنانه",
        description: "بهترین محصولات زنانه",
        image: "/images/womens-category.jpg",
        allowedTypes: ["bag", "shoes", "cloths", "belt", "hats"],
    },
    accessory: {
        slug: "accessory",
        label: "اکسسوری",
        description: "اکسسوری‌های چرمی خاص",
        image: "/images/accessory-category.jpg",
        allowedTypes: ["belt", "wallet", "hats", "other"],
    },
};

/**
 * Derived UI list
 */
export const categories = Object.entries(CATEGORY_CONFIG).map(([name, config]) => ({
    name: name as MainCategoryName,
    ...config,
}));

/**
 * Routes helpers
 */
export const getCategoryRoute = (category: MainCategoryName) =>
    `/products/${CATEGORY_CONFIG[category].slug}`;

export const getCategoryTypeRoute = (category: MainCategoryName, type: ProductType) =>
    `/products/${CATEGORY_CONFIG[category].slug}/${type}`;

export const getProductRoute = (category: MainCategoryName, productId: string) =>
    `/products/${CATEGORY_CONFIG[category].slug}/${productId}`;

/**
 * Filter helpers
 */
export const buildQueryString = (filters: FilterState): string => {
    const params = new URLSearchParams();

    if (filters.sort && filters.sort !== "latest") {
        params.append("sort", filters.sort);
    }

    if (filters.categories.length > 0) {
        params.append("categories", filters.categories.join(","));
    }

    if (filters.stock && filters.stock !== "all") {
        params.append("stock", filters.stock);
    }

    if (filters.minPrice > 0) {
        params.append("minPrice", filters.minPrice.toString());
    }

    if (filters.maxPrice < 50_000_000) {
        params.append("maxPrice", filters.maxPrice.toString());
    }

    if (filters.search) {
        params.append("search", filters.search);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
};

export const parseFiltersFromSearchParams = (searchParams: URLSearchParams): Partial<FilterState> => {
    const filters: Partial<FilterState> = {};

    const sort = searchParams.get("sort") as SortType;
    if (sort && SORT_LABELS[sort]) filters.sort = sort;

    const categories = searchParams.get("categories");
    if (categories) filters.categories = categories.split(",") as ProductType[];

    const stock = searchParams.get("stock") as StockType;
    if (stock && STOCK_LABELS[stock]) filters.stock = stock;

    const minPrice = searchParams.get("minPrice");
    if (minPrice) filters.minPrice = parseInt(minPrice);

    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);

    const search = searchParams.get("search");
    if (search) filters.search = search;

    return filters;
};
export const defaultFilters: FilterState = {
    sort: "latest" as SortType,
    categories: [],
    stock: "all" as StockType,
    minPrice: 0,
    maxPrice: 50_000_000,
    search: "",
};