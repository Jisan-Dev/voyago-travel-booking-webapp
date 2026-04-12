import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { IBooking } from "@/types";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";

const ProfileInfo = async ({
  bookings,
  upcomingBookings,
}: {
  bookings: IBooking[];
  upcomingBookings: IBooking[];
}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((name: string) => name[0].toUpperCase())
    .join("");

  return (
    <>
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <Avatar className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-primary/20">
              <AvatarImage
                src={user?.image || ""}
                referrerPolicy="no-referrer"
                alt={user?.name || "User profile"}
              />
              <AvatarFallback className="bg-primary text-white text-2xl">{initials}</AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">{user?.name}</h1>
              <p className="text-muted-foreground mb-3">{user?.email}</p>
              <div className="flex gap-2">
                {/* <Button variant="outline" size="sm">
                  Account Settings
                </Button> */}
                <Link href="/hotels">
                  <Button variant="outline" size="sm">
                    Explore Hotels
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{bookings.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{upcomingBookings.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;

/* <div className="flex flex-col items-center py-10 text-center">
      <Avatar className="h-28 w-28 lg:mb-6 mb-4 ring-2 ring-primary/20 ring-offset-2">
        <AvatarImage
          src={user?.image || ""}
          referrerPolicy="no-referrer"
          alt={user?.name || "User profile"}
        />
        <AvatarFallback className="bg-primary text-white text-4xl">{initials}</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h3 className="text-3xl font-semibold tracking-tight">{user?.name}</h3>
        <p className="text-muted-foreground lg:text-lg">{user?.email}</p>
      </div>

      <div className="w-full max-w-md border-b py-6 lg:py-6"></div>
    </div> */
