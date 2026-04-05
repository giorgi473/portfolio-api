import * as React from "react"
import { cn } from "@/lib/utils"

const FieldGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-4", className)} {...props} />
)

const FieldSet = ({ className, ...props }: React.HTMLAttributes<HTMLFieldSetElement>) => (
  <fieldset className={cn("grid gap-4 border-none p-0", className)} {...props} />
)

const FieldLegend = ({ className, ...props }: React.HTMLAttributes<HTMLLegendElement>) => (
  <legend className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)

const FieldDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

const FieldLabel = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
)

const FieldSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("h-px bg-border", className)} {...props} />
)

const FieldError = ({ errors, className }: { errors: any[], className?: string }) => {
  if (!errors || errors.length === 0) return null;
  return (
    <p className={cn("text-xs font-medium text-destructive", className)}>
      {errors[0]?.message}
    </p>
  );
}

const Field = ({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }) => (
  <div
    className={cn(
      "grid gap-2",
      orientation === "horizontal" && "flex items-center gap-2",
      className
    )}
    {...props}
  />
)

export {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
}
