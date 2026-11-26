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
  gstin: "33AAGFF0179F1ZQ",
  address: "79/13, Mugappair Road, Padi, Chennai, Tamil Nadu, India – 600 050.",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0076891280387!2d80.1740371!3d13.0958275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263f2019f71e9%3A0x3265aa2881b6f63a!2sFINE%20IMPRESSIONS%20%26%20CUTS!5e0!3m2!1sen!2sin!4v1731864000000!5m2!1sen!2sin",
  mapsLink: "https://www.google.com/maps/place/FINE+IMPRESSIONS+%26+CUTS/@13.0958275,80.176612,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263f2019f71e9:0x3265aa2881b6f63a!8m2!3d13.0958275!4d80.176612!16s%2Fg%2F11c6m3knfx",
  mapsDirectionsUrl: "https://www.google.com/maps/place/FINE+IMPRESSIONS+%26+CUTS/@13.0958275,80.176612,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263f2019f71e9:0x3265aa2881b6f63a!8m2!3d13.0958275!4d80.176612!16s%2Fg%2F11c6m3knfx"
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

export const DEFAULT_QUOTE_MESSAGE =
  "Hi, I would like to get a quote for:\n1. 3D Design\n2. Engraving\n3. Laser Marking\n4. Embossing";

export const getWhatsAppLink = (message = DEFAULT_QUOTE_MESSAGE) => {
  const base = `https://api.whatsapp.com/send?phone=${BUSINESS.whatsapp}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
};

export const WA_LINK = getWhatsAppLink(DEFAULT_QUOTE_MESSAGE);
export const WA_QUOTE = getWhatsAppLink(DEFAULT_QUOTE_MESSAGE);

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
    id: "bagatt",
    name: "BAGATT",
    logo: "/customers/bagatt.png",
    aspect: "ultra-wide"
  },
  {
    id: "bata",
    name: "Bata",
    logo: "/customers/bata.png",
    aspect: "wide"
  },
  {
    id: "bugatti",
    name: "bugatti",
    logo: "/customers/bugatti.png",
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
    id: "florsheim",
    name: "Florsheim",
    logo: "/customers/florsheim.png",
    aspect: "balanced"
  },
  {
    id: "geox",
    name: "GEOX",
    logo: "/customers/geox.png",
    aspect: "ultra-wide"
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
    id: "keen",
    name: "KEEN",
    logo: "/customers/keen.png",
    aspect: "wide"
  },
  {
    id: "kickers",
    name: "Kickers",
    logo: "/customers/kickers.png",
    aspect: "wide"
  },
  {
    id: "legero",
    name: "legero",
    logo: "/customers/legero.png",
    aspect: "wide"
  },
  {
    id: "massimo-dutti",
    name: "Massimo Dutti",
    logo: "/customers/massimo-dutti.png",
    aspect: "balanced"
  },
  {
    id: "puma",
    name: "PUMA",
    logo: "/customers/puma.png",
    aspect: "balanced"
  },
  {
    id: "skechers",
    name: "SKECHERS",
    logo: "/customers/skechers.png",
    aspect: "ultra-wide"
  },
  {
    id: "superfit",
    name: "superfit",
    logo: "/customers/superfit.png",
    aspect: "wide"
  },
  {
    id: "us-polo",
    name: "U.S. POLO ASSN.",
    logo: "/customers/us-polo.png",
    aspect: "tall"
  }
];
