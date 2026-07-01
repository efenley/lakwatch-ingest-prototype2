"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/list-item"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CatalogIcon, ChevronRightIcon, SchemaIcon } from "@/components/icons"

const CATALOG_ITEMS = [
  { id: "aws_sec_lake", label: "aws_sec_lake", type: "catalog" as const },
  { id: "main", label: "main", type: "catalog" as const },
  { id: "security_logs", label: "security_logs", type: "catalog" as const },
  { id: "bronze", label: "bronze", type: "schema" as const, path: "main.bronze" },
  { id: "raw_events", label: "raw_events", type: "schema" as const, path: "main.raw_events" },
] as const

export default function IngestV2BrowsePage() {
  const router = useRouter()

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden p-4 pb-16">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/lakewatch/datasources/ingest-v2">Current datasources</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/lakewatch/datasources/ingest-v2">Ingest</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <Select defaultValue="dedemos-serverless">
          <SelectTrigger className="h-7 w-[260px] rounded">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
            <SelectItem value="prod-analytics">prod-analytics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h1 className="text-2xl font-semibold leading-none text-foreground">
        Select data location
      </h1>

      <div className="flex items-center justify-between border-b border-border py-2">
        <Button variant="default" size="sm" asChild>
          <Link href="/lakewatch/datasources/ingest-v2">Back</Link>
        </Button>
        <Button size="sm" disabled>
          Next
          <ChevronRightIcon size={16} />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pt-2">
        <p className="text-hint text-muted-foreground">
          Browse Unity Catalog to choose a table or view.
        </p>

        <div className="flex flex-col gap-1 rounded-md border border-border p-2">
          {CATALOG_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              icon={
                item.type === "catalog" ? (
                  <CatalogIcon size={16} className="text-muted-foreground" />
                ) : (
                  <SchemaIcon size={16} className="text-muted-foreground" />
                )
              }
              onClick={() =>
                router.push(
                  `/lakewatch/datasources/ingest-v2?location=${encodeURIComponent(item.label)}`,
                )
              }
            >
              <span className="text-sm text-foreground">{item.label}</span>
              {"path" in item && item.path && (
                <span className="block text-hint text-muted-foreground">{item.path}</span>
              )}
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  )
}
