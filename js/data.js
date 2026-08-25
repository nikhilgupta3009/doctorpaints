/* ===================================================================
   Doctor Paints — shared data
   Edit prices, products and contact info here — every page reads
   from this single file so numbers stay consistent site-wide.
   =================================================================== */

const BRAND = {
  name: "Doctor Paints",
  whatsapp: "919999999999",   // TODO: replace with real WhatsApp number (country code + number, no +)
  email: "hello@doctorpaints.in", // TODO: replace with real inbox
  instagram: "https://instagram.com/doctorpaints",
  address: "Ships pan-India · Local hand-delivery via Porter in select cities",
};

// ---- Paper & size guide used across downloadable prints -----------
const PAPER_GUIDE = {
  sizes: [
    { id: "a4", label: "A4", dims: "21 x 29.7 cm (8.3 x 11.7 in)", desc: "Fits standard photo frames, great for desks & shelves." },
    { id: "a3", label: "A3", dims: "29.7 x 42 cm (11.7 x 16.5 in)", desc: "Statement size for a gallery wall or above furniture." },
  ],
  paper: [
    { title: "At-home / local printer", body: "200–220 GSM matte or lightly textured paper reproduces our brush and pencil work best. Avoid glossy photo paper — it flattens the hand-drawn texture." },
    { title: "Professional print lab", body: "Ask for 250–300 GSM archival matte or cold-press cotton paper, sRGB colour profile, borderless / actual size (no \"fit to page\")." },
    { title: "What you receive", body: "A print-ready, high-resolution PDF and JPG at 300 DPI, sized exactly to your chosen dimension, sent instantly after checkout." },
  ],
};

// ---- Downloadable / printable / framed art prints ------------------
const PRINTS = [
  {
    id: "sunlit-balcony",
    title: "Sunlit Balcony",
    art: "art--1",
    tags: ["Watercolour", "Bestseller"],
    blurb: "A warm watercolour study of a plant-filled balcony in late afternoon light.",
    priceDigital: { a4: 299, a3: 499 },
    pricePrintOnly: { a4: 599, a3: 899 },
    priceFramed: { a4: 1299, a3: 1799 },
  },
  {
    id: "mountain-morning",
    title: "Mountain Morning",
    art: "art--5",
    tags: ["Ink & wash"],
    blurb: "Layered peaks in soft indigo ink wash — calm and minimal.",
    priceDigital: { a4: 299, a3: 499 },
    pricePrintOnly: { a4: 599, a3: 899 },
    priceFramed: { a4: 1299, a3: 1799 },
  },
  {
    id: "citrus-still-life",
    title: "Citrus Still Life",
    art: "art--3",
    tags: ["Gouache"],
    blurb: "A sun-bright still life of oranges and lemons on linen.",
    priceDigital: { a4: 299, a3: 499 },
    pricePrintOnly: { a4: 599, a3: 899 },
    priceFramed: { a4: 1299, a3: 1799 },
  },
  {
    id: "monsoon-window",
    title: "Monsoon Window",
    art: "art--6",
    tags: ["Watercolour"],
    blurb: "Rain-streaked glass and city lights, painted from memory.",
    priceDigital: { a4: 299, a3: 499 },
    pricePrintOnly: { a4: 599, a3: 899 },
    priceFramed: { a4: 1299, a3: 1799 },
  },
];

// ---- Customised alphabets tiers -------------------------------------
const ALPHABET_TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: 349,
    unit: "per letter",
    blurb: "A clean hand-lettered initial in your choice of one accent colour.",
    features: [
      "Single hand-painted letter",
      "1 accent colour of your choice",
      "A4 digital download or printed copy",
      "Delivered in 3–4 days",
    ],
  },
  {
    id: "customized",
    name: "Customized",
    price: 599,
    unit: "per letter",
    blurb: "Your letter filled with a small motif or pattern that means something to you.",
    features: [
      "Everything in Basic",
      "Choice of pattern / motif inside the letter (florals, dots, stripes, stars…)",
      "Name or date added below the letter",
      "Up to 2 rounds of revisions",
      "Delivered in 4–6 days",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium Customized",
    price: 999,
    unit: "per letter",
    blurb: "A fully illustrated letter built around your story — hobbies, pets, places, memories.",
    features: [
      "Everything in Customized",
      "Full hand-painted illustration inside & around the letter",
      "Multiple personal elements combined (up to 5)",
      "Concept sketch shared for approval before final art",
      "Unlimited revisions on the sketch stage",
      "Delivered in 7–10 days",
    ],
  },
];

// ---- Motivation word art --------------------------------------------
const MOTIVATION_WORDS = [
  { word: "RISE", art: "art--1" },
  { word: "INSPIRE", art: "art--2" },
  { word: "DREAM", art: "art--3" },
  { word: "BELIEVE", art: "art--4" },
  { word: "GROW", art: "art--5" },
  { word: "BREATHE", art: "art--6" },
];
const MOTIVATION_PRICING = {
  priceDigital: { a4: 349, a3: 549 },
  pricePrintOnly: { a4: 649, a3: 949 },
  priceFramed: { a4: 1349, a3: 1849 },
};

// ---- Porter / delivery note for physical (printed or framed) items --
const PORTER_NOTE = "Printed and framed pieces are packed flat and hand-delivered by Porter for safe handling in Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad & Chennai. Porter's fare depends on your exact pickup-to-drop distance, so we confirm the final delivery charge on WhatsApp before you pay — usually ₹80–₹250 within city limits. Outside these cities, we ship via a tracked courier at a flat ₹149.";
