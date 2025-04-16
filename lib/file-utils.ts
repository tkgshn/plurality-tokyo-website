import fs from 'fs';
import path from 'path';

/**
 * ディレクトリ構造やファイルコンテンツを取得するためのユーティリティ関数
 */

/**
 * ファイルアイテムのインターフェース
 */
export interface FileItem {
    type: 'file';
    path: string;
    content: string;
    size: number;
    lines: number;
}

/**
 * ディレクトリアイテムのインターフェース
 */
export interface DirectoryItem {
    type: 'directory';
    path: string;
    children: Record<string, FileItem | DirectoryItem>;
}

/**
 * ファイル拡張子別の構文強調表示用の言語を取得
 */
export function getLanguageByExtension(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'ts':
        case 'tsx':
            return 'typescript';
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'md':
        case 'mdx':
            return 'markdown';
        case 'json':
            return 'json';
        case 'css':
            return 'css';
        case 'scss':
            return 'scss';
        case 'html':
            return 'html';
        case 'yaml':
        case 'yml':
            return 'yaml';
        default:
            return 'plaintext';
    }
}

/**
 * 指定されたディレクトリのファイル構造を再帰的に取得
 */
export function getDirectoryStructure(dir: string, basePath = ''): Record<string, FileItem | DirectoryItem> {
    const result: Record<string, FileItem | DirectoryItem> = {};

    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        items.forEach(item => {
            const itemPath = path.join(dir, item.name);
            const relativePath = path.join(basePath, item.name);

            // 除外すべきディレクトリやファイル
            if (
                item.name === 'node_modules' ||
                item.name === '.git' ||
                item.name === '.next' ||
                item.name === '.vercel' ||
                item.name.startsWith('.')
            ) {
                return;
            }

            if (item.isDirectory()) {
                result[item.name] = {
                    type: 'directory',
                    path: relativePath,
                    children: getDirectoryStructure(itemPath, relativePath)
                };
            } else {
                // 除外すべきファイル形式
                if (
                    item.name.endsWith('.lock') ||
                    item.name.endsWith('.png') ||
                    item.name.endsWith('.jpg') ||
                    item.name.endsWith('.ico') ||
                    item.name.endsWith('.woff') ||
                    item.name.endsWith('.woff2')
                ) {
                    return;
                }

                let fileContent = '';
                try {
                    // ファイルサイズが大きすぎる場合はスキップ
                    const stats = fs.statSync(itemPath);

                    if (stats.size < 100000) { // 100KB未満のファイルのみ読み込む
                        fileContent = fs.readFileSync(itemPath, 'utf8');
                    } else {
                        fileContent = '/* ファイルが大きすぎるため内容は表示されません */';
                    }
                } catch (error) {
                    fileContent = '/* ファイルの読み込みに失敗しました */';
                }

                result[item.name] = {
                    type: 'file',
                    path: relativePath,
                    content: fileContent,
                    size: fs.statSync(itemPath).size,
                    lines: fileContent.split('\n').length
                };
            }
        });
    } catch (error) {
        console.error('ディレクトリの読み込みエラー:', error);
    }

    return result;
}

/**
 * 指定されたパスのファイルの内容を取得
 */
export function getFileContent(filePath: string): { content: string; size: number; lines: number } | null {
    try {
        const fullPath = filePath.startsWith('/') ? filePath : path.join(process.cwd(), filePath);
        const stats = fs.statSync(fullPath);

        if (stats.size > 500000) { // 500KBを超えるファイルは部分的に読み込む
            const content = '/* ファイルが大きすぎるため最初の部分のみ表示されます */\n\n' +
                fs.readFileSync(fullPath, { encoding: 'utf8', flag: 'r' }).slice(0, 50000);
            return {
                content,
                size: stats.size,
                lines: content.split('\n').length
            };
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        return {
            content,
            size: stats.size,
            lines: content.split('\n').length
        };
    } catch (error) {
        console.error('ファイルの読み込みエラー:', error);
        return null;
    }
}

/**
 * パスからファイル名のみを取得
 */
export function getFileName(filePath: string): string {
    return path.basename(filePath);
}

/**
 * ファイルパスをパーツに分解
 */
export function getPathParts(filePath: string): Array<{ name: string; path: string }> {
    const parts = filePath.split(path.sep).filter(Boolean);

    return [
        { name: 'root', path: '' },
        ...parts.map((part, index) => ({
            name: part,
            path: parts.slice(0, index + 1).join(path.sep)
        }))
    ];
}
