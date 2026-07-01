"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AdvancedOptionsDialog,
  type AdvancedOptionsState,
} from "./AdvancedOptionsDialog"
import { DataLocationPicker } from "../_shared/DataLocationPicker"
import { IngestWizardShell } from "./IngestWizardShell"
import { PreviewDockLayout, PreviewDock } from "./PreviewDock"

const DEFAULT_ADVANCED_OPTIONS: AdvancedOptionsState = {
  performanceTarget: "global-default",
  notebookLocation: "",
  enableSilverPreTransform: false,
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

  function handleApply() {
    router.push(
      `/lakewatch/datasources/ingest/configure/table?location=${encodeURIComponent(dataLocation.trim())}`,
    )
  }

  return (
    <>
      <IngestWizardShell
        currentStepIndex={0}
        backHref="/lakewatch/datasources/ingest"
        nextDisabled
        preview={<PreviewDock />}
      >
        <PreviewDockLayout
          header={
            <div className="flex max-w-[480px] flex-col gap-1 pb-4">
              <span className="text-sm font-semibold text-foreground">Data location</span>
              <p className="text-hint text-muted-foreground">
                A Unity Catalog table or view to expose through the Lakewatch bronze view.
                Enter a fully qualified name in the format catalog.schema.table.
              </p>
            </div>
          }
        >
          <div className="flex max-w-[480px] flex-col gap-4">
            <DataLocationPicker value={dataLocation} onValueChange={setDataLocation} />

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="link"
                size="sm"
                className="h-8 px-0"
                onClick={() => setAdvancedOpen(true)}
              >
                Advanced options
              </Button>
              <Button size="sm" disabled={!hasValidLocation} onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </PreviewDockLayout>
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
