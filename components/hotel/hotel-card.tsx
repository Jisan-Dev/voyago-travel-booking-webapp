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
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border border-gray/20 p-3 sm:p-4 rounded-md">
      <Image
        src={hotel.thumbNailUrl!}
        className="w-full sm:max-w-60 max-h-40.5 object-cover sm:object-none"
        alt={hotel?.name}
        width={240}
        height={165}
      />
      <HotelSummaryInfo fromListPage={true} info={hotel} checkin={checkin} checkout={checkout} />
    </div>
  );
};

export default HotelCard;
