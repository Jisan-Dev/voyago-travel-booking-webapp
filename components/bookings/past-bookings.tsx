import { IBooking } from "@/types";
import { Calendar, History } from "lucide-react";
import { TextEffect } from "../motion-primitives/text-effect";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import BookingCard from "./booking-card";

const PastBooking = ({ bookings }: { bookings: IBooking[] }) => {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-muted-foreground flex items-center">
        <History className="mr-2 h-6 w-6" />
        <TextEffect className="text-2xl" preset="blur" per="line">
          Past Bookings
        </TextEffect>
      </h2>
      <TextEffect className="text-muted-foreground ml-7">
        {`${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
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
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No past bookings</p>
            <Button className="mt-4">Browse Hotels</Button>
          </Card>
        )}
      </section>
    </div>
  );
};

export default PastBooking;
