import { IBooking } from "@/types";
import BookingCard from "./booking-card";

const UpcomingBooking = ({ bookings }: { bookings: IBooking[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcoming Bookings</h2>

      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} type="upcoming" />
      ))}
    </div>
  );
};

export default UpcomingBooking;
