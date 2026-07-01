"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FormField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex max-w-[376px] flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        {hint && <p className="text-hint text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

interface AdditionalDetailsFormProps {
  datasourceName: string
  bronzeViewName: string
  onDatasourceNameChange: (value: string) => void
  onBronzeViewNameChange: (value: string) => void
}

export function AdditionalDetailsForm({
  datasourceName,
  bronzeViewName,
  onDatasourceNameChange,
  onBronzeViewNameChange,
}: AdditionalDetailsFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Datasource name" hint="Enter a name for the datasource.">
        <Input
          placeholder="Enter a datasource name"
          className="h-8"
          value={datasourceName}
          onChange={(event) => onDatasourceNameChange(event.target.value)}
        />
      </FormField>

      <FormField label="Bronze view name" hint="The Lakewatch bronze view to create.">
        <Input
          placeholder="Enter bronze table name"
          className="h-8"
          value={bronzeViewName}
          onChange={(event) => onBronzeViewNameChange(event.target.value)}
        />
      </FormField>
    </div>
  )
}

export function isAdditionalDetailsValid(datasourceName: string, bronzeViewName: string) {
  return datasourceName.trim().length > 0 && bronzeViewName.trim().length > 0
}
