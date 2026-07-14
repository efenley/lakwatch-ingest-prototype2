"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IngestStepCard } from "../IngestStepCard"
import { IngestWizardShell } from "../IngestWizardShell"
import { TablePreviewPanel } from "../PreviewDock"
import {
  AdditionalDetailsForm,
  buildDatasourceQualifiedName,
  isAdditionalDetailsValid,
} from "./AdditionalDetailsForm"
import { buildIngestWizardSteps } from "../../_shared/ingest-step-navigation"
import { buildDatasourcesListUrl } from "../../../_shared/datasource-routes"

const PREVIEW_TABLE_NAME = "aws_sec_lake_bronze"

function AdditionalDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get("location") ?? ""

  const [datasourceCatalog, setDatasourceCatalog] = React.useState("staging")
  const [datasourceSchema, setDatasourceSchema] = React.useState("sec-lakehouse")
  const [datasourceName, setDatasourceName] = React.useState("")
  const [bronzeViewName, setBronzeViewName] = React.useState("")
  const [source, setSource] = React.useState("")
  const [sourceType, setSourceType] = React.useState("")
  const [runAs, setRunAs] = React.useState("beau.trincia@databricks.com")

  const cancelHref = "/lakewatch/datasources/ingest"
  const previousHref = location
    ? `/lakewatch/datasources/ingest/configure/table?location=${encodeURIComponent(location)}&configured=1`
    : "/lakewatch/datasources/ingest/configure/table?configured=1"

  const detailsSteps = buildIngestWizardSteps({
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
    <React.Suspense fallback={null}>
      <AdditionalDetailsContent />
    </React.Suspense>
  )
}
