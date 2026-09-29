"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"

export type Chip = { label: string; pressed: boolean; onClick: () => void }

export type ChipGroupProps = {
  layout?: "inline" | "stack"
  /** Visible facet label, announced as the group name. */
  label: string
  chips: Chip[]
  className?: string
}

// 32px pill (documented exception to the 44px touch rule). Selected chips never hover or press.
function ChipButton({ label, pressed, onClick }: Chip) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-8 flex-none items-center whitespace-nowrap rounded-full border px-3.5 text-sm transition-atlas",
        pressed
          ? "border-ink bg-ink font-semibold text-bg"
          : "border-border-strong bg-transparent font-medium text-ink-2 hover:bg-surface-2 hover:text-ink active:bg-border-soft"
      )}
    >
      {label}
    </button>
  )
}

export function ChipGroup({ layout = "inline", label, chips, className }: ChipGroupProps) {
  const labelId = useId()
  const group = (
    <div role="group" aria-labelledby={labelId} className="flex min-w-0 flex-1 flex-wrap gap-1.5">
      {chips.map((chip) => <ChipButton key={chip.label} {...chip} />)}
    </div>
  )
  if (layout === "stack") {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <span id={labelId} className="text-2xs font-semibold uppercase tracking-widest text-muted">{label}</span>
        {group}
      </div>
    )
  }
  return (
    <div className={cn("flex flex-wrap items-baseline gap-2.5", className)}>
      <span id={labelId} className="w-18 flex-none text-2xs font-semibold uppercase tracking-widest text-muted">{label}</span>
      {group}
    </div>
  )
}
