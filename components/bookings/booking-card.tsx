import { IBooking } from "@/types";
import { getDayDifference } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CalendarDays, Wallet } from "lucide-react";

const BookingCard = ({ booking, type }: { booking: IBooking; type: string }) => {
  const days = getDayDifference(booking.checkin, booking.checkout);
  const totalCost =
    ((booking?.hotelId?.highRate ?? 0) + (booking?.hotelId?.lowRate ?? 0) / 2) * days;
  
  const isPast = type === "past";

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${isPast ? 'bg-muted/30 border-muted' : 'border-primary/20 bg-primary/5'}`}>
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle className={`text-xl font-bold ${isPast ? 'text-muted-foreground' : ''}`}>
            {booking.hotelId?.name}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            {(booking.hotelId as any)?.city || booking.hotelId?.address1 || "Location"}
          </div>
        </div>
        <Badge variant={isPast ? "secondary" : "default"} className="font-semibold">
          {isPast ? "Completed" : "Upcoming"}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* Dates Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium mr-2">Check In:</span> 
              <span className="text-muted-foreground">{booking.checkin}</span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium mr-2">Check Out:</span> 
              <span className="text-muted-foreground">{booking.checkout}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex flex-col md:items-end justify-center space-y-1 bg-background/50 p-3 rounded-lg border border-border/50">
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-primary" />
              <span className={`text-2xl font-bold ${isPast ? 'text-muted-foreground' : 'text-primary'}`}>
                ${totalCost}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              ${(totalCost / days).toFixed(2)} per night × {days} days
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
