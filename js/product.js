/* ===================================================================
   More by Shilpi — dedicated product page for a single piece
   (Through my eyes originals or Art that starts with your story)
   =================================================================== */

function renderProductPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  let p = ORIGINAL_ART.find((x) => x.id === id);
  let section = { label: "Through my eyes", href: "expressions.html", bucket: "expressions", custom: false };
  if (!p) {
    p = STORY_ART.find((x) => x.id === id);
    section = { label: "Art that starts with your story", href: "inspirations.html", bucket: "inspirations", custom: true };
  }
  if (!p) {
    window.location.href = "expressions.html";
    return;
  }

  document.body.dataset.bucket = section.bucket;
  document.title = `${p.title} — More by Shilpi`;
  const crumb = document.getElementById("productSectionLink");
  crumb.textContent = section.label;
  crumb.href = section.href;
  document.getElementById("productCrumb").textContent = `/ ${p.title}`;
  const back = document.getElementById("productBackLink");
  back.textContent = `← Back to ${section.label}`;
  back.href = section.href;

  const art = document.getElementById("productArt");
  art.className = `art-block ${p.art} ${p.image ? "has-img" : ""}`;
  art.innerHTML = p.image
    ? `<img src="${p.image}" alt="${p.title}">`
    : `<span>${p.title}</span>`;

  if (p.isNew) document.getElementById("productNewBadge").style.display = "inline-block";
  document.getElementById("productTitle").textContent = p.title;
  document.getElementById("productMedium").textContent = p.medium;
  document.getElementById("productPrice").textContent = p.status === "sold" ? "Sold" : money(p.price);

  const desc = document.getElementById("productDesc");
  if (p.description) {
    desc.innerHTML = p.description.map((t) => `<p>${t}</p>`).join("");
  } else {
    desc.remove();
  }

  document.getElementById("productNote").textContent = section.custom
    ? "Each piece is made to order around your story. Message us on WhatsApp with the details and we'll confirm the design, timeline and delivery."
    : "This is a one-of-a-kind original — only one exists. We'll confirm availability and shipping/Porter delivery on WhatsApp.";

  const waBtn = document.getElementById("productWaBtn");
  if (p.status === "sold") {
    waBtn.textContent = "Ask About Similar Pieces";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! "${p.title}" looks sold — do you have anything similar, or can you paint me something like it?`)}`;
  } else if (section.custom) {
    waBtn.textContent = "Customise on WhatsApp";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'd love a personalised "${p.title}" piece (${money(p.price)}). Can we talk about the details?`)}`;
  } else {
    waBtn.textContent = "Enquire on WhatsApp";
    waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'm interested in the original "${p.title}" (${p.medium}, ${money(p.price)}). Is it still available?`)}`;
  }
}

document.addEventListener("DOMContentLoaded", renderProductPage);
