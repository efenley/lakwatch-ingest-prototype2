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
    <div className="flex min-h-[514px] min-w-0 w-full flex-col rounded-md border border-border">
      <div className="shrink-0 bg-secondary px-6 pb-4 pt-5">
        <p className="text-sm font-semibold text-foreground">STEP {step}</p>
        <h2 className="text-lg font-semibold leading-6 text-foreground">{title}</h2>
      </div>

      <div className="flex flex-col bg-background px-6 pb-6 pt-4">
        <div className="flex flex-col gap-4">{children}</div>

        {!hideFooter && cancelHref ? (
          <div className="flex shrink-0 items-center justify-between pt-6">
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
