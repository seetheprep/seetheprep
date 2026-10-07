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
    <main className="app-page account-page" id="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Link className="round-button account-close" href="/" aria-label="Close early access" style={{ position: "absolute", top: 24, left: 24, backgroundColor: "var(--white)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: "none", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", zIndex: 10, transition: "all 0.2s ease" }}>
        <X size={24} color="var(--foreground)" />
      </Link>
      
      <div style={{ width: "100%", maxWidth: 520, padding: "0 24px", margin: "0 auto", animation: "fade-in 0.5s ease-out" }}>
        {done ? (
          <section className="early-success" aria-live="polite" style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#E6F4EA", color: "#137333", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
              <Check size={40} strokeWidth={3} />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, color: "var(--foreground)" }}>
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
            <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 40, lineHeight: 1.5 }}>
              {saved ? (
                <>
                  {uiCopy.EarlyAccessForm__2}
                  <b style={{ color: "var(--foreground)" }}>{email.trim()}</b> {uiCopy.EarlyAccessForm__3}
                </>
              ) : (
                site.fallbackSignupText
              )}
            </p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "18px 24px", backgroundColor: "var(--foreground)", color: "var(--white)", fontSize: 18, fontWeight: 700, borderRadius: 12, textDecoration: "none", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.98)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
              {uiCopy.EarlyAccessForm__4}
            </Link>
          </section>
        ) : (
          <section className="early-access" style={{ padding: "32px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, backgroundColor: "var(--primary)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src="/assets/brand/fork.png"
                  width={28}
                  height={28}
                  alt="SeeThePrep"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12, lineHeight: 1.1, color: "var(--foreground)" }}>{accountCopy.title}</h1>
            <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 40, lineHeight: 1.5 }}>{accountCopy.intro}</p>
            
            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>{uiCopy.EarlyAccessForm__5}</span>
                <input
                  ref={nameRef}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  style={{ width: "100%", padding: "16px 20px", fontSize: 16, backgroundColor: "var(--soft)", border: "2px solid transparent", borderRadius: 12, outline: "none", transition: "all 0.2s ease", fontFamily: "inherit" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; e.target.style.backgroundColor = "var(--white)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }}
                />
              </label>
              
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>{uiCopy.EarlyAccessForm__6}</span>
                <input
                  ref={emailRef}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  required
                  maxLength={254}
                  style={{ width: "100%", padding: "16px 20px", fontSize: 16, backgroundColor: "var(--soft)", border: "2px solid transparent", borderRadius: 12, outline: "none", transition: "all 0.2s ease", fontFamily: "inherit" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; e.target.style.backgroundColor = "var(--white)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }}
                />
              </label>
              
              <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginTop: 8 }}>
                <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0, marginTop: 2 }}>
                  <input
                    ref={checkbox}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setError("");
                    }}
                    aria-describedby={error ? "signup-error" : undefined}
                    style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                  />
                  <div style={{ width: 24, height: 24, border: `2px solid ${consent ? "var(--foreground)" : "var(--border)"}`, borderRadius: 6, backgroundColor: consent ? "var(--foreground)" : "var(--white)", transition: "all 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {consent && <Check size={16} color="var(--white)" strokeWidth={3} />}
                  </div>
                </div>
                <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5, userSelect: "none" }}>{accountCopy.consent}</span>
              </label>
              
              {error && (
                <div id="signup-error" role="alert" style={{ backgroundColor: "#FEE2E2", color: "#B91C1C", padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>!</span> {error}
                </div>
              )}
              
              <button
                aria-disabled={!consent || busy}
                disabled={busy}
                type="submit"
                style={{ width: "100%", padding: "18px 24px", fontSize: 18, fontWeight: 700, borderRadius: 12, border: "none", backgroundColor: consent ? "var(--foreground)" : "var(--border)", color: consent ? "var(--white)" : "var(--muted)", cursor: consent && !busy ? "pointer" : "not-allowed", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", transform: busy ? "scale(0.98)" : "scale(1)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 8 }}
              >
                {busy && <LoaderCircle size={20} style={{ animation: "spin 1s linear infinite" }} />}
                {busy ? "Saving…" : "Get early access"}
              </button>
            </form>
            
            <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                {accountCopy.footer} {uiCopy.EarlyAccessForm__7}
                <Link href="/privacy/" style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "underline" }}>{uiCopy.EarlyAccessForm__8}</Link>. {accountCopy.launch}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
