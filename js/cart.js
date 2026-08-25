/* ===================================================================
   Doctor Paints — cart (localStorage based, WhatsApp checkout)
   No payment gateway yet: the cart builds an itemised order summary
   and hands it to the buyer's WhatsApp to confirm & pay manually.
   =================================================================== */

const CART_KEY = "dp_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCart();
}

function addToCart(item) {
  // item: { key, title, meta, price, art, qty }
  const items = getCart();
  const existing = items.find((i) => i.key === item.key);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    items.push({ ...item, qty: item.qty || 1 });
  }
  saveCart(items);
  openCart();
  showToast(`Added "${item.title}" to your cart`);
}

function removeFromCart(key) {
  saveCart(getCart().filter((i) => i.key !== key));
}

function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function renderCart() {
  const countEls = document.querySelectorAll("[data-cart-count]");
  countEls.forEach((el) => (el.textContent = cartCount()));

  const list = document.getElementById("cartItems");
  const foot = document.getElementById("cartFoot");
  if (!list) return;

  const items = getCart();
  if (items.length === 0) {
    list.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Browse our <a href="prints.html" style="color:var(--terracotta);font-weight:600;">prints</a> or <a href="alphabets.html" style="color:var(--terracotta);font-weight:600;">custom alphabets</a> to get started.</div>`;
    if (foot) foot.style.display = "none";
    return;
  }
  if (foot) foot.style.display = "block";

  list.innerHTML = items
    .map(
      (i) => `
    <div class="cart-line">
      <div class="art-block thumb ${i.art || "art--1"}"></div>
      <div class="meta">
        <h4>${i.title}</h4>
        <div class="opts">${i.meta || ""}${i.qty > 1 ? ` · Qty ${i.qty}` : ""}</div>
        <button class="remove" onclick="removeFromCart('${i.key}')">Remove</button>
      </div>
      <div class="line-price">${money(i.price * i.qty)}</div>
    </div>`
    )
    .join("");

  const subtotalEl = document.getElementById("cartSubtotal");
  if (subtotalEl) subtotalEl.textContent = money(cartTotal());
}

function openCart() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

function checkoutOnWhatsApp() {
  const items = getCart();
  if (items.length === 0) return;
  let msg = `Hi Doctor Paints! I'd like to order:\n\n`;
  items.forEach((i) => {
    msg += `• ${i.title}${i.meta ? " (" + i.meta + ")" : ""} x${i.qty} — ${money(i.price * i.qty)}\n`;
  });
  msg += `\nSubtotal: ${money(cartTotal())}\n(Delivery / Porter charges to be confirmed for physical items.)`;
  const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", renderCart);
