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

function mapOption1ToOption2(pathname: string): string {
  const base = INGEST_VARIANT_BASE.option1
  const suffix = pathname.slice(base.length)

  if (!suffix || suffix === "") {
    return INGEST_VARIANT_BASE.option2
  }

  if (suffix.startsWith("/configure")) {
    const afterConfigure = suffix.slice("/configure".length)
    return `${INGEST_VARIANT_BASE.option2}${afterConfigure}`
  }

  return `${INGEST_VARIANT_BASE.option2}${suffix}`
}

function mapOption2ToOption1(pathname: string): string {
  const base = INGEST_VARIANT_BASE.option2
  const suffix = pathname.slice(base.length)

  if (!suffix || suffix === "" || suffix === "/browse") {
    return `${INGEST_VARIANT_BASE.option1}/configure`
  }

  if (suffix.startsWith("/browse")) {
    return `${INGEST_VARIANT_BASE.option1}/configure/browse`
  }

  return `${INGEST_VARIANT_BASE.option1}/configure${suffix}`
}

export function getAlternateIngestPath(pathname: string, search = ""): string | null {
  const variant = getIngestVariant(pathname)
  if (!variant) return null

  const targetPath =
    variant === "option1" ? mapOption1ToOption2(pathname) : mapOption2ToOption1(pathname)

  return `${targetPath}${search}`
}
