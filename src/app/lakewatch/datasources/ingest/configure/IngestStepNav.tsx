"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface IngestStepNavProps {
  cancelHref: string
  nextDisabled?: boolean
  nextHref?: string
  onNextClick?: () => void
}

export function IngestStepNav({
  cancelHref,
  nextDisabled = true,
  nextHref,
  onNextClick,
}: IngestStepNavProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <Button variant="link" size="sm" className="h-8 px-3" asChild>
        <Link href={cancelHref}>Cancel</Link>
      </Button>
      {nextHref && !nextDisabled ? (
        <Button size="sm" asChild>
          <Link href={nextHref}>Next</Link>
        </Button>
      ) : (
        <Button size="sm" disabled={nextDisabled} onClick={onNextClick}>
          Next
        </Button>
      )}
    </div>
  )
}
