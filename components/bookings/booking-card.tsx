import { IBooking } from "@/types";
import { getDayDifference } from "@/utils";

const BookingCard = ({ booking, type }: { booking: IBooking; type: string }) => {
  const days = getDayDifference(booking.checkin, booking.checkout);
  const totalCost =
    ((booking?.hotelId?.highRate ?? 0) + (booking?.hotelId?.lowRate ?? 0) / 2) * days;
  return (
    <div className={`${type === "past" ? "bg-[#ebf6e9]" : "bg-lime-100/50"} p-4 rounded-md`}>
      <div className="flex justify-between items-center ">
        <div>
          <h3 className={`${type === "past" && "text-gray-600"} text-xl font-semibold`}>
            {booking.hotelId?.name}
          </h3>
          <div className="text-sm text-accent my-4">
            <p>Check In: {booking.checkin}</p>
            <p>Check Out: {booking.checkout}</p>
          </div>
        </div>

        <div>
          <h3 className={`${type === "past" && "text-gray-600"} text-xl font-semibold text-right`}>
            ${totalCost}
          </h3>
          <p className="text-sm text-accent">
            ${totalCost / days} per night X {days} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
