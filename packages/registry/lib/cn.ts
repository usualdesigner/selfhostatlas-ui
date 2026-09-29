import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Two-glyph initials for fallback tiles: "AppFlowy" → "Ap", "Home Assistant" → "HA", "n8n" → "N8". */
export function initialsFor(name: string) {
  const words = name.trim().split(/[\s-]+/).filter(Boolean)
  if (words.length === 0) return ""
  if (words.length >= 2) return ((words[0] ?? "").charAt(0) + (words[1] ?? "").charAt(0)).toUpperCase()
  const two = (words[0] ?? "").slice(0, 2)
  return two.charAt(0).toUpperCase() + two.slice(1)
}
