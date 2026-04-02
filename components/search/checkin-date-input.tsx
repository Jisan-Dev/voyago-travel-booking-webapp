import { SearchTerm } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { DatePickerDemo } from "../day-picker";

const CheckinDateInput = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: SearchTerm;
  setSearchTerm: Dispatch<SetStateAction<SearchTerm>>;
}) => {
  return (
    <div>
      <span>Check in</span>
      <div className="mt-2">
        <DatePickerDemo setState={setSearchTerm} mode="checkin" defaultVal={searchTerm.checkin} />
      </div>
    </div>
  );
};

export default CheckinDateInput;
