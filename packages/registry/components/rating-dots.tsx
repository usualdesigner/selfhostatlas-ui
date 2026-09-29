import { cn } from "@/lib/utils"

export type RatingDotsProps = {
  /** 0..max, clamped and rounded. */
  value: number
  max?: number
  /** caution = amber (effort/difficulty, the site default); accent = green (quality). */
  tone?: "caution" | "accent"
  /** Screen-reader noun: "Difficulty 3 out of 5". */
  name?: string
  showLabel?: boolean
  className?: string
}

// Filled dot = tone colour, empty = strong-border ring. Was DifficultyDots in selfhostatlas.
export function RatingDots({ value, max = 5, tone = "caution", name = "Rating", showLabel = true, className }: RatingDotsProps) {
  const n = Math.max(0, Math.min(max, Math.round(value)))
  const fill = tone === "accent" ? "bg-accent" : "bg-warning"
  return (
    <span role="img" aria-label={`${name} ${n} out of ${max}`} className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="inline-flex items-center gap-1">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={cn("size-2 rounded-full", i < n ? fill : "border-[1.5px] border-border-strong bg-transparent")} />
        ))}
      </span>
      {showLabel && <span aria-hidden="true" className="font-mono text-xs font-medium text-ink-2">{n} / {max}</span>}
    </span>
  )
}
