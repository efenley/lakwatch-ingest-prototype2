"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import {
  getIngestVariant,
  getSwitcherTargetPath,
  type IngestVariant,
} from "./ingest/_shared/ingest-variant"

export function IngestVariantSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.toString()
  const searchSuffix = search ? `?${search}` : ""

  const variant = getIngestVariant(pathname, searchSuffix)
  if (!variant) return null

  function switchVariant(nextVariant: IngestVariant) {
    if (nextVariant === variant) return
    router.push(getSwitcherTargetPath(nextVariant, pathname, searchSuffix), { scroll: false })
  }

  return (
    <SegmentedControl value={variant} onValueChange={(value) => switchVariant(value as IngestVariant)}>
      <SegmentedItem value="option1">Option 1</SegmentedItem>
      <SegmentedItem value="option2">Option 2</SegmentedItem>
    </SegmentedControl>
  )
}
