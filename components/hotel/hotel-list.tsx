"use client";

import { SearchContext } from "@/providers/SearchProvider";
import { IHotel, SearchContextWithFilters } from "@/types";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import HotelCardSkeleton from "../card-skeleton";
import HotelCard from "./hotel-card";
import NoHotels from "./no-hotels";

const HotelList = () => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { search } = useContext<{
    search: SearchContextWithFilters;
    setSearch: Dispatch<SetStateAction<SearchContextWithFilters>>;
  }>(SearchContext);

  const { destination, checkin, checkout, category, price, sort } = search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("before await");
        const res = await fetch(
          `/api/hotels?destination=${destination}&checkin=${checkin}&checkout=${checkout}&category=${category}&price=${price}&sort=${sort}`,
          {
            cache: "force-cache",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch hotels");
        }

        const hotels = await res.json();

        // const hotels = await getAllHotels(destination, checkin, checkout, category, price, sort); // server action.

        console.log("inside fetchdata", hotels);

        setHotels(hotels);
      } catch (error) {
        console.log("fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [destination, checkin, checkout, category, price, sort]);

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels?.length > 0 && loading === false ? (
          hotels?.map((hotel: IHotel) => (
            <HotelCard key={hotel._id} hotel={hotel} checkin={checkin} checkout={checkout} />
          ))
        ) : loading === true ? (
          <>
            <HotelCardSkeleton />
            <HotelCardSkeleton />
          </>
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
