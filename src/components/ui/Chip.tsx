import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
export function Chip({
  selected = false,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn("filter-chip", selected && "selected", className)}
      {...props}
    />
  );
}
