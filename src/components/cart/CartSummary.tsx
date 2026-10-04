import { menuOptions } from "@/data/menus";
import { uiCopy } from "@/data/site";

import { money } from "@/lib/content";

export function OrderTotals({
  subtotal,
  delivery,
  service = menuOptions.serviceFee,
  coupons = [],
}: {
  subtotal: number;
  delivery: number;
  service?: number;
  coupons?: { label: string; value: number }[];
}) {
  return (
    <dl className="order-totals">
      <div>
        <dt>{uiCopy.CartSummary__1}</dt>
        <dd>{money(subtotal)}</dd>
      </div>
      <div>
        <dt>{uiCopy.CartSummary__2}</dt>
        <dd>{delivery ? money(delivery) : "Free"}</dd>
      </div>
      <div>
        <dt>{uiCopy.CartSummary__3}</dt>
        <dd>{money(service)}</dd>
      </div>
      {coupons.map((c) => (
        <div className="coupon-saving" key={c.label}>
          <dt>{c.label}</dt>
          <dd>−{money(c.value)}</dd>
        </div>
      ))}
      <div className="total">
        <dt>{uiCopy.CartSummary__4}</dt>
        <dd>
          {money(subtotal + delivery + service - coupons.reduce((sum, c) => sum + c.value, 0))}
        </dd>
      </div>
    </dl>
  );
}
