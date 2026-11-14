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
  const mainSrc = (p.images && p.images[0]) || p.image;
  art.innerHTML = mainSrc
    ? `<img src="${mainSrc}" alt="${p.title}">`
    : `<span>${p.title}</span>`;
  art.classList.toggle("fit-whole", (p.wholeImages || []).includes(mainSrc));

  if (p.images && p.images.length > 1) {
    art.style.aspectRatio = "3/4";
    const thumbs = document.getElementById("productThumbs");
    thumbs.innerHTML = p.images
      .map(
        (src, i) =>
          `<button type="button" class="${i === 0 ? "active" : ""}" data-src="${src}" aria-label="View image ${i + 1} of ${p.images.length}"><img src="${src}" alt=""></button>`
      )
      .join("");
    thumbs.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      art.querySelector("img").src = btn.dataset.src;
      art.classList.toggle("fit-whole", (p.wholeImages || []).includes(btn.dataset.src));
      thumbs.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    });
  }

  if (p.isNew) document.getElementById("productNewBadge").style.display = "inline-block";
  document.getElementById("productTitle").textContent = p.title;
  const mediumEl = document.getElementById("productMedium");
  if (p.medium) mediumEl.textContent = p.medium;
  else mediumEl.remove();
  const priceEl = document.getElementById("productPrice");
  let selectedSize = p.sizes ? p.sizes[0] : null;
  const currentPrice = () => (selectedSize ? selectedSize.price : p.price);
  priceEl.textContent = p.status === "sold" ? "Sold" : money(currentPrice());

  if (p.priceNote) {
    const noteEl = document.getElementById("productPriceNote");
    noteEl.textContent = p.priceNote;
    noteEl.style.display = "";
  }

  const desc = document.getElementById("productDesc");
  if (p.bullets) {
    desc.className = "product-desc";
    desc.innerHTML = `<ul>${p.bullets.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  } else if (p.description) {
    desc.innerHTML = p.description.map((t) => `<p>${t}</p>`).join("");
  } else {
    desc.remove();
  }

  document.getElementById("productNote").textContent = section.custom
    ? "Each piece is made to order around your story. Message us on WhatsApp with the details and we'll confirm the design, timeline and delivery."
    : "This is a one-of-a-kind original — only one exists. We'll confirm availability and shipping/Porter delivery on WhatsApp.";

  const waBtn = document.getElementById("productWaBtn");
  const updateWaLink = () => {
    const sizeText = selectedSize ? `${selectedSize.label}, simple frame, ` : "";
    if (p.status === "sold") {
      waBtn.textContent = "Ask About Similar Pieces";
      waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! "${p.title}" looks sold — do you have anything similar, or can you paint me something like it?`)}`;
    } else if (section.custom) {
      waBtn.textContent = "Customise on WhatsApp";
      waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'd love a personalised "${p.title}" piece (${sizeText}${money(currentPrice())}). Can we talk about the details?`)}`;
    } else {
      waBtn.textContent = "Enquire on WhatsApp";
      waBtn.href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.name}! I'm interested in the original "${p.title}" (${[p.medium, money(p.price)].filter(Boolean).join(", ")}). Is it still available?`)}`;
    }
  };
  updateWaLink();

  if (p.sizes && p.status !== "sold") {
    const sizesEl = document.getElementById("productSizes");
    const optionsEl = document.getElementById("productSizeOptions");
    optionsEl.innerHTML = p.sizes
      .map(
        (s, i) =>
          `<button type="button" class="${i === 0 ? "active" : ""}" data-size="${s.id}">${s.label}<small>${s.dims}</small></button>`
      )
      .join("");
    sizesEl.style.display = "";
    optionsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      selectedSize = p.sizes.find((s) => s.id === btn.dataset.size);
      optionsEl.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      priceEl.textContent = money(currentPrice());
      updateWaLink();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderProductPage);
