"use client";
import { useCountdown } from "@/lib/hooks/useCountdown";
export function Countdown({ deadline }: { deadline: number }) {
  const { ref, text, remaining } = useCountdown<HTMLSpanElement>(deadline);
  return (
    <span ref={ref} className="rolling-number" aria-label={`${remaining} seconds remaining`}>
      {text}
    </span>
  );
}
