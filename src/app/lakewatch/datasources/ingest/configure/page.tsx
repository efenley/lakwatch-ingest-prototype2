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
import { IngestStepCard } from "./IngestStepCard"
import { IngestWizardShell } from "./IngestWizardShell"

const DEFAULT_ADVANCED_OPTIONS: AdvancedOptionsState = {
  useManagedFileNotifications: true,
  loadAsSingleVariant: false,
  preTransforms: [""],
  schemaHints: "",
  ingestRange: "all-data",
  runAs: "beau.trincia@databricks.com",
}

function ConfigurePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [dataLocation, setDataLocation] = React.useState("")
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState(DEFAULT_ADVANCED_OPTIONS)

  React.useEffect(() => {
    const location = searchParams.get("location")
    if (location) setDataLocation(location)
  }, [searchParams])

  const hasValidLocation = dataLocation.trim().length > 0

  function handleNext() {
    router.push(
      `/lakewatch/datasources/ingest/configure/table?location=${encodeURIComponent(dataLocation.trim())}`,
    )
  }

  return (
    <>
      <IngestWizardShell
        currentStepIndex={0}
        backHref="/lakewatch/datasources/ingest"
        showTopNav={false}
        preview={<ConfigurePreviewPanel hasLocation={hasValidLocation} />}
      >
        <IngestStepCard
          step={1}
          title="Location"
          cancelHref="/lakewatch/datasources/ingest"
          nextDisabled={!hasValidLocation}
          onNextClick={handleNext}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">Data location</span>
            <p className="text-hint text-muted-foreground">
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
    <React.Suspense fallback={null}>
      <ConfigurePageContent />
    </React.Suspense>
  )
}
