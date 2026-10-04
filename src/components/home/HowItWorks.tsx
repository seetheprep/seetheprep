"use client";
import { categoryDimensions } from "@/data/categories";
import { uiCopy } from "@/data/site";

import Image from "next/image";

import { LiveVideo } from "@/components/ui/LiveVideo";
import { siteData } from "@/data/site";
import { categoryImage } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import { Check, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const floatSets = [
  ["ramen", "pasta", "burgers"],
  ["fried-chicken", "healthy", "fish-chips"],
];

function FloatFood({
  position,
  index,
  active,
  visible,
}: {
  position: "a" | "b";
  index: number;
  active: number;
  visible: boolean;
}) {
  const [shown, setShown] = useState(active);
  const [swapping, setSwapping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active === shown) return;
    setSwapping(true);
    const timer = setTimeout(() => {
      setShown(active);
      setSwapping(false);
      ref.current?.classList.remove("hop");
      requestAnimationFrame(() => ref.current?.classList.add("hop"));
    }, 300);
    return () => clearTimeout(timer);
  }, [active, shown, position]);
  const id = floatSets[index][shown];
  return (
    <div className={`fl ${position}`} data-k={position === "a" ? ".1" : ".08"}>
      <div ref={ref} className="fm">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          className={`flo${swapping ? " swap" : ""}`}
          src={categoryImage(id)}
          alt=""
          width={categoryDimensions[id][0]}
          height={categoryDimensions[id][1]}
          loading="lazy"
          decoding="async"
          style={{ animationPlayState: visible ? "running" : "paused" }}
        />
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <>
      <div className="bars">
        <i className="d" />
        <i className={step ? "d" : "a"} />
        <i className={step === 2 ? "d" : step === 1 ? "a" : ""} />
      </div>
      <div className="labs">
        <span>{uiCopy.HowItWorks__1}</span>
        <span>{uiCopy.HowItWorks__2}</span>
        <span>{uiCopy.HowItWorks__3}</span>
      </div>
    </>
  );
}
function Screen({ step, active }: { step: number; active: boolean }) {
  return (
    <>
      {step === 0 ? (
        <LiveVideo
          src="/assets/how/how-01-see-it.mp4"
          poster="/assets/how/how-01-see-it.jpg"
          label="Live kitchen cooking"
          active={active}
        />
      ) : (
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          src={`/assets/how/how-0${step + 1}-${["see-it", "share-it", "plated"][step]}.jpg`}
          alt=""
          width={900}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      )}
      {step === 0 && (
        <div className="top">
          <b>{siteData.live[3].name}</b>
          <span className="lv">
            <i className="dot" />
            {uiCopy.HowItWorks__4}
          </span>
        </div>
      )}
      {step === 1 && (
        <div className="share">
          <b>{uiCopy.HowItWorks__5}</b>
          <div className="av">
            <span>AJ</span>
            <span>MK</span>
            <span>SR</span>
          </div>
          <span className="sbtn">
            {uiCopy.HowItWorks__6}
            <Send size={13} />
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="tickc">
          <i>
            <Check size={22} />
          </i>
          {uiCopy.HowItWorks__7}
          <br />
          {uiCopy.HowItWorks__8}
        </div>
      )}
      <div className="sheet">
        <b>{["Preparing your food", "Almost there", "On its way · 12 min"][step]}</b>
        <small>
          {
            ["Your front-row seat is ready", "Sent to 3 friends", "From our kitchen to your door"][
              step
            ]
          }
        </small>
        <Progress step={step} />
      </div>
    </>
  );
}

export function HowItWorks() {
  const { ref: sectionRef, visible: sectionVisible } = useInView<HTMLElement>(0.1);
  const { ref: stageRef, visible } = useInView<HTMLDivElement>(0.35);
  const [step, setStep] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [entered, setEntered] = useState(0);
  const [duration, setDuration] = useState(4200);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swap = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const choose = useCallback(
    (next: number, user = false) => {
      if (next === step && !user) return;
      if (timer.current) clearTimeout(timer.current);
      if (swap.current) clearTimeout(swap.current);
      setOutgoing(step);
      setStep(next);
      setDuration(user ? 6200 : 4200);
      swap.current = setTimeout(
        () => {
          setEntered(next);
          setOutgoing(null);
        },
        matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200,
      );
    },
    [step],
  );
  useEffect(() => {
    if (!visible || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    timer.current = setTimeout(() => choose((step + 1) % 3), duration);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visible, step, duration, choose]);
  useEffect(() => {
    const onScroll = () => {
      if (!stage.current) return;
      const rect = stage.current.getBoundingClientRect();
      const delta = Math.max(-400, Math.min(400, innerHeight / 2 - (rect.top + rect.height / 2)));
      stage.current.querySelectorAll<HTMLElement>(".fl").forEach((el) => {
        el.style.transform = `translateY(${(-delta * parseFloat(el.dataset.k || "0")).toFixed(1)}px)`;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section
      className={`how${sectionVisible ? " motion-visible" : ""}`}
      id="how"
      aria-label="How it works"
      ref={sectionRef}
    >
      <div className={`rise rv${sectionVisible ? " in" : ""}`}>
        <p className="eb">{uiCopy.HowItWorks__9}</p>
        <h2 className="h2">
          <span className="line">
            <span>{uiCopy.HowItWorks__10}</span>
          </span>
          <span className="line">
            <span>
              <em>{uiCopy.HowItWorks__11}</em> {uiCopy.HowItWorks__12}
            </span>
          </span>
        </h2>
      </div>
      <p
        className={`lead rv${sectionVisible ? " in" : ""}`}
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {uiCopy.HowItWorks__13}
      </p>
      <div
        className={`stage rv${sectionVisible ? " in" : ""}`}
        style={{ "--i": 3 } as React.CSSProperties}
        ref={stageRef}
      >
        <div className="stage-inner" ref={stage}>
          <FloatFood position="a" index={0} active={step} visible={visible} />
          <FloatFood position="b" index={1} active={step} visible={visible} />
          <div className="phone">
            <div className="screen">
              <span className="notch" />
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`st${entered === i && outgoing === null ? " on" : ""}${outgoing === i ? " leaving" : ""}`}
                  id={`how-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`how-tab-${i}`}
                  aria-hidden={entered !== i}
                >
                  <Screen step={i} active={entered === i && outgoing === null} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tabs" role="tablist">
        {["See it", "Share it", "Plated"].map((label, i) => (
          <button
            key={i}
            type="button"
            id={`how-tab-${i}`}
            className={`tab${i === step ? " on" : i < step ? " done" : ""}`}
            role="tab"
            aria-controls={`how-panel-${i}`}
            aria-selected={i === step}
            tabIndex={i === step ? 0 : -1}
            style={{ "--dur": `${duration / 1000}s` } as React.CSSProperties}
            onClick={() => choose(i, true)}
            onKeyDown={(event) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (step + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                choose(next, true);
                document.getElementById(`how-tab-${next}`)?.focus();
              }
            }}
          >
            <i />
            {label}
            <small>
              {
                [
                  "Your order, streamed from the kitchen.",
                  "Send the moment to friends.",
                  "Exactly as you watched.",
                ][i]
              }
            </small>
          </button>
        ))}
      </div>
      <div className={`hcta rv${sectionVisible ? " in" : ""}`}>
        <Link className="btn" href="/kitchens/all/">
          {uiCopy.HowItWorks__14}
        </Link>
        <span className="hnote">
          <ShieldCheck size={14} /> {uiCopy.HowItWorks__15}
        </span>
      </div>
    </section>
  );
}
