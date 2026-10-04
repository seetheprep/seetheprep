"use client";
import { uiCopy } from "@/data/site";

import { AuctionCard } from "@/components/live/AuctionCard";
import { StartingAuctions } from "@/components/live/AuctionRows";
import { FirstVisitStrip } from "@/components/live/FirstVisitStrip";
import { SoonCard } from "@/components/live/GoingLiveSoon";
import { HowLiveWorksCard } from "@/components/live/HowLiveWorksCard";
import { ExplainCards } from "@/components/live/HowLiveWorksSheet";
import { LiveNowCard } from "@/components/live/LiveNowRows";
import { LiveViewer } from "@/components/live/LiveViewer";

import { PullRefresh, Sheet } from "@/components/ui/shared";
import { siteData } from "@/data/site";
import { liveKitchens, liveRows } from "@/lib/content";
import { useVisibleClock } from "@/lib/hooks/useVisibleClock";
import { useEffect, useState } from "react";

export { AuctionCard } from "@/components/live/AuctionCard";
export { StartingAuctions } from "@/components/live/AuctionRows";
export { SoonCard } from "@/components/live/GoingLiveSoon";
export { ExplainCards } from "@/components/live/HowLiveWorksSheet";
export { LiveNowCard } from "@/components/live/LiveNowRows";
export { LiveViewer } from "@/components/live/LiveViewer";
export function LivePage() {
  const [viewer, setViewer] = useState<number | null>(null),
    [explain, setExplain] = useState(false),
    [helper, setHelper] = useState(false),
    [refresh, setRefresh] = useState(0);
  const { ref, now } = useVisibleClock<HTMLElement>();
  useEffect(() => {
    try {
      setHelper(localStorage.getItem("stp-live-intro-closed") !== "1");
    } catch {
      setHelper(true);
    }
    if (location.hash)
      setTimeout(
        () => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "center" }),
        200,
      );
  }, []);
  const findLive = () => {
    setExplain(false);
    requestAnimationFrame(() =>
      document.getElementById("going-live")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      }),
    );
  };
  const soonIndices = [7, 8, 0, 1, 3, 5, 6],
    tonight = liveKitchens.filter((_, i) => !soonIndices.includes(i));
  return (
    <main className="app-page live-page final-live" id="main-content">
      <PullRefresh onRefresh={() => setRefresh((n) => n + 1)}>
        <header className="app-header live-header" ref={ref}>
          <h1>
            <i className="live-dot" />
            {uiCopy.LivePage__1}
          </h1>
          <span className="total-watchers">
            {896 + (Math.floor(now / 5000) % 11 || 0)} {uiCopy.LivePage__2}
          </span>
        </header>
        {helper && <FirstVisitStrip setExplain={setExplain} setHelper={setHelper} />}
        <section className="live-section" id="live-now">
          <div className="section-title">
            <h2>
              <i className="live-dot" />
              {uiCopy.LivePage__3}
            </h2>
            <a href="#more-live">{uiCopy.LivePage__4}</a>
          </div>
          <div className="live-rail">
            {[0, 3, 4, 1, 2, 5].map((i) => (
              <LiveNowCard
                key={`${i}-${refresh}`}
                kitchen={liveRows[i]}
                index={i}
                onOpen={() => setViewer(i)}
              />
            ))}
          </div>
          <h3 className="tonight-heading" id="more-live">
            {uiCopy.LivePage__5}
          </h3>
          <div className="live-rail more-live-rail">
            {liveRows.slice(6).map((k, i) => (
              <LiveNowCard
                key={k.id}
                kitchen={k}
                index={i + 6}
                onOpen={() => setViewer(i + 6)}
                compact
              />
            ))}
          </div>
        </section>
        <section className="live-section" id="going-live">
          <div className="section-title">
            <h2>{uiCopy.LivePage__6}</h2>
          </div>
          <p className="live-section-lead">{uiCopy.LivePage__7}</p>
          <div className="live-rail">
            {soonIndices.map((n, i) => (
              <SoonCard key={liveKitchens[n].id} kitchen={liveKitchens[n]} index={i} />
            ))}
          </div>
          <h3 className="tonight-heading">{uiCopy.LivePage__8}</h3>
          <div className="live-rail">
            {tonight.map((k, i) => (
              <SoonCard key={k.id} kitchen={k} index={i + 7} tonight />
            ))}
          </div>
        </section>
        <section className="live-section" id="auctions">
          <div className="section-title">
            <h2>{uiCopy.LivePage__9}</h2>
          </div>
          <p className="auction-row-label">{uiCopy.LivePage__10}</p>
          <StartingAuctions />
          <p className="auction-row-label ending-label">{uiCopy.LivePage__11}</p>
          <div className="live-rail ending-auctions">
            {siteData.auctions.map((a, i) =>
              a.status === "live" ? <AuctionCard key={i} index={i} /> : null,
            )}
          </div>
        </section>
        <HowLiveWorksCard setExplain={setExplain} />
      </PullRefresh>
      {viewer !== null && <LiveViewer index={viewer} onClose={() => setViewer(null)} />}
      {explain && (
        <Sheet
          title="How Live works"
          className="live-explain-sheet"
          onClose={() => setExplain(false)}
        >
          <ExplainCards onFind={findLive} />
        </Sheet>
      )}
    </main>
  );
}
