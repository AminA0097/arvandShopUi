// app/(shop)/products/[categoryname]/page.tsx
import { notFound } from "next/navigation";
import { CATEGORY_CONFIG, TYPE_LABELS } from "@/features/shop/types/ProductQuery";
import SidebarFilters from "@/features/shop/components/sidebarFilters";
import ProductGrid from "@/features/shop/components/productGrid";
import { mapProductsToViewModels } from "@/features/shop/types/productMapper";
import type { Product, ProductType } from "@/features/shop/types/productType";

type Props = {
    params: Promise<{
        categoryname: string;
    }>;
    searchParams: Promise<{
        sort?: string;
        stock?: string;
        search?: string;
        minPrice?: string;
        maxPrice?: string;
        types?: string; // اضافه شد برای فیلتر نوع
    }>;
};

async function getProducts(category: string, typeFilter?: string[]): Promise<Product[]> {
    // Mock products - replace with your API call
    let products = Array.from({ length: 12 }, (_, i) => ({
        id: `${category}-${i + 1}`,
        name: `محصول ${i + 1}`,
        title: `عنوان محصول ${i + 1}`,
        price: 120000 + (i * 10000),
        discount: i % 3 === 0 ? 10 : 0,
        stock: i % 5 === 0 ? 0 : 5,
        isNew: i % 4 === 0,
        isBestSeller: i % 6 === 0,
        imgUrl: "/images/mens-category.jpg",
        views: Math.floor(Math.random() * 1000),
        rank: i + 1,
        createdAt: new Date().toISOString(),
        category: { id: category, name: category as any },
        type: ["bag", "shoes", "cloths", "belt", "hats"][i % 5] as ProductType,
        audience: "unisex",
        tags: i % 2 === 0 ? [{ id: "t1", name: "premium" as const }] : [],
    }));

    // Apply type filter if provided
    if (typeFilter && typeFilter.length > 0) {
        products = products.filter(p => typeFilter.includes(p.type));
    }

    return products;
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { categoryname } = await params;
    const { sort, stock, search, minPrice, maxPrice, types } = await searchParams;

    const category = CATEGORY_CONFIG[categoryname as keyof typeof CATEGORY_CONFIG];

    if (!category) {
        notFound();
    }

    // Parse types from URL (comma-separated)
    const typeFilter = types ? types.split(',') : [];

    const products = await getProducts(categoryname, typeFilter);
    const productViewModels = mapProductsToViewModels(products);

    const allowedTypes = category.allowedTypes.map((type) => ({
        value: type,
        label: TYPE_LABELS[type],
    }));

    const initialFilters = {
        sort: (sort as any) || "latest",
        categories: [categoryname],
        types: typeFilter as ProductType[], // Get types from URL
        stock: (stock as any) || "all",
        minPrice: minPrice ? parseInt(minPrice) : 0,
        maxPrice: maxPrice ? parseInt(maxPrice) : 50_000_000,
        search: search || "",
    };

    return (
        <div className="container mx-auto px-4 py-6 lg:py-10">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="lg:order-2 lg:w-80 xl:w-96">
                    <SidebarFilters
                        allowedTypes={allowedTypes}
                        initialFilters={initialFilters}
                        currentCategory={categoryname}
                        showTypeFilter={true} // نمایش نوع دسته‌بندی
                    />
                </div>

                <div className="flex-1 lg:order-1">
                    <div className="mb-6">
                        <h1 className="text-2xl lg:text-3xl font-bold font-shabnam text-stone-800">
                            {category.label}
                        </h1>
                        <p className="text-stone-500 mt-1 font-shabnam">{category.description}</p>
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