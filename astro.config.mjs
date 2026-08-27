// @ts-check
import { defineConfig } from "astro/config";

// Cloudflare Pages への静的デプロイを前提とする(specs.md §7)。
// アダプタ不要の完全静的ビルド。JSは最小限に保つ。
export default defineConfig({
  output: "static",
  site: "https://dekitarou.pages.dev",
  trailingSlash: "always",
});
