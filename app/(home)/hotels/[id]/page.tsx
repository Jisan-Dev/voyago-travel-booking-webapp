import Gallery from "@/components/hotel/details/gallery";
import Overview from "@/components/hotel/details/overview";
import Summary from "@/components/hotel/details/summary";
import { getHotelById } from "@/DAL";

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
    <>
      <Summary hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} />
      <Gallery gallery={hotelInfo.gallery} />
      <Overview overview={hotelInfo.overview} />
    </>
  );
};

export default HotelDetailsPage;
