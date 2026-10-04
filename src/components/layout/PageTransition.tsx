"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
/** Image morphs are coordinated by cart-context; this announces completed routes. */
export function PageTransition() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.route = pathname;
  }, [pathname]);
  return null;
}
