"use client";
import { uiCopy } from "@/data/site";

import { StoryViewer } from "@/components/kitchens/StoryViewer";
import Image from "next/image";

import { liveImage, liveRows } from "@/lib/content";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StoryCircles() {
  const [open, setOpen] = useState<number | null>(null),
    [viewed, setViewed] = useState<string[]>([]);
  useEffect(() => {
    try {
      setViewed(JSON.parse(localStorage.getItem("stp-viewed-stories") || "[]"));
    } catch {}
  }, []);
  const mark = (id: string) =>
    setViewed((old) => {
      const next = old.includes(id) ? old : [...old, id];
      try {
        localStorage.setItem("stp-viewed-stories", JSON.stringify(next));
      } catch {}
      return next;
    });
  return (
    <section className="catalog-section story-section">
      <div className="section-title">
        <h2>
          <i className="live-dot" />
          {uiCopy.StoryCircles__1}
        </h2>
        <Link href="/live/">{uiCopy.StoryCircles__2}</Link>
      </div>
      <div className="story-rail">
        {liveRows.map((k, i) => (
          <button
            className={`story-circle${viewed.includes(k.id) ? " viewed" : ""}`}
            key={k.id}
            aria-label={`Watch ${k.name} live story`}
            onClick={() => setOpen(i)}
          >
            <span className="story-ring">
              <span>
                <Image
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                  src={liveImage(i)}
                  width={70}
                  height={70}
                  alt=""
                  loading="lazy"
                />
              </span>
              <b>{uiCopy.StoryCircles__3}</b>
            </span>
            <span>{k.name}</span>
          </button>
        ))}
      </div>
      {open !== null && <StoryViewer index={open} onClose={() => setOpen(null)} onViewed={mark} />}
    </section>
  );
}
export { StoryViewer } from "@/components/kitchens/StoryViewer";
