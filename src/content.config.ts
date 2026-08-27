import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * 責任者の4区分(specs.md §5)。この4値以外は存在させない。
 * shared(協議)= 未決 = 最大のリスク。UI側で警告色を割り当てる。
 */
export const ownerValues = ["contractor", "customer", "licensed", "shared"] as const;

const boundarySchema = z.object({
  layer: z.string(),
  owner: z.enum(ownerValues),
  note: z.string().optional(),
});

/**
 * 現場の5つの管理点(安全・品質・生産・原価・環境)。
 * 先方はこの軸で現場を管理している。知らずに入るとリスクになるため、
 * 全案件で擦り合わせる内容を明記する。「特になし」で流さず、必ず書く。
 */
const concernsSchema = z.object({
  safety: z.string().min(1),
  quality: z.string().min(1),
  production: z.string().min(1),
  cost: z.string().min(1),
  environment: z.string().min(1),
});

/**
 * 案件カード(specs.md §4, §7)。10件の実務ドキュメント。
 */
const cases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    difficulty: z.number().int().min(1).max(5),
    budgetRange: z.string(),
    duration: z.string(),
    requiresLicense: z.boolean(),
    licenseNotes: z.string().optional(),
    touchesEquipment: z.boolean(),
    categories: z.array(z.string()),
    boundaries: z.array(boundarySchema).min(1),
    concerns: concernsSchema,
    updated: z.coerce.date(),
  }),
});

/**
 * 横断ドキュメント(specs.md §4.1 (B))。3本のみ。
 */
const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    order: z.number().int(),
    updated: z.coerce.date(),
  }),
});

export const collections = { cases, guides };
