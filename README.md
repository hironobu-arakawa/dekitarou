# デキタロウ

現場(OT)で小さなDX案件を受注しようとするエンジニアが、現場に入る前に読むサイト。

仕様は `docs/specs.md` を参照。実装はこの仕様の範囲を勝手に広げないこと。

## 技術スタック

- **Astro 5** — Content Collections でMarkdownを型付き管理
- **素のCSS** — Tailwind不使用。トークンは `src/styles/tokens.css`
- **ホスティング** — Cloudflare Pages(静的ビルド)

## 開発

```sh
npm install
npm run dev      # 開発サーバー (http://localhost:4321)
npm run build    # 静的ビルド(dist/ に出力)
npm run preview  # ビルド結果のプレビュー
```

## ディレクトリ

```
src/
  content/
    cases/          案件カード(*.md、10件)
    guides/         横断ドキュメント(*.md、3本)
  components/       ResponsibilityBoundary.astro ほか
  layouts/          Base.astro / Case.astro / Guide.astro
  pages/            ルーティング
  styles/           tokens.css / global.css
src/content.config.ts   Content Collections スキーマ(zod)
```

## コンテンツの書き方

- 案件カードの frontmatter スキーマは `src/content.config.ts` の `cases` を参照
- 責任者は4値のみ: `contractor` / `customer` / `licensed` / `shared`
- 実在の企業・工場・案件を特定できる記述は書かない(specs.md §9)
