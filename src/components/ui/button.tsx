// Buton në stilin shadcn/ui, i përshtatur me temën PC-STYLE
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  default: "bg-electric text-white hover:bg-volt shadow-glow-sm hover:shadow-glow",
  outline: "border border-steel bg-transparent text-frost hover:border-electric hover:text-volt",
  ghost: "bg-transparent text-mist hover:text-frost hover:bg-steel/50",
  danger: "bg-red-600/90 text-white hover:bg-red-500",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs", md: "h-10 px-5 text-sm", lg: "h-12 px-7 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
