import PastBooking from "@/components/bookings/past-bookings";
import ProfileInfo from "@/components/bookings/profile-info";
import UpcomingBooking from "@/components/bookings/upcoming-bookings";
import { getBookingsByUser } from "@/DAL";
import { auth } from "@/lib/auth";
import { IBooking } from "@/types";
import { ListX } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Bookings - Voyago",
    description:
      "Manage your bookings with Voyago. View your past and upcoming stays, and update your reservation details.",
  };
}

const BookingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");

  const bookings = await getBookingsByUser(user?.id);

  const pastBookings = bookings.filter(
    (booking: IBooking) => new Date().getTime() > new Date(booking.checkout).getTime(),
  );

  const upcomingBookings = bookings.filter((booking: IBooking) => {
    return new Date().getTime() < new Date(booking.checkout).getTime();
  });

  const hasNoBookings = pastBookings.length === 0 && upcomingBookings.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      {/* <section className="pt-24 lg:pt-32 "> */}

      <ProfileInfo bookings={bookings} upcomingBookings={upcomingBookings} />

      {/* </section> */}

      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4">
          {hasNoBookings ? (
            <div className="flex flex-col items-center justify-center text-center">
              <ListX className="w-14 h-14 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
              <p className="text-muted-foreground max-w-md">
                You haven&apos;t made any bookings. Start exploring and book your next stay!
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              <UpcomingBooking bookings={upcomingBookings} />
              <PastBooking bookings={pastBookings} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingsPage;
