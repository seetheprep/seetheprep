"use client";
import { uiCopy } from "@/data/site";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { LiveBadge, Sheet } from "@/components/ui/shared";
import { useApp } from "@/lib/cart-context";
import { liveImage, liveRows, liveVideo } from "@/lib/content";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function LiveViewer({ index, onClose }: { index: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(index);
  const app = useApp();
  useEffect(() => {
    requestAnimationFrame(() => ref.current?.children[index]?.scrollIntoView({ block: "start" }));
  }, [index]);
  const move = (next: number) =>
    ref.current?.children[Math.max(0, Math.min(10, next))]?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  return (
    <Sheet title="Live kitchen viewer" className="live-viewer-sheet" onClose={onClose}>
      <div
        className="vertical-viewer"
        ref={ref}
        onScroll={(e) =>
          setActive(Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight))
        }
      >
        {liveRows.map((k, i) => (
          <article className="vertical-live" key={k.id}>
            <LiveVideo
              src={liveVideo(i)}
              poster={liveImage(i)}
              label={`${k.name} live kitchen`}
              controls
            />
            <LiveBadge />
            <div className="vertical-live-caption">
              <h2>{k.name}</h2>
              <p>
                {k.cuisine} {uiCopy.LiveViewer__1}
              </p>
              <button
                className="white-button"
                onClick={() => {
                  onClose();
                  app.navigate(`/kitchen/${k.id}/`);
                }}
              >
                {uiCopy.LiveViewer__2}
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="viewer-navigation">
        <button
          aria-label="Previous live kitchen"
          disabled={active === 0}
          onClick={() => move(active - 1)}
        >
          <ChevronUp />
        </button>
        <button
          aria-label="Next live kitchen"
          disabled={active === 10}
          onClick={() => move(active + 1)}
        >
          <ChevronDown />
        </button>
      </div>
    </Sheet>
  );
}
