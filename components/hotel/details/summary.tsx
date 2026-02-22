import { IHotel } from "@/types";
import HotelSummaryInfo from "../hotel-summary-info";

const Summary = ({
  hotelInfo,
  checkin,
  checkout,
}: {
  hotelInfo: IHotel;
  checkin: string;
  checkout: string;
}) => {
  return (
    <section className="py-4 mt-25 ">
      <div className="flex container">
        <HotelSummaryInfo
          fromListPage={false}
          info={hotelInfo}
          checkin={checkin}
          checkout={checkout}
        />
      </div>
    </section>
  );
};

export default Summary;
