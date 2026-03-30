import { IBooking } from "@/types";
import { ClipboardClock } from "lucide-react";
import { TextEffect } from "../motion-primitives/text-effect";
import BookingCard from "./booking-card";

const UpcomingBooking = ({ bookings }: { bookings: IBooking[] }) => {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight flex items-center">
        <ClipboardClock className="mr-2 h-6 w-6"/>
        <TextEffect className="text-2xl">Upcoming Bookings</TextEffect>
      </h2>

      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} type="upcoming" />
        ))}
      </div>
    </div>
  );
};

export default UpcomingBooking;
