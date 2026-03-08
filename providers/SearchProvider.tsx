"use client";

import { HotelListProps } from "@/components/hotel/hotel-list";
import { createContext, ReactNode, useState } from "react";

export const SearchContext = createContext<any>(null);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<HotelListProps>({
    destination: "",
    checkin: "",
    checkout: "",
    category: "",
    price: "",
    sort: "desc",
  });
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
