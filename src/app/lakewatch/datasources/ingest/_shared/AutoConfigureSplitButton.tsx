"use client"

import { Button } from "@/components/ui/button"
import { DbIcon } from "@/components/ui/db-icon"
import { SparkleFillIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface AutoConfigureSplitButtonProps {
  disabled?: boolean
  onAutoConfigure: () => void
  className?: string
}

export function AutoConfigureSplitButton({
  disabled,
  onAutoConfigure,
  className,
}: AutoConfigureSplitButtonProps) {
  return (
    <Button
      variant="default"
      size="sm"
      className={cn(className)}
      disabled={disabled}
      onClick={onAutoConfigure}
    >
      <span className="flex items-center gap-2">
        <DbIcon icon={SparkleFillIcon} color="ai" size={16} />
        Auto-configure
      </span>
    </Button>
  )
}

export type ConfigureTableStatus = "idle" | "loading" | "manual" | "complete"

export function areConfigureTableFieldsDisabled(
  status: ConfigureTableStatus,
  options?: { locationSelected?: boolean },
) {
  if (options?.locationSelected === false) return true
  return status === "loading"
}
