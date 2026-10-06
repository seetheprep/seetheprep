"use client";

import type { Basket, CartItem, PreviewOrder } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

interface State {
  basket: Basket;
  count: number;
  cartPulse: number;
  ready: boolean;
  favourites: string[];
  epoch: number;
  order: PreviewOrder | null;
  setOrder: (order: PreviewOrder) => void;
  add: (kitchenId: string, item: CartItem, replace?: boolean) => boolean;
  quantity: (key: string, delta: number) => void;
  clear: () => void;
  favourite: (id: string) => void;
  navigate: (href: string, image?: HTMLImageElement | null) => void;
  back: () => void;
  coupons: string[];
  clip: (id: string) => void;
}
const Context = createContext<State | null>(null);
const EMPTY: Basket = { kitchenId: "", items: [] };
export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [basket, setBasket] = useState<Basket>(EMPTY);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [order, updateOrder] = useState<PreviewOrder | null>(null);
  const [cartPulse, setCartPulse] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [coupons, setCoupons] = useState<string[]>([]);
  useEffect(() => {
    try {
      setCoupons(JSON.parse(localStorage.getItem("stp-clipped-coupons") || "[]"));
    } catch {}
  }, []);
  const pending = useRef<(() => void) | null>(null);
  const morphId = useRef("");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("stp-basket-v2") || "null");
      if (saved?.items?.length) setBasket(saved);
      setFavourites(JSON.parse(localStorage.getItem("stp-favourites") || "[]"));
      updateOrder(JSON.parse(sessionStorage.getItem("stp-preview-order") || "null"));
      const start = Number(sessionStorage.getItem("stp-final-epoch")) || Date.now();
      setEpoch(start);
      sessionStorage.setItem("stp-final-epoch", String(start));
    } catch {
      setEpoch(Date.now());
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("stp-basket-v2", JSON.stringify(basket));
        localStorage.setItem("stp-favourites", JSON.stringify(favourites));
      } catch {}
  }, [basket, favourites, ready]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((e) => e.target.classList.toggle("offscreen", !e.isIntersecting)),
    );
    document.querySelectorAll("main section").forEach((section) => observer.observe(section));
    const visibility = () =>
      document.documentElement.classList.toggle("document-hidden", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [pathname]);
  useLayoutEffect(() => {
    if (pending.current) {
      if (!pathname.startsWith("/kitchen/")) {
        const images = [
          ...document.querySelectorAll<HTMLImageElement>(`img[data-kitchen="${morphId.current}"]`),
        ];
        const image =
          images.find((i) => {
            const r = i.getBoundingClientRect();
            return r.top >= 0 && r.top < innerHeight;
          }) || images[0];
        if (image) image.style.viewTransitionName = "kitchen-photo";
      }
      pending.current();
      pending.current = null;
    }
  }, [pathname]);
  const transition = (go: () => void, image?: HTMLImageElement | null) => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => Promise<void>) => { finished: Promise<void> };
    };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      go();
      return;
    }
    if (image) {
      image.style.viewTransitionName = "kitchen-photo";
      morphId.current = image.dataset.kitchen || "";
    }
    const vt = doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          pending.current = resolve;
          go();
          setTimeout(() => {
            if (pending.current === resolve) {
              resolve();
              pending.current = null;
            }
          }, 1200);
        }),
    );
    vt.finished.finally(() =>
      document
        .querySelectorAll<HTMLImageElement>('img[style*="view-transition-name"]')
        .forEach((el) => el.style.removeProperty("view-transition-name")),
    );
  };
  const add = (kitchenId: string, item: CartItem, replace = false) => {
    if (basket.items.length && basket.kitchenId !== kitchenId && !replace) return false;
    setBasket((previous) => {
      const items = replace || previous.kitchenId !== kitchenId ? [] : previous.items;
      const found = items.find((row) => row.key === item.key);
      return {
        kitchenId,
        items: found
          ? items.map((row) =>
              row.key === item.key
                ? { ...row, quantity: Math.min(99, row.quantity + item.quantity) }
                : row,
            )
          : [...items, item],
      };
    });
    setCartPulse((n) => n + 1);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) navigator.vibrate?.(12);
    return true;
  };
  const setOrder = (value: PreviewOrder) => {
    updateOrder(value);
    try {
      sessionStorage.setItem("stp-preview-order", JSON.stringify(value));
    } catch {}
  };
  return (
    <Context.Provider
      value={{
        basket,
        ready,
        epoch,
        order,
        setOrder,
        coupons,
        clip: (id) =>
          setCoupons((previous) => {
            const next = previous.includes(id) ? previous : [...previous, id];
            try {
              localStorage.setItem("stp-clipped-coupons", JSON.stringify(next));
            } catch {}
            return next;
          }),
        count: basket.items.reduce((sum, item) => sum + item.quantity, 0),
        cartPulse,
        favourites,
        add,
        quantity: (key, delta) =>
          setBasket((b) => ({
            ...b,
            items: b.items
              .map((row) =>
                row.key === key
                  ? { ...row, quantity: Math.max(0, Math.min(99, row.quantity + delta)) }
                  : row,
              )
              .filter((row) => row.quantity > 0),
          })),
        clear: () => setBasket(EMPTY),
        favourite: (id) =>
          setFavourites((list) =>
            list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
          ),
        navigate: (href, image) => transition(() => router.push(href), image),
        back: () =>
          transition(() => (history.length > 1 ? router.back() : router.push("/kitchens/all/"))),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("AppProvider is required");
  return value;
}
export function flyToCart(src: string | undefined, rect: DOMRect | undefined) {
  if (!src || !rect || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cart = document
    .getElementById(innerWidth >= 1024 ? "desktop-cart-tab" : "cart-tab")
    ?.getBoundingClientRect();
  if (!cart) return;
  const image = document.createElement("img");
  image.src = src;
  image.alt = "";
  image.className = "basket-flight";
  image.style.left = `${rect.left}px`;
  image.style.top = `${rect.top}px`;
  document.body.appendChild(image);
  const dx = cart.left + cart.width / 2 - rect.left - 24,
    dy = cart.top - rect.top;
  image
    .animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx * 0.5}px,${Math.min(dy * 0.2, -90)}px) scale(.8)`,
          opacity: 1,
          offset: 0.45,
        },
        { transform: `translate(${dx}px,${dy}px) scale(.15)`, opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
    )
    .finished.finally(() => image.remove());
}
