import { LakewatchShell } from "@/components/shell/lakewatch"

export default function LakewatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LakewatchShell mainClassName="flex min-h-0 flex-col overflow-hidden">
      {children}
    </LakewatchShell>
  )
}
