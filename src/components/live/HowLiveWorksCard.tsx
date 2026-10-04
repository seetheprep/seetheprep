"use client";
import { uiCopy } from "@/data/site";

export function HowLiveWorksCard({ setExplain }: { setExplain: (open: boolean) => void }) {
  return (
    <section className="new-to-live">
      <p>{uiCopy.HowLiveWorksCard__1}</p>
      <h2>{uiCopy.HowLiveWorksCard__2}</h2>
      <button className="white-button" onClick={() => setExplain(true)}>
        {uiCopy.HowLiveWorksCard__3}
      </button>
    </section>
  );
}
