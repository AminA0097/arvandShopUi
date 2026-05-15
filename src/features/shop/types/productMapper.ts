// features/shop/utils/productMapper.ts

import { Product, ProductTag } from "../types/productType";
import { CATEGORY_CONFIG, TYPE_LABELS, TAG_LABELS } from "../types/ProductQuery";

export interface ProductViewModel {
    id: string;
    name: string;
    title?: string;
    imgUrl: string;
    finalPrice: number;
    originalPrice: number;
    hasDiscount: boolean;
    discountPercent: number;
    isNew: boolean;
    isBestSeller: boolean;
    stock: number;
    views: number;
    category: string;
    categoryLabel: string;
    type: string;
    typeLabel: string;
    tags: string[];
    tagLabels: string[];
    isOutOfStock: boolean;
}

export function mapProductToViewModel(product: Product): ProductViewModel {
    const hasDiscount = product.discount > 0;
    const finalPrice = hasDiscount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    const categoryConfig = CATEGORY_CONFIG[product.category.name];
    const categoryLabel = categoryConfig?.label || product.category.name;

    const tags = product.tags.map((t) => t.name);
    const tagLabels = tags.map((tag) => TAG_LABELS[tag as ProductTag] || tag);

    return {
        id: product.id,
        name: product.name,
        title: product.title,
        imgUrl: product.imgUrl,
        finalPrice,
        originalPrice: product.price,
        hasDiscount,
        discountPercent: product.discount,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        stock: product.stock,
        views: product.views,
        category: product.category.name,
        categoryLabel,
        type: product.type,
        typeLabel: TYPE_LABELS[product.type] || product.type,
        tags,
        tagLabels,
        isOutOfStock: product.stock <= 0,
    };
}

export function mapProductsToViewModels(products: Product[]): ProductViewModel[] {
    return products.map(mapProductToViewModel);
}