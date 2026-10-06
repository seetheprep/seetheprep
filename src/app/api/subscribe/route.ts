import { accountCopy } from "@/data/site";
import { isRecord, json, readBody, validEmail } from "@/lib/api";

export const runtime = "edge";

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await readBody(request, 4096);
  } catch {
    return json({ saved: false, error: "Please check your details and try again." }, 400);
  }
  
  if (!isRecord(data) || data.consent !== true) {
    return json({ saved: false, error: accountCopy.consentError }, 400);
  }
  
  if (
    typeof data.name !== "string" ||
    !data.name.trim() ||
    data.name.trim().length > 80 ||
    !validEmail(data.email)
  ) {
    return json(
      { saved: false, error: "Please enter your first name and a valid email address." },
      400,
    );
  }

  const key = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM || "noreply@seetheprep.com";
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (!key || !provider) {
    console.warn("SeeThePrep: email API is not configured; no subscription was saved.");
    return json({ saved: false, configured: false });
  }

  if (provider !== "resend") {
    return json(
      {
        saved: false,
        configured: true,
        error: "Email updates are temporarily unavailable. Please try again later.",
      },
      503,
    );
  }

  const firstName = data.name.trim();
  const email = data.email.trim().toLowerCase();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Welcome to SeeThePrep Early Access!",
        text: `Hi ${firstName},\n\nThank you for registering for early access to SeeThePrep!\n\nWe'll be sure to send you launch news, new live kitchens and early offers.\n\nBest,\nThe SeeThePrep Team`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn("SeeThePrep: email provider rejected the request", response.status);
      return json(
        {
          saved: false,
          configured: true,
          error: "We couldn't save your details. Please try again.",
        },
        502,
      );
    }
    return json({ saved: true, configured: true });
  } catch {
    console.warn("SeeThePrep: email provider could not be reached.");
    return json(
      { saved: false, configured: true, error: "We couldn't save your details. Please try again." },
      502,
    );
  }
}

