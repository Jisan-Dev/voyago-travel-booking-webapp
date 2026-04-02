"use client";

import { SearchContextWithFilters } from "@/types";
import { createContext, ReactNode, useState } from "react";

export const SearchContext = createContext<any>(null);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<SearchContextWithFilters>({
    destination: "",
    checkin: "",
    checkout: "",
    category: "",
    price: "",
    sort: "desc",
  });
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
