"use client"

import * as React from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DbIcon } from "@/components/ui/db-icon"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GenieCodeIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const CLOUDTRAIL_PRESET_ID = "cloudtrail-iam"

interface ManagedPreset {
  id: string
  label: string
  iconSrc: string
  iconBg: string
}

const MANAGED_PRESETS: ManagedPreset[] = [
  {
    id: "cloudtrail-iam",
    label: "Amazon CloudTrail IAM",
    iconSrc: "/lakewatch/preset-icons/cloudtrail.png",
    iconBg: "bg-[#cc2264]",
  },
  {
    id: "lambda",
    label: "Amazon Lambda Functions",
    iconSrc: "/lakewatch/preset-icons/lambda.png",
    iconBg: "bg-[#d96612]",
  },
  {
    id: "route53",
    label: "AWS Route 53",
    iconSrc: "/lakewatch/preset-icons/route53.png",
    iconBg: "bg-[#693cc5]",
  },
  {
    id: "s3",
    label: "AWS S3 Buckets",
    iconSrc: "/lakewatch/preset-icons/s3.png",
    iconBg: "bg-[#6cae3e]",
  },
  {
    id: "security-hub",
    label: "Amazon Security Hub",
    iconSrc: "/lakewatch/preset-icons/security-hub.png",
    iconBg: "bg-[#ce282c]",
  },
  {
    id: "vpc",
    label: "AWS VPC",
    iconSrc: "/lakewatch/preset-icons/vpc.png",
    iconBg: "bg-[#693cc5]",
  },
  {
    id: "waf",
    label: "AWS WAF",
    iconSrc: "/lakewatch/preset-icons/waf.png",
    iconBg: "bg-[#d7242e]",
  },
  {
    id: "slack",
    label: "Slack",
    iconSrc: "/lakewatch/preset-icons/slack.png",
    iconBg: "bg-background",
  },
]

interface ConfigureWithPresetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCloudTrailSelect: () => void
}

function PresetIcon({ preset }: { preset: ManagedPreset }) {
  return (
    <div
      className={cn(
        "relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded",
        preset.iconBg,
      )}
    >
      <Image
        src={preset.iconSrc}
        alt=""
        fill
        className="object-cover"
        sizes="60px"
      />
    </div>
  )
}

function PresetRow({
  preset,
  onCloudTrailSelect,
}: {
  preset: ManagedPreset
  onCloudTrailSelect: () => void
}) {
  const isClickable = preset.id === CLOUDTRAIL_PRESET_ID

  if (!isClickable) {
    return (
      <div
        aria-disabled
        className="flex h-auto w-full items-center gap-2 rounded-md border border-border p-2"
      >
        <PresetIcon preset={preset} />
        <span className="text-sm text-foreground">{preset.label}</span>
      </div>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-full justify-start gap-2 rounded-md border border-border p-2 hover:bg-muted-foreground/10"
      onClick={onCloudTrailSelect}
    >
      <PresetIcon preset={preset} />
      <span className="text-sm text-foreground">{preset.label}</span>
    </Button>
  )
}

export function ConfigureWithPresetDialog({
  open,
  onOpenChange,
  onCloudTrailSelect,
}: ConfigureWithPresetDialogProps) {
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const filteredPresets = MANAGED_PRESETS.filter((preset) =>
    preset.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function handleCloudTrailSelect() {
    onCloudTrailSelect()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-2 overflow-hidden p-6 sm:max-w-[529px]">
        <DialogHeader className="gap-2 pr-8">
          <DialogTitle className="text-2xl leading-none font-semibold text-foreground">
            Select a managed preset or allow Genie to convert any datasource to
            bronze
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-2">
          <div
            aria-disabled
            className="flex h-auto w-full items-center gap-4 rounded-md border border-border bg-secondary p-2 pr-2"
          >
            <DbIcon icon={GenieCodeIcon} color="ai" size={42} />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
              <span className="text-sm text-foreground">
                Genie ingest automation to bronze table
              </span>
              <span className="text-hint text-muted-foreground">
                Ingest any datasource automatically to bronze
              </span>
            </div>
            <Badge variant="purple" className="shrink-0">
              Recommended
            </Badge>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search datasource presets..."
              className="h-8 pl-9"
            />
          </div>

          <div className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => (
              <PresetRow
                key={preset.id}
                preset={preset}
                onCloudTrailSelect={handleCloudTrailSelect}
              />
            ))}
            {filteredPresets.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No presets match your search.
              </p>
            ) : null}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
