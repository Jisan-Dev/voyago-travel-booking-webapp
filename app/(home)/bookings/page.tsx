import PastBooking from "@/components/bookings/past-bookings";
import ProfileInfo from "@/components/bookings/profile-info";
import UpcomingBooking from "@/components/bookings/upcoming-bookings";
import { getBookingsByUser } from "@/DAL";
import { auth } from "@/lib/auth";
import { IBooking } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");

  const bookings = await getBookingsByUser(user?.id);

  const pastBookings = bookings.filter(
    (booking: IBooking) => new Date().getTime() > new Date(booking.checkin).getTime(),
  );

  const upcomingBookings = bookings.filter((booking: IBooking) => {
    return new Date().getTime() < new Date(booking.checkin).getTime();
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <section className="pt-24 lg:pt-32 pb-8 border-b border-border shadow-sm">
        <div className="container max-w-5xl mx-auto px-4">
          <ProfileInfo />
        </div>
      </section>
      
      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <PastBooking bookings={pastBookings} />
            <UpcomingBooking bookings={upcomingBookings} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingsPage;
