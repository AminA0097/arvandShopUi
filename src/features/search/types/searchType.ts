export type QuerySearchResult = {
    type: "query";
    value: string;
};

export type ProductSearchResult = {
    type: "product";

    id: string;
    slug: string;

    title: string;

    image?: string;

    rank?: number;
    views?: string;

    detail?: string;
};

export type SearchResult =
    | QuerySearchResult
    | ProductSearchResult;

export type BackendSearchResult = {
    productId: string;
    fldSearchText: string;
    fldImageUrl: string;
    fldRank: string;
    fldViews: string;
    score: string;
    detail: string;
};


export type SearchCountResponse = {
    count: number;
};

export type SearchSuggestionResponse = {
    suggestions: string[];
};