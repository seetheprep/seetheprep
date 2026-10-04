"use client";
import { uiCopy } from "@/data/site";

import Image from "next/image";

import { KitchenCard, LiveCard } from "@/components/home/Cards";
import { siteData } from "@/data/site";
import { categories, categoryImage, kitchenRows } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import Link from "next/link";

function Rail({
  children,
  label,
  live = false,
}: {
  children: React.ReactNode;
  label: string;
  live?: boolean;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.18, true);
  return (
    <div
      className={`rail${live ? " live" : ""}${visible ? " in" : ""}`}
      ref={ref}
      aria-label={label}
    >
      {children}
    </div>
  );
}
export function Craving() {
  const { ref: headingRef, visible: heading } = useInView<HTMLDivElement>(0.18, true);
  const { ref: catsRef, visible: catVisible } = useInView<HTMLDivElement>(0.18, true);
  const half = Math.ceil(categories.length / 2);
  const ordered = categories
    .slice(0, half)
    .flatMap((cat, index) => [cat, categories[index + half]].filter(Boolean));
  return (
    <section className="crave" id="crave" aria-label="What are you craving">
      <div className={`shead rise rv${heading ? " in" : ""}`} ref={headingRef}>
        <p className="eb">{uiCopy.Craving__1}</p>
        <div className="ttl">
          <h2 className="h2">
            <span className="line">
              <span>{uiCopy.Craving__2}</span>
            </span>
            <span className="line">
              <span>{uiCopy.Craving__3}</span>
            </span>
          </h2>
          <Link className="seeall" href="/kitchens/all/">
            {uiCopy.Craving__4}
          </Link>
        </div>
      </div>
      <div className={`cats${catVisible ? " in" : ""}`} ref={catsRef} role="list">
        {ordered.map(([id, name], i) => (
          <Link
            key={id}
            className="cat"
            role="listitem"
            href={`/kitchens/${id}/`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="ci">
              <Image
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                src={categoryImage(id)}
                alt=""
                width={84}
                height={76}
                loading="lazy"
              />
            </span>
            <span className="cl">{name}</span>
          </Link>
        ))}
      </div>
      <Rail label="Kitchens">
        {kitchenRows.slice(0, 7).map((k, i) => (
          <KitchenCard key={k.id} kitchen={k} index={i} />
        ))}
      </Rail>
      <Rail label="More kitchens">
        {kitchenRows.slice(7, 13).map((k, i) => (
          <KitchenCard key={k.id} kitchen={k} index={i} />
        ))}
      </Rail>
      <Rail label="Live kitchens" live>
        {siteData.live.slice(0, 6).map((k, i) => (
          <LiveCard key={k.name} index={i} />
        ))}
      </Rail>
    </section>
  );
}
