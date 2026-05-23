"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronLeft, Sparkles } from "lucide-react";

import EventCard from "./eventCard";
import EventModal from "./eventModal";
import { EventGridSkeleton } from "./eventSkeleton";
import { eventService, type Event } from "../services/eventService";
import { copyToClipboard, formatPersianDate } from "@/shared/utils/date";

export type { Event };

export default function MobileEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"active" | "passed">("active");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const loadEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const data = await eventService.getEvents();
            if (data && Array.isArray(data)) {
                setEvents(data);
            } else {
                setEvents([]);
            }
        } catch (err) {
            console.error(err);
            setError("خطا در دریافت رویدادها. لطفا مجدد تلاش کنید.");
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const activeEvents = useMemo(() => {
        if (!events || !Array.isArray(events)) return [];
        return events.filter((event) => event?.status === "active");
    }, [events]);

    const passedEvents = useMemo(() => {
        if (!events || !Array.isArray(events)) return [];
        return events.filter((event) => event?.status === "passed");
    }, [events]);

    const currentEvents = activeTab === "active" ? activeEvents : passedEvents;

    if (loading) {
        return (
            <div dir="rtl" className="min-h-screen bg-[var(--bg)]">
                <Header />
                <div className="p-4">
                    <EventGridSkeleton count={4} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div dir="rtl" className="min-h-screen bg-[var(--bg)]">
                <Header />
                <div className="flex min-h-[70vh] items-center justify-center p-6">
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                            <AlertCircle size={42} className="text-red-500" />
                        </div>
                        <h2 className="mb-2 text-lg font-bold text-[var(--text)]">
                            دریافت اطلاعات ناموفق بود
                        </h2>
                        <p className="mb-5 text-sm text-[var(--text-muted)]">{error}</p>
                        <button
                            onClick={loadEvents}
                            className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white"
                        >
                            تلاش مجدد
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div dir="rtl" className="min-h-screen bg-[var(--bg)] pb-24">
            <Header />

            {/* تب‌ها */}
            <div className="sticky top-14 z-20 border-b border-[var(--border)] bg-[var(--bg)]/90 px-4 py-3 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-2">
                    <TabButton
                        active={activeTab === "active"}
                        onClick={() => setActiveTab("active")}
                        icon={<Sparkles size={16} />}
                        label="رویدادهای فعال"
                        count={activeEvents.length}
                    />
                    <TabButton
                        active={activeTab === "passed"}
                        onClick={() => setActiveTab("passed")}
                        icon={<Calendar size={16} />}
                        label="رویدادهای گذشته"
                        count={passedEvents.length}
                    />
                </div>
            </div>

            {/* لیست رویدادها */}
            <div className="space-y-4 p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        {currentEvents.length === 0 ? (
                            <EmptyState type={activeTab} />
                        ) : (
                            currentEvents.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    formatDate={formatPersianDate}
                                    onViewDetails={() => setSelectedEvent(event)}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* مودال جزییات */}
            <AnimatePresence>
                {selectedEvent && (
                    <EventModal
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                        formatDate={formatPersianDate}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function Header() {
    return (
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
            <div className="flex h-14 items-center px-4">
                <Link
                    href="/"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-2)] transition-all active:scale-95"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div className="flex-1 text-center">
                    <h1 className="text-base font-bold text-[var(--text)]">
                        نمایشگاه‌ها و رویدادها
                    </h1>
                </div>
                <div className="w-10" />
            </div>
        </header>
    );
}

function TabButton({ active, onClick, icon, label, count }: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    count: number;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all ${
                active
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]"
            }`}
        >
            {icon}
            <span>{label}</span>
            <div
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                    active ? "bg-white text-[var(--primary)]" : "bg-[var(--surface-2)]"
                }`}
            >
                {count}
            </div>
        </button>
    );
}

function EmptyState({ type }: { type: "active" | "passed" }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-[var(--surface-2)] p-5">
                {type === "active" ? (
                    <Sparkles size={36} className="text-[var(--text-muted)]" />
                ) : (
                    <Calendar size={36} className="text-[var(--text-muted)]" />
                )}
            </div>
            <h3 className="mb-1 text-base font-bold text-[var(--text)]">
                {type === "active" ? "رویداد فعالی موجود نیست" : "رویداد گذشته‌ای وجود ندارد"}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
                {type === "active" ? "به‌زودی رویدادهای جدید اضافه می‌شوند." : "هنوز رویدادی به پایان نرسیده است."}
            </p>
        </div>
    );
}