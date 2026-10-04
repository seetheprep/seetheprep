import type { Kitchen } from "@/lib/types";
import { CatalogCard } from "./KitchenCard";
export function KitchenList({ kitchens }: { kitchens: Kitchen[] }) {
  return (
    <div className="catalog-list">
      {kitchens.map((k) => (
        <CatalogCard key={k.id} kitchen={k} variant="list" />
      ))}
    </div>
  );
}
