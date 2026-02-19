import { IHotel } from "@/types";
import Image from "next/image";
import HotelSummaryInfo from "./hotel-summary-info";

const HotelCard = ({
  hotel,
  checkin,
  checkout,
}: {
  hotel: IHotel;
  checkin: string;
  checkout: string;
}) => {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      <Image
        src={hotel.thumbNailUrl!}
        className="max-h-40.5 max-w-60"
        alt={hotel?.name}
        width={240}
        height={165}
      />
      <HotelSummaryInfo fromListPage={true} info={hotel} checkin={checkin} checkout={checkout} />
    </div>
  );
};

export default HotelCard;
