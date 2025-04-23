import { NextRequest, NextResponse } from 'next/server';

// 利用可能な言語
const locales = ['en', 'ja'] as const;
const defaultLocale = 'ja';

// 言語設定Cookie名
const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

function getLocale(request: NextRequest): string {
    console.log('Middleware getLocale: headers =', request.headers);

    // Cookieから言語を取得
    const localeCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    if (localeCookie && locales.includes(localeCookie as typeof locales[number])) {
        console.log('Middleware getLocale: found in cookie =', localeCookie);
        return localeCookie;
    }

    // Accept-Language ヘッダーから言語を取得
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const acceptedLocales = acceptLanguage.split(',').map(l => l.split(';')[0].trim());
        const matchedLocale = acceptedLocales.find(locale =>
            locales.includes(locale as typeof locales[number]) || locales.includes(locale.split('-')[0] as typeof locales[number])
        );
        if (matchedLocale) {
            const matchedBase = matchedLocale.split('-')[0] as typeof locales[number];
            const result = locales.includes(matchedLocale as typeof locales[number])
                ? matchedLocale
                : locales.find(l => l === matchedBase) || defaultLocale;
            console.log('Middleware getLocale: found in accept-language =', result);
            return result;
        }
    }

    console.log('Middleware getLocale: using default =', defaultLocale);
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log('Middleware: pathname =', pathname);

    // _nextから始まるリクエストや静的ファイルはスキップ
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js)$/)
    ) {
        console.log('Middleware: skipping path');
        return NextResponse.next();
    }

    // URLがロケールで始まるパターンを検出
    const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}`));

    // ロケールを含むURLの場合はリダイレクト（移行のための一時的な対応）
    if (pathnameHasLocale) {
        const segments = pathname.split('/');
        const locale = segments[1];

        // /ja/about → /about のようにリダイレクト
        const newPathname = '/' + segments.slice(2).join('/');
        const url = new URL(newPathname, request.url);
        url.search = request.nextUrl.search;

        console.log(`Middleware: redirecting from /${locale}${newPathname} to ${newPathname}`);

        const response = NextResponse.redirect(url);

        // Cookieに言語設定を保存
        response.cookies.set(LOCALE_COOKIE_NAME, locale, {
            maxAge: 60 * 60 * 24 * 365, // 1年
            path: '/'
        });

        return response;
    }

    // 通常のリクエストの場合はユーザーの言語設定をCookieから取得
    const locale = getLocale(request);
    const response = NextResponse.next();

    // 言語設定をCookieに保存（毎回更新して有効期限をリセット）
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        maxAge: 60 * 60 * 24 * 365, // 1年
        path: '/'
    });

    console.log('Middleware: continuing with path =', pathname, 'locale =', locale);
    return response;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|.*\\..*).*)',
    ],
};
