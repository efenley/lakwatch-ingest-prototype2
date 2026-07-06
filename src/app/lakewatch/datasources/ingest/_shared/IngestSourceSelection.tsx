"use client"

import type { ComponentType } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
import {
  CloudDatabaseIcon,
  PipelineIcon,
  TableIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

const SOURCE_OPTIONS = [
  {
    id: "cloud-storage",
    title: "Cloud storage",
    description: "Unity Catalog external locations and volumes",
    icon: CloudDatabaseIcon,
  },
  {
    id: "existing-table",
    title: "Existing table",
    description: "An existing table in your workspace",
    icon: TableIcon,
  },
  {
    id: "lakeflow-connect",
    title: "Lakeflow connect",
    description: "Fully managed connectors for common security datasources",
    icon: PipelineIcon,
  },
] as const

function SourceCard({
  title,
  description,
  icon: Icon,
  onClick,
  disabled,
}: {
  title: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-auto w-[254px] flex-col items-stretch overflow-hidden rounded border border-border",
        "bg-background p-0 text-left shadow-[var(--shadow-db-md)] hover:bg-background hover:shadow-[var(--shadow-db-md)]",
        disabled && "cursor-default opacity-100 hover:bg-background",
      )}
    >
      <div className="flex h-[166px] w-full items-center justify-center bg-secondary/50">
        <Icon size={48} className="text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-sm leading-5 text-muted-foreground">{description}</span>
      </div>
    </Button>
  )
}

interface IngestSourceSelectionProps {
  /** Base ingest route for breadcrumbs, e.g. /lakewatch/datasources/ingest */
  baseHref: string
  /** Route when Cloud storage is selected */
  configureHref: string
}

export function IngestSourceSelection({ baseHref, configureHref }: IngestSourceSelectionProps) {
  const router = useRouter()

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 pb-16">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={baseHref}>Current datasources</Link>
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

      <h1 className="text-2xl font-semibold leading-none text-foreground">Ingest</h1>

      <div className="flex flex-col gap-4 pt-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold leading-6 text-foreground">
            Select source data location
          </h2>
          <p className="text-sm text-foreground">
            Ingest and parse any datasource with support from Genie
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 py-4">
          {SOURCE_OPTIONS.map((option) => (
            <SourceCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              disabled={option.id !== "cloud-storage"}
              onClick={
                option.id === "cloud-storage"
                  ? () => router.push(configureHref)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
