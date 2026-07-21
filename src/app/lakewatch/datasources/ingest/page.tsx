"use client"

import { IngestSourceSelection } from "./_shared/IngestSourceSelection"
import { useIngestRoutes } from "../_shared/ingest-route-context"

export default function IngestPage() {
  const { ingestPath, configurePath } = useIngestRoutes()

  return (
    <IngestSourceSelection
      baseHref={ingestPath}
      configureHref={configurePath}
    />
  )
}
