"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  HomeIcon,
  DatabaseIcon,
  ZoomMarqueeSelection,
  BranchIcon,
  GearIcon,
  UserKeyIconIcon,
  QueryIcon,
  StarIcon,
  VisibleIcon,
  ShieldIcon,
  DataIcon,
  DashboardIcon,
  NotebookIcon,
  NewWindowIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href?: string
  external?: boolean
}

type NavSection = {
  label?: string
  items: NavItem[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: "overview", label: "Overview", icon: HomeIcon, href: "/lakewatch" },
    ],
  },
  {
    label: "Configure",
    items: [
      { id: "datasources", label: "Datasources", icon: DatabaseIcon, href: "/lakewatch/datasources" },
      { id: "detection-rules", label: "Detection rules", icon: ZoomMarqueeSelection },
      { id: "transformations", label: "Transformations", icon: BranchIcon },
      { id: "workspace", label: "Workspace", icon: GearIcon },
      { id: "admin", label: "Admin", icon: UserKeyIconIcon },
    ],
  },
  {
    label: "Explore",
    items: [
      { id: "query", label: "Query", icon: QueryIcon },
      { id: "notables", label: "Notables", icon: StarIcon },
      { id: "observables", label: "Observables", icon: VisibleIcon },
      { id: "health-alerts", label: "Health alerts", icon: ShieldIcon },
    ],
  },
  {
    label: "Lakehouse",
    items: [
      { id: "catalog", label: "Catalog", icon: DataIcon, external: true },
      { id: "dashboards", label: "Dashboards", icon: DashboardIcon, external: true },
      { id: "lakehouse-workspace", label: "Workspace", icon: NotebookIcon, external: true },
    ],
  },
]

interface LakewatchSidebarProps {
  open?: boolean
  activeItem?: string
  className?: string
}

function NavLink({
  item,
  active,
}: {
  item: NavItem
  active: boolean
}) {
  const Icon = item.icon
  const className = cn(
    "flex h-7 w-full items-center gap-2 rounded px-3 text-left text-sm transition-colors",
    active
      ? "bg-primary/10 font-semibold text-primary"
      : "text-foreground hover:bg-[var(--action-default-bg-hover)]",
  )

  const content = (
    <>
      <Icon size={16} className={cn("shrink-0", active ? "text-primary" : "text-muted-foreground")} />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.external && (
        <NewWindowIcon size={16} className="shrink-0 text-muted-foreground" />
      )}
    </>
  )

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <Button variant="ghost" size="sm" className={cn("h-7 justify-start px-3 font-normal", className)}>
      {content}
    </Button>
  )
}

export function LakewatchSidebar({
  open = true,
  activeItem,
  className,
}: LakewatchSidebarProps) {
  const pathname = usePathname()

  const derivedActive = React.useMemo(() => {
    if (pathname.startsWith("/lakewatch/datasources")) return "datasources"
    if (pathname === "/lakewatch") return "overview"
    return "datasources"
  }, [pathname])

  const resolvedActive = activeItem ?? derivedActive

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col overflow-hidden bg-secondary transition-all duration-200",
        open ? "w-[200px]" : "w-0",
        className,
      )}
    >
      <nav
        className={cn(
          "flex flex-1 flex-col gap-4 overflow-y-auto px-1.5 pb-4 pt-1",
          "[&::-webkit-scrollbar]:w-[5px]",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-border",
        )}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.label ?? section.items[0]?.id} className="flex flex-col gap-0.5">
            {section.label && (
              <span className="flex h-6 items-center px-3 text-xs text-muted-foreground">
                {section.label}
              </span>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                active={resolvedActive === item.id}
              />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
