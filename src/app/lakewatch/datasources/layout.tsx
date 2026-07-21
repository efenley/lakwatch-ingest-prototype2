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
    </div>
  )
}
