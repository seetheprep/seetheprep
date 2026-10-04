import { coupons } from "@/data/site";
import type { Kitchen } from "./types";

export function couponSavings(
  ids: string[],
  kitchen: Kitchen,
  subtotal: number,
  delivery: number,
  mode = "delivery",
  now = new Date(),
) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
  const applied = coupons.filter(
    (c) =>
      ids.includes(c.id) &&
      kitchen.camera &&
      (c.id !== "before-eight" || hour < 20) &&
      (c.id !== "free-delivery" || mode === "delivery"),
  );
  let remaining = subtotal;
  const lines = applied
    .map((c) => {
      const value =
        c.id === "live-fifteen"
          ? Math.round(subtotal * 0.15 * 100) / 100
          : c.id === "free-delivery"
            ? delivery
            : Math.min(5, remaining);
      if (c.id !== "free-delivery") remaining = Math.max(0, remaining - value);
      return { id: c.id, label: c.label, value };
    })
    .filter((c) => c.value > 0);
  return { lines, discount: Math.round(lines.reduce((sum, c) => sum + c.value, 0) * 100) / 100 };
}
