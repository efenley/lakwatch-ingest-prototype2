"use client"

import * as React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ListItem } from "@/components/ui/list-item"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { CheckCircleFillIcon, FolderIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { DATA_LOCATIONS } from "./catalog-locations"

interface DataLocationPickerProps {
  value: string
  onValueChange: (value: string) => void
  readOnly?: boolean
  className?: string
}

export function DataLocationPicker({
  value,
  onValueChange,
  readOnly = false,
  className,
}: DataLocationPickerProps) {
  const [open, setOpen] = React.useState(false)
  const hasValidLocation = value.trim().length > 0

  function selectLocation(location: string) {
    onValueChange(location)
    setOpen(false)
  }

  function openPicker() {
    setOpen(true)
  }

  return (
    <div className={cn("flex w-full min-w-0 items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <InputGroup className="h-8 min-w-0 flex-1 rounded shadow-xs">
            <InputGroupInput
              aria-label="Data location"
              aria-expanded={open}
              aria-haspopup="listbox"
              placeholder="s3://bucket/path/"
              value={value}
              readOnly={readOnly}
              onChange={
                readOnly ? undefined : (event) => onValueChange(event.target.value)
              }
              onFocus={openPicker}
              className={cn(readOnly && "cursor-pointer")}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Browse locations"
                onClick={openPicker}
              >
                <FolderIcon size={16} className="text-muted-foreground" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-2"
        >
          <div className="flex flex-col gap-1" role="listbox">
            {DATA_LOCATIONS.map((item) => (
              <ListItem
                key={item.id}
                selected={value === item.path}
                onClick={() => selectLocation(item.path)}
              >
                <span className="truncate text-sm text-foreground" title={item.path}>
                  {item.path}
                </span>
              </ListItem>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {hasValidLocation && (
        <CheckCircleFillIcon
          size={16}
          className="shrink-0 text-[var(--success)]"
          aria-label="Valid data location"
        />
      )}
    </div>
  )
}
