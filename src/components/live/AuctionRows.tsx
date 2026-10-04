"use client";
import { siteData } from "@/data/site";
import { useApp } from "@/lib/cart-context";
import { timeLeft, useVisibleClock } from "@/lib/hooks/useVisibleClock";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function StartingAuctions() {
  const { epoch } = useApp(),
    { ref, now, visible } = useVisibleClock<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const release = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soon = siteData.auctions.filter((a) => a.status === "soon");
  useEffect(
    () => () => {
      if (release.current) clearTimeout(release.current);
    },
    [],
  );
  return (
    <div
      className="starting-auctions"
      ref={ref}
      onPointerDown={() => {
        if (release.current) clearTimeout(release.current);
        setPaused(true);
      }}
      onPointerUp={() => {
        release.current = setTimeout(() => setPaused(false), 2500);
      }}
      onPointerCancel={() => {
        release.current = setTimeout(() => setPaused(false), 2500);
      }}
      onPointerLeave={() => {
        if (paused) release.current = setTimeout(() => setPaused(false), 2500);
      }}
    >
      <div
        className="auction-drift"
        style={{ animationPlayState: visible && !paused ? "running" : "paused" }}
      >
        {[0, 1].map((copy) => (
          <div className="auction-drift-group" key={copy} aria-hidden={copy === 1}>
            {soon.map((auction) => {
              const seconds =
                epoch && now
                  ? timeLeft(epoch + auction.endsMin * 60000, now)
                  : auction.endsMin * 60;
              return (
                <article className="starting-card" key={auction.dish}>
                  <Image
                    sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                    src={`/assets/dishes/${auction.img}.webp`}
                    width={150}
                    height={95}
                    alt=""
                    loading="lazy"
                  />
                  <h3>{auction.dish}</h3>
                  <p>{seconds > 0 ? `Starts in ${Math.ceil(seconds / 60)}m` : "Starting now"}</p>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
