import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContentBySlug, getAllEvents, getAllArticles, getAllSpeakers } from '@/lib/content';

/**
 * マークダウンバージョンのリクエストを処理するAPIルート
 * llms.txtの仕様に従って.html.mdリクエストに対応
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const requestPath = searchParams.get('path');

    if (!requestPath) {
        return new NextResponse('Path parameter is required', { status: 400 });
    }

    try {
        // publicディレクトリに事前生成済みのマークダウンファイルがあるか確認
        const mdFilePath = path.join(process.cwd(), 'public', `${requestPath}.html.md`);

        if (fs.existsSync(mdFilePath)) {
            // 事前生成ファイルがある場合はそれを返す
            const content = fs.readFileSync(mdFilePath, 'utf8');
            return new NextResponse(content, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                },
            });
        }

        // 事前生成ファイルがない場合は動的に生成
        // パスからコンテンツタイプとスラッグを抽出
        const pathParts = requestPath.split('/');
        const contentType = pathParts[0]; // events, articles, speakersなど
        const slug = pathParts[1]; // ファイル名

        // インデックスページの場合
        if (slug === 'index') {
            let markdownContent = '';

            if (contentType === 'events') {
                const events = getAllEvents();
                markdownContent = `# Events一覧\n\n`;
                events.forEach(event => {
                    const eventDate = event.metadata.date ? new Date(event.metadata.date).toLocaleDateString('ja-JP') : '日付未定';
                    markdownContent += `- [${event.metadata.title}](/events/${event.metadata.slug}.html.md): ${eventDate}に${event.metadata.location}で開催\n`;
                });
            } else if (contentType === 'articles') {
                const articles = getAllArticles();
                markdownContent = `# 記事一覧\n\n`;
                articles.forEach(article => {
                    markdownContent += `- [${article.metadata.title}](/articles/${article.metadata.slug}.html.md): ${article.metadata.description}\n`;
                });
            } else if (contentType === 'speakers') {
                const speakers = getAllSpeakers();
                markdownContent = `# スピーカー一覧\n\n`;
                speakers.forEach(speaker => {
                    markdownContent += `- [${speaker.metadata.title}](/speakers/${speaker.metadata.slug}.html.md): ${speaker.metadata.position}${speaker.metadata.company ? ` at ${speaker.metadata.company}` : ''}\n`;
                });
            } else {
                return new NextResponse('Content type not supported', { status: 404 });
            }

            return new NextResponse(markdownContent, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                },
            });
        }

        // 個別コンテンツページの場合
        try {
            let content: any;

            if (contentType === 'events') {
                content = getContentBySlug('events', slug);
                const eventDate = content.metadata.date ? new Date(content.metadata.date).toLocaleDateString('ja-JP') : '日付未定';
                let markdown = `# ${content.metadata.title}\n\n`;
                markdown += `> ${eventDate}に${content.metadata.location}で開催\n\n`;
                markdown += `${content.metadata.description}\n\n`;

                if (content.metadata.speakers && content.metadata.speakers.length > 0) {
                    markdown += `## スピーカー\n\n`;
                    content.metadata.speakers.forEach((speaker: any) => {
                        markdown += `- ${speaker.name}${speaker.role ? ` (${speaker.role})` : ''}\n`;
                    });
                    markdown += '\n';
                }

                markdown += content.content;

                return new NextResponse(markdown, {
                    headers: {
                        'Content-Type': 'text/markdown; charset=utf-8',
                    },
                });
            } else if (contentType === 'articles') {
                content = getContentBySlug('articles', slug);
                let markdown = `# ${content.metadata.title}\n\n`;
                markdown += `> ${content.metadata.description}\n\n`;

                if (content.metadata.author) {
                    markdown += `著者: ${content.metadata.author}\n\n`;
                }

                if (content.metadata.date) {
                    markdown += `公開日: ${new Date(content.metadata.date).toLocaleDateString('ja-JP')}\n\n`;
                }

                markdown += content.content;

                return new NextResponse(markdown, {
                    headers: {
                        'Content-Type': 'text/markdown; charset=utf-8',
                    },
                });
            } else if (contentType === 'speakers') {
                content = getContentBySlug('authors', slug);
                let markdown = `# ${content.metadata.title}\n\n`;
                markdown += `> ${content.metadata.position}${content.metadata.company ? ` at ${content.metadata.company}` : ''}\n\n`;

                if (content.metadata.social) {
                    markdown += `## ソーシャルメディア\n\n`;

                    if (content.metadata.social.twitter) {
                        markdown += `- [Twitter](${content.metadata.social.twitter})\n`;
                    }

                    if (content.metadata.social.linkedin) {
                        markdown += `- [LinkedIn](${content.metadata.social.linkedin})\n`;
                    }

                    if (content.metadata.social.github) {
                        markdown += `- [GitHub](${content.metadata.social.github})\n`;
                    }

                    markdown += '\n';
                }

                markdown += content.content;

                return new NextResponse(markdown, {
                    headers: {
                        'Content-Type': 'text/markdown; charset=utf-8',
                    },
                });
            } else {
                return new NextResponse('Content type not supported', { status: 404 });
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            return new NextResponse('Content not found', { status: 404 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
