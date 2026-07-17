"use client"

import { Button } from "@/components/ui/button"
import { DbIcon } from "@/components/ui/db-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, SparkleFillIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface AutoConfigureSplitButtonProps {
  disabled?: boolean
  onAutoConfigure: () => void
  onConfigureWithPreset?: () => void
  onManualConfigure: () => void
  showConfigureWithPreset?: boolean
  className?: string
}

export function AutoConfigureSplitButton({
  disabled,
  onAutoConfigure,
  onConfigureWithPreset,
  onManualConfigure,
  showConfigureWithPreset = true,
  className,
}: AutoConfigureSplitButtonProps) {
  return (
    <DropdownMenu>
      <div
        className={cn(
          "inline-flex rounded",
          disabled && "pointer-events-none opacity-40",
          className,
        )}
      >
        <Button
          variant="default"
          size="sm"
          className="relative -mr-px rounded-r-none hover:z-10"
          disabled={disabled}
          onClick={onAutoConfigure}
        >
          <span className="flex items-center gap-2">
            <DbIcon icon={SparkleFillIcon} color="ai" size={16} />
            Auto configure
          </span>
        </Button>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="sm"
            className="rounded-l-none px-2 hover:z-10"
            disabled={disabled}
            aria-label="Configure options"
          >
            <ChevronDownIcon size={14} />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        {showConfigureWithPreset ? (
          <DropdownMenuItem onClick={onConfigureWithPreset}>
            Configure with preset
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={onManualConfigure}>Manual configure</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type ConfigureTableStatus = "idle" | "loading" | "manual" | "complete"

export function isConfigureTableActive(status: ConfigureTableStatus) {
  return status === "manual" || status === "complete"
}

export function areConfigureTableFieldsDisabled(
  status: ConfigureTableStatus,
  options?: { locationSelected?: boolean },
) {
  if (options?.locationSelected === false) return true
  return status === "idle" || status === "loading"
}
