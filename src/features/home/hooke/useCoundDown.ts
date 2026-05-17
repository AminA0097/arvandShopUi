"use client";

import { useEffect, useState } from "react";

export function useCountdown(targetDate?: string) {
    const [timeLeft, setTimeLeft] = useState<null | {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>(null);

    useEffect(() => {
        if (!targetDate) return;

        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}