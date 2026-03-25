import { Card } from "@/components/ui/card";
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
    <Card className="flex flex-col sm:flex-row overflow-hidden px-4">
      <div className="overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-r-none w-full sm:w-64 shrink-0">
        <Image
          src={hotel.thumbNailUrl!}
          className="object-cover w-full h-auto sm:h-40 sm:w-64 aspect-video sm:aspect-auto"
          alt={hotel?.name}
          width={240}
          height={165}
        />
      </div>
      <HotelSummaryInfo fromListPage={true} info={hotel} checkin={checkin} checkout={checkout} />
    </Card>
  );
};

export default HotelCard;
