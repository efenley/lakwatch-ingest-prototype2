"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IngestStepCard } from "../IngestStepCard"
import { IngestWizardShell } from "../IngestWizardShell"
import { TablePreviewPanel } from "../PreviewDock"
import {
  AdditionalDetailsForm,
  isAdditionalDetailsValid,
} from "./AdditionalDetailsForm"
import { buildDatasourcesListUrl } from "../../../_shared/datasource-routes"

const PREVIEW_TABLE_NAME = "aws_sec_lake_bronze"

function AdditionalDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get("location") ?? ""

  const [datasourceName, setDatasourceName] = React.useState("")
  const [bronzeViewName, setBronzeViewName] = React.useState("")
  const [source, setSource] = React.useState("")
  const [sourceType, setSourceType] = React.useState("")

  const cancelHref = "/lakewatch/datasources/ingest"
  const previousHref = location
    ? `/lakewatch/datasources/ingest/configure/table?location=${encodeURIComponent(location)}&configured=1`
    : "/lakewatch/datasources/ingest/configure/table?configured=1"

  const detailsSteps = [
    { title: "Location", status: "completed" as const },
    { title: "Table configuration", status: "completed" as const },
    { title: "Additional details" },
  ]

  const isValid = isAdditionalDetailsValid({
    datasourceName,
    bronzeViewName,
    source,
  })

  function handleFinish() {
    router.push(
      buildDatasourcesListUrl({
        name: datasourceName,
        bronzeViewName,
        location,
        source,
        sourceType,
        prototype: "option1",
      }),
    )
  }

  return (
    <IngestWizardShell
      currentStepIndex={2}
      steps={detailsSteps}
      backHref={previousHref}
      showTopNav={false}
      preview={
        <TablePreviewPanel
          tableName={bronzeViewName.trim() || PREVIEW_TABLE_NAME}
        />
      }
    >
      <IngestStepCard
        step={3}
        title="Additional details"
        cancelHref={cancelHref}
        previousHref={previousHref}
        nextLabel="Create"
        nextDisabled={!isValid}
        onNextClick={handleFinish}
      >
        <AdditionalDetailsForm
          datasourceName={datasourceName}
          bronzeViewName={bronzeViewName}
          source={source}
          sourceType={sourceType}
          onDatasourceNameChange={setDatasourceName}
          onBronzeViewNameChange={setBronzeViewName}
          onSourceChange={setSource}
          onSourceTypeChange={setSourceType}
        />
      </IngestStepCard>
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
