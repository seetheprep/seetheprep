"use client";
import { uiCopy } from "@/data/site";

import { Quantity } from "@/components/ui/shared";
import { money } from "@/lib/content";
import type { CartItem as Item } from "@/lib/types";
import Image from "next/image";
export function CartItem({
  item: row,
  onChange,
}: {
  item: Item;
  onChange: (delta: number) => void;
}) {
  return (
    <article className="basket-item">
      <div>
        <b>{row.dish.name}</b>
        <small>{row.options.join(" · ")}</small>
        {row.notes && (
          <small>
            {uiCopy.CartItem__1}
            {row.notes}
          </small>
        )}
        <strong>{money(row.unitPrice * row.quantity)}</strong>
      </div>
      {row.dish.image && <Image src={row.dish.image} width={72} height={72} sizes="72px" alt="" />}
      <Quantity value={row.quantity} onChange={onChange} />
    </article>
  );
}
