"use client";
import { uiCopy } from "@/data/site";

import { Star } from "lucide-react";
import Image from "next/image";

import { BackButton } from "@/components/layout/Header";
import { details, DineKitchen } from "@/lib/content";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { bookingTimes as times } from "@/data/dine";
export function BookingPage({ kitchen }: { kitchen: DineKitchen }) {
  const router = useRouter();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return [
      i === 0
        ? "Today"
        : d.toLocaleDateString("en-GB", { weekday: "short", timeZone: "Europe/London" }),
      d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" }),
    ];
  });
  const [date, setDate] = useState(0);
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [seat, setSeat] = useState("Counter");
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setDone(true);
  };
  return (
    <main className="page page-route booking-route" id="bpage" aria-labelledby="bkName">
      <div className="bhero">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          src={kitchen.img}
          alt={kitchen.name}
          width={1200}
          height={801}
        />
        <BackButton />
        <div className="bht">
          <span className="chipd">
            <i className="dot" style={{ background: "var(--live)", width: 7, height: 7 }} />
            {uiCopy.BookingPage__1}
          </span>
          <h1 id="bkName">{kitchen.name}</h1>
          <p>
            {kitchen.cuisine} · {kitchen.town}
          </p>
        </div>
      </div>
      <form className="bbody" id="bookingForm" onSubmit={submit}>
        <div className="facts">
          <span>
            <Star size={12} aria-hidden="true" /> {details.bookingRating}
          </span>
          <span className="fsa">{uiCopy.BookingPage__2}</span>
          <span>{details.bookingPrice}</span>
          <span>{details.hours}</span>
        </div>
        <p className="about">{kitchen.about}</p>
        <div className="info">
          <div>
            <small>{uiCopy.BookingPage__3}</small>
            <b>{kitchen.addr}</b>
          </div>
          <div>
            <small>{uiCopy.BookingPage__4}</small>
            <b>{details.sitting}</b>
          </div>
        </div>
        <h3>{uiCopy.BookingPage__5}</h3>
        <div className="chips">
          {dates.map(([label, secondary], i) => (
            <button
              key={i}
              type="button"
              className={`dchip${date === i ? " on" : ""}`}
              aria-pressed={date === i}
              onClick={() => setDate(i)}
            >
              {label}
              <small>{secondary}</small>
            </button>
          ))}
        </div>
        <h3>{uiCopy.BookingPage__6}</h3>
        <div className="slots">
          {times.map((value) => (
            <button
              key={value}
              type="button"
              disabled={value === "18:30" || value === "20:00"}
              className={time === value ? "on" : ""}
              aria-pressed={time === value}
              onClick={() => setTime(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="twin">
          <div>
            <h3>{uiCopy.BookingPage__7}</h3>
            <div className="step">
              <button
                type="button"
                disabled={guests <= 1}
                aria-label="Fewer"
                onClick={() => setGuests(Math.max(1, guests - 1))}
              >
                −
              </button>
              <output aria-live="polite">{guests}</output>
              <button
                type="button"
                disabled={guests >= 12}
                aria-label="More"
                onClick={() => setGuests(Math.min(12, guests + 1))}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <h3>{uiCopy.BookingPage__8}</h3>
            <div className="seg2">
              {["Counter", "Table"].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={seat === value ? "on" : ""}
                  aria-pressed={seat === value}
                  onClick={() => setSeat(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
        <h3>{uiCopy.BookingPage__9}</h3>
        <label className="fld">
          <span>{uiCopy.BookingPage__10}</span>
          <input required name="name" autoComplete="name" placeholder="Your name" />
        </label>
        <label className="fld">
          <span>{uiCopy.BookingPage__11}</span>
          <input required name="mobile" type="tel" autoComplete="tel" placeholder="07…" />
        </label>
        <label className="fld">
          <span>{uiCopy.BookingPage__12}</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
          />
        </label>
        <label className="fld">
          <span>{uiCopy.BookingPage__13}</span>
          <textarea rows={2} placeholder="e.g. no nuts, birthday" />
        </label>
      </form>
      <div className="bbar">
        <div aria-live="polite">
          <b>
            {dates[date][0]} · {time}
          </b>
          <small>
            {guests} {uiCopy.BookingPage__14}
            {seat}
          </small>
        </div>
        <button className="cta" type="submit" form="bookingForm">
          {uiCopy.BookingPage__15}
        </button>
      </div>
      {done && (
        <div className="bdone" role="status" tabIndex={-1}>
          <div className="tk">
            <Check size={34} />
          </div>

          <h2>{uiCopy.BookingPage__16}</h2>
          <p>
            {kitchen.name} · {dates[date][0]} · {time} · {guests} {uiCopy.BookingPage__17}
          </p>
          <p className="ref"></p>
          <button
            className="cta"
            type="button"
            onClick={() => (history.length > 1 ? router.back() : router.push("/"))}
          >
            {uiCopy.BookingPage__18}
          </button>
        </div>
      )}
    </main>
  );
}
