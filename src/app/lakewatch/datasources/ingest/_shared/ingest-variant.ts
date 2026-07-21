export type IngestVariant = "option1" | "option2"

export const PROTOTYPE_QUERY_KEY = "prototype"

export const INGEST_VARIANT_BASE: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest",
  option2: "/lakewatch/datasources/ingest-v2",
}

const DATASOURCES_LIST_PATH = "/lakewatch/datasources"

const DATASOURCE_LIST_QUERY_KEYS = [
  PROTOTYPE_QUERY_KEY,
  "created",
  "name",
  "bronzeViewName",
  "location",
  "source",
  "sourceType",
] as const

export function isDatasourcesListPath(pathname: string) {
  return pathname === DATASOURCES_LIST_PATH || pathname === `${DATASOURCES_LIST_PATH}/`
}

export function parseIngestVariant(search: string | URLSearchParams): IngestVariant {
  const params =
    typeof search === "string" ? new URLSearchParams(search.replace(/^\?/, "")) : search
  return params.get(PROTOTYPE_QUERY_KEY) === "option2" ? "option2" : "option1"
}

export function getIngestVariant(pathname: string, search = ""): IngestVariant | null {
  if (pathname.startsWith(`${INGEST_VARIANT_BASE.option2}/`) || pathname === INGEST_VARIANT_BASE.option2) {
    return "option2"
  }
  if (pathname.startsWith(`${INGEST_VARIANT_BASE.option1}/`) || pathname === INGEST_VARIANT_BASE.option1) {
    return "option1"
  }
  if (isDatasourcesListPath(pathname)) return parseIngestVariant(search)
  return null
}

export function getIngestPathForVariant(variant: IngestVariant, search = ""): string {
  const params = new URLSearchParams(search.replace(/^\?/, ""))
  for (const key of DATASOURCE_LIST_QUERY_KEYS) {
    params.delete(key)
  }

  const base = INGEST_VARIANT_BASE[variant]
  const query = params.toString()
  return query ? `${base}?${query}` : base
}

export function getDatasourcesListPathForVariant(
  variant: IngestVariant,
  search = "",
): string {
  const params = new URLSearchParams(search.replace(/^\?/, ""))
  params.set(PROTOTYPE_QUERY_KEY, variant)
  const query = params.toString()
  return query ? `${DATASOURCES_LIST_PATH}?${query}` : DATASOURCES_LIST_PATH
}

export function getSwitcherTargetPath(
  variant: IngestVariant,
  pathname: string,
  search = "",
): string {
  const targetBase = INGEST_VARIANT_BASE[variant]
  const currentBase = pathname.startsWith(`${INGEST_VARIANT_BASE.option2}/`) ||
    pathname === INGEST_VARIANT_BASE.option2
    ? INGEST_VARIANT_BASE.option2
    : pathname.startsWith(`${INGEST_VARIANT_BASE.option1}/`) ||
        pathname === INGEST_VARIANT_BASE.option1
      ? INGEST_VARIANT_BASE.option1
      : null

  if (currentBase) {
    const suffix = pathname.slice(currentBase.length)
    const query = search.replace(/^\?/, "")
    return query ? `${targetBase}${suffix}?${query}` : `${targetBase}${suffix}`
  }

  if (isDatasourcesListPath(pathname)) {
    return getDatasourcesListPathForVariant(variant, search)
  }

  return getIngestPathForVariant(variant, search)
}
