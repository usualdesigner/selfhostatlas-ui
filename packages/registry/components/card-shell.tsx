import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export type CardShellProps = {
  href: string
  className?: string
  children: ReactNode
}

// Whole-card link with the canonical border/surface/padding and the `card` hover (border-strong + surface-2).
// CTAs inside are `group-hover:underline` spans, never nested links. Swap next/link for <a> outside Next.
export function CardShell({ href, className, children }: CardShellProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col gap-2.5 rounded-md border border-border bg-surface p-4.5 text-ink no-underline transition-atlas hover:border-border-strong hover:bg-surface-2",
        className
      )}
    >
      {children}
    </Link>
  )
}
