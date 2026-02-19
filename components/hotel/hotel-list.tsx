import { getAllHotels } from "@/DAL";
import { IHotel } from "@/types";
import HotelCard from "./hotel-card";
import NoHotels from "./no-hotels";

type HotelListProps = {
  destination: string;
  checkin: string;
  checkout: string;
  category: string;
  price: string;
  sort: string;
};

const HotelList = async ({
  destination,
  checkin,
  checkout,
  category,
  price,
  sort,
}: HotelListProps) => {
  const hotels = await getAllHotels(destination, checkin, checkout, category, price, sort);

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels.length ? (
          hotels?.map((hotel: IHotel) => (
            <HotelCard key={hotel._id} hotel={hotel} checkin={checkin} checkout={checkout} />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
