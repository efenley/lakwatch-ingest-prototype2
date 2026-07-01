"use client"

import * as React from "react"
import { TopBar } from "./TopBar"
import { AppsSidebar } from "./AppsSidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface AppsShellProps {
  workspace?: string
  userInitial?: string
  children: React.ReactNode
  className?: string
  mainClassName?: string
}

export function AppsShell({
  workspace = "Production",
  userInitial = "W",
  children,
  className,
  mainClassName,
}: AppsShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className={cn("flex h-dvh flex-col overflow-hidden bg-secondary", className)}>
      <TopBar
        variant="apps"
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onMobileMenuToggle={() => setMobileOpen((v) => !v)}
        workspace={workspace}
        userInitial={userInitial}
      />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[220px] border-r-0 bg-secondary p-0"
        >
          <AppsSidebar open />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:contents">
          <AppsSidebar open={sidebarOpen} />
        </div>

        <main
          className={cn(
            "mb-2 mr-2 flex-1 overflow-y-auto rounded-md border border-border bg-background",
            !sidebarOpen && "ml-2",
            mainClassName,
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
