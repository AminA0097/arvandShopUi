import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * تبدیل قیمت به تومان با اعداد فارسی
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

/**
 * تبدیل هر عدد به اعداد فارسی
 */
export function toPersianNumbers(num: number): string {
    return new Intl.NumberFormat('fa-IR').format(num);
}

/**
 * تبدیل ارقام انگلیسی به فارسی (برای ورودی‌ها)
 */
export function toPersianDigits(str: string): string {
    const persianDigits: Record<string, string> = {
        '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
        '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
    };
    return str.replace(/\d/g, d => persianDigits[d]);
}

/**
 * تبدیل ارقام فارسی به انگلیسی (برای محاسبات)
 */
export function toEnglishDigits(str: string): number {
    const englishDigits: Record<string, string> = {
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    };
    const normalized = str.replace(/[۰-۹]/g, d => englishDigits[d]);
    return Number(normalized) || 0;
}