# SeeThePrep

The complete Next.js App Router project, including the supplied photos, videos and local Plus Jakarta Sans font. No hosted website service is required to run it.

## Run it on your computer

1. Install **Node.js LTS** from https://nodejs.org (Node 20.9 or newer).
2. Unzip this folder, then open a terminal in it.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

Keep that terminal open while using the website. Press Ctrl+C to stop it.

To check the finished production version:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm run format` formats the source files for easier reading.

## Host it on Vercel

1. Put the unzipped project in a GitHub repository. Include the files inside this folder, not a ZIP of them.
2. Visit https://vercel.com/new and import that repository.
3. Vercel detects Next.js automatically. Keep the normal build settings.
4. Add the environment values below in **Project Settings → Environment Variables**. Set `NEXT_PUBLIC_SITE_URL` to your real HTTPS domain.
5. Click **Deploy**. When you change an environment value later, redeploy.

For local configuration, copy `.env.example` to `.env.local`, fill in the values and restart `npm run dev`. Never put API keys in a public GitHub repository. Only `NEXT_PUBLIC_SITE_URL` is public; the other settings stay on the server.

## Connect early-access signups

The included provider is **Brevo**. The form sends a POST to `/api/subscribe` with first name, email and explicit consent. No checkbox is pre-selected.

In your Brevo account:

1. Create a contacts list and note its numeric list ID.
2. Create an API key.
3. Create these contact attributes: `FIRSTNAME` (text), `STP_CONSENT` (boolean), `STP_CONSENT_DATE` (text, stores the full date/time).
4. Set these environment values:

| Setting | Value |
|---|---|
| `MAILING_LIST_PROVIDER` | `brevo` |
| `MAILING_LIST_API_KEY` | Your private Brevo API key |
| `MAILING_LIST_ID` | Your numeric contacts list ID |

The “You're on the list” screen appears only after Brevo accepts the contact. Repeated signups update that contact in the same list. Set up campaigns and unsubscribe handling in Brevo.

**Without these settings**, the form still validates, posts and opens its completion screen. It thanks the visitor and explicitly says their details have **not** been added. The server logs a warning without names or email addresses. It does not claim a saved signup or promise an email. This reconciles the requested working fallback with the requirement never to claim a save that did not happen.

If Brevo rejects a configured request or cannot be reached, the form shows an error and keeps the details available to retry.

Provider documentation: https://developers.brevo.com/reference/create-contact

## Connect order emails

The included email provider is **Resend**. Verify your sending domain in Resend, create an API key and set:

| Setting | Value |
|---|---|
| `EMAIL_PROVIDER` | `resend` |
| `EMAIL_API_KEY` | Your private Resend API key |
| `EMAIL_FROM` | `SeeThePrep <orders@your-verified-domain.com>` |
| `NEXT_PUBLIC_SITE_URL` | Your deployed HTTPS website URL |

Checkout posts to `/api/order-email`. The server validates the kitchen, dish IDs and quantities, rebuilds item prices from the menu, and sends a plain-text email with the order reference, dishes, kitchen, estimated time, live link where applicable and support address. An idempotency key prevents retries sending the same order twice within the provider's retention window.

If sending is unconfigured or fails, the order email remains readable in confirmation and **Order details**. The site never claims an email was sent without a successful provider response.

Provider documentation: https://resend.com/docs/api-reference/emails/send-email

## Edit the website

| What you want to change | Where to edit |
|---|---|
| Banner text | `src/data/site.ts` → `site.banner` |
| Kitchens, prices, ratings | `src/data/kitchens.ts` (dish prices are in menus) |
| Menus and dish prices | `src/data/menus.ts` |
| Coupons | `src/data/coupons.ts`; eligibility/calculation in `src/lib/coupons.ts` |
| Live videos | `src/data/live.ts` + `public/assets/live/` |
| Photos | Replace the file in `public/assets/` with the same name |
| Colours, radii, motion keyframes | `tailwind.config.ts` |
| Footer, email, socials, interface copy | `src/data/site.ts` |
| Dine-in kitchens and booking slots | `src/data/dine.ts` |
| Upcoming live kitchens | `src/data/liveKitchens.ts` |
| Auction dishes and timings | `src/data/auctions.ts` |
| Tracking facts and status text | `src/data/funFacts.ts` |

The original asset filenames and folders are preserved. Images use `next/image`, which serves appropriately sized images and WebP automatically. Videos are not downloaded until playback is needed, and only one visible video plays at a time on mobile. Desktop permits several visible videos. Reduced-motion visitors can choose to play a video manually.

The data files use TypeScript interfaces from `src/lib/types.ts`. Red underlines in an editor help catch missing fields before publishing. After editing, run `npm run build`.

### Add a kitchen

1. Open `src/data/kitchens.ts` and copy one object in the `kitchens` array. Paste it at the **end** of that array.
2. Change the name, cuisines, categories, rating, fee, delivery times and offer. Keep `offer: null` if there is no offer. The page address is generated from the name (for example, `My Kitchen` becomes `/kitchen/my-kitchen/`).
3. Add its photo in `public/assets/kitchens/`. Entries follow numbered filenames: the 34th entry uses `kitchen-34.jpg`. Appending keeps existing photos correctly matched.
4. Open `src/data/menus.ts`. Copy a suitable menu entry, use the new kitchen's page ID as its key, and edit its 6–12 dishes. Give each dish a unique ID, correct price, description and verified allergens. Use an existing matching dish photo or omit `image`.
5. Rebuild. The home page intentionally keeps its first 13 kitchens; the new kitchen appears in the catalogue.

To add a live kitchen, add the corresponding entries in `live.ts` / `liveKitchens.ts`, keep their names identical, add the next numbered video and poster, and add its menu. Live photos and video arrays use the same ordering as the numbered asset files.

## Project structure

- `src/app/`: pages and server API routes; pages are Server Components unless they need browser interaction.
- `src/components/`: reusable components grouped by feature.
- `src/data/`: editable content and typed catalogue data.
- `src/lib/`: cart context, helpers and small animation/visibility hooks.
- `public/assets/`: all supplied assets, unchanged.
- `tailwind.config.ts`: brand tokens and CSS animation keyframes.

The homepage retains its approved styles in `globals.css`; the catalogue/order pages use `nextlevel.css` and the final design overrides in `final.css`. Animation keyframes live in the Tailwind configuration. No animation library is used.

## What the pre-launch flow does

Ordering is not open yet. The single top banner communicates that. Basket, favourites, clipped coupons and auction bids are kept in the visitor's browser; the current order is kept for the tab session. Tracking advances through four stages approximately every eight seconds. The supplied videos are prerecorded assets. Booking records display selected details but do not reserve a real table. Checkout does not charge a card or dispatch an order to a restaurant.

Before taking real orders, connect a fulfilment backend, real booking availability, authenticated order access, live camera streams, a payment provider and server-validated coupon redemption. Do not collect payment details in the current payment display. The email API is a notification endpoint, not an order-placement system; protect it with your deployment's abuse controls before public launch. Review the supplied menu prices and allergens with each kitchen before accepting orders.

## Validation

- Next.js production build: passed, including TypeScript and Next.js ESLint checks.
- Standalone `npm run lint` / `npm run typecheck`: passed with zero warnings/errors.
- Component journey checks: home media/order, consent/email validation, kitchen filters, stories, coupons, basket/checkout, camera and non-camera tracking, Live viewer, manual explain carousel and auction expiry passed.
- API checks use mocked provider responses; no real email is sent by tests.
- All 137 original asset files were checked against the supplied ZIP and are byte-identical.

The automated journey checks use a DOM harness; they do **not** measure pixels, frame rate or 4G loading. Responsive rules cover 390px, 768px and 1280px, but a permitted browser rendering surface was unavailable for final visual/device measurements. Before launch, inspect those viewport sizes and run Lighthouse on the deployed domain. This project does not claim measured 60fps, a 2.5-second 4G load or a completed accessibility audit.
