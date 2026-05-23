import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    suggestions: string[];
    onSelect: (value: string) => void;
};

export default function SearchSuggestionSection({
                                                    suggestions,
                                                    onSelect,
                                                }: Props) {
    if (!suggestions.length) return null;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 px-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-2)]">
                    <Sparkles size={14} className="text-[var(--primary)]" />
                </div>

                <div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                        پیشنهادات آروند
                    </p>

                    <p className="text-xs text-[var(--text-muted)]">
                        جستجوهای محبوب و ترند
                    </p>
                </div>
            </div>

            {/* Suggestions */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {suggestions.map((item, index) => (
                    <motion.button
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onSelect(item)}
                        className="
                            group flex shrink-0 items-center gap-2
                            rounded-2xl border border-[var(--border)]
                            bg-[var(--surface)]
                            px-4 py-3
                            transition-all duration-200
                            hover:border-[var(--primary)]
                            hover:bg-[var(--surface-2)]
                            hover:shadow-[var(--shadow-sm)]
                        "
                    >
                        <TrendingUp
                            size={14}
                            className="text-[var(--primary)]"
                        />

                        <span className="text-sm text-[var(--text-secondary)]">
                            {item}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}