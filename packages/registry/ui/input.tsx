import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

// Right mobile keyboard on first tap; an explicit inputMode prop wins.
const inputModeByType: Partial<Record<string, React.ComponentProps<"input">["inputMode"]>> = {
  email: "email", number: "decimal", tel: "tel", url: "url",
}

// Focus is the global outline ring only — the border does not change on focus.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      inputMode={type ? inputModeByType[type] : undefined}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-sm border border-border-strong bg-surface px-4 text-md text-ink transition-atlas placeholder:text-muted file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
