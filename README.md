# Fine Impressions and Cuts - React Website

Modern React application for **Fine Impressions and Cuts** (Laser marking, leather embossing, and CNC engraving). Built with React 19, Vite, and clean modular CSS.

## 🚀 Getting Started

### 1. Install dependencies (already installed)
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
fine impressions and cuts/
├── index.html                 # Main HTML shell with Google Fonts
├── package.json               # Dependencies and scripts
├── src/
│   ├── main.jsx              # React DOM entry point
│   ├── App.jsx               # Root component with theme state
│   ├── index.css             # Full design system & responsive styling
│   ├── data/
│   │   └── businessData.js   # Central config for shop info, services, gallery & photos
│   └── components/
│       ├── Header.jsx        # Sticky navigation with theme toggle & quote CTA
│       ├── Hero.jsx          # Hero section with animated steel laser-engrave plate
│       ├── Services.jsx      # 3 services (laser marking, embossing, engraving)
│       ├── Process.jsx       # 5-step process workflow
│       ├── Gallery.jsx       # Showcase grid for recent work
│       ├── Contact.jsx       # WhatsApp, phone, copy buttons, address, hours
│       ├── CopyButton.jsx    # Accessible 1-click clipboard button with feedback
│       ├── Slot.jsx          # Photo slot (auto fallback to hatched blueprint placeholder)
│       └── Footer.jsx        # Footer branding
```

---

## 🛠️ How to Customize

All business data and photo slots are stored in a single config file:
👉 **[src/data/businessData.js](file:///c:/Users/sathi/OneDrive/Desktop/fine%20impressions%20and%20cuts/src/data/businessData.js)**

### Updating Phone & WhatsApp
```javascript
export const BUSINESS = {
  name: "Fine Impressions and Cuts",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Shop #4, Industrial Estate, Main Road...",
  hours: "Mon - Sat: 9:30 AM - 8:00 PM"
};
```

### Adding Photos
To add photos to any section or the hero plate, drop your image files into `src/assets/` (or use web URLs) and map them in `IMAGES`:
```javascript
export const IMAGES = {
  hero: "/src/assets/hero-sample.jpg",
  "service-laser-marking": "/src/assets/laser.jpg",
  "service-embossing": "/src/assets/embossing.jpg",
  "service-engraving": "/src/assets/engraving.jpg",
  "gallery-1": "/src/assets/gallery-1.jpg",
  ...
};
```
*If a slot is left blank (`""`), it automatically renders an architectural blueprint reticle crosshair placeholder with its label.*

---

## ✨ Features Included
- **Modular React JSX Components**: Clean component hierarchy with props and state.
- **Interactive Engraved Plate Simulation**: Replicates laser beam sweep and metallic engraving text animation. Clicking the plate re-triggers the scan.
- **Theme Switching**: Fully supports system dark/light mode preference, plus an interactive toggle with persistence (`localStorage`).
- **One-Click Copy**: Copy phone and WhatsApp numbers with user-feedback ("Copied" badge).
- **Responsive & Accessible**: Mobile navigation and fluid clamp typography for small screens up to desktop monitors.
