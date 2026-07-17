"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SegmentedControl, SegmentedItem } from "@/components/ui/segmented-control"
import { Switch } from "@/components/ui/switch"
import {
  CheckboxIcon,
  CircleIcon,
  CloudDatabaseIcon,
  PlusIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { DATASOURCES_LIST_PATH } from "./datasource-routes"

function formatPipelineName(date = new Date()) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = String(date.getFullYear()).slice(-2)
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours % 12 || 12
  return `${month}_${day}_${year}_${hour12}:${minutes}${period}`
}

function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-background opacity-25",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
  )
}

function MedallionColumn({
  title,
  toggleOn = false,
  onToggleChange,
  children,
  footer,
}: {
  title: string
  toggleOn?: boolean
  onToggleChange?: (checked: boolean) => void
  children?: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="flex min-h-[520px] min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-background">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-border px-2">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <Switch checked={toggleOn} onCheckedChange={onToggleChange} />
      </div>
      <div className="relative min-h-0 flex-1 overflow-auto">
        <DotGrid />
        <div className="relative flex flex-col gap-4 p-4">{children}</div>
      </div>
      {footer ? (
        <div className="shrink-0 border-t border-border p-4">{footer}</div>
      ) : null}
    </div>
  )
}

function PipelineNodeCard({
  title,
  subtitle,
  meta,
  status,
  actions,
  icon,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  meta?: React.ReactNode
  status?: React.ReactNode
  actions?: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
      <div className="flex flex-col gap-2 border-b border-border px-4 py-2">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 text-sm text-foreground">{title}</div>
          {icon}
        </div>
        {subtitle ? (
          <div className="text-hint text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>
      {meta ? <div className="px-4 py-2 text-hint text-foreground">{meta}</div> : null}
      {status ? <div className="px-4 py-2">{status}</div> : null}
      {actions ? (
        <div className="flex items-center justify-between px-4 py-3">{actions}</div>
      ) : null}
    </div>
  )
}

export function CloudTrailPipelineEditor() {
  const [pipelineName] = React.useState(() => formatPipelineName())
  const [editorMode, setEditorMode] = React.useState("ui")
  const [active, setActive] = React.useState(true)
  const [bronzeViewEnabled, setBronzeViewEnabled] = React.useState(true)
  const [silverEnabled, setSilverEnabled] = React.useState(false)
  const [goldEnabled, setGoldEnabled] = React.useState(false)

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 space-y-4 border-b border-border p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-secondary">
                <CloudDatabaseIcon size={20} className="text-muted-foreground" />
              </div>
              <h1 className="text-2xl leading-none font-semibold text-foreground">
                {pipelineName}
              </h1>
              <Button variant="default" size="icon-sm" aria-label="Pipeline options">
                <CloudDatabaseIcon size={16} className="text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="lakewatch-warehouse">
              <SelectTrigger className="h-8 w-[240px]">
                <div className="flex items-center gap-2">
                  <CircleIcon size={16} className="text-[var(--success)]" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lakewatch-warehouse">Lakewatch Warehouse</SelectItem>
              </SelectContent>
            </Select>

            <SegmentedControl value={editorMode} onValueChange={setEditorMode}>
              <SegmentedItem value="ui">UI</SegmentedItem>
              <SegmentedItem value="yaml">YAML</SegmentedItem>
            </SegmentedControl>

            <Button variant="default" size="sm">
              Permissions
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href={DATASOURCES_LIST_PATH}>Cancel</Link>
            </Button>
            <Button size="sm" disabled>
              Apply changes
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-foreground">Processing schedule</span>
          <Select defaultValue="at-least-every">
            <SelectTrigger className="h-8 w-[151px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="at-least-every">At least every</SelectItem>
            </SelectContent>
          </Select>
          <Input className="h-8 w-[65px]" defaultValue="10" aria-label="Schedule interval" />
          <Select defaultValue="minutes">
            <SelectTrigger className="h-8 w-[151px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minutes">Minutes</SelectItem>
            </SelectContent>
          </Select>
          <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
          <div className="flex items-center gap-2">
            <Label htmlFor="pipeline-active" className="text-sm font-semibold text-foreground">
              Active
            </Label>
            <Switch id="pipeline-active" checked={active} onCheckedChange={setActive} />
          </div>
          <Button variant="link" size="sm" className="h-8 px-0">
            Advanced options
          </Button>
          <Button variant="link" size="sm" className="ml-auto h-8 px-0">
            Save transformations
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-2 overflow-auto p-4 lg:grid-cols-3">
        <MedallionColumn title="Bronze">
          <PipelineNodeCard
            title={
              <>
                <span className="text-muted-foreground">Existing UC Delta table:</span>
                <br />
                security_lake.bronze.cloud_trail_1
              </>
            }
            meta="Current field list: 27 fields added"
            status={
              <div className="flex items-center gap-1.5">
                <CircleIcon size={18} className="text-[var(--success)]" />
                <span className="text-hint font-semibold text-foreground">Active</span>
              </div>
            }
          />

          <PipelineNodeCard
            title="aws_sec_lake_bronze"
            subtitle={
              <>
                Bronze view
                <br />
                Current field list: 27 fields added
              </>
            }
            icon={
              <div className="relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded bg-[#cc2264]">
                <Image
                  src="/lakewatch/preset-icons/cloudtrail.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
            }
            status={
              <div className="flex items-center gap-1.5">
                <CheckboxIcon size={18} className="text-[var(--success)]" />
                <span className="text-hint font-semibold text-foreground">
                  Preview available
                </span>
              </div>
            }
            actions={
              <>
                <Button variant="default" size="xs">
                  View &amp; edit
                </Button>
                <Switch
                  checked={bronzeViewEnabled}
                  onCheckedChange={setBronzeViewEnabled}
                  aria-label="Enable bronze view"
                />
              </>
            }
          />

          <Button variant="default" size="sm" className="w-fit">
            <PlusIcon size={16} className="text-muted-foreground" />
            Add enrichments
          </Button>
        </MedallionColumn>

        <MedallionColumn
          title="Silver"
          toggleOn={silverEnabled}
          onToggleChange={setSilverEnabled}
        >
          <Button variant="default" size="sm" className="w-fit">
            <PlusIcon size={16} className="text-muted-foreground" />
            Add transform
          </Button>
        </MedallionColumn>

        <MedallionColumn
          title="Gold"
          toggleOn={goldEnabled}
          onToggleChange={setGoldEnabled}
        />
      </div>
    </div>
  )
}
