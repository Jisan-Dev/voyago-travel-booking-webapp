"use client";

import { getAllHotels } from "@/DAL";
import { SearchContext } from "@/providers/SearchProvider";
import { IHotel } from "@/types";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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
  // const hotels = await getAllHotels(destination, checkin, checkout, category, price, sort);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const { search } = useContext<{
    search: HotelListProps;
    setSearch: Dispatch<SetStateAction<HotelListProps>>;
  }>(SearchContext);
  console.log(search);
  const destination = search.destination;
  const checkin = search.checkin;
  const checkout = search.checkout;
  const category = search.category;
  const price = search.price;
  const sort = search.sort;

  useEffect(() => {
    console.log("first");
    const fetchData = async () => {
      const hotels = await getAllHotels(
        search.destination,
        search.checkin,
        search.checkout,
        search.category,
        search.price,
        search.sort,
      );
      setHotels(hotels);
      console.log("dhuks");
    };
    fetchData();
  }, [search]);

  console.log(hotels);

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels?.length > 0 ? (
          hotels?.map((hotel: IHotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              checkin={search.checkin}
              checkout={search.checkout}
            />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
