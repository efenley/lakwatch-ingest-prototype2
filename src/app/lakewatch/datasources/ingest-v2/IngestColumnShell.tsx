"use client"

import Link from "next/link"
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
import { ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface IngestColumnShellProps {
  backHref?: string
  nextDisabled?: boolean
  showTopNav?: boolean
  stepNav?: React.ReactNode
  preview?: React.ReactNode
  children: React.ReactNode
}

export function IngestColumnShell({
  backHref = "/lakewatch/datasources/ingest",
  nextDisabled = true,
  showTopNav = true,
  stepNav,
  preview,
  children,
}: IngestColumnShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4 pb-16">
      <div className="flex items-center justify-between gap-4">
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
        Ingest from an external location
      </h1>

      {showTopNav ? (
        <div className="flex items-center justify-between border-b border-border py-2">
          <Button variant="default" size="sm" asChild>
            <Link href={backHref}>Back</Link>
          </Button>
          <Button size="sm" disabled={nextDisabled}>
            Next
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col pt-2">
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        {stepNav ? <div className="-mx-4 shrink-0 px-4">{stepNav}</div> : null}
        {preview ? <div className="-mx-4 shrink-0">{preview}</div> : null}
      </div>
    </div>
  )
}

interface IngestColumnCardProps {
  step: number
  title: string
  active?: boolean
  disabled?: boolean
  headerAction?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function IngestColumnCard({
  step,
  title,
  active = false,
  disabled = false,
  headerAction,
  footer,
  className,
  children,
}: IngestColumnCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[214px] min-w-0 flex-1 flex-col rounded border border-border p-4",
        disabled && "opacity-50",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <h2
          className={cn(
            "text-lg font-semibold leading-6",
            active ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {step}. {title}
        </h2>
        {headerAction}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>
      {footer ? <div className="mt-auto shrink-0 pt-4">{footer}</div> : null}
    </div>
  )
}
