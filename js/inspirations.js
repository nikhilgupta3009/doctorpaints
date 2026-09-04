/* ===================================================================
   More by Shilpi — Inspirations page: Prints + Word Art grids,
   sharing one configurator modal (format + size + qty).
   =================================================================== */

let pmState = { item: null, format: "digital", size: "a4", qty: 1 };

const FORMAT_LABELS = {
  digital: { label: "Digital Download", small: "Instant delivery" },
  print: { label: "Printed Only", small: "+ delivery" },
  framed: { label: "Framed & Printed", small: "+ delivery" },
};

function renderPrintsGrid() {
  const grid = document.getElementById("printsGrid");
  if (!grid) return;
  grid.innerHTML = PRINTS.map(
    (p) => `
    <div class="cat-card pcard" onclick="openItemModal('print', '${p.id}')" style="cursor:pointer;">
      <span class="badge-new">New</span>
      <div class="art-block ${p.art}"><span>${p.title}</span></div>
      <div class="quick-view-layer"><span class="quick-view-pill">Quick View</span></div>
      <div class="cat-body">
        <span class="pill">${p.tags[0] || "Print"}</span>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="price-line"><span class="price-from">Digital from</span><span>${money(p.priceDigital.a4)}</span></div>
      </div>
    </div>`
  ).join("");
}

function renderMotivationGrid() {
  const grid = document.getElementById("motivationGrid");
  if (!grid) return;
  grid.innerHTML = MOTIVATION_WORDS.map(
    (w) => `
    <div class="cat-card pcard" onclick="openItemModal('word', '${w.word}')" style="cursor:pointer;">
      <span class="badge-new">New</span>
      <div class="art-block ${w.art}"><span>${w.word}</span></div>
      <div class="quick-view-layer"><span class="quick-view-pill">Quick View</span></div>
      <div class="cat-body">
        <span class="pill">Word art</span>
        <h3>${w.word}</h3>
        <div class="price-line"><span class="price-from">Digital from</span><span>${money(MOTIVATION_PRICING.priceDigital.a4)}</span></div>
      </div>
    </div>`
  ).join("");
}

function renderPaperGuide() {
  const el = document.getElementById("paperGuide");
  if (!el) return;
  el.innerHTML = PAPER_GUIDE.paper
    .map((g) => `<div class="g-item"><h4>${g.title}</h4><p style="margin:0;">${g.body}</p></div>`)
    .join("");
  const note = document.getElementById("porterNote");
  if (note) note.innerHTML = `<strong>Delivery note:</strong> ${PORTER_NOTE}`;
}

function priceFor(item, format, size) {
  const pricing =
    item.kind === "print"
      ? item
      : { priceDigital: MOTIVATION_PRICING.priceDigital, pricePrintOnly: MOTIVATION_PRICING.pricePrintOnly, priceFramed: MOTIVATION_PRICING.priceFramed };
  if (format === "digital") return pricing.priceDigital[size];
  if (format === "print") return pricing.pricePrintOnly[size];
  return pricing.priceFramed[size];
}

function openItemModal(kind, idOrWord) {
  let item;
  if (kind === "print") {
    const p = PRINTS.find((x) => x.id === idOrWord);
    item = { kind: "print", title: p.title, art: p.art, blurb: p.blurb, priceDigital: p.priceDigital, pricePrintOnly: p.pricePrintOnly, priceFramed: p.priceFramed, refId: p.id };
  } else {
    const w = MOTIVATION_WORDS.find((x) => x.word === idOrWord);
    item = { kind: "word", title: `"${w.word}" Word Art`, art: w.art, blurb: "Bold hand-lettered word art, printed exactly the way it was painted.", refId: w.word };
  }
  pmState = { item, format: "digital", size: "a4", qty: 1 };

  document.getElementById("pmTitle").textContent = item.title;
  document.getElementById("pmArt").className = `art-block ${item.art}`;
  document.getElementById("pmArtLabel").textContent = item.title;
  document.getElementById("pmBlurb").textContent = item.blurb;

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

  const unit = priceFor(pmState.item, pmState.format, pmState.size);
  document.getElementById("pmPrice").textContent = money(unit * pmState.qty);
}

function pmAddToCart() {
  const { item, format, size, qty } = pmState;
  const unit = priceFor(item, format, size);
  const key = `${item.kind}-${item.refId}-${format}-${size}`;
  addToCart({
    key,
    title: item.title,
    meta: `${FORMAT_LABELS[format].label} · ${size.toUpperCase()}`,
    price: unit,
    art: item.art,
    qty,
  });
  closePrintModal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPrintsGrid();
  renderMotivationGrid();
  renderPaperGuide();
});
