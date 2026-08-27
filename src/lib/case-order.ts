/**
 * 案件カードの掲載順(specs.md §4.2)。
 * 受注しやすさ順ではなく、責任分界の説明力が高い順。
 */
export const caseOrder = [
  "temp-humidity-monitor",
  "current-clamp-logging",
  "plc-data-export",
  "operation-time-visualization",
  "alert-notification",
  "webcam-monitoring",
  "inspection-form-web",
  "excel-automation",
  "legacy-equipment-data",
  "energy-visualization",
];

export function bySpecOrder<T extends { data: { slug: string } }>(a: T, b: T): number {
  return caseOrder.indexOf(a.data.slug) - caseOrder.indexOf(b.data.slug);
}
