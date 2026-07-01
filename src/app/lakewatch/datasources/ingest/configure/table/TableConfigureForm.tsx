"use client"

import * as React from "react"
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
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons"

export interface TableConfigureValues {
  format: string
  source: string
  sourceType: string
  loadAsSingleVariant: boolean
  timeColumnMode: string
  schemaHints: string
}

export const DEFAULT_TABLE_CONFIGURE_VALUES: TableConfigureValues = {
  format: "json",
  source: "AWS",
  sourceType: "CloudTrail",
  loadAsSingleVariant: false,
  timeColumnMode: "picker",
  schemaHints: "",
}

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

function FormField({
  label,
  hint,
  children,
  className,
}: {
  label: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        {hint && <p className="text-hint text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

interface TableConfigureFormProps {
  isLoading?: boolean
  values?: TableConfigureValues
  onApply?: () => void
  /** Wizard step uses a wide 2-column source row; column layout stacks fields vertically. */
  layout?: "wizard" | "column"
  showApply?: boolean
  className?: string
}

export function TableConfigureForm({
  isLoading = false,
  values = DEFAULT_TABLE_CONFIGURE_VALUES,
  onApply,
  layout = "wizard",
  showApply = true,
  className,
}: TableConfigureFormProps) {
  const [format, setFormat] = React.useState(values.format)
  const [source, setSource] = React.useState(values.source)
  const [sourceType, setSourceType] = React.useState(values.sourceType)
  const [loadAsSingleVariant, setLoadAsSingleVariant] = React.useState(values.loadAsSingleVariant)
  const [timeColumnMode, setTimeColumnMode] = React.useState(values.timeColumnMode)
  const [schemaHints, setSchemaHints] = React.useState(values.schemaHints)

  React.useEffect(() => {
    if (isLoading) return
    setFormat(values.format)
    setSource(values.source)
    setSourceType(values.sourceType)
    setLoadAsSingleVariant(values.loadAsSingleVariant)
    setTimeColumnMode(values.timeColumnMode)
    setSchemaHints(values.schemaHints)
  }, [isLoading, values])

  const fieldsDisabled = isLoading
  const isColumnLayout = layout === "column"
  const preTransformHint = isColumnLayout && !isLoading
    ? "[EXPLODE('Records') AS data]"
    : "Add refinements...."

  const formatField = (
    <FormField label="Format" className="min-w-0 flex-1">
      <Select value={isLoading ? undefined : format} onValueChange={setFormat} disabled={fieldsDisabled}>
        <SelectTrigger className="h-8 w-full rounded">
          <SelectValue placeholder={isLoading ? undefined : "Select format"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="parquet">Parquet</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  )

  const sourceField = (
    <FormField
      label="Source*"
      hint="The name of the data source system (e.g., Slack, Workday, CrowdStrike)."
      className="min-w-0 flex-1"
    >
      <Input
        placeholder="Enter data source"
        className="h-8"
        value={isLoading ? "" : source}
        onChange={(event) => setSource(event.target.value)}
        disabled={fieldsDisabled}
      />
    </FormField>
  )

  const sourceTypeField = (
    <FormField
      label="Source type"
      hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
      className="min-w-0 flex-1"
    >
      <Input
        placeholder="Enter data source type"
        className="h-8"
        value={isLoading ? "" : sourceType}
        onChange={(event) => setSourceType(event.target.value)}
        disabled={fieldsDisabled}
      />
    </FormField>
  )

  const preTransformsField = (
    <div className="flex items-start gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div
          className={cn(
            "flex gap-4",
            isColumnLayout ? "flex-col items-start" : "items-end justify-between",
          )}
        >
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-foreground">Pre-transforms</Label>
            <p className="text-hint text-muted-foreground">{preTransformHint}</p>
          </div>
          {!isColumnLayout && (
            <div className="flex items-center gap-4 pb-0.5">
              <Button variant="ghost" size="icon-xs" disabled aria-label="Move up">
                <ArrowUpIcon size={16} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon-xs" disabled aria-label="Move down">
                <ArrowDownIcon size={16} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon-xs" disabled aria-label="Delete">
                <TrashIcon size={16} className="text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="w-fit rounded-md border border-border"
          disabled={fieldsDisabled}
          aria-label="Add pre-transform"
        >
          <PlusIcon size={16} className="text-muted-foreground" />
        </Button>
      </div>
      <FieldSpinner show={isLoading} className={isColumnLayout ? "mt-1" : "mt-5"} />
    </div>
  )

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isColumnLayout ? "w-full min-w-0" : "max-w-[610px]",
        className,
      )}
    >
      {isColumnLayout ? (
        <>
          <div className="flex items-center gap-3">
            {sourceField}
            <FieldSpinner show={isLoading} />
          </div>
          <div className="flex items-center gap-3">
            {sourceTypeField}
            <FieldSpinner show={isLoading} />
          </div>
          <div className="flex items-center gap-3">
            {formatField}
            <FieldSpinner show={isLoading} />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {formatField}
            <FieldSpinner show={isLoading} />
          </div>
          <div className="flex items-center gap-3">
            <div className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2">
              {sourceField}
              {sourceTypeField}
            </div>
            <FieldSpinner show={isLoading} />
          </div>
        </>
      )}

      {preTransformsField}

      <div className="flex items-start gap-3">
        <FormField
          label="Load as single variant"
          hint="When enabled, all data is stored in a single variant column. Automatically disabled when schema hints are provided."
          className="min-w-0 flex-1"
        >
          <div className="flex items-center gap-2">
            <Switch
              id="load-single-variant"
              checked={isLoading ? false : loadAsSingleVariant}
              onCheckedChange={setLoadAsSingleVariant}
              disabled={fieldsDisabled}
            />
            <Label htmlFor="load-single-variant" className="text-sm font-semibold text-foreground">
              Enabled
            </Label>
          </div>
        </FormField>
        <FieldSpinner show={isLoading} className="mt-1" />
      </div>

      <div className="flex items-center gap-3">
        <FormField label="Time column" className="min-w-0 flex-1">
          <SegmentedControl value={timeColumnMode} onValueChange={setTimeColumnMode}>
            <SegmentedItem value="picker" disabled={fieldsDisabled}>
              Time column picker
            </SegmentedItem>
            <SegmentedItem value="expression" disabled={fieldsDisabled}>
              Expression
            </SegmentedItem>
          </SegmentedControl>
        </FormField>
        <FieldSpinner show={isLoading} />
      </div>

      <div className="flex items-start gap-3">
        <FormField
          label="Schema hints"
          hint="Enter schema hints to customize how columns are mapped and typed."
          className="min-w-0 flex-1"
        >
          <Textarea
            className="min-h-[80px] resize-y"
            value={isLoading ? "" : schemaHints}
            onChange={(event) => setSchemaHints(event.target.value)}
            disabled={fieldsDisabled}
          />
        </FormField>
        <FieldSpinner show={isLoading} className="mt-1" />
      </div>

      {showApply && (
        <div className="flex justify-end pt-2">
          <Button size="sm" disabled={isLoading || !onApply} onClick={onApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}
