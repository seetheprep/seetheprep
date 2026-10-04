import { KitchensPage } from "@/components/kitchens/KitchensPage";
import { categories } from "@/lib/content";
import { Suspense } from "react";

export function generateStaticParams() {
  return [{ category: "all" }, ...categories.map(([category]) => ({ category }))];
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <Suspense
      fallback={
        <main className="app-page route-skeleton" aria-busy="true">
          <h1>{categories.find(([id]) => id === category)?.[1] || "All kitchens"}</h1>
          <div className="skeleton-group">
            {[0, 1, 2].map((i) => (
              <div className="skeleton-card" key={i}>
                <div />
                <span />
                <span />
              </div>
            ))}
          </div>
        </main>
      }
    >
      <KitchensPage category={category} />
    </Suspense>
  );
}
