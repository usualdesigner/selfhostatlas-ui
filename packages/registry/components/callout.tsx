import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type CalloutTone = "note" | "warning" | "success" | "danger" | "neutral"

export type CalloutProps = {
  /** note/warning share the amber chrome; success is accent-tinted; danger is destructive; neutral is un-tinted (border-strong + surface-2, mono label). */
  tone?: CalloutTone
  layout?: "row" | "stack"
  /** Uppercase eyebrow; defaults to the tone name. Keep to one word. */
  label?: string
  /** Set on callouts mounted in response to user action. Then danger announces as role="alert", everything else as role="status". Static callouts stay silent. */
  live?: boolean
  /** Renders a close button; visibility is owned by the parent. */
  onDismiss?: () => void
  children: ReactNode
  className?: string
}

const BOX: Record<CalloutTone, string> = {
  note: "border-warning-border bg-warning-bg",
  warning: "border-warning-border bg-warning-bg",
  success: "border-accent-border bg-accent-bg",
  danger: "border-danger-border bg-danger-bg",
  neutral: "border-border-strong bg-surface-2",
}
const LABEL: Record<CalloutTone, string> = {
  note: "text-warning",
  warning: "text-warning",
  success: "text-accent",
  danger: "text-danger",
  neutral: "font-mono text-muted",
}

export function Callout({ tone = "note", layout = "row", label, live = false, onDismiss, children, className }: CalloutProps) {
  const role = !live ? undefined : tone === "danger" ? "alert" : "status"
  const eyebrow = (
    <span className={cn("flex-none text-2xs font-semibold uppercase tracking-[0.08em]", LABEL[tone])}>{label ?? tone}</span>
  )
  const dismiss = onDismiss ? (
    <button
      type="button"
      aria-label="Dismiss"
      onClick={onDismiss}
      className="-m-2 flex size-9 flex-none items-center justify-center self-start rounded-sm text-muted transition-atlas hover:text-ink-2"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
  ) : null

  if (layout === "stack") {
    return (
      <div role={role} className={cn("flex flex-col gap-1.5 rounded-md border px-4 py-3", BOX[tone], className)}>
        <div className="flex items-baseline gap-2">
          <span className="flex-1">{eyebrow}</span>
          {dismiss}
        </div>
        <span className="text-sm leading-relaxed text-ink-3 [&_code]:font-mono [&_code]:text-[0.92em]">{children}</span>
      </div>
    )
  }
  return (
    <div role={role} className={cn("flex items-baseline gap-2.5 rounded-md border px-4.5 py-3.5", BOX[tone], className)}>
      {eyebrow}
      <span className="flex-1 text-sm leading-relaxed text-ink-3 [&_code]:font-mono [&_code]:text-[0.92em]">{children}</span>
      {dismiss}
    </div>
  )
}
