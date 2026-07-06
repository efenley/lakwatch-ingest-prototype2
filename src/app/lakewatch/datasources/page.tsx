import * as React from "react"
import { DatasourcesListContent } from "./_shared/DatasourcesListContent"

export default function DatasourcesPage() {
  return (
    <React.Suspense fallback={null}>
      <DatasourcesListContent />
    </React.Suspense>
  )
}
