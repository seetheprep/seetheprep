import { menuFor, menuOptions } from "@/data/menus";
import { site } from "@/data/site";
import { isRecord, json, readBody, validEmail } from "@/lib/api";
import { findKitchen, money } from "@/lib/content";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await readBody(request);
  } catch {
    return json({ sent: false, error: "Please check the order details." }, 400);
  }
  if (
    !isRecord(data) ||
    !validEmail(data.email) ||
    typeof data.name !== "string" ||
    data.name.length > 80 ||
    typeof data.kitchenId !== "string" ||
    typeof data.id !== "string" ||
    !/^STP-[a-zA-Z0-9-]{4,50}$/.test(data.id) ||
    !Array.isArray(data.items) ||
    !data.items.length ||
    data.items.length > 40
  )
    return json({ sent: false, error: "Please check the order details." }, 400);
  const kitchen = findKitchen(data.kitchenId);
  if (!kitchen) return json({ sent: false, error: "Kitchen not found." }, 400);
  const menu = menuFor(kitchen),
    lines: string[] = [];
  for (const item of data.items as unknown[]) {
    if (
      !isRecord(item) ||
      typeof item.dishId !== "string" ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 99
    )
      return json({ sent: false, error: "Please check the order items." }, 400);
    const dish = menu.find((d) => d.id === item.dishId);
    if (!dish) return json({ sent: false, error: "Dish not found." }, 400);
    const price =
      dish.price +
      (item.large === true ? menuOptions.large : 0) +
      (item.extra === true ? menuOptions.extra : 0);
    lines.push(`${item.quantity} × ${dish.name} — ${money(price * item.quantity)}`);
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const text = [
    `Hi ${data.name.trim()},`,
    `Order #${data.id} from ${kitchen.name}.`,
    ...lines,
    `Estimated time: ${kitchen.mins[0]}–${kitchen.mins[1]} minutes`,
    ...(kitchen.camera ? [`Watch your kitchen live: ${base}/live/#${kitchen.id}`] : []),
    `Questions? ${site.email}`,
  ].join("\n\n");
  const key = process.env.EMAIL_API_KEY,
    from = process.env.EMAIL_FROM;
  if (!key || !from || !process.env.EMAIL_PROVIDER) {
    console.warn("SeeThePrep: order email is not configured; no email was sent.");
    return json({ sent: false, configured: false, text });
  }
  if (process.env.EMAIL_PROVIDER.toLowerCase() !== "resend")
    return json({ sent: false, text, error: "Email delivery is unavailable." }, 503);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": createHash("sha256").update(`${data.id}:${data.email}`).digest("hex"),
      },
      body: JSON.stringify({
        from,
        to: [data.email],
        subject: `SeeThePrep order #${data.id}`,
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
