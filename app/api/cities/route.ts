import { Hotels } from "@/lib/models/hotel";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const cities = await Hotels.distinct("city");
  return NextResponse.json(cities, { status: 200 });
}
