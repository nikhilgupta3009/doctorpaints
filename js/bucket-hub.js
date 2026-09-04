/* ===================================================================
   Doctor Paints — Expressions / Inspiration hub pages
   Renders the bucket intro + its two sub-sections from BUCKETS in data.js
   =================================================================== */

function renderBucketHub() {
  const bucket = BUCKETS.find((b) => b.key === document.body.dataset.page);
  if (!bucket) return;

  document.getElementById("bucketEyebrow").textContent = bucket.eyebrow;
  document.getElementById("bucketTitle").textContent = bucket.tagline;
  document.getElementById("bucketBlurb").textContent = bucket.blurb;
  document.getElementById("bucketHeroArt").className = `hero-art ${bucket.art}`;

  document.getElementById("bucketChildren").innerHTML = bucket.children
    .map(
      (c) => `
    <a href="${c.href}" class="cat-card">
      <div class="art-block ${c.art}"><span>${c.label}</span></div>
      <div class="cat-body">
        <h3>${c.label}</h3>
        <p>${c.blurb}</p>
        <div class="price-line"><span class="price-from">From</span><span>${money(c.priceFrom)}</span></div>
      </div>
    </a>`
    )
    .join("");

  const other = BUCKETS.find((b) => b.key !== bucket.key);
  const otherLink = document.getElementById("bucketOtherLink");
  if (otherLink && other) {
    otherLink.href = other.href;
    otherLink.textContent = `Looking for ${other.label} instead? →`;
  }
}

document.addEventListener("DOMContentLoaded", renderBucketHub);
