'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MdLanguage, MdExpandMore } from 'react-icons/md';
import Cookies from 'js-cookie';
import { Locale, locales, getLocaleFromPath } from '@/lib/i18n';
import { useI18n } from '@/lib/i18n/client';

interface LanguageSwitcherProps {
    containerStyle?: React.CSSProperties;
}

// export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    containerStyle = {}
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState<Locale>('ja');
    const { locale, changeLocale, t } = useI18n();
    const pathname = usePathname();

    // 初期化時に現在のロケールを設定
    useEffect(() => {
        if (locale) {
            setCurrentLocale(locale);
        } else {
            // パスからロケールを取得（フォールバック）
            const pathLocale = getLocaleFromPath(pathname);
            setCurrentLocale(pathLocale);
        }
    }, [locale, pathname]);

    // cookieから言語を取得（クライアントサイド）
    useEffect(() => {
        const cookieLocale = Cookies.get('NEXT_LOCALE') as Locale | undefined;
        if (cookieLocale && locales.includes(cookieLocale as Locale)) {
            setCurrentLocale(cookieLocale as Locale);
        }
    }, []);

    const handleLanguageChange = (newLocale: Locale) => {
        // 言語が変更された場合のみ処理
        if (newLocale !== currentLocale) {
            // changeLocale関数を呼び出して言語を変更
            changeLocale(newLocale);
            setCurrentLocale(newLocale);
        }
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 言語名の翻訳キー
    const getLanguageLabel = (lang: Locale): string => {
        return `languages.${lang}`;
    };

    return (
        <div
            className="language-switcher relative"
            style={containerStyle}
        >
            <button
                className="flex items-center space-x-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <MdLanguage className="text-xl" />
                <span className="text-sm font-medium uppercase">{currentLocale}</span>
                <MdExpandMore className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1">
                    {locales.map((lang) => (
                        <button
                            key={lang}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${lang === currentLocale ? 'font-bold bg-gray-50 dark:bg-gray-700' : ''
                                }`}
                            onClick={() => handleLanguageChange(lang as Locale)}
                        >
                            {t(getLanguageLabel(lang as Locale))}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
