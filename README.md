# HORSEBEAT | Modern Equestrian Atelier

**Version:** `1.1.0`  
**Address:** 307/1, Dhanmondi 8/A, Dhaka, Bangladesh, 1209  
**Currency:** BDT (৳)  
**Inspired by:** Equestrian Stockholm (`https://equestrianstockholm.com/`)  

A high-fashion, Scandinavian luxury equestrian e-commerce and editorial web application tailored for discerning riders and haute horsemanship.

---

## 🌟 Key Features & Design System

### 1. The Matching Concept Studio (Signature Equestrian Stockholm Element)
- **Interactive Set Builder**: Seamlessly toggle between signature limited edition colorways:
  - *The Merlot Velvet Edit* (Opulent bordeaux with rose gold mirror hardware)
  - *The Sycamore Forest Collection* (Noble emerald with polished silver chrome hardware)
  - *The Champagne Royale Edition* (Golden luster satin with brushed brass hardware)
  - *Midnight Navy Couture* & *Desert Rose Technical Layering*
- **Live 4-Piece Bundle Breakdown**: Instant calculation showing the matched Saddle Pad, Acoustic Ear Bonnet, Faux-Fur Brushing Boots, and Technical Rider Jacket with 15% bundled savings.
- **One-Click Bundle Purchase**: Instantly add the entire 4-piece coordinated set to the shopping bag.

### 2. Scandinavian Luxury Aesthetics & Typography
- **Typography**: Editorial serif headings using *Cormorant Garamond* paired with Scandinavian geometric sans-serif *Montserrat* with high letter-spacing on buttons, badges, and uppercase headers.
- **Bespoke Equestrian Photography**: High-resolution editorial photography showcasing Grand Prix dressage and jumping saddles, metallic atelier crests, and equestrian lifestyle.
- **Color Palettes**: Jewel tones (deep merlot velvet, sycamore green, midnight navy) combined with warm Scandinavian neutrals (`#fbfaf8`, `#efece6`), subtle borders (`#e6e3de`), and metallic finishes (Rose Gold, Brushed Brass, Chrome Silver).

### 3. Interactive Shopping & Atelier Features
- **Dynamic Currency Switcher**: Real-time conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, **SEK (kr)**, and **AUD (A$)**.
- **Sliding Cart Drawer**:
  - Live **Free Express Worldwide Shipping meter** with animated progress indicator.
  - Item increment/decrement (+ / -) and deletion.
  - Promo code discounts (e.g. `HORSEBEAT10` for 10% off).
  - Encrypted checkout trigger.
- **Editorial "Shop The Look" Hotspots**:
  - Atmospheric lifestyle photo with pulsating hotspot pins over saddle pad, outerwear, and bandages.
  - Hover / click popovers displaying product details and instant add to bag.
- **Filterable Product Catalog Grid**:
  - Category tabs: *All Pieces*, *Saddle Pads*, *Rider Apparel*, *Protection Boots*, *Ear Bonnets*, and *New Releases*.
  - Hardware finish dropdown filter (*Rose Gold*, *Chrome Silver*, *Brushed Brass*).
  - Quick View modal with size / cut selector (`Full`, `Cob`, `Pony` for pads; `XS`-`XL` for apparel).
  - Wishlist toggle heart saving to persistent `localStorage`.
- **Predictive Live Search Overlay**: Instant search matching products, descriptions, colors, and materials.
- **Slide-out Wishlist Drawer**: Saved products review with 1-click move to shopping bag.
- **Brand Pillars & Technical Innovation**: Highlights anatomical wither clearance, quick-dry bamboo-charcoal lining, cruelty-free vegan fur, and Swedish atelier craftsmanship.
- **Verified Customer Testimonials & Lipscore / Trustpilot Showcase**.
- **Social Community Feed**: Instagram grid showcasing `#HorsebeatRider`.
- **Toast Notifications**: Interactive tactile feedback for bag updates and wishlist toggles.

---

## 🚀 Running Locally

The project is built with Vanilla HTML5, CSS3, and modern JavaScript with zero heavy build steps.

To run locally:
```bash
# Using Node
npx serve -l 3000 .

# Or using Python
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📁 File Structure

```
d:/Horsebeat/
├── assets/
│   └── images/
│       ├── hero.jpg                    # Full-bleed arena hero photo
│       ├── merlot_set.jpg              # Merlot velvet flatlay set
│       ├── sycamore_set.jpg            # Sycamore green jumping set
│       ├── champagne_set.jpg           # Champagne royale set on leather stand
│       ├── rider_jacket.jpg            # Midnight navy winter jacket
│       ├── rider_baselayer.jpg         # Dusty rose technical base layer
│       └── lifestyle_warmth.jpg        # Arena lifestyle with hotspot pins
├── css/
│   └── style.css                       # Luxury Scandinavian CSS design system
├── js/
│   ├── products.js                     # Products, sets, currencies, and reviews data
│   └── app.js                          # State management, cart, wishlist, currency logic
├── index.html                          # Master luxury storefront application
├── package.json                        # Project metadata and version configuration
└── README.md
```

---

## 📋 Changelog

### [1.1.0] - 2026-10-07
- **Mobile Side Navigation Overhaul**:
  - Resolved stacking context conflict where the dark overlay backdrop darkened the slide-out menu drawer.
  - Relocated drawer to root DOM alongside modals with `z-index: 220`.
  - Added safe area insets and `visibility` transitions to prevent off-screen focus trapping.
  - Polished close button ergonomics and navigation link arrow cues (`›`).
  - Added mutual exclusion between cart and navigation drawers.
- **Project Versioning**: Established formal project manifest (`package.json`) at v1.1.0.
