"use client";
import { Search } from "lucide-react";
export function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <label className="catalog-search">
      <Search size={18} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder="Search food, kitchens, drinks & more"
        aria-label="Search food, kitchens, drinks and more"
      />
    </label>
  );
}
