"use client";
import { uiCopy } from "@/data/site";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { LiveBadge, Sheet } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import { liveImage, liveRows, liveVideo } from "@/lib/content";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function StoryViewer({
  index,
  onClose,
  onViewed,
}: {
  index: number;
  onClose: () => void;
  onViewed?: (id: string) => void;
}) {
  const [active, setActive] = useState(index),
    [progress, setProgress] = useState(0),
    [paused, setPaused] = useState(false);
  const touch = useRef(0),
    app = useApp();
  const k = liveRows[active];
  const viewedCallback = useRef(onViewed);
  viewedCallback.current = onViewed;
  useEffect(() => {
    setProgress(0);
    viewedCallback.current?.(liveRows[active].id);
  }, [active]);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) setProgress((p) => Math.min(1, p + 0.025));
    }, 200);
    return () => clearInterval(timer);
  }, [active, paused]);
  const activeRef = useRef(active);
  activeRef.current = active;
  useEffect(() => {
    if (progress >= 1) {
      if (activeRef.current < liveRows.length - 1) setActive((n) => n + 1);
      else setPaused(true);
    }
  }, [progress]);
  return (
    <Sheet title="Kitchen stories" className="story-viewer-sheet" onClose={onClose}>
      <div
        className="story-viewer"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (e.changedTouches[0].clientY - touch.current > 90) onClose();
        }}
      >
        <LiveVideo
          key={active}
          src={liveVideo(active)}
          poster={liveImage(active)}
          label={`${k.name} live story`}
          active={!paused}
        />
        <div className="story-progress" aria-label={`Story ${active + 1}`}>
          {liveRows.map((row, i) => (
            <span key={row.id}>
              <i style={{ transform: `scaleX(${i < active ? 1 : i === active ? progress : 0})` }} />
            </span>
          ))}
        </div>
        <div className="story-top">
          <LiveBadge />
          <button
            className="round-button"
            aria-label={paused ? "Play story" : "Pause story"}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
        <button
          className="story-tap story-prev"
          aria-label="Previous kitchen story"
          disabled={!active}
          onClick={() => {
            setActive((n) => Math.max(0, n - 1));
            setPaused(false);
          }}
        >
          <ChevronLeft />
        </button>
        <button
          className="story-tap story-next"
          aria-label="Next kitchen story"
          disabled={active === liveRows.length - 1}
          onClick={() => {
            setActive((n) => Math.min(liveRows.length - 1, n + 1));
            setPaused(false);
          }}
        >
          <ChevronRight />
        </button>
        <div className="story-caption">
          <h2>{k.name}</h2>
          <p>
            {k.cuisine} {uiCopy.StoryViewer__1}
          </p>
          <button
            className="white-button"
            onClick={() => {
              onClose();
              app.navigate(`/kitchen/${k.id}/`);
            }}
          >
            {uiCopy.StoryViewer__2}
          </button>
        </div>
      </div>
    </Sheet>
  );
}
