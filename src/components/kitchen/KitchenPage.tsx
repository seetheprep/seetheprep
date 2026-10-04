"use client";
import { DishSheet } from "@/components/kitchen/DishSheet";
import { BasketBar } from "./BasketBar";
import { KitchenHeader } from "./KitchenHeader";
import { MenuItem } from "./MenuItem";
import { MenuTabs } from "./MenuTabs";

import { menuFor } from "@/data/menus";
import { useApp } from "@/lib/cart-context";
import type { Dish, Kitchen } from "@/lib/types";
import { useEffect, useState } from "react";

export { DishSheet } from "@/components/kitchen/DishSheet";
export function KitchenPage({ kitchen: k }: { kitchen: Kitchen }) {
  const app = useApp();
  const dishes = menuFor(k);
  const [section, setSection] = useState("Popular");
  const [dish, setDish] = useState<Dish | null>(null);
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("dish");
    if (id) setDish(menuFor(k).find((d) => d.id === id) || null);
  }, [k]);
  const selected = section === "Popular" ? dishes : dishes.filter((d) => d.section === section);
  const count = app.basket.kitchenId === k.id ? app.count : 0;
  const subtotal = app.basket.items.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0);
  return (
    <main className="kitchen-page app-page" id="main-content">
      <KitchenHeader kitchen={k} />
      <MenuTabs
        sections={["Popular", ...Array.from(new Set(dishes.map((d) => d.section)))]}
        selected={section}
        onSelect={setSection}
      />
      <section className="menu-content" id="menu-items">
        <div className="section-title">
          <h2>{section}</h2>
        </div>

        {selected.map((d) => {
          const number =
            app.basket.kitchenId === k.id
              ? app.basket.items
                  .filter((row) => row.dish.id === d.id)
                  .reduce((sum, row) => sum + row.quantity, 0)
              : 0;
          return <MenuItem key={d.id} dish={d} count={number} onSelect={() => setDish(d)} />;
        })}
      </section>
      <BasketBar count={count} subtotal={subtotal} />
      {dish && <DishSheet dish={dish} kitchen={k} onClose={() => setDish(null)} />}
    </main>
  );
}
