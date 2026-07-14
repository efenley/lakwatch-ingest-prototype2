"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface IngestStepCardProps {
  step: number
  title: string
  cancelHref?: string
  cancelLabel?: string
  previousHref?: string
  previousDisabled?: boolean
  onPreviousClick?: () => void
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
  cancelLabel = "Cancel",
  previousHref,
  previousDisabled = false,
  onPreviousClick,
  nextLabel = "Next",
  nextDisabled = true,
  nextHref,
  onNextClick,
  hideFooter = false,
  children,
}: IngestStepCardProps) {
  return (
    <div className="flex h-fit max-h-full w-full min-h-0 flex-col rounded-md border border-border">
      <div className="shrink-0 bg-secondary px-6 py-4">
        <h2 className="text-lg font-semibold leading-6 text-foreground">
          STEP {step}: {title}
        </h2>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background px-6 pt-4">
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <div className="flex flex-col gap-4">{children}</div>
        </div>

        {!hideFooter && cancelHref ? (
          <div className="flex shrink-0 items-center justify-between border-t border-border pb-6 pt-4">
            <Button variant="link" size="sm" className="h-8 px-3" asChild>
              <Link href={cancelHref}>{cancelLabel}</Link>
            </Button>
            <div className="flex items-center gap-2">
              {previousHref || onPreviousClick ? (
                previousHref && !previousDisabled ? (
                  <Button variant="default" size="sm" asChild>
                    <Link href={previousHref}>Previous</Link>
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    disabled={previousDisabled}
                    onClick={onPreviousClick}
                  >
                    Previous
                  </Button>
                )
              ) : null}
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
          </div>
        ) : null}
      </div>
    </div>
  )
}
