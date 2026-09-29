import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// atlas-ui button. Press is a tone step (active:), never translate/scale/shadow.
// No outline-none: the registry base layer owns the 2px accent focus ring.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-atlas select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent-strong active:bg-[color-mix(in_oklch,var(--accent-strong),var(--ink)_12%)]",
        outline: "border-border-strong bg-surface text-ink hover:border-ink-3 hover:bg-surface-2 active:bg-border-soft aria-expanded:bg-surface-2",
        secondary: "bg-surface-2 text-ink hover:bg-[color-mix(in_oklch,var(--surface-2),var(--ink)_5%)] active:bg-border-soft aria-expanded:bg-surface-2",
        ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink active:bg-border-soft aria-expanded:bg-surface-2 aria-expanded:text-ink",
        destructive: "bg-danger-bg text-danger border-danger-border hover:bg-[color-mix(in_oklch,var(--danger-bg),var(--danger)_10%)]",
        link: "text-accent underline-offset-3 hover:text-accent-strong hover:underline",
        // was `affiliate` in selfhostatlas — outlined accent for paid/external primary actions
        "outline-accent": "border-accent bg-transparent text-accent-strong hover:border-accent-strong hover:bg-accent-bg active:bg-accent-border aria-expanded:bg-accent-bg",
      },
      size: {
        default: "h-10 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-1.5 px-6",
        icon: "size-11",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
