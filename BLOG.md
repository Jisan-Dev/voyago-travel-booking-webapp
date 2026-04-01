# Building Voyago: A Full-Stack Hotel Booking Platform from Scratch

*A deep dive into the architecture, design decisions, and technical challenges behind a production-ready hotel booking web application.*

---

## The Problem

Hotel booking platforms are deceptively complex. On the surface, they seem straightforward — show some hotels, let users pick dates, and process a payment. But beneath that simplicity lies a web of interconnected challenges: managing date-based availability, securing user authentication across multiple providers, processing real payments, and delivering a UI polished enough to earn user trust.

I wanted to build one from scratch — not to replicate Booking.com, but to push my full-stack skills into real-world territory and solve genuinely hard problems with modern tools.

**Voyago** is the result: a full-stack hotel booking web app built with Next.js, MongoDB, Stripe, and Better Auth, deployed live on Vercel.

> 🔗 **Live Demo:** [voyago-travel-booking-webapp.vercel.app](https://voyago-travel-booking-webapp.vercel.app)

---

## Tech Stack at a Glance

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn UI + Radix UI |
| **Database** | MongoDB + Mongoose |
| **Authentication** | Better Auth (credentials + OAuth) |
| **Payments** | Stripe |
| **Animations** | Motion (Framer Motion) |
| **Deployment** | Vercel |

---

## Architecture Overview

Voyago follows Next.js's **App Router** conventions with a clear separation of concerns:

```
voyago/
├── app/
│   ├── (auth)/          # Login & registration routes
│   ├── (home)/          # Main app routes (hotels, bookings, payment)
│   └── api/             # API routes (auth, hotels, payment intents)
├── components/          # Reusable UI components
├── DAL/                 # Data Access Layer (server actions)
├── lib/                 # Auth config, DB connection, Mongoose models
├── providers/           # React context providers
├── utils/               # Utility functions
└── types.ts             # Shared TypeScript interfaces
```

### Key Architectural Decisions

**1. Route Groups for Layout Isolation**

I used Next.js route groups — `(auth)` and `(home)` — to provide different layouts for authenticated vs. unauthenticated experiences. The auth pages get a minimal, centered layout while the main app gets the full navbar and navigation structure. This kept the routing clean without duplicating layout logic.

**2. A Dedicated Data Access Layer (DAL)**

Rather than scattering database queries across page components and API routes, I centralized all data fetching into a `DAL/` directory. Every function here is marked `"use server"` and follows a consistent pattern: authenticate → connect → query → serialize.

```typescript
export async function getAllHotels(
  destination: string,
  checkin: string,
  checkout: string,
  category: string,
  price: string,
  sort: string,
) {
  await checkAuth();
  await connectToDatabase();
  // ...build query, fetch, and return serialized results
}
```

This approach gave me a single source of truth for all database interactions and made it trivial to add auth checks consistently across every data operation.

**3. Hybrid Data Fetching**

The app uses both **Server Components** (for pages like hotel details and bookings) and **Client Components** (for interactive elements like search, filters, and payment forms). The hotel details page, for example, fetches data server-side via the DAL and passes it down as props, while the hotel listing page uses client-side fetching through an API route for dynamic filtering without full-page reloads.

---

## Deep Dive: The Interesting Problems

### 🔐 Authentication with Better Auth

I chose [Better Auth](https://www.npmjs.com/package/better-auth) over NextAuth because of its simpler API and first-class support for MongoDB via its adapter system. The setup is lean:

```typescript
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
```

Users can sign up with email/password or one-click Google OAuth. Session management is handled via cookies with a custom `better-auth-voyago` prefix to avoid conflicts. The auth state is accessible on both server (via `auth.api.getSession()`) and client (via `authClient.useSession()`), which was crucial for gating pages, personalizing the navbar, and protecting API routes.

### 📅 Date-Based Availability Checking

This was the trickiest business logic in the entire app. When a user searches for hotels with specific check-in and check-out dates, the system needs to determine if each hotel is already booked for those dates. The challenge: bookings overlap in complex ways.

The solution checks whether the requested dates fall within any existing booking's range:

```typescript
export async function findBookings(
  hotelId: string, checkin: string, checkout: string
) {
  const bookings = await Bookings.find({ hotelId });
  const found = bookings.find(
    (booking) =>
      isDateInBetween(checkin, booking.checkin, booking.checkout) ||
      isDateInBetween(checkout, booking.checkin, booking.checkout),
  );
  return found;
}
```

Each hotel in the listing is then flagged as `isBooked: true` or `false`, and booked hotels display a clear "BOOKED!" badge — preventing users from attempting to book an unavailable room.

### 🔍 URL-Driven Search & Filtering

Instead of managing filter state purely in React state, I pushed search parameters into the URL using `useSearchParams`. This gives users shareable, bookmarkable search URLs and keeps the UI in sync with the browser's navigation history.

The search component orchestrates three inputs — destination (select), check-in (date picker), and check-out (date picker) — and only enables the search button when a valid combination is provided:

```typescript
const isValidSearch = (searchState) => {
  if (!searchState.destination) return false;
  if (!searchState.checkin || !searchState.checkout) return false;
  return new Date(searchState.checkin).getTime() 
         <= new Date(searchState.checkout).getTime();
};
```

On the hotel listing page, filters (star category, price range) and sort order are persisted in a shared React context (`SearchProvider`), and changes trigger client-side re-fetching — avoiding full page reloads while keeping the UX snappy.

### 💳 Stripe Payment Integration

The payment flow is a multi-step process designed to feel seamless:

1. **User reviews the booking** — The payment form pre-fills user details (name, email) from the session and displays the check-in/check-out dates with the calculated total cost.

2. **Payment intent is created** — On clicking "Proceed to Pay," the client sends the amount to `/api/create-payment-intent`, which returns a `clientSecret` from Stripe.

3. **Stripe Elements renders** — The Stripe `PaymentElement` component handles card input, validation, and PCI compliance.

4. **Booking is persisted before payment** — On submit, the booking record is saved to MongoDB *before* confirming the payment with Stripe. This ensures data consistency — if the payment fails, the booking can be cleaned up.

```typescript
// Save booking to DB first
await onBookingSubmit();

// Then confirm payment with Stripe
const { error } = await stripe.confirmPayment({
  elements,
  clientSecret,
  confirmParams: {
    receipt_email: userEmail,
    return_url: `${baseUrl}/payment-success?amount=${amount}`,
  },
});
```

After a successful payment, users are redirected to a confirmation page.

---

## UI/UX Design Decisions

### The Landing Page

The homepage leads with a **full-screen background video** of scenic landscapes, overlaid with a dark gradient and centered search controls. The tagline — *"Discover Serenity in Nature's Embrace"* — uses character-by-character fade animations via Motion primitives. The search bar itself fades and scales in with a spring animation, giving the page a premium, cinematic feel.

### Component Library

I built the UI entirely with **Shadcn UI** + **Radix UI** primitives — cards, badges, dialogs, dropdowns, avatars, selects — customized through Tailwind. This gave me accessible, unstyled components that I could theme to match Voyago's warm, travel-inspired aesthetic (orange-amber gradients, soft backgrounds, and clean typography).

### Responsive Navigation

The navbar adapts between desktop (horizontal links + user avatar) and mobile (hamburger dropdown menu). The mobile menu uses Radix's `DropdownMenu` with smooth transitions, and conditionally renders sign-in/sign-up buttons or the user's profile with a logout option.

### Bookings Dashboard

The bookings page splits into **upcoming** and **past** sections, each rendering booking cards with hotel name, location, dates, and calculated pricing. Past bookings are visually dimmed (`bg-muted/30`) while upcoming bookings get an accent highlight (`bg-primary/5`). On mobile, upcoming bookings are shown first for immediate relevance.

---

## Database Design

MongoDB stores four core collections through Mongoose models:

```
hotels      → name, address, city, rates, propertyCategory,
              gallery, amenities, overview
bookings    → hotelId (ref: hotels), userId, checkin, checkout
ratings     → hotelId, rating (numeric)
reviews     → hotelId, review content
```

The `bookings` model uses a Mongoose `ObjectId` reference to `hotels`, enabling population of hotel details when fetching a user's bookings:

```typescript
const bookings = await Bookings.find({ userId })
  .populate("hotelId", "name highRate lowRate")
  .lean();
```

---

## Challenges & Lessons Learned

### 1. Server/Client Component Boundaries

Next.js App Router's strict separation between server and client components was a constant consideration. Components that need interactivity (`"use client"`) can't directly call server actions — I had to bridge them through API routes or pass server-fetched data as props. The hotel summary info component, for example, lives as a client component but calls server actions for ratings and reviews via `useEffect`.

### 2. Date Serialization

MongoDB stores dates as strings in the bookings collection, while the frontend uses JavaScript `Date` objects. I had to be careful with timezone-agnostic comparisons and consistent formatting (`toISOString().split("T")[0]`) to avoid off-by-one-day bugs.

### 3. Stripe's Client-Server Dance

Stripe's payment flow requires careful coordination — the `PaymentIntent` must be created server-side, the `clientSecret` passed to the client, and the payment confirmed client-side. Getting the error handling right (submit errors vs. payment errors vs. booking persistence errors) required multiple fallback paths.

### 4. Search State Management

Keeping search, filter, and sort state synchronized between the URL, React context, and the server was non-trivial. I settled on a context provider (`SearchProvider`) that bridges client-side state with URL search params, ensuring the hotel listing re-fetches whenever any parameter changes.

---

## What I'd Do Differently

- **Add server-side pagination** — Currently all hotels matching a query are fetched at once. For a production dataset, cursor-based pagination would be essential.
- **Implement optimistic UI updates** — Booking confirmation could feel faster with optimistic rendering.
- **Add rate limiting** — The API routes currently lack rate limiting, which would be critical for a public deployment.
- **Improve error boundaries** — More granular error handling at the component level with React Error Boundaries.
- **Add E2E tests** — Cypress or Playwright tests for the critical booking flow.

---

## Final Thoughts

Building Voyago was an exercise in connecting a lot of moving parts — auth, payments, date logic, filtering, responsive UI — into a cohesive product. The modern Next.js App Router ecosystem made many things easier (server components, file-based routing, built-in API routes), but also introduced its own complexity around component boundaries and data flow.

The result is a project I'm genuinely proud of: it works end-to-end, it handles real payments, and it looks good while doing it.

---

*Built by [Istiak Kashem Jisan](https://jisan-swe.vercel.app) · [GitHub Repository](https://github.com/Jisan-Dev/voyago-travel-booking-webapp)*
