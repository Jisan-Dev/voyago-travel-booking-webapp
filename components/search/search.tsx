"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { SearchContext } from "@/providers/SearchProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { DatePickerDemo } from "../day-picker";
import { HotelListProps } from "../hotel/hotel-list";

type Props = {
  fromList?: boolean;
  destination?: string;
  checkin?: string;
  checkout?: string;
  onSearch?: (searchTerm: SearchTerm) => void;
  buttonLabel?: string;
};

export type SearchTerm = {
  destination: string;
  checkin: string;
  checkout: string;
};

const Search = ({ fromList, destination, checkin, checkout, onSearch, buttonLabel }: Props) => {
  const pathName = usePathname();
  const { data: session } = authClient.useSession();

  const { search, setSearch } = useContext<{
    search: HotelListProps;
    setSearch: Dispatch<SetStateAction<HotelListProps>>;
  }>(SearchContext);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    destination: destination || search.destination || "",
    checkin: checkin || search.checkin || "",
    checkout: checkout || search.checkout || "",
  });

  const handleDestinationChange = (value: string) => {
    setSearchTerm((prev) => ({
      ...prev,
      destination: value,
    }));
  };

  const isValidSearch = (searchState: typeof searchTerm) => {
    if (!onSearch && !searchState.destination) return false;
    if (!searchState.checkin || !searchState.checkout) return false;
    return new Date(searchState.checkin).getTime() <= new Date(searchState.checkout).getTime();
  };

  const allowSearch = isValidSearch(searchTerm);

  const handleSearch = () => {
    if (!session?.user) {
      toast.error("Please login to continue!");
      return;
    }

    if (onSearch) {
      onSearch(searchTerm);
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm.destination);
    if (searchTerm?.checkin && searchTerm?.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    setSearch((prev: typeof search) => ({
      ...prev,
      destination: searchTerm.destination,
      checkin: searchTerm.checkin,
      checkout: searchTerm.checkout,
    }));

    if (pathname.includes("hotels")) {
      const url = `${pathName}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    } else {
      router.push(`/hotels?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setCitiesLoading(true);
        const res = await fetch("/api/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <div className="lg:max-h-62.5 mt-6">
        <div id="searchParams" className={`${fromList && "shadow-none!"}`}>
          {!onSearch && (
            <div>
              <span>Destination</span>
              <Select
                onValueChange={handleDestinationChange}
                defaultValue={searchTerm.destination}
                disabled={citiesLoading}
              >
                <SelectTrigger className="w-full bg-transparent justify-between text-left font-normal py-5 border-neutral-900/40 mt-2 cursor-pointer">
                  <SelectValue
                    placeholder={
                      citiesLoading ? "Destinations are loading..." : "Select a destination"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Destinations</SelectLabel>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <span>Check in</span>
            <div className="mt-2">
              <DatePickerDemo
                setState={setSearchTerm}
                mode="checkin"
                defaultVal={searchTerm.checkin}
              />
            </div>
          </div>

          <div>
            <span>Checkout</span>
            <div className="mt-2">
              <DatePickerDemo
                setState={setSearchTerm}
                mode="checkout"
                defaultVal={searchTerm.checkout}
              />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleSearch} disabled={!allowSearch} className="search-btn">
        🔍️ {buttonLabel || (fromList ? "Modify Search" : "Search")}
      </button>
    </>
  );
};

export default Search;
