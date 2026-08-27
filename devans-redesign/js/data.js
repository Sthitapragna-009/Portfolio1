/* DEVAN'S — redesign — product data
   Roast index: 0 = Light–Medium, 1 = Medium, 2 = Medium–Dark, 3 = Dark
   Metrics are 0–100 and drive every chart on the site (rings + flavour-bloom radar).
   `image` files are real Devan's packaging photography (devans.in product CDN),
   `bagColor` is sampled from that same pack photo — used only as a small accent. */

const ROAST_LEVELS = ["Light–Medium", "Medium", "Medium–Dark", "Dark"];

/* Brew recipes — added after benchmarking bluetokaicoffee.com (full recipe card
   per method) and arakucoffee.in (a one-line serve tip). Keyed by the exact
   strings used in each product's `brews` array. */
const BREW_RECIPES = {
  "Espresso Machine": { dose: "18g", water: "36ml (yield)", temp: "93°C", time: "25–30 sec", grind: "Fine" },
  "Moka Pot": { dose: "18g", water: "200ml", temp: "Near boiling", time: "4–5 min", grind: "Fine–Medium" },
  "South Indian Filter": { dose: "20g", water: "150ml", temp: "Near boiling", time: "8–10 min drip", grind: "Fine" },
  "Percolator": { dose: "20g", water: "200ml", temp: "95°C", time: "6–8 min", grind: "Medium" },
  "French Press": { dose: "20g", water: "300ml", temp: "95°C", time: "4 min", grind: "Coarse" },
  "Pour Over": { dose: "18g", water: "280ml", temp: "94°C", time: "3 min", grind: "Medium" },
  "Aero Press": { dose: "15g", water: "220ml", temp: "85°C", time: "2 min", grind: "Medium-Fine" },
  "Cold Brew": { dose: "50g", water: "500ml (cold)", temp: "Room temp", time: "12–16 hrs steep", grind: "Coarse" },
};

const PRODUCTS = [
  {
    slug: "monsooned-malabar-aa",
    name: "Monsooned Malabar",
    sub: "Arabica AA",
    category: "Single Origin",
    roast: 1,
    price: 550,
    weights: ["250g", "500g"],
    origin: "Malabar Coast, Kerala",
    altitude: "Sea-level curing, 3–4 months monsoon exposure",
    process: "Monsooned · Sun-dried",
    tag: "Most requested",
    image: "assets/images/product-monsooned-malabar.webp",
    bagColor: "#1F3A6E",
    blurb:
      "One of the strangest, most deliberate things we do to a bean. Sun-dried green Arabica is warehoused right on the Malabar coast and left open to the south-west monsoon from June to September — the sea air swells the beans, fades their colour to pale gold and strips out much of the acidity that green coffee usually carries.",
    tastingNote:
      "Low-acid and mellow, with a golden cup colour. The medium roast draws out spice, mustiness, wood, chocolate and nut, closing on a sweet finish and an unusually rich crema when pulled as espresso.",
    metrics: { aroma: 76, body: 88, acidity: 22, sweetness: 68, bitterness: 48, aftertaste: 80 },
    brews: ["Espresso Machine", "Moka Pot", "South Indian Filter", "Percolator"],
    bestEnjoyed: "As espresso or moka pot — the low acidity holds up well with milk.",
  },
  {
    slug: "viennese-blend",
    name: "Viennese Blend",
    sub: "House Blend No. 4",
    category: "Our Blends",
    roast: 2,
    price: 525,
    weights: ["250g", "500g"],
    origin: "Blended in Lodhi Colony, Delhi",
    altitude: "Multi-estate Arabica, Karnataka & Kerala",
    process: "Dual-roast blend",
    tag: "Bestseller",
    image: "assets/images/product-viennese-blend.webp",
    bagColor: "#17171A",
    blurb:
      "Named for a cafe in Vienna we've supplied for a decade, and dedicated to a coffee-loving friend there. It's our most-ordered blend — built by roasting part of the batch dark and part light, then bringing the two back together.",
    tastingNote:
      "The dark-roasted portion brings a strong, spicy backbone; the lighter portion keeps the aroma fine and floral on top of it. Not too mild, not too strong — medium-to-high on both body and acidity, with aroma carrying the whole cup.",
    metrics: { aroma: 80, body: 72, acidity: 66, sweetness: 58, bitterness: 60, aftertaste: 70 },
    brews: ["Espresso Machine", "Moka Pot", "French Press", "South Indian Filter"],
    bestEnjoyed: "As a stovetop moka pot — strong enough to still read clean with milk.",
  },
  {
    slug: "lodhi-blend",
    name: "Lodhi Blend",
    sub: "House Blend No. 1",
    category: "Our Blends",
    roast: 1,
    price: 525,
    weights: ["250g"],
    origin: "Blended in Lodhi Colony, Delhi",
    altitude: "Multi-estate Indian Arabica",
    process: "Signature house blend",
    tag: "Est. flagship",
    image: "assets/images/product-lodhi-blend.jpg",
    bagColor: "#EDE7D6",
    blurb:
      "Named after the market we've roasted in since 1962. This is the blend we'd hand you if you walked in and asked what Devan's tastes like — built for a cup that pours a rich, golden colour, especially as a cappuccino.",
    tastingNote:
      "Medium-bodied and aromatic, with a bright citric acidity up front and quiet earthy undertones underneath. The short, tart opening resolves into a sweet, nutty finish that lingers.",
    metrics: { aroma: 82, body: 65, acidity: 72, sweetness: 62, bitterness: 42, aftertaste: 66 },
    brews: ["Pour Over", "Aero Press", "French Press", "South Indian Filter"],
    bestEnjoyed: "As a cappuccino, or filtered black to catch the citrus notes.",
  },
  {
    slug: "arabica-plantation-aa",
    name: "Arabica Plantation",
    sub: "AA Grade",
    category: "Single Origin",
    roast: 1,
    price: 500,
    weights: ["250g", "500g"],
    origin: "Chikmagalur, Karnataka",
    altitude: "3,200–4,800 ft",
    process: "Washed · Plantation AA",
    tag: null,
    image: "assets/images/product-arabica-plantation-aa.jpg",
    bagColor: "#9C6B3E",
    blurb:
      "Grown on the green hillsides of Chikmagalur — the district where Indian coffee cultivation began. AA grade means the beans are graded large and uniform, with a clean, polished look before they ever reach the roaster.",
    tastingNote:
      "A textbook medium roast: full aroma, moderate acidity and a tangy edge, carried on a full body with good overall strength. A hint of spice and a faint floral note come through in the cup.",
    metrics: { aroma: 74, body: 76, acidity: 58, sweetness: 55, bitterness: 50, aftertaste: 60 },
    brews: ["Percolator", "French Press", "South Indian Filter", "Pour Over"],
    bestEnjoyed: "As South Indian filter coffee, with milk — this is the bean built for it.",
  },
  {
    slug: "arabica-peaberry",
    name: "Arabica Peaberry",
    sub: "Single Origin",
    category: "Single Origin",
    roast: 1,
    price: 500,
    weights: ["250g", "500g"],
    origin: "Chikmagalur, Karnataka",
    altitude: "3,000–4,500 ft",
    process: "Peaberry-sorted",
    tag: null,
    image: "assets/images/product-arabica-peaberry.webp",
    bagColor: "#3F7A57",
    blurb:
      "Roughly one cherry in twenty grows a single round seed instead of the usual flat-sided pair. Hand-sorted out and roasted on their own, these peaberries roast more evenly and concentrate flavour into a smaller bean.",
    tastingNote:
      "A sweeter, rounder cup than standard-grade beans from the same estate — good aroma, a clean medium body and balanced acidity, with a smooth finish that doesn't overstay.",
    metrics: { aroma: 78, body: 70, acidity: 62, sweetness: 65, bitterness: 40, aftertaste: 68 },
    brews: ["Pour Over", "Aero Press", "South Indian Filter", "French Press"],
    bestEnjoyed: "As a pour-over, black — clean enough to skip the milk entirely.",
  },
  {
    slug: "organic-arabica",
    name: "Organic Arabica",
    sub: "Certified Estate",
    category: "Single Origin",
    roast: 0,
    price: 550,
    weights: ["250g", "500g"],
    origin: "Kodagu (Coorg), Karnataka",
    altitude: "3,500–5,000 ft, shade-grown",
    process: "Certified organic · Washed",
    tag: "Organic",
    image: "assets/images/product-organic-arabica.webp",
    bagColor: "#3B2E7A",
    blurb:
      "From a certified-organic estate in Coorg's shade-grown belt, roasted lighter than most of our line-up to keep the estate's own character in the cup rather than covering it in roast.",
    tastingNote:
      "Bright and fragrant, with the most lifted acidity in our single-origin range and a light, clean body. Very little bitterness — this is the cup for someone who finds our darker roasts too heavy.",
    metrics: { aroma: 85, body: 55, acidity: 70, sweetness: 60, bitterness: 30, aftertaste: 58 },
    brews: ["Pour Over", "Aero Press", "Cold Brew", "French Press"],
    bestEnjoyed: "As an AeroPress or cold brew, black — the brightest cup in the range.",
  },
  {
    slug: "mysore-nuggets-aaa",
    name: "Mysore Nuggets",
    sub: "AAA Extra Bold",
    category: "Single Origin",
    roast: 3,
    price: 550,
    weights: ["250g", "500g"],
    origin: "Baba Budangiri Hills, Karnataka",
    altitude: "3,500–5,000 ft",
    process: "Dark roast · AAA Grade",
    tag: "Dark roast",
    image: "assets/images/product-mysore-nuggets.webp",
    bagColor: "#C8654F",
    blurb:
      "The largest, densest beans we grade out of Karnataka, roasted dark and slow so the sugars caramelise all the way through instead of just scorching on the surface. Built for people who want a cup that pushes back.",
    tastingNote:
      "Heavy body, low acidity and a deliberate, lingering bitterness with notes of dark chocolate and roasted nut. Holds its own in milk — this is the bean behind a proper South Indian filter coffee.",
    metrics: { aroma: 72, body: 92, acidity: 30, sweetness: 45, bitterness: 82, aftertaste: 75 },
    brews: ["South Indian Filter", "Espresso Machine", "Moka Pot", "Percolator"],
    bestEnjoyed: "As South Indian filter coffee, always with milk — it's built to push back.",
  },
  {
    slug: "oriental-espresso-blend",
    name: "Oriental Espresso Blend",
    sub: "House Blend No. 7",
    category: "Our Blends",
    roast: 3,
    price: 525,
    weights: ["250g", "500g"],
    origin: "Blended in Lodhi Colony, Delhi",
    altitude: "Arabica–Robusta cross-blend",
    process: "Dark roast espresso blend",
    tag: null,
    image: "assets/images/product-oriental-espresso.webp",
    bagColor: "#1E6E6A",
    blurb:
      "A small measure of Robusta folded into dark-roasted Arabica, built specifically to survive milk. Designed for the espresso machines and moka pots that make up most of our wholesale cafe accounts.",
    tastingNote:
      "Thick body and a thick, long-lasting crema lead the cup, with low acidity and confident bitterness underneath. Reads as bittersweet chocolate — made to cut through milk, not disappear into it.",
    metrics: { aroma: 70, body: 90, acidity: 35, sweetness: 50, bitterness: 78, aftertaste: 74 },
    brews: ["Espresso Machine", "Moka Pot", "Percolator"],
    bestEnjoyed: "As espresso or moka pot, with milk — built to cut through it, not disappear.",
  },
];

const METRIC_META = {
  aroma: { label: "Aroma", short: "ARM" },
  body: { label: "Body", short: "BDY" },
  acidity: { label: "Acidity", short: "ACD" },
  sweetness: { label: "Sweetness", short: "SWT" },
  bitterness: { label: "Bitterness", short: "BTR" },
  aftertaste: { label: "Aftertaste", short: "AFT" },
};

function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
