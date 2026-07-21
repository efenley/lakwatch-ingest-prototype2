"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AdvancedOptionsDialog,
  type AdvancedOptionsState,
} from "./AdvancedOptionsDialog"
import { DataLocationPicker } from "../_shared/DataLocationPicker"
import { ConfigurePreviewPanel } from "../_shared/ConfigurePreviewPanel"
import { buildIngestWizardSteps } from "../_shared/ingest-step-navigation"
import { useIngestRoutes } from "../../_shared/ingest-route-context"
import { IngestStepCard } from "./IngestStepCard"
import { IngestWizardShell } from "./IngestWizardShell"

const DEFAULT_ADVANCED_OPTIONS: AdvancedOptionsState = {
  useManagedFileNotifications: true,
  ingestRange: "all-data",
}

function ConfigurePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ingestPath, configurePath } = useIngestRoutes()
  const [dataLocation, setDataLocation] = React.useState("")
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState(DEFAULT_ADVANCED_OPTIONS)

  React.useEffect(() => {
    const location = searchParams.get("location")
    if (location) setDataLocation(location)
  }, [searchParams])

  const hasValidLocation = dataLocation.trim().length > 0
  const tableStepHref = hasValidLocation
    ? `${configurePath}/table?location=${encodeURIComponent(dataLocation.trim())}`
    : undefined

  function handleNext() {
    if (!tableStepHref) return
    router.push(tableStepHref)
  }

  return (
    <>
      <IngestWizardShell
        currentStepIndex={0}
        steps={buildIngestWizardSteps({
          configurePath,
          currentStepIndex: 0,
          location: dataLocation,
        })}
        backHref={ingestPath}
        showTopNav={false}
        preview={<ConfigurePreviewPanel hasLocation={hasValidLocation} />}
      >
        <IngestStepCard
          step={1}
          title="Location"
          cancelHref={ingestPath}
          nextDisabled={!hasValidLocation}
          nextHref={tableStepHref}
          onNextClick={handleNext}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">Data location</span>
            <p className="text-hint break-words text-muted-foreground">
              A Unity Catalog table or view to expose through the Lakewatch bronze view.
              Enter a fully qualified name in the format catalog.schema.table.
            </p>
          </div>

          <DataLocationPicker value={dataLocation} onValueChange={setDataLocation} />

          <Button
            variant="link"
            size="sm"
            className="h-8 w-fit px-0"
            onClick={() => setAdvancedOpen(true)}
          >
            Advanced options
          </Button>
        </IngestStepCard>
      </IngestWizardShell>

      <AdvancedOptionsDialog
        open={advancedOpen}
        onOpenChange={setAdvancedOpen}
        value={advancedOptions}
        onSave={setAdvancedOptions}
      />
    </>
  )
}

export default function ConfigurePage() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <React.Suspense
        fallback={<div className="p-4 text-sm text-muted-foreground">Loading step…</div>}
      >
        <ConfigurePageContent />
      </React.Suspense>
    </div>
  )
}
