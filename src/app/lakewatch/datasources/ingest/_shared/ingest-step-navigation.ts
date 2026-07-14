import type { Step } from "@/components/ui/stepper"
import { INGEST_CONFIGURE_PATH } from "./ingest-routes"

export const INGEST_STEP_PATHS = [
  INGEST_CONFIGURE_PATH,
  `${INGEST_CONFIGURE_PATH}/table`,
  `${INGEST_CONFIGURE_PATH}/details`,
] as const

export interface IngestStepNavParams {
  location?: string
  configured?: boolean
}

export function buildIngestStepHref(
  stepIndex: number,
  params: IngestStepNavParams = {},
): string {
  const base = INGEST_STEP_PATHS[stepIndex]
  const searchParams = new URLSearchParams()
  if (params.location) searchParams.set("location", params.location)
  if (stepIndex >= 1 && params.configured) searchParams.set("configured", "1")
  const qs = searchParams.toString()
  return qs ? `${base}?${qs}` : base
}

export interface BuildIngestWizardStepsOptions {
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
  currentStepIndex,
  location,
  tableConfigured = false,
}: BuildIngestWizardStepsOptions): Step[] {
  const hasLocation = location.trim().length > 0

  return INGEST_STEP_TITLES.map((title, index) => {
    const isCurrent = index === currentStepIndex
    const isPast = index < currentStepIndex

    let href: string | undefined
    let disabled = true

    if (!isCurrent) {
      if (index === 0) {
        disabled = false
        href = buildIngestStepHref(0, {
          location: hasLocation ? location : undefined,
        })
      } else if (index === 1 && hasLocation) {
        disabled = false
        href = buildIngestStepHref(1, {
          location,
          configured: tableConfigured,
        })
      } else if (index === 2 && hasLocation && tableConfigured) {
        disabled = false
        href = buildIngestStepHref(2, { location })
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
