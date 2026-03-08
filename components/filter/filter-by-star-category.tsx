/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SearchContext } from "@/providers/SearchProvider";
import { refinedCategory } from "@/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { HotelListProps } from "../hotel/hotel-list";

const FilterByStarCategory = () => {
  const [query, setQuery] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathName = usePathname();

  const { setSearch } = useContext<{
    search: HotelListProps;
    setSearch: Dispatch<SetStateAction<HotelListProps>>;
  }>(SearchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      setQuery((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    if (params.get("category")) {
      setQuery(decodeURI(params.get("category") || "").split("|"));
    }
  }, []);
  console.log("query", query);

  useEffect(() => {
    if (query.length) {
      params.set("category", refinedCategory(query.join("|")));
    } else {
      params.delete("category");
    }

    const url = `${pathName}?${params.toString()}`;
    window.history.replaceState(null, "", url);
    setSearch((prev: HotelListProps) => ({
      ...prev,
      category: query.join("|"),
    }));
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="fiveStar" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            onChange={handleChange}
            checked={query.includes("5")}
            type="checkbox"
            name="5"
            id="fiveStar"
          />
          5 Star
        </label>

        <label htmlFor="fourStar" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            onChange={handleChange}
            checked={query.includes("4")}
            type="checkbox"
            name="4"
            id="fourStar"
          />
          4 Star
        </label>

        <label htmlFor="threeStar" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            onChange={handleChange}
            checked={query.includes("3")}
            type="checkbox"
            name="3"
            id="threeStar"
          />
          3 Star
        </label>

        <label htmlFor="twoStar" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            onChange={handleChange}
            checked={query.includes("2")}
            type="checkbox"
            name="2"
            id="twoStar"
          />
          2 Star
        </label>

        <label htmlFor="oneStar" className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 accent-primary"
            onChange={handleChange}
            checked={query.includes("1")}
            type="checkbox"
            name="1"
            id="oneStar"
          />
          1 Star
        </label>
      </form>
    </div>
  );
};

export default FilterByStarCategory;
