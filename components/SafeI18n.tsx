'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/client';
import { Locale, defaultLocale } from '@/lib/i18n';

interface SafeI18nProps {
    children: (props: {
        locale: Locale;
        t: (key: string) => string;
        changeLocale: (locale: Locale) => void;
    }) => ReactNode;
    fallbackLocale?: Locale;
}

// サーバーサイドとクライアントサイドの両方で安全に動作するコンポーネント
export default function SafeI18n({ children, fallbackLocale = defaultLocale as Locale }: SafeI18nProps) {
    const [isClient, setIsClient] = useState(false);

    // クライアントサイドかどうかを確認
    useEffect(() => {
        setIsClient(true);
    }, []);

    // フォールバック値
    const fallback = {
        locale: fallbackLocale,
        t: (key: string) => key,
        changeLocale: () => console.log('changeLocale not available')
    };

    // サーバーサイドレンダリング時はフォールバックを使用
    if (!isClient) {
        return <>{children(fallback)}</>;
    }

    // クライアントサイドではClientOnlyI18nを使用
    return <ClientOnlyI18n fallbackLocale={fallbackLocale}>{children}</ClientOnlyI18n>;
}

// クライアントサイドでのみレンダリングされるコンポーネント
function ClientOnlyI18n({ children, fallbackLocale }: SafeI18nProps) {
    let i18nContext;

    try {
        i18nContext = useI18n();
    } catch (error) {
        console.error('SafeI18n: Error using useI18n hook', error);
        i18nContext = {
            locale: fallbackLocale as Locale,
            t: (key: string) => key,
            changeLocale: () => console.log('changeLocale not available')
        };
    }

    return <>{children(i18nContext)}</>;
}
