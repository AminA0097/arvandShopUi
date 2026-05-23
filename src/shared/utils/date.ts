// shared/utils/date.ts

export function formatPersianDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function getTimeLeft(endDate: string) {
    const diff = new Date(endDate).getTime() - Date.now();

    if (diff <= 0) {
        return { d: 0, h: 0, m: 0, s: 0 };
    }

    return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
    };
}

export function getRemainingTimeText(timeLeft: { d: number; h: number; m: number; s: number }): string {
    if (timeLeft.d > 0) return `${timeLeft.d} روز و ${timeLeft.h} ساعت`;
    if (timeLeft.h > 0) return `${timeLeft.h} ساعت و ${timeLeft.m} دقیقه`;
    if (timeLeft.m > 0) return `${timeLeft.m} دقیقه و ${timeLeft.s} ثانیه`;
    return `${timeLeft.s} ثانیه`;
}

export function calculateEventProgress(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();

    if (now <= start) return 0;
    if (now >= end) return 100;

    const total = end - start;
    const elapsed = now - start;

    return Math.floor((elapsed / total) * 100);
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        // You can add a toast notification here
        console.log("Copied:", text);
        return true;
    } catch (error) {
        console.error("Failed to copy:", error);
        return false;
    }
}