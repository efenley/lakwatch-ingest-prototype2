import * as React from "react"
import { IngestVariantSwitcher } from "./IngestVariantSwitcher"

export default function DatasourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-50 flex justify-start px-4">
        <div className="pointer-events-auto rounded border border-border bg-background p-1 shadow-[var(--shadow-db-sm)]">
          <React.Suspense fallback={null}>
            <IngestVariantSwitcher />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
