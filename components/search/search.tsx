"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { DatePickerDemo } from "../day-picker";

type Props = {
  fromList?: boolean;
  destination?: string;
  checkin?: string;
  checkout?: string;
};

export type SearchTerm = {
  destination: string;
  checkin: string;
  checkout: string;
};

const Search = ({ fromList, destination, checkin, checkout }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    destination: destination || "",
    checkin: checkin || "",
    checkout: checkout || "",
  });

  console.log("searchterm", searchTerm);

  const [allowSearch, setAllowSearch] = useState(true);

  const handleInputs = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    const state = { ...searchTerm, [name]: value };

    setAllowSearch(isValidSearch(state));

    setSearchTerm(state);
  };

  const isValidSearch = (searchState: typeof searchTerm) => {
    if (!searchState.destination) return false;
    if (!searchState.checkin || !searchState.checkout) return false;
    return new Date(searchState.checkin).getTime() <= new Date(searchState.checkout).getTime();
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm.destination);
    if (searchTerm?.checkin && searchTerm?.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    if (pathname.includes("hotels")) {
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.replace(`/hotels?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="lg:max-h-62.5 mt-6">
        <div id="searchParams" className={`${fromList && "shadow-none!"}`}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                value={searchTerm.destination}
                onChange={handleInputs}
                className="w-full border rounded-lg focus:outline-none  transition-colors cursor-pointer"
              >
                <option value="" className="text-black">
                  Select destination{" "}
                </option>
                <option value="Puglia" className="text-black">
                  Puglia
                </option>
                <option value="Frejus" className="text-black">
                  Frejus
                </option>
                <option value="Kerkira" className="text-black">
                  Kerkira
                </option>
                <option value="Karlovasi" className="text-black">
                  Karlovasi
                </option>
                <option value="Saint-Denis" className="text-black">
                  Saint-Denis
                </option>
                <option value="Cergy" className="text-black">
                  Cergy
                </option>
                <option value="Paris" className="text-black">
                  Paris
                </option>
                <option value="Le Pré-Saint-Gervais" className="text-black">
                  Le Pré-Saint-Gervais
                </option>
                <option value="Calvi" className="text-black">
                  Calvi
                </option>
                <option value="Catania" className="text-black">
                  Catania
                </option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            {/* <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                value={searchTerm.checkin}
                onChange={handleInputs}
                className="w-full border rounded-lg focus:outline-none"
              />
            </h4> */}
            <div className="mt-2">
              <DatePickerDemo setState={setSearchTerm} mode="checkin" />
            </div>
          </div>

          <div>
            <span>Checkout</span>
            {/* <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                value={searchTerm.checkout}
                onChange={handleInputs}
                className="w-full border rounded-lg focus:outline-none"
              />
            </h4> */}
            <div className="mt-2">
              <DatePickerDemo setState={setSearchTerm} mode="checkout" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleSearch} disabled={!allowSearch} className="search-btn">
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
