"use client";

import { SearchContext } from "@/providers/SearchProvider";
import { IHotel } from "@/types";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import HotelCard from "./hotel-card";
import NoHotels from "./no-hotels";

export type HotelListProps = {
  destination: string;
  checkin: string;
  checkout: string;
  category: string;
  price: string;
  sort: string;
};

const HotelList = () => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { search } = useContext<{
    search: HotelListProps;
    setSearch: Dispatch<SetStateAction<HotelListProps>>;
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

  if (loading) {
    return (
      <div className="flex w-full justify-center col-span-9 pt-8">
        <div className="flex flex-col items-center space-y-4 text-primary">
          <p className="text-2xl tracking-wide font-bold uppercase">Loading..</p>
          <Spinner className="size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels?.length > 0 && loading === false ? (
          hotels?.map((hotel: IHotel) => (
            <HotelCard key={hotel._id} hotel={hotel} checkin={checkin} checkout={checkout} />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
