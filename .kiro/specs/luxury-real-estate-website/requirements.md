# Requirements Document

## Introduction

This document defines the complete functional and behavioral requirements for the Luxury Real Estate Website — a full-featured, premium frontend application built with React 19, Vite, and Tailwind CSS v4. The site is a real estate platform (not a landing page) that showcases a curated collection of high-end global properties through cinematic visuals, smooth animations, an interactive map, advanced search/filter, agent profiles, testimonials, services, and a polished dark/light theme system. All property data is sourced from a static JavaScript module (`properties.js`); no backend or API calls are required for the frontend.

---

## Glossary

- **App**: Root React component managing loading state and application shell.
- **Loader**: Full-screen cinematic loading animation shown once on initial page load.
- **Navbar**: Fixed glassmorphism navigation bar with mobile hamburger menu.
- **HeroSection**: Fullscreen hero with parallax background, animated headline, search bar, and stats strip.
- **SearchBar**: Inline property search/filter component embedded in the hero section.
- **StatsSection**: Animated counters showing key business metrics.
- **ServicesSection**: Three-column section showcasing Buy / Sell / Invest services.
- **FeaturedSpotlight**: Large-format single featured property showcase with full details preview.
- **LuxuryGrid**: Responsive property card grid with type/status filter tabs.
- **PropertyCard**: Individual card with image, badge, price, stats, and hover effects.
- **TestimonialsSection**: Client review carousel using Swiper.
- **AgentsSection**: Team/agent profile cards.
- **NewsletterSection**: Email subscription CTA section.
- **MapSection**: Interactive React Leaflet map with property markers.
- **PropertyDetails**: Full detail page for a single property.
- **Footer**: Site-wide footer with branding, links, social icons, and contact.
- **ThemeContext**: React context holding `darkMode` boolean and `setDarkMode`.
- **ThemeToggle**: Animated sun/moon icon button.
- **Property**: Data object from `properties.js`.

---

## Requirements

### Requirement 1: Cinematic Loader

**User Story:** As a visitor, I want to see a branded loading animation on first arrival so the site feels premium before content appears.

#### Acceptance Criteria
1. WHEN the application first mounts, THE App SHALL display the Loader as a full-screen overlay.
2. WHILE the Loader is visible, THE App SHALL prevent all page content from being visible.
3. THE Loader SHALL animate the "LuxeEstate" wordmark fading in on a near-black (`#0a0a0a`) background using Framer Motion.
4. THE Loader SHALL animate a gold (`#C9A84C`) underline sliding in from the left beneath the wordmark.
5. WHEN the Loader animation completes after approximately 2000 milliseconds, THE Loader SHALL trigger the `onComplete` callback exactly once.
6. WHEN `onComplete` fires, THE App SHALL set `loading` to `false` and unmount the Loader with a fade-out exit animation.

---

### Requirement 2: Fullscreen Hero Section with Search

**User Story:** As a visitor, I want a cinematic fullscreen hero with a search bar so I can immediately start finding properties.

#### Acceptance Criteria
1. THE HeroSection SHALL render as a fullscreen viewport-height section with a parallax background image and dark overlay.
2. THE HeroSection SHALL animate the eyebrow text, headline, subheadline, and search bar sequentially using `fadeInUp` variants.
3. THE HeroSection SHALL include an inline SearchBar with fields for: keyword/location text input, property type dropdown (All, Villa, Penthouse, Estate, Apartment), and a Search button.
4. WHEN the user submits the SearchBar, THE LuxuryGrid SHALL filter properties matching the keyword and/or type.
5. THE HeroSection SHALL display a stats strip at the bottom showing: "500+ Properties", "200+ Happy Clients", "15+ Years Experience", "50+ Awards Won".
6. THE HeroSection SHALL apply a parallax effect to the background image at 0.4× scroll speed.
7. THE CTA "Explore Properties" button SHALL smooth-scroll to `#properties`.

---

### Requirement 3: Glassmorphism Navigation Bar with Mobile Menu

**User Story:** As a visitor on any device, I want a navigation bar that works on mobile and desktop.

#### Acceptance Criteria
1. THE Navbar SHALL be fixed to the top of the viewport at all times with `z-index: 50`.
2. THE Navbar SHALL display: logo, nav links (Home, Properties, Services, Agents, Contact), and ThemeToggle.
3. WHEN the viewport is below `md` breakpoint, THE Navbar SHALL show a hamburger menu icon; clicking it SHALL open a full-screen mobile menu overlay.
4. WHEN the user scrolls past 80px, THE Navbar SHALL increase backdrop blur and add a bottom border.
5. THE Navbar SHALL consume ThemeContext and apply appropriate styles.

---

### Requirement 4: Dark/Light Theme System

**User Story:** As a visitor, I want to toggle between dark and light modes with my preference saved across sessions.

#### Acceptance Criteria
1. THE ThemeContext SHALL initialize `darkMode` from `localStorage.getItem('theme') === 'dark'`.
2. WHEN `darkMode` changes, THE ThemeContext SHALL toggle the `dark` class on `document.documentElement` and persist to localStorage.
3. THE ThemeToggle SHALL animate the sun/moon icon swap using Framer Motion `AnimatePresence`.
4. ALL theme-sensitive elements SHALL use `transition-colors duration-500` to prevent jarring flashes.

---

### Requirement 5: Stats / Numbers Section

**User Story:** As a visitor, I want to see key business metrics to build trust in the brand.

#### Acceptance Criteria
1. THE StatsSection SHALL display four animated counter stats: "500+ Properties Listed", "200+ Happy Clients", "15+ Years Experience", "50+ Awards Won".
2. WHEN the StatsSection enters the viewport, THE counters SHALL animate from 0 to their target value over 2 seconds using a count-up animation.
3. THE StatsSection SHALL use a dark background (`#0a0a0a`) with gold accent numbers regardless of theme.
4. THE StatsSection SHALL animate in with a staggered `fadeInUp` using `whileInView`.

---

### Requirement 6: Services Section

**User Story:** As a visitor, I want to understand what services are offered so I know how the agency can help me.

#### Acceptance Criteria
1. THE ServicesSection SHALL display three service cards: "Buy Property", "Sell Property", "Invest Smart".
2. EACH service card SHALL include: an icon, title, short description, and a "Learn More" link.
3. WHEN the user hovers over a service card, THE card SHALL lift with a gold border highlight animation.
4. THE ServicesSection SHALL animate in with staggered `fadeInUp` using `whileInView`.

---

### Requirement 7: Featured Property Spotlight

**User Story:** As a visitor, I want to see a highlighted featured property in a large-format showcase so I can immediately see the best listing.

#### Acceptance Criteria
1. THE FeaturedSpotlight SHALL display the first `featured: true` property in a large two-column layout (image left, details right on desktop; stacked on mobile).
2. THE FeaturedSpotlight SHALL show: large image, "Featured Property" badge, title, price, location, description excerpt, beds/baths/sqft stats, and a "View Property" CTA button.
3. WHEN the user clicks "View Property", THE Router SHALL navigate to `/property/:id`.
4. THE FeaturedSpotlight SHALL animate in with a split entrance (image slides from left, content from right) using Framer Motion.

---

### Requirement 8: Dynamic Property Grid with Advanced Filters

**User Story:** As a visitor, I want to browse properties with filter options by type and status.

#### Acceptance Criteria
1. THE LuxuryGrid SHALL accept a `properties` array prop and render a `PropertyCard` for each item.
2. THE LuxuryGrid SHALL display filter tabs: "All", "Featured", "Villa", "Penthouse", "Estate", "Apartment".
3. WHEN a type filter is selected, THE LuxuryGrid SHALL render only properties matching that `type` field.
4. THE LuxuryGrid SHALL also accept a `searchQuery` prop; WHEN provided, it SHALL filter properties whose `title` or `location` contains the query string (case-insensitive).
5. THE LuxuryGrid SHALL render a responsive grid: 1 col mobile, 2 col `md`, 3 col `lg`, 4 col `xl`.
6. THE LuxuryGrid SHALL animate cards in with staggered `whileInView` entrance.
7. IF no properties match the active filter, THE LuxuryGrid SHALL render a "No properties found" message.

---

### Requirement 9: Luxury Property Cards

**User Story:** As a visitor, I want each property card to display key information with elegant hover effects.

#### Acceptance Criteria
1. THE PropertyCard SHALL display: primary image, type badge, title, price (gold), location, beds, baths, sqft.
2. WHEN the user hovers, THE PropertyCard SHALL lift 8px and deepen shadow using Framer Motion `whileHover`.
3. WHEN the user hovers, THE image SHALL zoom to `scale-110` over 700ms.
4. THE PropertyCard SHALL render a glassmorphism info overlay at the bottom.
5. THE PropertyCard SHALL wrap in a `<Link to="/property/:id">`.
6. IF the image fails to load, THE PropertyCard SHALL show a gold gradient fallback.

---

### Requirement 10: Testimonials Section

**User Story:** As a visitor, I want to read client reviews to build confidence in the agency.

#### Acceptance Criteria
1. THE TestimonialsSection SHALL display client testimonials in a Swiper carousel with autoplay.
2. EACH testimonial SHALL include: client photo (avatar), name, designation, star rating (5 stars), and review text.
3. THE carousel SHALL have navigation dots and loop infinitely.
4. THE TestimonialsSection SHALL animate in with `whileInView`.

---

### Requirement 11: Agents / Team Section

**User Story:** As a visitor, I want to see the agents so I know who I'll be working with.

#### Acceptance Criteria
1. THE AgentsSection SHALL display at least 4 agent cards in a responsive grid.
2. EACH agent card SHALL include: photo, name, title/role, phone number, email, and social media links.
3. WHEN the user hovers over an agent card, THE card SHALL show a gold overlay with contact icons.
4. THE AgentsSection SHALL animate in with staggered `whileInView`.

---

### Requirement 12: Newsletter / CTA Section

**User Story:** As a visitor, I want to subscribe to property updates so I don't miss new listings.

#### Acceptance Criteria
1. THE NewsletterSection SHALL display a full-width CTA section with a headline, subtext, and email input + subscribe button.
2. WHEN the user submits a valid email, THE form SHALL show a success message "Thank you! You're subscribed." and clear the input.
3. IF the email is invalid, THE form SHALL show an inline validation error.
4. THE NewsletterSection SHALL use a dark background with gold accents.

---

### Requirement 13: Interactive Property Map

**User Story:** As a visitor, I want to see all properties on an interactive map.

#### Acceptance Criteria
1. THE MapSection SHALL render a React Leaflet `MapContainer` at 500px height with rounded corners.
2. THE MapSection SHALL render a gold SVG `Marker` for every property with valid `lat`/`lng`.
3. WHEN a marker is clicked, THE MapSection SHALL show a popup with title, price, and "View Details →" link.
4. WHEN `singleProperty` prop is provided, THE map SHALL center on that property at zoom 14.
5. WHILE dark mode is active, THE map tiles SHALL use the CSS invert filter.

---

### Requirement 14: Property Details Page

**User Story:** As a visitor, I want a full detail page for any property with all information.

#### Acceptance Criteria
1. WHEN navigating to `/property/:id` with a valid id, THE PropertyDetails SHALL render the full detail view.
2. IF the id is invalid, THE PropertyDetails SHALL render a "Property Not Found" message with a back link.
3. THE PropertyDetails SHALL display: fullscreen hero with image/title/price/back button, stats bar, description, amenities list, image gallery (Swiper), map, enquiry form, and footer.
4. THE amenities list SHALL display icons + labels for: Swimming Pool, Private Gym, Home Cinema, Wine Cellar, Smart Home, Concierge Service, Private Parking, Security System.
5. THE enquiry form SHALL include: Name, Email, Phone, Message fields and a "Send Enquiry" button with a WhatsApp CTA.
6. WHEN the enquiry form is submitted with valid data, THE form SHALL show a success message.
7. THE PropertyDetails page SHALL animate in using `pageVariants`.

---

### Requirement 15: Smooth Animations and Page Transitions

**User Story:** As a visitor, I want all interactions and page changes to feel smooth and deliberate.

#### Acceptance Criteria
1. THE App SHALL wrap `<Routes>` in `<AnimatePresence>` with location key for page transitions.
2. ALL `whileInView` animations SHALL use `viewport={{ once: true }}`.
3. ALL interactive elements SHALL respond to `whileHover` within 100ms.
4. THE shared animation variants (`fadeInUp`, `fadeIn`, `staggerContainer`, `pageVariants`, `slideInLeft`, `slideInRight`) SHALL be exported from `src/utils/animations.js`.

---

### Requirement 16: Fully Responsive Design

**User Story:** As a visitor on any device, I want the site to display correctly at all screen sizes.

#### Acceptance Criteria
1. ALL components SHALL use mobile-first Tailwind responsive prefixes.
2. THE Navbar SHALL show a hamburger menu on mobile.
3. THE LuxuryGrid SHALL be 1 col mobile → 2 col md → 3 col lg → 4 col xl.
4. THE Footer SHALL be 1 col mobile → 2 col md → 4 col lg.
5. THE FeaturedSpotlight SHALL stack on mobile and go side-by-side on `lg`.

---

### Requirement 17: Static Property Data (Enhanced)

**User Story:** As a developer, I want rich property data with all fields needed for a real estate site.

#### Acceptance Criteria
1. THE `properties.js` module SHALL export an array of at least 8 `Property` objects.
2. EACH `Property` SHALL include: `id`, `title`, `type` (Villa/Penthouse/Estate/Apartment), `status` (For Sale/For Rent), `price`, `location`, `description`, `image`, `images` (array of 3+ URLs), `beds`, `baths`, `sqft`, `lat`, `lng`, `featured`, `amenities` (array of strings), `yearBuilt`, `garage`.
3. THE module SHALL include properties of all 4 types.
4. ALL properties SHALL have valid geographic coordinates.

---

### Requirement 18: Site Footer (Enhanced)

**User Story:** As a visitor, I want a comprehensive footer with all key information.

#### Acceptance Criteria
1. THE Footer SHALL render with `bg-[#0a0a0a]` regardless of theme.
2. THE Footer SHALL display four columns: Brand+social, Quick Links, Property Types, Contact.
3. THE Footer SHALL display social icons for Instagram, Twitter/X, LinkedIn, Facebook, YouTube.
4. THE Footer SHALL display a gold divider above the copyright row.
5. THE Footer SHALL display "© 2025 LuxeEstate. All rights reserved." with privacy policy and terms links.
