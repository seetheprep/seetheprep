"use client";
import { uiCopy } from "@/data/site";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { Favourite } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import { liveImage, liveVideo } from "@/lib/content";
import type { Kitchen } from "@/lib/types";
import { ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function KitchenHeader({ kitchen: k }: { kitchen: Kitchen }) {
  const app = useApp();
  return (
    <>
      <div className="kitchen-photo-hero">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          className="kitchen-hero-img"
          data-kitchen={k.id}
          src={k.img}
          width={900}
          height={506}
          alt=""
          priority
        />
        <div className="kitchen-top-controls">
          <button className="round-button" aria-label="Back" onClick={app.back}>
            <ChevronLeft size={22} />
          </button>
          <Favourite id={k.id} name={k.name} />
        </div>
      </div>
      <div className="kitchen-info-card">
        <h1>{k.name}</h1>
        <p>
          {k.cuisine} {uiCopy.KitchenHeader__1}
        </p>
        <div className="kitchen-pills">
          <span>
            {k.rating} <Star size={12} aria-hidden="true" /> (400+)
          </span>
          <span className="hygiene">{uiCopy.KitchenHeader__2}</span>
          <span>{k.fee === "Free" ? "Free delivery" : `${k.fee} delivery`}</span>
          <span>
            {k.mins[0]}–{k.mins[1]} {uiCopy.KitchenHeader__3}
          </span>
          <span>{uiCopy.KitchenHeader__4}</span>
        </div>
        {k.camera && (
          <Link className="kitchen-live-strip" href={`/live/#${k.id}`}>
            <span className="mini-video">
              {k.liveIndex !== undefined && k.liveIndex >= 0 ? (
                <LiveVideo
                  src={liveVideo(k.liveIndex)}
                  poster={liveImage(k.liveIndex)}
                  label={`${k.name} live kitchen`}
                />
              ) : (
                <Image
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                  src={k.img}
                  alt=""
                  width={64}
                  height={48}
                />
              )}
            </span>
            <span>
              <b>
                <i className="live-dot" />
                {uiCopy.KitchenHeader__5}
              </b>
              <small>{uiCopy.KitchenHeader__6}</small>
            </span>
            <strong>{uiCopy.KitchenHeader__7}</strong>
          </Link>
        )}
      </div>
    </>
  );
}
