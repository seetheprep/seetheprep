"use client";
import { uiCopy } from "@/data/site";

import { accountCopy, site } from "@/data/site";
import { Check, LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

export function EarlyAccessForm() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false),
    [done, setDone] = useState(false),
    [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null),
    emailRef = useRef<HTMLInputElement>(null),
    checkbox = useRef<HTMLInputElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!consent) {
      setError(accountCopy.consentError);
      checkbox.current?.focus();
      return;
    }
    if (!name.trim()) {
      setError("Please enter your first name.");
      nameRef.current?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), consent: true }),
      });
      const result = (await response.json()) as Record<string, unknown>;
      if (!response.ok)
        throw new Error((result.error as string) || "We couldn't save your details. Please try again.");
      setSaved(result.saved === true);
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message.includes("Please")
          ? err.message
          : "We couldn't save your details. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="app-page account-page" id="main-content">
      <Link className="round-button account-close" href="/" aria-label="Close early access">
        <X size={20} />
      </Link>
      {done ? (
        <section className="early-success" aria-live="polite">
          <div className="success-ring">
            <Check size={36} />
          </div>
          <h1>
            {saved ? (
              <>
                {uiCopy.EarlyAccessForm__1}
                {name.trim()}.
              </>
            ) : (
              <>
                {site.fallbackSignupTitle} {name.trim()}.
              </>
            )}
          </h1>
          <p>
            {saved ? (
              <>
                {uiCopy.EarlyAccessForm__2}
                <b>{email.trim()}</b> {uiCopy.EarlyAccessForm__3}
              </>
            ) : (
              site.fallbackSignupText
            )}
          </p>
          <Link className="primary-button" href="/">
            {uiCopy.EarlyAccessForm__4}
          </Link>
        </section>
      ) : (
        <section className="early-access">
          <Image
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
            className="early-fork"
            src="/assets/brand/fork.png"
            width={64}
            height={64}
            alt=""
          />
          <h1>{accountCopy.title}</h1>
          <p>{accountCopy.intro}</p>
          <form onSubmit={submit} noValidate>
            <label className="app-field">
              <span>{uiCopy.EarlyAccessForm__5}</span>
              <input
                ref={nameRef}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="given-name"
                required
                maxLength={80}
              />
            </label>
            <label className="app-field">
              <span>{uiCopy.EarlyAccessForm__6}</span>
              <input
                ref={emailRef}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label className="consent-checkbox">
              <input
                ref={checkbox}
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setError("");
                }}
                aria-describedby={error ? "signup-error" : undefined}
              />
              <span>{accountCopy.consent}</span>
            </label>
            {error && (
              <p className="signup-error" id="signup-error" role="alert">
                {error}
              </p>
            )}
            <button
              className={`early-submit${consent ? " consented" : ""}`}
              aria-disabled={!consent || busy}
              disabled={busy}
              type="submit"
            >
              {busy && <LoaderCircle className="saving-spinner" size={18} />}{" "}
              {busy ? "Saving…" : "Get early access"}
            </button>
          </form>
          <p className="early-small">
            {accountCopy.footer} {uiCopy.EarlyAccessForm__7}
            <Link href="/privacy/">{uiCopy.EarlyAccessForm__8}</Link>. {accountCopy.launch}
          </p>
        </section>
      )}
    </main>
  );
}
