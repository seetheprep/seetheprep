"use client";
import { uiCopy } from "@/data/site";

import { Star } from "lucide-react";
import Image from "next/image";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { siteData } from "@/data/site";
import { useApp } from "@/lib/cart-context";
import { Kitchen, liveImage, liveVideo, slug } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import { Heart, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function KitchenCard({
  kitchen: k,
  index,
  listing = false,
}: {
  kitchen: Kitchen;
  index: number;
  listing?: boolean;
}) {
  const app = useApp();
  const imageRef = useRef<HTMLImageElement>(null);
  const saved = app.favourites.includes(k.id);
  const toggle = () => app.favourite(k.id);
  return (
    <article className={listing ? "kr" : "kc"} style={{ "--i": index } as React.CSSProperties}>
      <Link
        className="card-cover"
        href={`/kitchen/${k.id}/`}
        aria-label={`Order from ${k.name}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey) return;
          e.preventDefault();
          app.navigate(`/kitchen/${k.id}/`, imageRef.current);
        }}
      />
      <div className="kph">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          ref={imageRef}
          data-kitchen={k.id}
          src={k.img}
          alt=""
          width={720}
          height={405}
          loading="lazy"
          decoding="async"
        />
        <button
          className={`fav${saved ? " on" : ""}`}
          type="button"
          aria-pressed={saved}
          aria-label={`Save ${k.name}`}
          onClick={toggle}
        >
          <Heart size={18} />
        </button>
        {k.offer && <span className="badge">{k.offer}</span>}
      </div>
      <div className="meta">
        <b>{k.name}</b>
        <span className="rate">
          {k.rating} <Star size={12} aria-hidden="true" />
          {listing && " (400+)"}
        </span>
      </div>
      <p className="sub">
        {k.cuisine} · {k.fee === "Free" ? "Free delivery" : `${k.fee} delivery`} · {k.mins[0]}–
        {k.mins[1]} {uiCopy.Cards__1}
      </p>
      {listing && (
        <div className="tags">
          <span>
            {uiCopy.Cards__2}
            {k.hygiene}
          </span>
          <span className="g">{uiCopy.Cards__3}</span>
        </div>
      )}
    </article>
  );
}

export function LiveCard({ index }: { index: number }) {
  const item = siteData.live[index];
  const { ref, visible } = useInView<HTMLElement>(0.6);
  const [muted, setMuted] = useState(true);
  return (
    <article
      className={`lc${visible ? " playing" : ""}`}
      ref={ref}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="vid">
        <LiveVideo
          label={`${item.name} cooking`}
          muted={muted}
          poster={liveImage(index)}
          src={liveVideo(index)}
          controls
          controlClassName="pp"
        />
        <Link
          className="card-cover"
          href={`/live/#${slug(item.name)}`}
          aria-label={`Watch ${item.name} live`}
        />
        <Link className="lv" href={`/live/#${slug(item.name)}`}>
          <i className="dot" />
          {uiCopy.Cards__4}
        </Link>
        <button
          className={`mute${muted ? "" : " audible"}`}
          type="button"
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className="lb">
          <Image
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
            className="kl"
            src="/assets/brand/fork.png"
            alt=""
            width={34}
            height={34}
          />
          <b>{item.name}</b>
          <small>{item.sub}</small>
        </div>
      </div>
      <p className="cap">{item.cap}</p>
    </article>
  );
}
