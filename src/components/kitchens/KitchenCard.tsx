"use client";
import { uiCopy } from "@/data/site";

import { CameraTag, Favourite, LiveBadge } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import type { Kitchen } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function CatalogCard({
  kitchen: k,
  variant = "medium",
}: {
  kitchen: Kitchen;
  variant?: "medium" | "hero" | "compact" | "list";
}) {
  const app = useApp();
  const image = useRef<HTMLImageElement>(null);
  return (
    <article className={`catalog-card card-${variant}`}>
      <Link
        className="card-cover"
        href={`/kitchen/${k.id}/`}
        aria-label={`Order from ${k.name}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey) return;
          e.preventDefault();
          app.navigate(`/kitchen/${k.id}/`, image.current);
        }}
      />
      <div className="catalog-photo">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          data-kitchen={k.id}
          ref={image}
          src={k.img}
          width={720}
          height={405}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <Favourite id={k.id} name={k.name} />
        {k.camera && <LiveBadge href={`/live/#${k.id}`} />}{" "}
        {k.offer && <span className="badge">{k.offer}</span>}
      </div>
      <div className="catalog-info">
        <div className="catalog-name">
          <h3>{k.name}</h3>
          <span>
            {k.rating} <Star size={12} aria-hidden="true" />
          </span>
        </div>
        <p>
          {k.cuisine} {uiCopy.KitchenCard__1}
        </p>
        <div className="catalog-detail">
          <span>{k.fee === "Free" ? "Free delivery" : `${k.fee} delivery`}</span>
          <span>
            {k.mins[0]}–{k.mins[1]} {uiCopy.KitchenCard__2}
          </span>
        </div>
        <div className="catalog-tags">
          <span className="hygiene">{uiCopy.KitchenCard__3}</span>
          <span>{uiCopy.KitchenCard__4}</span>
          {k.camera && <CameraTag />}
        </div>
      </div>
    </article>
  );
}
