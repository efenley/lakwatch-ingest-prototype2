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
import { CheckCircleFillIcon, CatalogIcon, FolderIcon, SchemaIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { CATALOG_LOCATIONS } from "./catalog-locations"

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
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <InputGroup className="h-8 flex-1 rounded shadow-xs">
            <InputGroupInput
              aria-label="Data location"
              aria-expanded={open}
              aria-haspopup="listbox"
              placeholder="catalog.schema.table"
              value={value}
              readOnly={readOnly}
              onChange={
                readOnly ? undefined : (event) => onValueChange(event.target.value)
              }
              onClick={openPicker}
              onFocus={openPicker}
              className="cursor-pointer"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Browse catalog"
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
          <p className="px-2 pb-2 text-hint text-muted-foreground">
            Browse Unity Catalog to choose a table or view.
          </p>
          <div className="flex flex-col gap-1" role="listbox">
            {CATALOG_LOCATIONS.map((item) => (
              <ListItem
                key={item.id}
                selected={value === item.label}
                icon={
                  item.type === "catalog" ? (
                    <CatalogIcon size={16} className="text-muted-foreground" />
                  ) : (
                    <SchemaIcon size={16} className="text-muted-foreground" />
                  )
                }
                onClick={() => selectLocation(item.label)}
              >
                <span className="text-sm text-foreground">{item.label}</span>
                {item.path && (
                  <span className="block text-hint text-muted-foreground">{item.path}</span>
                )}
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
