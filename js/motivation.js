/* ===================================================================
   Doctor Paints — motivation word art listing + configurator modal
   (mirrors js/prints.js, pricing driven by MOTIVATION_PRICING)
   =================================================================== */

let pmState = { word: null, format: "digital", size: "a4", qty: 1 };

const FORMAT_LABELS = {
  digital: { label: "Digital Download", small: "Instant delivery" },
  print: { label: "Printed Only", small: "+ delivery" },
  framed: { label: "Framed & Printed", small: "+ delivery" },
};

function renderMotivationGrid() {
  const grid = document.getElementById("motivationGrid");
  if (!grid) return;
  grid.innerHTML = MOTIVATION_WORDS.map(
    (w) => `
    <div class="cat-card" onclick="openWordModal('${w.word}')" style="cursor:pointer;">
      <div class="art-block ${w.art}"><span>${w.word}</span></div>
      <div class="cat-body">
        <span class="pill">Word art</span>
        <h3>${w.word}</h3>
        <div class="price-line"><span class="price-from">Digital from</span><span>${money(MOTIVATION_PRICING.priceDigital.a4)}</span></div>
      </div>
    </div>`
  ).join("");

  const waBtn = document.getElementById("motivationWaBtn");
  if (waBtn) waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Doctor Paints! I'd like a custom word art piece — the word is: ")}`;
}

function priceForWord(format, size) {
  if (format === "digital") return MOTIVATION_PRICING.priceDigital[size];
  if (format === "print") return MOTIVATION_PRICING.pricePrintOnly[size];
  return MOTIVATION_PRICING.priceFramed[size];
}

function openWordModal(word) {
  const item = MOTIVATION_WORDS.find((w) => w.word === word);
  if (!item) return;
  pmState = { word: item.word, art: item.art, format: "digital", size: "a4", qty: 1 };

  document.getElementById("pmTitle").textContent = item.word;
  document.getElementById("pmArt").className = `art-block ${item.art}`;
  document.getElementById("pmArtLabel").textContent = item.word;

  document.getElementById("pmFormatRow").innerHTML = Object.keys(FORMAT_LABELS)
    .map(
      (f) =>
        `<div class="chip" data-format="${f}" onclick="pmSetFormat('${f}')">${FORMAT_LABELS[f].label}<small>${FORMAT_LABELS[f].small}</small></div>`
    )
    .join("");

  document.getElementById("pmSizeRow").innerHTML = PAPER_GUIDE.sizes
    .map(
      (s) =>
        `<div class="chip" data-size="${s.id}" onclick="pmSetSize('${s.id}')">${s.label}<small>${s.dims}</small></div>`
    )
    .join("");

  document.getElementById("pmQty").value = 1;
  pmRefresh();
  document.getElementById("printModal").classList.add("open");
  document.getElementById("printOverlay").classList.add("open");
}

function closePrintModal() {
  document.getElementById("printModal")?.classList.remove("open");
  document.getElementById("printOverlay")?.classList.remove("open");
}
function pmSetFormat(f) {
  pmState.format = f;
  pmRefresh();
}
function pmSetSize(s) {
  pmState.size = s;
  pmRefresh();
}
function pmChangeQty(delta) {
  pmState.qty = Math.max(1, pmState.qty + delta);
  pmRefresh();
}

function pmRefresh() {
  document.querySelectorAll("#pmFormatRow .chip").forEach((c) => {
    c.classList.toggle("selected", c.dataset.format === pmState.format);
  });
  document.querySelectorAll("#pmSizeRow .chip").forEach((c) => {
    c.classList.toggle("selected", c.dataset.size === pmState.size);
  });
  document.getElementById("pmQty").value = pmState.qty;

  const noteEl = document.getElementById("pmPorterNote");
  if (pmState.format === "digital") {
    noteEl.style.display = "none";
  } else {
    noteEl.style.display = "block";
    noteEl.innerHTML = `<strong>Delivery:</strong> ${PORTER_NOTE}`;
  }

  const unit = priceForWord(pmState.format, pmState.size);
  document.getElementById("pmPrice").textContent = money(unit * pmState.qty);
}

function pmAddToCart() {
  const { word, art, format, size, qty } = pmState;
  const unit = priceForWord(format, size);
  const key = `word-${word}-${format}-${size}`;
  addToCart({
    key,
    title: `"${word}" Word Art`,
    meta: `${FORMAT_LABELS[format].label} · ${size.toUpperCase()}`,
    price: unit,
    art,
    qty,
  });
  closePrintModal();
}

document.addEventListener("DOMContentLoaded", renderMotivationGrid);
