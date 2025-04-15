# Plurality Tokyo Website

Plurality Tokyo の公式ウェブサイトです。多様性と包括性を重視したコミュニティイベントの情報を発信します。

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- マークダウン（MDX）コンテンツ

## セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/your-username/plurality-tokyo.git
cd plurality-tokyo
```

2. 依存関係のインストール

```bash
pnpm install
```

3. 環境変数の設定
   `.env.local`ファイルを作成し、必要な環境変数を設定します（詳細は`.env.example`を参照）

4. 開発サーバーの起動

```bash
pnpm dev
```

## コンテンツ更新方法

このサイトはマークダウン（MDX）ベースのコンテンツ管理システムを採用しています。コンテンツの更新は以下のディレクトリのマークダウンファイルを編集するだけで反映されます：

- `/content/blog`: ブログ記事
- `/content/events`: イベント情報
- `/content/authors`: 著者プロフィール
- `/content/pages`: 固定ページ（About, Contact 等）

### 新しいコンテンツの追加手順

1. 適切なディレクトリに新しいマークダウンファイルを作成

   - ファイル名は`YYYY-MM-DD-title.md`の形式で作成
   - 例: `2024-03-20-welcome-to-plurality.md`

2. フロントマター（メタデータ）を記述

   ```md
   ---
   title: 記事タイトル
   date: 2024-03-20
   excerpt: 記事の要約（160文字以内）
   tags: [tag1, tag2]
   author: 著者名
   image: /images/posts/featured-image.jpg
   ---
   ```

3. 本文をマークダウン形式で記述
   - 見出しは`#`から`###`まで使用可能
   - コードブロックは```で囲む
   - リンクは`[テキスト](URL)`形式
   - 画像は`![代替テキスト](画像パス)`形式

### 画像の追加方法

1. 画像ファイルを`public/images`ディレクトリに配置

   - ブログ記事用: `public/images/posts/`
   - イベント用: `public/images/events/`
   - 著者用: `public/images/authors/`

2. 画像の最適化
   - 推奨サイズ: 1200x630px（OGP 用）
   - ファイル形式: WebP または JPEG
   - ファイルサイズ: 1MB 以下を推奨

### コンテンツのプレビュー

1. ローカル環境でプレビュー

   ```bash
   pnpm dev
   ```

   - `http://localhost:3000`で確認可能

2. プレビュー時の注意点
   - 画像のパスが正しいか確認
   - マークダウンの構文が正しいか確認
   - フロントマターの必須項目が記入されているか確認

## SEO 設定

- メタデータは`lib/metadata.ts`で管理
- OpenGraph 設定を含む
- サイトマップは自動生成

## 開発ルール

### ブランチ戦略

- `main`: 本番環境用
- `develop`: 開発環境用
- `feature/*`: 新機能開発用
- `hotfix/*`: 緊急バグ修正用

### コミットメッセージ

- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: フォーマット
- refactor: リファクタリング
- test: テスト
- chore: ビルドプロセスやツールの変更

### コードスタイル

- ESLint と Prettier を使用
- TypeScript の厳格な型チェックを有効化
- コンポーネントは Atomic Design に基づいて構成

## デプロイ

Vercel を使用して自動デプロイを設定しています。

## ライセンス

MIT License
