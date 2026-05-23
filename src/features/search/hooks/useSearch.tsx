"use client"
import { useEffect, useState } from "react";
import { searchByQuery } from "@/app/api/search/search.api"
// SearchResult حذف شد چون در این فایل موجود نبود
import { useDebounce } from "./useDebounce";

// اگر این تایپ رو نیاز داری، بهتره توی یک فایل shared تعریفش کنی
// در غیر این صورت، اینترفیس رو همین‌جا می‌نویسیم تا کد خطا نده
interface TransformedSearchResult {
    type: "product";
    id: string;
    slug: string;
    title: string;
    image: string;
    rank: number;
    views: string;
    detail: string;
}

export function useSearch(query: string, category: string = "all") {
    const debouncedQuery = useDebounce(query, 250);
    const [results, setResults] = useState<TransformedSearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                setLoading(true);
                const backendResults = await searchByQuery(debouncedQuery);

                console.log(backendResults);
                // const transformedResults: TransformedSearchResult[] =
                //     backendResults.map((item) => ({
                //         type: "product",
                //         id: item.productId,
                //         slug: item.productId,
                //         title: item.fldSearchText,
                //         image: item.fldImageUrl,
                //         rank: Number(item.fldRank),
                //         views: item.fldViews,
                //         detail: item.detail,
                //     }));
                //
                // setResults(transformedResults);
            } catch (error) {
                console.error("Search Error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery, category]);

    return { results, loading };
}
