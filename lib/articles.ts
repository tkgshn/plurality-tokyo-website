import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface ArticleItem {
    id: number
    title: string
    url: string
    author: string
    description?: string
    date: string
    tags?: string[]
}

/**
 * 記事一覧を取得する関数
 */
export function getAllArticles(): ArticleItem[] {
    const fileNames = fs.readdirSync(articlesDirectory)

    const articles = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map((fileName, index) => {
            const id = index + 1
            const fullPath = path.join(articlesDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)

            return {
                id,
                title: data.title,
                url: data.url || `https://example.com/articles/${fileName.replace(/\.mdx$/, '')}`,
                author: data.author,
                description: data.description,
                date: data.date,
                tags: data.tags,
            } as ArticleItem
        })

    // 日付でソート（新しい順）
    return articles.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

/**
 * カテゴリー別に記事を取得する関数
 */
export function getArticlesByTag(tag: string): ArticleItem[] {
    const allArticles = getAllArticles()
    return allArticles.filter(article => article.tags?.includes(tag))
}

/**
 * 著者で記事をフィルタリングする関数
 */
export function getArticlesByAuthor(author: string): ArticleItem[] {
    const allArticles = getAllArticles()
    return allArticles.filter(article => article.author === author)
}
