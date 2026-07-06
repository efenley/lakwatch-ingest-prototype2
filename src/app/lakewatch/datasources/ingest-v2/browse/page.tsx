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
import { ChevronRightIcon } from "@/components/icons"
import { DATA_LOCATIONS } from "../../ingest/_shared/catalog-locations"

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
          <Link href="/lakewatch/datasources/ingest-v2/configure">Back</Link>
        </Button>
        <Button size="sm" disabled>
          Next
          <ChevronRightIcon size={16} />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pt-2">
        <div className="flex flex-col gap-1 rounded-md border border-border p-2">
          {DATA_LOCATIONS.map((item) => (
            <ListItem
              key={item.id}
              onClick={() =>
                router.push(
                  `/lakewatch/datasources/ingest-v2/configure?location=${encodeURIComponent(item.path)}`,
                )
              }
            >
              <span className="truncate text-sm text-foreground" title={item.path}>
                {item.path}
              </span>
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  )
}
