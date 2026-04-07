"use client";

import Filter from "@/components/filter";
import HotelList from "@/components/hotel/hotel-list";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { SearchContext } from "@/providers/SearchProvider";
import { SearchContextWithFilters } from "@/types";
import { refinedCategory } from "@/utils";
import { IconFilter } from "@tabler/icons-react";
import { redirect, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import LoaderComponent from "../loading";

const HotelListPage = () => {
  const { setSearch } = useContext<{
    search: SearchContextWithFilters;
    setSearch: Dispatch<SetStateAction<SearchContextWithFilters>>;
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
    setSearch((prev: SearchContextWithFilters) => ({
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
      <div>
        <LoaderComponent />
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
        <div className="container">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-semibold">Hotels</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <IconFilter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-75 overflow-y-auto">
                <div className="mt-8 pl-4">
                  <Filter />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-3 border-r pr-6">
              <Filter />
            </div>
            <div className="col-span-1 lg:col-span-9">
              <HotelList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelListPage;
