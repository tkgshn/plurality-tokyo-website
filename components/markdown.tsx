"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Code } from "lucide-react"
import { CopyToMarkdownButton } from "@/components/copy-to-markdown-button"

interface MarkdownProps {
  content: string
  plainContent?: string
}

export default function Markdown({ content, plainContent }: MarkdownProps) {
  const [viewMode, setViewMode] = useState<"markdown" | "plain">("markdown")

  // 表示するコンテンツを決定
  const displayContent = viewMode === "markdown" ? content : (plainContent || content)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "markdown" | "plain")}>
          <TabsList>
            <TabsTrigger value="markdown">
              <FileText className="h-4 w-4 mr-2" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="plain">
              <Code className="h-4 w-4 mr-2" />
              Plain Text
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <CopyToMarkdownButton
            markdown={viewMode === "markdown" ? content : plainContent || content}
          />
        </div>
      </div>

      {viewMode === "markdown" ? (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {displayContent}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg text-gray-300 font-mono text-sm">
          {displayContent}
        </pre>
      )}
    </div>
  )
}
