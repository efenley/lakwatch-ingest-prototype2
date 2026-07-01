"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InfoIcon } from "@/components/icons"

export interface AdvancedOptionsState {
  performanceTarget: "global-default" | "standard" | "high"
  notebookLocation: string
  enableSilverPreTransform: boolean
}

interface AdvancedOptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: AdvancedOptionsState
  onSave: (value: AdvancedOptionsState) => void
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Advanced options</DialogTitle>
        </DialogHeader>

        <DialogBody className="flex flex-col gap-6 py-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <Label className="text-sm font-semibold text-foreground">
                Performance target
              </Label>
              <InfoIcon size={16} className="text-muted-foreground" />
            </div>
            <RadioGroup
              value={draft.performanceTarget}
              onValueChange={(next) =>
                setDraft((current) => ({
                  ...current,
                  performanceTarget: next as AdvancedOptionsState["performanceTarget"],
                }))
              }
              className="gap-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="global-default" id="perf-global-default" />
                <Label htmlFor="perf-global-default" className="font-normal text-foreground">
                  Global default (High)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="standard" id="perf-standard" />
                <Label htmlFor="perf-standard" className="font-normal text-foreground">
                  Standard
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="high" id="perf-high" />
                <Label htmlFor="perf-high" className="font-normal text-foreground">
                  High
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="notebook-location" className="text-sm font-semibold text-foreground">
              Notebook location
            </Label>
            <Input
              id="notebook-location"
              placeholder="Enter location"
              value={draft.notebookLocation}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  notebookLocation: event.target.value,
                }))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="silver-pre-transform"
              checked={draft.enableSilverPreTransform}
              onCheckedChange={(checked) =>
                setDraft((current) => ({
                  ...current,
                  enableSilverPreTransform: checked,
                }))
              }
            />
            <Label htmlFor="silver-pre-transform" className="text-sm font-semibold text-foreground">
              Enable silver pre-transform
            </Label>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            size="sm"
            onClick={() => {
              onSave(draft)
              onOpenChange(false)
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
