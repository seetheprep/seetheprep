"use client";
import { uiCopy } from "@/data/site";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { LiveBadge } from "@/components/ui/shared";
import { cookingLines } from "@/data/site";
import { liveImage, liveVideo } from "@/lib/content";
import { useVisibleClock } from "@/lib/hooks/useVisibleClock";
import type { Kitchen } from "@/lib/types";
import Link from "next/link";

export function LiveNowCard({
  kitchen,
  index,
  onOpen,
  compact = false,
}: {
  kitchen: Kitchen;
  index: number;
  onOpen: () => void;
  compact?: boolean;
}) {
  const { ref, now } = useVisibleClock<HTMLElement>();
  const viewers = 128 + index * 13 + (Math.floor(now / 5000) % 9 || 0);
  return (
    <article
      className={`live-now-card${compact ? " small-live-card" : ""}`}
      ref={ref}
      id={kitchen.id}
    >
      <div className="live-now-video">
        <LiveVideo
          src={liveVideo(index)}
          poster={liveImage(index)}
          label={`${kitchen.name} live kitchen`}
          controls
        />
        <button
          className="viewer-open"
          aria-label={`Open ${kitchen.name} full-screen live viewer`}
          onClick={onOpen}
        />
        <LiveBadge />
        <span className="viewer-count">
          {viewers} {uiCopy.LiveNowRows__1}
        </span>
        <div className="live-now-title">
          <h3>{kitchen.name}</h3>
          <p>
            {kitchen.cuisine} {uiCopy.LiveNowRows__2}
          </p>
          <span className="whats-cooking">{cookingLines[index]}</span>
        </div>
      </div>
      <Link className="white-button" href={`/kitchen/${kitchen.id}/`}>
        {uiCopy.LiveNowRows__3}
      </Link>
    </article>
  );
}
