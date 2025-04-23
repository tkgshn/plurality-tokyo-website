// Server-sideで使用できる機能
import enTranslations from './en.json';
import jaTranslations from './ja.json';

// 利用可能な言語
export const locales = ['en', 'ja'];
export const defaultLocale = 'ja';

// 翻訳リソース
export const resources = {
    en: enTranslations,
    ja: jaTranslations,
};

// 型定義
export type Locale = 'en' | 'ja';
export type Translations = typeof enTranslations;
export type TranslationKey = keyof Translations;

// 現在のロケールを取得する関数
export function getLocaleFromPath(pathname: string): Locale {
    console.log('getLocaleFromPath called with pathname =', pathname);
    const segments = pathname.split('/');
    const localeSegment = segments[1];

    if (locales.includes(localeSegment as Locale)) {
        console.log('getLocaleFromPath: found locale in path =', localeSegment);
        return localeSegment as Locale;
    }

    console.log('getLocaleFromPath: using default locale =', defaultLocale);
    return defaultLocale;
}

// 翻訳関数
export function translate(locale: Locale, key: string): string {
    console.log(`translate called with locale = ${locale}, key = ${key}`);
    const keys = key.split('.');
    let result: any = resources[locale];

    for (const k of keys) {
        if (result && result[k] !== undefined) {
            result = result[k];
        } else {
            // キーが見つからない場合はキー自体を返す
            console.log(`translate: key "${key}" not found, returning key`);
            return key;
        }
    }

    console.log(`translate: key "${key}" = "${result}"`);
    return result as string;
}

// パスを別の言語に変換する関数
export function convertPathToLocale(path: string, newLocale: Locale): string {
    console.log(`convertPathToLocale: path = ${path}, newLocale = ${newLocale}`);
    const segments = path.split('/');

    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
        segments[1] = newLocale;
    } else {
        segments.splice(1, 0, newLocale);
    }

    const result = segments.join('/');
    console.log(`convertPathToLocale: result = ${result}`);
    return result;
}
