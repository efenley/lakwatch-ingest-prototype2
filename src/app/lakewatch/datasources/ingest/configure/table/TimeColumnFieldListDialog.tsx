"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/list-item"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronDownIcon, ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const TIME_COLUMN_FIELDS = [
  "awsRegion",
  "eventCategory",
  "eventID",
  "eventName",
  "eventSource",
  "eventTime",
  "eventType",
  "eventVersion",
  "managementEvent",
  "readOnly",
  "recipientAccountId",
  "requestID",
] as const

interface TimeColumnFieldListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onSave: (value: string) => void
}

function TreeToggle({
  label,
  expanded,
  depth,
  onToggle,
}: {
  label: string
  expanded: boolean
  depth: 0 | 1
  onToggle: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "h-8 w-full justify-start gap-1 px-1 font-normal text-foreground hover:bg-muted-foreground/10",
        depth === 1 && "pl-8",
      )}
      onClick={onToggle}
    >
      {expanded ? (
        <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground" />
      ) : (
        <ChevronRightIcon size={16} className="shrink-0 text-muted-foreground" />
      )}
      <span className="text-sm text-foreground">{label}</span>
    </Button>
  )
}

export function TimeColumnFieldListDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: TimeColumnFieldListDialogProps) {
  const [rowExpanded, setRowExpanded] = React.useState(true)
  const [dataExpanded, setDataExpanded] = React.useState(true)
  const [draft, setDraft] = React.useState(value)

  React.useEffect(() => {
    if (open) setDraft(value)
  }, [open, value])

  function handleCancel() {
    onOpenChange(false)
  }

  function handleSave() {
    if (!draft.trim()) return
    onSave(draft.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[640px]">
        <DialogHeader className="gap-0 px-6 py-4">
          <DialogTitle className="text-[22px] leading-7 font-semibold text-foreground">
            Select time column from field list
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-4 px-6 py-0">
          <p className="text-hint text-muted-foreground">
            By default, data is loaded into a single column named &quot;data&quot; of type
            VARIANT. Select the field from this data that represents the time column for the
            bronze table.
          </p>

          <div className="max-h-[399px] overflow-y-auto rounded">
            <TreeToggle
              label="row"
              expanded={rowExpanded}
              depth={0}
              onToggle={() => setRowExpanded((current) => !current)}
            />

            {rowExpanded ? (
              <>
                <TreeToggle
                  label="data"
                  expanded={dataExpanded}
                  depth={1}
                  onToggle={() => setDataExpanded((current) => !current)}
                />

                {dataExpanded ? (
                  <div className="flex flex-col gap-0.5 pl-[68px]">
                    {TIME_COLUMN_FIELDS.map((field) => (
                      <ListItem
                        key={field}
                        selected={draft === field}
                        className="h-8"
                        onClick={() => setDraft(field)}
                      >
                        <span className="text-sm text-foreground">{field}</span>
                      </ListItem>
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </DialogBody>

        <DialogFooter className="gap-2 px-6 pb-6 pt-4">
          <Button variant="default" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" disabled={!draft.trim()} onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
