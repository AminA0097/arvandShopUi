import { apiClient } from "@/app/api/apiClient";
import { Banner } from "@/features/home/type/banner";

export const bannerService = {
    getBanner: async (): Promise<Banner> => {
        // اینجا مستقیم به IP سرور جاوا می‌زنیم
        const response = await apiClient.get("http://10.252.233.218:8091/api/layout/mobileHero");
        return response.data.data;
    }
};
