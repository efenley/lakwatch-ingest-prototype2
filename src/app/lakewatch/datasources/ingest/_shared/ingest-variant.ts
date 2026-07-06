export type IngestVariant = "option1" | "option2"

export const INGEST_VARIANT_BASE: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest",
  option2: "/lakewatch/datasources/ingest-v2",
}

export const INGEST_CONFIGURE_PATH: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest/configure",
  option2: "/lakewatch/datasources/ingest-v2/configure",
}

export function getIngestVariant(pathname: string): IngestVariant | null {
  if (pathname.startsWith(INGEST_VARIANT_BASE.option2)) return "option2"
  if (pathname.startsWith(INGEST_VARIANT_BASE.option1)) return "option1"
  return null
}

function isOnConfigureFlow(pathname: string): boolean {
  return (
    pathname.startsWith(INGEST_CONFIGURE_PATH.option1) ||
    pathname.startsWith(INGEST_CONFIGURE_PATH.option2)
  )
}

/** Maps the current flow (entry vs configure) to the matching route in another variant. */
export function getIngestPathForVariant(
  variant: IngestVariant,
  pathname: string,
  search = "",
): string {
  const path = isOnConfigureFlow(pathname)
    ? INGEST_CONFIGURE_PATH[variant]
    : INGEST_VARIANT_BASE[variant]
  return `${path}${search}`
}

export function getAlternateIngestPath(pathname: string, search = ""): string | null {
  const variant = getIngestVariant(pathname)
  if (!variant) return null

  const nextVariant: IngestVariant = variant === "option1" ? "option2" : "option1"
  return getIngestPathForVariant(nextVariant, pathname, search)
}
