import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, locale: string = 'en-US'): string {
    return new Date(date).toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
}
