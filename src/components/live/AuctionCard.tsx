"use client";
import { uiCopy } from "@/data/site";

import { siteData } from "@/data/site";
import { useApp } from "@/lib/cart-context";
import { money } from "@/lib/content";
import { formatClock, timeLeft, useVisibleClock } from "@/lib/hooks/useVisibleClock";
import Image from "next/image";
import { useEffect, useState } from "react";

export function AuctionCard({ index }: { index: number }) {
  const auction = siteData.auctions[index],
    { epoch } = useApp(),
    { ref, now } = useVisibleClock<HTMLElement>();
  const initial = Number((auction.bid || auction.start).replace("£", ""));
  const [bid, setBid] = useState(initial),
    [placed, setPlaced] = useState(false);
  const deadline = epoch + auction.endsMin * 60000;
  const remaining = now && epoch ? timeLeft(deadline, now) : auction.endsMin * 60,
    sold = remaining === 0;
  useEffect(() => {
    try {
      const value = Number(localStorage.getItem(`stp-auction-${index}`));
      if (value > initial) {
        setBid(value);
        setPlaced(true);
      }
    } catch {}
  }, [index, initial]);
  const place = () => {
    if (!epoch || Date.now() >= deadline) return;
    const next = Math.round((bid + 0.5) * 100) / 100;
    setBid(next);
    setPlaced(true);
    try {
      localStorage.setItem(`stp-auction-${index}`, String(next));
    } catch {}
  };
  return (
    <article className={`auction-card${sold ? " sold" : ""}`} ref={ref}>
      <Image
        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
        className="auction-photo"
        src={`/assets/dishes/${auction.img}.webp`}
        alt=""
        width={84}
        height={96}
        loading="lazy"
      />
      <div className="auction-content">
        <div className="auction-top">
          <span>{sold ? "SOLD" : "LIVE NOW"}</span>
          <time className="rolling-number" key={remaining}>
            {formatClock(remaining)}
          </time>
        </div>
        <h3>{auction.dish}</h3>
        <p>
          {auction.kitchen} {uiCopy.AuctionCard__1}
        </p>
        <div className="auction-bottom">
          <b className="rolling-number" key={bid}>
            {money(bid)}
          </b>
          <button className="orange-button" disabled={sold} onClick={place}>
            {sold ? "Sold" : "Bid +£0.50"}
          </button>
        </div>
        {placed && <small>{uiCopy.AuctionCard__2}</small>}
      </div>
      {sold && <span className="sold-stamp">{uiCopy.AuctionCard__3}</span>}
    </article>
  );
}
