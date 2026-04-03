import Gallery from "@/components/hotel/details/gallery";
import Overview from "@/components/hotel/details/overview";
import Summary from "@/components/hotel/details/summary";
import { getHotelById } from "@/DAL";
import { IHotel } from "@/types";

export async function generateStaticParams() {
  // fetch all hotels to generate static paths for each hotel details page. This is necessary because we are using dynamic routes for hotel details pages and we want to pre-render them at build time for better performance and SEO.

  // we must have to use try catch block here because if there is any error while fetching hotels, we don't want to break the build process, instead we will return an empty array and the pages will be generated at runtime when the user visits them for the first time (fallback: 'blocking').
  try {
    // in generateStaticParams we cannot have relative API calls, we have to use absolute URL with the base URL of the application because this function runs at build time and does not have access to the request context.
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hotels");
    }

    const hotels = await res.json();

    return hotels.map((hotel: IHotel) => ({
      id: hotel._id?.toString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
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
