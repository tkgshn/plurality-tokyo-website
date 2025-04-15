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

マークダウンファイルを編集して GitHub にプッシュするだけで、自動的にサイトに反映されます。

### マークダウンファイルの構造

マークダウンファイルは以下の構造になっています：

```md
---
title: 記事タイトル
date: 2023-01-01
excerpt: 記事の要約
tags: [tag1, tag2]
---

ここに本文を書きます。マークダウン形式で記述できます。
```

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
