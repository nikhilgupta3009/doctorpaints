/* ===================================================================
   More by Shilpi — dedicated product page for a single Original Art piece
   =================================================================== */

function renderProductPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  const p = ORIGINAL_ART.find((x) => x.id === id);
  if (!p) {
    window.location.href = "expressions.html";
    return;
  }

  document.title = `${p.title} — More by Shilpi`;
  document.getElementById("productCrumb").textContent = `/ ${p.title}`;

  const art = document.getElementById("productArt");
  art.className = `art-block ${p.art} ${p.image ? "has-img" : ""}`;
  art.style.borderRadius = "14px";
  art.style.aspectRatio = "4/5";
  art.innerHTML = p.image
    ? `<img src="${p.image}" alt="${p.title}">`
    : `<span>${p.title}</span>`;

  if (p.isNew) document.getElementById("productNewBadge").style.display = "inline-block";
  document.getElementById("productTitle").textContent = p.title;
  document.getElementById("productMedium").textContent = p.medium;
  document.getElementById("productPrice").textContent = p.status === "sold" ? "Sold" : money(p.price);

  const waBtn = document.getElementById("productWaBtn");
  if (p.status === "sold") {
    waBtn.textContent = "Ask About Similar Pieces";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! "${p.title}" looks sold — do you have anything similar, or can you paint me something like it?`)}`;
  } else {
    waBtn.textContent = "Enquire on WhatsApp";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'm interested in the original "${p.title}" (${p.medium}, ${money(p.price)}). Is it still available?`)}`;
  }
}

document.addEventListener("DOMContentLoaded", renderProductPage);
