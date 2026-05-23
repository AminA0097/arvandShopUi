"use client";

import { useEffect, useState } from "react";

import { getArvandSuggestions } from "@/app/api/search/search.api";

export function useArvandSuggestions() {
    const [suggestions, setSuggestions] =
        useState<string[]>([]);

    useEffect(() => {
        const fetchSuggestions =
            async () => {
                try {
                    const data =
                        await getArvandSuggestions();

                    setSuggestions(
                        data.suggestions
                    );
                } catch (error) {
                    console.error(error);
                }
            };

        fetchSuggestions();
    }, []);

    return suggestions;
}