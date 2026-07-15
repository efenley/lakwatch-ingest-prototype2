import * as React from "react"
import { IngestVariantSwitcher } from "./IngestVariantSwitcher"
import { IngestPreviewDockSlot } from "./_shared/IngestPreviewDock"

export const dynamic = "force-dynamic"

export default function DatasourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <IngestPreviewDockSlot />
      <div className="absolute bottom-4 left-4 z-30">
        <div className="inline-flex rounded border border-border bg-background p-1 shadow-[var(--shadow-db-sm)]">
          <React.Suspense fallback={null}>
            <IngestVariantSwitcher />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
