import { IBooking } from "@/types";
import { Calendar, ClipboardClock } from "lucide-react";
import { TextEffect } from "../motion-primitives/text-effect";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
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

      {/* <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} type="upcoming" />
        ))}
      </div> */}

      <section className="mt-6">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} type="upcoming" />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center max-w-2xl mx-auto">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No upcoming bookings</p>
            <Button className="mt-4">Browse Hotels</Button>
          </Card>
        )}
      </section>
    </div>
  );
};

export default UpcomingBooking;
