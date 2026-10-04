"use client";
import { coupons } from "@/data/site";
import { useApp } from "@/lib/cart-context";
import { Check } from "lucide-react";

export function CouponRail() {
  const app = useApp();
  return (
    <div className="coupon-rail" aria-label="Offers">
      {coupons.map((coupon, i) => {
        const clipped = app.coupons.includes(coupon.id);
        return (
          <article key={coupon.id} className={`coupon coupon-${i}${clipped ? " clipped" : ""}`}>
            <div className="coupon-stub">
              <b>{coupon.amount}</b>
              <span>{coupon.unit}</span>
            </div>
            <div className="coupon-body">
              <div>
                <b>{coupon.title}</b>
                <p>{coupon.line}</p>
              </div>
              <button
                type="button"
                aria-pressed={clipped}
                aria-label={`${clipped ? "Clipped" : "Clip"} ${coupon.label}`}
                onClick={() => app.clip(coupon.id)}
              >
                {clipped && <Check size={13} />} {clipped ? "Clipped" : "Clip"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
