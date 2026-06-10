import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-steel bg-carbon px-3 text-sm text-frost",
        "focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-colors",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
