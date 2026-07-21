"use client"

import { IngestRouteProvider, INGEST_ROUTES_OPTION1 } from "../_shared/ingest-route-context"

export default function IngestLayout({ children }: { children: React.ReactNode }) {
  return <IngestRouteProvider routes={INGEST_ROUTES_OPTION1}>{children}</IngestRouteProvider>
}
