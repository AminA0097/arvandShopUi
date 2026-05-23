"use client";

import { useEffect, useState, useRef } from "react";

export function useCountdown(endDate: string, autoStart: boolean = true) {
    const calculate = () => {
        const diff = new Date(endDate).getTime() - Date.now();

        if (diff <= 0) {
            return {
                d: 0,
                h: 0,
                m: 0,
                s: 0,
                isExpired: true,
            };
        }

        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff % 86400000) / 3600000),
            m: Math.floor((diff % 3600000) / 60000),
            s: Math.floor((diff % 60000) / 1000),
            isExpired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculate());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!autoStart) return;

        const update = () => {
            const newTime = calculate();
            setTimeLeft(newTime);

            // Stop interval when expired
            if (newTime.isExpired && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        update();
        intervalRef.current = setInterval(update, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [endDate, autoStart]);

    return timeLeft;
}