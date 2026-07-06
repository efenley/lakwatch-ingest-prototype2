"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DbIcon } from "@/components/ui/db-icon"
import { SparkleFillIcon } from "@/components/icons"
import {
  AdvancedOptionsDialog,
  type AdvancedOptionsState,
} from "../../ingest/configure/AdvancedOptionsDialog"
import { DataLocationPicker } from "../../ingest/_shared/DataLocationPicker"
import {
  DataPreviewLoadingPanel,
  PreviewDock,
  TablePreviewPanel,
} from "../../ingest/configure/PreviewDock"
import { AdditionalDetailsForm } from "../../ingest/configure/details/AdditionalDetailsForm"
import { TimeColumnFieldListDialog } from "../../ingest/configure/table/TimeColumnFieldListDialog"
import { INGEST_CONFIGURE_PATH } from "../../ingest/_shared/ingest-variant"
import { IngestColumnCard, IngestColumnShell } from "../IngestColumnShell"
import { TableConfigurationColumnForm } from "./TableConfigurationColumnForm"

const AUTO_CONFIGURE_DURATION_MS = 2500
const CONFIGURE_PATH = INGEST_CONFIGURE_PATH.option2
const DEFAULT_TIME_COLUMN = "eventTime"
const DEFAULT_FORMAT = "json"
const PREVIEW_TABLE_NAME = "aws_sec_lake_bronze"

type AutoConfigureStatus = "idle" | "loading" | "complete"

const DEFAULT_ADVANCED_OPTIONS: AdvancedOptionsState = {
  useManagedFileNotifications: true,
  loadAsSingleVariant: false,
  preTransforms: [""],
  schemaHints: "",
  ingestRange: "all-data",
  runAs: "beau.trincia@databricks.com",
}

function IngestV2ConfigurePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedLocation = searchParams.get("location")?.trim() ?? ""
  const hasSelectedLocation = selectedLocation.length > 0
  const [format, setFormat] = React.useState("")
  const [timeColumn, setTimeColumn] = React.useState("")
  const [fieldListOpen, setFieldListOpen] = React.useState(false)
  const [datasourceName, setDatasourceName] = React.useState("")
  const [bronzeViewName, setBronzeViewName] = React.useState("")
  const [source, setSource] = React.useState("")
  const [sourceType, setSourceType] = React.useState("")
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState(DEFAULT_ADVANCED_OPTIONS)
  const [autoConfigureStatus, setAutoConfigureStatus] = React.useState<AutoConfigureStatus>(() =>
    searchParams.get("configured") === "1" ? "complete" : "idle",
  )

  React.useEffect(() => {
    if (autoConfigureStatus !== "loading") return
    const timer = window.setTimeout(() => {
      setFormat(DEFAULT_FORMAT)
      setTimeColumn(DEFAULT_TIME_COLUMN)
      setAutoConfigureStatus("complete")
    }, AUTO_CONFIGURE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [autoConfigureStatus])

  const isLoading = autoConfigureStatus === "loading"
  const isConfigureComplete = autoConfigureStatus === "complete"

  const previewPanel = isConfigureComplete ? (
    <TablePreviewPanel tableName={bronzeViewName.trim() || PREVIEW_TABLE_NAME} />
  ) : isLoading ? (
    <DataPreviewLoadingPanel />
  ) : (
    <PreviewDock />
  )

  function handleAutoConfigure() {
    setFormat("")
    setTimeColumn("")
    setAutoConfigureStatus("loading")
  }

  function handleLocationChange(location: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (location.trim()) {
      params.set("location", location.trim())
    } else {
      params.delete("location")
    }
    const query = params.toString()
    router.replace(query ? `${CONFIGURE_PATH}?${query}` : CONFIGURE_PATH)
  }

  return (
    <>
      <IngestColumnShell
        backHref="/lakewatch/datasources/ingest-v2"
        showTopNav={false}
        preview={previewPanel}
      >
        <div className="grid min-h-0 items-stretch gap-4 pb-4 xl:grid-cols-3">
          <IngestColumnCard
            step={1}
            title="Location"
            active
            className="min-h-[514px]"
          >
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-semibold text-foreground">Data location</Label>
              <p className="text-hint text-muted-foreground">
                A Unity Catalog table or view to expose through the Lakewatch bronze view.
                Enter a fully qualified name in the format catalog.schema.table.
              </p>
            </div>

            <DataLocationPicker
              value={selectedLocation}
              onValueChange={handleLocationChange}
              readOnly
            />

            <Button
              variant="link"
              size="sm"
              className="h-8 w-fit px-0"
              onClick={() => setAdvancedOpen(true)}
            >
              Advanced options
            </Button>
          </IngestColumnCard>

          <IngestColumnCard
            step={2}
            title="Table configuration"
            active={hasSelectedLocation}
            disabled={!hasSelectedLocation}
            headerAction={
              <Button
                variant="default"
                size="sm"
                className="shrink-0"
                disabled={!hasSelectedLocation || isLoading}
                onClick={handleAutoConfigure}
              >
                <span className="flex items-center gap-2">
                  <DbIcon icon={SparkleFillIcon} color="ai" size={16} />
                  Auto configure
                </span>
              </Button>
            }
          >
            <p className="text-sm text-foreground">
              Auto-configure will scan your datasource and automatically infer format &amp; time
              column.
            </p>
            <TableConfigurationColumnForm
              format={format}
              timeColumn={timeColumn}
              isLoading={isLoading}
              disabled={!hasSelectedLocation}
              onFormatChange={setFormat}
              onTimeColumnChange={setTimeColumn}
              onSelectFromFieldList={() => setFieldListOpen(true)}
            />
          </IngestColumnCard>

          <IngestColumnCard
            step={3}
            title="Source & table names"
            active={isConfigureComplete}
            disabled={!isConfigureComplete}
          >
            <AdditionalDetailsForm
              layout="column"
              disabled={!isConfigureComplete}
              datasourceName={datasourceName}
              bronzeViewName={bronzeViewName}
              source={source}
              sourceType={sourceType}
              onDatasourceNameChange={setDatasourceName}
              onBronzeViewNameChange={setBronzeViewName}
              onSourceChange={setSource}
              onSourceTypeChange={setSourceType}
            />
          </IngestColumnCard>
        </div>
      </IngestColumnShell>

      <TimeColumnFieldListDialog
        open={fieldListOpen}
        onOpenChange={setFieldListOpen}
        value={timeColumn}
        onSave={setTimeColumn}
      />

      <AdvancedOptionsDialog
        open={advancedOpen}
        onOpenChange={setAdvancedOpen}
        value={advancedOptions}
        onSave={setAdvancedOptions}
      />
    </>
  )
}

export default function IngestV2ConfigurePage() {
  return (
    <React.Suspense fallback={null}>
      <IngestV2ConfigurePageContent />
    </React.Suspense>
  )
}
