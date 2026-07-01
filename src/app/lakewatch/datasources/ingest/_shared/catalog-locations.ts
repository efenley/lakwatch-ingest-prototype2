export type CatalogLocationItem = {
  id: string
  label: string
  type: "catalog" | "schema"
  path?: string
}

export const CATALOG_LOCATIONS: CatalogLocationItem[] = [
  { id: "aws_sec_lake", label: "aws_sec_lake", type: "catalog" },
  { id: "main", label: "main", type: "catalog" },
  { id: "security_logs", label: "security_logs", type: "catalog" },
  { id: "bronze", label: "bronze", type: "schema", path: "main.bronze" },
  { id: "raw_events", label: "raw_events", type: "schema", path: "main.raw_events" },
]
