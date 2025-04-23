'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import I18nProvider from "@/components/I18nProvider";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    useEffect(() => {
        console.log('Providers component mounted');
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <I18nProvider>
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
}
