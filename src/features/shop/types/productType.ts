import { Product } from "./shopType";

export type ProductViewModel = {
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
    type: string;

    tags: string[];

    isOutOfStock: boolean;
};
export function mapProductToViewModel(
    product: Product
): ProductViewModel {
    const hasDiscount = product.discount > 0;

    const finalPrice = hasDiscount
        ? product.price -
        (product.price * product.discount) / 100
        : product.price;

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
        type: product.type,
        tags: product.tags.map((t) => t.name),

        isOutOfStock: product.stock <= 0,
    };
}