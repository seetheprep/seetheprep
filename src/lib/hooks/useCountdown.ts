"use client";
import { formatClock, timeLeft, useVisibleClock } from "./useVisibleClock";
export function useCountdown<T extends HTMLElement>(deadline: number) {
  const { ref, now } = useVisibleClock<T>();
  const remaining = now ? timeLeft(deadline, now) : 0;
  return { ref, remaining, text: formatClock(remaining) };
}
