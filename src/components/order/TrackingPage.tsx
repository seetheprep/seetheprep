"use client";
import { uiCopy } from "@/data/site";

import { ChesterMap } from "@/components/order/RiderMap";
import { FunFactPanel } from "./FunFactPanel";
import { LivePanel } from "./LivePanel";
import { ProgressLine } from "./ProgressLine";
import { WaitingPanel } from "./WaitingPanel";

import { PageHeader, Sheet, shareLive } from "@/components/ui/shared";
import { trackingFacts } from "@/data/site";
import { useApp } from "@/lib/cart-context";
import { findKitchen, money } from "@/lib/content";
import { useVisibleClock } from "@/lib/hooks/useVisibleClock";
import { ChevronLeft, ReceiptText, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cameraStatus, noCameraStatus } from "@/data/funFacts";
export { ChesterMap } from "@/components/order/RiderMap";
export function TrackingPage({ id }: { id: string }) {
  const app = useApp(),
    order = app.order,
    kitchen = order && findKitchen(order.kitchenId);
  const [start, setStart] = useState(0),
    [details, setDetails] = useState(false),
    [share, setShare] = useState("Share live");
  const { ref, now } = useVisibleClock<HTMLElement>();
  useEffect(() => {
    setStart(Date.now());
  }, []);
  const elapsed = start && now ? Math.max(0, Math.floor((now - start) / 1000)) : 0;
  const stage = Math.min(3, Math.floor(elapsed / 8)),
    hasCamera = !!kitchen?.camera;
  const state = stage === 3 ? "rider" : hasCamera ? (stage === 0 ? "waiting" : "live") : "fact";
  const video = kitchen?.liveIndex !== undefined && kitchen.liveIndex >= 0 ? kitchen.liveIndex : 0;
  const status = (hasCamera ? cameraStatus : noCameraStatus)[stage],
    fact = trackingFacts[Math.min(stage, 2)];
  if (app.ready && (!order || !kitchen || order.id !== id))
    return (
      <main className="app-page">
        <PageHeader title="Your order" />
        <div className="flow-empty">
          <p>{uiCopy.TrackingPage__1}</p>
          <Link className="primary-button" href="/kitchens/all/">
            {uiCopy.TrackingPage__2}
          </Link>
        </div>
      </main>
    );
  return (
    <main className="app-page tracking-page final-tracking" id="main-content" ref={ref}>
      <header className="tracking-header">
        <button className="round-button" aria-label="Back" onClick={app.back}>
          <ChevronLeft size={22} />
        </button>
        <h1>{uiCopy.TrackingPage__3}</h1>
      </header>
      <div className={`tracking-visual tracking-${state}`} key={state}>
        {state === "waiting" && (
          <WaitingPanel image={kitchen?.img || "/assets/kitchens/kitchen-01.jpg"} />
        )}
        {state === "live" && (
          <LivePanel video={video} name={kitchen?.name || ""} elapsed={elapsed} />
        )}
        {state === "fact" && <FunFactPanel key={stage} fact={fact} />}
        {state === "rider" && <ChesterMap elapsed={elapsed - 24} />}
      </div>
      <div className="tracking-content">
        <h2>{kitchen?.name}</h2>
        <p className="tracking-order">
          {uiCopy.TrackingPage__4}
          {id} · {money(order?.total || 0)}
        </p>
        <ProgressLine stage={stage} />
        <div className="tracking-status" aria-live="polite">
          <b>{status[0]}</b>
          <p>{status[1]}</p>
        </div>
        {!hasCamera && (
          <div className="live-hint">
            <i className="live-dot" />
            <p>
              {uiCopy.TrackingPage__5}
              <b>{uiCopy.TrackingPage__6}</b> {uiCopy.TrackingPage__7}
              <strong>{uiCopy.TrackingPage__8}</strong> {uiCopy.TrackingPage__9}
            </p>
          </div>
        )}
        <div className="tracking-actions">
          <button onClick={() => setDetails(true)}>
            <ReceiptText size={18} />
            {uiCopy.TrackingPage__10}
          </button>
          {hasCamera ? (
            <button onClick={async () => setShare(await shareLive(`/live/#${kitchen?.id}`))}>
              <Share2 size={18} />
              {share}
            </button>
          ) : (
            <Link href="/live/">{uiCopy.TrackingPage__11}</Link>
          )}
        </div>
      </div>
      {details && order && (
        <Sheet title="Order details" onClose={() => setDetails(false)}>
          <h2>
            {uiCopy.TrackingPage__12}
            {order.id}
          </h2>
          <p>{kitchen?.name}</p>
          <div className="confirmation-summary">
            {order.items.map((row) => (
              <div key={row.key}>
                <span>
                  {row.quantity} × {row.dish.name}
                </span>
                <b>{money(row.unitPrice * row.quantity)}</b>
              </div>
            ))}
            {order.coupons?.map((c) => (
              <div key={c.id}>
                <span>{c.label}</span>
                <b>−{money(c.value)}</b>
              </div>
            ))}
            <div>
              <b>{uiCopy.TrackingPage__13}</b>
              <b>{money(order.total)}</b>
            </div>
          </div>
          <h3>{uiCopy.TrackingPage__14}</h3>
          <p>
            {uiCopy.TrackingPage__15}
            {order.customerEmail}
          </p>
          <p>
            {uiCopy.TrackingPage__16}
            {id} · {kitchen?.name} ·{" "}
            {order.time === "ASAP" ? `${kitchen?.mins[0]}–${kitchen?.mins[1]} min` : order.time}
          </p>
          {hasCamera && <Link href={`/live/#${kitchen?.id}`}>{uiCopy.TrackingPage__17}</Link>}
          <p>
            <a href="mailto:support@seetheprep.com">{uiCopy.TrackingPage__18}</a>
          </p>
        </Sheet>
      )}
    </main>
  );
}
