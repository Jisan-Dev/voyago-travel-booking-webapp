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
    <>
      <section className="mt-25">
        <div className="container">
          <ProfileInfo />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PastBooking bookings={pastBookings} />
            <UpcomingBooking bookings={upcomingBookings} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingsPage;
