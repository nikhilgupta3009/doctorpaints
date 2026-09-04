/* ===================================================================
   More by Shilpi — Expressions grid + Quick View modal
   One-of-a-kind physical pieces: no cart add, WhatsApp enquiry instead.
   =================================================================== */

function renderOriginalArtGrid() {
  const grid = document.getElementById("originalArtGrid");
  if (!grid) return;
  grid.innerHTML = ORIGINAL_ART.map(
    (p) => `
    <div class="cat-card pcard" onclick="openOaModal('${p.id}')" style="cursor:pointer;">
      ${p.isNew ? '<span class="badge-new">New</span>' : ""}
      ${p.status === "sold" ? '<span class="badge-sold">Sold</span>' : ""}
      <div class="art-block ${p.art}"><span>${p.title}</span></div>
      <div class="quick-view-layer"><span class="quick-view-pill">Quick View</span></div>
      <div class="cat-body">
        <h3>${p.title}</h3>
        <p style="font-size:.85rem;">${p.medium}</p>
        <div class="price-line">${p.status === "sold" ? '<span class="sold-label">Sold</span>' : `<span></span><span>${money(p.price)}</span>`}</div>
      </div>
    </div>`
  ).join("");
}

function openOaModal(id) {
  const p = ORIGINAL_ART.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("oaTitle").textContent = p.title;
  document.getElementById("oaArt").className = `art-block ${p.art}`;
  document.getElementById("oaArtLabel").textContent = p.title;
  document.getElementById("oaMedium").textContent = p.medium;
  document.getElementById("oaPrice").textContent = p.status === "sold" ? "Sold" : money(p.price);

  const waBtn = document.getElementById("oaWaBtn");
  if (p.status === "sold") {
    waBtn.textContent = "Ask About Similar Pieces";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! "${p.title}" looks sold — do you have anything similar, or can you paint me something like it?`)}`;
  } else {
    waBtn.textContent = "Enquire on WhatsApp";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'm interested in the original "${p.title}" (${p.medium}, ${money(p.price)}). Is it still available?`)}`;
  }

  document.getElementById("oaModal").classList.add("open");
  document.getElementById("oaOverlay").classList.add("open");
}

function closeOaModal() {
  document.getElementById("oaModal")?.classList.remove("open");
  document.getElementById("oaOverlay")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", renderOriginalArtGrid);
