"use client";
import { useEffect, useRef, useState } from "react";
export function useVisibleClock<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [now, setNow] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const tick = () => {
      if (!document.hidden) setNow(Date.now());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [visible]);
  return { ref, now, visible };
}
export const timeLeft = (deadline: number, now: number) =>
  Math.max(0, Math.ceil((deadline - now) / 1000));
export const formatClock = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
