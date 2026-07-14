"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface PreTransformsFieldProps {
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  className?: string
}

export function PreTransformsField({
  value,
  onChange,
  disabled = false,
  className,
}: PreTransformsFieldProps) {
  function updatePreTransform(index: number, nextValue: string) {
    onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)))
  }

  function addPreTransform() {
    onChange([...value, ""])
  }

  function removePreTransform(index: number) {
    onChange(value.filter((_, itemIndex) => itemIndex !== index))
  }

  function movePreTransform(index: number, direction: -1 | 1) {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= value.length) return

    const nextItems = [...value]
    const [moved] = nextItems.splice(index, 1)
    nextItems.splice(nextIndex, 0, moved)
    onChange(nextItems)
  }

  return (
    <div className={cn("flex max-w-[610px] flex-col gap-2", className)}>
      <Label className="text-sm font-semibold text-foreground">Pre-transforms (optional)</Label>
      {value.length > 0 ? (
        <div className="flex flex-col gap-2">
          {value.map((item, index) => (
            <div key={index} className="flex items-end gap-4">
              <Input
                aria-label={`Pre-transform ${index + 1}`}
                placeholder="Add refinements...."
                value={item}
                onChange={(event) => updatePreTransform(index, event.target.value)}
                disabled={disabled}
                className="min-w-0 flex-1"
              />
              <div className="flex shrink-0 items-center gap-4 pb-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Move pre-transform up"
                  disabled={disabled || index === 0}
                  onClick={() => movePreTransform(index, -1)}
                >
                  <ArrowUpIcon size={16} className="text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Move pre-transform down"
                  disabled={disabled || index === value.length - 1}
                  onClick={() => movePreTransform(index, 1)}
                >
                  <ArrowDownIcon size={16} className="text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Remove pre-transform"
                  disabled={disabled}
                  onClick={() => removePreTransform(index)}
                >
                  <TrashIcon size={16} className="text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <Button
        type="button"
        variant="default"
        size="icon-sm"
        aria-label="Add pre-transform"
        disabled={disabled}
        onClick={addPreTransform}
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  )
}
