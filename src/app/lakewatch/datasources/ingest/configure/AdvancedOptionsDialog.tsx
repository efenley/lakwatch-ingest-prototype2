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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "@/components/icons"

export interface AdvancedOptionsState {
  useManagedFileNotifications: boolean
  loadAsSingleVariant: boolean
  preTransforms: string[]
  schemaHints: string
  ingestRange: string
  runAs: string
}

interface AdvancedOptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: AdvancedOptionsState
  onSave: (value: AdvancedOptionsState) => void
}

const INGEST_RANGE_OPTIONS = [{ value: "all-data", label: "All data" }] as const

const RUN_AS_OPTIONS = [
  {
    value: "beau.trincia@databricks.com",
    label: "Run datasource as: beau.trincia@databricks.com",
  },
] as const

function SwitchField({
  id,
  label,
  hint,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string
  label: string
  hint: string
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </Label>
        <Switch
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
        />
      </div>
      <p className="text-sm text-muted-foreground">{hint}</p>
    </div>
  )
}

export function AdvancedOptionsDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: AdvancedOptionsDialogProps) {
  const [draft, setDraft] = React.useState(value)

  React.useEffect(() => {
    if (open) setDraft(value)
  }, [open, value])

  const hasSchemaHints = draft.schemaHints.trim().length > 0

  function updatePreTransform(index: number, nextValue: string) {
    setDraft((current) => ({
      ...current,
      preTransforms: current.preTransforms.map((item, itemIndex) =>
        itemIndex === index ? nextValue : item,
      ),
    }))
  }

  function addPreTransform() {
    setDraft((current) => ({
      ...current,
      preTransforms: [...current.preTransforms, ""],
    }))
  }

  function removePreTransform(index: number) {
    setDraft((current) => ({
      ...current,
      preTransforms:
        current.preTransforms.length === 1
          ? [""]
          : current.preTransforms.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function movePreTransform(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= current.preTransforms.length) return current

      const nextItems = [...current.preTransforms]
      const [moved] = nextItems.splice(index, 1)
      nextItems.splice(nextIndex, 0, moved)

      return { ...current, preTransforms: nextItems }
    })
  }

  function handleCancel() {
    onOpenChange(false)
  }

  function handleDone() {
    onSave({
      ...draft,
      loadAsSingleVariant: hasSchemaHints ? false : draft.loadAsSingleVariant,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[561px]">
        <DialogHeader className="gap-0 px-6 py-4">
          <DialogTitle className="text-[22px] leading-7 font-semibold text-foreground">
            Advanced options
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-6 px-6 py-0">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ingest-range" className="text-sm font-semibold text-foreground">
              Ingest range
            </Label>
            <Select
              value={draft.ingestRange}
              onValueChange={(next) =>
                setDraft((current) => ({
                  ...current,
                  ingestRange: next,
                }))
              }
            >
              <SelectTrigger id="ingest-range" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INGEST_RANGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <SwitchField
            id="managed-file-notifications"
            label="Use managed file notifications"
            hint="When enabled, uses managed file event configured on the external location for file notification instead of directory."
            checked={draft.useManagedFileNotifications}
            onCheckedChange={(checked) =>
              setDraft((current) => ({
                ...current,
                useManagedFileNotifications: checked,
              }))
            }
          />

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="schema-hints" className="text-sm font-semibold text-foreground">
                Schema hints
              </Label>
              <p className="text-hint text-muted-foreground">
                Enter schema hints to customize how columns are mapped and typed.
              </p>
            </div>
            <Textarea
              id="schema-hints"
              value={draft.schemaHints}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  schemaHints: event.target.value,
                  loadAsSingleVariant:
                    event.target.value.trim().length > 0
                      ? false
                      : current.loadAsSingleVariant,
                }))
              }
              className="min-h-[80px]"
            />
          </div>

          <SwitchField
            id="load-as-single-variant"
            label="Load as single variant"
            hint="When enabled, all data is stored in a single variant column. Automatically disabled when schema hints are provided."
            checked={draft.loadAsSingleVariant}
            disabled={hasSchemaHints}
            onCheckedChange={(checked) =>
              setDraft((current) => ({
                ...current,
                loadAsSingleVariant: checked,
              }))
            }
          />

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-foreground">Pre-transforms</Label>
            <div className="flex flex-col gap-2">
              {draft.preTransforms.map((item, index) => (
                <div key={index} className="flex items-end gap-4">
                  <Input
                    aria-label={`Pre-transform ${index + 1}`}
                    placeholder="Add refinements...."
                    value={item}
                    onChange={(event) => updatePreTransform(index, event.target.value)}
                    className="min-w-0 flex-1"
                  />
                  <div className="flex shrink-0 items-center gap-4 pb-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Move pre-transform up"
                      disabled={index === 0}
                      onClick={() => movePreTransform(index, -1)}
                    >
                      <ArrowUpIcon size={16} className="text-muted-foreground" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Move pre-transform down"
                      disabled={index === draft.preTransforms.length - 1}
                      onClick={() => movePreTransform(index, 1)}
                    >
                      <ArrowDownIcon size={16} className="text-muted-foreground" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Remove pre-transform"
                      onClick={() => removePreTransform(index)}
                    >
                      <TrashIcon size={16} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="default"
              size="icon-sm"
              className="w-fit"
              aria-label="Add pre-transform"
              onClick={addPreTransform}
            >
              <PlusIcon size={16} />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="run-as" className="text-sm font-semibold text-foreground">
              Run as
            </Label>
            <Select
              value={draft.runAs}
              onValueChange={(next) =>
                setDraft((current) => ({
                  ...current,
                  runAs: next,
                }))
              }
            >
              <SelectTrigger id="run-as" className="w-full">
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
          </div>
        </DialogBody>

        <DialogFooter className="gap-2 px-6 pb-6 pt-4">
          <Button variant="default" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleDone}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
