"use client"

import { Filter } from "lucide-react"

import { cn } from "@/lib/utils"

export type FilterToggleProps = {
  /** Active filter count; > 0 renders the solid "active" treatment, which never hovers. */
  count?: number
  open?: boolean
  onToggle: () => void
  /** id of the panel this toggles (aria-controls). */
  controls?: string
  className?: string
}

export function FilterToggle({ count = 0, open = false, onToggle, controls, className }: FilterToggleProps) {
  const active = count > 0
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={active ? `Filters, ${count} active` : "Filters"}
      className={cn(
        "inline-flex h-11 flex-none items-center gap-1.25 rounded-sm border px-2.5 transition-atlas sm:h-9",
        active
          ? "border-ink bg-ink text-bg"
          : open
            ? "border-border-strong bg-surface-2 text-ink"
            : "border-border-strong bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink active:bg-border-soft",
        className
      )}
    >
      <Filter className="size-3.5" strokeWidth={2} aria-hidden="true" />
      {active && <span className="font-mono text-2xs font-semibold">{count}</span>}
    </button>
  )
}
