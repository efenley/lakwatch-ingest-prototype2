export type IngestVariant = "option1" | "option2"

export const PROTOTYPE_QUERY_KEY = "prototype"

export const INGEST_VARIANT_BASE: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest",
  option2: "/lakewatch/datasources/ingest-v2",
}

export const INGEST_CONFIGURE_PATH: Record<IngestVariant, string> = {
  option1: "/lakewatch/datasources/ingest/configure",
  option2: "/lakewatch/datasources/ingest-v2/configure",
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
  const params = typeof search === "string" ? new URLSearchParams(search.replace(/^\?/, "")) : search
  return params.get(PROTOTYPE_QUERY_KEY) === "option2" ? "option2" : "option1"
}

export function getIngestVariant(pathname: string, search = ""): IngestVariant | null {
  if (pathname.startsWith(INGEST_VARIANT_BASE.option2)) return "option2"
  if (pathname.startsWith(INGEST_VARIANT_BASE.option1)) return "option1"
  if (isDatasourcesListPath(pathname)) return parseIngestVariant(search)
  return null
}

/** Entry route for each prototype's ingest page. */
export function getIngestPathForVariant(
  variant: IngestVariant,
  search = "",
): string {
  const params = new URLSearchParams(search.replace(/^\?/, ""))
  for (const key of DATASOURCE_LIST_QUERY_KEYS) {
    params.delete(key)
  }

  const base = INGEST_VARIANT_BASE[variant]
  const query = params.toString()
  return query ? `${base}?${query}` : base
}

/** Updates only the prototype param while staying on the datasources list page. */
export function getDatasourcesListPathForVariant(
  variant: IngestVariant,
  search = "",
): string {
  const params = new URLSearchParams(search.replace(/^\?/, ""))
  params.set(PROTOTYPE_QUERY_KEY, variant)
  const query = params.toString()
  return query ? `${DATASOURCES_LIST_PATH}?${query}` : DATASOURCES_LIST_PATH
}

/** Route target when switching prototypes. */
export function getSwitcherTargetPath(
  variant: IngestVariant,
  _pathname: string,
  search = "",
): string {
  return getIngestPathForVariant(variant, search)
}

export function getAlternateIngestPath(pathname: string, search = ""): string | null {
  const variant = getIngestVariant(pathname, search)
  if (!variant) return null

  const nextVariant: IngestVariant = variant === "option1" ? "option2" : "option1"
  return getSwitcherTargetPath(nextVariant, pathname, search)
}
