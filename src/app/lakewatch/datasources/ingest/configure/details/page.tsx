"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IngestStepCard } from "../IngestStepCard"
import { IngestWizardShell } from "../IngestWizardShell"
import { SideBySideTablePreviewPanel } from "../PreviewDock"
import {
  AdditionalDetailsForm,
  buildDatasourceQualifiedName,
  isAdditionalDetailsValid,
} from "./AdditionalDetailsForm"
import { buildIngestWizardSteps } from "../../_shared/ingest-step-navigation"
import { useIngestRoutes } from "../../../_shared/ingest-route-context"
import { buildDatasourcesListUrl } from "../../../_shared/datasource-routes"

const PREVIEW_TABLE_NAME = "aws_sec_lake_bronze"

function AdditionalDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ingestPath, configurePath } = useIngestRoutes()
  const location = searchParams.get("location") ?? ""

  const [datasourceCatalog, setDatasourceCatalog] = React.useState("staging")
  const [datasourceSchema, setDatasourceSchema] = React.useState("sec-lakehouse")
  const [datasourceName, setDatasourceName] = React.useState("")
  const [bronzeViewName, setBronzeViewName] = React.useState("")
  const [source, setSource] = React.useState("")
  const [sourceType, setSourceType] = React.useState("")
  const [runAs, setRunAs] = React.useState("beau.trincia@databricks.com")

  const cancelHref = ingestPath
  const previousHref = location
    ? `${configurePath}/table?location=${encodeURIComponent(location)}&configured=1`
    : `${configurePath}/table?configured=1`

  const detailsSteps = buildIngestWizardSteps({
    configurePath,
    currentStepIndex: 2,
    location,
    tableConfigured: true,
  })

  const isValid = isAdditionalDetailsValid({
    datasourceName,
    bronzeViewName,
    source,
  })

  function handleFinish() {
    router.push(
      buildDatasourcesListUrl({
        name: buildDatasourceQualifiedName({
          datasourceCatalog,
          datasourceSchema,
          datasourceName,
        }),
        bronzeViewName,
        location,
        source,
        sourceType,
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
        <SideBySideTablePreviewPanel
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
          datasourceCatalog={datasourceCatalog}
          datasourceSchema={datasourceSchema}
          datasourceName={datasourceName}
          bronzeViewName={bronzeViewName}
          source={source}
          sourceType={sourceType}
          runAs={runAs}
          onDatasourceCatalogChange={setDatasourceCatalog}
          onDatasourceSchemaChange={setDatasourceSchema}
          onDatasourceNameChange={setDatasourceName}
          onBronzeViewNameChange={setBronzeViewName}
          onSourceChange={setSource}
          onSourceTypeChange={setSourceType}
          onRunAsChange={setRunAs}
        />
      </IngestStepCard>
    </IngestWizardShell>
  )
}

export default function AdditionalDetailsPage() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <React.Suspense
        fallback={<div className="p-4 text-sm text-muted-foreground">Loading step…</div>}
      >
        <AdditionalDetailsContent />
      </React.Suspense>
    </div>
  )
}
