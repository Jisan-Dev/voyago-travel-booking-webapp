import Gallery from "@/components/hotel/details/gallery";
import Overview from "@/components/hotel/details/overview";
import Summary from "@/components/hotel/details/summary";
import { getHotelById } from "@/DAL";
import { Hotels } from "@/lib/models/hotel";
import { connectToDatabase } from "@/lib/mongodb";
import { IHotel } from "@/types";

export async function generateStaticParams() {
  await connectToDatabase();

  const hotels = await Hotels.find().select("_id");

  return hotels.map((hotel: IHotel) => ({
    id: hotel._id?.toString(),
  }));
}

const HotelDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ checkin: string; checkout: string }>;
}) => {
  const { id } = await params;
  const { checkin, checkout } = await searchParams;
  const hotelInfo = await getHotelById(id, checkin, checkout);
  return (
    <section className="static min-h-screen">
      <Summary hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} />
      <Gallery gallery={hotelInfo.gallery} />
      <Overview overview={hotelInfo.overview} />
    </section>
  );
};

export default HotelDetailsPage;
