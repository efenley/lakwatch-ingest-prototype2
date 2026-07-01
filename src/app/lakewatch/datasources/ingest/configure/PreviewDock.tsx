import { TableIcon, ChevronDownIcon, CloseIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function PreviewDock() {
  return (
    <div className="w-full shrink-0 border-t border-border bg-background px-4 pt-8 pb-4 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center gap-3 py-4">
        <TableIcon size={36} className="text-muted-foreground" />
        <p className="text-sm text-foreground">Configure a table to see a preview</p>
      </div>
    </div>
  )
}

const PREVIEW_ROWS = [
  {
    eventUuid: "4b2c6b9e-32e3-4a77-a7b1-8cce7a19e83a",
    eventTime: "2025-10-31T08:42:10Z",
    eventData: '{"user_id": "u123", "action": "login", "device": "iPhone", "ip": "73.45.221.12"}',
  },
  {
    eventUuid: "1d4f2a1c-ed30-4b2e-b1e9-5b99c2b3a88f",
    eventTime: "2025-10-31T08:44:32Z",
    eventData: '{"user_id": "u456", "action": "view_page", "page": "/pricing", "referrer": "google"}',
  },
  {
    eventUuid: "9a5e1d77-de20-4423-b8ab-120a8a53c147",
    eventTime: "2025-10-31T08:47:12Z",
    eventData: '{"user_id": "u123", "action": "add_to_cart", "item_id": "sku-9081", "quantity": 2, "price": 39.99}',
  },
  {
    eventUuid: "47ce9b92-22a8-4a63-9373-d5a13b7a5e93",
    eventTime: "2025-10-31T08:50:45Z",
    eventData: '{"user_id": "u789", "action": "login", "device": "Android", "ip": "104.31.66.5"}',
  },
  {
    eventUuid: "2bcb87f3-9237-4c02-8c39-ff5f1d19f8ee",
    eventTime: "2025-10-31T08:53:01Z",
    eventData: '{"user_id": "u789", "action": "view_page", "page": "/home", "referrer": "direct"}',
  },
] as const

interface TablePreviewPanelProps {
  tableName?: string
}

export function TablePreviewPanel({ tableName = "aws_sec_lake_bronze" }: TablePreviewPanelProps) {
  return (
    <div className="flex w-full shrink-0 flex-col border-t border-border bg-secondary shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex h-8 items-center justify-between border-b border-border bg-secondary px-2">
        <span className="truncate px-2 text-sm font-semibold text-foreground">{tableName}</span>
        <div className="flex items-center">
          <Button variant="ghost" size="icon-xs" aria-label="Collapse preview">
            <ChevronDownIcon size={16} className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon-xs" aria-label="Close preview">
            <CloseIcon size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="max-h-[235px] overflow-auto bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[258px] font-semibold text-foreground">event_uuid</TableHead>
              <TableHead className="w-[212px] font-semibold text-foreground">event_time</TableHead>
              <TableHead className="font-semibold text-foreground">event_data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PREVIEW_ROWS.map((row) => (
              <TableRow key={row.eventUuid}>
                <TableCell className="max-w-[258px] truncate text-foreground">{row.eventUuid}</TableCell>
                <TableCell className="max-w-[212px] truncate text-foreground">{row.eventTime}</TableCell>
                <TableCell className="max-w-0 truncate text-foreground">{row.eventData}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

interface PreviewDockLayoutProps {
  header?: React.ReactNode
  children: React.ReactNode
}

export function PreviewDockLayout({ header, children }: PreviewDockLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {header ? <div className="shrink-0">{header}</div> : null}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
