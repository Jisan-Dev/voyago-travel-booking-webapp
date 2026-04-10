import { IBooking } from "@/types";
import { ClipboardClock, ListX } from "lucide-react";
import Link from "next/link";
import { TextEffect } from "../motion-primitives/text-effect";
import { Button } from "../ui/button";
import BookingCard from "./booking-card";

const UpcomingBooking = ({ bookings }: { bookings: IBooking[] }) => {
  // if (!bookings || bookings.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight flex items-center">
        <ClipboardClock className="mr-2 h-6 w-6" />
        <TextEffect className="text-2xl">Upcoming Bookings</TextEffect>
      </h2>
      <TextEffect className="text-muted-foreground ml-7">
        {`${bookings.length} booking${bookings.length !== 1 ? "s" : ""} coming up`}
      </TextEffect>

      <section className="mt-6">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} type="upcoming" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <ListX className="w-14 h-14 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground max-w-md">
              No upcoming bookings. Start exploring and book your next stay!
            </p>
            <Link href="/hotels">
              <Button className="mt-4">Browse Hotels</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default UpcomingBooking;
