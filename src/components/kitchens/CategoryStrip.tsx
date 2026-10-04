"use client";
import { categories, categoryImage } from "@/lib/content";
import Image from "next/image";
import { useRouter } from "next/navigation";
export function CategoryStrip({
  valid,
  categoryStrip,
}: {
  valid: string;
  categoryStrip: React.RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  return (
    <div className="category-strip" ref={categoryStrip}>
      {[["all", "All"], ...categories].map(([id, name]) => (
        <button
          key={id}
          className={valid === id ? "on" : ""}
          aria-pressed={valid === id}
          onClick={() => router.replace(`/kitchens/${id}/`, { scroll: false })}
        >
          <Image
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
            src={id === "all" ? "/assets/brand/fork.png" : categoryImage(id)}
            width={54}
            height={46}
            alt=""
          />
          {name}
        </button>
      ))}
    </div>
  );
}
