/* ===================================================================
   Doctor Paints — prints listing + configurator modal
   =================================================================== */

let pmState = { print: null, format: "digital", size: "a4", qty: 1 };

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
    <div class="cat-card" onclick="openPrintModal('${p.id}')" style="cursor:pointer;">
      <div class="art-block ${p.art}"><span>${p.title}</span></div>
      <div class="cat-body">
        <span class="pill">${p.tags[0] || "Print"}</span>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="price-line"><span class="price-from">Digital from</span><span>${money(p.priceDigital.a4)}</span></div>
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

function priceFor(print, format, size) {
  if (format === "digital") return print.priceDigital[size];
  if (format === "print") return print.pricePrintOnly[size];
  return print.priceFramed[size];
}

function openPrintModal(id) {
  const print = PRINTS.find((p) => p.id === id);
  if (!print) return;
  pmState = { print, format: "digital", size: "a4", qty: 1 };
  document.getElementById("pmTitle").textContent = print.title;
  document.getElementById("pmArt").className = `art-block ${print.art}`;
  document.getElementById("pmArtLabel").textContent = print.title;
  document.getElementById("pmBlurb").textContent = print.blurb;

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

  const unit = priceFor(pmState.print, pmState.format, pmState.size);
  document.getElementById("pmPrice").textContent = money(unit * pmState.qty);
}

function pmAddToCart() {
  const { print, format, size, qty } = pmState;
  const unit = priceFor(print, format, size);
  const key = `print-${print.id}-${format}-${size}`;
  addToCart({
    key,
    title: print.title,
    meta: `${FORMAT_LABELS[format].label} · ${size.toUpperCase()}`,
    price: unit,
    art: print.art,
    qty,
  });
  closePrintModal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPrintsGrid();
  renderPaperGuide();
});
