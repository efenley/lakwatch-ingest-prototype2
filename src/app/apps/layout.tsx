import { AppsShell } from "@/components/shell"

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppsShell>{children}</AppsShell>
}
