import * as React from "react"
import { IngestVariantSwitcher } from "./IngestVariantSwitcher"

export default function DatasourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className="pointer-events-none absolute bottom-4 left-4 z-20">
        <div className="pointer-events-auto inline-flex rounded border border-border bg-background p-1 shadow-[var(--shadow-db-sm)]">
          <React.Suspense fallback={null}>
            <IngestVariantSwitcher />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
