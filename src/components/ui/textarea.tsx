import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[110px] w-full rounded-lg border border-steel bg-carbon px-3 py-2 text-sm text-frost placeholder:text-mist/60",
        "focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-colors",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
