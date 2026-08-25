/* ===================================================================
   Doctor Paints — shared header/footer + mobile nav + cart drawer wiring
   =================================================================== */

const NAV_LINKS = [
  { href: "prints.html", label: "Prints", key: "prints" },
  { href: "alphabets.html", label: "Custom Alphabets", key: "alphabets" },
  { href: "motivation.html", label: "Motivation", key: "motivation" },
  { href: "story-frame.html", label: "Your Story in a Frame", key: "story" },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const active = document.body.dataset.page;

  const linkHtml = (extraClass) =>
    NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${extraClass || ""} ${active === l.key ? "active" : ""}">${l.label}</a>`
    ).join("");

  mount.innerHTML = `
    <div class="banner">Handmade, made-to-order art · Ships across India · <a href="story-frame.html" style="text-decoration:underline;">Start a custom "Story in a Frame"</a></div>
    <header class="site-header">
      <div class="container header-row">
        <a href="index.html" class="logo">Doctor Paints<span class="dot">.</span></a>
        <nav class="nav-links">${linkHtml()}</nav>
        <div class="header-actions">
          <button class="cart-btn" onclick="openCart()">🛍 Cart <span class="cart-count" data-cart-count>0</span></button>
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
            <div class="footer-logo">Doctor Paints.</div>
            <p style="max-width:32ch;">Handmade prints and personalised wall art, painted one piece at a time.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="prints.html">Downloadable Prints</a></li>
              <li><a href="alphabets.html">Custom Alphabets</a></li>
              <li><a href="motivation.html">Motivation Words</a></li>
              <li><a href="story-frame.html">Your Story in a Frame</a></li>
            </ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="prints.html#paper-guide">Paper &amp; Size Guide</a></li>
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
          <span>© ${new Date().getFullYear()} Doctor Paints. All artwork handmade to order.</span>
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
