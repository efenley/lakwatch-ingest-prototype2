"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BranchIcon,
  CloseIcon,
  CloudDatabaseIcon,
  QueryIcon,
  ZoomMarqueeSelection,
} from "@/components/icons"
import type { CreatedDatasourceParams } from "./datasource-routes"

const SCHEMA_ROWS = [
  { column: "event_uuid", type: "VARIANT" },
  { column: "event_time", type: "TIMESTAMP" },
  { column: "event_data", type: "STRUCT" },
] as const

interface DatasourceDetailPanelProps {
  datasource: CreatedDatasourceParams
  onClose: () => void
}

export function DatasourceDetailPanel({ datasource, onClose }: DatasourceDetailPanelProps) {
  const tableFqn = `'lw_citadel' . 'bronze' . '${datasource.bronzeViewName}'`

  return (
    <aside className="flex h-full w-[473px] shrink-0 flex-col border-l border-border bg-background">
      <div className="flex flex-col gap-4 overflow-y-auto px-6 pb-6 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded bg-pink-100">
              <CloudDatabaseIcon size={24} className="text-pink-700" />
            </div>
            <h2 className="min-w-0 text-lg font-semibold leading-6 text-foreground">
              {datasource.name}
            </h2>
          </div>
          <Button variant="ghost" size="icon-xs" aria-label="Close panel" onClick={onClose}>
            <CloseIcon size={16} className="text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-start justify-between gap-4">
          <Tabs defaultValue="overview" className="min-w-0 flex-1 gap-0">
            <TabsList variant="line" className="h-8 w-full justify-start gap-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="hidden" />
            <TabsContent value="metrics" className="hidden" />
          </Tabs>
          <Button size="sm" className="shrink-0">
            View &amp; edit
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" disabled>
            <QueryIcon size={16} className="text-muted-foreground" />
            Query data
          </Button>
          <Button variant="default" size="sm" disabled>
            <ZoomMarqueeSelection size={16} className="text-muted-foreground" />
            Detect on data
          </Button>
          <Button variant="default" size="sm">
            <BranchIcon size={16} className="text-muted-foreground" />
            Normalize
          </Button>
        </div>

        <div className="rounded border border-border p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">Table</span>
              <span className="text-sm text-foreground">{tableFqn}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">Data location</span>
                <span className="text-sm text-foreground">{datasource.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">Import range</span>
                <span className="text-sm text-foreground">All data</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded border border-border p-4">
          <p className="mb-4 text-sm font-semibold text-foreground">Schema</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-foreground">Column</TableHead>
                <TableHead className="font-semibold text-foreground">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SCHEMA_ROWS.map((row) => (
                <TableRow key={row.column}>
                  <TableCell className="text-foreground">{row.column}</TableCell>
                  <TableCell className="text-muted-foreground">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </aside>
  )
}
