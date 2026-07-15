"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DbIcon } from "@/components/ui/db-icon"
import {
  SidebarOpenIcon,
  SidebarClosedIcon,
  GenieCodeIcon,
  ChevronDownIcon,
  MenuIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { INGEST_VARIANT_BASE } from "@/app/lakewatch/datasources/ingest/_shared/ingest-variant"
import { DatabricksLogo } from "../DatabricksLogo"
import { AppSwitcher } from "../AppSwitcher"

interface LakewatchTopBarProps {
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
  onMobileMenuToggle?: () => void
  onToggleGenie?: () => void
  genieOpen?: boolean
  workspace?: string
  userInitial?: string
  className?: string
}

export function LakewatchTopBar({
  sidebarOpen = true,
  onToggleSidebar,
  onMobileMenuToggle,
  onToggleGenie,
  genieOpen = false,
  workspace = "Production",
  userInitial = "J",
  className,
}: LakewatchTopBarProps) {
  const pathname = usePathname()
  const homeHref = pathname.startsWith("/lakewatch/datasources/ingest-v2")
    ? INGEST_VARIANT_BASE.option2
    : pathname.startsWith("/lakewatch/datasources")
      ? "/lakewatch/datasources"
      : INGEST_VARIANT_BASE.option1

  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 bg-secondary px-3 pl-5",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
        >
          <MenuIcon size={16} className="text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="hidden md:flex"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen
            ? <SidebarOpenIcon className="h-4 w-4 text-muted-foreground" />
            : <SidebarClosedIcon className="h-4 w-4 text-muted-foreground" />}
        </Button>
        <Link href={homeHref}>
          <DatabricksLogo height={18} />
        </Link>
        <span className="text-sm text-blue-800/75">Lakewatch</span>
        <Badge variant="purple" className="font-semibold">Beta</Badge>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="hidden gap-1 px-2 font-normal md:flex">
          <span className="text-sm">{workspace}</span>
          <ChevronDownIcon size={16} className="text-muted-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open Genie"
          onClick={onToggleGenie}
          className={cn(
            genieOpen && "bg-ai-gradient/10",
          )}
        >
          <DbIcon icon={GenieCodeIcon} color="ai" size={16} />
        </Button>

        <AppSwitcher />

        <Avatar size="sm" className="ml-1 cursor-pointer hover:opacity-90">
          <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
