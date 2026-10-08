/* ===================================================================
   More by Shilpi — shared data
   Edit prices, products and contact info here — every page reads
   from this single file so numbers stay consistent site-wide.
   =================================================================== */

const BRAND = {
  name: "More by Shilpi",
  whatsapp: "919999999999",   // TODO: replace with real WhatsApp number (country code + number, no +)
  email: "hello@morebyshilpi.in", // TODO: replace with real inbox
  instagram: "https://instagram.com/morebyshilpi",
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

// ---- Gallery of real past Custom Alphabet commissions ---------------
const ALPHA_GALLERY = [
  { image: "assets/images/alphabets/k-letter.jpg", caption: "Premium Customized — mosaic pattern-fill" },
  { image: "assets/images/alphabets/s-letter.jpg", caption: "Premium Customized — a gift for a debut author" },
  { image: "assets/images/alphabets/go-green.jpg", caption: "Customized — a short phrase, illustrated" },
  { image: "assets/images/alphabets/word-cloud.jpg", caption: "Customized — words chosen for a 40th anniversary" },
];

// ---- Porter / delivery note for physical (printed or framed) items --
const PORTER_NOTE = "Printed and framed pieces are packed flat and hand-delivered by Porter for safe handling in Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad & Chennai. Porter's fare depends on your exact pickup-to-drop distance, so we confirm the final delivery charge on WhatsApp before you pay — usually ₹80–₹250 within city limits. Outside these cities, we ship via a tracked courier at a flat ₹149.";

// ---- Expressions: one-of-a-kind ready paintings (not reproductions) --
const ORIGINAL_ART = [
  {
    id: "becoming",
    title: "Becoming",
    art: "art--1",
    image: "assets/images/expressions/becoming.webp",
    images: [
      "assets/images/expressions/becoming.webp",
      "assets/images/expressions/becoming-room.webp",
    ],
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available", // "available" | "sold"
    isNew: true,
    bullets: [
      "Somewhere between who we are and who we are yet to be, we are always becoming.",
      "Becoming is a quiet reflection of that journey — of change, growth, and the many little moments that shape us along the way. The shifting forms come together gradually, much like life itself: imperfect, evolving, and finding its own rhythm.",
      "A piece about embracing where you are, while gently making space for who you are becoming.",
      "I loved watching this piece slowly take shape and it grew on me as I created it. I hope it grows on you too, and becomes something that comforts you and feels quietly yours.",
    ],
  },
  {
    id: "entangled-rhythms",
    title: "Entangled Rhythms",
    art: "art--2",
    image: "assets/images/expressions/entangled-rhythm.jpg",
    images: [
      "assets/images/expressions/entangled-rhythm.jpg",
      "assets/images/expressions/entangled-rhythms-room.webp",
    ],
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available",
    isNew: true,
    bullets: [
      "Life has a way of bringing different things together — people, moments, thoughts and experiences — sometimes gently, sometimes all at once. Entangled Rhythms is inspired by those connections and the quiet patterns they create in our lives.",
      "The lines weave, cross and move alongside one another, each following its own rhythm while becoming part of something larger.",
      "I enjoyed letting this piece unfold without knowing exactly where each line would lead. Perhaps that is part of what makes it feel alive. Hope this piece brings warmth to your space too!",
    ],
  },
  {
    id: "interwoven",
    title: "Interwoven",
    art: "art--3",
    image: "assets/images/expressions/interwoven.jpg",
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available",
    isNew: true,
  },
  {
    id: "the-world-within",
    title: "The World Within",
    art: "art--4",
    image: "assets/images/expressions/world-within.jpg",
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available",
    isNew: true,
  },
  {
    id: "the-passage",
    title: "The Passage",
    art: "art--1",
    image: "assets/images/expressions/the-passage.png",
    images: [
      "assets/images/expressions/the-passage.png",
      "assets/images/expressions/the-passage-room.webp",
    ],
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available",
    isNew: true,
    bullets: [
      "Life rarely moves in a straight line. There are pauses, turns, unexpected detours, and moments when we simply find ourselves moving in a new direction.",
      "The Passage is inspired by these quiet transitions - the passages move, bend and cross over one another, never quite following a straight course. Yet somehow, they continue to lead us forward.",
      "Perhaps that is what makes a passage meaningful — we don't always know where it will take us, but we keep moving.",
      "This one was fascinating for me, I hope it gives you a quiet moment to pause, wander, and find what you are looking for.",
    ],
  },
  {
    id: "order-in-disorder",
    title: "Order in disorder",
    art: "art--2",
    image: "assets/images/expressions/order-in-disorder.png",
    images: [
      "assets/images/expressions/order-in-disorder.png",
      "assets/images/expressions/order-in-disorder-room.webp",
    ],
    medium: "Acrylic on canvas",
    price: 24000,
    status: "available",
    isNew: true,
    bullets: [
      "At first glance, Order in Disorder feels like a collection of scattered forms — circles, lines, patterns and spaces, each moving in its own direction. But look a little closer, and small relationships begin to appear. The repetition, movement and rhythm create a quiet structure within the apparent chaos.",
      "The piece is a reminder that things don't always need to be perfectly arranged to feel balanced. Sometimes, there is a natural order in the way different shapes, ideas and moments find their place alongside one another.",
      "What began as scattered shapes slowly became something whole. I hope you enjoy discovering its little details as much as I enjoyed creating them.",
    ],
  },
];

// ---- Art that starts with your story: customisable personalised pieces --
const STORY_ART = [
  {
    id: "beauty-of-life",
    title: "Beauty of life",
    art: "art--5",
    image: "assets/images/expressions/beauty-of-life.webp",
    medium: "Personalised keepsake · fully customisable",
    price: 2799,
    status: "available",
    isNew: true,
    description: [
      "Made this for a friend who turned 40, a milestone birthday.",
      "Really didn’t know what to give her, then this incomplete piece came to my mind. Creating this was like therapy and the reaction and happiness for whom it was made was absolutely worth the effort.",
      "If you believe in personalized gifts and want to gift someone a life long memory, choose this.",
      "Fully customizable. You can choose the background details as well as what attributes you want to write for the person.",
      "Thank you for dropping by!",
      "Love",
    ],
  },
  {
    id: "eat-love-dance",
    title: "Eat Love Dance",
    art: "art--2",
    image: "assets/images/expressions/eat-love-dance.webp",
    medium: "Personalised keepsake · fully customisable",
    price: 2799,
    status: "available",
    isNew: true,
    description: [
      "This was obviously created for a person who loves dancing, though has stopped because life happens.",
      "She loved the piece and promised me that she will resume her dancing. Just a small step for reminding people to do what they actually want to do.",
      "If you wish to remind someone, even yourself that something needs to be done, this I believe is an intriguing way to do the same.",
      "Fully customizable. You can choose the colour theme as well as what message you want.",
      "Thank you for dropping by!",
      "Love",
    ],
  },
];

// ---- Learn: short original guides (paper care, sizing, commissioning) --
const LEARN_ARTICLES = [
  {
    id: "choosing-a-size",
    title: "Choosing the Right Size for Your Wall",
    art: "art--5",
    minutes: 3,
    summary: "A quick way to figure out A4 vs A3 vs a full original canvas before you order — measure the wall, not the art.",
  },
  {
    id: "caring-for-originals",
    title: "Caring for Your Original Painting",
    art: "art--2",
    minutes: 4,
    summary: "Keep an original canvas or paper piece looking its best — light, humidity, cleaning and hanging basics.",
  },
  {
    id: "paper-and-printing",
    title: "Our Paper & Printing Guide",
    art: "art--1",
    minutes: 3,
    summary: "GSM, matte vs cold-press, and what to ask for at a local print lab if you're printing a download yourself.",
    href: "inspirations.html#paper-guide",
  },
  {
    id: "what-makes-it-custom",
    title: "What Makes a Piece \"Custom\"?",
    art: "art--3",
    minutes: 3,
    summary: "The difference between a ready original, a personalised alphabet and a fully bespoke Story in a Frame — and how to pick.",
  },
];

// ---- Events: exhibitions, pop-ups & workshops -----------------------
const EVENTS_INFO = {
  upcoming: [], // add {title, date, location, description} objects here as events are scheduled
  note: "Nothing on the calendar right now — follow along on Instagram or WhatsApp and we'll share the next exhibition, pop-up or workshop as soon as it's confirmed.",
};
