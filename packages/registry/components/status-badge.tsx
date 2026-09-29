import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type StatusBadgeTone = "neutral" | "positive" | "strong" | "warning" | "danger"

export type StatusBadgeProps = {
  tone?: StatusBadgeTone
  /** Redundant colored dot; the label text always carries the meaning. */
  dot?: boolean
  children?: ReactNode
  className?: string
}

// Never color-only. `strong` (solid accent) is for the one top pick per surface; everything else stays bordered.
const TONE: Record<StatusBadgeTone, string> = {
  neutral: "border-border-strong bg-surface-2 text-ink-3",
  positive: "border-accent-border bg-accent-bg text-accent-strong",
  strong: "border-accent bg-accent text-white",
  warning: "border-warning-border bg-warning-bg text-warning",
  danger: "border-danger-border bg-danger-bg text-danger",
}

export function StatusBadge({ tone = "neutral", dot = false, children, className }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-0.75 text-2xs font-semibold uppercase tracking-wide", TONE[tone], className)}>
      {dot && <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-current" />}
      {children}
    </span>
  )
}
