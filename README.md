# More by Shilpi

Original art, fine art prints & personalised commissions — storefront website.

Static site, no build step required (plain HTML/CSS/JS). Deployable to Cloudflare Pages, GitHub Pages, Netlify or Vercel as-is. Live at [nikhilgupta3009.github.io/doctorpaints](https://nikhilgupta3009.github.io/doctorpaints/), auto-deployed on every push to `main` via `.github/workflows/deploy-pages.yml`.

> Note: the repo/folder is still named `doctorpaints` (renaming it would change the live URL and git remote) — only the on-site branding reads "More by Shilpi".

## Structure

```
index.html               Home — full-bleed hero + Expressions & Inspirations preview grids
expressions.html          One-of-a-kind ready paintings (Quick View + WhatsApp enquiry)
inspirations.html         Prints + Word Art grids, sharing one configurator modal
                            (format + size + qty), the paper & size guide, and a
                            "Commission a Custom Original" section linking to alphabets/story-frame
alphabets.html            Customized alphabets — Basic / Customized / Premium tiers
story-frame.html          "Your Story in a Frame" — fully custom commission enquiry form
learn.html                Short guides (sizing, care, printing, how commissions work)
events.html               Exhibitions / pop-ups / workshops (empty-state until scheduled)
about.html / contact.html

css/style.css              Design system (colours, type, components, product-card badges)
js/data.js                  All product data — ORIGINAL_ART, PRINTS, MOTIVATION_WORDS,
                              ALPHABET_TIERS, LEARN_ARTICLES, EVENTS_INFO, BRAND — edit this first
js/main.js                  Shared header/footer/nav/cart-drawer injection
js/cart.js                   LocalStorage cart + WhatsApp checkout
js/expressions.js             Expressions grid + Quick View (WhatsApp enquiry, no cart)
js/inspirations.js            Prints/Word Art grid + shared configurator modal
js/alphabets.js, story-frame.js   Page-specific logic for the two commission flows
```

Top nav is flat: **Home · Expressions · Inspirations** (Learn, About, Events and Contact live in the footer only). Custom Alphabets and Your Story in a Frame are commissioned/personalised, so they're reached via Inspirations, not Expressions (which is ready-made originals only).

## Before going live — checklist

- [ ] `js/data.js` — replace `BRAND.whatsapp`, `BRAND.email` and `BRAND.instagram` placeholders, and the matching links in `contact.html`, with real details.
- [ ] Replace the gradient `.art-block` placeholders with real product photography (update the `<div class="art-block …">` markup / add `<img>` tags).
- [ ] Confirm real pricing/inventory for `ORIGINAL_ART` (availability, medium, price), `PRINTS`, `ALPHABET_TIERS`, motivation words and the "Story in a Frame" starting price.
- [ ] Write real content for `LEARN_ARTICLES`, and add real rows to `EVENTS_INFO.upcoming` once something is scheduled.
- [ ] Decide the real Porter delivery fee bands / cities and update `PORTER_NOTE` in `js/data.js`.
- [ ] Digital downloads currently have no real fulfilment (checkout is a WhatsApp message, not a payment). Wire up a payment gateway (Razorpay/Stripe) + automatic file delivery when ready to sell for real, or keep the manual WhatsApp + UPI flow for a low-volume start.
- [ ] Add a privacy policy / terms page if accepting payments.

## How checkout currently works

There's no payment gateway yet.
- **Inspirations**: adding an item to the cart and clicking **Checkout on WhatsApp** opens a pre-filled WhatsApp message with the order summary, sent to `BRAND.whatsapp`.
- **Expressions**: since each piece is a unique physical object, Quick View opens a WhatsApp enquiry instead of a cart add — no risk of "selling" a piece twice.
- **Custom Alphabets / Story in a Frame**: both compile the brief into a WhatsApp (or email) message rather than an instant checkout, since these start as a conversation.

This keeps the site launch-ready without payment integration; swap in a real gateway later without changing the page structure.

## Local preview

Any static file server works, e.g.:

```bash
npx serve .
```

Or open `index.html` directly in a browser — it has no server-side dependencies.

## Deploy

Pushing to `main` auto-deploys to GitHub Pages via Actions. For an alternative host (Cloudflare Pages example):

```bash
npx wrangler pages deploy . --project-name=doctorpaints
```
