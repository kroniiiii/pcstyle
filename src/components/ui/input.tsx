import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-steel bg-carbon px-3 text-sm text-frost placeholder:text-mist/60",
        "focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
