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
        <h2 className="h2" style={{ marginBottom: 12, fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, color: "var(--foreground)" }}>Partner with SeeThePrep</h2>
        <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 40, lineHeight: 1.5 }}>Grow your orders, your customers and your brand with the next generation of food delivery.</p>
        
        {success ? (
          <div style={{ backgroundColor: "#F3F4F6", padding: 32, borderRadius: 16, textAlign: "center", border: "1px solid #E5E7EB" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#111827", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h4 style={{ fontWeight: 800, fontSize: 24, marginBottom: 12, letterSpacing: "-0.5px", color: "var(--foreground)" }}>Application submitted</h4>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.5 }}>Our partnership team will review your details and get in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 4 }}>
                <h4 style={{ fontWeight: 800, fontSize: 20, color: "var(--foreground)", letterSpacing: "-0.5px" }}>Business info</h4>
              </div>
              
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Business name</span>
                <input type="text" name="businessName" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="e.g. The Gourmet Kitchen" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Business street address</span>
                <input type="text" name="businessAddress" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="e.g. 123 High Street" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Business type</span>
                <select name="businessType" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", appearance: "none", cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 20px center", backgroundSize: "12px auto" }} onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}>
                  <option value="" disabled selected>Select business type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 4, marginTop: 12 }}>
                <h4 style={{ fontWeight: 800, fontSize: 20, color: "var(--foreground)", letterSpacing: "-0.5px" }}>Owner info</h4>
                <p style={{ fontSize: 15, color: "var(--muted)" }}>Details of the legal owner of the business</p>
              </div>
              
              <div style={{ display: "flex", gap: 16 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>First name</span>
                  <input type="text" name="firstName" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="John" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Last name</span>
                  <input type="text" name="lastName" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="Doe" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Email address</span>
                <input type="email" name="email" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="john@example.com" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Phone number</span>
                <input type="tel" name="phone" required style={{ border: "2px solid var(--border)", backgroundColor: "var(--white)", padding: "16px 20px", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease" }} placeholder="e.g. +44 7700 900123" onFocus={(e) => { e.target.style.borderColor = "var(--foreground)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
              </label>
            </div>

            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "18px 24px", fontSize: 18, fontWeight: 700, borderRadius: 12, backgroundColor: "var(--foreground)", color: "var(--white)", border: "none", cursor: loading ? "not-allowed" : "pointer", transform: loading ? "scale(0.98)" : "scale(1)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                {loading && <svg className="animate-spin" style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path></svg>}
                {loading ? "Submitting..." : "Submit application"}
              </button>
              <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
                By clicking submit, you agree to our Terms & Conditions and indicate that you have read our Privacy Statement.
              </p>
            </div>
          </form>
        )}
      </div>
    </Sheet>
  );
}
