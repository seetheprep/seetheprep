"use client";
import { uiCopy } from "@/data/site";

import Image from "next/image";

import { useInView } from "@/lib/hooks/useInView";
import { ChevronDown, MapPin, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export function Hero() {
  const router = useRouter();
  const plate = useRef<HTMLDivElement>(null);
  const { ref: heroRef, visible } = useInView<HTMLElement>(0.3);
  const [mode, setMode] = useState<"delivery" | "collection">("delivery");
  const [locationOpen, setLocationOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [locationLabel, setLocationLabel] = useState("Your location");
  const [query, setQuery] = useState("");
  const [animation, setAnimation] = useState("");
  const lastInput = useRef(0);
  const play = (name: string) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimation("");
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimation(name)));
  };
  useEffect(() => {
    if (!visible) return;
    const scroll = () => {
      if (!plate.current) return;
      const amount = Math.min(Math.max(window.scrollY, 0), heroRef.current?.offsetHeight || 1);
      const ratio = amount / (heroRef.current?.offsetHeight || 1);
      plate.current.style.setProperty("--sy", `${(amount * 0.5).toFixed(1)}px`);
      plate.current.style.setProperty("--rot", `${(ratio * 10).toFixed(2)}deg`);
    };
    const input = () => {
      lastInput.current = performance.now();
    };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("pointerdown", input, { passive: true });
    addEventListener("keydown", input);
    scroll();
    const interval = setInterval(() => {
      if (!document.hidden && performance.now() - lastInput.current > 3000) play("idle");
    }, 7000);
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("pointerdown", input);
      removeEventListener("keydown", input);
      clearInterval(interval);
    };
  }, [visible, heroRef]);
  const search = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/kitchens/all/${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      play("jelly");
    }
  };
  return (
    <section className="hero" id="main-content" tabIndex={-1} aria-label="Order food" ref={heroRef}>
      <div className="food">
        <div className="scroll" ref={plate}>
          <div className="float">
            <div
              className={`wob${animation ? ` ${animation}` : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Make the sushi wobble"
              onClick={() => play("jelly")}
              onKeyDown={key}
              onAnimationEnd={() => setAnimation("")}
            >
              <Image
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
                src="/assets/hero/hero-sushi.webp"
                alt=""
                priority
                width={900}
                height={1058}
              />
              <svg className="steam" viewBox="0 0 120 160" aria-hidden="true">
                <path d="M40 150c-18-28 18-40 0-70s14-44 4-70" />
                <path d="M78 150c-16-26 16-38 0-66s12-40 2-66" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="copy">
        <h1>
          <span className="line l1 h1">
            <span>{uiCopy.Hero__1}</span>
          </span>
          <span className="line l2 hsub">
            <span>{uiCopy.Hero__2}</span>
          </span>
          <span className="line l3 hsub">
            <span className="livew">
              <i className="dot" />
              <span className="u">{uiCopy.Hero__3}</span>
            </span>
          </span>
          <span className="line l4 hsub">
            <span>{uiCopy.Hero__4}</span>
          </span>
        </h1>
      </div>
      <form className="card" role="search" onSubmit={search}>
        <div className="search">
          <SearchIcon size={20} />
          <div className={`search-entry${query ? " filled" : ""}`}>
            <input
              type="search"
              aria-label="Search food or kitchens"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="ph" aria-hidden="true">
              <span>{uiCopy.Hero__5}</span>
              <span>{uiCopy.Hero__6}</span>
              <span>{uiCopy.Hero__7}</span>
            </span>
          </div>
          <button className="go" type="submit" aria-label="Search">
            <Image
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
              className="fork"
              src="/assets/brand/fork.png"
              alt=""
              width={256}
              height={254}
            />
          </button>
        </div>
        <div className="row">
          <div className="seg" data-mode={mode}>
            <span className="thumb" />
            {(["delivery", "collection"] as const).map((value) => (
              <button
                key={value}
                type="button"
                data-v={value}
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
              >
                {value === "delivery" ? "Delivery" : "Collection"}
              </button>
            ))}
          </div>
          <button
            className="loc"
            type="button"
            aria-expanded={locationOpen}
            onClick={() => setLocationOpen(!locationOpen)}
          >
            <MapPin size={16} color="var(--orange)" /> {locationLabel} <ChevronDown size={12} />
          </button>
        </div>
        {locationOpen && (
          <div className="location-field">
            <label htmlFor="postcode">{uiCopy.Hero__8}</label>
            <input
              id="postcode"
              autoComplete="postal-code"
              aria-label="Your postcode"
              maxLength={12}
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
            />
            <button
              type="button"
              className="location-save"
              aria-label="Use this location"
              onClick={() => {
                if (postcode.trim()) {
                  setLocationLabel(postcode.trim().toUpperCase());
                  setLocationOpen(false);
                }
              }}
            >
              ✓
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
