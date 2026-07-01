export type IngestVariant = "option1" | "option2"

export const INGEST_VARIANT_BASE: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest",
  option2: "/lakewatch/datasources/ingest-v2",
}

export function getIngestVariant(pathname: string): IngestVariant | null {
  if (pathname.startsWith(INGEST_VARIANT_BASE.option2)) return "option2"
  if (pathname.startsWith(INGEST_VARIANT_BASE.option1)) return "option1"
  return null
}

/** Each option has a single entry route — sub-paths are not mirrored across variants. */
export function getIngestPathForVariant(variant: IngestVariant, search = ""): string {
  return `${INGEST_VARIANT_BASE[variant]}${search}`
}

export function getAlternateIngestPath(pathname: string, search = ""): string | null {
  const variant = getIngestVariant(pathname)
  if (!variant) return null

  const nextVariant: IngestVariant = variant === "option1" ? "option2" : "option1"
  return getIngestPathForVariant(nextVariant, search)
}
