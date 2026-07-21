"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AutoConfigureOverwriteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
}

export function AutoConfigureOverwriteDialog({
  open,
  onOpenChange,
  onContinue,
}: AutoConfigureOverwriteDialogProps) {
  function handleCancel() {
    onOpenChange(false)
  }

  function handleContinue() {
    onOpenChange(false)
    onContinue()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[480px]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Overwrite manual inputs?</DialogTitle>
        </DialogHeader>

        <DialogBody className="px-6 py-4">
          <p className="text-sm text-foreground">
            Auto-configure will overwrite the values you entered in this step.
          </p>
        </DialogBody>

        <DialogFooter className="gap-2 px-6 pb-6 pt-4">
          <Button variant="default" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleContinue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function hasManualTableInputs({
  format,
  timeColumn,
  preTransforms,
  loadAsSingleVariant,
  schemaHints,
}: {
  format: string
  timeColumn: string
  preTransforms: string[]
  loadAsSingleVariant: boolean
  schemaHints: string
}) {
  return (
    format.trim().length > 0 ||
    timeColumn.trim().length > 0 ||
    preTransforms.length > 0 ||
    loadAsSingleVariant ||
    schemaHints.trim().length > 0
  )
}
