import type { ReactNode } from "react"

import { cn, initialsFor } from "@/lib/utils"

/** Five marker hues from tokens.json (`--marker-N`), plus `accent` for the primary type. */
export type TypeTileTone = 1 | 2 | 3 | 4 | 5 | "accent"
export type TypeTileSize = "sm" | "md" | "responsive"

export type TypeTileProps = {
  tone: TypeTileTone
  /** Accessible name. Also the source of the fallback initials. */
  label: string
  /** Logo image; when set it IS the tile. Initials render only when this is absent or fails to load. */
  logoSrc?: string
  /** Glyph shown instead of initials (e.g. a lucide icon). Ignored when logoSrc renders. */
  icon?: ReactNode
  size?: TypeTileSize
  /** Decorative by default (aria-hidden). Set false when the tile is the only label for its row. */
  decorative?: boolean
  className?: string
}

const TONE: Record<TypeTileTone, string> = {
  accent: "border-accent-border bg-accent-bg text-accent-strong",
  1: "border-marker-1-border bg-marker-1-bg text-marker-1",
  2: "border-marker-2-border bg-marker-2-bg text-marker-2",
  3: "border-marker-3-border bg-marker-3-bg text-marker-3",
  4: "border-marker-4-border bg-marker-4-bg text-marker-4",
  5: "border-marker-5-border bg-marker-5-bg text-marker-5",
}
const SIZE: Record<TypeTileSize, { box: string; icon: string }> = {
  md: { box: "size-10 text-sm", icon: "[&_svg]:size-5" },
  sm: { box: "size-[26px] text-2xs sm:size-7", icon: "[&_svg]:size-3.5" },
  responsive: { box: "size-[34px] text-xs sm:size-10 sm:text-sm", icon: "[&_svg]:size-[18px] sm:[&_svg]:size-5" },
}

export function TypeTile({ tone, label, logoSrc, icon, size = "md", decorative = true, className }: TypeTileProps) {
  const s = SIZE[size]
  return (
    <span
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : "img"}
      className={cn(
        "flex flex-none items-center justify-center overflow-hidden rounded-md border font-mono font-semibold",
        TONE[tone], s.box, s.icon, className
      )}
    >
      {logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoSrc} alt="" width={40} height={40} className="size-[62%] object-contain" />
      ) : icon ?? initialsFor(label)}
    </span>
  )
}
