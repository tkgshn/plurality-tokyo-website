"use client"

import { File, Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

interface FileTreeProps {
    structure: Record<string, any>
    basePath?: string
    level?: number
}

interface FileTreeItemProps {
    name: string
    item: any
    basePath: string
    level: number
}

/**
 * ファイルツリーアイテムコンポーネント
 */
const FileTreeItem = ({ name, item, basePath, level }: FileTreeItemProps) => {
    const [isExpanded, setIsExpanded] = useState(level <= 1)
    const isDirectory = item.type === 'directory'
    const fullPath = basePath ? `${basePath}/${name}` : name
    const router = useRouter()

    const getFileIcon = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase()

        if (ext === 'md' || ext === 'mdx') {
            return <File className="h-4 w-4 text-purple-400" />
        } else if (ext === 'tsx' || ext === 'jsx') {
            return <FileCode className="h-4 w-4 text-blue-400" />
        } else if (ext === 'ts' || ext === 'js') {
            return <FileCode className="h-4 w-4 text-yellow-400" />
        } else if (ext === 'json') {
            return <File className="h-4 w-4 text-orange-400" />
        } else if (ext === 'css' || ext === 'scss') {
            return <File className="h-4 w-4 text-pink-400" />
        } else {
            return <File className="h-4 w-4 text-gray-400" />
        }
    }

    const handleDirClick = useCallback(() => {
        router.push(`/directory?path=${encodeURIComponent(fullPath)}`)
    }, [router, fullPath])

    const handleFileClick = useCallback(() => {
        router.push(`/directory?path=${encodeURIComponent(fullPath)}&view=file`)
    }, [router, fullPath])

    return (
        <li className="text-sm">
            <div className="flex items-center hover:bg-gray-800 rounded px-2 py-1">
                {isDirectory ? (
                    <>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mr-1 focus:outline-none"
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                        </button>
                        <Folder className="h-4 w-4 text-blue-400 mr-2" />
                        <button
                            onClick={handleDirClick}
                            className="flex-1 text-left hover:text-lime-400 transition-colors"
                        >
                            {name}
                        </button>
                        {item.children && (
                            <span className="text-xs text-gray-500">
                                {Object.keys(item.children).length} 項目
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        <span className="w-4 mr-1"></span>
                        {getFileIcon(name)}
                        <button
                            onClick={handleFileClick}
                            className="flex-1 ml-2 text-left hover:text-lime-400 transition-colors"
                        >
                            {name}
                        </button>
                        <span className="text-xs text-gray-500">
                            {(item.size / 1024).toFixed(1)}KB
                        </span>
                    </>
                )}
            </div>

            {isDirectory && isExpanded && item.children && (
                <ul className="pl-6 mt-1 border-l border-gray-800">
                    <FileTree
                        structure={item.children}
                        basePath={fullPath}
                        level={level + 1}
                    />
                </ul>
            )}
        </li>
    )
}

/**
 * ファイルツリーコンポーネント
 */
export function FileTree({ structure, basePath = '', level = 0 }: FileTreeProps) {
    const sortedItems = Object.keys(structure).sort((a, b) => {
        const aIsDir = structure[a].type === 'directory'
        const bIsDir = structure[b].type === 'directory'

        // ディレクトリを先に表示
        if (aIsDir && !bIsDir) return -1
        if (!aIsDir && bIsDir) return 1

        // 同じタイプなら名前でソート
        return a.localeCompare(b)
    })

    return (
        <>
            {sortedItems.map(name => (
                <FileTreeItem
                    key={name}
                    name={name}
                    item={structure[name]}
                    basePath={basePath}
                    level={level}
                />
            ))}
        </>
    )
}
