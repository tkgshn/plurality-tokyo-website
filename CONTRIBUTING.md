# Plurality Tokyo ウェブサイト コントリビューションガイド

Plurality Tokyo ウェブサイトプロジェクトへの貢献をご検討いただき、ありがとうございます。このガイドでは、コントリビューションのプロセスをスムーズにするための情報を提供します。

## 開発環境のセットアップ

1. リポジトリをクローンします：
   ```bash
   git clone https://github.com/tkgshn/plurality-tokyo-website.git
   cd plurality-tokyo-website
   ```

2. 依存関係をインストールします：
   ```bash
   npm install
   ```

3. 開発サーバーを起動します：
   ```bash
   npm run dev
   ```

4. ブラウザで http://localhost:3000 にアクセスして、サイトをプレビューします。

## ブランチ戦略

- `main`: 本番環境用ブランチ
- `develop`: 開発環境用ブランチ
- `feature/*`: 新機能開発用ブランチ
- `hotfix/*`: 緊急バグ修正用ブランチ

新しい機能やバグ修正に取り組む際は、`develop`ブランチから派生した新しいブランチを作成してください：

```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

## コミットメッセージ

コミットメッセージは以下の形式に従ってください：

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルドプロセスやツールの変更

例：
```
feat: イベントページに登壇者情報を追加
```

## プルリクエスト

1. ブランチに変更をプッシュします：
   ```bash
   git push -u origin feature/your-feature-name
   ```

2. GitHubでプルリクエストを作成し、`develop`ブランチをターゲットに選択します。

3. プルリクエストには、変更内容の簡潔な説明を含めてください。

## コンテンツの追加

### イベントの追加

1. `content/events/`ディレクトリに新しいマークダウンファイルを作成します。
2. 以下のフロントマターを含めてください：

   ```markdown
   ---
   title: イベントタイトル
   description: イベントの説明
   date: YYYY-MM-DD
   coverImage: /images/events/[event-name]/cover.jpg
   location: 開催場所
   ---

   イベントの本文...
   ```

3. イベント画像を`public/images/events/[event-name]/`に配置します。

### 記事の追加

1. `content/articles/`ディレクトリに新しいマークダウンファイルを作成します。
2. 以下のフロントマターを含めてください：

   ```markdown
   ---
   title: 記事タイトル
   date: YYYY-MM-DD
   excerpt: 記事の要約
   tags: [tag1, tag2]
   author: 著者名
   coverImage: /images/articles/[article-name]/cover.jpg
   ---

   記事の本文...
   ```

## ビルドとデプロイ

1. ローカルでビルドをテストします：
   ```bash
   npm run build
   ```

2. 変更をコミットしてプッシュします：
   ```bash
   git add .
   git commit -m "feat: 変更内容"
   git push
   ```

3. プルリクエストがマージされると、Vercelが自動的にデプロイします。

## トラブルシューティング

ビルドに問題がある場合は、以下を確認してください：

1. 依存関係が最新であることを確認：
   ```bash
   npm install
   ```

2. ビルドキャッシュをクリーンアップ：
   ```bash
   rm -rf .next
   npm run build
   ```

3. TypeScriptの型エラーを確認：
   ```bash
   npx tsc --noEmit
   ```
