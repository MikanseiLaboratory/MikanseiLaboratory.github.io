# Mikansei Laboratory（未完成成果物研究所）Landing Page

Mikansei Laboratory（未完成成果物研究所）のランディングページです。

GitHub 組織: [https://github.com/MikanseiLaboratory](https://github.com/MikanseiLaboratory)

公開 URL: [https://mikanseilaboratory.github.io/](https://mikanseilaboratory.github.io/)

## 技術スタック

- [Vite](https://vitejs.dev/) 6
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4（`@tailwindcss/vite`）

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

## GitHub Pages へのデプロイ

1. リポジトリの **Settings → Pages** で **Build and deployment** の **Source** を **GitHub Actions** に設定します。
2. `main` ブランチへプッシュすると、[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) がビルドし、Pages に `dist` がデプロイされます。

`user.github.io` / `org.github.io` 形式のリポジトリでは、サイトはドメインルート（`base: '/'`）で公開されます。
