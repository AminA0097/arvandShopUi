import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";

type Props = {
    query: string;
    count: number;
    onSearch: () => void;
};

export default function SearchFooter({
                                         query,
                                         count,
                                         onSearch,
                                     }: Props) {
    if (!query.trim()) return null;

    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.985 }}
            onClick={onSearch}
            className="
                group relative flex w-full items-center justify-between
                overflow-hidden rounded-2xl
                bg-[var(--primary-gradient)]
                px-4 py-4
                text-white
                shadow-[var(--shadow-primary)]
                transition-all duration-300
            "
        >
            {/* Glow */}
            <div
                className="
                    absolute inset-0 opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                    bg-white/5
                "
            />

            {/* Left */}
            <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                    <Search size={18} />
                </div>

                <div className="text-right">
                    <p className="text-sm font-semibold">
                        جستجو برای "{query}"
                    </p>

                    <p className="text-xs text-white/75">
                        در {count.toLocaleString()} محصول
                    </p>
                </div>
            </div>

            {/* Arrow */}
            <div
                className="
                    relative flex h-10 w-10 items-center justify-center
                    rounded-full bg-white/10
                    transition-transform duration-300
                    group-hover:translate-x-[-3px]
                "
            >
                <ArrowLeft size={18} />
            </div>
        </motion.button>
    );
}