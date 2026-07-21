"use client"

import * as React from "react"
import {
  INGEST_ROUTES_OPTION1,
  type IngestRoutePaths,
} from "./ingest-route-constants"

export type { IngestRoutePaths as IngestRoutes }
export { INGEST_ROUTES_OPTION1, INGEST_ROUTES_OPTION2 } from "./ingest-route-constants"

const IngestRouteContext = React.createContext<IngestRoutePaths>(INGEST_ROUTES_OPTION1)

export function IngestRouteProvider({
  routes,
  children,
}: {
  routes: IngestRoutePaths
  children: React.ReactNode
}) {
  return (
    <IngestRouteContext.Provider value={routes}>{children}</IngestRouteContext.Provider>
  )
}

export function useIngestRoutes() {
  return React.useContext(IngestRouteContext)
}
