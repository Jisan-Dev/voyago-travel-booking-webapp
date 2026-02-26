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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    destination: destination || "",
    checkin: checkin || "",
    checkout: checkout || "",
  });

  const handleDestinationChange = (value: string) => {
    setSearchTerm((prev) => ({
      ...prev,
      destination: value,
    }));
  };

  const isValidSearch = (searchState: typeof searchTerm) => {
    if (!searchState.destination) return false;
    if (!searchState.checkin || !searchState.checkout) return false;
    return new Date(searchState.checkin).getTime() <= new Date(searchState.checkout).getTime();
  };

  const allowSearch = isValidSearch(searchTerm);

  const handleSearch = () => {
    if (!session?.user) {
      toast.error("Please login to continue!");
      // return;
    }

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
            <Select onValueChange={handleDestinationChange} defaultValue={searchTerm.destination}>
              <SelectTrigger className="w-full bg-transparent justify-between text-left font-normal py-5 border-neutral-900/40 mt-2 cursor-pointer">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Destinations</SelectLabel>
                  <SelectItem value="Puglia">Puglia</SelectItem>
                  <SelectItem value="Frejus">Frejus</SelectItem>
                  <SelectItem value="Kerkira">Kerkira</SelectItem>
                  <SelectItem value="Karlovasi">Karlovasi</SelectItem>
                  <SelectItem value="Saint-Denis">Saint-Denis</SelectItem>
                  <SelectItem value="Cergy">Cergy</SelectItem>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Le Pré-Saint-Gervais">Le Pré-Saint-Gervais</SelectItem>
                  <SelectItem value="Calvi">Calvi</SelectItem>
                  <SelectItem value="Catania">Catania</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
