// app/(shop)/products/[categoryname]/[typename]/page.tsx
import { notFound } from "next/navigation";
import { CATEGORY_CONFIG, TYPE_LABELS } from "@/features/shop/types/ProductQuery";
import SidebarFilters from "@/features/shop/components/sidebarFilters";
import ProductGrid from "@/features/shop/components/productGrid";
import { mapProductsToViewModels } from "@/features/shop/types/productMapper";
import type { Product, ProductType } from "@/features/shop/types/productType";

type Props = {
    params: Promise<{
        categoryname: string;
        typename: string;
    }>;
    searchParams: Promise<{
        sort?: string;
        stock?: string;
        search?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
};

async function getProducts(category: string, type: ProductType): Promise<Product[]> {
    // Mock products - replace with your API call
    return Array.from({ length: 8 }, (_, i) => ({
        id: `${category}-${type}-${i + 1}`,
        name: `محصول ${i + 1}`,
        title: `عنوان محصول ${i + 1}`,
        price: 120000 + (i * 10000),
        discount: i % 3 === 0 ? 10 : 0,
        stock: i % 5 === 0 ? 0 : 5,
        isNew: i % 4 === 0,
        isBestSeller: i % 6 === 0,
        imgUrl: "/images/mens-categories.jpg",
        views: Math.floor(Math.random() * 1000),
        rank: i + 1,
        createdAt: new Date().toISOString(),
        category: { id: category, name: category as any },
        type: type,
        audience: "unisex",
        tags: i % 2 === 0 ? [{ id: "t1", name: "premium" as const }] : [],
    }));
}

export default async function CategoryTypePage({ params, searchParams }: Props) {
    const { categoryname, typename } = await params;
    const { sort, stock, search, minPrice, maxPrice } = await searchParams;

    const category = CATEGORY_CONFIG[categoryname as keyof typeof CATEGORY_CONFIG];

    if (!category) {
        notFound();
    }

    // Check if the type is valid for this categories
    const isValidType = category.allowedTypes.includes(typename as ProductType);
    if (!isValidType) {
        notFound();
    }

    const products = await getProducts(categoryname, typename as ProductType);
    const productViewModels = mapProductsToViewModels(products);

    const initialFilters = {
        sort: (sort as any) || "latest",
        categories: [categoryname],
        types: [typename as ProductType], // Pre-select the type from URL
        stock: (stock as any) || "all",
        minPrice: minPrice ? parseInt(minPrice) : 0,
        maxPrice: maxPrice ? parseInt(maxPrice) : 50_000_000,
        search: search || "",
    };

    const typeLabel = TYPE_LABELS[typename as ProductType];

    return (
        <div className="container mx-auto px-4 py-6 lg:py-10">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="lg:order-2 lg:w-80 xl:w-96">
                    <SidebarFilters
                        initialFilters={initialFilters}
                        showTypeFilter={false} // مخفی کردن نوع دسته‌بندی
                        // allowedTypes و currentCategory ارسال نمی‌شوند
                    />
                </div>

                <div className="flex-1 lg:order-1">
                    <div className="mb-6">
                        <h1 className="text-2xl lg:text-3xl font-bold font-shabnam text-stone-800">
                            {category.label} - {typeLabel}
                        </h1>
                        <p className="text-stone-500 mt-1 font-shabnam">
                            {category.description} - {typeLabel}
                        </p>
                    </div>

                    <div className="mb-4 text-sm text-stone-500 font-tanha-fd">
                        {productViewModels.length} <span className="font-shabnam">محصول</span>
                    </div>

                    <ProductGrid products={productViewModels} />
                </div>
            </div>
        </div>
    );
}