import SortHotel from "../sort-hotel";
import FilterByAmenities from "./filter-by-amenities";
import FilterByPriceRange from "./filter-by-price-range";
import FilterByStarCategory from "./filter-by-star-category";

const Filter = () => {
  return (
    <>
      <div className="col-span-3 space-y-4">
        <SortHotel />

        <FilterByPriceRange />

        <FilterByStarCategory />

        <FilterByAmenities />
      </div>
    </>
  );
};

export default Filter;
