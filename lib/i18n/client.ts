'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, translate, convertPathToLocale, getLocaleFromPath, defaultLocale } from './index';

// Cookie名
const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

// i18nコンテキスト
type I18nContextType = {
    locale: Locale;
    t: (keyPath: string) => string;
    changeLocale: (locale: Locale) => void;
};

export const I18nContext = createContext<I18nContextType | null>(null);

// Cookieから言語を取得する関数
function getLocaleFromCookie(): Locale | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === LOCALE_COOKIE_NAME) {
            return value as Locale;
        }
    }
    return null;
}

// Cookieに言語を設定する関数
function setLocaleCookie(locale: Locale) {
    if (typeof document === 'undefined') return;

    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000`; // 1年間有効
}

// i18nフックを作成
export function useI18n() {
    const context = useContext(I18nContext);
    console.log('useI18n hook called, context =', context ? 'exists' : 'null');
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}

// クライアント側のユーティリティ
export function useLocale() {
    const pathname = usePathname();
    const locale = getLocaleFromPath(pathname);
    console.log('useLocale hook: pathname =', pathname, 'locale =', locale);
    return locale;
}

export function useTranslation() {
    const locale = useLocale();
    console.log('useTranslation hook: locale =', locale);

    return {
        t: (key: string) => translate(locale, key),
        locale
    };
}

// ブラウザの言語設定から適切な言語を取得
export function getBrowserLocale(): Locale {
    if (typeof navigator === 'undefined') return defaultLocale;

    const browserLang = navigator.language.split('-')[0];
    if (['en', 'ja'].includes(browserLang)) {
        return browserLang as Locale;
    }

    return defaultLocale;
}

// 優先される言語を取得 (Cookie > ブラウザ言語 > デフォルト)
export function getPreferredLocale(): Locale {
    const cookieLocale = getLocaleFromCookie();
    if (cookieLocale) return cookieLocale;

    return getBrowserLocale();
}
