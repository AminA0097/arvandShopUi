"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, BarChart2, Eye } from "lucide-react";
import Link from "next/link";
import { desktopNavItems } from "@/config/nav";
import { useSearch } from "@/features/search/hooks/useSearch";

type Props = { isOpen: boolean; onClose: () => void };

export default function MobileSearchModal({ isOpen, onClose }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState("همه");

    const { results, loading } = useSearch(query, selectedCat);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    const allCategories = [{ label: "همه" }, ...desktopNavItems];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[101] h-[90vh] flex flex-col bg-[#FDF9F5] rounded-t-[32px] border-t border-[#EBDCCF] shadow-2xl"
                        dir="rtl"
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-[#EBDCCF]">
                            <button onClick={onClose} className="text-[#8B735B]"><X size={24} /></button>
                            <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
                                {allCategories.map((cat) => (
                                    <button
                                        key={cat.label}
                                        onClick={() => setSelectedCat(cat.label)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium 
                                        font-shabnam whitespace-nowrap transition-all ${
                                            selectedCat === cat.label ? "bg-[#8B735B] text-white" : "bg-[#F3EBE3] text-[#8B735B]"
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="relative mb-6">
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89482]" size={20} />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="دنبال چی می‌گردی؟..."
                                    className="w-full h-14 bg-white border border-[#EBDCCF]
                                    placeholder:font-shabnam
                                    font-shabnam
                                    rounded-2xl pr-12 pl-4 text-sm text-[#5C4D3E] outline-none"
                                />
                            </div>

                            {loading ? (
                                <div className="text-center text-[#8B735B] text-sm font-shabnam">در حال جستجو در دنیای محصولات...</div>
                            ) : (
                                <div className="space-y-3">
                                    {results.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.slug}
                                            onClick={onClose}
                                            className="block p-4 bg-white border border-[#EBDCCF] rounded-2xl hover:border-[#8B735B] transition-colors"
                                        >
                                            <h3 className="font-bold font-shabnam text-[#5C4D3E] mb-1">{item.title}</h3>
                                            <p className="font-shabnam text-[11px] text-[#A89482] mb-3 line-clamp-1">{item.detail}</p>

                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-1 text-[10px] text-[#8B735B] bg-[#F3EBE3] px-2 py-0.5 rounded-md">
                                                    <BarChart2 size={12} />
                                                    <span className="font-tanha-fd">رتبه: {item.rank}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] text-[#8B735B] bg-[#F3EBE3] px-2 py-0.5 rounded-md">
                                                    <Eye size={12} />
                                                    <span className="font-tanha-fd">بازدید: {item.views}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {query && results.length === 0 && !loading && (
                                        <p className="text-center text-[#A89482] text-sm mt-10">چیزی پیدا نکردم، شاید دوباره امتحان کنی؟</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
