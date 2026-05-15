// app/(shop)/products/all/page.tsx
import { CATEGORY_CONFIG, TYPE_LABELS } from "@/features/shop/types/ProductQuery";
import SidebarFilters from "@/features/shop/components/sidebarFilters";
import ProductGrid from "@/features/shop/components/productGrid";
import { mapProductsToViewModels } from "@/features/shop/types/productMapper";
import type { Product, ProductType, MainCategoryName } from "@/features/shop/types/productType";

type Props = {
    searchParams: Promise<{
        sort?: string;
        stock?: string;
        search?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
};

async function getAllProducts(): Promise<Product[]> {
    // Mock products from all categories
    const allProducts: Product[] = [];
    const categories: MainCategoryName[] = ["mens", "womens", "accessory"];

    for (const cat of categories) {
        for (let i = 0; i < 6; i++) {
            const types: ProductType[] = ["bag", "shoes", "cloths", "belt", "hats", "wallet"];
            allProducts.push({
                id: `${cat}-${i + 1}`,
                name: `محصول ${i + 1} ${CATEGORY_CONFIG[cat].label}`,
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
                category: { id: cat, name: cat },
                type: types[i % types.length],
                audience: "unisex",
                tags: i % 2 === 0 ? [{ id: "t1", name: "premium" as const }] : [],
            });
        }
    }

    return allProducts;
}

export default async function AllProductsPage({ searchParams }: Props) {
    const { sort, stock, search, minPrice, maxPrice } = await searchParams;

    const products = await getAllProducts();
    const productViewModels = mapProductsToViewModels(products);

    // Show all types for filter sidebar
    const allowedTypes = Object.entries(TYPE_LABELS).map(([value, label]) => ({
        value: value as ProductType,
        label,
    }));

    const initialFilters = {
        sort: (sort as any) || "latest",
        categories: [],
        types: [],
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
                    />
                </div>

                <div className="flex-1 lg:order-1">
                    <div className="mb-6">
                        <h1 className="text-2xl lg:text-3xl font-bold font-shabnam text-stone-800">
                            همه محصولات
                        </h1>
                        <p className="text-stone-500 mt-1 font-shabnam">
                            مشاهده همه محصولات چرمی آروند
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