import { LakewatchShell } from "@/components/shell/lakewatch"

export default function LakewatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LakewatchShell mainClassName="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      {children}
    </LakewatchShell>
  )
}
