import { checkAuth, findBookings } from "@/DAL";
import { Hotels } from "@/lib/models/hotel";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await checkAuth();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const destination = searchParams.get("destination");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const category = searchParams.get("category");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");

    const query: Record<string, any> = {};

    if (destination) {
      query.city = destination?.trim();
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
                $gte: Number(min),
                $lte: Number(max),
              },
            },
            {
              highRate: {
                $gte: Number(min),
                $lte: Number(max),
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
        hotels.map(async (hotel: any) => {
          const foundBookings = await findBookings(hotel._id, checkin, checkout);

          hotel.isBooked = !!foundBookings;

          return hotel;
        }),
      );
    }

    return NextResponse.json(allHotels);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch hotels" }, { status: 500 });
  }
}
