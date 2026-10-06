"use client";
import { uiCopy } from "@/data/site";

import { siteData } from "@/data/site";
import { useInView } from "@/lib/hooks/useInView";
import { ArrowUpRight, Bike, BriefcaseBusiness, CookingPot, Gavel, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PartnerSheet } from "./PartnerSheet";

const icons = [CookingPot, Gavel, BriefcaseBusiness, Heart, Bike];
export function JoinCards() {
  const { ref, visible } = useInView<HTMLElement>(0.18, true);
  const [partnerOpen, setPartnerOpen] = useState(false);
  return (
    <section className="join" id="join" aria-label="Be part of it" ref={ref}>
      <div className={`rise rv${visible ? " in" : ""}`}>
        <p className="eb">{uiCopy.JoinCards__1}</p>
        <h2 className="h2">
          <span className="line">
            <span>{uiCopy.JoinCards__2}</span>
          </span>
          <span className="line">
            <span>{uiCopy.JoinCards__3}</span>
          </span>
        </h2>
      </div>
      <div className="grid5">
        {siteData.join.map((item, i) => {
          const Icon = icons[i];
          const content = (
            <>
              <span className="ic">
                <Icon size={20} color="var(--orange)" />
              </span>
              <span>
                <b>{item.t}</b>
                <small>{item.s}</small>
              </span>
              <span className="ar">
                <ArrowUpRight size={13} color="var(--white)" />
              </span>
            </>
          );
          const className = `jc rv${visible ? " in" : ""}`;
          const style = { "--i": i } as React.CSSProperties;
          return item.href === "#" ? (
            <div
              key={item.t}
              className={className}
              style={style}
              onClick={item.t === "Partner with us" ? () => setPartnerOpen(true) : undefined}
            >
              {content}
            </div>
          ) : (
            <Link key={item.t} className={className} style={style} href="/kitchens/all/">
              {content}
            </Link>
          );
        })}
      </div>
      {partnerOpen && <PartnerSheet onClose={() => setPartnerOpen(false)} />}
    </section>
  );
}
export { Footer } from "@/components/layout/Footer";
