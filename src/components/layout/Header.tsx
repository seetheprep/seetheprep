"use client";
import { uiCopy } from "@/data/site";

import Image from "next/image";
import { PreviewBanner } from "./PreviewBanner";
import { TabBar } from "./TabBar";

import { useApp } from "@/lib/cart-context";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function BackButton() {
  const app = useApp();
  return (
    <button className="back" type="button" aria-label="Back" onClick={app.back}>
      <ChevronLeft size={20} />
    </button>
  );
}

export function SiteChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBooking = pathname.startsWith("/book/") || pathname.startsWith("/checkout");
  const [banner, setBanner] = useState(true);
  useEffect(() => {
    try {
      setBanner(sessionStorage.getItem("stp-banner-closed") !== "1");
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--preview-height", banner ? "32px" : "0px");
  }, [banner]);
  useEffect(() => {
    setHidden(false);
    setY(scrollY);
  }, [pathname]);
  const [y, setY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let previous = scrollY;
    const onScroll = () => {
      const current = scrollY;
      setY(current);
      if (current > previous + 4 && current > 300) setHidden(true);
      if (current < previous - 4) setHidden(false);
      previous = current;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!isHome || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fire = () => {
      setBlink(false);
      requestAnimationFrame(() => setBlink(true));
      setTimeout(() => setBlink(false), 1200);
    };
    const first = setTimeout(fire, 1600);
    const interval = setInterval(() => {
      if (!document.hidden && scrollY < innerHeight) fire();
    }, 10000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [isHome]);
  return (
    <>
      {banner && <PreviewBanner setBanner={setBanner} />}
      <a className="skip" href="#main-content">
        {uiCopy.Header__1}
      </a>
      {isHome && (
        <header className={`nav${y > 40 ? " scrolled" : ""}`} id="nav">
          <Link className="brand" href="/#top" aria-label="SeeThePrep home">
            <Image
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
              src="/assets/brand/logo-dark.png"
              alt="See the PREP."
              width={640}
              height={315}
            />
            <i className={`rec${blink ? " on" : ""}`} />
          </Link>
          <Link className="order" href="/kitchens/all/">
            {uiCopy.Header__2}
            <span className="fk">
              <Image
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                className="fork"
                src="/assets/brand/fork.png"
                alt=""
                width={256}
                height={254}
              />
              <i className={`rec${blink ? " on" : ""}`} />
            </span>
          </Link>
        </header>
      )}
      <header className="desktop-header">
        <Link className="desktop-brand" href="/" aria-label="SeeThePrep home">
          <Image
            src="/assets/brand/logo-dark.png"
            alt="See the PREP."
            width={150}
            height={74}
            sizes="150px"
          />
        </Link>
        <TabBar hidden={false} isHome={isHome} y={y} desktop />
      </header>
      {!isBooking && <TabBar hidden={hidden} isHome={isHome} y={y} />}
    </>
  );
}
