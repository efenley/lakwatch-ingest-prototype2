"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface AdvancedOptionsState {
  useManagedFileNotifications: boolean
  ingestRange: string
}

interface AdvancedOptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: AdvancedOptionsState
  onSave: (value: AdvancedOptionsState) => void
}

const INGEST_RANGE_OPTIONS = [{ value: "all-data", label: "All data" }] as const

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

  function handleCancel() {
    onOpenChange(false)
  }

  function handleDone() {
    onSave(draft)
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
