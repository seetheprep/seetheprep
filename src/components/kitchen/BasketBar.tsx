import { uiCopy } from "@/data/site";
import { money } from "@/lib/content";
import Link from "next/link";
export function BasketBar({ count, subtotal }: { count: number; subtotal: number }) {
  return count > 0 ? (
    <Link className="floating-basket" href="/cart/">
      <b>
        {uiCopy.BasketBar__1}
        {count} {uiCopy.BasketBar__2}
        {count === 1 ? "" : "s"}
      </b>
      <span>{money(subtotal)}</span>
    </Link>
  ) : null;
}
