/* ===================================================================
   More by Shilpi — "Your Story in a Frame" enquiry form
   No backend: compiles the brief into a WhatsApp / email message.
   =================================================================== */

const STORY_SWATCHES = ["#7c2d3b", "#4a5940", "#a9834a", "#5c4468", "#2b5164", "#86485a", "#211d19", "#f6f1e6"];
let storySelectedColor = null;

function renderStorySwatches() {
  const el = document.getElementById("sSwatches");
  if (!el) return;
  el.innerHTML = STORY_SWATCHES.map(
    (c) => `<div class="swatch" style="background:${c};box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);" data-color="${c}" onclick="storySetColor('${c}')"></div>`
  ).join("");
}

function storySetColor(c) {
  storySelectedColor = c;
  document.querySelectorAll("#sSwatches .swatch").forEach((s) => {
    s.classList.toggle("selected", s.dataset.color === c);
  });
}

function buildStoryMessage() {
  const name = document.getElementById("sName").value.trim();
  const contact = document.getElementById("sContact").value.trim();
  const occasion = document.getElementById("sOccasion").value;
  const story = document.getElementById("sStory").value.trim();
  const elements = Array.from(document.querySelectorAll("#sElements input:checked")).map((c) => c.value);
  const size = document.getElementById("sSize").selectedOptions[0].textContent;
  const format = document.getElementById("sFormat").selectedOptions[0].textContent;
  const notes = document.getElementById("sNotes").value.trim();

  let msg = `Hi ${BRAND.name}! I'd like to start a "Your Story in a Frame" piece.\n\n`;
  if (name) msg += `Name: ${name}\n`;
  if (contact) msg += `Contact: ${contact}\n`;
  msg += `Occasion: ${occasion}\n`;
  msg += `Size: ${size}\nFormat: ${format}\n`;
  if (storySelectedColor) msg += `Colour preference: ${storySelectedColor}\n`;
  if (elements.length) msg += `Elements to include: ${elements.join(", ")}\n`;
  if (story) msg += `\nOur story:\n${story}\n`;
  if (notes) msg += `\nOther notes:\n${notes}\n`;
  return msg;
}

function submitStoryForm() {
  const story = document.getElementById("sStory").value.trim();
  if (!story) {
    document.getElementById("sStory").focus();
    showToast("Tell us a little about your story first ✍️");
    return;
  }
  const msg = buildStoryMessage();
  const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  renderStorySwatches();
  const emailLink = document.getElementById("storyEmailLink");
  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      const msg = buildStoryMessage();
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent("Your Story in a Frame — custom order")}&body=${encodeURIComponent(msg)}`;
    });
  }
});
