# ByPass — Frontend

> **Cut out the broker. Connect directly.**

ByPass is a boutique mobile property listing app for the Kyanja–Najjera–Ntinda corridor in Kampala, Uganda. It lets renters browse verified properties and contact landlords or managers directly via WhatsApp — no broker fees, no middlemen.

Built and operated by **Pearl Bridge Group** / **Pearl Ridge Properties**.

---

## The Problem

Property searching in Kampala is broken:

- Brokers charge one month's rent just to show a flat
- Listings on social media are fake, outdated, or never replied to
- Diaspora landlords have no way to manage or market remotely
- Renters waste weekends doing viewings for properties already taken

ByPass fixes this by listing only verified properties — short-stay, long-stay furnished, and unfurnished — with direct WhatsApp contact and transparent pricing.

---

## Target Users

| User | Need |
|------|------|
| **Renters** | Find a verified property in Najjera, Kyanja, Ntinda or nearby without paying a broker |
| **Diaspora renters** | Book short-stay accommodation from abroad before arriving in Kampala |
| **Landlords** | List a property and receive enquiries directly on WhatsApp without a middleman |
| **Pearl Ridge clients** | Full-service management — furnishing, guest coordination, monthly payouts |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Ionic 8](https://ionicframework.com) + [Angular 17](https://angular.dev) |
| Component style | Standalone components (no NgModules) |
| Mobile runtime | [Capacitor 6](https://capacitorjs.com) (iOS + Android) |
| Language | TypeScript 5 |
| Forms | Angular Reactive Forms |
| Icons | [Ionicons](https://ionic.io/ionicons) via `addIcons()` |
| Fonts | DM Sans (UI) + DM Serif Display (headings) via Google Fonts |
| Styling | SCSS — per-component + global stylesheet |
| Data | Hardcoded `PropertyService` (Rails API in Phase 2) |
| Navigation | Angular Router with lazy-loaded standalone pages |

---

## Brand Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--bypass-primary` | `#7C3AED` | Buttons, active states, hero backgrounds |
| `--bypass-accent` | `#FDE68A` | Eyebrow labels, highlights |
| `--bypass-background` | `#F9F7FF` | Page background |
| `--bypass-card` | `#FFFFFF` | Card surfaces |
| `--bypass-text` | `#1A1A2E` | Body copy |
| `--bypass-text-muted` | `#6B7280` | Secondary text, hints |
| `--bypass-border` | `#E5E7EB` | Dividers, input borders |

All tokens are defined in `src/theme/variables.scss` and consumed via CSS custom properties throughout the app.

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.routes.ts              # Top-level routes (tabs shell + property detail)
│   │   ├── tabs/
│   │   │   ├── tabs.page.ts           # Tab bar shell (3 tabs)
│   │   │   └── tabs.page.html
│   │   ├── home/
│   │   │   ├── home.page.ts           # Browse listings with filter chips
│   │   │   ├── home.page.html
│   │   │   └── home.page.scss
│   │   ├── browse/
│   │   │   ├── browse.page.ts         # Search + filter + sort
│   │   │   ├── browse.page.html
│   │   │   └── browse.page.scss
│   │   ├── property-detail/
│   │   │   ├── property-detail.page.ts   # Full property view + gallery
│   │   │   ├── property-detail.page.html
│   │   │   └── property-detail.page.scss
│   │   ├── landlords/
│   │   │   ├── landlords.page.ts      # Landlord registration form
│   │   │   ├── landlords.page.html
│   │   │   └── landlords.page.scss
│   │   └── services/
│   │       └── property.service.ts    # Single source of truth for property data
│   ├── assets/
│   │   └── properties/
│   │       ├── najjera-3bed/          # 7 real photos (living room, bedrooms, overview)
│   │       └── Najerra_unfurnished/   # 3 real photos (kitchen, bathroom, room)
│   ├── theme/
│   │   └── variables.scss             # Brand CSS custom properties + Ionic overrides
│   └── global.scss                    # Ionic imports, Google Fonts, shared utility classes
├── capacitor.config.ts
├── angular.json
├── package.json
└── README.md
```

---

## Routing

```
/                     → redirects to /home
/home                 → Home page (tab 1)
/browse               → Browse page (tab 2)
/landlords            → Landlords page (tab 3)
/property/:id         → Property Detail (full screen, no tab bar)
```

The property detail route sits **outside** the tabs shell so the tab bar never appears on it. The component uses `host: { class: 'ion-page' }` to remain compatible with Ionic's forward/back animation system.

---

## Pages

### Home (`/home`)

The main listing feed. Shows all properties with a horizontal filter chip row.

**Features:**
- Hero banner with neighbourhood tagline
- Category filter chips: All / Short Stay / Long Stay Furnished / Unfurnished
- Property cards: photo, badge, title, location, price, up to 3 amenity chips
- Availability tag (`Available from [date]`) when `availableFrom` is set
- WhatsApp quick-contact button per card (stops card navigation via `stopPropagation`)
- "List Your Property" CTA banner linking to the Landlords tab
- Tapping a card navigates to `/property/:id`

### Browse (`/browse`)

Advanced search and filter view. Every change re-filters the live results count instantly.

**Features:**
- Full-text search across title, location, and area
- Category filter chips (same as Home)
- Area filter chips: All / Najjera / Kyanja / Ntinda / Kisaasi / Bukoto
- Sort: Newest / Price Low–High / Price High–Low
- Live results count (`3 properties found`)
- Empty state with illustration when no results match
- Same property card design as Home

### Property Detail (`/property/:id`)

Full-screen property view with photo gallery and contact actions.

**Features:**
- CSS scroll-snap photo gallery (no Swiper dependency) with dot indicators — active dot animates to pill shape
- Floating back button (top-left) and Pearl Ridge "Managed" pill (top-right) overlaid on gallery
- Property headline: title, location, price, period
- Beds / Baths / Category info row
- Amenity chips with matching Ionicons
- Description section (truncated to 120 chars if long, with expand toggle — _planned_)
- Sticky action bar pinned to bottom: WhatsApp button (flex: 3) + Call button (flex: 1)
- WhatsApp opens with a pre-filled message: _"Hi, I found your property on ByPass and I'm interested in the [title] in [location]. Could you share more details?"_

### Landlords (`/landlords`)

Lead-capture page for property owners who want to list with ByPass or use Pearl Ridge's management service.

**Features:**
- Hero banner: "Earn more. Stress less."
- Horizontal scroll benefit cards: Earn More / Verified Renters / Manage Remotely
- Pearl Ridge full-management CTA → opens WhatsApp with pre-filled management enquiry
- Registration form (Reactive Forms, all fields validated):
  - Name, Phone, WhatsApp number, Property Area (select), Property Type (select), Bedrooms (select), Additional Notes (textarea)
- Inline field-level error messages on submit or field blur
- Success state with `fadeUp` animation — shown after valid submission

---

## Property Data

All properties are defined in `PropertyService` at `src/app/services/property.service.ts`.

### `Property` Interface

```typescript
interface Property {
  id: number;
  title: string;
  location: string;         // Display string, e.g. "Najjera, Kampala"
  area: string;             // Filter key, e.g. "Najjera"
  category: 'short-stay' | 'long-furnished' | 'unfurnished';
  bedrooms: number;
  bathrooms: number;
  price: number;
  currency: 'USD' | 'UGX';
  period: 'night' | 'week' | 'month';
  amenities: string[];
  images: string[];         // Asset paths or external URLs
  available: boolean;
  availableFrom?: string;   // Optional, e.g. "July 2026"
  managed: boolean;         // true = Pearl Ridge managed
  whatsapp: string;         // Without '+', e.g. "447718313166"
  description: string;
}
```

### Current Listings

| ID | Title | Area | Category | Price | Managed | Images |
|----|-------|------|----------|-------|---------|--------|
| 1 | 3 Bedroom Luxury Apartment | Najjera | Short Stay | $120/night | Yes | 7 real photos |
| 2 | 2-Bed Furnished Apartment | Bukoto | Long Furnished | $800/month | No | Placeholder |
| 3 | 2 Bedroom Apartment | Kyanja | Unfurnished | UGX 900k/month | No | Placeholder |
| 4 | 1 Bedroom Furnished Apartment | Ntinda | Long Furnished | $600/month | Yes | Placeholder |
| 5 | 2 Bedroom Apartment | Najjera | Unfurnished | UGX 2m/month | No | 3 real photos |

**WhatsApp contact number** for all properties: `+44 7718 313166` (Pearl Ridge Properties)

---

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd BYPASS/frontend

# Install dependencies
npm install

# Start dev server (browser)
ionic serve

# Or with live reload on a connected device
ionic capacitor run android --livereload
ionic capacitor run ios --livereload
```

The app runs at `http://localhost:8100` by default.

### Build

```bash
# Production web build
ionic build --prod

# Sync to native projects
npx cap sync

# Open in Android Studio
npx cap open android

# Open in Xcode
npx cap open ios
```

---

## Key Implementation Notes

### Data source
`PropertyService` is the single source of truth. Both `HomePage` and `BrowsePage` read from `propertyService.properties`. `PropertyDetailPage` calls `propertyService.getById(id)`. When the Rails API is wired up (Phase 2), this service is the only file that needs to change.

### Photo gallery
Built with pure CSS `scroll-snap` — no Swiper or third-party carousel library. The `.gallery` container uses `scroll-snap-type: x mandatory`; each `.gallery-slide` uses `scroll-snap-align: start`. An Angular `(scroll)` event listener computes the active dot by dividing `scrollLeft` by `offsetWidth`.

### Standalone components
Every page and component explicitly declares its imports. If an Ionic component is missing from the `imports: []` array of a page, it renders as an unknown element with no error in the browser console — this is the most common source of invisible bugs.

### Icon registration
Each component calls `addIcons({ ... })` with only the icons it uses. If an `<ion-icon>` renders blank, the icon was not registered in that component.

### WhatsApp integration
`window.open(\`https://wa.me/${number}?text=${encodedMsg}\`, '_blank')` — works on both web and native Capacitor builds. The number is stored without the `+` prefix.

---

## Phase 2 — Rails API Integration

The backend will be a **Rails 7 API** (`/api/v1/...`) with a PostgreSQL database.

### Planned Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/properties` | Fetch all active listings |
| `GET` | `/api/v1/properties/:id` | Fetch single property |
| `POST` | `/api/v1/properties` | Create listing (landlord portal) |
| `POST` | `/api/v1/landlord_enquiries` | Submit landlord registration form |
| `POST` | `/api/v1/enquiries` | Submit renter enquiry for a property |
| `GET` | `/api/v1/areas` | Fetch dynamic area list |

### Planned Database Tables

**`properties`**
```
id, title, location, area, category, bedrooms, bathrooms,
price, currency, period, description, whatsapp_number,
available, available_from, managed_by_pearl_ridge,
created_at, updated_at
```

**`property_images`**
```
id, property_id, url, position, created_at
```

**`property_amenities`**
```
id, property_id, name
```

**`landlord_enquiries`**
```
id, name, phone, whatsapp, area, property_type, bedrooms,
notes, status (new/contacted/listed), created_at
```

**`renter_enquiries`**
```
id, property_id, name, phone, message, created_at
```

### Migration Plan

1. Build the Rails API with the endpoints above
2. Replace the hardcoded array in `PropertyService` with `HttpClient` calls
3. Wire up the landlord form `onSubmit()` to `POST /api/v1/landlord_enquiries`
4. Add an `environment.ts` with `apiUrl` pointing to staging / production
5. Add loading skeletons to Home and Browse while data fetches

---

## Phase 3 — Business Features

- **User accounts** — save favourites, view enquiry history
- **Landlord dashboard** — manage listings, view enquiry leads, toggle availability
- **Push notifications** — new enquiry alerts for landlords via Capacitor Push
- **Photo upload** — landlords upload property images from the app
- **Map view** — property pins on a Kampala map (OpenStreetMap / Mapbox)
- **Price history** — track rent trends per area over time
- **Pearl Ridge portal** — internal management tool for bookings, cleaning, payouts
- **Multi-language** — English + Luganda

---

## Deployment

| Target | Plan |
|--------|------|
| **Web** | Hosted on Render / Fly.io behind a custom domain |
| **Android** | Google Play Store — Pearl Bridge Group developer account |
| **iOS** | Apple App Store — Pearl Bridge Group developer account |
| **API** | Rails on Render (free tier → paid on launch) |
| **Database** | PostgreSQL on Render or Supabase |
| **Images** | Cloudinary (free tier) with Rails Active Storage adapter |

---

## Contributing

This is a private product owned by **Pearl Bridge Group**. Development is led internally.

If you're working on this codebase:

1. Branch from `main` using `feat/`, `fix/`, or `chore/` prefixes
2. Run `ionic serve` and verify your changes in the browser before committing
3. Test on a real device (or emulator) for any layout or gesture changes
4. All property data changes go through `PropertyService` — don't hardcode data in page components
5. Keep Ionic component imports explicit — no wildcard imports

---

## Business Context

ByPass is the **consumer-facing product** of Pearl Bridge Group. It is designed to:

- Establish Pearl Ridge Properties as the trusted brand for verified rental listings in Kampala's northern corridor
- Generate direct landlord leads via the registration form
- Convert diaspora renters into managed-stay bookings via the Pearl Ridge WhatsApp flow
- Eventually become the primary listing platform for the Kyanja–Najjera–Ntinda market

This app deliberately avoids broker relationships. Every listing connects directly to either the landlord or Pearl Ridge's management team.

---

## License

Private — All rights reserved. Pearl Bridge Group © 2025.
