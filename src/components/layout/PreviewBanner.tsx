"use client";
import { site } from "@/data/site";
import { X } from "lucide-react";
export function PreviewBanner({ setBanner }: { setBanner: (show: boolean) => void }) {
  return (
    <div className="preview-banner">
      <span>{site.banner}</span>
      <button
        aria-label="Dismiss preview banner"
        onClick={() => {
          setBanner(false);
          try {
            sessionStorage.setItem("stp-banner-closed", "1");
          } catch {}
        }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
