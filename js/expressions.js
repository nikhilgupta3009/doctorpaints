/* ===================================================================
   More by Shilpi — Expressions grid
   One-of-a-kind physical pieces: each card links to its own product page.
   =================================================================== */

function renderOriginalArtGrid() {
  const grid = document.getElementById("originalArtGrid");
  if (!grid) return;
  grid.innerHTML = ORIGINAL_ART.map(
    (p) => `
    <a href="product.html?id=${p.id}" class="cat-card pcard">
      ${p.isNew ? '<span class="badge-new">New</span>' : ""}
      ${p.status === "sold" ? '<span class="badge-sold">Sold</span>' : ""}
      <div class="art-block ${p.art} ${p.image ? "has-img" : ""}">${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `<span>${p.title}</span>`}</div>
      <div class="cat-body">
        <h3>${p.title}</h3>
        <p style="font-size:.85rem;">${p.medium}</p>
        <div class="price-line">${p.status === "sold" ? '<span class="sold-label">Sold</span>' : `<span></span><span>${money(p.price)}</span>`}</div>
      </div>
    </a>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", renderOriginalArtGrid);
