import * as React from "react"
import { IngestVariantSwitcher } from "./IngestVariantSwitcher"

export default function DatasourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="inline-flex rounded border border-border bg-background p-1 shadow-[var(--shadow-db-sm)]">
          <React.Suspense fallback={null}>
            <IngestVariantSwitcher />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
