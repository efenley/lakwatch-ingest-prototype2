"use client"

import { DataPreviewLoadingPanel, TablePreviewPanel } from "../configure/PreviewDock"
import type { ConfigureTableStatus } from "./AutoConfigureSplitButton"
import { LocationPreviewPanel } from "./location-preview-panel"
import { useLocationDataPreview } from "./useLocationDataPreview"

const DEFAULT_TABLE_NAME = "aws_sec_lake_bronze"

interface ConfigurePreviewPanelProps {
  hasLocation: boolean
  autoConfigureStatus?: ConfigureTableStatus
  tableName?: string
  /** Show location data immediately (e.g. step 2 after step 1). */
  carryLocationPreview?: boolean
}

export function ConfigurePreviewPanel({
  hasLocation,
  autoConfigureStatus = "idle",
  tableName = DEFAULT_TABLE_NAME,
  carryLocationPreview = false,
}: ConfigurePreviewPanelProps) {
  const showLocationPreview =
    hasLocation &&
    autoConfigureStatus !== "loading" &&
    autoConfigureStatus !== "complete"
  const locationPreviewStatus = useLocationDataPreview(showLocationPreview, carryLocationPreview)

  if (autoConfigureStatus === "complete") {
    return <TablePreviewPanel tableName={tableName} />
  }

  if (autoConfigureStatus === "loading") {
    return <DataPreviewLoadingPanel />
  }

  return <LocationPreviewPanel status={locationPreviewStatus} />
}
