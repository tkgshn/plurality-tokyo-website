# Plurality Tokyo - Cursor ルール

このプロジェクトでは、コンテンツを簡単に管理するためにマークダウンベースのコンテンツ管理システムを採用しています。

## コンテンツ編集方法

以下のディレクトリにマークダウンファイル（.md または .mdx）を追加・編集することで、ウェブサイトのコンテンツを更新できます：

- `/content/blog`: ブログ記事
- `/content/events`: Events 情報
- `/content/articles`: 記事コンテンツ
- `/content/authors`: 著者プロフィール

## マークダウンフォーマット

マークダウンファイルは、フロントマター（YAML 形式のメタデータ）と本文で構成されています：

```md
---
title: "コンテンツのタイトル"
date: "2024-04-15"
description: "簡単な説明"
tags: ["tag1", "tag2"]
---

# コンテンツのタイトル

本文をここに記述します。マークダウン形式で自由に書けます。

## 見出し 2

- リスト 1
- リスト 2

[リンク](https://example.com)

![画像の説明](/path/to/image.jpg)
```

## Events ページのフォーマット

Events ページには以下のフィールドが必要です：

```md
---
title: "Eventsタイトル"
date: "2024-04-15"
end_date: "2024-04-15" # 終了日（省略可）
location: "開催場所"
description: "Eventsの説明"
status: "upcoming" # upcoming, ongoing, ended
speakers:
  - name: "スピーカー名"
    avatar_url: "/images/speakers/avatar.jpg"
---

# Events タイトル

Events の詳細内容...
```

## 著者ページのフォーマット

著者ページには以下のフィールドが必要です：

```md
---
name: "著者名"
role: "役職"
bio: "簡単な経歴"
avatar_url: "/images/authors/avatar.jpg"
sns:
  twitter: "twitterハンドル"
  github: "githubハンドル"
---

著者の詳細プロフィール...
```

## 画像の追加

画像ファイルは `/public/images/` ディレクトリに保存してください。以下のように参照できます：

```md
![画像の説明](/images/example.jpg)
```

## 変更の反映方法

1. マークダウンファイルを編集
2. 変更をコミット
3. GitHub にプッシュ

プッシュされた変更は自動的にウェブサイトに反映されます。
