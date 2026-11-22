# Mikansei Laboratory（未完成成果物研究所）Webサイト

Mikansei Laboratory（未完成成果物研究所）の公式サイトです。

- GitHub 組織: [https://github.com/MikanseiLaboratory](https://github.com/MikanseiLaboratory)
- 公式 X: [https://x.com/MikanseiDev](https://x.com/MikanseiDev)
- 公開 URL: [https://mikanseilaboratory.github.io/](https://mikanseilaboratory.github.io/)

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | ホーム。ニュース、プロダクト、コミュニティ、メンバー、問い合わせ |
| `/products/` | プロダクト一覧 |
| `/products/iryx.html` | Iryx（vMix向けハードウェアコントロールパネル） |
| `/products/eiviz.html` | eiviz（ソフトウェアスイッチャー） |
| `/products/streamdeck.html` | Stream Deck プラグイン |
| `/products/omt-tools.html` | OMT Community Tools |
| `/products/vmix-utility.html` | vmix-utility |
| `/products/srt-uri-generator.html` | SRT URI Generator |
| `/products/stagetimer.html` | ステージタイマー |
| `/members/` | メンバー |
| `/contact/` | お問い合わせ |
| `/news/` | ニュース一覧 |

旧 `/projects/*.html` は `/products/*.html` へリダイレクトします。転送用のHTMLは `public/projects/` にあります。

## 技術スタック

- [Vite](https://vitejs.dev/) 6
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4（`@tailwindcss/vite`）

ヘッダー・フッター・ナビゲーションは `src/main.ts` のカスタム要素（`site-header` / `site-footer` / `social-links`）で生成しています。共通の見た目は `src/style.css` にまとめています。

## 開発

```bash
npm install
npm run dev
```

ブラウザで表示されるローカル URL（通常は `http://localhost:5173`）を開きます。

## 本番ビルド

```bash
npm run build
```

成果物は `dist/` に出力されます。

```bash
npm run preview
```

で `dist/` の内容をローカルで確認できます。

## ニュースを追加するとき

ニュースは `data/news.json` が唯一の情報源です。配列の先頭に 1 件追加するだけで、次の 3 か所に自動で反映されます（`news-plugin.ts`）。

- ホームのニュース欄（全件をカードで表示）
- `/news/` の一覧と `ItemList` の構造化データ
- `/news/feed.xml`（RSS）

```json
{
  "date": "2026-11-23",
  "title": "記事タイトル",
  "summary": "一覧とホームに出す要約",
  "url": "https://note.com/...",
  "category": "試験運用",
  "tags": ["篝火#16"]
}
```

`date` の降順で並びます。`npm run dev` 中に保存すると自動でリロードされます。

## ページを追加するとき

1. プロダクトは `products/<slug>.html`、ニュースは `news/<date>-<slug>.html` に追加します。
2. `vite.config.ts` の `build.rollupOptions.input` にファイルを登録します。
3. ヘッダーのナビゲーションや一覧に載せる場合は `src/main.ts` と各一覧ページを更新します。
4. `public/sitemap.xml` に URL を追加し、ニュースの場合は `public/news/feed.xml` と `news/index.html`、ホームのニュース欄も更新します。
5. 各ページに次のSEO要素を入れます。
   - 固有の `<title>` と `meta description`
   - `link rel="canonical"`
   - OGP / Twitter Card
   - 構造化データ（`application/ld+json`）
   - パンくずリスト

## GitHub Pages へのデプロイ

1. リポジトリの **Settings → Pages** で **Build and deployment** の **Source** を **GitHub Actions** に設定します。
2. `main` ブランチへプッシュすると、[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) がビルドし、Pages に `dist` がデプロイされます。

`user.github.io` / `org.github.io` 形式のリポジトリでは、サイトはドメインルート（`base: '/'`）で公開されます。
