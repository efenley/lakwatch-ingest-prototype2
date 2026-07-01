"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { IngestWizardShell } from "../IngestWizardShell"
import { PreviewDockLayout, TablePreviewPanel } from "../PreviewDock"
import {
  AdditionalDetailsForm,
  isAdditionalDetailsValid,
} from "./AdditionalDetailsForm"

function deriveDefaultNames(location: string) {
  const base = location.trim() || "aws_sec_lake"
  return {
    datasourceName: base,
    bronzeViewName: `${base}_bronze`,
  }
}

function AdditionalDetailsContent() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location") ?? ""
  const defaults = React.useMemo(() => deriveDefaultNames(location), [location])

  const [datasourceName, setDatasourceName] = React.useState(defaults.datasourceName)
  const [bronzeViewName, setBronzeViewName] = React.useState(defaults.bronzeViewName)

  const backHref = location
    ? `/lakewatch/datasources/ingest/configure/table?location=${encodeURIComponent(location)}&configured=1`
    : "/lakewatch/datasources/ingest/configure/table?configured=1"

  const detailsSteps = [
    { title: "Data location", status: "completed" as const },
    { title: "Configure table", status: "completed" as const },
    { title: "Additional details" },
  ]

  const isValid = isAdditionalDetailsValid(datasourceName, bronzeViewName)

  return (
    <IngestWizardShell
      currentStepIndex={2}
      steps={detailsSteps}
      backHref={backHref}
      nextDisabled={!isValid}
      preview={<TablePreviewPanel tableName={bronzeViewName.trim() || "aws_sec_lake_bronze"} />}
    >
      <PreviewDockLayout>
        <AdditionalDetailsForm
          datasourceName={datasourceName}
          bronzeViewName={bronzeViewName}
          onDatasourceNameChange={setDatasourceName}
          onBronzeViewNameChange={setBronzeViewName}
        />
      </PreviewDockLayout>
    </IngestWizardShell>
  )
}

export default function AdditionalDetailsPage() {
  return (
    <React.Suspense fallback={null}>
      <AdditionalDetailsContent />
    </React.Suspense>
  )
}
