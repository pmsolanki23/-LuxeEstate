# Implementation Plan

## Overview

Full premium rebuild of the Luxury Real Estate Website. The existing scaffold (Navbar, HeroSection, ThemeContext, App, main) is upgraded and 12 new components/sections are added. Tasks are ordered by dependency — foundation first, then components, then pages, then wiring.

## Tasks

- [ ] 1. Foundation — index.html, index.css, animations, properties data
  - [ ] 1.1 Update `index.html`: add Google Fonts preconnect + link for Playfair Display (300,400,500,700) and Poppins (300,400,500,600); set title to "LuxeEstate — Luxury Real Estate"
  - [ ] 1.2 Rewrite `src/index.css`: add `@theme` block with color tokens (`--color-gold: #C9A84C`, `--color-gold-light: #E8C96A`, `--color-cream: #F5F0E8`, `--color-charcoal: #1a1a1a`, `--color-near-black: #0a0a0a`) and font tokens (`--font-playfair`, `--font-poppins`); set body default font to Poppins; add `.dark .leaflet-tile` invert filter; add Swiper and Leaflet popup overrides
  - [ ] 1.3 Create `src/utils/animations.js` exporting `fadeInUp`, `fadeIn`, `staggerContainer`, `pageVariants` Framer Motion variant objects
  - [ ] 1.4 Rewrite `src/data/properties.js` with 10 property objects each containing: `id`, `title`, `price`, `location`, `description`, `image`, `images` (array of 3 Unsplash URLs), `beds`, `baths`, `sqft`, `lat`, `lng`, `featured`, `type` ('sale'|'rent'), `tag`, `yearBuilt`, `garage`, `pool`; include at least 3 featured and 3 rent properties with real coordinates
  - [ ] 1.5 Update `ThemeContext.jsx`: initialize `darkMode` from `localStorage.getItem('theme') === 'dark'` (lazy useState); update useEffect to use `classList.toggle('dark', darkMode)` and write to localStorage on every change

- [ ] 2. ThemeToggle and Loader components
  - [ ] 2.1 Create `src/components/ThemeToggle.jsx`: reads `darkMode`/`setDarkMode` from ThemeContext; renders `FaSun` (dark mode) / `FaMoon` (light mode) wrapped in Framer Motion `AnimatePresence` with rotate+scale cross-fade transition; gold hover color
  - [ ] 2.2 Create `src/components/Loader.jsx`: full-screen fixed `bg-[#0a0a0a]` overlay; animate "LuxeEstate" wordmark fade-in (Playfair Display, white, `text-5xl md:text-7xl`); animate gold underline `scaleX` from 0→1 with 0.5s delay; animate tagline "Curating the World's Finest Properties" fade-in; call `onComplete` after 2000ms via setTimeout; wrap root in `motion.div` with exit `opacity: 0` for AnimatePresence

- [ ] 3. Navbar with mobile menu
  - [ ] 3.1 Rewrite `src/components/Navbar.jsx`: add `scrolled` state with scroll listener (threshold 80px); add `menuOpen` state for mobile menu; replace inline toggle with `<ThemeToggle />`; add nav links "Properties", "Featured", "Map", "Services", "Contact" (hidden below `md`, smooth-scroll on click); add hamburger icon (`FaBars`/`FaTimes`) visible below `md`; apply conditional glassmorphism classes based on `scrolled`; add `font-playfair` to logo
  - [ ] 3.2 Add full-screen mobile menu overlay: renders when `menuOpen === true`; `fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl`; stacked nav links with `fadeInUp` stagger; close button top-right; clicking a link closes the menu and smooth-scrolls

- [ ] 4. HeroSection premium upgrade
  - [ ] 4.1 Rewrite `src/components/HeroSection.jsx`: add parallax via `useScroll`+`useTransform` on background `motion.img`; wrap content in `motion.div` with `staggerContainer`; animate eyebrow, headline, subheadline, search bar, CTA buttons each with `fadeInUp` variant; add property search bar (location text input + gold "Search" button, UI only); add two CTA buttons: "Explore Properties" (smooth-scroll `#properties`) and "View on Map" (smooth-scroll `#map`); add floating stat badges ("500+ Properties", "50+ Countries") positioned absolutely; add animated scroll indicator at bottom center

- [ ] 5. StatsBar component
  - [ ] 5.1 Create `src/components/StatsBar.jsx`: full-width `bg-[#0a0a0a]` strip; render 4 stats ("500+", "25+", "50+", "98%") with gold large numbers, white labels, vertical gold dividers between; animate each stat with `fadeInUp` stagger via `whileInView viewport={{ once: true }}`; stats stack 2×2 on mobile, 4-column on `md+`

- [ ] 6. FeaturedSection component
  - [ ] 6.1 Create `src/components/FeaturedSection.jsx`: accepts `properties` prop; filter to `featured === true`; render a Swiper carousel with `Navigation` module; `slidesPerView: 1` mobile, `1.2` tablet, `2.5` desktop; each slide is `h-[500px]` with full-bleed image, dark gradient overlay, property title/location/price overlay at bottom, "View Property →" button; `whileHover` scale `1.02` on each card; section header "Featured Listings" with gold line; "View All Properties →" link smooth-scrolling to `#properties`; import `swiper/css` and `swiper/css/navigation`

- [ ] 7. PropertyCard component
  - [ ] 7.1 Create `src/components/PropertyCard.jsx`: accepts `property` prop; wrap in `motion.div` with `fadeInUp` variant and `whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}`; render image with `group-hover:scale-110 transition-transform duration-700`; render `onError` fallback to gold gradient data URI; render glassmorphism overlay `bg-black/50 backdrop-blur-sm` at bottom with title (Playfair), price (gold Poppins semibold), location; render stats row with `FaBed`, `FaBath`, `FaRulerCombined` icons; render type badge ("For Sale"/"For Rent") top-right; render tag badge ("New Listing" etc.) top-left if `property.tag` exists; wrap entire card in `<Link to="/property/:id">`

- [ ] 8. LuxuryGrid component
  - [ ] 8.1 Create `src/components/LuxuryGrid.jsx`: accepts `properties` prop; local `filter` state ('all'|'featured'|'sale'|'rent'); compute `filteredProperties` based on filter; render section header "Our Properties" with gold line; render 4 filter tab buttons (All, Featured, For Sale, For Rent) with active gold style; render `motion.div` grid with `staggerContainer` + `whileInView viewport={{ once: true, amount: 0.2 }}`; `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`; render `<PropertyCard>` for each filtered property; render "No properties found" if empty; add `id="properties"` to section

- [ ] 9. ServicesSection component
  - [ ] 9.1 Create `src/components/ServicesSection.jsx`: render 3 service cards (Buy, Sell, Invest) each with a large gold react-icon (`FaHome`, `FaHandshake`, `FaChartLine`), Playfair title, Poppins description, "Learn More →" link; `whileHover={{ y: -8 }}` + gold bottom border on hover; staggered `fadeInUp` via `whileInView`; section header "Our Services" with gold line; alternating background from adjacent sections

- [ ] 10. TestimonialsSection component
  - [ ] 10.1 Create `src/components/TestimonialsSection.jsx`: render Swiper carousel with `Autoplay` and `Pagination` modules; `autoplay={{ delay: 4000, pauseOnMouseEnter: true }}`; `slidesPerView: 1` mobile, `2` tablet, `3` desktop; at least 4 hardcoded testimonials each with quote, name, title, location, 5 gold `FaStar` icons, and avatar (Unsplash face photo URL); `bg-[#0a0a0a]` background; section header "What Our Clients Say"; import `swiper/css/autoplay` and `swiper/css/pagination`

- [ ] 11. NewsletterSection component
  - [ ] 11.1 Create `src/components/NewsletterSection.jsx`: full-width section with dark background and subtle gold gradient; headline "Stay Ahead of the Market" in Playfair Display; subheadline text; email input + gold "Subscribe" button (flex-row desktop, stacked mobile); local `submitted` state — on form submit set `submitted = true` and show "Thank you! You're on the list." success message; `whileInView` fade-in animation

- [ ] 12. MapSection component
  - [ ] 12.1 Create `src/components/MapSection.jsx`: accepts `properties` array and `singleProperty` (default null); define `goldIcon` via `L.divIcon` with gold SVG pin; compute center/zoom based on `singleProperty`; render `<MapContainer>` `h-[500px] rounded-2xl`; render `<TileLayer>` OpenStreetMap; render `<Marker>` for each property with valid lat/lng using goldIcon; render `<Popup>` with title, price, "View Details →" Link; wrap section in `motion.div` with `whileInView` fade-in; add section header "Explore Locations" (hidden when `singleProperty` is set); add `id="map"` to section wrapper

- [ ] 13. Footer premium upgrade
  - [ ] 13.1 Create `src/components/Footer.jsx`: `bg-[#0a0a0a]`; top section with large "LuxeEstate" wordmark in Playfair Display; 4-column grid (Brand+social, Quick Links, Services, Contact) — 1 col mobile, 2 col `md`, 4 col `lg`; social icons: Instagram, Twitter/X, LinkedIn, Facebook, YouTube (`FaYoutube`); gold divider above copyright; copyright "© 2025 LuxeEstate. All rights reserved." with "Privacy Policy" link; staggered `fadeInUp` via `whileInView`; add `id="contact"` to footer

- [ ] 14. Home page assembly
  - [ ] 14.1 Rewrite `src/pages/Home.jsx`: import all sections; render in order: `<HeroSection />`, `<StatsBar />`, `<FeaturedSection properties={featured} />`, `<ServicesSection />`, `<LuxuryGrid properties={properties} />`, `<TestimonialsSection />`, `<NewsletterSection />`, `<MapSection properties={properties} />`, `<Footer />`; wrap root in `motion.div` with `pageVariants`; apply `bg-cream dark:bg-near-black transition-colors duration-500`

- [ ] 15. PropertyDetails page
  - [ ] 15.1 Create `src/pages/PropertyDetails.jsx`: use `useParams` to get id; find property from array; render "Property Not Found" with back link if not found; render fullscreen hero `h-[70vh]` with image, gradient overlay, title, price, back button (`FaArrowLeft`); render stats bar (beds, baths, sqft, location, type, yearBuilt, garage, pool) — stacked mobile, horizontal `md+`; animate stats with staggered `fadeInUp`; render description section "About This Property"; render Swiper image carousel using `property.images` array with Navigation+Pagination; render "Enquire About This Property" form section (name, email, message inputs + gold submit button, UI only with success state); render "Similar Properties" section showing 3 other properties as `<PropertyCard>`; render `<MapSection singleProperty={property} properties={[property]} />`; render `<Footer />`; wrap root in `motion.div` with `pageVariants`

- [ ] 16. App.jsx and main.jsx wiring
  - [ ] 16.1 Rewrite `src/main.jsx`: wrap render with `<ThemeProvider><BrowserRouter><App /></BrowserRouter></ThemeProvider>`; import `leaflet/dist/leaflet.css` before component tree
  - [ ] 16.2 Rewrite `src/App.jsx`: add `loading` state (default `true`); render `<AnimatePresence>` wrapping `<Loader onComplete={() => setLoading(false)} />` when loading; when not loading render `<Navbar />` + `<AnimatePresence mode="wait">` wrapping `<Routes>` with location key; define routes: `/` → `<Home>`, `/property/:id` → `<PropertyDetails>`, `*` → `<Navigate to="/" replace />`; apply `bg-cream dark:bg-near-black transition-colors duration-500` to root div

## Notes

- All dependencies are already installed in `package.json` (framer-motion, react-leaflet, leaflet, swiper, react-icons, react-router-dom)
- Tailwind v4 uses CSS-based `@theme` config — no `tailwind.config.js` needed
- Dark mode is via `@custom-variant dark` already in `index.css` — use `dark:` prefix as normal
- Swiper CSS must be imported per-component, not globally
- Leaflet CSS must be imported in `main.jsx` before the component tree
- `BrowserRouter` must be in `main.jsx` (not `App.jsx`) so `useLocation()` works inside `App`
- All `whileInView` animations must use `viewport={{ once: true }}` to fire only once
- The `goldIcon` in MapSection bypasses Leaflet's default icon asset resolution bug in Vite

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "3.2", "5.1", "6.1", "7.1", "9.1", "10.1", "11.1", "12.1"] },
    { "id": 3, "tasks": ["4.1", "8.1", "13.1"] },
    { "id": 4, "tasks": ["14.1", "15.1"] },
    { "id": 5, "tasks": ["16.1", "16.2"] }
  ]
}
```
