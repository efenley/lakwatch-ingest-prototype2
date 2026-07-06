"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import {
  getIngestPathForVariant,
  getIngestVariant,
  type IngestVariant,
} from "./ingest/_shared/ingest-variant"

export function IngestVariantSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const variant = getIngestVariant(pathname)
  if (!variant) return null

  const search = searchParams.toString()
  const searchSuffix = search ? `?${search}` : ""

  function switchVariant(nextVariant: IngestVariant) {
    if (nextVariant === variant) return
    router.push(getIngestPathForVariant(nextVariant, pathname, searchSuffix))
  }

  return (
    <SegmentedControl value={variant} onValueChange={(value) => switchVariant(value as IngestVariant)}>
      <SegmentedItem value="option1">Option 1</SegmentedItem>
      <SegmentedItem value="option2">Option 2</SegmentedItem>
    </SegmentedControl>
  )
}
