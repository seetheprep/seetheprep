"use client";
import { uiCopy } from "@/data/site";

import { filterOptions } from "@/data/kitchens";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
export function FilterChips({
  filters,
  toggle,
  sort,
  setSheet,
}: {
  filters: string[];
  toggle: (id: string) => void;
  sort: number;
  setSheet: (sheet: "filters" | "sort") => void;
}) {
  const FILTERS = filterOptions;
  return (
    <div className="filter-line">
      <button
        className={`filter-chip${filters.length ? " selected" : ""}`}
        onClick={() => setSheet("filters")}
      >
        <SlidersHorizontal size={14} />
        {uiCopy.FilterChips__1}
      </button>
      {FILTERS.map(([id, label]) => (
        <button
          className={`filter-chip${filters.includes(id) ? " selected" : ""}`}
          key={id}
          aria-pressed={filters.includes(id)}
          onClick={() => toggle(id)}
        >
          {label}
        </button>
      ))}
      <button className={`filter-chip${sort ? " selected" : ""}`} onClick={() => setSheet("sort")}>
        {uiCopy.FilterChips__2}
        <ChevronDown size={12} />
      </button>
    </div>
  );
}
