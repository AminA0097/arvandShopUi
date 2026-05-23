import Link from "next/link";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Eye,
    Award,
    Search,
    ArrowUpLeft,
} from "lucide-react";

import {
    SearchResult,
    ProductSearchResult,
    QuerySearchResult,
} from "@/features/search/types/searchType";

type Props = {
    results: SearchResult[];
    query: string;
    onSelect: (value: string) => void;
};

function highlightText(text: string, query?: string) {
    if (!query?.trim()) return text;

    const escapedQuery = query.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const parts = text.split(
        new RegExp(`(${escapedQuery})`, "gi")
    );

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span
                key={index}
                className="
                    rounded-md
                    bg-[var(--primary)]/10
                    px-1
                    text-[var(--primary-dark)]

                "
            >
                {part}
            </span>
        ) : (
            part
        )
    );
}

export default function SearchResults({
                                          results,
                                          query,
                                          onSelect,
                                      }: Props) {
    if (!results.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-3xl bg-[var(--surface)] p-4">
                    <Search
                        size={30}
                        className="text-[var(--text-muted)]"
                    />
                </div>

                <h3 className="text-sm font-semibold text-[var(--text)]
                font-shabnam">
                    نتیجه‌ای پیدا نشد
                </h3>

                <p className="mt-1 text-xs text-[var(--text-muted)]
                font-shabnam">
                    عبارت دیگری را امتحان کنید
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {results.map((result, index) => {
                console.log(result);
                /*
                 * QUERY RESULT
                 */
                if (result.type === "query") {
                    const queryResult = result as QuerySearchResult;

                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() =>
                                onSelect(queryResult.value)
                            }
                            className="
                                group flex w-full items-center gap-3
                                rounded-2xl border border-transparent
                                bg-[var(--surface)]
                                px-4 py-3
                                transition-all duration-200
                                hover:border-[var(--border-heavy)]
                                hover:bg-[var(--surface-2)]
                            "
                        >
                            {/* Icon */}
                            <div
                                className="
                                    flex h-10 w-10 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    bg-[var(--surface-2)]
                                "
                            >
                                <Search
                                    size={16}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-right">
                                <p className="line-clamp-1 text-sm font-medium text-[var(--text)] font-shabnam">
                                    {highlightText(
                                        queryResult.value,
                                        query
                                    )}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)] font-shabnam">
                                    جستجو در محصولات
                                </p>
                            </div>

                            {/* Arrow */}
                            <ArrowUpLeft
                                size={16}
                                className="
                                    text-[var(--text-muted)]
                                    opacity-0 transition-all
                                    group-hover:translate-x-[-2px]
                                    group-hover:opacity-100
                                "
                            />
                        </motion.button>
                    );
                }

                /*
                 * PRODUCT RESULT
                 */
                const product = result as ProductSearchResult;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                    >
                        <Link
                            href={`/products/${product.slug}`}
                            className="
                                group flex items-center gap-3
                                rounded-2xl border border-transparent
                                bg-[var(--surface)]
                                px-4 py-3
                                transition-all duration-200
                                hover:border-[var(--border-heavy)]
                                hover:bg-[var(--surface-2)]
                            "
                        >
                            {/* Icon */}
                            <div
                                className="
                                    flex h-11 w-11 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    bg-[var(--surface-2)]
                                "
                            >
                                <TrendingUp
                                    size={18}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                {/* Title */}
                                <h4 className="line-clamp-1 text-sm font-semibold text-[var(--text)] font-shabnam">
                                    {highlightText(product.title, query)}
                                </h4>

                                {product.detail && (
                                    <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-1 font-shabnam">
                                        {product.detail}
                                    </p>
                                )}


                                {/* Meta */}
                                <div className="mt-2 flex items-center gap-3 text-xs">
                                    {product.rank && (
                                        <div className="flex items-center gap-1 text-[var(--primary)] font-tanha-fd">
                                            <Award size={12} />
                                            <span>
                                                رتبه {product.rank}
                                            </span>
                                        </div>
                                    )}

                                    {product.views && (
                                        <div className="flex items-center gap-1 text-[var(--text-muted)] font-tanha-fd">
                                            <Eye size={12} />
                                            <span>
                                                {parseInt(
                                                    product.views
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <ArrowUpLeft
                                size={16}
                                className="
                                    shrink-0
                                    text-[var(--text-muted)]
                                    opacity-0 transition-all
                                    group-hover:translate-x-[-2px]
                                    group-hover:opacity-100
                                "
                            />
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}