"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

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
        {hint ? <p className="text-hint text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </div>
  )
}

export interface AdditionalDetailsValues {
  datasourceName: string
  bronzeViewName: string
  source: string
  sourceType: string
}

interface AdditionalDetailsFormProps extends AdditionalDetailsValues {
  layout?: "wizard" | "column"
  disabled?: boolean
  onDatasourceNameChange: (value: string) => void
  onBronzeViewNameChange: (value: string) => void
  onSourceChange: (value: string) => void
  onSourceTypeChange: (value: string) => void
}

export function AdditionalDetailsForm({
  datasourceName,
  bronzeViewName,
  source,
  sourceType,
  layout = "wizard",
  disabled = false,
  onDatasourceNameChange,
  onBronzeViewNameChange,
  onSourceChange,
  onSourceTypeChange,
}: AdditionalDetailsFormProps) {
  const isColumnLayout = layout === "column"
  const fieldClassName = isColumnLayout ? "w-full" : undefined

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isColumnLayout ? "w-full min-w-0" : "max-w-[582px]",
      )}
    >
      <FormField
        label="Datasource name"
        hint="Enter a name for the datasource."
        className={fieldClassName}
      >
        <Input
          placeholder="Enter a datasource name"
          className="h-8"
          value={datasourceName}
          onChange={(event) => onDatasourceNameChange(event.target.value)}
          disabled={disabled}
        />
      </FormField>

      <FormField
        label="Bronze view name"
        hint="The Lakewatch bronze view to create."
        className={fieldClassName}
      >
        <Input
          placeholder="Enter bronze table name"
          className="h-8"
          value={bronzeViewName}
          onChange={(event) => onBronzeViewNameChange(event.target.value)}
          disabled={disabled}
        />
      </FormField>

      {isColumnLayout ? (
        <>
          <FormField
            label="Source*"
            hint="The name of the data source system (e.g., Slack, Workday, CrowdStrike)."
            className={fieldClassName}
          >
            <Input
              placeholder="Enter data source"
              className="h-8"
              value={source}
              onChange={(event) => onSourceChange(event.target.value)}
              disabled={disabled}
            />
          </FormField>

          <FormField
            label="Source type"
            hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            className={fieldClassName}
          >
            <Input
              placeholder="Enter data source type"
              className="h-8"
              value={sourceType}
              onChange={(event) => onSourceTypeChange(event.target.value)}
              disabled={disabled}
            />
          </FormField>
        </>
      ) : (
        <div className="flex gap-2">
          <FormField
            label="Source*"
            hint="The name of the data source system (e.g., Slack, Workday, CrowdStrike)."
            className="min-w-0 flex-1"
          >
            <Input
              placeholder="Enter data source"
              className="h-8"
              value={source}
              onChange={(event) => onSourceChange(event.target.value)}
              disabled={disabled}
            />
          </FormField>

          <FormField
            label="Source type"
            hint="The product or format type (e.g. CloudTrail, Route 53, WAF, Syslog)."
            className="w-[258px] shrink-0"
          >
            <Input
              placeholder="Enter data source type"
              className="h-8"
              value={sourceType}
              onChange={(event) => onSourceTypeChange(event.target.value)}
              disabled={disabled}
            />
          </FormField>
        </div>
      )}
    </div>
  )
}

export function isAdditionalDetailsValid({
  datasourceName,
  bronzeViewName,
  source,
}: Pick<AdditionalDetailsValues, "datasourceName" | "bronzeViewName" | "source">) {
  return (
    datasourceName.trim().length > 0 &&
    bronzeViewName.trim().length > 0 &&
    source.trim().length > 0
  )
}
