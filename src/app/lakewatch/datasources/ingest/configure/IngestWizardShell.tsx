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
import { Stepper, type Step } from "@/components/ui/stepper"
import { ChevronRightIcon } from "@/components/icons"

export const INGEST_STEPS = [
  { title: "Location" },
  { title: "Table configuration" },
  { title: "Additional details" },
] as const

interface IngestWizardShellProps {
  currentStepIndex: number
  steps?: Step[]
  backHref: string
  nextDisabled?: boolean
  nextHref?: string
  onNextClick?: () => void
  showTopNav?: boolean
  stepNav?: React.ReactNode
  preview?: React.ReactNode
  children: React.ReactNode
}

export function IngestWizardShell({
  currentStepIndex,
  steps,
  backHref,
  nextDisabled = true,
  nextHref,
  onNextClick,
  showTopNav = true,
  stepNav,
  preview,
  children,
}: IngestWizardShellProps) {
  const stepperSteps = steps ?? [...INGEST_STEPS]

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 pb-0">
        <div className="flex min-w-0 items-center justify-between gap-4">
        <Breadcrumb className="min-w-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/lakewatch/datasources/ingest">Current datasources</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/lakewatch/datasources/ingest">Ingest</Link>
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
        Ingest from cloud storage
      </h1>

      {showTopNav ? (
        <div className="flex items-center justify-between border-b border-border py-2">
          <Button variant="default" size="sm" asChild>
            <Link href={backHref}>Back</Link>
          </Button>
          {nextHref && !nextDisabled ? (
            <Button size="sm" asChild>
              <Link href={nextHref}>
                Next
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          ) : (
            <Button size="sm" disabled={nextDisabled} onClick={onNextClick}>
              Next
              <ChevronRightIcon size={16} />
            </Button>
          )}
        </div>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-2">
        <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-[960px] flex-1 gap-6 overflow-x-hidden lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 shrink-0 self-start lg:w-[220px]">
            <Stepper
              direction="vertical"
              currentStepIndex={currentStepIndex}
              steps={stepperSteps}
              className="w-full"
            />
          </div>
          <div className="flex min-h-0 max-h-full min-w-0 flex-1 flex-col justify-start overflow-hidden">
            {children}
          </div>
        </div>
        {stepNav ? <div className="shrink-0">{stepNav}</div> : null}
      </div>
      </div>
      {preview ? <div className="shrink-0">{preview}</div> : null}
    </div>
  )
}
