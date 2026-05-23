"use client";

import { useEffect, useState } from "react";

import { searchCount } from "@/app/api/search/search.api";

import { useDebounce } from "./useDebounce";

export function useSearchCount(
    query: string
) {
    const debouncedQuery =
        useDebounce(query, 500);

    const [count, setCount] =
        useState(0);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setCount(0);
            return;
        }

        const fetchCount = async () => {
            try {
                const data =
                    await searchCount(
                    );

                setCount(data.count);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCount();
    }, [debouncedQuery]);

    return count;
}