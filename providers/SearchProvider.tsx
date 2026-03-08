"use client";

import { HotelListProps } from "@/components/hotel/hotel-list";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

export const SearchContext = createContext<any>(null);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<HotelListProps>({
    destination: searchParams.get("destination") || "",
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
    category: searchParams.get("category") || "",
    price: searchParams.get("price") || "",
    sort: searchParams.get("sort") || "desc",
  });
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
