"use client"

import {
  DataPreviewLoadingPanel,
  SideBySideTablePreviewPanel,
} from "../configure/PreviewDock"
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
  /** Step 2 table fields are filled in manually or via auto-configure. */
  isTableConfigured?: boolean
}

export function ConfigurePreviewPanel({
  hasLocation,
  autoConfigureStatus = "idle",
  tableName = DEFAULT_TABLE_NAME,
  carryLocationPreview = false,
  isTableConfigured = false,
}: ConfigurePreviewPanelProps) {
  const showLocationPreview =
    hasLocation &&
    !isTableConfigured &&
    autoConfigureStatus !== "loading"
  const locationPreviewStatus = useLocationDataPreview(showLocationPreview, carryLocationPreview)

  if (autoConfigureStatus === "loading") {
    return <DataPreviewLoadingPanel />
  }

  if (isTableConfigured) {
    return <SideBySideTablePreviewPanel tableName={tableName} />
  }

  return <LocationPreviewPanel status={locationPreviewStatus} />
}
