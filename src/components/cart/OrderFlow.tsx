"use client";
import { menuOptions } from "@/data/menus";
import { uiCopy } from "@/data/site";

import { OrderTotals } from "@/components/cart/CartSummary";
import Image from "next/image";
import { CartItem } from "./CartItem";

import { PageHeader, SkeletonCards } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import { deliveryFee, findKitchen, money } from "@/lib/content";
import { couponSavings } from "@/lib/coupons";
import type { PreviewOrder } from "@/lib/types";
import { Camera, Check, CreditCard, Mail, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export { OrderTotals } from "@/components/cart/CartSummary";
export function CartPage() {
  const app = useApp();
  const k = findKitchen(app.basket.kitchenId);
  const subtotal = app.basket.items.reduce((sum, row) => sum + row.unitPrice * row.quantity, 0);
  return (
    <main className="app-page cart-page" id="main-content">
      <PageHeader title="Your basket" />
      <div className="flow-content">
        {!app.ready ? (
          <SkeletonCards />
        ) : !k || !app.count ? (
          <div className="flow-empty">
            <ShoppingBag size={40} />
            <h2>{uiCopy.OrderFlow__1}</h2>
            <Link href="/kitchens/all/" className="primary-button">
              {uiCopy.OrderFlow__2}
            </Link>
          </div>
        ) : (
          <>
            <div className="basket-kitchen">
              <Image
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                src={k.img}
                width={64}
                height={48}
                alt=""
              />
              <div>
                <h2>{k.name}</h2>
                <p>
                  {k.cuisine} {uiCopy.OrderFlow__3}
                </p>
              </div>
            </div>
            <div className="basket-items">
              {app.basket.items.map((row) => (
                <CartItem
                  key={row.key}
                  item={row}
                  onChange={(delta) => app.quantity(row.key, delta)}
                />
              ))}
            </div>
            <Link className="text-link" href={`/kitchen/${k.id}/`}>
              {uiCopy.OrderFlow__4}
            </Link>
            <OrderTotals
              subtotal={subtotal}
              delivery={deliveryFee(k)}
              coupons={couponSavings(app.coupons, k, subtotal, deliveryFee(k)).lines}
            />
            {subtotal < menuOptions.minOrder && (
              <p className="form-note">
                {uiCopy.OrderFlow__5}
                {money(menuOptions.minOrder - subtotal)} {uiCopy.OrderFlow__6}
              </p>
            )}
            <Link
              className={`primary-button${subtotal < menuOptions.minOrder ? " is-disabled" : ""}`}
              href="/checkout/"
              aria-disabled={subtotal < menuOptions.minOrder}
              onClick={(e) => {
                if (subtotal < menuOptions.minOrder) e.preventDefault();
              }}
            >
              {uiCopy.OrderFlow__7}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
export function CheckoutPage() {
  const app = useApp(),
    router = useRouter();
  const k = findKitchen(app.basket.kitchenId);
  const [mode, setMode] = useState<"delivery" | "collection">("delivery"),
    [time, setTime] = useState("ASAP"),
    [slots, setSlots] = useState<string[]>([]);
  const subtotal = app.basket.items.reduce((sum, row) => sum + row.unitPrice * row.quantity, 0),
    delivery = k && mode === "delivery" ? deliveryFee(k) : 0;
  useEffect(() => {
    const start = Math.ceil((Date.now() + 30 * 60000) / 900000) * 900000;
    setSlots(
      Array.from({ length: 12 }, (_, i) =>
        new Date(start + i * 900000).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        }),
      ),
    );
  }, []);
  const [placing, setPlacing] = useState(false);
  const place = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (placing || !k || subtotal < menuOptions.minOrder || !e.currentTarget.reportValidity())
      return;
    setPlacing(true);
    const fields = new FormData(e.currentTarget);
    const savings = couponSavings(app.coupons, k, subtotal, delivery, mode);
    const order: PreviewOrder = {
      id: `STP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      kitchenId: k.id,
      items: app.basket.items,
      subtotal,
      delivery,
      service: menuOptions.serviceFee,
      total: subtotal + delivery + menuOptions.serviceFee - savings.discount,
      discount: savings.discount,
      coupons: savings.lines,
      allergy: String(fields.get("allergy") || ""),
      mode,
      time,
      createdAt: Date.now(),
      mobile: String(fields.get("mobile") || ""),
      address: String(fields.get("address") || ""),
      postcode: String(fields.get("postcode") || ""),
      customerName: String(fields.get("name")),
      customerEmail: String(fields.get("email")),
    };
    try {
      const response = await fetch("/api/order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: order.id,
          name: order.customerName,
          email: order.customerEmail,
          kitchenId: k.id,
          items: order.items.map((row) => ({
            dishId: row.dish.id,
            quantity: row.quantity,
            large: row.options.includes("Large"),
            extra: row.options.includes("Extra portion"),
          })),
        }),
      });
      const result: { sent?: boolean } = await response.json();
      order.emailSent = response.ok && result.sent === true;
    } catch {
      order.emailSent = false;
    }
    app.setOrder(order);
    app.clear();
    router.push("/confirmation/");
  };
  if (app.ready && (!k || !app.count))
    return (
      <main className="app-page">
        <PageHeader title="Checkout" />
        <div className="flow-empty">
          <p>{uiCopy.OrderFlow__8}</p>
          <Link href="/kitchens/all/" className="primary-button">
            {uiCopy.OrderFlow__9}
          </Link>
        </div>
      </main>
    );
  return (
    <main className="app-page checkout-page" id="main-content">
      <PageHeader title="Checkout" />
      <form className="flow-content" onSubmit={place}>
        <h2>{k?.name}</h2>
        <div className="checkout-toggle">
          {(["delivery", "collection"] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={mode === value ? "selected" : ""}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {value === "delivery" ? "Delivery" : "Collection"}
            </button>
          ))}
        </div>
        <h3>{uiCopy.OrderFlow__10}</h3>
        <label className="app-field">
          <span>{uiCopy.OrderFlow__11}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className="app-field">
          <span>{uiCopy.OrderFlow__12}</span>
          <input name="mobile" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" />
        </label>
        <label className="app-field">
          <span>{uiCopy.OrderFlow__13}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        {mode === "delivery" && (
          <>
            <h3>{uiCopy.OrderFlow__14}</h3>
            <label className="app-field">
              <span>{uiCopy.OrderFlow__15}</span>
              <input name="address" autoComplete="street-address" required />
            </label>
            <div className="address-pair">
              <label className="app-field">
                <span>{uiCopy.OrderFlow__16}</span>
                <input name="town" value="Chester" readOnly />
              </label>
              <label className="app-field">
                <span>{uiCopy.OrderFlow__17}</span>
                <input name="postcode" autoComplete="postal-code" required maxLength={10} />
              </label>
            </div>
          </>
        )}
        <label className="app-field">
          <span>{uiCopy.OrderFlow__18}</span>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option>{uiCopy.OrderFlow__19}</option>
            {slots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </label>
        <label className="app-field">
          <span>{uiCopy.OrderFlow__20}</span>
          <textarea name="allergy" rows={2} placeholder="Tell the kitchen about any allergies" />
        </label>
        <div className="payment-preview">
          <CreditCard size={22} />
          <div>
            <b>{uiCopy.OrderFlow__21}</b>
          </div>
        </div>
        <OrderTotals
          subtotal={subtotal}
          delivery={delivery}
          coupons={k ? couponSavings(app.coupons, k, subtotal, delivery, mode).lines : []}
        />
        <button
          className="primary-button"
          type="submit"
          disabled={subtotal < menuOptions.minOrder || placing}
        >
          {uiCopy.OrderFlow__22}
          {money(
            subtotal +
              delivery +
              menuOptions.serviceFee -
              (k ? couponSavings(app.coupons, k, subtotal, delivery, mode).discount : 0),
          )}
        </button>
      </form>
    </main>
  );
}
export function ConfirmationPage() {
  const app = useApp(),
    router = useRouter();
  const order = app.order,
    kitchen = order && findKitchen(order.kitchenId);
  useEffect(() => {
    if (!order) return;
    const timer = setTimeout(() => router.replace(`/order/${order.id}/`), 2800);
    return () => clearTimeout(timer);
  }, [order, router]);
  if (!app.ready)
    return (
      <main className="app-page">
        <SkeletonCards />
      </main>
    );
  if (!order || !kitchen)
    return (
      <main className="app-page">
        <PageHeader title="Your order" />
        <div className="flow-empty">
          <p>{uiCopy.OrderFlow__23}</p>
          <Link className="primary-button" href="/kitchens/all/">
            {uiCopy.OrderFlow__24}
          </Link>
        </div>
      </main>
    );
  return (
    <main className="app-page confirmation-page" id="main-content">
      <PageHeader title="Your order" />
      <div className="flow-content">
        <div className="confirmation-mark">
          <Check size={34} />
        </div>

        <h1>{uiCopy.OrderFlow__25}</h1>
        <h2>#{order.id}</h2>
        <div className="confirmation-summary">
          <h3>{kitchen.name}</h3>
          <p>
            {order.mode === "collection" ? "Collection" : "Delivery"} ·{" "}
            {order.time === "ASAP" ? `${kitchen.mins[0]}–${kitchen.mins[1]} min` : order.time}{" "}
            {uiCopy.OrderFlow__26}
          </p>
          {order.items.map((row) => (
            <div key={row.key}>
              <span>
                {row.quantity} × {row.dish.name}
              </span>
              <b>{money(row.unitPrice * row.quantity)}</b>
            </div>
          ))}
          <div>
            <strong>{uiCopy.OrderFlow__27}</strong>
            <strong>{money(order.total)}</strong>
          </div>
        </div>
        <Link className="primary-button" href={`/order/${order.id}/`}>
          {uiCopy.OrderFlow__28}
        </Link>
        {kitchen.camera && (
          <Link className="secondary-button" href={`/live/#${kitchen.id}`}>
            <Camera size={17} />
            {uiCopy.OrderFlow__29}
          </Link>
        )}
        <section className="email-preview">
          <h3>
            <Mail size={18} />
            {uiCopy.OrderFlow__30}
          </h3>
          <small>
            {uiCopy.OrderFlow__31}
            {order.customerEmail}
          </small>
          <p>Hi {order.customerName},</p>
          <p>
            {uiCopy.OrderFlow__32}
            {order.id} {uiCopy.OrderFlow__33}
            {kitchen.name}.
          </p>
          <ul>
            {order.items.map((row) => (
              <li key={row.key}>
                {row.quantity} × {row.dish.name} — {money(row.quantity * row.unitPrice)}
              </li>
            ))}
          </ul>
          <p>
            {uiCopy.OrderFlow__34}
            {order.time === "ASAP" ? `${kitchen.mins[0]}–${kitchen.mins[1]} minutes` : order.time}
          </p>
          {kitchen.camera && <Link href={`/live/#${kitchen.id}`}>{uiCopy.OrderFlow__35}</Link>}
          <p>
            {uiCopy.OrderFlow__36}
            <a href="mailto:support@seetheprep.com">{uiCopy.OrderFlow__37}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
