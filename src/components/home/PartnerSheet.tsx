"use client";
import { useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

export function PartnerSheet({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => null)) as Record<string, string> | null;
        throw new Error(errData?.error || "Failed to submit application");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet title="Partner with us" onClose={onClose}>
      <div style={{ padding: "24px 16px 48px", maxWidth: 500, margin: "0 auto" }}>
        <h2 className="h2" style={{ marginBottom: 8 }}>The missing ingredient to your success</h2>
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 32 }}>Grow your orders, your customers and your brand</p>
        
        {success ? (
          <div style={{ background: "var(--soft)", padding: 20, borderRadius: "var(--r-md)", textAlign: "center" }}>
            <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Application submitted!</h4>
            <p style={{ opacity: 0.8 }}>We&apos;ll be in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                <span style={{ background: "var(--soft)", padding: "4px 8px", borderRadius: 8 }}>🏢</span> Business info
              </h4>
              
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Business name</span>
                <input type="text" name="businessName" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="eg. Business name" />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Business street address</span>
                <input type="text" name="businessAddress" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="eg. 123 High Street" />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Business type</span>
                <select name="businessType" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: "var(--white)" }}>
                  <option value="">Select One</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <h4 style={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                  <span style={{ background: "var(--soft)", padding: "4px 8px", borderRadius: 8 }}>👤</span> Owner info
                </h4>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>Details of the legal owner of the business</p>
              </div>
              
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>First name</span>
                <input type="text" name="firstName" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="John" />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Last name</span>
                <input type="text" name="lastName" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="Doe" />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Phone number</span>
                <input type="tel" name="phone" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="eg. +44 7700 900123" />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Email address</span>
                <input type="email" name="email" required style={{ border: "1.5px solid var(--soft)", padding: "12px 14px", borderRadius: 12, fontSize: 15, fontFamily: "inherit" }} placeholder="email@mail.com" />
              </label>
            </div>

            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            
            <div style={{ marginTop: 8 }}>
              <Button type="submit" disabled={loading} style={{ width: "100%", padding: 18, fontSize: 16 }}>
                {loading ? "Submitting..." : "Start application"}
              </Button>
              <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
                By clicking on &apos;Start application&apos;, you agree to our Terms & Conditions and indicate that you have read our Privacy Statement.
              </p>
            </div>
          </form>
        )}
      </div>
    </Sheet>
  );
}
