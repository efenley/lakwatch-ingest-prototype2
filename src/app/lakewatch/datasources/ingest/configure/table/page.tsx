"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SplitButton } from "@/components/ui/split-button"
import { DbIcon } from "@/components/ui/db-icon"
import { SparkleFillIcon } from "@/components/icons"
import { IngestWizardShell } from "../IngestWizardShell"
import { PreviewDockLayout, PreviewDock } from "../PreviewDock"
import { TableConfigureForm } from "./TableConfigureForm"

const AUTO_CONFIGURE_DURATION_MS = 2500

type AutoConfigureStatus = "idle" | "loading" | "complete"

function TableConfigurationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get("location") ?? ""
  const [status, setStatus] = React.useState<AutoConfigureStatus>(() =>
    searchParams.get("configured") === "1" ? "complete" : "idle",
  )

  React.useEffect(() => {
    if (status !== "loading") return
    const timer = window.setTimeout(() => setStatus("complete"), AUTO_CONFIGURE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [status])

  const backHref = location
    ? `/lakewatch/datasources/ingest/configure?location=${encodeURIComponent(location)}`
    : "/lakewatch/datasources/ingest/configure"

  const tableSteps = [
    { title: "Data location", status: "completed" as const },
    { title: "Configure table" },
    { title: "Additional details" },
  ]

  function handleAutoConfigure() {
    setStatus("loading")
  }

  function handleApply() {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    router.push(`/lakewatch/datasources/ingest/configure/details?${params.toString()}`)
  }

  const showForm = status === "loading" || status === "complete"

  return (
    <IngestWizardShell
      currentStepIndex={1}
      steps={tableSteps}
      backHref={backHref}
      nextDisabled
      preview={<PreviewDock />}
    >
      <PreviewDockLayout
        header={
          <div className="flex flex-nowrap items-start gap-[40px] pb-6">
            <p className="max-w-[380px] shrink-0 text-sm text-foreground">
              Auto-configure will scan your datasource and automatically infer format, time
              column, pre-transforms, bronze table name, source and source type, and schema
              hints.
            </p>
            <SplitButton
              variant="default"
              className="shrink-0 self-start"
              disabled={status === "loading"}
              onClick={handleAutoConfigure}
            >
              <span className="flex items-center gap-2">
                <DbIcon icon={SparkleFillIcon} color="ai" size={16} />
                Auto configure
              </span>
            </SplitButton>
          </div>
        }
      >
        {showForm ? (
          <TableConfigureForm
            isLoading={status === "loading"}
            onApply={status === "complete" ? handleApply : undefined}
          />
        ) : null}
      </PreviewDockLayout>
    </IngestWizardShell>
  )
}

export default function TableConfigurationPage() {
  return (
    <React.Suspense fallback={null}>
      <TableConfigurationContent />
    </React.Suspense>
  )
}
