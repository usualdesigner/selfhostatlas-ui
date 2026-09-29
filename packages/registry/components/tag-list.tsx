import { cn } from "@/lib/utils"

export type TagListProps = { tags: string[]; className?: string }

export function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) return null
  return (
    <div className={cn("flex flex-wrap gap-1.25", className)}>
      {tags.map((tag) => (
        <span key={tag} className="whitespace-nowrap rounded-sm border border-border bg-surface-2 px-1.75 py-0.5 font-mono text-2xs text-ink-3">{tag}</span>
      ))}
    </div>
  )
}
