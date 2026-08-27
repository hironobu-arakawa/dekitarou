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
