// src/features/home/hooks/useBanner.ts
import { useState, useEffect } from "react";
import { bannerService } from "../service/bannerService";
import { Banner } from "@/features/home/type/banner";

export const useBanner = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await bannerService.getBanner();
                console.log("dataaaaaaaaaaaaaaaa start");
                console.log(data);
                console.log("dataaaaaaaaaaaaaaaa end");
                setBanners(Array.isArray(data) ? data : [data]);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return { banners, loading, error };
};
