"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { MoreVertical, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CloudDatabaseIcon,
  PencilIcon,
  PlusIcon,
  RunningIcon,
} from "@/components/icons"
import { INGEST_PATH } from "../ingest/_shared/ingest-routes"
import { DatasourceDetailPanel } from "./DatasourceDetailPanel"
import {
  DATASOURCES_LIST_PATH,
  parseCreatedDatasourceParams,
  type CreatedDatasourceParams,
} from "./datasource-routes"

const DEFAULT_DATASOURCE: CreatedDatasourceParams = {
  name: "AWS CloudTrail Account Activity",
  bronzeViewName: "aws_security_lakehouse-1",
  location: "aws_sec_lake",
}

function EventsSparklinePlaceholder() {
  return (
    <div
      className="h-[41px] w-[147px] rounded bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10"
      aria-hidden
    />
  )
}

export function DatasourcesListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const createdDatasource = parseCreatedDatasourceParams(searchParams)
  const activeDatasource = createdDatasource ?? DEFAULT_DATASOURCE
  const ingestHref = INGEST_PATH

  const [searchQuery, setSearchQuery] = React.useState(activeDatasource.name)
  const [detailOpen, setDetailOpen] = React.useState(createdDatasource !== null)

  React.useEffect(() => {
    if (createdDatasource) {
      setSearchQuery(createdDatasource.name)
      setDetailOpen(true)
    }
  }, [createdDatasource])

  function handleCloseDetail() {
    setDetailOpen(false)
    if (searchParams.get("created") === "1") {
      router.replace(DATASOURCES_LIST_PATH)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold leading-none text-foreground">Datasources</h1>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Select defaultValue="lakewatch-warehouse">
              <SelectTrigger className="h-8 w-[240px] rounded">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lakewatch-warehouse">Lakewatch Warehouse</SelectItem>
                <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" asChild>
              <Link href={ingestHref}>
                <PlusIcon size={16} />
                Add datasource
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative max-w-[362px]">
          <Input
            className="h-8 pr-8"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery ? (
            <Button
              variant="ghost"
              size="icon-xs"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          ) : null}
        </div>

        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[75px]" />
                <TableHead className="font-semibold text-foreground">Source name</TableHead>
                <TableHead className="font-semibold text-foreground">Author</TableHead>
                <TableHead className="font-semibold text-foreground">Ingest method</TableHead>
                <TableHead className="font-semibold text-foreground">Schedule</TableHead>
                <TableHead className="font-semibold text-foreground">Recent jobs</TableHead>
                <TableHead className="font-semibold text-foreground">Events</TableHead>
                <TableHead className="font-semibold text-foreground">Annotations</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                data-state={detailOpen ? "selected" : undefined}
                className="cursor-pointer"
                onClick={() => setDetailOpen(true)}
              >
                <TableCell>
                  <div className="flex size-10 items-center justify-center rounded bg-pink-100">
                    <CloudDatabaseIcon size={20} className="text-pink-700" />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto px-0 text-sm"
                    onClick={(event) => {
                      event.stopPropagation()
                      setDetailOpen(true)
                    }}
                  >
                    {activeDatasource.name}
                  </Button>
                </TableCell>
                <TableCell className="text-foreground">Antimatter</TableCell>
                <TableCell className="text-foreground">Cloud storage</TableCell>
                <TableCell className="text-foreground">Every 1hr</TableCell>
                <TableCell>
                  <RunningIcon size={16} className="text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <EventsSparklinePlaceholder />
                </TableCell>
                <TableCell className="text-foreground">--</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="default"
                      size="icon-sm"
                      aria-label="Edit datasource"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <PencilIcon size={16} className="text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="More actions"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {detailOpen ? (
        <DatasourceDetailPanel datasource={activeDatasource} onClose={handleCloseDetail} />
      ) : null}
    </div>
  )
}
