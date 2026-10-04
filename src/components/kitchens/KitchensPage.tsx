"use client";
import { uiCopy } from "@/data/site";

import { CategoryStrip } from "@/components/kitchens/CategoryStrip";
import { FilterChips } from "@/components/kitchens/FilterChips";
import { KitchenRail } from "@/components/kitchens/KitchenRow";
import { SearchBar } from "@/components/kitchens/SearchBar";
import { KitchenList } from "./KitchenList";

import { CouponRail } from "@/components/kitchens/CouponRow";
import { CatalogCard } from "@/components/kitchens/KitchenCard";
import { StoryCircles } from "@/components/kitchens/StoryCircles";
import { PageHeader, PullRefresh, Sheet, SkeletonCards } from "@/components/ui/shared";
import { menuFor } from "@/data/menus";
import { useApp } from "@/lib/cart-context";
import { allOrderKitchens, categories, kitchenRows, money } from "@/lib/content";
import type { Kitchen } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { filterOptions as FILTERS, sortOptions as SORTS } from "@/data/kitchens";
export { KitchenRail } from "@/components/kitchens/KitchenRow";
export function KitchensPage({ category }: { category: string }) {
  const params = useSearchParams();
  const app = useApp();
  const [query, setQuery] = useState(params.get("q") || "");
  const [filters, setFilters] = useState<string[]>(
    params.has("camera") ? ["camera"] : params.has("offers") ? ["offers"] : [],
  );
  const [sort, setSort] = useState(0),
    [sheet, setSheet] = useState<"filters" | "sort" | null>(null),
    [limit, setLimit] = useState(8),
    [loading, setLoading] = useState(false),
    [fading, setFading] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const categoryStrip = useRef<HTMLDivElement>(null);
  const valid = categories.some(([id]) => id === category) ? category : "all";
  const favourites = params.has("favourites");
  useEffect(() => {
    if (params.has("camera")) setFilters((f) => (f.includes("camera") ? f : [...f, "camera"]));
  }, [params]);
  useEffect(() => {
    const selected = categoryStrip.current?.querySelector<HTMLElement>(".on");
    if (selected && categoryStrip.current)
      categoryStrip.current.scrollLeft =
        selected.offsetLeft - categoryStrip.current.clientWidth / 2 + selected.clientWidth / 2;
    setLimit(8);
  }, [valid, filters, sort, query]);
  const filterKitchen = (k: Kitchen) =>
    (!query || `${k.name} ${k.cuisine}`.toLowerCase().includes(query.toLowerCase())) &&
    (!favourites || app.favourites.includes(k.id)) &&
    (!filters.includes("offers") || !!k.offer) &&
    (!filters.includes("rating") || k.rating >= 4.5) &&
    (!filters.includes("fast") || k.mins[1] < 30) &&
    (!filters.includes("free") || k.fee === "Free") &&
    (!filters.includes("camera") || k.camera);
  const sorted = (rows: Kitchen[]) =>
    [...rows].sort(
      sort === 0
        ? (a, b) => b.rating - a.rating
        : sort === 1
          ? (a, b) => a.mins[0] - b.mins[0]
          : (a, b) =>
              (a.fee === "Free" ? 0 : parseFloat(a.fee.slice(1))) -
              (b.fee === "Free" ? 0 : parseFloat(b.fee.slice(1))),
    );
  const results = sorted(
    (filters.includes("camera") ? allOrderKitchens : kitchenRows).filter(filterKitchen),
  );
  const matches = results.filter((k) => valid === "all" || k.cats.includes(valid));
  const rest = valid === "all" ? results : results.filter((k) => !k.cats.includes(valid));
  const dishes = useMemo(
    () =>
      query.trim()
        ? allOrderKitchens
            .flatMap((k) =>
              menuFor(k)
                .filter((d) =>
                  `${d.name} ${d.description}`.toLowerCase().includes(query.toLowerCase()),
                )
                .map((d) => ({ kitchen: k, dish: d })),
            )
            .slice(0, 18)
        : [],
    [query],
  );
  useEffect(() => {
    const target = end.current;
    if (!target || limit >= rest.length) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setLoading(true);
          timer = setTimeout(() => {
            setLimit((n) => n + 6);
            setLoading(false);
          }, 500);
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [limit, rest.length]);
  const toggle = (id: string) => {
    setFading(true);
    setTimeout(
      () => {
        setFilters((list) => (list.includes(id) ? list.filter((f) => f !== id) : [...list, id]));
        setFading(false);
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180,
    );
  };
  const title = favourites
    ? "Favourites"
    : valid === "all"
      ? "All kitchens"
      : categories.find(([id]) => id === valid)?.[1] || "All kitchens";
  const broad = valid === "all" && !query && !favourites && !filters.length;
  return (
    <main className="catalog-page app-page" id="main-content">
      <PullRefresh onRefresh={() => setLimit(8)}>
        <div className="catalog-sticky">
          <PageHeader title={title} location />
          <SearchBar query={query} setQuery={setQuery} />
          <FilterChips filters={filters} toggle={toggle} sort={sort} setSheet={setSheet} />
        </div>
        <CategoryStrip valid={valid} categoryStrip={categoryStrip} />
        {query ? (
          <div className="search-results">
            <section className="catalog-section">
              <div className="section-title">
                <h2>{uiCopy.KitchensPage__1}</h2>
              </div>
              <div className="catalog-list">
                {matches.map((k) => (
                  <CatalogCard key={k.id} kitchen={k} variant="list" />
                ))}
                {!matches.length && <p className="calm-empty">{uiCopy.KitchensPage__2}</p>}
              </div>
            </section>
            <section className="catalog-section">
              <div className="section-title">
                <h2>{uiCopy.KitchensPage__3}</h2>
              </div>
              {dishes.map(({ kitchen, dish }) => (
                <Link
                  className="dish-search-result"
                  key={`${kitchen.id}-${dish.id}`}
                  href={`/kitchen/${kitchen.id}/?dish=${dish.id}`}
                >
                  <div>
                    <b>{dish.name}</b>
                    <small>
                      {kitchen.name} {uiCopy.KitchensPage__4}
                    </small>
                  </div>
                  <b>{money(dish.price)}</b>
                </Link>
              ))}
              {!dishes.length && <p className="calm-empty">{uiCopy.KitchensPage__5}</p>}
            </section>
          </div>
        ) : (
          <>
            <div className={fading ? "catalog-content filtering" : "catalog-content"}>
              {broad ? (
                <>
                  <KitchenRail
                    title="Popular near you"
                    kitchens={[
                      ...kitchenRows.filter((k) =>
                        ["five-guys", "chipotle", "sobe-burger"].includes(k.id),
                      ),
                      ...sorted(kitchenRows).filter(
                        (k) => !["five-guys", "chipotle", "sobe-burger"].includes(k.id),
                      ),
                    ].slice(0, 12)}
                    link={["#more-kitchens", "See all"]}
                  />
                  <KitchenRail
                    title="National favourites"
                    kitchens={kitchenRows.filter((k) => k.national)}
                    variant="hero"
                  />
                  <StoryCircles />
                  <CouponRail />
                  <KitchenRail
                    title="Quick bites under 20 min"
                    kitchens={kitchenRows.filter((k) => k.mins[0] < 20).slice(0, 12)}
                    variant="compact"
                  />
                  <KitchenRail
                    title="Sweet tooth & drinks"
                    kitchens={kitchenRows.filter((k) =>
                      k.cats.some((c) =>
                        ["desserts", "ice-cream", "coffee", "bubble-tea"].includes(c),
                      ),
                    )}
                    variant="compact"
                  />
                </>
              ) : (
                <section className="catalog-section">
                  <div className="section-title">
                    <h2>{valid === "all" ? "Kitchens" : title}</h2>
                    <small>{SORTS[sort]}</small>
                  </div>
                  <div className="catalog-list">
                    {matches.map((k) => (
                      <CatalogCard key={k.id} kitchen={k} variant="list" />
                    ))}
                    {!matches.length && <p className="calm-empty">{uiCopy.KitchensPage__6}</p>}
                  </div>
                </section>
              )}
              {(broad || valid !== "all") && (
                <section className="catalog-section" id="more-kitchens">
                  <div className="section-title">
                    <h2>{uiCopy.KitchensPage__7}</h2>
                    <small>{SORTS[sort]}</small>
                  </div>
                  <KitchenList kitchens={rest.slice(0, limit)} />
                  <div ref={end}>
                    {limit < rest.length ? (
                      <SkeletonCards count={loading ? 2 : 1} />
                    ) : (
                      <p className="catalog-end">{uiCopy.KitchensPage__8}</p>
                    )}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </PullRefresh>
      {sheet && (
        <Sheet
          title={sheet === "filters" ? "Filters" : "Sort kitchens"}
          onClose={() => setSheet(null)}
        >
          <h2>{sheet === "filters" ? "Filters" : "Sort kitchens"}</h2>
          {sheet === "filters" ? (
            <>
              <div className="sheet-options">
                {FILTERS.map(([id, label]) => (
                  <label key={id}>
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={filters.includes(id)}
                      onChange={() => toggle(id)}
                    />
                  </label>
                ))}
              </div>
              <button className="secondary-button" onClick={() => setFilters([])}>
                {uiCopy.KitchensPage__9}
              </button>
            </>
          ) : (
            <div className="sheet-options">
              {SORTS.map((label, i) => (
                <label key={label}>
                  <span>{label}</span>
                  <input
                    type="radio"
                    name="sort"
                    checked={sort === i}
                    onChange={() => setSort(i)}
                  />
                </label>
              ))}
            </div>
          )}
          <button className="primary-button" onClick={() => setSheet(null)}>
            {uiCopy.KitchensPage__10}
          </button>
        </Sheet>
      )}
    </main>
  );
}
