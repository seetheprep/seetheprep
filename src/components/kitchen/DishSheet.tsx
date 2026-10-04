"use client";
import { menuOptions } from "@/data/menus";
import { uiCopy } from "@/data/site";

import { Quantity, Sheet } from "@/components/ui/shared";
import { allergenLabels, allergens } from "@/data/menus";
import { flyToCart, useApp } from "@/lib/cart-context";
import { money } from "@/lib/content";
import type { CartItem, Dish, Kitchen } from "@/lib/types";
import Image from "next/image";
import { useRef, useState } from "react";

export function DishSheet({
  dish,
  kitchen,
  onClose,
}: {
  dish: Dish;
  kitchen: Kitchen;
  onClose: () => void;
}) {
  const app = useApp();
  const image = useRef<HTMLImageElement>(null);
  const [qty, setQty] = useState(1),
    [size, setSize] = useState(0),
    [extra, setExtra] = useState(false),
    [notes, setNotes] = useState(""),
    [replace, setReplace] = useState(false);
  const unitPrice =
    Math.round(
      (dish.price + (size ? menuOptions.large : 0) + (extra ? menuOptions.extra : 0)) * 100,
    ) / 100;
  const add = (confirmed = false) => {
    const options = [size ? "Large" : "Regular", ...(extra ? ["Extra portion"] : [])];
    const item: CartItem = {
      key: `${dish.id}:${size}:${extra}:${notes.trim()}`,
      dish,
      quantity: qty,
      unitPrice,
      notes: notes.trim(),
      options,
    };
    if (!app.add(kitchen.id, item, confirmed)) {
      setReplace(true);
      return;
    }
    flyToCart(dish.image, image.current?.getBoundingClientRect());
    onClose();
  };
  return (
    <Sheet title={dish.name} onClose={onClose} className="dish-sheet">
      <div className="dish-sheet-image">
        {dish.image && (
          <Image
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
            ref={image}
            src={dish.image}
            alt=""
            width={360}
            height={260}
          />
        )}
      </div>

      <h2>{dish.name}</h2>
      <p className="body-copy">{dish.description}</p>
      <b className="dish-price">{money(dish.price)}</b>
      <div className="allergen-summary">
        {uiCopy.DishSheet__1}
        {dish.allergens.length
          ? dish.allergens.map((a) => (a === "eggs" ? "egg" : a)).join(", ")
          : "none specified"}
      </div>
      <details className="allergen-details">
        <summary>{uiCopy.DishSheet__2}</summary>
        <p>{uiCopy.DishSheet__3}</p>
        <div>
          {allergens.map((a) => (
            <span key={a} className={dish.allergens.includes(a) ? "contains" : ""}>
              <b>{allergenLabels[a] || a}</b>
              {dish.allergens.includes(a) ? "Contains" : "Not specified"}
            </span>
          ))}
        </div>
      </details>
      <h3>{uiCopy.DishSheet__4}</h3>
      <div className="sheet-options">
        <label>
          <span>{uiCopy.DishSheet__5}</span>
          <input type="radio" name="size" checked={!size} onChange={() => setSize(0)} />
        </label>
        <label>
          <span>
            {uiCopy.DishSheet__6}
            <small>+{money(menuOptions.large)}</small>
          </span>
          <input type="radio" name="size" checked={!!size} onChange={() => setSize(1)} />
        </label>
      </div>
      <h3>{uiCopy.DishSheet__7}</h3>
      <label className="option-row">
        <span>
          {uiCopy.DishSheet__8}
          <small>+{money(menuOptions.extra)}</small>
        </span>
        <input type="checkbox" checked={extra} onChange={(e) => setExtra(e.target.checked)} />
      </label>
      <label className="app-field">
        <span>{uiCopy.DishSheet__9}</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={400}
          rows={2}
          placeholder="Any requests?"
        />
      </label>
      {replace && (
        <div className="replace-basket" role="alert">
          <b>{uiCopy.DishSheet__10}</b>
          <p>{uiCopy.DishSheet__11}</p>
          <button className="secondary-button" onClick={() => setReplace(false)}>
            {uiCopy.DishSheet__12}
          </button>
          <button className="primary-button" onClick={() => add(true)}>
            {uiCopy.DishSheet__13}
          </button>
        </div>
      )}
      <div className="dish-sheet-bottom">
        <Quantity value={qty} min={1} max={12} onChange={(delta) => setQty((n) => n + delta)} />
        <button className="primary-button" onClick={() => add()}>
          {uiCopy.DishSheet__14}
          {money(unitPrice * qty)}
        </button>
      </div>
    </Sheet>
  );
}
