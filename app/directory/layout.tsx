import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'コンテンツ構造 | Plurality Tokyo',
    description: 'Plurality Tokyoのコンテンツ構造',
}

export default function DirectoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body className={inter.className} style={{ margin: 0, padding: 0, background: '#000' }}>
                {children}
            </body>
        </html>
    )
}
