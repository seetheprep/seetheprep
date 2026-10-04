"use client";
import { uiCopy } from "@/data/site";

import { money } from "@/lib/content";
import type { Dish } from "@/lib/types";
import { Plus } from "lucide-react";
import Image from "next/image";
export function MenuItem({
  dish: d,
  count,
  onSelect,
}: {
  dish: Dish;
  count: number;
  onSelect: () => void;
}) {
  return (
    <article className="menu-row">
      <button className="menu-description" onClick={onSelect}>
        <b>
          {d.name}{" "}
          {d.dietary && (
            <span
              className="dietary"
              title={d.dietary === "VG" ? "Vegan" : d.dietary === "V" ? "Vegetarian" : "Spicy"}
            >
              {d.dietary}
            </span>
          )}
        </b>
        <p>{d.description}</p>
        <small>
          {uiCopy.MenuItem__1}
          {d.allergens.length ? d.allergens.join(", ") : "none specified"}
        </small>
        <strong>{money(d.price)}</strong>
      </button>
      <div className="menu-image">
        {d.image && <Image src={d.image} alt="" width={104} height={104} sizes="104px" />}
        <button className="add-dish" aria-label={`Add ${d.name}`} onClick={onSelect}>
          {count ? <b key={count}>{count}</b> : <Plus size={22} />}
        </button>
      </div>
    </article>
  );
}
