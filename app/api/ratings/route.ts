import { checkAuth } from "@/DAL";
import { Ratings } from "@/lib/models/rating";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await checkAuth();
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get("hotelId") || "";
    console.log("first", hotelId);

    const ratings = await Ratings.find({ hotelId }).lean();
    return NextResponse.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
