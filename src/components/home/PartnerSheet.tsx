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
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Business name</span>
                <input type="text" name="businessName" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="e.g. The Gourmet Kitchen" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Business street address</span>
                <input type="text" name="businessAddress" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="e.g. 123 High Street" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Business type</span>
                <select name="businessType" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", appearance: "none", cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "10px auto" }} onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }}>
                  <option value="" disabled selected>Select business type</option>
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
              
              <div style={{ display: "flex", gap: 16 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>First name</span>
                  <input type="text" name="firstName" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="John" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Last name</span>
                  <input type="text" name="lastName" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="Doe" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Email address</span>
                <input type="email" name="email" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="john@example.com" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Phone number</span>
                <input type="tel" name="phone" required style={{ border: "2px solid transparent", backgroundColor: "var(--soft)", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.02) inset" }} placeholder="e.g. +44 7700 900123" onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.backgroundColor = "var(--white)"; }} onBlur={(e) => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "var(--soft)"; }} />
              </label>
            </div>

            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            
            <div style={{ marginTop: 16 }}>
              <Button type="submit" disabled={loading} style={{ width: "100%", padding: "18px 24px", fontSize: 16, fontWeight: 700, borderRadius: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transform: loading ? "scale(0.98)" : "scale(1)", transition: "all 0.2s ease" }}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <svg className="animate-spin" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path></svg>
                    Submitting...
                  </span>
                ) : "Submit application"}
              </Button>
              <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
                By clicking submit, you agree to our Terms & Conditions and indicate that you have read our Privacy Statement.
              </p>
            </div>
          </form>
        )}
      </div>
    </Sheet>
  );
}
