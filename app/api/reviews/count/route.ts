import { getReviewsCount } from "@/DAL";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const hotelId = searchParams.get("hotelId") || "";
    const count = await getReviewsCount(hotelId);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews count:", error);
    return NextResponse.json({ error, message: "Failed to fetch reviews count" }, { status: 500 });
  }
}
