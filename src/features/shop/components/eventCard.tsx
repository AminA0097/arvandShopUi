"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarDays, MapPin, Eye, Percent } from "lucide-react";

import type { Event } from "../services/eventService";

type EventCardProps = {
    event: Event;
    index: number;
    formatDate: (date: string) => string;
    onViewDetails: () => void;
};

export default function EventCard({
                                      event,
                                      index,
                                      formatDate,
                                      onViewDetails,
                                  }: EventCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const isActive = event.status === "active";
    const imageSrc = event.image && event.image.trim() !== ""
        ? event.image
        : "/banner/banner2.webp";

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.05,
                duration: 0.4,
            }}
            className="overflow-hidden rounded-2xl bg-[var(--surface)] shadow-sm"
            style={{ borderRadius: "var(--radius)" }}
        >
            {/* فقط عکس - بدون هیچ متن یا badge روی عکس */}
            <div className="relative h-52 w-full overflow-hidden bg-[var(--surface-2)]">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 animate-pulse bg-[var(--surface-2)]" />
                )}

                {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-2)]">
                        <span className="text-xs text-[var(--text-muted)]">خطا در بارگذاری</span>
                    </div>
                )}

                <Image
                    src={imageSrc}
                    alt={event.title}
                    fill
                    priority={index < 2}
                    className={`object-cover transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    sizes="100vw"
                />
            </div>

            {/* محتوا زیر عکس */}
            <div className="space-y-3 p-4">
                {/* عنوان */}
                <h2 className="text-lg font-bold text-[var(--text)] line-clamp-1">
                    {event.title}
                </h2>

                {/* توضیحات */}
                <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-6">
                    {event.description}
                </p>

                {/* لوکیشن - فقط تهران */}
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--primary)]" />
                    <span className="text-xs text-[var(--text-muted)]">{event.location}</span>
                </div>

                {/* تاریخ و تخفیف در دو طرف */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-[var(--primary)]" />
                        <span className="text-xs text-[var(--text-muted)]">
                            {formatDate(event.startDate)}
                        </span>
                    </div>

                    {event.discount && isActive && (
                        <div className="flex items-center gap-1 rounded-full bg-[var(--primary)]/10 px-2.5 py-1">
                            <Percent size={12} className="text-[var(--primary)]" />
                            <span className="text-xs font-bold text-[var(--primary)]">
                                {event.discount}٪ تخفیف
                            </span>
                        </div>
                    )}
                </div>

                {/* دکمه مشاهده جزئیات */}
                <button
                    onClick={onViewDetails}
                    className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-bold text-white transition-all active:scale-95"
                    style={{ borderRadius: "var(--radius)" }}
                >
                    <Eye size={16} />
                    مشاهده جزئیات
                </button>
            </div>
        </motion.article>
    );
}