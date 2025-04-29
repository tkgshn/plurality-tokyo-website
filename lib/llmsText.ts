import fs from 'fs';
import path from 'path';
import { getAllEvents } from './content';
import { getAllArticles } from './content';
import { getAllSpeakers } from './content';
import { getContentBySlug } from './content';

/**
 * LLMs.txt Generator
 *
 * このモジュールはPlurality Tokyoウェブサイトのコンテンツに基づいて
 * 動的に/llms.txtファイルを生成します。
 *
 * llms.txtの仕様に従い、マークダウン形式でLLMが理解しやすい構造を提供します。
 * また、各コンテンツページの.md拡張子版も生成します。
 */

interface LlmsTextSection {
    title: string;
    optional?: boolean;
    links: Array<{
        title: string;
        url: string;
        description?: string;
    }>;
}

/**
 * サイトのコンテンツからllms.txtを動的に生成する
 */
export async function generateLlmsText(): Promise<string> {
    // サイト情報を取得
    const events = getAllEvents();
    const articles = getAllArticles();
    const speakers = getAllSpeakers();

    // llms.txtの基本構造
    let llmsText = `# Plurality Tokyo

> Plurality Tokyoは、分散型技術や多様性、包括性に焦点を当てたコミュニティEventsです。技術革新と社会の多様性について議論し、新しいアイデアや関係性を育むプラットフォームを提供しています。

Plurality Tokyoは、技術とコミュニティの交差点にあるEventsシリーズです。私たちは、Web3、分散型技術、そして多様で包括的な未来に関する対話を促進します。

## Events

`;

    // 最新のEvents情報を追加
    events.slice(0, 5).forEach(event => {
        const locale = process.env.NEXT_LOCALE || 'ja-JP';
        const eventDate = event.metadata.date 
            ? new Date(event.metadata.date).toLocaleDateString(locale) 
            : locale === 'en-US' ? 'Date TBD' : '日付未定';
        llmsText += `- [${event.metadata.title}](/events/${event.metadata.slug}.html.md): ${eventDate}に${event.metadata.location}で開催。${event.metadata.description}\n`;
    });

    // 記事セクションを追加
    llmsText += `\n## 記事\n\n`;
    articles.slice(0, 5).forEach(article => {
        llmsText += `- [${article.metadata.title}](/articles/${article.metadata.slug}.html.md): ${article.metadata.description}\n`;
    });

    // スピーカーセクションを追加
    llmsText += `\n## スピーカー\n\n`;
    speakers.slice(0, 5).forEach(speaker => {
        llmsText += `- [${speaker.metadata.title}](/speakers/${speaker.metadata.slug}.html.md): ${speaker.metadata.position}${speaker.metadata.company ? ` at ${speaker.metadata.company}` : ''}\n`;
    });

    // オプションセクションを追加
    llmsText += `\n## Optional\n\n`;
    llmsText += `- [過去のEventsアーカイブ](/events/index.html.md): 過去に開催された全てのEvents記録\n`;
    llmsText += `- [すべての記事](/articles/index.html.md): 公開されている全ての記事\n`;
    llmsText += `- [お問い合わせ](/contact/index.html.md): お問い合わせフォーム\n`;

    return llmsText;
}

/**
 * コンテンツページのマークダウンバージョンを生成する
 * llms.txtの仕様に従い、同じURLにマークダウン版を提供する
 */
export async function generateMarkdownVersions(): Promise<void> {
    const events = getAllEvents();
    const articles = getAllArticles();
    const speakers = getAllSpeakers();

    // 出力ディレクトリの作成
    const publicDir = path.join(process.cwd(), 'public');
    createDirIfNotExists(path.join(publicDir, 'events'));
    createDirIfNotExists(path.join(publicDir, 'articles'));
    createDirIfNotExists(path.join(publicDir, 'speakers'));

    // Eventsページのマークダウン版を生成
    for (const event of events) {
        const outputPath = path.join(publicDir, 'events', `${event.metadata.slug}.html.md`);
        const markdownContent = generateEventMarkdown(event);
        fs.writeFileSync(outputPath, markdownContent, 'utf8');
    }

    // 記事ページのマークダウン版を生成
    for (const article of articles) {
        const outputPath = path.join(publicDir, 'articles', `${article.metadata.slug}.html.md`);
        const markdownContent = generateArticleMarkdown(article);
        fs.writeFileSync(outputPath, markdownContent, 'utf8');
    }

    // スピーカーページのマークダウン版を生成
    for (const speaker of speakers) {
        const outputPath = path.join(publicDir, 'speakers', `${speaker.metadata.slug}.html.md`);
        const markdownContent = generateSpeakerMarkdown(speaker);
        fs.writeFileSync(outputPath, markdownContent, 'utf8');
    }

    // インデックスページのマークダウン版を生成
    generateIndexMarkdownPages(publicDir, events, articles, speakers);
}

/**
 * Eventsページのマークダウンコンテンツを生成
 */
function generateEventMarkdown(event: any): string {
    const locale = process.env.NEXT_LOCALE || 'ja-JP';
    const eventDate = event.metadata.date 
        ? new Date(event.metadata.date).toLocaleDateString(locale) 
        : locale === 'en-US' ? 'Date TBD' : '日付未定';
    let markdown = `# ${event.metadata.title}\n\n`;
    markdown += `> ${eventDate}に${event.metadata.location}で開催\n\n`;
    markdown += `${event.metadata.description}\n\n`;

    if (event.metadata.speakers && event.metadata.speakers.length > 0) {
        markdown += `## スピーカー\n\n`;
        event.metadata.speakers.forEach((speaker: any) => {
            markdown += `- ${speaker.name}${speaker.role ? ` (${speaker.role})` : ''}\n`;
        });
        markdown += '\n';
    }

    markdown += event.content;
    return markdown;
}

/**
 * 記事ページのマークダウンコンテンツを生成
 */
function generateArticleMarkdown(article: any): string {
    let markdown = `# ${article.metadata.title}\n\n`;
    markdown += `> ${article.metadata.description}\n\n`;

    if (article.metadata.author) {
        markdown += `著者: ${article.metadata.author}\n\n`;
    }

    if (article.metadata.date) {
        const locale = process.env.NEXT_LOCALE || 'ja-JP';
        const dateLabel = locale === 'en-US' ? 'Published on: ' : '公開日: ';
        markdown += `${dateLabel}${new Date(article.metadata.date).toLocaleDateString(locale)}\n\n`;
    }

    markdown += article.content;
    return markdown;
}

/**
 * スピーカーページのマークダウンコンテンツを生成
 */
function generateSpeakerMarkdown(speaker: any): string {
    let markdown = `# ${speaker.metadata.title}\n\n`;
    markdown += `> ${speaker.metadata.position}${speaker.metadata.company ? ` at ${speaker.metadata.company}` : ''}\n\n`;

    if (speaker.metadata.social) {
        markdown += `## ソーシャルメディア\n\n`;

        if (speaker.metadata.social.twitter) {
            markdown += `- [Twitter](${speaker.metadata.social.twitter})\n`;
        }

        if (speaker.metadata.social.linkedin) {
            markdown += `- [LinkedIn](${speaker.metadata.social.linkedin})\n`;
        }

        if (speaker.metadata.social.github) {
            markdown += `- [GitHub](${speaker.metadata.social.github})\n`;
        }

        markdown += '\n';
    }

    markdown += speaker.content;
    return markdown;
}

/**
 * インデックスページのマークダウン版を生成
 */
function generateIndexMarkdownPages(publicDir: string, events: any[], articles: any[], speakers: any[]): void {
    // Events一覧ページ
    let eventsIndex = `# Events一覧\n\n`;
    events.forEach(event => {
        const locale = process.env.NEXT_LOCALE || 'ja-JP';
        const eventDate = event.metadata.date 
            ? new Date(event.metadata.date).toLocaleDateString(locale) 
            : locale === 'en-US' ? 'Date TBD' : '日付未定';
        eventsIndex += `- [${event.metadata.title}](/events/${event.metadata.slug}.html.md): ${eventDate}に${event.metadata.location}で開催\n`;
    });
    fs.writeFileSync(path.join(publicDir, 'events', 'index.html.md'), eventsIndex, 'utf8');

    // 記事一覧ページ
    let articlesIndex = `# 記事一覧\n\n`;
    articles.forEach(article => {
        articlesIndex += `- [${article.metadata.title}](/articles/${article.metadata.slug}.html.md): ${article.metadata.description}\n`;
    });
    fs.writeFileSync(path.join(publicDir, 'articles', 'index.html.md'), articlesIndex, 'utf8');

    // スピーカー一覧ページ
    let speakersIndex = `# スピーカー一覧\n\n`;
    speakers.forEach(speaker => {
        speakersIndex += `- [${speaker.metadata.title}](/speakers/${speaker.metadata.slug}.html.md): ${speaker.metadata.position}${speaker.metadata.company ? ` at ${speaker.metadata.company}` : ''}\n`;
    });
    fs.writeFileSync(path.join(publicDir, 'speakers', 'index.html.md'), speakersIndex, 'utf8');
}

/**
 * 指定されたディレクトリが存在しない場合は作成する
 */
function createDirIfNotExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * llms.txtファイルと各ページのマークダウン版を生成
 */
export async function writeLlmsTextFile(): Promise<void> {
    try {
        // llms.txtファイルの生成
        const llmsText = await generateLlmsText();
        const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
        fs.writeFileSync(outputPath, llmsText, 'utf8');
        console.log('llms.txt has been generated successfully at', outputPath);

        // 各ページのマークダウン版を生成
        await generateMarkdownVersions();
        console.log('Markdown versions of content pages have been generated successfully');

    } catch (error) {
        console.error('Error generating llms.txt and markdown files:', error);
    }
}
