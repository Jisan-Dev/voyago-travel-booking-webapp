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
  console.log(search);
  const { destination, checkin, checkout, category, price, sort } = search;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("before await");
        const res = await fetch("/api/hotels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            checkin,
            checkout,
            category,
            price,
            sort,
          }),
        });

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

  console.log(hotels);

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
