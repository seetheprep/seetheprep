import { json, readBody, isRecord } from "@/lib/api";

export const runtime = "edge";

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await readBody(request);
  } catch {
    return json({ sent: false, error: "Please check your details." }, 400);
  }

  if (
    !isRecord(data) ||
    typeof data.businessName !== "string" ||
    typeof data.businessAddress !== "string" ||
    typeof data.firstName !== "string" ||
    typeof data.lastName !== "string" ||
    typeof data.email !== "string" ||
    typeof data.phone !== "string" ||
    typeof data.businessType !== "string"
  ) {
    return json({ sent: false, error: "Missing required fields." }, 400);
  }

  const text = `New Partner Application

Business Info
- Name: ${data.businessName}
- Address: ${data.businessAddress}
- Type: ${data.businessType}

Owner Info
- Name: ${data.firstName} ${data.lastName}
- Phone: ${data.phone}
- Email: ${data.email}
`;

  const key = process.env.EMAIL_API_KEY,
    from = process.env.EMAIL_FROM || "noreply@seetheprep.com";

  if (!key || !process.env.EMAIL_PROVIDER) {
    console.warn("SeeThePrep: partner email is not configured; no email was sent.");
    return json({ sent: false, configured: false, text });
  }

  if (process.env.EMAIL_PROVIDER.toLowerCase() !== "resend") {
    return json({ sent: false, text, error: "Email delivery is unavailable." }, 503);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["support@seetheprep.com"],
        subject: `New Partner Application from ${data.businessName}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn("SeeThePrep: email provider rejected the request", response.status);
      return json({ sent: false, text }, 502);
    }
    return json({ sent: true });
  } catch {
    console.warn("SeeThePrep: email provider could not be reached.");
    return json({ sent: false, text }, 502);
  }
}
