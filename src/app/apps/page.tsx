"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BranchIcon, ExpandMoreIcon, PaperclipIcon, SparkleIcon } from "@/components/icons"
import { DbIcon } from "@/components/ui/db-icon"
import { cn } from "@/lib/utils"

const TEMPLATES = [
  {
    title: "AI Chatbot",
    category: "AI / ML",
    description: "Conversational assistant over your data and docs.",
    headerClass:
      "bg-gradient-to-br from-blue-600/25 via-purple-600/15 to-transparent",
  },
  {
    title: "Data Dashboard",
    category: "Analytics",
    description: "Charts and KPIs backed by warehouse tables.",
    headerClass:
      "bg-gradient-to-br from-teal-600/25 via-cyan-600/10 to-transparent",
  },
  {
    title: "SQL Explorer",
    category: "Data",
    description: "Parameterized queries with saved explorations.",
    headerClass:
      "bg-gradient-to-br from-indigo-600/25 via-blue-600/10 to-transparent",
  },
  {
    title: "File Analyzer",
    category: "AI / ML",
    description: "Upload files and extract structured insights.",
    headerClass:
      "bg-gradient-to-br from-orange-600/20 via-rose-600/15 to-transparent",
  },
  {
    title: "Cost Monitor",
    category: "Analytics",
    description: "Track spend and usage across workspaces.",
    headerClass:
      "bg-gradient-to-br from-green-600/25 via-emerald-600/10 to-transparent",
  },
  {
    title: "Model Playground",
    category: "AI / ML",
    description: "Compare prompts and models side by side.",
    headerClass:
      "bg-gradient-to-br from-violet-600/25 via-fuchsia-600/10 to-transparent",
  },
  {
    title: "Report Generator",
    category: "Data",
    description: "Scheduled narratives from warehouse metrics.",
    headerClass:
      "bg-gradient-to-br from-sky-600/25 via-blue-600/10 to-transparent",
  },
  {
    title: "Feature Browser",
    category: "ML Ops",
    description: "Discover and validate features for training.",
    headerClass:
      "bg-gradient-to-br from-amber-600/20 via-yellow-600/10 to-transparent",
  },
] as const

export default function AppsBuildPage() {
  const [idea, setIdea] = React.useState("")

  return (
    <div className="flex flex-col gap-10 p-6 md:p-8">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="group flex w-full max-w-3xl items-center gap-2 text-left">
          <span className="text-base font-semibold text-foreground">
            Build your app with App Builder
          </span>
          <ExpandMoreIcon
            size={16}
            className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex flex-col overflow-hidden rounded-md border border-border bg-background shadow-[var(--shadow-db-sm)]">
              <Textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your idea..."
                className="min-h-[140px] resize-none rounded-none border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:ring-0 md:text-sm"
              />
              <div className="flex items-center gap-2 border-t border-border px-3 py-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Attach file"
                >
                  <PaperclipIcon size={16} className="text-muted-foreground" />
                </Button>
                <Select defaultValue="default">
                  <SelectTrigger
                    size="sm"
                    className="h-8 flex-1 rounded border-border md:max-w-[220px]"
                  >
                    <SelectValue placeholder="App space" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default App Space</SelectItem>
                    <SelectItem value="shared">Shared prototypes</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="icon-sm"
                  className="shrink-0 rounded-full"
                  aria-label="Submit idea"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm" type="button" className="gap-2">
                <DbIcon icon={SparkleIcon} color="ai" size={16} />
                Need ideas?
              </Button>
              <Button variant="default" size="sm" type="button" className="gap-2">
                <BranchIcon size={16} className="text-muted-foreground" />
                Import from Git
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-foreground">
          Start with a template
        </h2>

        <div className="flex flex-wrap gap-3">
          <Select defaultValue="all-spaces">
            <SelectTrigger size="sm" className="h-8 w-[160px] rounded border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-spaces">All app spaces</SelectItem>
              <SelectItem value="mine">My app spaces</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-use-cases">
            <SelectTrigger size="sm" className="h-8 w-[160px] rounded border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-use-cases">All use cases</SelectItem>
              <SelectItem value="ai">AI / ML</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-frameworks">
            <SelectTrigger size="sm" className="h-8 w-[160px] rounded border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-frameworks">All frameworks</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="streamlit">Streamlit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEMPLATES.map((t) => (
            <Card
              key={t.title}
              className="cursor-pointer gap-0 overflow-hidden p-0 transition-colors hover:border-primary/40"
            >
              <div className={cn("h-14 w-full shrink-0", t.headerClass)} />
              <CardHeader className="gap-2 pb-2 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-sm">{t.title}</CardTitle>
                  <Badge variant="secondary" className="font-semibold">
                    {t.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
