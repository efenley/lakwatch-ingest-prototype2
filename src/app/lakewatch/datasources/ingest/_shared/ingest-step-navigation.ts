import type { Step } from "@/components/ui/stepper"

export const INGEST_STEP_PATHS = [
  "/lakewatch/datasources/ingest/configure",
  "/lakewatch/datasources/ingest/configure/table",
  "/lakewatch/datasources/ingest/configure/details",
] as const

export function getIngestStepPaths(configurePath: string) {
  return [configurePath, `${configurePath}/table`, `${configurePath}/details`] as const
}

export interface IngestStepNavParams {
  location?: string
  configured?: boolean
}

export function buildIngestStepHref(
  stepPaths: readonly string[],
  stepIndex: number,
  params: IngestStepNavParams = {},
): string {
  const base = stepPaths[stepIndex]
  const searchParams = new URLSearchParams()
  if (params.location) searchParams.set("location", params.location)
  if (stepIndex >= 1 && params.configured) searchParams.set("configured", "1")
  const qs = searchParams.toString()
  return qs ? `${base}?${qs}` : base
}

export interface BuildIngestWizardStepsOptions {
  configurePath: string
  currentStepIndex: number
  location: string
  tableConfigured?: boolean
}

const INGEST_STEP_TITLES = [
  "Location",
  "Table configuration",
  "Additional details",
] as const

export function buildIngestWizardSteps({
  configurePath,
  currentStepIndex,
  location,
  tableConfigured = false,
}: BuildIngestWizardStepsOptions): Step[] {
  const stepPaths = getIngestStepPaths(configurePath)
  const hasLocation = location.trim().length > 0

  return INGEST_STEP_TITLES.map((title, index) => {
    const isCurrent = index === currentStepIndex
    const isPast = index < currentStepIndex

    let href: string | undefined
    let disabled = true

    if (!isCurrent) {
      if (index === 0) {
        disabled = false
        href = buildIngestStepHref(stepPaths, 0, {
          location: hasLocation ? location : undefined,
        })
      } else if (index === 1 && hasLocation) {
        disabled = false
        href = buildIngestStepHref(stepPaths, 1, {
          location,
          configured: tableConfigured,
        })
      } else if (index === 2 && hasLocation && tableConfigured) {
        disabled = false
        href = buildIngestStepHref(stepPaths, 2, { location })
      }
    }

    return {
      title,
      status: isPast ? ("completed" as const) : undefined,
      href,
      disabled: isCurrent ? true : disabled,
    }
  })
}
