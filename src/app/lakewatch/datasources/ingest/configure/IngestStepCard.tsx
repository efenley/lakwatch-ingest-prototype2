"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface IngestStepCardProps {
  step: number
  title: string
  cancelHref?: string
  backLabel?: string
  nextLabel?: string
  nextDisabled?: boolean
  nextHref?: string
  onNextClick?: () => void
  hideFooter?: boolean
  children: React.ReactNode
}

export function IngestStepCard({
  step,
  title,
  cancelHref,
  backLabel = "Cancel",
  nextLabel = "Next",
  nextDisabled = true,
  nextHref,
  onNextClick,
  hideFooter = false,
  children,
}: IngestStepCardProps) {
  return (
    <div className="flex min-h-[514px] min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-border">
      <div className="shrink-0 bg-secondary px-6 pb-4 pt-5">
        <p className="text-sm font-semibold text-foreground">STEP {step}</p>
        <h2 className="text-lg font-semibold leading-6 text-foreground">{title}</h2>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-background px-6 pb-6 pt-4">
        <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>

        {!hideFooter && cancelHref ? (
          <div className="mt-auto flex shrink-0 items-center justify-between pt-6">
            <Button variant="link" size="sm" className="h-8 px-3" asChild>
              <Link href={cancelHref}>{backLabel}</Link>
            </Button>
            {nextHref && !nextDisabled ? (
              <Button size="sm" asChild>
                <Link href={nextHref}>{nextLabel}</Link>
              </Button>
            ) : (
              <Button size="sm" disabled={nextDisabled} onClick={onNextClick}>
                {nextLabel}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
