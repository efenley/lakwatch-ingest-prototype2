import {
  DataPreviewLoadingPanel,
  PreviewDock,
  PreviewDockLoading,
} from "../configure/PreviewDock"
import type { LocationPreviewStatus } from "./useLocationDataPreview"

export function LocationPreviewPanel({ status }: { status: LocationPreviewStatus }) {
  if (status === "idle") return <PreviewDock />
  if (status === "loading") return <PreviewDockLoading />
  return <DataPreviewLoadingPanel />
}
