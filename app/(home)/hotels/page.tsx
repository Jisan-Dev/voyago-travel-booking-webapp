import Filter from "@/components/filter";
import HotelList from "@/components/hotel/hotel-list";
import Search from "@/components/search/search";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type HotelListPageProps = {
  searchParams: Promise<{
    destination: string;
    checkin: string;
    checkout: string;
    category: string;
    price: string;
    sort: string;
  }>;
};

const HotelListPage = async ({ searchParams }: HotelListPageProps) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }

  const { destination, checkin, checkout, category, price, sort } = await searchParams;

  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-25 pb-15 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="container items-center py-12 relative z-20">
          <Search fromList={true} destination={destination} checkin={checkin} checkout={checkout} />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList />
        </div>
      </section>
    </>
  );
};

export default HotelListPage;
