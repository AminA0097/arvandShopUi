"use client";

import { motion } from "framer-motion";

export default function EventSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl bg-[var(--surface)] shadow-lg">
            {/* Image Skeleton */}
            <div className="relative h-52 w-full animate-pulse bg-gradient-to-r from-[var(--surface-2)] via-[var(--surface)] to-[var(--surface-2)] bg-[length:200%_100%]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Skeleton */}
            <div className="p-5 space-y-3">
                {/* Title Skeleton */}
                <div className="h-6 w-3/4 animate-pulse rounded-lg bg-[var(--surface-2)]" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded-lg bg-[var(--surface-2)]" />
                    <div className="h-4 w-2/3 animate-pulse rounded-lg bg-[var(--surface-2)]" />
                </div>

                {/* Info Grid Skeleton */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-[var(--surface-2)]" />
                        <div className="h-4 w-16 animate-pulse rounded-lg bg-[var(--surface-2)]" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-[var(--surface-2)]" />
                        <div className="h-4 w-16 animate-pulse rounded-lg bg-[var(--surface-2)]" />
                    </div>
                </div>

                {/* Button Skeleton */}
                <div className="mt-3 h-12 w-full animate-pulse rounded-xl bg-[var(--surface-2)]" />
            </div>
        </div>
    );
}

// Grid Skeleton for multiple cards
export function EventGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <EventSkeleton />
                </motion.div>
            ))}
        </div>
    );
}