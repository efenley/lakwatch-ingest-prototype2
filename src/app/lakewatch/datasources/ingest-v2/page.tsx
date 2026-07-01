"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SplitButton } from "@/components/ui/split-button"
import { DbIcon } from "@/components/ui/db-icon"
import { CheckCircleFillIcon, FolderIcon, SparkleFillIcon } from "@/components/icons"
import {
  AdvancedOptionsDialog,
  type AdvancedOptionsState,
} from "../ingest/configure/AdvancedOptionsDialog"
import { PreviewDock, TablePreviewPanel } from "../ingest/configure/PreviewDock"
import { TableConfigureForm } from "../ingest/configure/table/TableConfigureForm"
import {
  AdditionalDetailsForm,
  isAdditionalDetailsValid,
} from "../ingest/configure/details/AdditionalDetailsForm"
import { IngestColumnCard, IngestColumnShell } from "./IngestColumnShell"

const BROWSE_ROUTE = "/lakewatch/datasources/ingest-v2/browse"
const AUTO_CONFIGURE_DURATION_MS = 2500

type AutoConfigureStatus = "idle" | "loading" | "complete"

const DEFAULT_ADVANCED_OPTIONS: AdvancedOptionsState = {
  performanceTarget: "global-default",
  notebookLocation: "",
  enableSilverPreTransform: false,
}

function IngestV2PageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedLocation = searchParams.get("location")?.trim() ?? ""
  const hasSelectedLocation = selectedLocation.length > 0
  const [datasourceName, setDatasourceName] = React.useState("")
  const [bronzeViewName, setBronzeViewName] = React.useState("")
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState(DEFAULT_ADVANCED_OPTIONS)
  const [autoConfigureStatus, setAutoConfigureStatus] = React.useState<AutoConfigureStatus>(() =>
    searchParams.get("configured") === "1" ? "complete" : "idle",
  )

  React.useEffect(() => {
    if (autoConfigureStatus !== "loading") return
    const timer = window.setTimeout(() => setAutoConfigureStatus("complete"), AUTO_CONFIGURE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [autoConfigureStatus])

  const isConfigureComplete = autoConfigureStatus === "complete"

  React.useEffect(() => {
    if (!isConfigureComplete) return
    setDatasourceName("AWS Security Lakehouse -1")
  }, [isConfigureComplete])

  const showConfigureForm =
    autoConfigureStatus === "loading" || autoConfigureStatus === "complete"

  const previewPanel = isConfigureComplete ? (
    <TablePreviewPanel tableName={bronzeViewName.trim() || "aws_sec_lake_bronze"} />
  ) : (
    <PreviewDock />
  )

  function handleAutoConfigure() {
    setAutoConfigureStatus("loading")
  }

  function openBrowse() {
    router.push(BROWSE_ROUTE)
  }

  function handleInputClick() {
    if (!hasSelectedLocation) openBrowse()
  }

  return (
    <>
      <IngestColumnShell
        backHref="/lakewatch/datasources/ingest"
        nextDisabled={
          !isConfigureComplete || !isAdditionalDetailsValid(datasourceName, bronzeViewName)
        }
        preview={previewPanel}
      >
        <div className="grid min-h-0 items-start gap-4 pb-4 xl:grid-cols-3">
          <IngestColumnCard step={1} title="Location" active>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-semibold text-foreground">Data location</Label>
              <p className="text-hint text-muted-foreground">
                A Unity Catalog table or view to expose through the Lakewatch bronze view.
                Enter a fully qualified name in the format catalog.schema.table.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <InputGroup className="h-8 flex-1 rounded shadow-xs">
                <InputGroupInput
                  aria-label="Data location"
                  placeholder="catalog.schema.table"
                  value={selectedLocation}
                  readOnly
                  onClick={handleInputClick}
                  className={!hasSelectedLocation ? "cursor-pointer" : undefined}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label="Browse catalog"
                    onClick={openBrowse}
                  >
                    <FolderIcon size={16} className="text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {hasSelectedLocation && (
                <CheckCircleFillIcon
                  size={16}
                  className="shrink-0 text-[var(--success)]"
                  aria-label="Valid data location"
                />
              )}
            </div>

            <div className="mt-auto">
              <Button
                variant="link"
                size="sm"
                className="h-8 px-0"
                onClick={() => setAdvancedOpen(true)}
              >
                Advanced options
              </Button>
            </div>
          </IngestColumnCard>

          <IngestColumnCard
            step={2}
            title="Table configuration"
            active={hasSelectedLocation}
            disabled={!hasSelectedLocation}
            className={showConfigureForm ? "min-h-0" : undefined}
            headerAction={
              <SplitButton
                variant="default"
                className="shrink-0"
                disabled={!hasSelectedLocation || autoConfigureStatus === "loading"}
                onClick={handleAutoConfigure}
              >
                <span className="flex items-center gap-2">
                  <DbIcon icon={SparkleFillIcon} color="ai" size={16} />
                  Auto configure
                </span>
              </SplitButton>
            }
          >
            <p className="text-sm text-muted-foreground">
              Auto-configure will scan your datasource and automatically infer format, time
              column, pre-transforms, bronze table name, source and source type, and schema
              hints.
            </p>
            {showConfigureForm ? (
              <TableConfigureForm
                layout="column"
                showApply={false}
                isLoading={autoConfigureStatus === "loading"}
              />
            ) : null}
          </IngestColumnCard>

          <IngestColumnCard
            step={3}
            title="Additional details"
            active={isConfigureComplete}
            disabled={!isConfigureComplete}
          >
            {isConfigureComplete ? (
              <AdditionalDetailsForm
                datasourceName={datasourceName}
                bronzeViewName={bronzeViewName}
                onDatasourceNameChange={setDatasourceName}
                onBronzeViewNameChange={setBronzeViewName}
              />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Datasource name
                    </Label>
                    <p className="text-hint text-muted-foreground">Enter a name for the datasource.</p>
                  </div>
                  <Input
                    placeholder="Enter datasource name"
                    className="h-8"
                    value={datasourceName}
                    onChange={(event) => setDatasourceName(event.target.value)}
                    disabled
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Bronze view name
                    </Label>
                    <p className="text-hint text-muted-foreground">
                      The Lakewatch bronze view to create.
                    </p>
                  </div>
                  <Input
                    placeholder="Enter bronze table name"
                    className="h-8"
                    value={bronzeViewName}
                    onChange={(event) => setBronzeViewName(event.target.value)}
                    disabled
                  />
                </div>
              </div>
            )}
          </IngestColumnCard>
        </div>
      </IngestColumnShell>

      <AdvancedOptionsDialog
        open={advancedOpen}
        onOpenChange={setAdvancedOpen}
        value={advancedOptions}
        onSave={setAdvancedOptions}
      />
    </>
  )
}

export default function IngestV2Page() {
  return (
    <React.Suspense fallback={null}>
      <IngestV2PageContent />
    </React.Suspense>
  )
}
