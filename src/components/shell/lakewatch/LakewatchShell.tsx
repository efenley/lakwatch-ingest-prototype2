"use client"

import * as React from "react"
import { LakewatchTopBar } from "./LakewatchTopBar"
import { LakewatchSidebar } from "./LakewatchSidebar"
import { GenieCodePanel } from "../GenieCodePanel"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface LakewatchShellProps {
  activeItem?: string
  workspace?: string
  userInitial?: string
  children: React.ReactNode
  className?: string
  mainClassName?: string
}

export function LakewatchShell({
  activeItem,
  workspace = "Production",
  userInitial = "J",
  children,
  className,
  mainClassName,
}: LakewatchShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [genieOpen, setGenieOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "flex h-dvh flex-col overflow-hidden bg-gradient-to-b from-blue-100 to-grey-100",
        className,
      )}
    >
      <LakewatchTopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onMobileMenuToggle={() => setMobileOpen((v) => !v)}
        onToggleGenie={() => setGenieOpen((v) => !v)}
        genieOpen={genieOpen}
        workspace={workspace}
        userInitial={userInitial}
      />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[220px] border-r-0 bg-secondary p-0"
        >
          <LakewatchSidebar open activeItem={activeItem} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 overflow-hidden pb-1 pr-1">
        <div className="hidden md:contents">
          <LakewatchSidebar open={sidebarOpen} activeItem={activeItem} />
        </div>

        <main
          className={cn(
            "mb-1 flex-1 overflow-y-auto rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]",
            genieOpen ? "mr-0.5" : "mr-0",
            !sidebarOpen && "ml-0.5",
            mainClassName,
          )}
        >
          {children}
        </main>

        {genieOpen && (
          <GenieCodePanel
            open={genieOpen}
            onClose={() => setGenieOpen(false)}
            className="mb-1 mr-1 rounded-md border border-border"
          />
        )}
      </div>
    </div>
  )
}
