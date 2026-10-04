"use client";
import { uiCopy } from "@/data/site";

import { useDrift } from "@/lib/hooks/useDrift";
import Image from "next/image";

import { DineKitchen, dineRows } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function DineCard({ item, duplicate = false }: { item: DineKitchen; duplicate?: boolean }) {
  return (
    <Link
      className="dc"
      href={`/book/${item.id}/`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      <Image
        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
        src={item.img}
        alt=""
        loading="lazy"
        decoding="async"
        width={1200}
        height={801}
        draggable={false}
      />
      <span className="bk">
        {uiCopy.DineIn__1}
        <i>
          <ArrowUpRight size={12} color="var(--white)" strokeWidth={3} />
        </i>
      </span>
      <span className="dn">
        <b>{item.name}</b>
        <small>
          {item.cuisine} · {item.town}
        </small>
      </span>
    </Link>
  );
}

function DineRow({ items, direction }: { items: DineKitchen[]; direction: 1 | -1 }) {
  const { ref: view, visible } = useInView<HTMLDivElement>(0.1);
  const { row, track, pause, resume } = useDrift(visible, direction);
  return (
    <div className={`drow ${direction === -1 ? "a" : "b"}`} ref={view}>
      <div
        ref={row}
        className="drow-scroll"
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onWheel={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div className="dtrack" ref={track}>
          {items.map((item, i) => (
            <DineCard key={i} item={item} />
          ))}
          {items.map((item, i) => (
            <DineCard key={`duplicate-${i}`} item={item} duplicate />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DineIn() {
  const { ref, visible } = useInView<HTMLElement>(0.18, true);
  return (
    <section className={`dine${visible ? " in" : ""}`} id="dine" aria-label="Dine in" ref={ref}>
      <p className="door">
        <i className="dot" />
        {uiCopy.DineIn__2}
      </p>
      <h2 className="h2">{uiCopy.DineIn__3}</h2>
      <DineRow items={dineRows} direction={-1} />
      <DineRow items={dineRows.map((_, i) => dineRows[(i + 3) % dineRows.length])} direction={1} />
      <p className="dnote">{uiCopy.DineIn__4}</p>
    </section>
  );
}
