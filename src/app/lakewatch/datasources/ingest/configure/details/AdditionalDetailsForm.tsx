"use client"

import * as React from "react"
import { CatalogIcon, DatabaseOutlineIcon } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const DATASOURCE_CATALOG_OPTIONS = [{ value: "staging", label: "Staging" }] as const

const DATASOURCE_SCHEMA_OPTIONS = [{ value: "sec-lakehouse", label: "sec-lakehouse" }] as const

const RUN_AS_OPTIONS = [
  {
    value: "beau.trincia@databricks.com",
    label: "Run datasource as: beau.trincia@databricks.com",
  },
] as const

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
  datasourceCatalog: string
  datasourceSchema: string
  datasourceName: string
  bronzeViewName: string
  source: string
  sourceType: string
  runAs: string
}

interface AdditionalDetailsFormProps extends AdditionalDetailsValues {
  layout?: "wizard" | "column"
  disabled?: boolean
  onDatasourceCatalogChange: (value: string) => void
  onDatasourceSchemaChange: (value: string) => void
  onDatasourceNameChange: (value: string) => void
  onBronzeViewNameChange: (value: string) => void
  onSourceChange: (value: string) => void
  onSourceTypeChange: (value: string) => void
  onRunAsChange: (value: string) => void
}

export function buildDatasourceQualifiedName({
  datasourceCatalog,
  datasourceSchema,
  datasourceName,
}: Pick<
  AdditionalDetailsValues,
  "datasourceCatalog" | "datasourceSchema" | "datasourceName"
>) {
  return [datasourceCatalog, datasourceSchema, datasourceName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(".")
}

export function AdditionalDetailsForm({
  datasourceCatalog,
  datasourceSchema,
  datasourceName,
  bronzeViewName,
  source,
  sourceType,
  runAs,
  layout = "wizard",
  disabled = false,
  onDatasourceCatalogChange,
  onDatasourceSchemaChange,
  onDatasourceNameChange,
  onBronzeViewNameChange,
  onSourceChange,
  onSourceTypeChange,
  onRunAsChange,
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
      <FormField label="Datasource name" className={fieldClassName}>
        <div className="flex gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Label className="text-sm font-semibold text-foreground">Catalog</Label>
            <Select
              value={datasourceCatalog}
              onValueChange={onDatasourceCatalogChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-full rounded px-2">
                <span className="flex min-w-0 flex-1 items-center justify-start gap-2 text-left">
                  <CatalogIcon size={16} className="text-muted-foreground" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                {DATASOURCE_CATALOG_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Label className="text-sm font-semibold text-foreground">Schema</Label>
            <Select
              value={datasourceSchema}
              onValueChange={onDatasourceSchemaChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-full rounded px-2">
                <span className="flex min-w-0 flex-1 items-center justify-start gap-2 text-left">
                  <DatabaseOutlineIcon size={16} className="text-muted-foreground" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                {DATASOURCE_SCHEMA_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Label className="text-sm font-semibold text-foreground">Name</Label>
            <Input
              className="h-8 w-full"
              value={datasourceName}
              onChange={(event) => onDatasourceNameChange(event.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
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

      <FormField label="Run as" className={fieldClassName}>
        <Select value={runAs} onValueChange={onRunAsChange} disabled={disabled}>
          <SelectTrigger id="run-as" className="h-8 w-full rounded">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RUN_AS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
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
