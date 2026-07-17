"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface SchemaHintsAndVariantFieldsProps {
  loadAsSingleVariant: boolean
  schemaHints: string
  onLoadAsSingleVariantChange: (value: boolean) => void
  onSchemaHintsChange: (value: string) => void
  disabled?: boolean
  isLoading?: boolean
  className?: string
}

export function SchemaHintsAndVariantFields({
  loadAsSingleVariant,
  schemaHints,
  onLoadAsSingleVariantChange,
  onSchemaHintsChange,
  disabled = false,
  isLoading = false,
  className,
}: SchemaHintsAndVariantFieldsProps) {
  const hasSchemaHints = schemaHints.trim().length > 0
  const fieldsDisabled = disabled || isLoading

  return (
    <div className={cn("flex max-w-[610px] flex-col gap-4", className)}>
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-foreground">
              Load as single variant (optional)
            </Label>
            <p className="text-hint text-muted-foreground">
              When enabled, all data is stored in a single variant column. Automatically
              disabled when schema hints are provided.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="load-single-variant"
              checked={isLoading ? false : loadAsSingleVariant}
              onCheckedChange={onLoadAsSingleVariantChange}
              disabled={fieldsDisabled || hasSchemaHints}
            />
            <Label htmlFor="load-single-variant" className="text-sm font-semibold text-foreground">
              Enabled
            </Label>
          </div>
        </div>
        {isLoading ? (
          <Spinner
            size="small"
            className="mt-1 shrink-0 text-[var(--success)]"
            aria-label="Auto-configuring field"
          />
        ) : null}
      </div>

      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="schema-hints" className="text-sm font-semibold text-foreground">
              Schema hints (optional)
            </Label>
            <p className="text-hint text-muted-foreground">
              Enter schema hints to customize how columns are mapped and typed.
            </p>
          </div>
          <Textarea
            id="schema-hints"
            className="min-h-[80px] resize-y"
            value={isLoading ? "" : schemaHints}
            onChange={(event) => {
              const nextValue = event.target.value
              onSchemaHintsChange(nextValue)
              if (nextValue.trim().length > 0 && loadAsSingleVariant) {
                onLoadAsSingleVariantChange(false)
              }
            }}
            disabled={fieldsDisabled}
          />
        </div>
        {isLoading ? (
          <Spinner
            size="small"
            className="mt-1 shrink-0 text-[var(--success)]"
            aria-label="Auto-configuring field"
          />
        ) : null}
      </div>
    </div>
  )
}
