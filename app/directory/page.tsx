import { Metadata } from "next"
import path from "path"
import fs from 'fs'
import dynamic from 'next/dynamic'

// CopyButtonをクライアントコンポーネントとして動的にインポート
const CopyButton = dynamic(() => import('@/components/CopyButton'), { ssr: false })

export const metadata: Metadata = {
    title: "コンテンツ構造 | Plurality Tokyo",
    description: "Plurality Tokyoのコンテンツ構造",
}

/**
 * ディレクトリ構造をプレーンテキストの木構造で表示する関数
 */
function generateTreeText(dir: string, prefix: string = '', isLast: boolean = true): string {
    const basename = path.basename(dir);
    const newPrefix = prefix + (isLast ? '    ' : '│   ');

    if (fs.statSync(dir).isFile()) {
        return `${prefix}${isLast ? '└── ' : '├── '}${basename}\n`;
    }

    let treeText = `${prefix}${isLast ? '└── ' : '├── '}${basename}\n`;

    try {
        const items = fs.readdirSync(dir, { withFileTypes: true })
            .filter(item => !item.name.startsWith('.') && item.name !== 'node_modules');

        const sortedItems = [...items].sort((a, b) => {
            // ディレクトリを先に
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

        sortedItems.forEach((item, index) => {
            const isLastItem = index === sortedItems.length - 1;
            const itemPath = path.join(dir, item.name);

            if (item.isDirectory()) {
                treeText += generateTreeText(itemPath, newPrefix, isLastItem);
            } else {
                treeText += `${newPrefix}${isLastItem ? '└── ' : '├── '}${item.name}\n`;
            }
        });
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }

    return treeText;
}

/**
 * マークダウンファイルの内容を取得し、ファイルコンテンツセクションを生成する関数
 */
function generateFileContentSection(dir: string): string {
    let fileContentSection = '';

    try {
        const scanDir = (currentDir: string, relativePath: string = '') => {
            const items = fs.readdirSync(currentDir, { withFileTypes: true })
                .filter(item => !item.name.startsWith('.') && item.name !== 'node_modules');

            for (const item of items) {
                const itemPath = path.join(currentDir, item.name);
                const itemRelativePath = relativePath ? `${relativePath}/${item.name}` : item.name;

                if (item.isDirectory()) {
                    scanDir(itemPath, itemRelativePath);
                } else if (item.name.endsWith('.md') || item.name.endsWith('.mdx')) {
                    try {
                        const stats = fs.statSync(itemPath);
                        const content = fs.readFileSync(itemPath, 'utf8');
                        const lines = content.split('\n').length;

                        fileContentSection += '\n\n--------------------------------------------------------------------------------\n';
                        fileContentSection += `/${itemRelativePath}:\n`;
                        fileContentSection += '--------------------------------------------------------------------------------\n';

                        // ファイルの内容を行番号付きですべて表示
                        const contentLines = content.split('\n');

                        for (let i = 0; i < contentLines.length; i++) {
                            fileContentSection += ` ${i + 1} | ${contentLines[i]}\n`;
                        }
                    } catch (error) {
                        fileContentSection += `/* ファイルの読み込みに失敗しました: ${error} */\n`;
                    }
                }
            }
        };

        scanDir(dir);
    } catch (error) {
        fileContentSection += `/* ディレクトリの読み込みに失敗しました: ${error} */\n`;
    }

    return fileContentSection;
}

/**
 * ファイルの内容を取得する関数
 */
function getFileContent(filePath: string): string {
    try {
        const stats = fs.statSync(filePath);

        if (stats.size > 500000) { // 500KBを超えるファイルは部分的に読み込む
            return `/* ファイルが大きすぎるため最初の部分のみ表示されます (${(stats.size / 1024).toFixed(1)}KB) */\n\n` +
                fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }).slice(0, 50000);
        }

        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return `/* ファイルの読み込みに失敗しました: ${error} */`;
    }
}

/**
 * ファイルの内容を表示するためのHTML（シンプルにテキストのみ）
 */
function renderFileContent(content: string): JSX.Element {
    return (
        <>
            <CopyButton text={content} />
            <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
                {content}
            </pre>
        </>
    );
}

/**
 * ディレクトリツリーをテキストとして表示するためのHTML
 */
function renderTreeText(treeText: string, fileContents: string): JSX.Element {
    const fullText = treeText + fileContents;
    return (
        <>
            <CopyButton text={fullText} />
            <pre className="p-4 font-mono text-sm whitespace-pre">
                {treeText}
                {fileContents}
            </pre>
        </>
    );
}

export default function DirectoryPage({ searchParams }: { searchParams: { path?: string, view?: string } }) {
    // クエリパラメータからパスを取得
    const currentPath = searchParams.path || '';
    const view = searchParams.view || 'tree';

    // プロジェクトのルートディレクトリ情報
    const rootDir = process.cwd();
    const contentDir = path.join(rootDir, 'content');

    // ファイルパスまたはディレクトリパスの作成
    const targetPath = currentPath
        ? path.join(contentDir, currentPath)
        : contentDir;

    // ファイルまたはディレクトリの存在確認
    const exists = fs.existsSync(targetPath);
    const isDirectory = exists && fs.statSync(targetPath).isDirectory();

    // レスポンスの準備
    let content: JSX.Element;
    let textContent = '';

    if (!exists) {
        // パスが存在しない場合
        textContent = `指定されたパスは存在しません: ${targetPath}`;
        content = (
            <>
                <CopyButton text={textContent} />
                <pre className="p-4 font-mono text-sm">
                    {textContent}
                </pre>
            </>
        );
    } else if (isDirectory && view === 'tree') {
        // ディレクトリのツリー表示とファイル内容セクション
        const treeText = generateTreeText(targetPath);
        const fileContents = generateFileContentSection(targetPath);
        content = renderTreeText(treeText, fileContents);
    } else if (!isDirectory && view === 'file') {
        // ファイルの内容表示
        const fileContent = getFileContent(targetPath);
        content = renderFileContent(fileContent);
    } else {
        // ディレクトリの内容一覧（シンプルなリスト表示）
        try {
            const items = fs.readdirSync(targetPath, { withFileTypes: true });
            const fileList = items
                .filter(item => !item.name.startsWith('.'))
                .sort((a, b) => {
                    if (a.isDirectory() && !b.isDirectory()) return -1;
                    if (!a.isDirectory() && b.isDirectory()) return 1;
                    return a.name.localeCompare(b.name);
                })
                .map(item => {
                    const itemPath = path.join(targetPath, item.name);

                    if (item.isDirectory()) {
                        return `[dir]  ${item.name}/\n`;
                    } else {
                        const stats = fs.statSync(itemPath);
                        const sizeKB = (stats.size / 1024).toFixed(1);
                        const lines = fs.readFileSync(itemPath, 'utf8').split('\n').length;
                        return `[file] ${item.name} (${sizeKB}KB, ${lines}行)\n`;
                    }
                })
                .join('');

            textContent = `${targetPath}:\n\n${fileList}`;
            content = (
                <>
                    <CopyButton text={textContent} />
                    <pre className="p-4 font-mono text-sm whitespace-pre">
                        {textContent}
                    </pre>
                </>
            );
        } catch (error) {
            textContent = `ディレクトリの読み込みに失敗しました: ${String(error)}`;
            content = (
                <>
                    <CopyButton text={textContent} />
                    <pre className="p-4 font-mono text-sm">
                        {textContent}
                    </pre>
                </>
            );
        }
    }

    // 極めてシンプルな表示
    return (
        <div style={{ maxWidth: '100%', margin: '0', padding: '0', fontFamily: 'monospace', background: '#000', color: '#ddd', minHeight: '100vh' }}>
            <div style={{ padding: '20px' }}>
                {content}
            </div>
        </div>
    );
}
