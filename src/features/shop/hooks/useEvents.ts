"use client";

import { useCallback, useEffect, useState } from "react";
import { eventService, type Event } from "./../services/eventService";

type EventsResponse = {
    events: Event[];
    activeCount: number;
};

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [activeCount, setActiveCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await eventService.getEvents();

            setEvents(data);
            setActiveCount(data.filter(e => e.status === "active").length);
        } catch (error) {
            console.error(error);
            setError("خطا در دریافت تعداد رویدادها");
            setActiveCount(0);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return {
        events,
        activeCount,
        loading,
        error,
        refetch: fetchEvents,
    };
}

// For backward compatibility with count only
export function useEventsCount() {
    const { activeCount, loading, error, refetch } = useEvents();
    return { activeCount, loading, error, refetch };
}