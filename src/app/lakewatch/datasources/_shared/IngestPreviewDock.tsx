"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export const INGEST_PREVIEW_DOCK_SLOT_ID = "ingest-preview-dock-slot"

/** Bottom anchor for the ingest preview dock, rendered by the datasources layout. */
export function IngestPreviewDockSlot() {
  return (
    <div
      id={INGEST_PREVIEW_DOCK_SLOT_ID}
      className="absolute inset-x-0 bottom-0 z-10 shrink-0"
    />
  )
}

export function useIngestPreviewDockElement() {
  const [element, setElement] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    setElement(document.getElementById(INGEST_PREVIEW_DOCK_SLOT_ID))
  }, [])

  return element
}

export function IngestPreviewPortal({ preview }: { preview: React.ReactNode }) {
  const dockElement = useIngestPreviewDockElement()
  if (!dockElement || !preview) return null
  return createPortal(preview, dockElement)
}

export function ingestPreviewContentClass(hasPreview: boolean) {
  return cn(hasPreview && "pb-[280px]")
}
