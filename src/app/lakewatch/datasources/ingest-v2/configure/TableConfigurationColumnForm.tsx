"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

function FieldSpinner({ show, className }: { show: boolean; className?: string }) {
  if (!show) return null
  return (
    <Spinner
      size="small"
      className={cn("shrink-0 text-[var(--success)]", className)}
      aria-label="Auto-configuring field"
    />
  )
}

interface TableConfigurationColumnFormProps {
  format: string
  timeColumn: string
  isLoading?: boolean
  disabled?: boolean
  onFormatChange: (value: string) => void
  onTimeColumnChange: (value: string) => void
  onSelectFromFieldList: () => void
}

export function TableConfigurationColumnForm({
  format,
  timeColumn,
  isLoading = false,
  disabled = false,
  onFormatChange,
  onTimeColumnChange,
  onSelectFromFieldList,
}: TableConfigurationColumnFormProps) {
  const fieldsDisabled = disabled || isLoading

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground">Format</Label>
          <Select
            value={format || undefined}
            onValueChange={onFormatChange}
            disabled={fieldsDisabled}
          >
            <SelectTrigger className="h-8 w-full rounded">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="parquet">Parquet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FieldSpinner show={isLoading} />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-foreground">Time column</Label>
            <p className="text-hint text-muted-foreground">
              Enter a SQL expression or select from a field list.
            </p>
          </div>
          <Input
            placeholder="Enter time column SQL expression"
            className="h-8"
            value={timeColumn}
            onChange={(event) => onTimeColumnChange(event.target.value)}
            disabled={fieldsDisabled}
          />
          <Button
            variant="default"
            size="sm"
            className="w-fit"
            disabled={fieldsDisabled}
            onClick={onSelectFromFieldList}
          >
            Select from field list
          </Button>
        </div>
        <FieldSpinner show={isLoading} className="mt-1" />
      </div>
    </div>
  )
}
