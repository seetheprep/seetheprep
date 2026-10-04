"use client";
import { uiCopy } from "@/data/site";

import { X } from "lucide-react";
export function FirstVisitStrip({
  setExplain,
  setHelper,
}: {
  setExplain: (open: boolean) => void;
  setHelper: (open: boolean) => void;
}) {
  return (
    <div className="live-helper">
      <button onClick={() => setExplain(true)}>
        {uiCopy.FirstVisitStrip__1}
        <span>{uiCopy.FirstVisitStrip__2}</span>
      </button>
      <button
        aria-label="Close Live introduction"
        onClick={() => {
          setHelper(false);
          try {
            localStorage.setItem("stp-live-intro-closed", "1");
          } catch {}
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
