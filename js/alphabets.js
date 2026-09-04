/* ===================================================================
   More by Shilpi — customized alphabets: tier compare + order builder
   =================================================================== */

let alphaState = { tier: ALPHABET_TIERS[1].id, qty: 1, color: "#7c2d3b" };

const SWATCHES = ["#7c2d3b", "#4a5940", "#a9834a", "#5c4468", "#2b5164", "#211d19"];

function renderTierCompare() {
  const el = document.getElementById("tierCompare");
  if (!el) return;
  el.innerHTML = ALPHABET_TIERS.map(
    (t) => `
    <div class="tier-card ${t.featured ? "featured" : ""}">
      ${t.featured ? '<span class="pill pill--gold" style="position:absolute;top:-12px;">Most popular</span>' : ""}
      <h3>${t.name}</h3>
      <p style="font-size:.88rem;">${t.blurb}</p>
      <div class="tier-price">${money(t.price)} <span>/ ${t.unit}</span></div>
      <ul>${t.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="btn btn--outline btn--block" onclick="alphaSetTier('${t.id}')">Choose ${t.name}</button>
    </div>`
  ).join("");
}

function renderAlphaGallery() {
  const el = document.getElementById("alphaGallery");
  if (!el) return;
  el.innerHTML = ALPHA_GALLERY.map(
    (g) => `
    <div class="cat-card">
      <div class="art-block has-img"><img src="${g.image}" alt="${g.caption}" loading="lazy"></div>
      <div class="cat-body"><p style="font-size:.85rem;margin:0;">${g.caption}</p></div>
    </div>`
  ).join("");
}

function renderSwatches() {
  const el = document.getElementById("alphaSwatches");
  if (!el) return;
  el.innerHTML = SWATCHES.map(
    (c) => `<div class="swatch" style="background:${c};" data-color="${c}" onclick="alphaSetColor('${c}')"></div>`
  ).join("");
}

function alphaSetTier(id) {
  alphaState.tier = id;
  alphaRefresh();
  document.getElementById("alphaTierRow")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
function alphaSetColor(c) {
  alphaState.color = c;
  alphaRefresh();
}
function alphaChangeQty(delta) {
  alphaState.qty = Math.max(1, alphaState.qty + delta);
  alphaRefresh();
}

function alphaRefresh() {
  const tier = ALPHABET_TIERS.find((t) => t.id === alphaState.tier);

  document.getElementById("alphaTierRow").innerHTML = ALPHABET_TIERS.map(
    (t) =>
      `<div class="chip" data-tier="${t.id}" onclick="alphaSetTier('${t.id}')">${t.name}<small>${money(t.price)}/letter</small></div>`
  ).join("");
  document.querySelectorAll("#alphaTierRow .chip").forEach((c) => {
    c.classList.toggle("selected", c.dataset.tier === alphaState.tier);
  });

  document.querySelectorAll("#alphaSwatches .swatch").forEach((s) => {
    s.classList.toggle("selected", s.dataset.color === alphaState.color);
  });

  document.getElementById("alphaQty").value = alphaState.qty;
  document.getElementById("alphaMotifField").style.display = tier.id === "basic" ? "none" : "block";

  const preview = document.getElementById("alphaPreview");
  if (preview) {
    preview.style.background = alphaState.color;
    const word = document.getElementById("alphaWord")?.value.trim();
    preview.querySelector("span").textContent = word ? word.toUpperCase() : "Your custom letter";
  }

  document.getElementById("alphaPrice").textContent = money(tier.price * alphaState.qty);
}

function alphaAddToCart() {
  const tier = ALPHABET_TIERS.find((t) => t.id === alphaState.tier);
  const word = document.getElementById("alphaWord").value.trim() || "—";
  const motif = document.getElementById("alphaMotif").value.trim();
  const notes = document.getElementById("alphaNotes").value.trim();

  const metaParts = [`"${word}"`, `Colour ${alphaState.color}`];
  if (motif) metaParts.push(`Motif: ${motif}`);
  if (notes) metaParts.push(`Note: ${notes}`);

  addToCart({
    key: `alpha-${tier.id}-${word}-${Date.now()}`,
    title: `${tier.name} Alphabet`,
    meta: metaParts.join(" · "),
    price: tier.price,
    art: "art--3",
    qty: alphaState.qty,
  });

  document.getElementById("alphaWord").value = "";
  document.getElementById("alphaMotif").value = "";
  document.getElementById("alphaNotes").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderTierCompare();
  renderAlphaGallery();
  renderSwatches();
  alphaRefresh();
  document.getElementById("alphaWord")?.addEventListener("input", alphaRefresh);
});
