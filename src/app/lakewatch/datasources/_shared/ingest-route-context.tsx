"use client"

import * as React from "react"

export interface IngestRoutes {
  ingestPath: string
  configurePath: string
}

export const INGEST_ROUTES_OPTION1: IngestRoutes = {
  ingestPath: "/lakewatch/datasources/ingest",
  configurePath: "/lakewatch/datasources/ingest/configure",
}

export const INGEST_ROUTES_OPTION2: IngestRoutes = {
  ingestPath: "/lakewatch/datasources/ingest-v2",
  configurePath: "/lakewatch/datasources/ingest-v2/configure",
}

const IngestRouteContext = React.createContext<IngestRoutes>(INGEST_ROUTES_OPTION1)

export function IngestRouteProvider({
  routes,
  children,
}: {
  routes: IngestRoutes
  children: React.ReactNode
}) {
  return (
    <IngestRouteContext.Provider value={routes}>{children}</IngestRouteContext.Provider>
  )
}

export function useIngestRoutes() {
  return React.useContext(IngestRouteContext)
}
