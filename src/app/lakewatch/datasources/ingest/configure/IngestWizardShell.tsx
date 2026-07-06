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
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden p-4">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb>
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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[845px] gap-8 lg:flex-row">
            <Stepper
              direction="vertical"
              currentStepIndex={currentStepIndex}
              steps={stepperSteps}
              className="w-full shrink-0 lg:w-[197px]"
            />
            <div className="flex min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </div>
        {stepNav ? <div className="shrink-0 px-4">{stepNav}</div> : null}
        {preview ? <div className="-mx-4 shrink-0">{preview}</div> : null}
      </div>
    </div>
  )
}
