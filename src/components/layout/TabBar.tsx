"use client";
import { uiCopy } from "@/data/site";

import { useApp } from "@/lib/cart-context";
import { Home, Search, ShoppingBag, UserRound, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function TabBar({
  hidden,
  isHome,
  y,
  desktop = false,
}: {
  hidden: boolean;
  isHome: boolean;
  y: number;
  desktop?: boolean;
}) {
  const pathname = usePathname(),
    app = useApp();
  return (
    <nav
      className={`tabbar${desktop ? " desktop-navigation" : ""}${hidden || (isHome && y < 80) ? " hide" : ""}`}
      id={desktop ? "desktop-nav" : "tabbar"}
      aria-label="App"
    >
      <Link className={isHome ? "on" : ""} href="/#top">
        <Home size={22} />
        {uiCopy.TabBar__1}
      </Link>
      <Link
        className={pathname.startsWith("/kitchens") || pathname.startsWith("/kitchen/") ? "on" : ""}
        href="/kitchens/all/"
      >
        <Search size={22} />
        {uiCopy.TabBar__2}
      </Link>
      <Link className={`live-tab${pathname.startsWith("/live") ? " on" : ""}`} href="/live/">
        <span>
          <Video size={22} />
          <i className="live-dot" />
        </span>
        {uiCopy.TabBar__3}
      </Link>
      <Link
        id={desktop ? "desktop-cart-tab" : "cart-tab"}
        className={pathname === "/cart/" || pathname === "/checkout/" ? "on" : ""}
        href="/cart/"
      >
        <span className="cart-icon">
          <ShoppingBag size={22} />
          {app.count > 0 && (
            <b key={app.cartPulse} className="cart-count">
              {app.count}
            </b>
          )}
        </span>
        {uiCopy.TabBar__4}
      </Link>
      <Link className={pathname.startsWith("/early-access") ? "on" : ""} href="/early-access/">
        <UserRound size={22} />
        {uiCopy.TabBar__5}
      </Link>
    </nav>
  );
}
