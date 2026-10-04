"use client";
import { uiCopy } from "@/data/site";

import { LiveBadge } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import { formatClock, timeLeft, useVisibleClock } from "@/lib/hooks/useVisibleClock";
import type { Kitchen } from "@/lib/types";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SoonCard({
  kitchen,
  index,
  tonight = false,
}: {
  kitchen: Kitchen;
  index: number;
  tonight?: boolean;
}) {
  const { epoch } = useApp();
  const { ref, now } = useVisibleClock<HTMLElement>();
  const seconds =
    now && epoch ? timeLeft(epoch + (5 + index * 3) * 60000, now) : (5 + index * 3) * 60;
  const isLive = seconds === 0;
  return (
    <article
      id={`soon-${kitchen.id}`}
      ref={ref}
      className={`soon-card${tonight ? " tonight-card" : ""}${isLive ? " became-live" : ""}`}
    >
      <Link className="soon-image" href={`/kitchen/${kitchen.id}/`}>
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          src={kitchen.img}
          width={540}
          height={320}
          alt=""
          loading="lazy"
        />
        {isLive ? (
          <LiveBadge />
        ) : (
          <span className="soon-chip">
            {tonight ? (
              `FROM ${[6, 7, 9][index % 3]}PM`
            ) : (
              <>
                <i className="live-dot" />
                {uiCopy.GoingLiveSoon__1}
                <span className="rolling-number">{formatClock(seconds)}</span>
              </>
            )}
          </span>
        )}
      </Link>
      <div className="soon-meta">
        <div>
          <h3>{kitchen.name}</h3>
          <p>
            {kitchen.cuisine} {uiCopy.GoingLiveSoon__2}
          </p>
        </div>
        <Link className="orange-button" href={`/kitchen/${kitchen.id}/`}>
          {uiCopy.GoingLiveSoon__3}
        </Link>
      </div>
      {!tonight && (
        <span className="on-camera-note">
          <Camera size={12} />
          {uiCopy.GoingLiveSoon__4}
        </span>
      )}
    </article>
  );
}
