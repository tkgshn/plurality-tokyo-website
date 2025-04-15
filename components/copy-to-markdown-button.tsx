"use client"

import { Button } from "@/components/ui/button"
import { ClipboardCopy } from "lucide-react"

/**
 * CopyToMarkdownButton - マークダウンテキストをクリップボードにコピーするボタン
 *
 * @param markdown - コピーするマークダウンコンテンツ
 */
interface CopyToMarkdownButtonProps {
    markdown: string
}

export const CopyToMarkdownButton: React.FC<CopyToMarkdownButtonProps> = ({ markdown }) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-lime-500/30 hover:border-lime-500/70 text-lime-500"
            onClick={() => {
                navigator.clipboard.writeText(markdown)
            }}
        >
            <ClipboardCopy className="h-4 w-4" />
            <span>マークダウンとしてコピー</span>
        </Button>
    )
}
