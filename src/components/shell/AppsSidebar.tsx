"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const PRIMARY_NAV = [
  { id: "build" as const, label: "Build", href: "/apps" },
  { id: "apps" as const, label: "Apps", href: "/apps/list" },
  { id: "spaces" as const, label: "App Spaces", href: "/apps/spaces" },
]

const QUICK_APPS = [
  { label: "app-name-2", href: "/apps" },
  { label: "app-name-3", href: "/apps" },
  { label: "app-name", href: "/apps" },
]

interface AppsSidebarProps {
  open?: boolean
  className?: string
}

export function AppsSidebar({ open = true, className }: AppsSidebarProps) {
  const pathname = usePathname()

  const activeId = React.useMemo(() => {
    if (pathname.startsWith("/apps/list")) return "apps"
    if (pathname.startsWith("/apps/spaces")) return "spaces"
    return "build"
  }, [pathname])

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col bg-secondary transition-all duration-200 overflow-hidden",
        open ? "w-[200px]" : "w-0",
        className
      )}
    >
      <nav
        className={cn(
          "flex flex-1 flex-col gap-6 overflow-y-auto px-3 pb-4 pt-4",
          "[&::-webkit-scrollbar]:w-[5px]",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-border",
          "[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/40",
        )}
      >
        <div className="flex flex-col gap-0.5">
          {PRIMARY_NAV.map((item) => {
            const active = activeId === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex h-7 w-full items-center rounded px-3 text-left text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground hover:bg-[var(--action-default-bg-hover)]",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-2">
          <span className="px-3 text-xs font-normal text-muted-foreground">
            Quick access
          </span>
          <div className="flex flex-col gap-0.5">
            {QUICK_APPS.map((app) => (
              <Link
                key={app.label}
                href={app.href}
                className="flex h-7 items-center rounded px-3 text-left text-sm text-foreground hover:bg-[var(--action-default-bg-hover)]"
              >
                {app.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="shrink-0 px-3 pb-3">
        <Button
          variant="default"
          size="sm"
          className="w-full justify-start gap-2 rounded-md font-semibold"
          asChild
        >
          <Link href="/apps">
            <MenuIcon size={16} className="text-muted-foreground" />
            Proto
          </Link>
        </Button>
      </div>
    </aside>
  )
}
