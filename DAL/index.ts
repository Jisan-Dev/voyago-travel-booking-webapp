"use server";

import { auth } from "@/lib/auth";
import { Bookings } from "@/lib/models/booking";
import { Hotels } from "@/lib/models/hotel";
import { Ratings } from "@/lib/models/rating";
import { Reviews } from "@/lib/models/review";
import { connectToDatabase } from "@/lib/mongodb";
import { isDateInBetween } from "@/utils";
import { headers } from "next/headers";

export async function checkAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}

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

  const query: Record<string, any> = {};
  if (destination) {
    query.city = { $regex: new RegExp(destination, "i") };
  }

  if (category) {
    const categoriesToMatch = category.split("|");
    query.propertyCategory = { $in: categoriesToMatch };
  }

  if (price) {
    const priceRange = price.split("|");
    const minMaxConditions = [];

    for (const range of priceRange) {
      if (range.includes("+")) {
        const min = parseFloat(range.replace("+", ""));
        minMaxConditions.push({ lowRate: { $gte: min } });
      } else if (range.includes("-")) {
        const [min, max] = range.split("-");
        minMaxConditions.push(
          {
            lowRate: {
              $gte: min,
              $lte: max,
            },
          },
          {
            highRate: {
              $gte: min,
              $lte: max,
            },
          },
        );
      }
    }

    if (minMaxConditions.length > 0) {
      query["$or"] = minMaxConditions;
    }
  }

  const hotels = await Hotels.find(query)
    .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
    .sort(sort === "desc" ? { lowRate: -1 } : { lowRate: 1 })
    .lean();

  let allHotels = hotels;
  if (checkin && checkout) {
    allHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const foundBookings = await findBookings(hotel._id, checkin, checkout);
        if (foundBookings) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      }),
    );
  }

  return JSON.parse(JSON.stringify(allHotels));
}

async function findBookings(hotelId: string, checkin: string, checkout: string) {
  const bookings = await Bookings.find({ hotelId });

  const found = bookings.find(
    (booking) =>
      isDateInBetween(checkin, booking.checkin, booking.checkout) ||
      isDateInBetween(checkout, booking.checkin, booking.checkout),
  );

  return found;
}

export async function getRatings(hotelId: string) {
  await checkAuth();
  await connectToDatabase();

  const ratings = await Ratings.find({ hotelId }).lean();
  return JSON.parse(JSON.stringify(ratings));
}

export async function getReviews(hotelId: string) {
  await checkAuth();
  await connectToDatabase();

  const reviews = await Reviews.findById(hotelId).lean();
  return JSON.parse(JSON.stringify(reviews));
}

export async function getReviewsCount(hotelId: string) {
  await checkAuth();
  await connectToDatabase();

  const reviewsCount = await Reviews.countDocuments({ hotelId });
  return reviewsCount;
}
