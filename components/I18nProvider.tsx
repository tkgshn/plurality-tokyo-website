'use client';

import { ReactNode, useMemo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, convertPathToLocale, getLocaleFromPath, translate, defaultLocale } from '@/lib/i18n';
import { I18nContext, getPreferredLocale } from '@/lib/i18n/client';

interface I18nProviderProps {
    children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
    const pathname = usePathname();
    const router = useRouter();

    // 言語の状態を管理
    const [locale, setLocale] = useState<Locale>(defaultLocale);

    // パスから現在のロケールを取得
    const pathLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

    // 初期化
    useEffect(() => {
        const preferredLocale = getPreferredLocale();
        console.log('I18nProvider: preferredLocale =', preferredLocale);

        if (preferredLocale) {
            setLocale(preferredLocale);
        } else {
            setLocale(pathLocale);
        }
    }, [pathLocale]);

    // デバッグログ
    useEffect(() => {
        console.log('I18nProvider: pathname =', pathname);
        console.log('I18nProvider: locale =', locale);
    }, [pathname, locale]);

    // 言語を切り替える関数
    const changeLocale = (newLocale: Locale) => {
        if (newLocale === locale) return;

        console.log('I18nProvider: changing locale from', locale, 'to', newLocale);

        // 言語を更新
        setLocale(newLocale);

        // Cookieに保存
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        // ページをリロード (オプション)
        window.location.reload();
    };

    // 翻訳関数
    const t = (key: string): string => {
        return translate(locale, key);
    };

    // コンテキスト値
    const contextValue = useMemo(() => ({
        locale,
        t,
        changeLocale,
    }), [locale]);

    return (
        <I18nContext.Provider value={contextValue}>
            {children}
        </I18nContext.Provider>
    );
}
