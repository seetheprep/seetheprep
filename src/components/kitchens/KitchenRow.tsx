import { CatalogCard } from "@/components/kitchens/KitchenCard";
import type { Kitchen } from "@/lib/types";
import Link from "next/link";
export function KitchenRail({
  title,
  kitchens,
  variant = "medium",
  link,
}: {
  title: string;
  kitchens: Kitchen[];
  variant?: "medium" | "hero" | "compact";
  link?: [string, string];
}) {
  if (!kitchens.length) return null;
  return (
    <section className="catalog-section">
      <div className="section-title">
        <h2>{title}</h2>
        {link && <Link href={link[0]}>{link[1]}</Link>}
      </div>
      <div className={`catalog-rail rail-${variant}`}>
        {kitchens.map((k) => (
          <CatalogCard key={k.id} kitchen={k} variant={variant} />
        ))}
      </div>
    </section>
  );
}
