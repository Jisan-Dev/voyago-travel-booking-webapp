import { SearchTerm } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { DatePickerDemo } from "../day-picker";

const CheckoutDateInput = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: SearchTerm;
  setSearchTerm: Dispatch<SetStateAction<SearchTerm>>;
}) => {
  return (
    <div>
      <span>Checkout</span>
      <div className="mt-2">
        <DatePickerDemo setState={setSearchTerm} mode="checkout" defaultVal={searchTerm.checkout} />
      </div>
    </div>
  );
};

export default CheckoutDateInput;
