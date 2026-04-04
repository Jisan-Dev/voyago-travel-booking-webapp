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
import { SearchTerm } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const DestinationSelectInput = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: SearchTerm;
  setSearchTerm: Dispatch<SetStateAction<SearchTerm>>;
}) => {
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const handleDestinationChange = (value: string) => {
    setSearchTerm((prev) => ({
      ...prev,
      destination: value,
    }));
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
    <div>
      <span>Destination</span>
      <Select
        onValueChange={handleDestinationChange}
        defaultValue={searchTerm.destination}
        disabled={citiesLoading}
      >
        <SelectTrigger className="w-full bg-transparent justify-between text-left font-normal py-5 border-neutral-900/40 mt-2 cursor-pointer">
          <SelectValue
            placeholder={citiesLoading ? "Destinations Loading..." : "Select a destination"}
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
  );
};

export default DestinationSelectInput;
