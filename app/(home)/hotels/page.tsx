"use client";

import Filter from "@/components/filter";
import HotelList, { HotelListProps } from "@/components/hotel/hotel-list";
import Search from "@/components/search/search";
import { authClient } from "@/lib/auth-client";
import { SearchContext } from "@/providers/SearchProvider";
import { refinedCategory } from "@/utils";
import { redirect, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Component from "../loading";

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

const HotelListPage = () => {
  const { search, setSearch } = useContext<{
    search: HotelListProps;
    setSearch: Dispatch<SetStateAction<HotelListProps>>;
  }>(SearchContext);
  const { data, isPending } = authClient.useSession();
  if (!data?.user && !isPending) {
    redirect("/login");
  }

  // const { destination, checkin, checkout, category, price, sort } = await searchParams;
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";
  const sort = searchParams.get("sort") || "desc";

  useEffect(() => {
    setSearch((prev: typeof search) => ({
      ...prev,
      destination,
      checkin,
      checkout,
      category: refinedCategory(category),
      price,
      sort,
    }));
  }, [destination, checkin, checkout, category, price, sort, setSearch]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Component />
      </div>
    );
  }

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
