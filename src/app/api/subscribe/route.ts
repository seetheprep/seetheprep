import { accountCopy } from "@/data/site";
import { isRecord, json, readBody, validEmail } from "@/lib/api";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await readBody(request, 4096);
  } catch {
    return json({ saved: false, error: "Please check your details and try again." }, 400);
  }
  if (!isRecord(data) || data.consent !== true)
    return json({ saved: false, error: accountCopy.consentError }, 400);
  if (
    typeof data.name !== "string" ||
    !data.name.trim() ||
    data.name.trim().length > 80 ||
    !validEmail(data.email)
  )
    return json(
      { saved: false, error: "Please enter your first name and a valid email address." },
      400,
    );
  const provider = process.env.MAILING_LIST_PROVIDER?.toLowerCase();
  const key = process.env.MAILING_LIST_API_KEY,
    listId = Number(process.env.MAILING_LIST_ID);
  if (!key || !provider || !Number.isSafeInteger(listId) || listId < 1) {
    console.warn("SeeThePrep: mailing list is not configured; no subscription was saved.");
    return json({ saved: false, configured: false });
  }
  if (provider !== "brevo")
    return json(
      {
        saved: false,
        configured: true,
        error: "Email updates are temporarily unavailable. Please try again later.",
      },
      503,
    );
  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email.trim().toLowerCase(),
        attributes: {
          FIRSTNAME: data.name.trim(),
          STP_CONSENT: true,
          STP_CONSENT_DATE: new Date().toISOString(),
        },
        listIds: [listId],
        updateEnabled: true,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.warn("SeeThePrep: mailing-list provider rejected the request", response.status);
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
    console.warn("SeeThePrep: mailing-list provider could not be reached.");
    return json(
      { saved: false, configured: true, error: "We couldn't save your details. Please try again." },
      502,
    );
  }
}
