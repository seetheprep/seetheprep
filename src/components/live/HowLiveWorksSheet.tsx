"use client";
import { uiCopy } from "@/data/site";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { LiveBadge, shareLive } from "@/components/ui/shared";
import { liveImage, liveVideo } from "@/lib/content";
import { useVisibleClock } from "@/lib/hooks/useVisibleClock";
import { ArrowRight, Check, Share2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function ExplainCards({ onFind }: { onFind: () => void }) {
  const scroll = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0),
    [share, setShare] = useState("Share live link");
  const { ref, now, visible } = useVisibleClock<HTMLElement>();
  const watchers = 128 + (Math.floor(now / 6000) % 7 || 0);
  const onScroll = () => {
    const el = scroll.current;
    if (!el) return;
    setActive(Math.min(2, Math.round(el.scrollLeft / 312)));
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      el.querySelectorAll<HTMLElement>(".explain-visual-media").forEach(
        (media, i) =>
          (media.style.transform = `translateX(${Math.max(-10, Math.min(10, (el.scrollLeft - i * 312) * 0.035))}px) scale(1.06)`),
      );
  };
  return (
    <section className={`live-explain${visible ? " is-visible" : ""}`} ref={ref}>
      <div className="live-intro">
        <h1>
          {uiCopy.HowLiveWorksSheet__1}
          <em>{uiCopy.HowLiveWorksSheet__2}</em>
        </h1>
      </div>
      <div className="explain-carousel" ref={scroll} onScroll={onScroll}>
        <article className="explain-card">
          <div className="explain-visual">
            <div className="explain-visual-media">
              <LiveVideo
                src={liveVideo(0)}
                poster={liveImage(0)}
                label="See a kitchen cooking your order"
              />
            </div>
            <LiveBadge />
            <div className="order-toast">
              <Check size={23} />
              <div>
                <b>{uiCopy.HowLiveWorksSheet__3}</b>
                <small>{uiCopy.HowLiveWorksSheet__4}</small>
              </div>
            </div>
            <span className="watching">
              {watchers} {uiCopy.HowLiveWorksSheet__5}
            </span>
          </div>
          <p className="eyebrow">{uiCopy.HowLiveWorksSheet__6}</p>
          <h2>{uiCopy.HowLiveWorksSheet__7}</h2>
          <p>{uiCopy.HowLiveWorksSheet__8}</p>
        </article>
        <article className="explain-card">
          <div className="explain-visual share-visual">
            <Image
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
              className="explain-visual-media"
              src={liveImage(1)}
              alt=""
              width={300}
              height={330}
              loading="lazy"
            />
            <div className="live-share-card">
              <b>{uiCopy.HowLiveWorksSheet__9}</b>
              <div className="friend-initials">
                <span>AJ</span>
                <span>MK</span>
                <span>SR</span>
              </div>
              <button onClick={async () => setShare(await shareLive("/live/#ember-table"))}>
                {share}
                <Share2 size={15} />
              </button>
              <small>{uiCopy.HowLiveWorksSheet__10}</small>
            </div>
          </div>
          <p className="eyebrow">{uiCopy.HowLiveWorksSheet__11}</p>
          <h2>{uiCopy.HowLiveWorksSheet__12}</h2>
          <p>{uiCopy.HowLiveWorksSheet__13}</p>
        </article>
        <article className="explain-card">
          <div className="explain-visual plated-visual">
            <Image
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
              className="explain-visual-media"
              src="/assets/how/how-03-plated.jpg"
              alt="A freshly plated dish"
              width={300}
              height={330}
              loading="lazy"
            />
            <div className={`plated-tick${active === 2 ? " active" : ""}`}>
              <i>
                <Check size={34} />
              </i>
              <b>
                {uiCopy.HowLiveWorksSheet__14}
                <br />
                {uiCopy.HowLiveWorksSheet__15}
              </b>
            </div>
          </div>
          <p className="eyebrow">{uiCopy.HowLiveWorksSheet__16}</p>
          <h2>{uiCopy.HowLiveWorksSheet__17}</h2>
          <p>{uiCopy.HowLiveWorksSheet__18}</p>
          <button className="white-button" onClick={onFind}>
            {uiCopy.HowLiveWorksSheet__19}
          </button>
        </article>
      </div>
      <div className="explain-pagination">
        <div aria-label="Explanation slides">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={active === i ? "active" : ""}
              aria-label={`Go to ${["See it", "Share it", "Plated"][i]} slide`}
              aria-pressed={active === i}
              onClick={() =>
                scroll.current?.scrollTo({
                  left: i * 312,
                  behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
                })
              }
            />
          ))}
        </div>
        <span>
          {uiCopy.HowLiveWorksSheet__20}
          <ArrowRight size={16} />
        </span>
      </div>
    </section>
  );
}
