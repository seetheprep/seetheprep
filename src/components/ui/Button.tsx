import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  return <button type={type} className={cn(`${variant}-button`, className)} {...props} />;
}
