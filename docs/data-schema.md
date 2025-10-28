# データファイル (JSON) の記述方法

このプロジェクトのコンテンツは、GitHubリポジトリの `assets` ブランチに配置された以下のJSONファイルによって管理されています。

**リポジトリ**: `https://github.com/snakewolflab/snakewolf-website`
**ブランチ**: `assets`

各データを更新する際は、このブランチにあるJSONファイルを直接編集・コミットしてください。

---

## 1. ニュースデータ (`news.json`)

ニュース記事の一覧を管理します。ファイルはオブジェクトの配列である必要があります。

### 各オブジェクトの構造

| キー              | 型       | 必須 | 説明                                                                              |
| ----------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| `id`              | `string` | ✅   | 記事の一意なID。他の記事と重複しないようにしてください。(例: "news-001")             |
| `slug`            | `string` | ✅   | 記事ページのURLになる文字列。英数字とハイフンのみ使用可能です。(例: "first-announcement") |
| `title`           | `string` | ✅   | 記事のタイトル。                                                                  |
| `publicationDate` | `string` | ✅   | 公開日。`YYYY-MM-DDTHH:mm:ssZ` のISO形式で記述します。(例: "2024-07-25T12:00:00Z") |
| `contentSummary`  | `string` | ✅   | ニュース一覧ページに表示される短い要約文。                                        |
| `content`         | `string` | ✅   | 記事の本文。HTMLタグを使用できます。                                               |
| `tags`            | `array`  | ✅   | タグの配列。文字列で記述します。                                                    |
| `imageId`         | `string` | ❌   | メイン画像のファイル名。`assets`ブランチのルートに配置した画像ファイル名を指定します。  |

### 記述例 (`news.json`)
```json
[
  {
    "id": "news-001",
    "slug": "welcome-to-our-new-website",
    "title": "ウェブサイトをリニューアルしました！",
    "publicationDate": "2024-07-28T10:00:00Z",
    "contentSummary": "SnakeWolfの公式ウェブサイトが新しくなりました。最新の情報はこちらでご確認ください。",
    "content": "<h1>新しいウェブサイトへようこそ</h1><p>この度、SnakeWolfの公式サイトを全面リニューアルいたしました。今後ともよろしくお願いいたします。</p>",
    "tags": ["お知らせ", "リニューアル"],
    "imageId": "renewal-banner.png"
  }
]
```

---

## 2. クリエイターデータ (`creators.json`)

支援しているクリエイターの一覧を管理します。

### 各オブジェクトの構造

| キー          | 型       | 必須 | 説明                                                                                    |
| ------------- | -------- | ---- | --------------------------------------------------------------------------------------- |
| `id`          | `string` | ✅   | クリエイターの一意なID。(例: "creator-sato")                                           |
| `name`        | `string` | ✅   | クリエイター名。                                                                        |
| `description` | `string` | ✅   | クリエイターの紹介文。                                                                  |
| `imageId`     | `string` | ✅   | プロフィール画像のファイル名。`assets`ブランチのルートに配置した画像ファイル名を指定します。 |
| `url`         | `string` | ✅   | クリエイターのメイン活動ページのURL。(例: YouTube, Twitterなど)                       |
| `tags`        | `array`  | ✅   | クリエイターの活動内容を示すタグの配列。                                                |

### 記述例 (`creators.json`)
```json
[
  {
    "id": "creator-01",
    "name": "スネウル君",
    "description": "SnakeWolfの公式マスコットキャラクター。デジタルワールドに生まれたオオカミの精霊で、みんなの活動をこっそり応援している。",
    "imageId": "character/1.png",
    "url": "/suneuru-kun",
    "tags": ["VTuber", "公式キャラクター"]
  }
]
```

---

## 3. 実績データ (`works.json`)

開発したアプリやゲームの一覧を管理します。

### 各オブジェクトの構造

| キー              | 型       | 必須 | 説明                                                                                             |
| ----------------- | -------- | ---- | ------------------------------------------------------------------------------------------------ |
| `id`              | `string` | ✅   | 実績の一意なID。(例: "app-001")                                                                  |
| `slug`            | `string` | ✅   | 実績詳細ページのURLになる文字列。英数字とハイフンのみ使用可能です。(例: "super-chat-app")        |
| `title`           | `string` | ✅   | アプリ・ゲームのタイトル。                                                                        |
| `category`        | `string` | ✅   | `"App"` または `"Game"` のいずれかを指定します。                                                     |
| `description`     | `string` | ✅   | 実績一覧ページに表示される短い説明文。                                                             |
| `longDescription` | `string` | ✅   | 詳細ページに表示される詳しい説明文。HTMLタグを使用できます。                                       |
| `platforms`       | `array`  | ✅   | 対応プラットフォームの配列。オブジェクト(`{ "name": "iOS", "url": "#" }`)で記述します。URLが未定の場合は`#`を指定。 |
| `imageId`         | `string` | ✅   | メイン画像のファイル名。`assets`ブランチのルートに配置した画像ファイル名を指定します。          |
| `galleryImageIds` | `array`  | ✅   | 詳細ページに表示するギャラリー画像のファイル名の配列。`assets`ブランチのルートに配置します。    |

### 記述例 (`works.json`)
```json
[
  {
    "id": "app-001",
    "slug": "example-app",
    "title": "すごいアプリ",
    "category": "App",
    "description": "日常を劇的に変える、革新的なすごいアプリです。",
    "longDescription": "<h2>すごいアプリとは</h2><p>このアプリは、AIと最新技術を駆使してあなたの生活をサポートします。詳細は近日公開！</p>",
    "platforms": [
      { "name": "iOS", "url": "https://apps.apple.com" },
      { "name": "Android", "url": "#" }
    ],
    "imageId": "works/app01/main.png",
    "galleryImageIds": [
      "works/app01/gallery01.png",
      "works/app01/gallery02.png"
    ]
  }
]
```
