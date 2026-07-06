import type { IngestVariant } from "../ingest/_shared/ingest-variant"
import { PROTOTYPE_QUERY_KEY, parseIngestVariant } from "../ingest/_shared/ingest-variant"

export const DATASOURCES_LIST_PATH = "/lakewatch/datasources"

export interface CreatedDatasourceParams {
  name: string
  bronzeViewName: string
  location: string
  source?: string
  sourceType?: string
  prototype?: IngestVariant
}

export function buildDatasourcesListUrl(params: CreatedDatasourceParams) {
  const search = new URLSearchParams({
    created: "1",
    name: params.name.trim(),
    bronzeViewName: params.bronzeViewName.trim(),
    location: params.location.trim(),
    [PROTOTYPE_QUERY_KEY]: params.prototype ?? "option1",
  })
  if (params.source?.trim()) search.set("source", params.source.trim())
  if (params.sourceType?.trim()) search.set("sourceType", params.sourceType.trim())
  return `${DATASOURCES_LIST_PATH}?${search.toString()}`
}

export function parseCreatedDatasourceParams(
  searchParams: URLSearchParams,
): CreatedDatasourceParams | null {
  if (searchParams.get("created") !== "1") return null
  const name = searchParams.get("name")?.trim() ?? ""
  if (!name) return null
  return {
    name,
    bronzeViewName: searchParams.get("bronzeViewName")?.trim() || "aws_security_lakehouse-1",
    location: searchParams.get("location")?.trim() || "aws_sec_lake",
    source: searchParams.get("source")?.trim() || undefined,
    sourceType: searchParams.get("sourceType")?.trim() || undefined,
    prototype: parseIngestVariant(searchParams),
  }
}
