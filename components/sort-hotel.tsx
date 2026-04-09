"use client";

import { SearchContext } from "@/providers/SearchProvider";
import { SearchContextWithFilters } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

const SortHotel = () => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(() => searchParams.get("sort") || "desc");
  const params = new URLSearchParams(searchParams);

  const pathName = usePathname();
  const { setSearch } = useContext<{
    setSearch: Dispatch<SetStateAction<SearchContextWithFilters>>;
  }>(SearchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    if (sort) params.set("sort", sort);
    else params.delete("sort");

    const url = `${pathName}?${params.toString()}`;
    window.history.replaceState(null, "", url);
    setSearch((prev: SearchContextWithFilters) => ({
      ...prev,
      sort,
    }));
  }, [sort]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-1 mt-2">
        <label htmlFor="highToLow" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            type="radio"
            name="sort"
            id="highToLow"
            value="desc"
            onChange={handleChange}
            checked={sort === "desc"}
          />
          Price High to Low
        </label>

        <label htmlFor="lowToHigh" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            type="radio"
            name="sort"
            id="lowToHigh"
            value="asc"
            onChange={handleChange}
            checked={sort === "asc"}
          />
          Price Low to high
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
