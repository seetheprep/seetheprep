"use client";
import { uiCopy } from "@/data/site";

import Image from "next/image";

import { useApp } from "@/lib/cart-context";
import { Camera, ChevronLeft, Heart, Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

export function PreviewTag() {
  return null;
}
export { LiveBadge } from "@/components/ui/LiveBadge";
export { Sheet } from "@/components/ui/Sheet";
export { SkeletonCards } from "@/components/ui/Skeleton";
export function Favourite({ id, name }: { id: string; name: string }) {
  const app = useApp();
  return (
    <button
      className={`fav${app.favourites.includes(id) ? " on" : ""}`}
      aria-label={`Save ${name}`}
      aria-pressed={app.favourites.includes(id)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        app.favourite(id);
      }}
    >
      <Heart size={18} />
    </button>
  );
}
export function PageHeader({
  title,
  live = false,
  location = false,
}: {
  title: string;
  live?: boolean;
  location?: boolean;
}) {
  const app = useApp();
  return (
    <header className={`app-header${live ? " dark-header" : ""}`}>
      <button className="round-button" aria-label="Back" onClick={app.back}>
        <ChevronLeft size={21} />
      </button>
      <h1>
        {live && <i className="live-dot" />}
        {title}
      </h1>
      {location && <span className="location-chip">{uiCopy.shared__1}</span>}
    </header>
  );
}
export function Quantity({
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (delta: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        disabled={value <= min}
        aria-label="Decrease quantity"
        onClick={() => onChange(-1)}
      >
        <Minus size={16} />
      </button>
      <output aria-live="polite" key={value}>
        {value}
      </output>
      <button
        type="button"
        disabled={value >= max}
        aria-label="Increase quantity"
        onClick={() => onChange(1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
export function CameraTag() {
  return (
    <span className="camera-tag">
      <Camera size={12} />
      {uiCopy.shared__2}
    </span>
  );
}
export function PullRefresh({
  children,
  onRefresh,
}: {
  children: React.ReactNode;
  onRefresh?: () => void;
}) {
  const [refresh, setRefresh] = useState(false);
  const start = useRef<number | null>(null);
  return (
    <div
      onTouchStart={(e) => {
        if (window.scrollY < 5) start.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (start.current !== null && e.changedTouches[0].clientY - start.current > 85) {
          setRefresh(true);
          onRefresh?.();
          setTimeout(() => setRefresh(false), 750);
        }
        start.current = null;
      }}
    >
      {refresh && (
        <div className="refresh-mark" role="status" aria-label="Refreshing">
          <Image
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
            src="/assets/brand/fork.png"
            alt=""
            width={32}
            height={32}
          />
        </div>
      )}
      {children}
    </div>
  );
}
export async function shareLive(href: string, title = "Watch this kitchen on SeeThePrep") {
  const url = new URL(href, location.origin).href;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return "Shared";
    } catch {
      return "Share cancelled";
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "Link copied";
  } catch {
    return url;
  }
}
