import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}
export function toPersianNumbers(num: number): string {
    return new Intl.NumberFormat('fa-IR').format(num);
}