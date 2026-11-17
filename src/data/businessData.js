/**
 * Business details and content configuration.
 * Edit these values to update shop info, phone numbers, and content across the website.
 */

export const BUSINESS = {
  name: "Fine Impressions and Cuts",
  tagline: "20+ Years of Manufacturing Expertise",
  headline: "2D & 3D CNC Dies, Leather Embossing & Laser Marking.",
  description:
    "20 years of expertise in manufacturing 2D & 3D CNC engraving dies, leather embossing, hot foil stamping for leather industries, and precision laser marking.",
  phone: "+91 73050 20168",
  phoneAlt: "+91 76677 24242",
  landline: "044 43861376",
  email: "embossingdies@gmail.com",
  whatsapp: "917305020168",
  address: "79/13, Mugappair Road, Padi, Chennai, Tamil Nadu, India – 600 050.",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM",
  mapsEmbedUrl: "https://maps.google.com/maps?q=13.0958275,80.176612+(FINE+IMPRESSIONS+%26+CUTS)&t=&z=17&ie=UTF8&iwloc=B&output=embed",
  mapsLink: "https://maps.app.goo.gl/W2Qy2pQnkQTqN8A4A",
  mapsDirectionsUrl: "https://maps.app.goo.gl/W2Qy2pQnkQTqN8A4A"
};

/**
 * Photos configuration.
 * Put an image URL or imported asset path against a slot key to display it.
 * If empty (""), an architectural hatched placeholder with crosshair reticle is displayed.
 */
export const IMAGES = {
  hero: "",
  "service-laser-marking": "/laser-marking/laser-marking-1.jpg",
  "service-embossing": "",
  "service-engraving": "",
  "gallery-1": "/laser-marking/laser-marking-3.jpg",
  "gallery-2": "",
  "gallery-3": "/laser-marking/laser-marking-1.jpg",
  "gallery-4": "",
  "gallery-5": "/laser-marking/laser-marking-2.jpg",
  "gallery-6": "/laser-marking/laser-marking-4.jpg",
  shop: ""
};

/**
 * Real laser marking work portfolio items used in the interactive animated slider.
 */
export const LASER_MARKING_SLIDES = [
  {
    id: "fixture-plate",
    src: "/laser-marking/laser-marking-1.jpg",
    alt: "Industrial checking fixture nameplate with crisp high-contrast laser etching",
    caption: "Checking Fixture Plate",
    detail: "High-contrast black anodized plate"
  },
  {
    id: "metal-dial",
    src: "/laser-marking/laser-marking-2.jpg",
    alt: "Precision metal dial with laser marked star emblem",
    caption: "Precision Metal Dial",
    detail: "Laser engraved star emblem"
  },
  {
    id: "steel-spindle",
    src: "/laser-marking/laser-marking-3.jpg",
    alt: "Machined cylindrical steel spindle with laser marked serial numbers",
    caption: "Machined Steel Spindle",
    detail: "Permanent serial & MFR codes"
  },
  {
    id: "drdo-panel",
    src: "/laser-marking/laser-marking-4.jpg",
    alt: "Defense electronics enclosure panel with DRDO emblem",
    caption: "Defense Enclosure Panel",
    detail: "LRDE - DRDO defense emblem"
  }
];

export const getWhatsAppLink = (message) => {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const WA_LINK = getWhatsAppLink();
export const WA_QUOTE = getWhatsAppLink(
  "Hi, I want a quote for marking, embossing or engraving."
);

export const NAV = [
  { href: "#customers", label: "Customers" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#gallery", label: "Our work" },
  { href: "#contact", label: "Contact" }
];

export const MATERIALS = [
  "Stainless steel",
  "Aluminium",
  "Brass",
  "Leather"
];

export const SERVICES = [
  {
    id: "laser-marking",
    slot: "service-laser-marking",
    photoLabel: "Photo: laser marking",
    tag: "Metals & alloys",
    title: "Laser marking",
    text: "A fine laser burns a clean, permanent mark into the surface. No ink, no contact, and nothing to rub off.",
    uses: [
      "Serial numbers and batch codes",
      "QR codes and barcodes",
      "Logos on tools, parts and nameplates"
    ],
    cta: "Ask about laser marking"
  },
  {
    id: "embossing",
    slot: "service-embossing",
    photoLabel: "Photo: leather embossing",
    tag: "Leather and PU leather",
    title: "Embossing",
    text: "Heat and pressure press your logo or name into leather, leaving a neat, lasting impression with a premium feel.",
    uses: [
      "Wallets, belts and bags",
      "Diaries, folders and notebook covers",
      "Key chains and corporate gift sets"
    ],
    cta: "Ask about embossing"
  },
  {
    id: "engraving",
    slot: "service-engraving",
    photoLabel: "Photo: CNC engraving",
    tag: "Brass, aluminium, stainless steel",
    title: "Engraving",
    text: "CNC engraving cuts text, logos and patterns into the surface, with a depth you can see and feel.",
    uses: [
      "Shoes and footwear",
      "Leather bags and goods",
      "Custom embossing blocks & dies"
    ],
    cta: "Ask about engraving"
  }
];

export const STEPS = [
  { n: "01", title: "Send your design", text: "Share your logo, text or a rough sketch on WhatsApp." },
  { n: "02", title: "Get a quote", text: "We confirm the material, size, quantity and price." },
  { n: "03", title: "Approve the sample", text: "See the mark on a sample piece before the full run." },
  { n: "04", title: "We make it", text: "Marking, embossing or engraving, finished and checked." },
  { n: "05", title: "Pick up or deliver", text: "Collect from the shop or have it sent to you." }
];

export const GALLERY = [
  { slot: "gallery-1", label: "Machined spindle serial" },
  { slot: "gallery-2", label: "Embossed wallet" },
  { slot: "gallery-3", label: "Checking fixture nameplate" },
  { slot: "gallery-4", label: "Leather diary cover" },
  { slot: "gallery-5", label: "Precision dial engraving" },
  { slot: "gallery-6", label: "DRDO defense panel" }
];

/**
 * Customer / Client brand logos for the animated motion marquee.
 * All 9 customer brand logos trimmed and normalized for identical visual size.
 */
export const CUSTOMERS = [
  {
    id: "bata",
    name: "Bata",
    logo: "/customers/bata.png",
    aspect: "wide"
  },
  {
    id: "clarks",
    name: "Clarks",
    logo: "/customers/clarks.png",
    aspect: "wide"
  },
  {
    id: "ecco",
    name: "ecco",
    logo: "/customers/ecco.png",
    aspect: "wide"
  },
  {
    id: "elefanten",
    name: "elefanten",
    logo: "/customers/elefanten.png",
    aspect: "balanced"
  },
  {
    id: "harley-davidson",
    name: "Harley-Davidson",
    logo: "/customers/harley-davidson.png",
    aspect: "square"
  },
  {
    id: "hugo-boss",
    name: "HUGO BOSS",
    logo: "/customers/hugo-boss.png",
    aspect: "ultra-wide"
  },
  {
    id: "hush-puppies",
    name: "Hush Puppies",
    logo: "/customers/hush-puppies.png",
    aspect: "square"
  },
  {
    id: "skechers",
    name: "SKECHERS",
    logo: "/customers/skechers.png",
    aspect: "ultra-wide"
  },
  {
    id: "us-polo",
    name: "U.S. POLO ASSN.",
    logo: "/customers/us-polo.png",
    aspect: "tall"
  }
];
