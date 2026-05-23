"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Navigation,
    Store,
    X,
    Percent,
} from "lucide-react";

import type { Event } from "../services/eventService";

type EventModalProps = {
    event: Event;
    onClose: () => void;
    formatDate: (date: string) => string;
};

export default function EventModal({
                                       event,
                                       onClose,
                                       formatDate,
                                   }: EventModalProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const imageSrc = event.image && event.image.trim() !== ""
        ? event.image
        : "/banner/banner2.webp";

    const getGoogleMapsUrl = () => {
        if (event.lat && event.lng) {
            return `https://www.google.com/maps/search/?api=1&query=${event.lat},${event.lng}`;
        }
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.exactLocation)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                    type: "spring",
                    damping: 24,
                    stiffness: 220,
                }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-[var(--bg)]"
                style={{ borderRadius: "var(--radius)", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            >
                {/* تصویر */}
                <div className="relative h-64 w-full shrink-0 overflow-hidden bg-[var(--surface-2)]">
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 animate-pulse bg-[var(--surface-2)]" />
                    )}

                    {imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-2)]">
                            <span className="text-sm text-[var(--text-muted)]">خطا در بارگذاری تصویر</span>
                        </div>
                    )}

                    <Image
                        src={imageSrc}
                        alt={event.title}
                        fill
                        priority
                        className={`object-cover transition-opacity duration-300 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        sizes="100vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all active:scale-95"
                    >
                        <X size={20} />
                    </button>

                    <div className="absolute bottom-5 right-5 left-5">
                        <h2 className="text-xl font-bold text-white line-clamp-2">
                            {event.title}
                        </h2>
                    </div>
                </div>

                {/* محتوا با padding-bottom اضافه برای فاصله از پایین */}
                <div className="px-5 pt-5 pb-8">
                    {/* توضیحات */}
                    <p className="text-sm leading-7 text-[var(--text-muted)]">
                        {event.description}
                    </p>

                    {/* جزییات */}
                    <div className="mt-5 space-y-3 rounded-xl bg-[var(--surface-2)] p-4">
                        <DetailRow
                            icon={<MapPin size={16} />}
                            label="شهر"
                            value={event.location}
                        />
                        <DetailRow
                            icon={<Navigation size={16} />}
                            label="آدرس"
                            value={event.exactLocation}
                        />
                        <DetailRow
                            icon={<Calendar size={16} />}
                            label="تاریخ شروع"
                            value={formatDate(event.startDate)}
                        />
                        <DetailRow
                            icon={<Calendar size={16} />}
                            label="تاریخ پایان"
                            value={formatDate(event.endDate)}
                        />
                    </div>

                    {/* تخفیف */}
                    {event.discount && event.status === "active" && (
                        <div className="mt-5 flex items-center gap-3 rounded-xl bg-[var(--primary)]/10 p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/20">
                                <Percent size={18} className="text-[var(--primary)]" />
                            </div>
                            <div>
                                <div className="text-xs text-[var(--text-muted)]">تخفیف ویژه</div>
                                <div className="text-lg font-bold text-[var(--primary)]">
                                    {event.discount}٪ تخفیف
                                </div>
                            </div>
                        </div>
                    )}

                    {/* کد تخفیف */}
                    {event.offCode && event.status === "active" && (
                        <div className="mt-5 rounded-xl border border-dashed border-[var(--primary)]/40 bg-[var(--primary)]/5 p-4">
                            <div className="text-center">
                                <div className="text-xs text-[var(--text-muted)]">کد تخفیف</div>
                                <div className="mt-1 text-xl font-bold text-[var(--primary)] tracking-wider">
                                    {event.offCode}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* دکمه‌های اقدام - با فاصله از پایین */}
                    <div className="mt-6 space-y-3">
                        <a
                            href={getGoogleMapsUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--surface-2)] text-sm font-medium text-[var(--text)] transition-all active:scale-95"
                        >
                            <Navigation size={16} />
                            مشاهده روی نقشه
                        </a>

                        <button
                            onClick={onClose}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-bold text-white transition-all active:scale-95"
                        >
                            <Store size={16} />
                            بستن
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg)] text-[var(--primary)]">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-xs text-[var(--text-muted)]">{label}</div>
                <div className="text-sm font-medium text-[var(--text)] break-words">
                    {value}
                </div>
            </div>
        </div>
    );
}