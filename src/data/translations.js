/**
 * Multi-language translations for English (Default), Tamil, and Hindi.
 */

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
];

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav_customers: "Customers",
    nav_services: "Services",
    nav_process: "How it works",
    nav_gallery: "Our work",
    nav_contact: "Contact",
    nav_catalog: "Catalog",
    btn_download_catalog: "Download Catalog",
    nav_quote_btn: "Get a quote",
    lang_select_title: "Select language",

    // Hero
    hero_tagline: "Laser marking · Embossing · Engraving",
    hero_headline: "Permanent marks on metal and leather.",
    hero_description: "We mark, emboss and engrave logos, names and serial numbers for shops, factories and gift buyers. One piece or a full batch.",
    hero_whatsapp_cta: "Send your logo on WhatsApp",
    hero_work_cta: "See our work",
    hero_materials_title: "Materials we work on",
    materials: ["Stainless steel", "Aluminium", "Brass", "Leather"],

    // Customers
    cust_eyebrow: "NOTABLE CLIENTS",
    cust_title: "Our Customers",
    cust_sub: "Trusted by manufacturing workshops, studios, and businesses for permanent marking and custom engraving.",

    // Services
    services_eyebrow: "What we do",
    services_title: "Three ways to put your mark on it",
    service_laser_tag: "Metals & alloys",
    service_laser_title: "Laser marking",
    service_laser_text: "A fine laser burns a clean, permanent mark into the surface. No ink, no contact, and nothing to rub off.",
    service_laser_uses: [
      "Serial numbers and batch codes",
      "QR codes and barcodes",
      "Logos on tools, parts and nameplates"
    ],
    service_laser_cta: "Ask about laser marking",

    service_emboss_tag: "Leather and PU leather",
    service_emboss_title: "Embossing",
    service_emboss_text: "Heat and pressure press your logo or name into leather, leaving a neat, lasting impression with a premium feel.",
    service_emboss_uses: [
      "Wallets, belts and bags",
      "Diaries, folders and notebook covers",
      "Key chains and corporate gift sets"
    ],
    service_emboss_cta: "Ask about embossing",

    service_engrave_tag: "Brass, aluminium, stainless steel",
    service_engrave_title: "Engraving",
    service_engrave_text: "CNC engraving cuts text, logos and patterns into the surface, with a depth you can see and feel.",
    service_engrave_uses: [
      "Shoes and footwear",
      "Leather bags and goods",
      "Custom embossing blocks & dies"
    ],
    service_engrave_cta: "Ask about engraving",

    // Extra Things We Do (Blueprint section)
    extras_eyebrow: "Beyond the main three",
    extras_title: "Extra things we do",
    extras_lede: "Not every job fits one box. These are the special things we also take on.",
    extras_btn: "Ask about a special job",
    extras_dim_bottom: "Special jobs",
    extras_dim_left: "Real work",
    extras_drg_no: "003",
    extras_scale: "1:1",
    extras_sheet_title: "Extra things we do",
    extras_items: [
      { title: "Design help", text: "Send a rough sketch or a photo and we prepare the file for marking." },
      { title: "Bulk and gift orders", text: "Corporate gifts, wedding favours and festival hampers in any quantity." }
    ],

    // Process
    process_eyebrow: "How it works",
    process_title: "From your logo to the finished piece",
    steps: [
      { n: "01", title: "Send your design", text: "Share your logo, text or a rough sketch on WhatsApp." },
      { n: "02", title: "Get a quote", text: "We confirm the material, size, quantity and price." },
      { n: "03", title: "Approve the sample", text: "See the mark on a sample piece before the full run." },
      { n: "04", title: "We make it", text: "Marking, embossing or engraving, finished and checked." },
      { n: "05", title: "Pick up or deliver", text: "Collect from the shop or have it sent to you." }
    ],

    // Gallery / Recent Works
    gallery_eyebrow: "Our work",
    gallery_title: "Recent works",
    gallery_fullscreen_hint: "Full screen",

    // Contact
    contact_eyebrow: "Contact",
    contact_title: "Send your logo, get a quote",
    contact_lede: "Message us the design and what you want it on. We reply with the price and a sample plan.",
    contact_whatsapp_label: "WhatsApp",
    contact_phone_label: "Phone",
    contact_visit_label: "Shop address",
    contact_hours_label: "Working hours",
    contact_open_wa: "Open WhatsApp",
    contact_open_maps: "Open in Google Maps",
    contact_copy: "Copy",
    contact_copied: "Copied!",
    contact_shop_photo: "Photo: our shop",

    // Footer
    footer_tagline: "Permanent marks on metal and leather.",
    footer_about: "Laser marking, leather embossing and CNC engraving for shops, factories and gift buyers.",
    footer_rights: "All rights reserved.",
    footer_quick_links: "Quick Links",
    footer_services_title: "Our Services",
    footer_workshop_title: "Workshop & Visit",
    footer_back_to_top: "Back to top"
  },

  ta: {
    // Navigation
    nav_customers: "வாடிக்கையாளர்கள்",
    nav_services: "சேவைகள்",
    nav_process: "செயல்முறை",
    nav_gallery: "எங்கள் வேலைகள்",
    nav_contact: "தொடர்புக்கு",
    nav_catalog: "பட்டியல்",
    btn_download_catalog: "பட்டியல் பதிவிறக்கம்",
    nav_quote_btn: "விலை விவரம்",
    lang_select_title: "மொழியைத் தேர்ந்தெடுக்கவும்",

    // Hero
    hero_tagline: "லேசர் குறியிடுதல் · எம்போசிங் · என்கிரேவிங்",
    hero_headline: "உலோகம் மற்றும் தோலில் நிரந்தர அடையாளங்கள்.",
    hero_description: "கடைகள், தொழிற்சாலைகள் மற்றும் அன்பளிப்பு வாங்குபவர்களுக்காக லோகோக்கள், பெயர்கள் மற்றும் வரிசை எண்களை துல்லியமாக பொறிக்கிறோம். ஒற்றைப் பொருள் முதல் மொத்த தயாரிப்பு வரை.",
    hero_whatsapp_cta: "வாட்ஸ்அப்பில் லோகோவை அனுப்பவும்",
    hero_work_cta: "எங்கள் வேலைகளைப் பார்க்க",
    hero_materials_title: "நாங்கள் வேலை செய்யும் பொருட்கள்",
    materials: ["துருப்பிடிக்காத எஃகு", "அலுமினியம்", "பித்தளை", "தோல்"],

    // Customers
    cust_eyebrow: "முக்கிய வாடிக்கையாளர்கள்",
    cust_title: "எங்கள் வாடிக்கையாளர்கள்",
    cust_sub: "நிரந்தர குறியிடுதல் மற்றும் தனிப்பயன் வேலைப்பாடுகளுக்காக உற்பத்தி கூடங்கள் மற்றும் வணிக நிறுவனங்களால் நம்பப்படுகிறது.",

    // Services
    services_eyebrow: "நாங்கள் செய்வது",
    services_title: "உங்கள் அடையாளத்தைப் பதிக்க மூன்று வழிகள்",
    service_laser_tag: "உலோகங்கள் & கலவைகள்",
    service_laser_title: "லேசர் குறியிடுதல்",
    service_laser_text: "துல்லியமான லேசர் மூலம் மேற்பரப்பில் சுத்தமான, நிரந்தரமான குறியீடு பொறிக்கப்படுகிறது. மை இல்லை, தொடர்பு இல்லை, அழியாது.",
    service_laser_uses: [
      "வரிசை எண்கள் மற்றும் தொகுதி குறியீடுகள்",
      "QR குறியீடுகள் மற்றும் பார்கோடுகள்",
      "கருவிகள், பாகங்கள் மற்றும் பெயர் பலகைகளில் லோகோக்கள்"
    ],
    service_laser_cta: "லேசர் குறியிடுதல் பற்றி கேட்க",

    service_emboss_tag: "தோல் மற்றும் செயற்கை தோல்",
    service_emboss_title: "எம்போசிங்",
    service_emboss_text: "வெப்பம் மற்றும் அழுத்தம் மூலம் உங்கள் லோகோ தோலில் பதிக்கப்பட்டு பிரீமியம் தோற்றத்தை அளிக்கிறது.",
    service_emboss_uses: [
      "பர்ஸ்கள், பெல்ட்கள் மற்றும் பைகள்",
      "டைரிகள், கோப்புகள் மற்றும் நோட்புக் கவர்கள்",
      "சாவிக்கொத்துகள் மற்றும் நிறுவன பரிசுத் தொகுப்புகள்"
    ],
    service_emboss_cta: "எம்போசிங் பற்றி கேட்க",

    service_engrave_tag: "பித்தளை, அலுமினியம், ஸ்டெயின்லெஸ் ஸ்டீல்",
    service_engrave_title: "என்கிரேவிங் (வேலைப்பாடு)",
    service_engrave_text: "CNC என்கிரேவிங் மூலம் எழுத்துக்கள், லோகோக்கள் மற்றும் வடிவங்கள் துல்லியமான ஆழத்துடன் வெட்டப்படுகின்றன.",
    service_engrave_uses: [
      "காலணிகள் மற்றும் பாதணிகள்",
      "தோல் பைகள் மற்றும் கைவினைப் பொருட்கள்",
      "தனிப்பயன் எம்போசிங் அச்சுகள் மற்றும் டைகள்"
    ],
    service_engrave_cta: "என்கிரேவிங் பற்றி கேட்க",

    // Extra Things We Do (Blueprint section)
    extras_eyebrow: "முக்கிய மூன்று சேவைகளுக்கு அப்பால்",
    extras_title: "நாங்கள் செய்யும் கூடுதல் வேலைகள்",
    extras_lede: "ஒவ்வொரு பணியும் ஒரே மாதிரி இருப்பதில்லை. நாங்கள் மேற்கொள்ளும் சிறப்பு வேலைகள் இதோ.",
    extras_btn: "சிறப்பு வேலை பற்றி கேட்க",
    extras_dim_bottom: "சிறப்பு வேலைகள்",
    extras_dim_left: "உண்மையான வேலை",
    extras_drg_no: "003",
    extras_scale: "1:1",
    extras_sheet_title: "கூடுதல் வேலைகள்",
    extras_items: [
      { title: "வடிவமைப்பு உதவி", text: "ஒரு ரஃப் ஸ்கெட்ச் அல்லது புகைப்படத்தை அனுப்புங்கள், நாங்கள் அதைத் தயார் செய்கிறோம்." },
      { title: "மொத்த மற்றும் பரிசு ஆர்டர்கள்", text: "கார்ப்பரேட் பரிசுகள், திருமண அன்பளிப்புகள் மற்றும் திருவிழா பேக்குகள்." }
    ],

    // Process
    process_eyebrow: "செயல்முறை",
    process_title: "உங்கள் வடிவமைப்பிலிருந்து முடிக்கப்பட்ட தயாரிப்பு வரை",
    steps: [
      { n: "01", title: "வடிவமைப்பை அனுப்பவும்", text: "உங்கள் லோகோ, உரை அல்லது வரைபடத்தை வாட்ஸ்அப்பில் பகிருங்கள்." },
      { n: "02", title: "விலை விவரம் பெறவும்", text: "பொருள், அளவு, எண்ணிக்கை மற்றும் விலையை உறுதி செய்கிறோம்." },
      { n: "03", title: "மாதிரியை அங்கீகரிக்கவும்", text: "முழு தயாரிப்புக்கு முன் மாதிரித் துண்டில் குறியீட்டைப் பாருங்கள்." },
      { n: "04", title: "நாங்கள் தயாரிக்கிறோம்", text: "குறியிடுதல், எம்போசிங் அல்லது என்கிரேவிங் முடிக்கப்பட்டு சரிபார்க்கப்படுகிறது." },
      { n: "05", title: "பெற்றுக்கொள்ளவும்", text: "கடையில் நேரடியாகவோ அல்லது தபால் மூலமாகவோ பெற்றுக்கொள்ளலாம்." }
    ],

    // Gallery / Recent Works
    gallery_eyebrow: "எங்கள் படைப்புகள்",
    gallery_title: "சமீபத்திய வேலைகள்",
    gallery_fullscreen_hint: "முழு திரை",

    // Contact
    contact_eyebrow: "தொடர்புக்கு",
    contact_title: "லோகோவை அனுப்பி விலை விவரம் பெறவும்",
    contact_lede: "உங்கள் வடிவமைப்பையும் எந்தப் பொருளில் வேண்டும் என்பதையும் அனுப்புங்கள். உடனடி விலையையும் மாதிரித் திட்டத்தையும் வழங்குகிறோம்.",
    contact_whatsapp_label: "வாட்ஸ்அப்",
    contact_phone_label: "தொலைபேசி",
    contact_visit_label: "கடை முகவரி",
    contact_hours_label: "வேலை நேரம்",
    contact_open_wa: "வாட்ஸ்அப்பில் தொடர்புகொள்ள",
    contact_open_maps: "கூகுள் மேப்பில் பார்க்க",
    contact_copy: "நகலெடு",
    contact_copied: "நகலெடுக்கப்பட்டது!",
    contact_shop_photo: "புகைப்படம்: எங்கள் கடை",

    // Footer
    footer_tagline: "உலோகம் மற்றும் தோலில் நிரந்தர அடையாளங்கள்.",
    footer_about: "கடைகள், தொழிற்சாலைகள் மற்றும் பரிசுப் பொருட்களுக்கான லேசர் மார்க்கிங், லெதர் எம்போசிங் மற்றும் சிஎன்சி என்கிரேவிங்.",
    footer_rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footer_quick_links: "விரைவு இணைப்புகள்",
    footer_services_title: "எங்கள் சேவைகள்",
    footer_workshop_title: "பட்டறை & முகவரி",
    footer_back_to_top: "மேலே செல்ல"
  },

  hi: {
    // Navigation
    nav_customers: "ग्राहक",
    nav_services: "सेवाएं",
    nav_process: "कार्य प्रक्रिया",
    nav_gallery: "हमारा काम",
    nav_contact: "संपर्क करें",
    nav_catalog: "कैटलॉग",
    btn_download_catalog: "कैटलॉग डाउनलोड",
    nav_quote_btn: "कोटेशन लें",
    lang_select_title: "भाषा चुनें",

    // Hero
    hero_tagline: "लेजर मार्किंग · एम्बॉसिंग · नक्काशी (एनग्रेविंग)",
    hero_headline: "धातु और चमड़े पर स्थायी निशान।",
    hero_description: "हम दुकानों, कारखानों और उपहार खरीदारों के लिए लोगो, नाम और सीरियल नंबर मार्क, एम्बॉस और एनग्रेव करते हैं। एक पीस हो या पूरा बैच।",
    hero_whatsapp_cta: "व्हाट्सएप पर अपना लोगो भेजें",
    hero_work_cta: "हमारा काम देखें",
    hero_materials_title: "जिन सामग्रियों पर हम काम करते हैं",
    materials: ["स्टेनलेस स्टील", "एल्युमिनियम", "पीतल", "चमड़ा"],

    // Customers
    cust_eyebrow: "प्रमुख ग्राहक",
    cust_title: "हमारे ग्राहक",
    cust_sub: "स्थायी अंकन और कस्टम नक्काशी के लिए विनिर्माण कार्यशालाओं और व्यावसायिक उद्यमों द्वारा विश्वसनीय।",

    // Services
    services_eyebrow: "हम क्या करते हैं",
    services_title: "अपनी पहचान अंकित करने के तीन तरीके",
    service_laser_tag: "धातुएं और मिश्र धातुएं",
    service_laser_title: "लेजर मार्किंग",
    service_laser_text: "एक महीन लेजर सतह पर साफ और स्थायी निशान बनाती है। कोई स्याही नहीं, कोई संपर्क नहीं और मिटने का कोई डर नहीं।",
    service_laser_uses: [
      "सीरियल नंबर और बैच कोड",
      "क्यूआर कोड और बारकोड",
      "टूल्स, पार्ट्स और नेमप्लेट पर लोगो"
    ],
    service_laser_cta: "लेजर मार्किंग के बारे में पूछें",

    service_emboss_tag: "चमड़ा और पीयू लेदर",
    service_emboss_title: "एम्बॉसिंग",
    service_emboss_text: "गर्मी और दबाव आपके लोगो या नाम को चमड़े में उभारते हैं, जिससे एक साफ और प्रीमियम प्रभाव छूटता है।",
    service_emboss_uses: [
      "वॉलेट, बेल्ट और बैग",
      "डायरी, फोल्डर और नोटबुक कवर",
      "की-चेन और कॉर्पोरेट गिफ्ट सेट"
    ],
    service_emboss_cta: "एम्बॉसिंग के बारे में पूछें",

    service_engrave_tag: "पीतल, एल्युमिनियम, स्टेनलेस स्टील",
    service_engrave_title: "नक्काशी (एनग्रेविंग)",
    service_engrave_text: "सीएनसी नक्काशी सतह पर टेक्स्ट, लोगो और पैटर्न को गहराई से तराशती है जिसे आप देख और महसूस कर सकते हैं।",
    service_engrave_uses: [
      "जूते और फुटवियर",
      "लेदर बैग और उत्पाद",
      "कस्टम एम्बॉसिंग ब्लॉक्स और डाइस"
    ],
    service_engrave_cta: "नक्काशी के बारे में पूछें",

    // Extra Things We Do (Blueprint section)
    extras_eyebrow: "मुख्य तीन से परे",
    extras_title: "अतिरिक्त काम जो हम करते हैं",
    extras_lede: "हर काम एक जैसा नहीं होता। ये वो खास काम हैं जिन्हें हम पूरा करते हैं।",
    extras_btn: "स्पेशल जॉब के बारे में पूछें",
    extras_dim_bottom: "विशेष कार्य",
    extras_dim_left: "वास्तविक कार्य",
    extras_drg_no: "003",
    extras_scale: "1:1",
    extras_sheet_title: "अतिरिक्त कार्य",
    extras_items: [
      { title: "डिज़ाइन में सहायता", text: "एक रफ स्केच या फोटो भेजें, हम मार्किंग के लिए फाइल तैयार करेंगे।" },
      { title: "थोक और उपहार ऑर्डर", text: "कॉर्पोरेट उपहार, शादी के तोहफे और फेस्टिव हैंपर्स किसी भी मात्रा में।" }
    ],

    // Process
    process_eyebrow: "कार्य प्रक्रिया",
    process_title: "आपके डिज़ाइन से तैयार उत्पाद तक",
    steps: [
      { n: "01", title: "डिज़ाइन भेजें", text: "व्हाट्सएप पर अपना लोगो, टेक्स्ट या रफ स्केच साझा करें।" },
      { n: "02", title: "कोटेशन प्राप्त करें", text: "हम सामग्री, आकार, मात्रा और कीमत की पुष्टि करते हैं।" },
      { n: "03", title: "सैंपल स्वीकृत करें", text: "पूरे ऑर्डर से पहले एक सैंपल पीस पर फिनिशिंग देखें।" },
      { n: "04", title: "हम तैयार करते हैं", text: "मार्किंग, एम्बॉसिंग या एनग्रेविंग पूरी कर जांच की जाती है।" },
      { n: "05", title: "प्राप्त करें", text: "दुकान से लें या अपने पते पर डिलीवर करवाएं।" }
    ],

    // Gallery / Recent Works
    gallery_eyebrow: "हमारा काम",
    gallery_title: "हालिया काम",
    gallery_fullscreen_hint: "फुल स्क्रीन",

    // Contact
    contact_eyebrow: "संपर्क करें",
    contact_title: "लोगो भेजें, कोटेशन प्राप्त करें",
    contact_lede: "हमें डिज़ाइन और सामग्री भेजें। हम त्वरित मूल्य और नमूना योजना के साथ उत्तर देंगे।",
    contact_whatsapp_label: "व्हाट्सएप",
    contact_phone_label: "फोन",
    contact_visit_label: "दुकान का पता",
    contact_hours_label: "कार्य समय",
    contact_open_wa: "व्हाट्सएप खोलें",
    contact_open_maps: "गूगल मैप्स में देखें",
    contact_copy: "कॉपी करें",
    contact_copied: "कॉपी हो गया!",
    contact_shop_photo: "फोटो: हमारी दुकान",

    // Footer
    footer_tagline: "मेटल और लेदर पर स्थायी निशान।",
    footer_about: "दुकानों, कारखानों और उपहारों के लिए लेजर मार्किंग, लेदर एम्बॉसिंग और सीएनसी नक्काशी।",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    footer_quick_links: "त्वरित लिंक",
    footer_services_title: "हमारी सेवाएं",
    footer_workshop_title: "वर्कशॉप और संपर्क",
    footer_back_to_top: "ऊपर जाएं"
  }
};
