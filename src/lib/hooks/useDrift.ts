"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";
/** A duplicated rail moves at 21px/s; transforms never compete with scroll. */
export function useDrift(visible: boolean, direction: 1 | -1 = -1) {
  const row = useRef<HTMLDivElement>(null),
    track = useRef<HTMLDivElement>(null),
    hold = useRef(0),
    offset = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = row.current,
      t = track.current;
    if (!el || !t || !visible || reduce) return;
    let frame = 0,
      previous = performance.now();
    const run = (now: number) => {
      const dt = Math.min(now - previous, 50);
      previous = now;
      if (now > hold.current && !document.hidden && innerWidth < 1024) {
        offset.current += dt * 0.021 * direction;
        const half = t.scrollWidth / 2;
        let combined = offset.current - el.scrollLeft;
        if (half) {
          while (combined > 0) {
            offset.current -= half;
            combined -= half;
          }
          while (combined < -half) {
            offset.current += half;
            combined += half;
          }
        }
        t.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [visible, direction, reduce]);
  return {
    row,
    track,
    pause: () => {
      hold.current = Infinity;
    },
    resume: () => {
      hold.current = performance.now() + 2500;
    },
  };
}
