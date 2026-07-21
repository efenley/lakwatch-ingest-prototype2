"use client"

import { IngestRouteProvider, INGEST_ROUTES_OPTION2 } from "../_shared/ingest-route-context"

export default function IngestV2Layout({ children }: { children: React.ReactNode }) {
  return <IngestRouteProvider routes={INGEST_ROUTES_OPTION2}>{children}</IngestRouteProvider>
}
