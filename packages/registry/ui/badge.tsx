import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-0.5 text-xs font-semibold whitespace-nowrap transition-atlas [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-accent text-white [a]:hover:bg-accent-strong",
        secondary: "bg-surface-2 text-ink [a]:hover:bg-border-soft",
        destructive: "bg-danger-bg text-danger border-danger-border",
        outline: "border-accent-border bg-accent-bg text-accent-strong [a]:hover:bg-surface-2 [a]:hover:text-muted",
        ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink",
        link: "text-accent underline-offset-4 hover:underline",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({ className, variant = "default", render, ...props }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badgeVariants }
