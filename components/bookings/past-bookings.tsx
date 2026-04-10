import { IBooking } from "@/types";
import { History, ListX } from "lucide-react";
import Link from "next/link";
import { TextEffect } from "../motion-primitives/text-effect";
import { Button } from "../ui/button";
import BookingCard from "./booking-card";

const PastBooking = ({ bookings }: { bookings: IBooking[] }) => {
  // if (!bookings || bookings.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-muted-foreground flex items-center">
        <History className="mr-2 h-6 w-6" />
        <TextEffect className="text-2xl" preset="blur" per="line">
          Past Bookings
        </TextEffect>
      </h2>
      <TextEffect className="text-muted-foreground ml-7">
        {`${bookings.length} past booking${bookings.length !== 1 ? "s" : ""}`}
      </TextEffect>

      {/* <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} type="past" />
        ))}
      </div> */}

      <section className="mt-6">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} type="past" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <ListX className="w-14 h-14 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground max-w-md">
              No past bookings. Start exploring and book your next stay!
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

export default PastBooking;
