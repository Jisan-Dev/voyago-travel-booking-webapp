# Voyago - Hotel Booking App

## Getting Started

Voyago is a modern, full-stack web application designed for browsing, booking, and managing hotel reservations. It provides a seamless user experience for finding the perfect accommodation, handling payments securely, and viewing booking history.

First, run the development server:

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Better Auth](https://www.npmjs.com/package/better-auth) for credentials and social logins.
- **Payment Processing**: [Stripe](https://stripe.com/)
- **Date Management**: [date-fns](https://date-fns.org/) & [React Day Picker](http://react-day-picker.js.org/)

## ✨ Features

- **User Authentication**: Secure user registration and login system, including social logins (Google, Facebook).
- **Hotel Listings**: Browse a comprehensive list of hotels.
- **Advanced Filtering**: Filter hotels by price range, star category, and available amenities.
- **Search Functionality**: Search for hotels based on destination and dates.
- **Detailed Hotel View**: View detailed information for each hotel, including an image gallery, overview, and summary.
- **Booking System**: An intuitive multi-step booking process.
- **Secure Payments**: Integrated with Stripe for secure and reliable payment processing.
- **User Dashboard**: Registered users can view their profile information, as well as upcoming and past bookings.

## 🚀 How to Run It

Follow these steps to get the application up and running locally.

**1. Clone the Repository**

```bash
git clone https://github.com/Jisan-Dev/voyago-travel-booking-webapp.git
cd voyago-travel-booking-webapp
```

**2.Install Dependencies & run dev server**

```bash
pnpm install
pnpm dev
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and configure the following:

MONGODB_URI=
BETTER_AUTH_SECRET=
NEXT_PUBLIC_BASE_URL=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

## 📘 User Flow

1️⃣ Sign up using email, password, or google account \
2️⃣ Select a location, check-in date, and check-out date\
3️⃣ See the list of booked and no-booked hotel rooms with their ratings and price \
4️⃣ See the details of an available hotel \
5️⃣ Book the hotel by paying with Stripe payment gateway \
6️⃣ Check the bookings page to see all the past and upcoming bookings \

---

## 💡 What I Learned

This project helped me enhance my understanding of:

✔ Full-stack development with Next.js & MongoDB\
✔ Secure authentication with email-password and Oauth\
✔ Working with dates and date ranges, check availability to book a slot/room.\
✔ How to securely process payment with Stripe. \
✔ Using searchParams to implement search, sort, filtering etc.

---

## 📬 Contact

Istiak Kashem Jisan\
📧 istiakkashem35@gmail.com

💼 Portfolio: https://jisan-swe.vercel.app

⭐ If you found this project interesting, consider giving it a star on GitHub!
