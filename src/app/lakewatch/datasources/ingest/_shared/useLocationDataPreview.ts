"use client"

import * as React from "react"

export type LocationPreviewStatus = "idle" | "loading" | "ready"

const LOCATION_PREVIEW_DURATION_MS = 1200

export function useLocationDataPreview(hasLocation: boolean, carryOver = false) {
  const [status, setStatus] = React.useState<LocationPreviewStatus>(() => {
    if (!hasLocation) return "idle"
    return carryOver ? "ready" : "idle"
  })

  React.useEffect(() => {
    if (!hasLocation) {
      setStatus("idle")
      return
    }

    if (carryOver) {
      setStatus("ready")
      return
    }

    setStatus("loading")
    const timer = window.setTimeout(() => {
      setStatus("ready")
    }, LOCATION_PREVIEW_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [carryOver, hasLocation])

  return status
}
