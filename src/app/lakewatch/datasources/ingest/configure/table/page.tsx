"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { IngestStepCard } from "../IngestStepCard"
import { IngestWizardShell } from "../IngestWizardShell"
import { ConfigurePreviewPanel } from "../../_shared/ConfigurePreviewPanel"
import { buildIngestWizardSteps } from "../../_shared/ingest-step-navigation"
import { INGEST_ROUTES_OPTION2 } from "../../../_shared/ingest-route-constants"
import { useIngestRoutes } from "../../../_shared/ingest-route-context"
import { AutoConfigureSplitButton, areConfigureTableFieldsDisabled, type ConfigureTableStatus } from "../../_shared/AutoConfigureSplitButton"
import { TimeColumnFieldListDialog } from "./TimeColumnFieldListDialog"
import {
  AutoConfigureOverwriteDialog,
  hasManualTableInputs,
} from "./AutoConfigureOverwriteDialog"
import { PreTransformsField } from "./PreTransformsField"
import { SchemaHintsAndVariantFields } from "./SchemaHintsAndVariantFields"

const AUTO_CONFIGURE_DURATION_MS = 2500
const DEFAULT_TIME_COLUMN = "eventTime"
const DEFAULT_FORMAT = "json"
const PREVIEW_TABLE_NAME = "aws_sec_lake_bronze"

type AutoConfigureStatus = ConfigureTableStatus

function FieldSpinner({ show, className }: { show: boolean; className?: string }) {
  if (!show) return null
  return (
    <Spinner
      size="small"
      className={cn("shrink-0 text-[var(--success)]", className)}
      aria-label="Auto-configuring field"
    />
  )
}

function TableConfigurationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ingestPath, configurePath } = useIngestRoutes()
  const isOption2 = configurePath === INGEST_ROUTES_OPTION2.configurePath
  const location = searchParams.get("location") ?? ""
  const [status, setStatus] = React.useState<AutoConfigureStatus>(() =>
    searchParams.get("configured") === "1" ? "complete" : "manual",
  )
  const [format, setFormat] = React.useState(() =>
    searchParams.get("configured") === "1" ? DEFAULT_FORMAT : "",
  )
  const [timeColumn, setTimeColumn] = React.useState(() =>
    searchParams.get("configured") === "1" ? DEFAULT_TIME_COLUMN : "",
  )
  const [fieldListOpen, setFieldListOpen] = React.useState(false)
  const [overwriteDialogOpen, setOverwriteDialogOpen] = React.useState(false)
  const [preTransforms, setPreTransforms] = React.useState<string[]>([])
  const [loadAsSingleVariant, setLoadAsSingleVariant] = React.useState(false)
  const [schemaHints, setSchemaHints] = React.useState("")

  React.useEffect(() => {
    if (status !== "loading") return
    const timer = window.setTimeout(() => {
      setFormat(DEFAULT_FORMAT)
      setTimeColumn(DEFAULT_TIME_COLUMN)
      setStatus("complete")
    }, AUTO_CONFIGURE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [status])

  const cancelHref = ingestPath
  const previousHref = location
    ? `${configurePath}?location=${encodeURIComponent(location)}`
    : configurePath

  const isLoading = status === "loading"
  const fieldsDisabled = areConfigureTableFieldsDisabled(status)
  const hasLocation = location.trim().length > 0
  const canProceed =
    format.trim().length > 0 && timeColumn.trim().length > 0 && !isLoading

  const wizardSteps = buildIngestWizardSteps({
    configurePath,
    currentStepIndex: 1,
    location,
    tableConfigured: canProceed,
  })

  function startAutoConfigure() {
    setFormat("")
    setTimeColumn("")
    setStatus("loading")
  }

  function handleAutoConfigure() {
    if (
      hasManualTableInputs({
        format,
        timeColumn,
        preTransforms,
        loadAsSingleVariant,
        schemaHints,
      })
    ) {
      setOverwriteDialogOpen(true)
      return
    }

    startAutoConfigure()
  }

  function handleNext() {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    router.push(`${configurePath}/details?${params.toString()}`)
  }

  const autoConfigureButton = (
    <AutoConfigureSplitButton
      className="shrink-0"
      disabled={isLoading}
      onAutoConfigure={handleAutoConfigure}
    />
  )

  return (
    <>
      <IngestWizardShell
      currentStepIndex={1}
      steps={wizardSteps}
      backHref={cancelHref}
      showTopNav={false}
      preview={
        <ConfigurePreviewPanel
          hasLocation={hasLocation}
          autoConfigureStatus={status}
          tableName={PREVIEW_TABLE_NAME}
          carryLocationPreview
          isTableConfigured={canProceed}
        />
      }
    >
      <IngestStepCard
        step={2}
        title="Configure table"
        cancelHref={cancelHref}
        previousHref={previousHref}
        nextDisabled={!canProceed}
        onNextClick={handleNext}
        headerActions={isOption2 ? autoConfigureButton : undefined}
      >
        {isOption2 ? (
          <p className="text-sm text-foreground">
            Auto-configure will scan your datasource and automatically infer format &amp; time
            column.
          </p>
        ) : (
          <div className="flex flex-nowrap items-start justify-between gap-4">
            <p className="min-w-0 flex-1 text-sm text-foreground">
              Auto-configure will scan your datasource and automatically infer format &amp; time
              column.
            </p>
            {autoConfigureButton}
          </div>
        )}

        <div className="flex max-w-[610px] items-center gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Label className="text-sm font-semibold text-foreground">Format</Label>
            <Select
              value={format || undefined}
              onValueChange={setFormat}
              disabled={fieldsDisabled}
            >
              <SelectTrigger className="h-8 w-full rounded">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="parquet">Parquet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FieldSpinner show={isLoading} />
        </div>

        <PreTransformsField
          value={preTransforms}
          onChange={setPreTransforms}
          disabled={fieldsDisabled}
        />

        <div className="flex max-w-[610px] items-end gap-3">
          <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-semibold text-foreground">Time column</Label>
                <p className="text-hint text-muted-foreground">
                  Enter a SQL expression or select from a field list.
                </p>
              </div>
              <Input
                placeholder="Enter time column SQL expression"
                className="h-8"
                value={timeColumn}
                onChange={(event) => setTimeColumn(event.target.value)}
                disabled={fieldsDisabled}
              />
            </div>
            <Button
              variant="default"
              size="sm"
              className="shrink-0"
              disabled={fieldsDisabled}
              onClick={() => setFieldListOpen(true)}
            >
              Select from field list
            </Button>
          </div>
          <FieldSpinner show={isLoading} className="mb-1" />
        </div>

        <SchemaHintsAndVariantFields
          loadAsSingleVariant={loadAsSingleVariant}
          schemaHints={schemaHints}
          onLoadAsSingleVariantChange={setLoadAsSingleVariant}
          onSchemaHintsChange={setSchemaHints}
          disabled={fieldsDisabled}
          isLoading={isLoading}
        />
      </IngestStepCard>
    </IngestWizardShell>

      <TimeColumnFieldListDialog
        open={fieldListOpen}
        onOpenChange={setFieldListOpen}
        value={timeColumn}
        onSave={setTimeColumn}
      />

      <AutoConfigureOverwriteDialog
        open={overwriteDialogOpen}
        onOpenChange={setOverwriteDialogOpen}
        onContinue={startAutoConfigure}
      />
    </>
  )
}

export default function TableConfigurationPage() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <React.Suspense
        fallback={<div className="p-4 text-sm text-muted-foreground">Loading step…</div>}
      >
        <TableConfigurationContent />
      </React.Suspense>
    </div>
  )
}
