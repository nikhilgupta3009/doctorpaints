# Doctor Paints

Handmade prints & personalised art — storefront website.

Static site, no build step required (plain HTML/CSS/JS). Deployable to Cloudflare Pages, GitHub Pages, Netlify or Vercel as-is.

## Structure

```
index.html          Home
prints.html          Downloadable / printed / framed art prints (2 sizes + paper guide)
alphabets.html        Customized alphabets — Basic / Customized / Premium tiers
motivation.html      Motivational word art (RISE, INSPIRE, GROW…)
story-frame.html      "Your Story in a Frame" — fully custom commission enquiry form
about.html / contact.html

css/style.css         Design system (colours, type, components)
js/data.js             All product data, pricing & brand info — edit this first
js/main.js             Shared header/footer/nav/cart-drawer injection
js/cart.js              LocalStorage cart + WhatsApp checkout
js/prints.js, alphabets.js, motivation.js, story-frame.js   Page-specific logic
```

## Before going live — checklist

- [ ] `js/data.js` — replace `BRAND.whatsapp` and `BRAND.email` placeholders, and `contact.html` links, with real details.
- [ ] Replace the gradient `.art-block` placeholders with real product photography (update the `<div class="art-block …">` markup / add `<img>` tags).
- [ ] Confirm real pricing for prints, alphabet tiers, motivation words and the "Story in a Frame" starting price in `js/data.js`.
- [ ] Decide the real Porter delivery fee bands / cities and update `PORTER_NOTE` in `js/data.js`.
- [ ] Digital downloads currently have no real fulfilment (checkout is a WhatsApp message, not a payment). Wire up a payment gateway (Razorpay/Stripe) + automatic file delivery when ready to sell for real, or keep the manual WhatsApp + UPI flow for a low-volume start.
- [ ] Add a privacy policy / terms page if accepting payments.

## How checkout currently works

There's no payment gateway yet. Adding an item to the cart and clicking **Checkout on WhatsApp** opens a pre-filled WhatsApp message with the order summary, sent to `BRAND.whatsapp`. The "Story in a Frame" form does the same with the full brief. This keeps the site launch-ready without payment integration; swap in a real gateway later without changing the page structure.

## Local preview

Any static file server works, e.g.:

```bash
npx serve .
```

Or open `index.html` directly in a browser — it has no server-side dependencies.

## Deploy (Cloudflare Pages example)

```bash
npx wrangler pages deploy . --project-name=doctorpaints
```
