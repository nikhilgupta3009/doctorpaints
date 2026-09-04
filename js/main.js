/* ===================================================================
   More by Shilpi — shared header/footer + mobile nav + cart drawer wiring
   =================================================================== */

// Flat entries mixed with dropdown groups (from BUCKETS). Order shown in nav.
const NAV_LINKS = [
  { href: "expressions.html", label: "Expressions", key: "expressions", group: BUCKETS[0] },
  { href: "inspiration.html", label: "Inspiration", key: "inspiration", group: BUCKETS[1] },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const active = document.body.dataset.page;
  const activeBucket = document.body.dataset.bucket;

  const isActive = (l) => active === l.key || (l.group && activeBucket === l.group.key);

  const desktopLinkHtml = () =>
    NAV_LINKS.map((l) => {
      if (!l.group) {
        return `<a href="${l.href}" class="${isActive(l) ? "active" : ""}">${l.label}</a>`;
      }
      const children = l.group.children
        .map(
          (c) =>
            `<a href="${c.href}"><span>${c.label}</span><small>${c.blurb}</small></a>`
        )
        .join("");
      return `
        <div class="nav-item">
          <a href="${l.href}" class="nav-dropdown-trigger ${isActive(l) ? "active" : ""}">${l.label} <span class="caret">▾</span></a>
          <div class="nav-dropdown-panel">
            <a href="${l.href}" class="nav-dropdown-all">All of ${l.label} →</a>
            ${children}
          </div>
        </div>`;
    }).join("");

  const mobileLinkHtml = () =>
    NAV_LINKS.map((l) => {
      if (!l.group) {
        return `<a href="${l.href}" class="${isActive(l) ? "active" : ""}">${l.label}</a>`;
      }
      const children = l.group.children
        .map((c) => `<a href="${c.href}" class="mobile-sub-link">${c.label}</a>`)
        .join("");
      return `<a href="${l.href}" class="${isActive(l) ? "active" : ""}">${l.label}</a>${children}`;
    }).join("");

  mount.innerHTML = `
    <div class="banner">Handmade, made-to-order art · Ships across India · <a href="story-frame.html" style="text-decoration:underline;">Start a custom "Story in a Frame"</a></div>
    <header class="site-header">
      <div class="container header-row">
        <a href="index.html" class="logo">${BRAND.name}<span class="dot">.</span></a>
        <nav class="nav-links">${desktopLinkHtml()}</nav>
        <div class="header-actions">
          <button class="cart-btn" onclick="openCart()">🛍 Cart <span class="cart-count" data-cart-count>0</span></button>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>
      <div class="mobile-menu" id="mobileMenu">${mobileLinkHtml()}</div>
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
            <h4>Expressions</h4>
            <ul>
              <li><a href="expressions.html">All Expressions</a></li>
              <li><a href="prints.html">Downloadable & Framed Prints</a></li>
              <li><a href="motivation.html">Motivation Word Art</a></li>
            </ul>
          </div>
          <div>
            <h4>Inspiration</h4>
            <ul>
              <li><a href="inspiration.html">All Inspiration</a></li>
              <li><a href="alphabets.html">Custom Alphabets</a></li>
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
