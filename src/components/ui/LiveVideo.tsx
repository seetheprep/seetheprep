"use client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Entry = {
  element: HTMLVideoElement;
  ratio: number;
  manualPause: boolean;
  manualPlay: boolean;
};
const videos = new Map<HTMLVideoElement, Entry>();
function reconcile() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modal = document.querySelector("dialog[open]");
  const eligible = [...videos.values()].filter(
    (v) =>
      v.ratio >= 0.6 &&
      !v.manualPause &&
      (!reduce || v.manualPlay) &&
      (!modal || modal.contains(v.element)),
  );
  eligible.sort(
    (a, b) =>
      Math.abs(
        a.element.getBoundingClientRect().top + a.element.clientHeight / 2 - innerHeight / 2,
      ) -
      Math.abs(
        b.element.getBoundingClientRect().top + b.element.clientHeight / 2 - innerHeight / 2,
      ),
  );
  const allowed = innerWidth < 768 ? eligible.slice(0, 1) : eligible;
  videos.forEach((v) => {
    if (!document.hidden && allowed.includes(v)) v.element.play().catch(() => {});
    else v.element.pause();
  });
}
export function LiveVideo({
  src,
  poster,
  label,
  controls = false,
  className = "",
  active = true,
  muted = true,
  controlClassName = "video-control",
}: {
  src: string;
  poster: string;
  label: string;
  controls?: boolean;
  className?: string;
  active?: boolean;
  muted?: boolean;
  controlClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !active) {
      element?.pause();
      return;
    }
    const item: Entry = { element, ratio: 0, manualPause: false, manualPlay: false };
    videos.set(element, item);
    const observer = new IntersectionObserver(
      ([entry]) => {
        item.ratio = entry.intersectionRatio;
        reconcile();
      },
      { threshold: [0, 0.6, 0.8, 1] },
    );
    observer.observe(element);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", reconcile);
    document.addEventListener("visibilitychange", reconcile);
    document.addEventListener("stp:video-refresh", reconcile);
    return () => {
      observer.disconnect();
      videos.delete(element);
      element.pause();
      media.removeEventListener("change", reconcile);
      document.removeEventListener("visibilitychange", reconcile);
      document.removeEventListener("stp:video-refresh", reconcile);
      reconcile();
    };
  }, [active, src]);
  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        aria-label={label}
        width="720"
        height="1280"
        muted={muted}
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {controls && (
        <button
          className={controlClassName}
          aria-label={playing ? "Pause video" : "Play video"}
          aria-pressed={playing}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const v = ref.current;
            const item = v && videos.get(v);
            if (!item) return;
            item.manualPause = playing;
            item.manualPlay = !playing;
            reconcile();
          }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      )}
    </>
  );
}
