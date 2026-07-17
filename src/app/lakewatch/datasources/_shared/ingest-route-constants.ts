export interface IngestRoutePaths {
  ingestPath: string
  configurePath: string
}

export const INGEST_ROUTES_OPTION1: IngestRoutePaths = {
  ingestPath: "/lakewatch/datasources/ingest",
  configurePath: "/lakewatch/datasources/ingest/configure",
}

export const INGEST_ROUTES_OPTION2: IngestRoutePaths = {
  ingestPath: "/lakewatch/datasources/ingest-v2",
  configurePath: "/lakewatch/datasources/ingest-v2/configure",
}
