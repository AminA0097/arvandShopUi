// app/product/page.tsx

import ProductMobileCategories from "@/features/shop/components/productMobileCategories";
import ProductWlcPage from "@/features/shop/components/productWlcPage";

export default function ProductPage() {
    return (
        <>
            {/* Mobile */}
            <div className="block lg:hidden">
                <ProductMobileCategories />
            </div>

            <div className="hidden lg:block">
                <ProductWlcPage />
            </div>
        </>
    );
}