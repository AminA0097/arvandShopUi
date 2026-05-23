import {
    BackendSearchResult,
    SearchCountResponse,
    SearchSuggestionResponse
} from "@/features/search/types/searchType";
import {apiClient} from "@/app/api/apiClient";

const BASE_URL = process.env["back-end"] || "http://localhost:8091";

export async function searchByQuery(query: string): Promise<BackendSearchResult[]> {
    const response = await apiClient.get(`http://10.252.233.218:8091/api/search?q=${encodeURIComponent(query)}`)

    return response.data;

}

export async function searchCount(): Promise<SearchCountResponse> {
    const response = await fetch(
        `${BASE_URL}/api/search/count}`
    );

    if (!response.ok) {
        throw new Error("Count failed");
    }

    return response.json();
}

export async function getArvandSuggestions(): Promise<SearchSuggestionResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/api/search/suggestion`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    } catch {
        return {
            suggestions: [
                "کفش مردانه",
                "هودی مشکی",
                "کیف زنانه",
                "ساعت هوشمند",
                "ایرپاد",
                "کت اسپرت",
                "عینک آفتابی",
                "شلوار بگ",
            ],
        };
    }
}