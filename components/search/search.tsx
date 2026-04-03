"use client";

import { SearchContext } from "@/providers/SearchProvider";
import { SearchContextWithFilters, SearchTerm } from "@/types";
import { isValidSearch } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import CheckinDateInput from "./checkin-date-input";
import CheckoutDateInput from "./checkout-date-input";
import DestinationSelectInput from "./destination-select-input";

type Props = {
  fromList?: boolean;
  destination?: string;
  checkin?: string;
  checkout?: string;
  onSearch?: (searchTerm: SearchTerm) => void;
  buttonLabel?: string;
};

const Search = ({ fromList, destination, checkin, checkout, onSearch, buttonLabel }: Props) => {
  const pathName = usePathname();
  // const { data: session } = authClient.useSession();

  const { search, setSearch } = useContext<{
    search: SearchContextWithFilters;
    setSearch: Dispatch<SetStateAction<SearchContextWithFilters>>;
  }>(SearchContext);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    destination: destination || search.destination || "",
    checkin: checkin || search.checkin || "",
    checkout: checkout || search.checkout || "",
  });

  const fromDetailsPage = pathname.includes("hotels/");
  const allowSearch = isValidSearch(searchTerm, fromDetailsPage);

  const handleSearch = () => {
    // if (!session?.user) {
    //   toast.error("Please login to continue!");
    //   return;
    // }

    if (onSearch) {
      onSearch(searchTerm);
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm.destination);
    if (searchTerm?.checkin || searchTerm?.checkout) {
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

  return (
    <>
      <div className="lg:max-h-62.5 mt-6">
        <div id="searchParams" className={`${fromList && "shadow-none!"}`}>
          {!onSearch && (
            <DestinationSelectInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}

          <CheckinDateInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <CheckoutDateInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <button onClick={handleSearch} disabled={!allowSearch} className="search-btn">
        🔍️ {buttonLabel || (fromList ? "Modify Search" : "Search")}
      </button>
    </>
  );
};

export default Search;
