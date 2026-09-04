/* ===================================================================
   More by Shilpi — shared header/footer + mobile nav + cart drawer wiring
   =================================================================== */

// Flat top-level nav. Contact stays footer-only, matching the reference layout.
const NAV_LINKS = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "expressions.html", label: "Expressions", key: "expressions", bucket: "expressions" },
  { href: "inspirations.html", label: "Inspirations", key: "inspirations" },
  { href: "learn.html", label: "Learn", key: "learn" },
  { href: "about.html", label: "About", key: "about" },
  { href: "events.html", label: "Events", key: "events" },
];

const CART_ICON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const active = document.body.dataset.page;
  const activeBucket = document.body.dataset.bucket;

  const isActive = (l) => active === l.key || (l.bucket && activeBucket === l.bucket);

  const linkHtml = () =>
    NAV_LINKS.map(
      (l) => `<a href="${l.href}" class="${isActive(l) ? "active" : ""}">${l.label}</a>`
    ).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="container header-row">
        <a href="index.html" class="logo">
          <span class="logo-name">${BRAND.name}</span>
          <span class="logo-tagline">Handmade Art</span>
        </a>
        <nav class="nav-links">${linkHtml()}</nav>
        <div class="header-actions">
          <button class="cart-btn" onclick="openCart()" aria-label="Open cart">
            ${CART_ICON_SVG}
            <span class="cart-count" data-cart-count>0</span>
          </button>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>
      <div class="mobile-menu" id="mobileMenu">${linkHtml()}</div>
    </header>
  `;

  document.getElementById("navToggle")?.addEventListener("click", () => {
    document.getElementById("mobileMenu")?.classList.toggle("open");
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">${BRAND.name}.</div>
            <p style="max-width:32ch;">Handmade prints and personalised wall art, painted one piece at a time.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="expressions.html">Expressions</a></li>
              <li><a href="inspirations.html">Inspirations</a></li>
              <li><a href="alphabets.html">Custom Alphabets</a></li>
              <li><a href="story-frame.html">Your Story in a Frame</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href="learn.html">Learn</a></li>
              <li><a href="events.html">Events</a></li>
              <li><a href="about.html">About</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="inspirations.html#paper-guide">Paper &amp; Size Guide</a></li>
              <li><a href="contact.html#faq">Shipping &amp; Porter Delivery</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="https://wa.me/${BRAND.whatsapp}" target="_blank" rel="noopener">WhatsApp Us</a></li>
              <li><a href="mailto:${BRAND.email}">${BRAND.email}</a></li>
              <li><a href="${BRAND.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${BRAND.name}. All artwork handmade to order.</span>
          <span>${BRAND.address}</span>
        </div>
      </div>
    </footer>
  `;
}

function renderCartDrawer() {
  if (document.getElementById("cartDrawer")) return;
  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.id = "cartOverlay";
  overlay.onclick = closeCart;
  document.body.appendChild(overlay);

  const drawer = document.createElement("div");
  drawer.className = "cart-drawer";
  drawer.id = "cartDrawer";
  drawer.innerHTML = `
    <div class="cart-head">
      <h3 style="margin:0;">Your Cart</h3>
      <button class="cart-close" onclick="closeCart()">✕</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-foot" id="cartFoot" style="display:none;">
      <div class="cart-subtotal"><span>Subtotal</span><span id="cartSubtotal">₹0</span></div>
      <div class="cart-note">Digital downloads are delivered by email instantly. Printed / framed items include Porter or courier delivery, confirmed on WhatsApp before payment.</div>
      <button class="btn btn--wa btn--block" onclick="checkoutOnWhatsApp()">Checkout on WhatsApp</button>
    </div>
  `;
  document.body.appendChild(drawer);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderCartDrawer();
  renderCart();
});
